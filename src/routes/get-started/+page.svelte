<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
  import Wizard from '$lib/components/wizard/wizard.svelte';
  import WizardBasic from '$lib/components/wizard/wizard-basic.svelte';

  interface PageData {
    projectType: string | null;
    subType: string | null;
  }

  const { data }: { data: PageData } = $props();

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
</script>

<svelte:head>
  <title>{$_('getStarted.meta.title')}</title>
  <meta name="description" content={$_('getStarted.meta.description')} />
</svelte:head>

<section class="get-started-content-wrapper">

  <div class="hero-section">
    <h1>{$_('getStarted.hero.title')} <span class="inner-text-special">{$_('getStarted.hero.titleHighlight')}</span></h1>
    <div class="teaser-content">
      <p class="lead-text">
        {$_('getStarted.teaser.description')}
      </p>

      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-text">
            <h3>{$_('getStarted.benefits.fast.title')}</h3>
            <p>{$_('getStarted.benefits.fast.description')}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">💰</div>
          <div class="benefit-text">
            <h3>{$_('getStarted.benefits.transparent.title')}</h3>
            <p>{$_('getStarted.benefits.transparent.description')}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">🎯</div>
          <div class="benefit-text">
            <h3>{$_('getStarted.benefits.precise.title')}</h3>
            <p>{$_('getStarted.benefits.precise.description')}</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">📋</div>
          <div class="benefit-text">
            <h3>{$_('getStarted.benefits.documentation.title')}</h3>
            <p>{$_('getStarted.benefits.documentation.description')}</p>
          </div>
        </div>
      </div>

      <div class="cta-text">
        <p class="no-padding">
          <strong>{$_('getStarted.cta.title')}</strong> {$_('getStarted.cta.description')}
        </p>
      </div>
    </div>
  </div>

  <div class="auswahl-box">

  </div>


  <div class="wizard-section" id="wizard">
    <Wizard initialProjectType={data.projectType} initialSubType={data.subType} />
    <WizardBasic />
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
    @apply bg-base-200 flex items-start gap-4 rounded-xl p-6 shadow-sm text-base-content;
    transition: all 0.3s ease;

    &:hover {
      @apply translate-y-[-2px] shadow-md;
    }
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
    @apply bg-base-200 border-base-300 rounded-xl border p-6 text-center text-base-content;

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
