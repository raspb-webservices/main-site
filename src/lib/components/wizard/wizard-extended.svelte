<script lang="ts">
  import { onMount } from 'svelte';
  import type { WizardConfig, Project } from '$interfaces/project.interface';
  import type { User } from '$interfaces/user.interface';
  import { uploadAsset, publishAsset, createAsset, uploadMultipleAssetsWithDelay, publishMultipleAssets } from '$helper/uploadAsset';
  import {
    projectTypesWebApp,
    projectCategories,
    availableFeatures,
    getStepConfig,
    featureCategoryColors,
    projectTypesAiFreestyle,
    projectSubTypesAi,
    projectSubTypesApp,
    projectSubTypesWebsite,
    projectSubTypesFreestyle,
    formFieldTypes
  } from '$lib/configs/wizard-config';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, localizeHref, setLocale } from '$lib/paraglide/runtime';
  import auth from '$services/auth-service';
  import { user } from '$store/sharedStates.svelte';
  import ProjectContent from './steps/project-content.svelte';
  import ProjectDetails from './steps/project-details.svelte';
  import ProjectFeatures from './steps/project-features.svelte';
  import ProjectMaterials from './steps/project-materials.svelte';
  import ProjectResult from './steps/project-result.svelte';
  import ThankYou from './steps/thank-you.svelte';
  import ResetModal from '../modals/general/reset-modal.svelte';
  import ErrorModal from '../modals/general/error-modal.svelte';
  import SubmittingModal from './steps/submitting.svelte';

  import ProjectCategory from './steps/project-category.svelte';
  import ProjectTypeWebApp from './steps/project-type-web-app.svelte';
  import ProjectSubTypesWebsite from './steps/project-sub-type-website.svelte';
  import ProjectSubTypesApp from './steps/project-sub-type-apps.svelte';
  import ProjectTypeAiFreestyle from './steps/project-type-ai-freestyle.svelte';

  // Props for initial values from URL parameters
  interface Props {
    initialProjectCategory?: string | null;
    initialProjectType?: string | null;
    initialSubType?: string | null;
  }

  const { initialProjectCategory = null, initialProjectType = null, initialSubType = null }: Props = $props();

  // State
  let currentStep = $state(1);
  let showResetModal = $state(false);
  let custom_metadata = $state({});
  let currentUser = $derived(user.value) as User;
  let disableHeader = true;

  let config: WizardConfig = $state({
    step: 1,
    name: '',
    description: '',
    projectCategory: '',
    projectType: '',
    subType: '',
    projectDetails: '',
    desiredDomain: '',
    domainStatus: '',
    goals: '',
    inspiration: '',
    targetAudience: '',
    budget: '',
    timeline: '',
    features: ['cookieConsent'],
    customFeature: '',
    primaryColour: '#c1121f',
    secondaryColour: '#003049',
    accentColour: '#fdf0d5',
    desiredFont: '',
    customFont: '',
    estimatedPrice: 0,
    formFields: [],
    pages: [],
    relatedFiles: [],
    uploadedFiles: []
  });

  // Additional wizard-specific properties
  let uploadedFiles: File[] = $state([]);
  let customFeatures = $state('');
  let isUploading = $state(false);
  let uploadProgress = $state('');
  let isGeneratingPDF = $state(false);

  // Loading and error states
  let isSubmitting = $state(false);
  let showErrorModal = $state(false);
  let errorDetails = $state<string[]>([]);
  let showThankYou = $state(false);
  let errorModal: ErrorModal;
  let resetModal: ResetModal;

  // Asset upload states
  let uploadedAssetIds: string[] = $state([]);
  let isPreparingAssets = $state(false);
  let assetPreparationProgress = $state('');

  // Dynamic step configuration based on project type
  const stepConfig = $derived(getStepConfig(config.projectType ?? ''));

  const maxSteps = $derived(stepConfig.length);

  // Functions
  function selectProjectCategory(category: string) {
    config.projectCategory = category;
  }

  function selectProjectType(type: string) {
    config.projectType = type;
    config.subType = '';
    currentStep = 1;
  }

  function selectSubType(subType: string) {
    config.subType = subType;
  }

  function addPage() {
    config.pages = [...(config.pages ?? []), { name: '', content: '', characteristic: '' }];
  }

  function removePage(index: number) {
    config.pages = (config.pages ?? []).filter((_, i) => i !== index);
  }

  function addFormField() {
    config.formFields = [...(config.formFields ?? []), { type: '', name: '', required: false }];
  }

  function removeFormField(index: number) {
    config.formFields = (config.formFields ?? []).filter((_, i) => i !== index);
  }

  function scrollToTop() {
    // Scroll to the top of the wizard container

    setTimeout(() => {
      const wizardContainer = document.querySelector('.wizard-container');

      console.log('wizardContainer', wizardContainer);

      if (wizardContainer) {
        wizardContainer.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      } else {
        // Fallback: scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= maxSteps) {
      currentStep = step;
      scrollToTop();
    }
  }

  function nextStep() {
    if (currentStep < maxSteps) {
      currentStep++;
      scrollToTop();

      // If entering the final step, prepare assets
      if (currentStep === maxSteps) {
        calculatePrice();
        prepareAssetsForFinalStep();
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      scrollToTop();
    }
  }

  function confirmReset() {
    currentStep = 1;
    config = {
      step: 1,
      name: '',
      description: '',
      projectType: '',
      subType: '',
      projectDetails: '',
      desiredDomain: '',
      domainStatus: '',
      goals: '',
      inspiration: '',
      targetAudience: '',
      budget: '',
      timeline: '',
      features: ['cookieConsent'],
      customFeature: '',
      primaryColour: '#003049',
      secondaryColour: '#c1121f',
      accentColour: '#fdf0d5',
      desiredFont: '',
      customFont: '',
      estimatedPrice: 0,
      formFields: [],
      pages: [],
      relatedFiles: [],
      uploadedFiles: [],
      owner: {
        id: ''
      }
    };
    uploadedFiles = [];
    customFeatures = '';
    closeResetModal();
  }

  function calculatePrice() {
    // 1. Determine base price from subType (more specific) or projectType
    const allSubTypes = [...projectSubTypesWebsite, ...projectSubTypesApp, ...projectSubTypesAi, ...projectSubTypesFreestyle];
    const allProjectTypes = [...projectTypesWebApp, ...projectTypesAiFreestyle];

    let basePrice = 0;

    if (config.subType) {
      const subType = allSubTypes.find((st) => st.id === config.subType);
      if (subType?.basePrice) basePrice = subType.basePrice;
    }

    if (basePrice === 0 && config.projectType) {
      const projectType = allProjectTypes.find((pt) => pt.id === config.projectType);
      if (projectType?.basePrice) basePrice = projectType.basePrice;
    }

    // 2. Service level factor (±25%)
    // 0 = Full-Service (+25% cost), 50 = neutral, 100 = Active participation (-25% cost)
    const sl = config.serviceLevel ?? 50;
    const serviceFactor = ((50 - sl) / 50) * 0.25;

    // 3. Engineering approach factor (±25%)
    // 0 = Quick & Dirty (-25% cost), 50 = neutral, 100 = Over-engineered (+25% cost)
    const ea = config.engineeringApproach ?? 50;
    const engineeringFactor = ((ea - 50) / 50) * 0.25;

    // 4. Apply factors to base price
    const adjustedBasePrice = basePrice * (1 + serviceFactor + engineeringFactor);

    // 5. Calculate feature costs
    const selectedFeatures = availableFeatures.filter((f) => (config.features ?? []).includes(f.id));
    const totalFeatureCost = selectedFeatures.reduce((sum, f) => sum + (f.basePrice || 0), 0);

    // 6. Feature volume discount based on count
    // Up to 10: 2% per feature (max 20%)
    // 11-20: +1.5% per feature (max 35% at 20)
    // 21+: +1% per feature (max 40% total)
    const featureCount = selectedFeatures.length;
    let featureDiscountPercent = 0;

    if (featureCount <= 10) {
      featureDiscountPercent = featureCount * 2;
    } else if (featureCount <= 20) {
      featureDiscountPercent = 20 + (featureCount - 10) * 1.5;
    } else {
      featureDiscountPercent = 35 + (featureCount - 20) * 1;
    }

    featureDiscountPercent = Math.min(featureDiscountPercent, 40);

    const discountedFeatureCost = totalFeatureCost * (1 - featureDiscountPercent / 100);

    // 7. Final estimated price
    config.estimatedPrice = Math.round(adjustedBasePrice + discountedFeatureCost);
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      // Neue Dateien zu den bestehenden hinzufügen
      const newFiles = Array.from(target.files);
      uploadedFiles = [...uploadedFiles, ...newFiles];

      // Input zurücksetzen, damit dieselbe Datei erneut ausgewählt werden kann
      target.value = '';
    }
  }

  function removeFile(index: number) {
    uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
  }

  // Function to prepare assets when entering final step
  async function prepareAssetsForFinalStep() {
    if (uploadedFiles.length === 0 || uploadedAssetIds.length > 0) return;

    isPreparingAssets = true;
    assetPreparationProgress = m['wizard_steps_stepSummary_preparingAssets_title']();

    try {
      const preparedAssetIds = await uploadMultipleAssetsWithDelay(
        uploadedFiles,
        3000, // 3 second delay between uploads to avoid rate limiting
        (message, current, total, assetId) => {
          assetPreparationProgress = m['wizard_steps_stepSummary_preparingAssets_progress']({ message: message, current: current, total: total });
        }
      );

      uploadedAssetIds = preparedAssetIds;

      if (preparedAssetIds.length > 0) {
        assetPreparationProgress = m['wizard_steps_stepSummary_preparingAssets_progress']();
      } else {
        assetPreparationProgress = m['wizard_steps_stepSummary_preparingAssets_noAssets']();
      }
    } catch (error) {
      console.error(m['wizard_steps_stepSummary_preparingAssets_error'](), error);
      assetPreparationProgress = m['wizard_steps_stepSummary_preparingAssets_error']();
    } finally {
      isPreparingAssets = false;
    }
  }

  // Legacy function for manual upload (kept for compatibility)
  async function uploadAllFiles() {
    if (uploadedFiles.length === 0) return [];

    isUploading = true;
    uploadProgress = m['wizard_steps_stepMaterials_files_upload']();

    try {
      const uploadedAssetIds = await uploadMultipleAssetsWithDelay(uploadedFiles, 2000, (message, current, total) => {
        uploadProgress = m['wizard_steps_step6_files_uploading_progress']();
      });

      if (uploadedAssetIds.length > 0) {
        uploadProgress = m['wizard_steps_step6_files_uploading_progress']();
      } else {
        uploadProgress = m['wizard_steps_step6_files_uploading_noFiles']();
      }

      return uploadedAssetIds;
    } catch (error) {
      console.error(m['wizard_steps_step6_files_uploading_error'](), error);
      uploadProgress = m['wizard_steps_step6_files_uploading_error']();
      return [];
    } finally {
      isUploading = false;
    }
  }

  async function generatePDF() {
    isGeneratingPDF = true;
    try {
      // Send project data to server-side PDF generation
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          config,
          uploadedFiles: uploadedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type
          })),
          customFeatures,
          filename:
            (config.name || m['wizard_steps_stepSummary_titleHighlight']()) +
            '_' +
            m['wizard_steps_stepMaterials_files_title']() +
            '_' +
            new Date().toISOString().split('T')[0] +
            '.pdf'
        })
      });

      if (!response.ok) {
        throw new Error(m['wizard_steps_stepSummary_pdfGeneration_error']());
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        (config.name || m['wizard_steps_stepSummary_titleHighlight']()) +
        '_' +
        m['wizard_steps_stepMaterials_files_title']() +
        '_' +
        new Date().toISOString().split('T')[0] +
        '.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(m['wizard_steps_stepSummary_pdfGeneration_error'](), error);
      alert(m['wizard_steps_stepSummary_pdfGeneration_error']());
    } finally {
      isGeneratingPDF = false;
    }
  }

  function closeErrorModal() {
    errorModal?.closeModal();
    showErrorModal = false;
    errorDetails = [];
    // Redirect back to step 1 while preserving user input
    currentStep = 1;
  }

  function openResetModal() {
    resetModal?.openModal();
  }

  function closeResetModal() {
    resetModal?.closeModal();
    showResetModal = false;
  }

  function showThankYouPage() {
    showThankYou = true;
  }

  // Neue Funktion zum Senden der Daten an die API
  async function submitToAPI() {
    isSubmitting = true;
    errorDetails = [];

    try {
      // Prepare asset IDs (use pre-uploaded or fallback to upload now)
      let finalAssetIds: string[] = [];
      if (uploadedAssetIds.length > 0) {
        console.log(m['wizard_modals_error_usingPreUploaded'](), uploadedAssetIds);
        finalAssetIds = uploadedAssetIds;
      } else if (uploadedFiles.length > 0) {
        // Fallback: If no pre-uploaded assets, upload them now
        console.log(m['wizard_modals_error_noPreUploaded']());
        finalAssetIds = await uploadAllFiles();

        if (finalAssetIds.length === 0 && uploadedFiles.length > 0) {
          errorDetails.push(m['wizard_modals_error_fileUploadError']());
          throw new Error(m['wizard_modals_error_fileUploadFailed']());
        }
      }

      // Create project
      console.log(m['wizard_modals_error_creatingProject'](), finalAssetIds);

      const projectData: Project = {
        name: config.name,
        description: config.description,
        projectType: config.projectType,
        subType: config.subType,
        projectDetails: config.projectDetails,
        desiredDomain: config.desiredDomain,
        domainStatus: config.domainStatus,
        goals: config.goals,
        inspiration: config.inspiration,
        targetAudience: config.targetAudience,
        budget: config.budget,
        timeline: config.timeline,
        features: config.features,
        customFeature: customFeatures || config.customFeature,
        primaryColour: config.primaryColour,
        secondaryColour: config.secondaryColour,
        accentColour: config.accentColour,
        desiredFont: config.desiredFont,
        estimatedPrice: config.estimatedPrice,
        formFields: config.formFields,
        pages: config.pages,
        relatedFiles: finalAssetIds.map((id) => ({ id }))
      };

      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (result.success && result.data?.id) {
        const projectId = result.data.id;

        console.log(m['wizard_modals_error_projectCreated'](), projectId);

        // Update Auth0 metadata with projectId
        if (currentUser) {
          if (Array.isArray(currentUser.projectIds)) {
            currentUser.projectIds.push(projectId);
          } else {
            currentUser.projectIds = [projectId];
          }

          custom_metadata = {
            projectIds: currentUser.projectIds
          };

          const updateMetaResponse = await auth.updateMetadata(currentUser.sub!, custom_metadata);
        } else {
          console.warn('User not logged in or user ID not available, cannot update Auth0 metadata.');
        }

        // Show thank you page immediately while publishing happens in background
        showThankYouPage();

        // Wait 3.5 seconds to ensure everything is properly saved before publishing
        console.log(m['wizard_modals_error_waiting']());
        await new Promise((resolve) => setTimeout(resolve, 3500));

        // Publish the project
        try {
          console.log(m['wizard_modals_error_publishingProject'](), projectId);
          const publishProjectResponse = await fetch(`/api/project/publish/${projectId}`, {
            method: 'POST'
          });
          const publishProjectResult = await publishProjectResponse.json();

          if (publishProjectResponse.ok && publishProjectResult.success) {
            console.log(m['wizard_modals_error_projectPublished'](), publishProjectResult);
          } else {
            console.warn(m['wizard_modals_error_projectPublishingFailed'](), publishProjectResult);
            // Don't fail the entire process if publishing fails
          }
        } catch (publishProjectError) {
          console.warn(m['wizard_modals_error_projectPublishingError'](), publishProjectError);
          // Don't fail the entire process if publishing fails
        }

        // Publish all assets that are part of the project
        if (finalAssetIds.length > 0) {
          console.log(m['wizard_modals_error_publishingAssets'](), finalAssetIds);

          try {
            const publishedAssetIds = await publishMultipleAssets(finalAssetIds, (message, current, total) => {
              console.log(`${m['wizard_modals_error_assetPublishingProgress']()}: ${message} (${current}/${total})`);
            });

            if (publishedAssetIds.length > 0) {
              console.log(m['wizard_modals_error_assetsPublished'](), publishedAssetIds);
            } else {
              console.warn(m['wizard_modals_error_noAssetsPublished']());
            }
          } catch (assetPublishError) {
            console.warn(m['wizard_modals_error_assetPublishingError'](), assetPublishError);
            // Don't fail the entire process if asset publishing fails
          }
        }

        console.log(m['wizard_modals_error_submissionCompleted']());
      } else {
        // Collect detailed error information
        errorDetails.push(`${m['wizard_modals_error_apiError']()} : ${result.error || m['wizard_modals_error_unknownError']()}`);
        if (result.details) {
          errorDetails.push(...result.details);
        }
        throw new Error(m['wizard_modals_error_apiRequestFailed']());
      }
    } catch (error) {
      console.error(m['wizard_modals_error_submissionError'](), error);

      // Add network error if no other errors were collected
      if (errorDetails.length === 0) {
        errorDetails.push(m['wizard_modals_error_networkError']());
        errorDetails.push(m['wizard_modals_error_checkConnection']());
      }

      // Show error modal
      showErrorModal = true;
    } finally {
      isSubmitting = false;
    }
  }

  // Function to validate and set initial parameters
  function initializeFromParams() {
    let shouldAdvance = false;

    if (initialProjectCategory && projectCategories.some((pt) => pt.id === initialProjectCategory)) {
      config.projectCategory = initialProjectCategory;
      shouldAdvance = true;

      // Check if initialProjectType is valid
      if (
        initialProjectType &&
        (projectTypesWebApp.some((pt) => pt.id === initialProjectType) || projectTypesAiFreestyle.some((pt) => pt.id === initialProjectType))
      ) {
        config.projectType = initialProjectType;
        shouldAdvance = true;

        // Check if initialSubType is valid for the selected project type
        if (
          initialSubType &&
          (projectSubTypesAi.some((st) => st.id === initialSubType) ||
            projectSubTypesApp.some((st) => st.id === initialSubType) ||
            projectSubTypesWebsite.some((st) => st.id === initialSubType))
        ) {
          config.subType = initialSubType;
          // If both projectType and subType are valid, skip to step 3
          currentStep = 4;
          return;
        } else {
          // If only projectType is valid, go to step 2
          currentStep = 3;
          return;
        }
      } else {
        // If only projectCategory is valid, go to step 2
        currentStep = 2;
        return;
      }
    }
    // If no valid parameters, stay on step 1
    currentStep = 1;
  }

  onMount(async () => {
    calculatePrice();
    initializeFromParams();
  });
