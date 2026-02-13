<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import {
    projectSubTypesWebsite,
    projectSubTypesApp,
    projectSubTypesAi,
    projectSubTypesFreestyle,
    projectTypesWebApp,
    projectTypesAiFreestyle,
    availableFeatures
  } from '$lib/configs/wizard-config';

  let { config } = $props();
  let showDetails = $state(false);

  // Calculate all price components using $derived
  const allSubTypes = [...projectSubTypesWebsite, ...projectSubTypesApp, ...projectSubTypesAi, ...projectSubTypesFreestyle];
  const allProjectTypes = [...projectTypesWebApp, ...projectTypesAiFreestyle];

  const basePrice = $derived.by(() => {
    let price = 0;
    if (config.subType) {
      const subType = allSubTypes.find((st) => st.id === config.subType);
      if (subType?.basePrice) price = subType.basePrice;
    }
    if (price === 0 && config.projectType) {
      const projectType = allProjectTypes.find((pt) => pt.id === config.projectType);
      if (projectType?.basePrice) price = projectType.basePrice;
    }
    return price;
  });

  // Service level factor (±25%)
  const sl = $derived(config.serviceLevel ?? 50);
  const serviceFactor = $derived(((50 - sl) / 50) * 0.25);
  const serviceAdjustment = $derived(Math.round(basePrice * serviceFactor));

  // Engineering approach factor (±25%)
  const ea = $derived(config.engineeringApproach ?? 50);
  const engineeringFactor = $derived(((ea - 50) / 50) * 0.25);
  const engineeringAdjustment = $derived(Math.round(basePrice * engineeringFactor));

  // Adjusted base price
  const adjustedBasePrice = $derived(basePrice + serviceAdjustment + engineeringAdjustment);

  // Calculate feature costs
  const selectedFeatures = $derived(availableFeatures.filter((f) => (config.features ?? []).includes(f.id)));
  const totalFeatureCost = $derived(selectedFeatures.reduce((sum, f) => sum + (f.basePrice || 0), 0));

  // Feature volume discount
  const featureCount = $derived(selectedFeatures.length);
  const featureDiscountPercent = $derived.by(() => {
    let discount = 0;
    if (featureCount <= 10) {
      discount = featureCount * 2;
    } else if (featureCount <= 20) {
      discount = 20 + (featureCount - 10) * 1.5;
    } else {
      discount = 35 + (featureCount - 20) * 1;
    }
    return Math.min(discount, 40);
  });
  const featureDiscount = $derived(Math.round(totalFeatureCost * (featureDiscountPercent / 100)));
  const discountedFeatureCost = $derived(totalFeatureCost - featureDiscount);

  // Final price
  const finalPrice = $derived(Math.round(adjustedBasePrice + discountedFeatureCost));

  function toggleDetails() {
    showDetails = !showDetails;
  }
</script>

