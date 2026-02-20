<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import type { WizardConfig } from '$interfaces/project.interface';
  import {
    projectTypesWebApp,
    projectTypesAiFreestyle,
    projectSubTypesWebsite,
    projectSubTypesApp,
    projectSubTypesAi,
    projectSubTypesFreestyle,
    availableFeatures
  } from '$lib/configs/wizard-config';
  import ResetModal from '../modals/general/reset-modal.svelte';
  import ContactModalEnhanced from '../modals/general/contact-modal-enhanced.svelte';
  import ProjectCategory from './steps/project-category.svelte';
  import ProjectTypeWebApp from './steps/project-type-web-app.svelte';
  import ProjectTypeAiFreestyle from './steps/project-type-ai-freestyle.svelte';
  import ProjectSubTypeWebsite from './steps/project-sub-type-website.svelte';
  import ProjectSubTypeApp from './steps/project-sub-type-apps.svelte';
  import ProjectSubTypeAi from './steps/project-sub-type-ai.svelte';
  import ProjectSubTypeFreestyle from './steps/project-sub-type-freestyle.svelte';
  import ProjectFeatures from './steps/project-features.svelte';
  import ProjectBasicDetails from './steps/project-basic-details.svelte';
  import ProjectSummaryEnhanced from './steps/project-summary-enhanced.svelte';

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
  const basicSteps = [
    { id: 1, title: 'wizard_stepCategory_title', required: true },
    { id: 2, title: 'wizard_stepType_title', required: true },
    { id: 3, title: 'wizard_stepSubType_title', required: true },
    { id: 4, title: 'wizard_stepBasicDetails_title', required: true },
    { id: 5, title: 'wizard_stepFeatures_title', required: true },
    { id: 6, title: 'wizard_stepSummary_title', required: false }
  ];
  const maxSteps = basicSteps.length;
  let currentStep = $state(1);

  // Features step is skipped for ki-and-freestyle category (known after step 1)
  const featuresDisabled = $derived(config.projectCategory === 'ki-and-freestyle');
  const FEATURES_STEP = 5;
  let showSuccessMessage = $state(false);
  let resetModal: ResetModal;
  let contactModal: ContactModalEnhanced;

  // Functions
  function selectProjectCategory(category: string) {
    config.projectCategory = category;
    config.projectType = '';
    config.subType = '';
    config.features = ['cookieConsent'];
  }

  function selectProjectType(type: string) {
    config.projectType = type;
    config.subType = '';
    config.features = ['cookieConsent'];
  }

  function selectProjectSubType(subType: string) {
    config.subType = subType;
    config.features = ['cookieConsent'];
    calculatePrice();
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

    // For pwaSimple: base price depends on chosen approach
    if (config.subType === 'pwaSimple') {
      if (config.pwaApproach === 'new') basePrice = 3000;
      else if (config.pwaApproach === 'extend') basePrice = 1999;
    }

    // --- KI & Freestyle: price based on expert days × daily rate with volume discount ---
    if (config.projectCategory === 'ki-and-freestyle') {
      const expertDays = config.estimatedExpertDays ?? 0;
      if (expertDays > 0) {
        const DAILY_RATE = 1000;
        // Volume discount: 1% per day over 10, capped at 20%
        // 10 days = 10.000 €, 11 days ≈ 10.900 €, 30 days = 24.000 €, 40 days = 32.000 €
        const discountPercent = Math.min(Math.max(0, expertDays - 10), 20);
        const rawPrice = expertDays * DAILY_RATE * (1 - discountPercent / 100);
        config.estimatedPrice = Math.round(rawPrice / 100) * 100;
      } else {
        // No expert days given → use subtype base price as minimum indicator
        config.estimatedPrice = basePrice;
      }
      return;
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
    // Prevent jumping to the Features step when it is disabled
    if (featuresDisabled && step === FEATURES_STEP) return;
    if (step >= 1 && step <= maxSteps) {
      currentStep = step;
      scrollToTop();
      if (currentStep === maxSteps) {
        calculatePrice();
      }
    }
  }

  function nextStep() {
    if (currentStep < maxSteps) {
      // Skip Features step for aiSolution / freestyle
      const next = featuresDisabled && currentStep === FEATURES_STEP - 1 ? FEATURES_STEP + 1 : currentStep + 1;
      currentStep = next;
      scrollToTop();
      if (currentStep === maxSteps) {
        calculatePrice();
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      // Skip Features step for aiSolution / freestyle (going backwards)
      const prev = featuresDisabled && currentStep === FEATURES_STEP + 1 ? FEATURES_STEP - 1 : currentStep - 1;
      currentStep = prev;
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
  }

  function openResetModal() {
    resetModal?.openModal();
  }

  function openContactModal() {
    contactModal?.openModal();
  }
</script>

<div class="wizard-scroll-container">
  <div class="wizard-basic-container">
    <!-- Progress Bar -->
    <div class="progress-wrapper">
      <div class="progress-bar">
        <progress
          class="progress progress-primary h-8 w-full"
          value={currentStep === 1 ? 0.05 : currentStep === maxSteps ? currentStep : currentStep - 0.5}
          max={maxSteps}
        ></progress>
      </div>

      <div class="wizard-steps grid gap-3" style="grid-template-columns: repeat({maxSteps}, minmax(0, 1fr));">
        {#each basicSteps as step, i}
          {@const isDisabled = featuresDisabled && step.id === FEATURES_STEP}
          <button
            type="button"
            class:active={currentStep === i + 1}
            class:touched={currentStep > i + 1 && !isDisabled}
            class:step-disabled={isDisabled}
            disabled={isDisabled}
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
        <ProjectBasicDetails {config}></ProjectBasicDetails>
      {:else if currentStep === 5}
        <ProjectFeatures {config} {calculatePrice}></ProjectFeatures>
      {:else if currentStep === 6}
        <ProjectSummaryEnhanced {config} {openContactModal} {openResetModal}></ProjectSummaryEnhanced>
      {/if}
    </div>

    {#if currentStep != 6}
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
          <button type="button" class="btn-basic m-auto max-w-md grow md:mr-0 md:ml-auto md:grow-0" onclick={nextStep}>
            {m.wizard_navigation_next()}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!-- Success Message -->
{#if showSuccessMessage}
  <div class="success-toast">
    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <div class="font-bold">{m.wizard_modals_thankYou_title()}</div>
        <div class="text-sm">{m.wizard_modals_thankYou_subtitle()}</div>
      </div>
      <button type="button" class="btn btn-sm btn-circle btn-ghost" onclick={() => (showSuccessMessage = false)}>✕</button>
    </div>
  </div>
{/if}

<!-- Reset Modal -->
<ResetModal bind:this={resetModal} {confirmReset} />
<ContactModalEnhanced bind:this={contactModal} projectData={config} />

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
        &.step-disabled {
          @apply text-base-content/30 cursor-not-allowed opacity-40 hover:opacity-40;
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