</script>

<div class="wizard-container">
  <!-- Header with Reset Button -->
  {#if !disableHeader}
    <div class="wizard-header">
      <h1 id="projekt-konfigurator">{m['wizard_header_titleFirst']()} <span class="inner-text-special">{m['wizard_header_titleHighlight']()}</span></h1>
      <button type="button" class="btn btn-outline btn-sm" onclick={openResetModal}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {m['wizard_header_resetButton']()}
      </button>
    </div>
  {/if}

  <!-- Progress Bar with Dynamic Steps -->
  <div class="progress-wrapper">
    <!-- Desktop Progress Bar (horizontal with connecting line) -->
    <div class="progress-desktop hidden md:block">
      <div class="relative flex w-full items-center justify-between">
        <!-- Background connecting line -->
        <div class="bg-base-300 absolute top-6 right-0 left-0 mx-8 h-0.5"></div>
        <!-- Progress connecting line -->
        <div
          class="bg-primary absolute top-6 right-0 left-0 mx-8 h-0.5 transition-all duration-300"
          style="width: {currentStep > 1 ? `calc(${((currentStep - 1) / (stepConfig.length - 1)) * 100}% - ${currentStep - 1.5}rem )` : '0%'}"
        ></div>

        {#each stepConfig as step, i}
          <button
            type="button"
            class="progressbar-relative z-10 min-w-24 cursor-pointer flex-col items-center border-none bg-transparent p-2 transition-all duration-200"
            onclick={() => goToStep(i + 1)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToStep(i + 1);
              }
            }}
            aria-label="Go to step {i + 1}: {step.title}"
            aria-current={i + 1 === currentStep ? 'step' : undefined}
          >
            <!-- Step Circle -->
            <div
              class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200
                     {i + 1 <= currentStep ? 'bg-primary text-primary-content border-primary' : 'bg-base-100 border-base-300 hover:bg-base-200'}"
            >
              {i + 1}
            </div>
            <!-- Step Title -->
            <div class="text-base-content mt-2 max-w-20 text-center text-xs font-medium"></div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Mobile Progress Bar (vertical wrapped without connecting line) -->
    <div class="progress-mobile block md:hidden">
      <div class="flex flex-wrap justify-center gap-4">
        {#each stepConfig as step, i}
          <button
            type="button"
            class="progressbar-flex min-w cursor-pointer flex-col items-center border-none bg-transparent p-2 transition-all duration-200"
            onclick={() => goToStep(i + 1)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToStep(i + 1);
              }
            }}
            aria-label="Go to step {i + 1}: {step.title}"
            aria-current={i + 1 === currentStep ? 'step' : undefined}
          >
            <!-- Step Circle -->
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200
                     {i + 1 <= currentStep ? 'bg-primary text-primary-content border-primary' : 'bg-base-100 border-base-300'}"
            >
              {i + 1}
            </div>
            <!-- Step Title -->
            <div class="text-base-content mt-2 text-center text-xs font-medium"></div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Step Content -->
  <div class="step-content-wrapper">
    {#if currentStep === 1}
      <ProjectCategory {config} {selectProjectCategory}></ProjectCategory>
    {:else if currentStep === 2 && config.projectType !== 'freestyle'}
      <ProjectTypeWebApp {config} {selectProjectType}></ProjectTypeWebApp>
    {:else if (currentStep === 3 && config.projectType !== 'freestyle') || (currentStep === 2 && config.projectType === 'freestyle')}
      <ProjectDetails {config}></ProjectDetails>
    {:else if currentStep === 4 && (config.projectType === 'website' || config.projectType === 'cms' || config.projectType === 'webApplication')}
      <ProjectFeatures {config} {customFeatures} {calculatePrice} isExtendedConfigurator={true}></ProjectFeatures>
    {:else if currentStep === 5 && (config.projectType === 'website' || config.projectType === 'cms')}
      <ProjectContent {config} {addPage} {removePage} {removeFormField} {addFormField} {formFieldTypes}></ProjectContent>
    {:else if (currentStep === 6 && (config.projectType === 'website' || config.projectType === 'cms')) || (currentStep === 5 && config.projectType === 'webApplication')}
      <ProjectMaterials {config} {uploadedFiles} {handleFileUpload} {removeFile} {isUploading} {uploadProgress}></ProjectMaterials>
    {:else if (currentStep === 3 && config.projectType === 'freestyle') || (currentStep === 4 && config.projectType === 'artificialIntelligence')}
      <ProjectMaterials {config} {uploadedFiles} {handleFileUpload} {removeFile} {isUploading} {uploadProgress}></ProjectMaterials>
    {:else if currentStep === maxSteps}
      <ProjectResult {config} {isPreparingAssets} {assetPreparationProgress}></ProjectResult>
    {/if}
  </div>

  <!-- Navigation -->
  <div class="wizard-navigation">
    {#if currentStep > 1}
      <button type="button" class="btn-basic grow md:grow-0" onclick={prevStep}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {m['wizard_navigation_back']()}
      </button>
    {:else}
      <div></div>
    {/if}

    {#if currentStep < maxSteps}
      <button
        type="button"
        class="btn-basic flex-grow md:flex-grow-0"
        onclick={nextStep}
        disabled={(currentStep === 1 && !config.projectType) || (currentStep === 2 && !config.subType && config.projectType !== 'freestyle')}
      >
        {m['wizard_navigation_next']()}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {:else}
      <div class="flex flex-wrap gap-4">
        <button type="button" class="btn-basic flex-grow md:flex-grow-0" onclick={generatePDF} disabled={isGeneratingPDF}>
          {#if isGeneratingPDF}
            <span class="loading loading-ring loading-sm"></span>
            {m['wizard_navigation_downloadPDF']()}
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {m['wizard_navigation_downloadPDF']()}
          {/if}
        </button>
        <button type="button" class="btn-basic flex-grow md:flex-grow-0" onclick={submitToAPI}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {m['wizard_navigation_submitProject']()}
        </button>
      </div>
    {/if}
  </div>
</div>

<!-- Loading Overlay -->
{#if isSubmitting}
  <SubmittingModal></SubmittingModal>
{/if}

<!-- Thank You Page -->
{#if showThankYou}
  <ThankYou {config}></ThankYou>
{/if}
<!-- Error Modal -->
<ErrorModal bind:this={errorModal} {errorDetails}></ErrorModal>
<!-- Reset Modal -->
<ResetModal bind:this={resetModal} {confirmReset}></ResetModal>

<style lang="postcss">
  @reference '../../../app.css';
  /* Wizard Container - Dark Theme Support */
  .wizard-container {
    @apply bg-base-100 border-base-300 rounded-2xl border shadow-lg;
  }

  /* Header - Dark Theme Support */
  .wizard-header {
    @apply border-base-300 flex items-center justify-between border-b px-6 py-4;

    h1 {
      @apply text-base-content m-0 p-0;
    }
  }

  /* Progress Bar Wrapper */
  .progress-wrapper {
    @apply mx-6 my-12;
  }

  /* Progress Bar - Desktop (horizontal with line) */
  .progress-desktop {
    .progressbar-relative {
      @apply flex items-center justify-center;
    }
  }

  /* Progress Bar - Mobile (wrapped without line) */
  .progress-mobile {
    .progressbar-flex {
      @apply flex flex-wrap justify-center gap-x-2 pb-2 md:gap-4 md:pb-0;
    }
  }

  /* Step Content */
  .step-content-wrapper {
    @apply mb-8 min-h-96 px-6 py-8; /* Added py-8 for vertical padding */
  }

  /* Navigation */
  .wizard-navigation {
    @apply border-base-300 bg-base-100 flex flex-wrap items-center justify-between gap-4 border-t p-6;
  }
</style>