<div class="price-breakdown-container">
  <div class="price-breakdown-header">
    <h3>{m.wizard_steps_stepSummary_estimatedPrice()}</h3>
    <button type="button" onclick={toggleDetails} class="toggle-details-btn" aria-label="Toggle price details">
      {showDetails ? '▼' : '▶'}
      {showDetails ? 'Details ausblenden' : 'Details anzeigen'}
    </button>
  </div>

  <div class="price-main">
    <div class="price-label">Geschätzter Gesamtpreis</div>
    <div class="price-value">{finalPrice.toLocaleString('de-DE')} €</div>
  </div>

  {#if showDetails}
    <div class="price-details">
      <!-- Base Price -->
      <div class="price-row">
        <span class="price-label">Basispreis ({config.subType || config.projectType})</span>
        <span class="price-amount">{basePrice.toLocaleString('de-DE')} €</span>
      </div>

      <!-- Service Level Adjustment -->
      {#if serviceAdjustment !== 0}
        <div class="price-row adjustment">
          <span class="price-label">
            {serviceAdjustment > 0 ? '+' : ''}
            Service-Level Anpassung ({sl < 50 ? 'Full-Service' : 'Mitwirkung'})
          </span>
          <span class="price-amount {serviceAdjustment > 0 ? 'positive' : 'negative'}">
            {serviceAdjustment > 0 ? '+' : ''}{serviceAdjustment.toLocaleString('de-DE')} €
          </span>
        </div>
      {/if}

      <!-- Engineering Approach Adjustment -->
      {#if engineeringAdjustment !== 0}
        <div class="price-row adjustment">
          <span class="price-label">
            {engineeringAdjustment > 0 ? '+' : ''}
            Engineering-Ansatz ({ea < 50 ? 'Schnell' : 'Hochwertig'})
          </span>
          <span class="price-amount {engineeringAdjustment > 0 ? 'positive' : 'negative'}">
            {engineeringAdjustment > 0 ? '+' : ''}{engineeringAdjustment.toLocaleString('de-DE')} €
          </span>
        </div>
      {/if}

      <div class="price-divider"></div>

      <!-- Adjusted Base -->
      <div class="price-row subtotal">
        <span class="price-label">Basis nach Anpassungen</span>
        <span class="price-amount">{adjustedBasePrice.toLocaleString('de-DE')} €</span>
      </div>

      <div class="price-divider"></div>

      <!-- Features -->
      {#if selectedFeatures.length > 0}
        <div class="price-row">
          <span class="price-label">
            Features ({selectedFeatures.length}x)
            <button type="button" class="info-btn" title="Klick für Feature-Details">ℹ️</button>
          </span>
          <span class="price-amount">+{totalFeatureCost.toLocaleString('de-DE')} €</span>
        </div>

        <!-- Feature Discount -->
        {#if featureDiscount > 0}
          <div class="price-row discount">
            <span class="price-label">Mengenrabatt ({featureDiscountPercent.toFixed(0)}%)</span>
            <span class="price-amount negative">-{featureDiscount.toLocaleString('de-DE')} €</span>
          </div>
        {/if}

        <div class="price-divider"></div>

        <!-- Features After Discount -->
        <div class="price-row subtotal">
          <span class="price-label">Features gesamt</span>
          <span class="price-amount">{discountedFeatureCost.toLocaleString('de-DE')} €</span>
        </div>
      {/if}

      <div class="price-divider thick"></div>

      <!-- Final Total -->
      <div class="price-row total">
        <span class="price-label">GESAMTPREIS</span>
        <span class="price-amount">{finalPrice.toLocaleString('de-DE')} €</span>
      </div>
    </div>
  {/if}

  <div class="price-note">
    <small>💡 Dies ist eine unverbindliche Schätzung. Der finale Preis wird nach einem persönlichen Gespräch festgelegt.</small>
  </div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .price-breakdown-container {
    @apply rounded-xl border p-6;
    background: linear-gradient(to bottom right, rgba(var(--success) / 0.1), rgba(var(--success) / 0.05));
    border-color: rgba(var(--success) / 0.2);
  }

  .price-breakdown-header {
    @apply mb-4 flex items-center justify-between;

    h3 {
      @apply text-base-content text-xl font-bold;
      margin: 0;
    }

    .toggle-details-btn {
      @apply text-primary flex items-center gap-2 text-sm font-medium transition-colors;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0.5rem;

      &:hover {
        @apply underline opacity-80;
      }
    }
  }

  .price-main {
    @apply mb-6 text-center;

    .price-label {
      @apply mb-2 text-sm font-medium uppercase tracking-wide;
      color: rgba(var(--base-content) / 0.7);
    }

    .price-value {
      @apply text-success text-4xl font-bold;
    }
  }

  .price-details {
    @apply space-y-2 rounded-lg p-4;
    background: rgba(var(--base-100) / 0.5);
  }

  .price-row {
    @apply text-base-content flex items-center justify-between py-1;

    .price-label {
      @apply flex items-center gap-2 text-sm;
    }

    .price-amount {
      @apply font-semibold;

      &.positive {
        @apply text-error;
      }

      &.negative {
        @apply text-success;
      }
    }

    &.adjustment {
      @apply text-sm;
      color: rgba(var(--base-content) / 0.8);

      .price-amount {
        @apply text-sm;
      }
    }

    &.discount {
      @apply text-sm;
      color: rgba(var(--success) / 0.8);
    }

    &.subtotal {
      @apply text-base-content font-semibold;
    }

    &.total {
      @apply text-success text-lg font-bold;

      .price-label {
        @apply text-base;
      }

      .price-amount {
        @apply text-xl;
      }
    }
  }

  .price-divider {
    @apply border-base-300 my-2 border-t;

    &.thick {
      border-color: rgba(var(--success) / 0.3);
      border-top-width: 2px;
    }
  }

  .info-btn {
    @apply cursor-pointer rounded-full px-1 text-xs transition-colors;
    background: none;
    border: none;

    &:hover {
      @apply bg-base-200;
    }
  }

  .price-note {
    @apply mt-4 text-center;
    color: rgba(var(--base-content) / 0.6);

    small {
      @apply text-xs italic;
    }
  }
</style>
