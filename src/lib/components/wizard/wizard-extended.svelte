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
  import ProjectBasicDetails from './steps/project-basic-details.svelte';
  import ProjectFeatures from './steps/project-features.svelte';
  import ProjectMaterials from './steps/project-materials.svelte';
  import ProjectSummaryExtended from './steps/project-summary-extended.svelte';
  import ThankYou from './steps/thank-you.svelte';
  import ResetModal from '../modals/general/reset-modal.svelte';
  import ErrorModal from '../modals/general/error-modal.svelte';
  import SubmittingModal from './steps/submitting.svelte';

  import ProjectCategory from './steps/project-category.svelte';
  import ProjectTypeWebApp from './steps/project-type-web-app.svelte';
  import ProjectSubTypeWebsite from './steps/project-sub-type-website.svelte';
  import ProjectSubTypeApp from './steps/project-sub-type-apps.svelte';
  import ProjectSubTypeAi from './steps/project-sub-type-ai.svelte';
  import ProjectSubTypeFreestyle from './steps/project-sub-type-freestyle.svelte';
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
  }

  function selectProjectSubType(subType: string) {
    config.subType = subType;
    calculatePrice();
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
    setTimeout(() => {
      const wizardContainer = document.querySelector('.wizard-scroll-container');
      if (wizardContainer) {
        wizardContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
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
    // Basic wizard calculation logic
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

    // For pwaSimple: base price depends on chosen approach
    if (config.subType === 'pwaSimple') {
      if (config.pwaApproach === 'new') basePrice = 3000;
      else if (config.pwaApproach === 'extend') basePrice = 1999;
    }

    const sl = config.serviceLevel ?? 50;
    const serviceFactor = ((50 - sl) / 50) * 0.25;

    const ea = config.engineeringApproach ?? 50;
    const engineeringFactor = ((ea - 50) / 50) * 0.25;

    const adjustedBasePrice = basePrice * (1 + serviceFactor + engineeringFactor);

    const selectedFeatures = availableFeatures.filter((f) => (config.features ?? []).includes(f.id));
    const totalFeatureCost = selectedFeatures.reduce((sum, f) => sum + (f.basePrice || 0), 0);

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

    config.estimatedPrice = Math.round(adjustedBasePrice + discountedFeatureCost);
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const newFiles = Array.from(target.files);
      uploadedFiles = [...uploadedFiles, ...newFiles];
      target.value = '';
    }
  }

  function removeFile(index: number) {
    uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
  }

  async function prepareAssetsForFinalStep() {
    if (uploadedFiles.length === 0 || uploadedAssetIds.length > 0) return;

    isPreparingAssets = true;
    assetPreparationProgress = m.wizard_steps_stepSummary_preparingAssets_title();

    try {
      const preparedAssetIds = await uploadMultipleAssetsWithDelay(
        uploadedFiles,
        3000, 
        (message, current, total, assetId) => {
          assetPreparationProgress = m.wizard_steps_stepSummary_preparingAssets_progress({ message: message, current: current, total: total });
        }
      );

      uploadedAssetIds = preparedAssetIds;

      if (preparedAssetIds.length > 0) {
        assetPreparationProgress = m.wizard_steps_stepSummary_preparingAssets_progress();
      } else {
        assetPreparationProgress = m.wizard_steps_stepSummary_preparingAssets_noAssets();
      }
    } catch (error) {
      console.error(m.wizard_steps_stepSummary_preparingAssets_error(), error);
      assetPreparationProgress = m.wizard_steps_stepSummary_preparingAssets_error();
    } finally {
      isPreparingAssets = false;
    }
  }

  async function uploadAllFiles() {
    if (uploadedFiles.length === 0) return [];

    isUploading = true;
    uploadProgress = m.wizard_steps_stepMaterials_files_upload();

    try {
      const uploadedAssetIds = await uploadMultipleAssetsWithDelay(uploadedFiles, 2000, (message, current, total) => {
        uploadProgress = m.wizard_steps_step6_files_uploading_progress();
      });

      if (uploadedAssetIds.length > 0) {
        uploadProgress = m.wizard_steps_step6_files_uploading_progress();
      } else {
        uploadProgress = m.wizard_steps_step6_files_uploading_noFiles();
      }

      return uploadedAssetIds;
    } catch (error) {
      console.error(m.wizard_steps_step6_files_uploading_error(), error);
      uploadProgress = m.wizard_steps_step6_files_uploading_error();
      return [];
    } finally {
      isUploading = false;
    }
  }

  async function generatePDF() {
    isGeneratingPDF = true;
    try {
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
            (config.name || m.wizard_steps_stepSummary_titleHighlight()) +
            '_' +
            m.wizard_steps_stepMaterials_files_title() +
            '_' +
            new Date().toISOString().split('T')[0] +
            '.pdf'
        })
      });

      if (!response.ok) {
        throw new Error(m.wizard_steps_stepSummary_pdfGeneration_error());
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        (config.name || m.wizard_steps_stepSummary_titleHighlight()) +
        '_' +
        m.wizard_steps_stepMaterials_files_title() +
        '_' +
        new Date().toISOString().split('T')[0] +
        '.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(m.wizard_steps_stepSummary_pdfGeneration_error(), error);
      alert(m.wizard_steps_stepSummary_pdfGeneration_error());
    } finally {
      isGeneratingPDF = false;
    }
  }

  function closeErrorModal() {
    errorModal?.closeModal();
    showErrorModal = false;
    errorDetails = [];
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

  async function submitToAPI() {
    isSubmitting = true;
    errorDetails = [];

    try {
      // ─── STEP 1: Upload assets (create in Hygraph, unpublished) ───────────────
      let finalAssetIds: string[] = [];
      if (uploadedAssetIds.length > 0) {
        // Already uploaded during summary step preview
        finalAssetIds = uploadedAssetIds;
      } else if (uploadedFiles.length > 0) {
        finalAssetIds = await uploadAllFiles();
        if (finalAssetIds.length === 0 && uploadedFiles.length > 0) {
          errorDetails.push(m.wizard_modals_error_fileUploadError());
          throw new Error(m.wizard_modals_error_fileUploadFailed());
        }
      }

      // ─── STEP 2: Create project (server creates/finds customer as owner) ──────
      const projectData: Project = {
        name: config.name,
        description: config.description,
        projectCategory: config.projectCategory,
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
        serviceLevel: config.serviceLevel,
        engineeringApproach: config.engineeringApproach,
        specialRequirements: config.specialRequirements,
        timelinePreference: config.timelinePreference,
        specificDeadline: config.specificDeadline,
        budgetRange: config.budgetRange,
        pwaApproach: config.pwaApproach,
        pwaExistingUrl: config.pwaExistingUrl,
        cmsComplexity: config.cmsComplexity,
        cmsContentStructure: config.cmsContentStructure,
        formFields: config.formFields,
        pages: config.pages,
        relatedFiles: finalAssetIds.map((id) => ({ id }))
      };

      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (!result.success || !result.data?.id) {
        errorDetails.push(`${m.wizard_modals_error_apiError()} : ${result.error || m.wizard_modals_error_unknownError()}`);
        if (result.details) errorDetails.push(...result.details);
        throw new Error(m.wizard_modals_error_apiRequestFailed());
      }

      const projectId: string = result.data.id;
      const customerId: string | undefined = result.customerId;
      const customerCreated: boolean = result.customerCreated ?? false;

      // Update Auth0 metadata with new project ID
      if (currentUser) {
        if (Array.isArray(currentUser.projectIds)) {
          currentUser.projectIds.push(projectId);
        } else {
          currentUser.projectIds = [projectId];
        }
        custom_metadata = { projectIds: currentUser.projectIds };
        await auth.updateMetadata(custom_metadata);
      }

      // Show thank you immediately after successful creation
      showThankYouPage();

      // ─── STEP 3: Wait for Hygraph to index all created entities ──────────────
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // ─── STEP 4: Publish everything in parallel ───────────────────────────────
      const publishTasks: Promise<unknown>[] = [];

      // Publish project
      publishTasks.push(
        fetch(`/api/project/publish/${projectId}`, { method: 'POST' }).catch(() => {/* non-critical */})
      );

      // Publish customer if freshly created
      if (customerCreated && customerId) {
        publishTasks.push(
          fetch(`/api/customer/publish/${customerId}`, { method: 'POST' }).catch(() => {/* non-critical */})
        );
      }

      // Publish assets
      if (finalAssetIds.length > 0) {
        publishTasks.push(
          publishMultipleAssets(finalAssetIds, () => {}).catch(() => {/* non-critical */})
        );
      }

      await Promise.allSettled(publishTasks);

    } catch (error) {
      console.error(m.wizard_modals_error_submissionError(), error);
      if (errorDetails.length === 0) {
        errorDetails.push(m.wizard_modals_error_networkError());
        errorDetails.push(m.wizard_modals_error_checkConnection());
      }
      showErrorModal = true;
    } finally {
      isSubmitting = false;
    }
  }

  function initializeFromParams() {
    if (initialProjectCategory && projectCategories.some((pt) => pt.id === initialProjectCategory)) {
      config.projectCategory = initialProjectCategory;
      if (
        initialProjectType &&
        (projectTypesWebApp.some((pt) => pt.id === initialProjectType) || projectTypesAiFreestyle.some((pt) => pt.id === initialProjectType))
      ) {
        config.projectType = initialProjectType;
        if (
          initialSubType &&
          (projectSubTypesAi.some((st) => st.id === initialSubType) ||
            projectSubTypesApp.some((st) => st.id === initialSubType) ||
            projectSubTypesWebsite.some((st) => st.id === initialSubType))
        ) {
          config.subType = initialSubType;
          currentStep = 4;
          return;
        } else {
          currentStep = 3;
          return;
        }
      } else {
        currentStep = 2;
        return;
      }
    }
    currentStep = 1;
  }

  onMount(async () => {
    calculatePrice();
    initializeFromParams();
  });
</script>

<div class="wizard-scroll-container">
  <div class="wizard-basic-container">
    <!-- Progress Bar (Basic Style) -->
    <div class="progress-wrapper">
      <div class="progress-bar">
        <progress
          class="progress progress-primary h-8 w-full"
          value={currentStep === 1 ? 0.05 : currentStep === maxSteps ? currentStep : currentStep - 0.5}
          max={maxSteps}
        ></progress>
      </div>

      <div class="wizard-steps grid gap-3" style="grid-template-columns: repeat({maxSteps}, minmax(0, 1fr));">
        {#each stepConfig as step, i}
          <button
            type="button"
            class:active={currentStep === i + 1}
            class:touched={currentStep > i + 1}
            onclick={() => goToStep(i + 1)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToStep(i + 1);
              }
            }}
            aria-label="Go to step {i + 1}: {(m as unknown as Record<string, () => string>)[step.title]?.() ?? step.title}"
            >{(m as unknown as Record<string, () => string>)[step.title]?.() ?? step.title}</button
          >
        {/each}
      </div>
    </div>

    <!-- Step Content -->
    <div class="step-content-wrapper">
      {#if currentStep === 1}
        <ProjectCategory {config} {selectProjectCategory}></ProjectCategory>
      {:else if currentStep === 2}
        {#if config.projectCategory === 'websites-and-apps'}
          <ProjectTypeWebApp {config} {selectProjectType}></ProjectTypeWebApp>
        {:else}
          <ProjectTypeAiFreestyle {config} {selectProjectType}></ProjectTypeAiFreestyle>
        {/if}
      {:else if currentStep === 3}
        {#if config.projectType === 'website'}
          <ProjectSubTypeWebsite {config} {selectProjectSubType}></ProjectSubTypeWebsite>
        {:else if config.projectType === 'app'}
          <ProjectSubTypeApp {config} {selectProjectSubType}></ProjectSubTypeApp>
        {:else if config.projectType === 'aiSolution'}
          <ProjectSubTypeAi {config} {selectProjectSubType}></ProjectSubTypeAi>
        {:else}
          <ProjectSubTypeFreestyle {config} {selectProjectSubType}></ProjectSubTypeFreestyle>
        {/if}
      {:else if currentStep === 4}
        <!-- Basic Details (Extended) -->
        <ProjectBasicDetails {config}></ProjectBasicDetails>
      {:else if currentStep === 5 && (config.projectType === 'website' || config.projectType === 'cms' || config.projectType === 'webApplication')}
        <!-- Features (Web/CMS/App) -->
        <ProjectFeatures {config} bind:customFeatures {calculatePrice} isExtendedConfigurator={true}></ProjectFeatures>
      {:else if currentStep === 5 && (config.projectType === 'artificialIntelligence' || config.projectType === 'freestyle')}
        <!-- Materials (AI/Freestyle) -->
        <ProjectMaterials {config} {uploadedFiles} {handleFileUpload} {removeFile} {isUploading} {uploadProgress}></ProjectMaterials>
      {:else if currentStep === 6 && (config.projectType === 'website' || config.projectType === 'cms')}
        <!-- Content (Web/CMS) -->
        <ProjectContent {config} {addPage} {removePage} {removeFormField} {addFormField} {formFieldTypes}></ProjectContent>
      {:else if (currentStep === 7 && (config.projectType === 'website' || config.projectType === 'cms')) || (currentStep === 6 && config.projectType === 'webApplication')}
        <!-- Materials (Web/CMS/App) -->
        <ProjectMaterials {config} {uploadedFiles} {handleFileUpload} {removeFile} {isUploading} {uploadProgress}></ProjectMaterials>
      {:else if currentStep === maxSteps}
        <!-- Result/Summary -->
        <ProjectSummaryExtended {config} {isPreparingAssets} {assetPreparationProgress}></ProjectSummaryExtended>
      {/if}
    </div>

    <!-- Navigation -->
    <div class="wizard-basic-navigation">
      {#if currentStep > 1}
        <button type="button" class="btn-basic grow md:grow-0" onclick={prevStep}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {m.wizard_navigation_back()}
        </button>
      {/if}

      {#if currentStep < maxSteps}
        <button
          type="button"
          class="btn-basic m-auto max-w-md grow md:mr-0 md:ml-auto md:grow-0"
          onclick={nextStep}
          disabled={(currentStep === 1 && !config.projectCategory) || (currentStep === 2 && !config.projectType) || (currentStep === 3 && !config.subType)}
        >
          {m.wizard_navigation_next()}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      {:else}
        <div class="flex flex-wrap gap-4">
          <button type="button" class="btn-basic grow md:grow-0" onclick={generatePDF} disabled={isGeneratingPDF}>
            {#if isGeneratingPDF}
              <span class="loading loading-ring loading-sm"></span>
              {m.wizard_navigation_downloadPDF()}
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {m.wizard_navigation_downloadPDF()}
            {/if}
          </button>
          <button type="button" class="btn-basic grow md:grow-0" onclick={submitToAPI}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {m.wizard_navigation_submitProject()}
          </button>
        </div>
      {/if}
    </div>
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
<ErrorModal bind:this={errorModal} {errorDetails} onClose={closeErrorModal}></ErrorModal>
<!-- Reset Modal -->
<ResetModal bind:this={resetModal} {confirmReset}></ResetModal>

<style lang="postcss">
  @reference '../../../app.css';
  .wizard-scroll-container {
    @apply pt-24;
  }

  /* Wizard Basic Container */
  .wizard-basic-container {
    @apply bg-base-100 border-base-300 rounded-2xl border shadow-lg;
  }

  /* Progress Bar */
  .progress-wrapper {
    @apply m-8;

    .wizard-steps {
      button {
        @apply col-span-full cursor-pointer hover:opacity-75 md:col-span-1;

        &.active {
          @apply text-primary font-bold;
        }
        &.touched {
          @apply text-primary/80;
        }
        &:first-child {
          @apply md:text-left;
        }
        &:last-child {
          @apply md:text-right;
        }
      }
    }
  }

  /* Step Content */
  .step-content-wrapper {
    @apply mb-8 min-h-96 px-6;
  }

  /* Navigation */
  .wizard-basic-navigation {
    @apply border-base-300 bg-base-100 flex flex-wrap items-center justify-between gap-4 border-t p-6;
  }
</style>
