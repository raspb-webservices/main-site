<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import WizardBasic from '$lib/components/wizard/wizard-basic.svelte';
  import Wizard from '$lib/components/wizard/wizard.svelte';
  import { isAuthenticated } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import { openAuth0Popup } from '$helper/loginOpener';

  async function login() {
    const popup: Window = openAuth0Popup(450, 650);
    try {
      if (!popup) throw new Error('Popup konnte nicht geöffnet werden (Popup-Blocker?).');
      const auth0Client = await auth.createClient();
      await auth.loginWithPopup(auth0Client, { authorizationParams: {} }, popup);
    } catch (e) {
      console.error('Error occurred: ', e);
    }
  }

  let loggedin = $derived(isAuthenticated.get());
  interface PageData {
    projectType: string | null;
    subType: string | null;
  }

  const { data }: { data: PageData } = $props();
  let selectedWizard = $state<'basic' | 'advanced' | null>(null);

  function scrollToWizard(offset = 0) {
    const target = document.getElementById('wizard');
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    if (data.projectType || data.subType) {
      setTimeout(() => {
        scrollToWizard(30);
      }, 300);
    }
  });

  function selectWizard(type: 'basic' | 'advanced') {
    selectedWizard = type;
    setTimeout(() => {
      scrollToWizard(100);
    }, 100);
  }
</script>

<svelte:head>
  <title>{m['getStarted.meta.title']()}</title>
  <meta name="description" content={m['getStarted.meta.description']()} />
</svelte:head>

<section class="get-started-content-wrapper">
  <div class="hero-section">
    <h1>{m['getStarted.hero.title']()} <span class="inner-text-special">{m['getStarted.hero.titleHighlight']()}</span></h1>
    <div class="teaser-content">
      <p class="lead-text">
        {m['getStarted.teaser.description']()}
      </p>

      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-text">
            <h3>{m['getStarted.benefits.fast.title']()}</h3>
            <p>{m['getStarted.benefits.fast.description']()}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">💰</div>
          <div class="benefit-text">
            <h3>{m['getStarted.benefits.transparent.title']()}</h3>
            <p>{m['getStarted.benefits.transparent.description']()}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">🎯</div>
          <div class="benefit-text">
            <h3>{m['getStarted.benefits.precise.title']()}</h3>
            <p>{m['getStarted.benefits.precise.description']()}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">📋</div>
          <div class="benefit-text">
            <h3>{m['getStarted.benefits.documentation.title']()}</h3>
            <p>{m['getStarted.benefits.documentation.description']()}</p>
          </div>
        </div>
      </div>

      <div class="cta-text">
        <p class="no-padding">
          <strong>{m['getStarted.cta.title']()}</strong>
          {m['getStarted.cta.description']()}
        </p>
      </div>
    </div>
  </div>

  <div class="auswahl-box wizard-selection mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
    <button
      class="wizard-card transform rounded-xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-105
             {selectedWizard === 'basic' ? 'bg-primary text-primary-content ring-primary ring-4' : 'bg-base-200 text-base-content'}"
      onclick={() => selectWizard('basic')}
    >
      <div class="wizard-icon">✨</div>
      <h2 class="mb-4 text-2xl font-bold">{m['getStarted.wizardSelection.basicConfiguratorTitle']()}</h2>
      <p class="text-lg">{m['getStarted.wizardSelection.basicConfiguratorDescription']()}</p>
    </button>

    <button
      class="wizard-card transform rounded-xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-105
             {selectedWizard === 'advanced' ? 'bg-primary text-primary-content ring-primary ring-4' : 'bg-base-200 text-base-content'}"
      onclick={() => selectWizard('advanced')}
    >
      <div class="wizard-icon">⚙️</div>
      <h2 class="mb-4 text-2xl font-bold">{m['getStarted.wizardSelection.advancedConfiguratorTitle']()}</h2>
      <p class="text-lg">{m['getStarted.wizardSelection.advancedConfiguratorDescription']()}</p>
    </button>
  </div>

  <div class="wizard-section prose" id="wizard">
    {#if selectedWizard === 'basic'}
      <WizardBasic />
    {:else if selectedWizard === 'advanced'}
      {#if loggedin}
        <Wizard />
      {:else}
        <h2>{m['getStarted.registrationPrompt.title']()}</h2>
        <p>
          {m['getStarted.registrationPrompt.description1']()}
        </p>
        <p>
          {m['getStarted.registrationPrompt.description2']()}
        </p>
        <div class="flex gap-6">
          <button
            class="btn-basic animate-fade-in-from-side"
            onclick={() => {
              goto('/registration');
            }}>{m['getStarted.registrationPrompt.registrationButton']()}</button
          >
          <button
            class="btn-basic animate-fade-in-from-side"
            onclick={() => {
              login();
            }}>{m['getStarted.registrationPrompt.loginButton']()}</button
          >
        </div>
      {/if}
    {/if}
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  section.get-started-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
  }

  .hero-section {
    @apply mb-16 text-center;

    h1 {
      @apply mb-8;
    }
  }

  .teaser-content {
    @apply mx-auto max-w-4xl;
  }

  .lead-text {
    @apply text-base-content/80 mb-12 text-center text-xl;
    line-height: 1.6;
  }

  .benefits-grid {
    @apply mb-12 grid grid-cols-1 gap-8 md:grid-cols-2;
  }

  .benefit-item {
    @apply bg-base-200 text-base-content flex items-start gap-4 rounded-xl p-6 shadow-sm;
    transition: all 0.3s ease;

    &:hover {
      @apply translate-y-[-2px] shadow-md;
    }
  }

  .wizard-card {
    cursor: pointer;
  }

  .wizard-icon {
    @apply mb-4 text-center text-5xl;
  }

  .benefit-icon {
    @apply flex-shrink-0 text-3xl;
  }

  .benefit-text {
    h3 {
      @apply text-base-content mb-2 text-lg font-semibold;
    }

    p {
      @apply text-base-content/70 text-sm leading-relaxed;
    }
  }

  .cta-text {
    @apply bg-base-200 border-base-300 text-base-content rounded-xl border p-6 text-center;

    p {
      @apply text-base-content/80 text-base leading-relaxed;
      margin: 0;
    }

    strong {
      @apply text-primary font-semibold;
    }
  }

  .wizard-section {
    @apply mb-16;
  }
</style>
