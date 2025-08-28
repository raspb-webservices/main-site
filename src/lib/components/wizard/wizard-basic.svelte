<script lang="ts">
  import { onMount } from 'svelte';
  import type { WizardConfig, Project } from '$interfaces/project.interface';
  import type { Customer } from '$interfaces/customer.interface';
  import { projectTypes, subTypes, availableFeatures, getStepConfig } from './wizard-config';
  import { goto } from '$app/navigation';
  import { addMessages, _ } from 'svelte-i18n';

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

  // Customer data for contact form
  let customerData: Partial<Customer> = $state({
    salutation: '',
    givenName: '',
    familyName: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    postCode: '',
    city: '',
    country: '',
    user_metadata: {
      phone: '',
      address: '',
      city: '',
      company: '',
      country: '',
      familyName: '',
      givenName: '',
      postCode: '',
      projectIds: [],
      salutation: ''
    }
  });

  let contactComment = $state('');
  let isContactFormValid = $state(false);

  // Basic steps configuration for wizard-basic
  const basicSteps = [
    { id: 1, title: 'wizard.basic.steps.projectType', required: true },
    { id: 2, title: 'wizard.basic.steps.subType', required: true },
    { id: 3, title: 'wizard.basic.steps.features', required: false },
    { id: 4, title: 'wizard.basic.steps.summary', required: false }
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

    // Base price from project type
    const projectType = projectTypes.find((p) => p.id === config.projectType);
    if (projectType) {
      basePrice = (projectType.lowestPrice + projectType.highestPrice) / 2;
    }

    // Subtype price (replaces base price)
    const subTypeData = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);
    if (subTypeData) {
      basePrice = subTypeData.price;
    }

    // Additional complexity from features (simplified calculation)
    const featureMultiplier = 1 + (config.features.length - 1) * 0.1; // 10% per additional feature

    config.estimatedPrice = Math.round(basePrice * featureMultiplier);
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

  function openContactModal() {
    showContactModal = true;
  }

  function closeContactModal() {
    showContactModal = false;
    customerData = {
      salutation: '',
      givenName: '',
      familyName: '',
      email: '',
      company: '',
      phone: '',
      address: '',
      postCode: '',
      city: '',
      country: '',
      user_metadata: {
        phone: '',
        address: '',
        city: '',
        company: '',
        country: '',
        familyName: '',
        givenName: '',
        postCode: '',
        projectIds: [],
        salutation: ''
      }
    };
    contactComment = '';
    isContactFormValid = false;
  }

  function validateContactForm() {
    const requiredFields = ['givenName', 'familyName', 'email'];
    isContactFormValid = requiredFields.every(field => customerData[field as keyof Customer]?.toString().trim());
  }

  async function submitProjectRequest() {
    if (!isContactFormValid) return;

    isSubmitting = true;

    try {
      // Prepare project request data
      const projectRequest = {
        projectType: config.projectType,
        subType: config.subType,
        features: config.features,
        estimatedPrice: config.estimatedPrice,
        customer: customerData,
        comment: contactComment,
        timestamp: new Date().toISOString()
      };

      // Send email via API
      const response = await fetch('/api/send-project-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectRequest)
      });

      if (!response.ok) {
        throw new Error('Failed to send project request');
      }

      closeContactModal();
      showSuccessMessage = true;

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        showSuccessMessage = false;
      }, 5000);

    } catch (error) {
      console.error('Error submitting project request:', error);
      alert($_('wizard.basic.errors.submitFailed'));
    } finally {
      isSubmitting = false;
    }
  }

  function openResetModal() {
    resetModal?.showModal();
  }

  function closeResetModal() {
    resetModal?.close();
    showResetModal = false;
  }

  let resetModal: HTMLDialogElement;
  let contactModal: HTMLDialogElement;

  onMount(async () => {
    const wizardMessagesDe = (await import('$lib/i18n/locales/de/wizard.json')).default;
    const wizardMessagesEn = (await import('$lib/i18n/locales/en/wizard.json')).default;
    addMessages('de', wizardMessagesDe as any);
    addMessages('en', wizardMessagesEn as any);

    calculatePrice();
  });

  // Reactive validation
  $effect(() => {
    if (customerData.givenName || customerData.familyName || customerData.email) {
      validateContactForm();
    }
  });
</script>

