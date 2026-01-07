<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { projectTypes, subTypes, availableFeatures } from '$lib/configs/wizard-config';
  import { goto } from '$app/navigation';
  let { config, featureCategoryColors, getTop, getLow, openContact, openResetModal } = $props();
</script>

<div class="step-header">
  <h1><span class="inner-text-special">{$_('wizard.steps.stepSummary.titleHighlight')}</span></h1>
  <p class="teaser">{$_('wizard.steps.stepSummary.teaser')}</p>
</div>

<div class="summary-grid">
  <div class="summary-card">
    <h3>{$_('wizard.steps.stepSummary.projectType')}</h3>
    <p class="summary-value">{$_(projectTypes.find((p) => p.id === config.projectType)?.title)}</p>
    <p class="summary-subvalue">{$_(subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType)?.title)}</p>
  </div>

  {#if config.features.length > 1}
    <div class="summary-card">
      <h3>{$_('wizard.steps.stepSummary.selectedFeatures')}</h3>
      <div class="flex flex-wrap gap-2">
        {#each config.features.filter((f) => f !== 'cookieConsent') as featureId}
          <div
            class="badge {featureCategoryColors[availableFeatures.find((f) => f.name === featureId)?.category || 'wizard.config.categories.funktionalitaet']}"
          >
            {$_(availableFeatures.find((f) => f.name === featureId)?.title)}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="price-card">
    <h3>{$_('wizard.steps.stepSummary.estimatedPrice')}</h3>
    {#key config.estimatedPrice}
      <div class="price-display">
        {#if config.estimatedPrice === getTop()}
          <p class="price-message">{$_('wizard.steps.stepSummary.priceTiers.tier4.message')}</p>
          <div class="price">mind. {Math.round(config.estimatedPrice)}€</div>
        {:else if config.estimatedPrice == getLow()}
          <p class="price-message">{$_('wizard.steps.stepSummary.priceTiers.tier1.message')}</p>
          <div class="price">ca. {Math.round(config.estimatedPrice)}€</div>
        {:else if config.estimatedPrice < getTop() && getTop() - config.estimatedPrice < 1000}
          <p class="price-message">{$_('wizard.steps.stepSummary.priceTiers.tier3.message')}</p>
          <div class="price">ca. {Math.round(config.estimatedPrice)}€</div>
        {:else if config.estimatedPrice < getTop() && getTop() - config.estimatedPrice >= 1000}
          <p class="price-message">{$_('wizard.steps.stepSummary.priceTiers.tier2.message')}</p>
          <div class="price">ca. {Math.round(config.estimatedPrice)}€</div>
        {/if}
      </div>
    {/key}
  </div>
</div>

<div class="action-buttons">
  <button type="button" class="btn btn-simple btn-lg" onclick={openContact}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
    {$_('wizard.navigation.projectRequest')}
  </button>
  <button
    type="button"
    class="btn btn-simple btn-lg"
    onclick={() => {
      goto('/registration');
    }}
  >
    {$_('wizard.navigation.register')}
  </button>

  <button type="button" class="btn btn-simple btn-lg" onclick={openResetModal}>
    {$_('wizard.navigation.reset')}
  </button>
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-14 border-t pt-0 text-center md:border-t-0;

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 m-auto max-w-4xl text-center;
    }
  }

  .summary-grid {
    @apply mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2;

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

      .price {
        @apply text-success text-3xl font-bold;
      }

      .price-note {
        @apply text-base-content/70 text-sm;
      }
    }
  }
  /* Action Buttons */
  .action-buttons {
    @apply flex justify-center gap-4 flex-wrap;
  }
  /* Success Toast */
  .success-toast {
    @apply fixed top-4 right-4 z-50 max-w-sm;
  }
</style>
