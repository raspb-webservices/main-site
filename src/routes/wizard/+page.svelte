<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import WizardBasic from '$lib/components/wizard/wizard-basic.svelte';
  import Wizard from '$lib/components/wizard/wizard-extended.svelte';
  import { isAuthenticated } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { localizeHref } from '$lib/paraglide/runtime';

  async function login() {
    const popup = openAuth0Popup(450, 650);
    try {
      if (!popup) throw new Error('Popup konnte nicht geöffnet werden (Popup-Blocker?).');
      const auth0Client = await auth.getClient();
      await auth.loginWithPopup(auth0Client, { authorizationParams: {} }, popup);
    } catch (e) {
      console.error('Error occurred: ', e);
    }
  }

  let loggedin = $derived(isAuthenticated.value);
  interface PageData {
    projectType: string | null;
    subType: string | null;
  }

  const { data }: { data: PageData } = $props();
  let selectedWizard = $state<'basic' | 'advanced' | null>(null);

  function scrollToWizard(offset = 0) {
    setTimeout(() => {
      const target = document.getElementById('wizard');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  }

  onMount(() => {
    if (data.projectType || data.subType) scrollToWizard();
  });

  function selectWizard(type: 'basic' | 'advanced') {
    selectedWizard = type;
    scrollToWizard();
  }
</script>

<svelte:head>
  <title>{m.getStarted_meta_title()}</title>
  <meta name="description" content={m.getStarted_meta_description()} />
  <meta property="og:title" content={m.getStarted_meta_title()} />
  <meta property="og:description" content={m.getStarted_meta_description()} />
</svelte:head>

<section class="get-started-content-wrapper">
  <div class="hero-section">
    <div class="intro prose">
      <h1>{m.getStarted_hero_title()} <span class="inner-text-special">{m.getStarted_hero_titleHighlight()}</span></h1>
      <p class="teaser">{m.getStarted_teaser_description()}</p>
    </div>

    <div class="teaser-content">
      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-text">
            <h3>{m.getStarted_benefits_fast_title()}</h3>
            <p>{m.getStarted_benefits_fast_description()}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">💰</div>
          <div class="benefit-text">
            <h3>{m.getStarted_benefits_transparent_title()}</h3>
            <p>{m.getStarted_benefits_transparent_description()}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">🎯</div>
          <div class="benefit-text">
            <h3>{m.getStarted_benefits_precise_title()}</h3>
            <p>{m.getStarted_benefits_precise_description()}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">📋</div>
          <div class="benefit-text">
            <h3>{m.getStarted_benefits_documentation_title()}</h3>
            <p>{m.getStarted_benefits_documentation_description()}</p>
          </div>
        </div>
      </div>

      <div class="cta-text">
        <p class="no-padding">
          <strong>{m.getStarted_cta_title()}</strong>
          {m.getStarted_cta_description()}
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
      <h2 class="mb-4 text-2xl font-bold">{m.getStarted_wizardSelection_basicConfiguratorTitle()}</h2>
      <p class="text-lg">{m.getStarted_wizardSelection_basicConfiguratorDescription()}</p>
    </button>

    <button
      class="wizard-card transform rounded-xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-105
             {selectedWizard === 'advanced' ? 'bg-primary text-primary-content ring-primary ring-4' : 'bg-base-200 text-base-content'}"
      onclick={() => selectWizard('advanced')}
    >
      <div class="wizard-icon">⚙️</div>
      <h2 class="mb-4 text-2xl font-bold">{m.getStarted_wizardSelection_advancedConfiguratorTitle()}</h2>
      <p class="text-lg">{m.getStarted_wizardSelection_advancedConfiguratorDescription()}</p>
    </button>
  </div>

  <div class="wizard-section prose" id="wizard">
    {#if selectedWizard === 'basic'}
      <WizardBasic />
    {:else if selectedWizard === 'advanced'}
      {#if loggedin}
        <Wizard />
      {:else}
        <h2>{m.getStarted_registrationPrompt_title()}</h2>
        <p>
          {m.getStarted_registrationPrompt_description1()}
        </p>
        <p>
          {m.getStarted_registrationPrompt_description2()}
        </p>
        <div class="flex gap-6">
          <button
            class="btn-basic animate-fade-in-from-side"
            onclick={() => {
              goto(localizeHref('/registration'));
            }}>{m.getStarted_registrationPrompt_registrationButton()}</button
          >
          <button
            class="btn-basic animate-fade-in-from-side"
            onclick={() => {
              login();
            }}>{m.getStarted_registrationPrompt_loginButton()}</button
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
    @apply mt-8 mb-16;
    .intro {
      @apply m-auto flex max-w-4xl flex-col items-center justify-center pb-8 text-center;
    }
  }

  .teaser-content {
    @apply mx-auto max-w-4xl;
  }

  .benefits-grid {
    @apply mb-12 grid grid-cols-1 gap-8 md:grid-cols-2;
  }

  .benefit-item {
    @apply bg-base-200 text-base-content flex items-start gap-4 rounded-xl p-6 shadow-sm;
    transition: all 0.3s ease;

    &:hover {
      @apply -translate-y-0.5 shadow-md;
    }
  }

  .wizard-card {
    cursor: pointer;
  }

  .wizard-icon {
    @apply mb-4 text-center text-5xl;
  }

  .benefit-icon {
    @apply shrink-0 text-3xl;
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
    @apply mb-24;
  }
</style>