<div class="wizard-basic-container">
  <!-- Header -->
  <div class="wizard-basic-header">
    <h1>{$_('wizard.basic.header.title')}</h1>
    <button type="button" class="btn btn-outline btn-sm" onclick={openResetModal}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {$_('wizard.basic.header.resetButton')}
    </button>
  </div>

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
              {$_(step.title)}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Step Content -->
  <div class="step-content-wrapper">
    {#if currentStep === 1}
      <!-- Step 1: Project Type Selection -->
      <div class="step-header">
        <h1>{$_('wizard.basic.steps.step1.title')}</h1>
        <p class="teaser">{$_('wizard.basic.steps.step1.teaser')}</p>
      </div>

      <div class="project-types-grid">
        {#each projectTypes as type}
          <div
            class="card service-card cursor-pointer transition-all duration-300"
            class:card-selected={config.projectType === type.id}
            role="button"
            tabindex="0"
            onclick={() => selectProjectType(type.id)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectProjectType(type.id);
              }
            }}
            aria-label="Select project type: {type.title}"
          >
            <div class="card-body">
              <div class="service-card-header">
                <h3 class="card-title no-padding">{$_(type.title)}</h3>
                <div class="service-icon">{type.icon}</div>
              </div>
              <p class="no-padding">{$_(type.description)}</p>
              <div class="card-actions justify-end">
                <div class="badge badge-primary">{type.lowestPrice.toLocaleString()}€ - {type.highestPrice.toLocaleString()}€</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if currentStep === 2}
      <!-- Step 2: Subtype Selection -->
      <div class="step-header">
        <h1>
          {$_('wizard.basic.steps.step2.titleFirst')}
          <span class="inner-text-special">{$_(projectTypes.find((p) => p.id === config.projectType)?.title)}</span>
          {$_('wizard.basic.steps.step2.titleSecond')}
        </h1>
        <p class="teaser">{$_('wizard.basic.steps.step2.teaser')}</p>
      </div>

      <div class="subtypes-grid">
        {#each subTypes.filter((st) => st.parentId === config.projectType) as subtype}
          <div
            class="card service-card cursor-pointer transition-all duration-300"
            class:card-selected={config.subType === subtype.id}
            role="button"
            tabindex="0"
            onclick={() => selectSubType(subtype.id)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectSubType(subtype.id);
              }
            }}
            aria-label="Select subtype: {subtype.title}"
          >
            <div class="card-body">
              <h3 class="card-title">{$_(subtype.title)}</h3>
              <p class="no-padding">{$_(subtype.description)}</p>
              <div class="card-actions justify-end">
                <div class="badge badge-success">ab {subtype.price.toLocaleString()}€</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if currentStep === 3}
      <!-- Step 3: Features Selection -->
      <div class="step-header">
        <h1>{$_('wizard.basic.steps.step3.title')}</h1>
        <p class="teaser">{$_('wizard.basic.steps.step3.teaser')}</p>
      </div>

      <div class="features-grid">
        {#each availableFeatures.slice(0, 12) as feature} <!-- Limit to first 12 features for simplicity -->
          <label class="card service-card cursor-pointer transition-all duration-300" class:card-selected={config.features.includes(feature.name)}>
            <div class="card-body">
              <div class="card-actions items-center justify-start">
                <input type="checkbox" class="checkbox checkbox-primary" bind:group={config.features} value={feature.name} onchange={() => calculatePrice()} />
                <h3 class="card-title no-padding">{$_(feature.title)}</h3>
              </div>
              <p class="no-padding text-sm">{$_(feature.description)}</p>
            </div>
          </label>
        {/each}
      </div>
    {:else if currentStep === 4}
      <!-- Step 4: Summary -->
      <div class="step-header">
        <h1>{$_('wizard.basic.steps.step4.title')}</h1>
        <p class="teaser">{$_('wizard.basic.steps.step4.teaser')}</p>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <h3>{$_('wizard.basic.summary.projectType')}</h3>
          <p class="summary-value">{$_(projectTypes.find((p) => p.id === config.projectType)?.title)}</p>
          <p class="summary-subvalue">{$_(subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType)?.title)}</p>
        </div>

        {#if config.features.length > 1}
          <div class="summary-card">
            <h3>{$_('wizard.basic.summary.selectedFeatures')}</h3>
            <div class="features-list">
              {#each config.features.filter(f => f !== 'cookieConsent') as featureId}
                <span class="feature-badge">{$_(availableFeatures.find((f) => f.name === featureId)?.title)}</span>
              {/each}
            </div>
          </div>
        {/if}

        <div class="price-card">
          <h3>{$_('wizard.basic.summary.estimatedPrice')}</h3>
          <div class="price-display">
            <div class="price-range">
              <span class="price-min">{Math.round(config.estimatedPrice * 0.8).toLocaleString()}€</span>
              <span class="price-separator">-</span>
              <span class="price-max">{Math.round(config.estimatedPrice * 1.2).toLocaleString()}€</span>
            </div>
            <p class="price-note">{$_('wizard.basic.summary.priceNote')}</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button type="button" class="btn btn-primary btn-lg" onclick={openContactModal}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {$_('wizard.basic.summary.requestProject')}
        </button>
      </div>
    {/if}
  </div>

  <!-- Navigation -->
  <div class="wizard-basic-navigation">
    {#if currentStep > 1}
      <button type="button" class="btn-basic grow md:grow-0" onclick={prevStep}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {$_('wizard.basic.navigation.back')}
      </button>
    {:else}
      <div></div>
    {/if}

    {#if currentStep < maxSteps}
      <button
        type="button"
        class="btn-basic flex-grow md:flex-grow-0"
        onclick={nextStep}
        disabled={(currentStep === 1 && !config.projectType) ||
          (currentStep === 2 && !config.subType)}
      >
        {$_('wizard.basic.navigation.next')}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>
</div>

<!-- Contact Modal -->
<dialog bind:this={contactModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={closeContactModal}>✕</button>
    </form>

    <h3 class="mb-6 text-lg font-bold">{$_('wizard.basic.contact.title')}</h3>

    <div class="space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="form-control w-full">
          <label class="label" for="salutation">
            <span class="label-text">{$_('wizard.basic.contact.salutation')}</span>
          </label>
          <select id="salutation" class="select select-bordered w-full" bind:value={customerData.salutation}>
            <option value="">{$_('wizard.basic.contact.salutationPlaceholder')}</option>
            <option value="Herr">{$_('wizard.basic.contact.mr')}</option>
            <option value="Frau">{$_('wizard.basic.contact.ms')}</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label" for="givenName">
            <span class="label-text">{$_('wizard.basic.contact.firstName')} *</span>
          </label>
          <input
            type="text"
            id="givenName"
            class="input input-bordered w-full"
            bind:value={customerData.givenName}
            placeholder={$_('wizard.basic.contact.firstNamePlaceholder')}
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="familyName">
            <span class="label-text">{$_('wizard.basic.contact.lastName')} *</span>
          </label>
          <input
            type="text"
            id="familyName"
            class="input input-bordered w-full"
            bind:value={customerData.familyName}
            placeholder={$_('wizard.basic.contact.lastNamePlaceholder')}
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">{$_('wizard.basic.contact.email')} *</span>
          </label>
          <input
            type="email"
            id="email"
            class="input input-bordered w-full"
            bind:value={customerData.email}
            placeholder={$_('wizard.basic.contact.emailPlaceholder')}
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="company">
            <span class="label-text">{$_('wizard.basic.contact.company')}</span>
          </label>
          <input
            type="text"
            id="company"
            class="input input-bordered w-full"
            bind:value={customerData.company}
            placeholder={$_('wizard.basic.contact.companyPlaceholder')}
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="phone">
            <span class="label-text">{$_('wizard.basic.contact.phone')}</span>
          </label>
          <input
            type="tel"
            id="phone"
            class="input input-bordered w-full"
            bind:value={customerData.phone}
            placeholder={$_('wizard.basic.contact.phonePlaceholder')}
          />
        </div>
      </div>

      <div class="form-control w-full">
        <label class="label" for="comment">
          <span class="label-text">{$_('wizard.basic.contact.comment')}</span>
        </label>
        <textarea
          id="comment"
          class="textarea textarea-bordered w-full"
          bind:value={contactComment}
          placeholder={$_('wizard.basic.contact.commentPlaceholder')}
          rows="4"
        ></textarea>
      </div>

      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class="font-bold">{$_('wizard.basic.contact.privacy')}</div>
          <div class="text-sm">{$_('wizard.basic.contact.privacyText')}</div>
        </div>
      </div>
    </div>

    <div class="modal-action">
      <button type="button" class="btn btn-outline" onclick={closeContactModal}>
        {$_('wizard.basic.contact.cancel')}
      </button>
      <button
        type="button"
        class="btn btn-primary"
        onclick={submitProjectRequest}
        disabled={!isContactFormValid || isSubmitting}
      >
        {#if isSubmitting}
          <span class="loading loading-spinner loading-sm"></span>
          {$_('wizard.basic.contact.sending')}
        {:else}
          {$_('wizard.basic.contact.send')}
        {/if}
      </button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Success Message -->
{#if showSuccessMessage}
  <div class="success-toast">
    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <div class="font-bold">{$_('wizard.basic.success.title')}</div>
        <div class="text-sm">{$_('wizard.basic.success.message')}</div>
      </div>
      <button type="button" class="btn btn-sm btn-circle btn-ghost" onclick={() => showSuccessMessage = false}>✕</button>
    </div>
  </div>
{/if}

<!-- Reset Modal -->
<dialog bind:this={resetModal} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
    </form>

    <h3 class="mb-4 text-lg font-bold">{$_('wizard.basic.reset.title')}</h3>
    <p class="py-4">{$_('wizard.basic.reset.description')}</p>

    <div class="modal-action">
      <button type="button" class="btn btn-outline" onclick={closeResetModal}>{$_('wizard.basic.reset.cancel')}</button>
      <button type="button" class="btn btn-error" onclick={confirmReset}>{$_('wizard.basic.reset.confirm')}</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../app.css';

  /* Wizard Basic Container */
  .wizard-basic-container {
    @apply bg-base-100 border-base-300 rounded-2xl border shadow-lg;
  }

  /* Header */
  .wizard-basic-header {
    @apply border-base-300 mb-8 flex items-center justify-between border-b px-6 py-4;
    h1 {
      @apply text-base-content m-0 p-0;
    }
  }

  /* Progress Bar */
  .progress-wrapper {
    @apply mx-6 mb-12;
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

  .step-header {
    @apply border-t-base-content/40 mt-8 mb-12 border-t pt-10 text-center md:border-t-0 md:pt-0;
    h1 {
      @apply text-base-content mb-4;
    }
    p.teaser {
      @apply text-base-content/70;
    }
  }

  /* Grid Layouts */
  .project-types-grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
  }

  .subtypes-grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2;
  }

  .features-grid {
    @apply mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3;
  }

  .summary-grid {
    @apply mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2;
  }

  /* Service Cards */
  .service-card {
    @apply bg-base-100 border-base-300 border transition-all duration-300;
    &:hover {
      @apply bg-base-200 border-base-300;
    }
    &.card-selected {
      @apply ring-primary ring-offset-base-100 ring-2 ring-offset-2;
      &:hover {
        @apply bg-base-100 cursor-default;
      }
    }
    .service-card-header {
      @apply mb-4 flex items-center justify-between;
      .service-icon {
        @apply text-3xl;
      }
    }
    .card-body {
      @apply text-base-content;
      .card-title {
        @apply text-base-content;
      }
      p {
        @apply text-base-content/80;
      }
    }
  }

  /* Summary Cards */
  .summary-card {
    @apply bg-base-200 border-base-300 rounded-xl border p-6;
    h3 {
      @apply text-base-content mb-3 text-lg font-semibold;
    }
    .summary-value {
      @apply text-base-content mb-1 text-xl font-bold;
    }
    .summary-subvalue {
      @apply text-base-content/70 text-sm;
    }
    .features-list {
      @apply flex flex-wrap gap-2;
    }
    .feature-badge {
      @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm;
    }
  }

  .price-card {
    @apply bg-success/10 border-success/20 rounded-xl border p-6 lg:col-span-2;
    h3 {
      @apply text-base-content mb-4 text-xl font-bold;
    }
    .price-display {
      @apply text-center;
    }
    .price-range {
      @apply mb-2 flex items-center justify-center gap-2;
      .price-min, .price-max {
        @apply text-success text-3xl font-bold;
      }
      .price-separator {
        @apply text-base-content/50;
      }
    }
    .price-note {
      @apply text-base-content/70 text-sm;
    }
  }

  /* Action Buttons */
  .action-buttons {
    @apply flex justify-center;
  }

  /* Navigation */
  .wizard-basic-navigation {
    @apply border-base-300 bg-base-100 flex flex-wrap items-center justify-between gap-4 border-t p-6;
  }

  /* Success Toast */
  .success-toast {
    @apply fixed top-4 right-4 z-50 max-w-sm;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .wizard-basic-container {
      @apply mx-2 rounded-xl;
    }
    .wizard-basic-header {
      @apply px-4;
      h1 {
        @apply text-2xl;
      }
    }
    .progress-wrapper {
      @apply mx-4 mb-8;
    }
    .step-content-wrapper {
      @apply px-4;
    }
    .wizard-basic-navigation {
      @apply px-4;
    }
    .summary-grid {
      @apply gap-4;
    }
    .price-card {
      @apply p-4;
      .price-min, .price-max {
        @apply text-2xl;
      }
    }
  }
</style>
