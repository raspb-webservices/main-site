<script lang="ts">
  import { m } from '$lib/paraglide/messages';

  import type { WizardConfig } from '$interfaces/project.interface';

  import ResetModal from '../modals/general/reset-modal.svelte';
  import ContactModal from '../modals/general/contact-modal.svelte';  

  import ProjectCategory from './steps/project-category.svelte';
  import ProjectTypeWebApp from './steps/project-type-web-app.svelte';
  import ProjectTypeAiFreestyle from './steps/project-type-ai-freestyle.svelte';

  import ProjectSubTypeWebsite from './steps/project-sub-type-website.svelte';
  import ProjectSubTypeApp from './steps/project-sub-type-apps.svelte';
  import ProjectSubTypeAi from './steps/project-sub-type-ai.svelte';
  import ProjectSubTypeFreestyle from './steps/project-sub-type-freestyle.svelte';

  import ProjectFeatures from './steps/project-features.svelte';
  import ProjectBasicDetails from './steps/project-basic-details.svelte';

  import ProjectSummary from './steps/project-summary.svelte';

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

  let currentStep = $state(1);
  let showSuccessMessage = $state(false);
  let resetModal: ResetModal;
  let contactModal: ContactModal;

  const basicSteps = [
    { id: 1, title: 'wizard.stepCategory.title', required: true },
    { id: 2, title: 'wizard.stepType.title', required: true },
    { id: 3, title: 'wizard.stepSubType.title', required: true },
    { id: 4, title: 'wizard.stepBasicDetails.title', required: true },
    { id: 5, title: 'wizard.stepFeatures.title', required: true },
    { id: 6, title: 'wizard.stepSummary.title', required: false },
  ];
  const maxSteps = basicSteps.length;

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
    let basePrice = 0;
    let totalFeatureComplexity = 0;
    let highesPossible;
    let lowestPossible;

    config.estimatedPrice = 1000;

    // const projectType = projectTypes.find((p) => p.id === config.projectType);
    // if (projectType) {
    //   basePrice = (projectType.lowestPrice + projectType.highestPrice) / 2;
    // }

    // const subTypeData = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);
    // if (subTypeData) {
    //   basePrice = subTypeData.lowestPrice;
    //   lowestPossible = subTypeData.lowestPrice;
    //   highesPossible = subTypeData.highestPrice;
    // }

    // config.features.forEach((featureName) => {
    //   const feature = availableFeatures.find((f) => f.name === featureName);
    //   if (feature && feature.category) {
    //     totalFeatureComplexity += feature.complexityFactor || 0;
    //   }
    // });

    // if (totalFeatureComplexity > 15) {
    //   basePrice = highesPossible;
    // } else if (totalFeatureComplexity <= 2) {
    //   basePrice = lowestPossible;
    // } else {
    //   const range = highesPossible - lowestPossible;
    //   let x = (1 / 15) * totalFeatureComplexity;
    //   basePrice = lowestPossible + range * x;
    // }
    // config.estimatedPrice = basePrice;
    // console.log('Estimated Price:', config.estimatedPrice);
    // console.log('Total Feature Complexity:', totalFeatureComplexity);
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
            aria-label="Go to step {i + 1}: {m[step.title]?.() ?? step.title}">{m[step.title]?.() ?? step.title}</button
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
        <ProjectSummary {config} {openContactModal} {openResetModal}></ProjectSummary>
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
            {m['wizard.navigation.back']()}
          </button>
        {/if}

        {#if currentStep < maxSteps}
          <button type="button" class="btn-basic grow md:grow-0 max-w-md m-auto md:ml-auto md:mr-0" onclick={nextStep}>
            {m['wizard.navigation.next']()}
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
        <div class="font-bold">{m['wizard.modals.thankYou.title']()}</div>
        <div class="text-sm">{m['wizard.modals.thankYou.subtitle']()}</div>
      </div>
      <button type="button" class="btn btn-sm btn-circle btn-ghost" onclick={() => (showSuccessMessage = false)}>✕</button>
    </div>
  </div>
{/if}

<!-- Reset Modal -->
<ResetModal bind:this={resetModal} {confirmReset} />
<ContactModal bind:this={contactModal} projectData={config} />

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
        @apply cursor-pointer hover:opacity-75 col-span-full md:col-span-1;

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
