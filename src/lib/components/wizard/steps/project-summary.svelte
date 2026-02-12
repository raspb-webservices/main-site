<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import {
    projectCategories,
    projectTypesWebApp,
    projectTypesAiFreestyle,
    projectSubTypesWebsite,
    projectSubTypesApp,
    projectSubTypesAi,
    availableFeatures,
    featureCategoryColors
  } from '$lib/configs/wizard-config';
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';
  let { config, openContactModal, openResetModal } = $props();
</script>

<div class="step-header">
  <h1>
    {m.wizard_stepSummary_titleFirst()} <span class="inner-text-special">{m.wizard_stepSummary_titleHighlight()}</span>
    {m.wizard_stepSummary_titleSecond()}
  </h1>
  <p class="teaser">{m.wizard_stepSummary_teaser()}</p>
</div>

<div class="summary-grid">
  <div class="summary-card">
    <h3>{m.wizard_stepSummary_projectCategory()}</h3>
    <p class="summary-value">{(m as unknown as Record<string, () => string>)[projectCategories?.find((p) => p.id === config.projectCategory)?.title ?? '']?.()}</p>
  </div>

  <div class="summary-card">
    <h3>{m.wizard_stepSummary_projectType()}</h3>
    {#if config.projectCategory === 'websites-and-apps'}
      <p class="summary-value">{(m as unknown as Record<string, () => string>)[projectTypesWebApp?.find((p) => p.id === config.projectType)?.title ?? '']?.()}</p>
      {#if config.projectType === 'website'}
        <p class="summary-subvalue">{(m as unknown as Record<string, () => string>)[projectSubTypesWebsite?.find((p) => p.id === config.subType)?.title ?? '']?.()}</p>
      {:else}
        <p class="summary-subvalue">{(m as unknown as Record<string, () => string>)[projectSubTypesApp?.find((p) => p.id === config.subType)?.title ?? '']?.()}</p>
      {/if}
    {:else}
      <p class="summary-value">{(m as unknown as Record<string, () => string>)[projectTypesAiFreestyle?.find((p) => p.id === config.projectType)?.title ?? '']?.()}</p>
      {#if config.subType !== ''}
        <p class="summary-subvalue">{(m as unknown as Record<string, () => string>)[projectSubTypesAi?.find((p) => p.id === config.subType)?.title ?? '']?.()}</p>
      {/if}
    {/if}
  </div>

  {#if (config.features ?? []).length > 1}
    <div class="summary-card">
      <h3>{m.wizard_steps_stepSummary_selectedFeatures()}</h3>
      <div class="flex flex-wrap gap-2">
        {#each (config.features ?? []).filter((f: string) => f !== 'cookieConsent') as featureId}
          <div class="badge {featureCategoryColors[availableFeatures.find((f) => f.id === featureId)?.category ?? ''] || 'badge-info'}">
            {(m as unknown as Record<string, () => string>)[availableFeatures?.find((f) => f.id === featureId)?.title ?? '']?.()}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="price-card">
    <h3>{m.wizard_steps_stepSummary_estimatedPrice()}</h3>
    {#key config.estimatedPrice}
      <div class="price-display">
        <p class="price-message">{m.wizard_steps_stepSummary_priceTiers_tier2_message()}</p>
        <div class="price">{m.wizard_summary_price_prefix()} {Math.round(config.estimatedPrice)}€</div>
      </div>
    {/key}
  </div>
</div>

<div class="action-buttons">
  <button type="button" class="btn btn-simple btn-lg" onclick={openContactModal}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
    {m.wizard_navigation_projectRequest()}
  </button>
  <div class="tooltip" data-tip="{m.wizard_navigation_register_tooltip()}">
      <button
    type="button"
    class="btn btn-simple btn-lg"
    onclick={() => {
      goto(localizeHref('/registration'));
    }}
  >
    {m.wizard_navigation_register()}
  </button>
  </div>

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
    }
  }
  /* Action Buttons */
  .action-buttons {
    @apply flex flex-wrap justify-center gap-4;
  }
  /* Success Toast */
  .success-toast {
    @apply fixed top-4 right-4 z-50 max-w-sm;
  }
</style>
