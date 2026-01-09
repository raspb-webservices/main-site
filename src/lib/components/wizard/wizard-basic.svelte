<script lang="ts">
  import { onMount } from 'svelte';
  import type { WizardConfig, Project } from '$interfaces/project.interface';
  import { projectTypes, subTypes, availableFeatures, getStepConfig, featureCategoryColors } from '$lib/configs/wizard-config';
  import { goto } from '$app/navigation';
  import type { User } from '$interfaces/user.interface';
  import ResetModal from '../modals/general/reset-modal.svelte';
  import ProjectType from './steps/project-type.svelte';
  import ProjectSubType from './steps/project-sub-type.svelte';
  import ProjectFeatures from './steps/project-features.svelte';
  import ProjectSummary from './steps/project-summary.svelte';
  import { m } from '$lib/paraglide/messages';

  // State
  let currentStep = $state(1);
  let showResetModal = $state(false);
  let showContactModal = $state(false);
  let isSubmitting = $state(false);
  let showSuccessMessage = $state(false);

  let config: WizardConfig = $state({
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

  // Basic steps configuration for wizard-basic
  const basicSteps = [
    { id: 1, title: 'wizard.config.steps.projekttyp', required: true },
    { id: 2, title: 'wizard.config.steps.details', required: true },
    { id: 3, title: 'wizard.config.steps.features', required: false },
    { id: 4, title: 'wizard.config.steps.ergebnis', required: false }
  ];

  const maxSteps = basicSteps.length;

  // Functions
  function selectProjectType(type: string) {
    config.projectType = type;
    config.subType = '';
    config.features = ['cookieConsent']; // Reset to default
    calculatePrice();
  }

  function selectSubType(subType: string) {
    config.subType = subType;
    calculatePrice();
  }

  function calculatePrice() {
    let basePrice = 0;
    let totalFeatureComplexity = 0;
    let highesPossible;
    let lowestPossible;

    const projectType = projectTypes.find((p) => p.id === config.projectType);
    if (projectType) {
      basePrice = (projectType.lowestPrice + projectType.highestPrice) / 2;
    }

    const subTypeData = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);
    if (subTypeData) {
      basePrice = subTypeData.lowestPrice;
      lowestPossible = subTypeData.lowestPrice;
      highesPossible = subTypeData.highestPrice;
    }

    config.features.forEach((featureName) => {
      const feature = availableFeatures.find((f) => f.name === featureName);
      if (feature && feature.category) {
        totalFeatureComplexity += feature.complexityFactor || 0;
      }
    });

    if (totalFeatureComplexity > 15) {
      basePrice = highesPossible;
    } else if (totalFeatureComplexity <= 2) {
      basePrice = lowestPossible;
    } else {
      const range = highesPossible - lowestPossible;
      let x = (1 / 15) * totalFeatureComplexity;
      basePrice = lowestPossible + range * x;
    }
    config.estimatedPrice = basePrice;
    console.log('Estimated Price:', config.estimatedPrice);
    console.log('Total Feature Complexity:', totalFeatureComplexity);
  }

  function scrollToTop() {
    setTimeout(() => {
      const wizardContainer = document.querySelector('.wizard-basic-container');
      if (wizardContainer) {
        wizardContainer.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  }

  function goToStep(step: number) {
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
      currentStep++;
      scrollToTop();
      if (currentStep === maxSteps) {
        calculatePrice();
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
    closeResetModal();
  }

  function openContact() {}

  function openResetModal() {
    resetModal?.openModal();
  }

  function closeResetModal() {
    resetModal?.closeModal();
    showResetModal = false;
  }

  let resetModal: ResetModal;

  onMount(async () => {
    calculatePrice();
  });

  function getTop() {
    const subTypeData = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);
    if (subTypeData) {
      return subTypeData.highestPrice;
    } else {
      return 0;
    }
  }

  function getLow() {
    const subTypeData = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);
    if (subTypeData) {
      return subTypeData.lowestPrice;
    } else {
      return 0;
    }
  }
</script>

<div class="wizard-basic-container">
  <!-- Progress Bar -->
  <div class="progress-wrapper">
    <div class="progress-basic">
      <div class="relative flex w-full items-center justify-between">
        <!-- Background connecting line -->
        <div class="bg-base-300 absolute top-6 right-0 left-0 mx-8 h-0.5"></div>
        <!-- Progress connecting line -->
        <div
          class="bg-primary absolute top-6 right-0 left-0 mx-8 h-0.5 transition-all duration-300"
          style="width: {currentStep > 1 ? `calc(${((currentStep - 1) / (basicSteps.length - 1)) * 100}% - ${currentStep - 1.5}rem )` : '0%'}"
        ></div>

        {#each basicSteps as step, i}
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
            <div class="text-base-content mt-2 max-w-20 text-center text-xs font-medium">
              {m[step.title]()}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Step Content -->
  <div class="step-content-wrapper">
    {#if currentStep === 1}
      <ProjectType {config} {selectProjectType}></ProjectType>
    {:else if currentStep === 2}
      <ProjectSubType {config} {selectSubType}></ProjectSubType>
    {:else if currentStep === 3}
      <ProjectFeatures {config} {calculatePrice}></ProjectFeatures>
    {:else if currentStep === 4}
      <ProjectSummary {config} {featureCategoryColors} {getTop} {getLow} {openContact} {openResetModal}></ProjectSummary>
    {/if}
  </div>
  {#if currentStep != 4}
    <!-- Navigation -->
    <div class="wizard-basic-navigation">
      {#if currentStep > 1}
        <button type="button" class="btn-basic grow md:grow-0" onclick={prevStep}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {m['wizard.navigation.back']()}
        </button>
      {:else}
        <div></div>
      {/if}

      {#if currentStep < maxSteps}
        <button
          type="button"
          class="btn-basic grow md:grow-0"
          onclick={nextStep}
          disabled={(currentStep === 1 && !config.projectType) || (currentStep === 2 && !config.subType)}
        >
          {m['wizard.navigation.next']()}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      {/if}
    </div>
  {/if}
</div>

<!-- Success Message -->
{#if showSuccessMessage}
  <div class="success-toast">
    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <div class="font-bold">{m['wizard.modals.thankYou.title']()}</div>
        <div class="text-sm">{m['wizard.modals.thankYou.subtitle']()}</div>
      </div>
      <button type="button" class="btn btn-sm btn-circle btn-ghost" onclick={() => (showSuccessMessage = false)}>✕</button>
    </div>
  </div>
{/if}

<!-- Reset Modal -->
<ResetModal bind:this={resetModal} {confirmReset} />

<style lang="postcss">
  @reference '../../../app.css';

  /* Wizard Basic Container */
  .wizard-basic-container {
    @apply bg-base-100 border-base-300 rounded-2xl border shadow-lg;
  }

  /* Progress Bar */
  .progress-wrapper {
    @apply mx-6 my-12;
  }

  .progress-basic {
    .progressbar-relative {
      @apply flex items-center justify-center;
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
