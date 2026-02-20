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

  const isFreestyleOrAi = $derived(config.projectCategory === 'ki-and-freestyle');

  // ─── KI / Freestyle pricing ───────────────────────────────────────────────
  const DAILY_RATE = 1000;

  const expertDays = $derived(config.estimatedExpertDays ?? 0);

  const aiDiscountPercent = $derived(
    expertDays > 10 ? Math.min(expertDays - 10, 20) : 0
  );

  const aiGrossPrice = $derived(expertDays * DAILY_RATE);
  const aiDiscountAmount = $derived(Math.round(aiGrossPrice * (aiDiscountPercent / 100)));
  const aiFinalPrice = $derived(Math.round((aiGrossPrice - aiDiscountAmount) / 100) * 100);

  // ─── Website / App pricing (existing logic) ───────────────────────────────
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
    // For pwaSimple: base price depends on chosen approach
    if (config.subType === 'pwaSimple') {
      if (config.pwaApproach === 'new') price = 3000;
      else if (config.pwaApproach === 'extend') price = 1999;
    }
    return price;
  });

  const sl = $derived(config.serviceLevel ?? 50);
  const serviceFactor = $derived(((50 - sl) / 50) * 0.25);
  const serviceAdjustment = $derived(Math.round(basePrice * serviceFactor));

  const ea = $derived(config.engineeringApproach ?? 50);
  const engineeringFactor = $derived(((ea - 50) / 50) * 0.25);
  const engineeringAdjustment = $derived(Math.round(basePrice * engineeringFactor));

  const adjustedBasePrice = $derived(basePrice + serviceAdjustment + engineeringAdjustment);

  const selectedFeatures = $derived(availableFeatures.filter((f) => (config.features ?? []).includes(f.id)));
  const totalFeatureCost = $derived(selectedFeatures.reduce((sum, f) => sum + (f.basePrice || 0), 0));

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

  const finalPrice = $derived(Math.round(adjustedBasePrice + discountedFeatureCost));

  function toggleDetails() {
    showDetails = !showDetails;
  }
</script>

<div class="price-breakdown-container">
  {#if isFreestyleOrAi}
    <!-- ─── KI / Freestyle: dynamische Preisskala ─────────────────────────── -->
    <div class="price-breakdown-header">
      <h3>{m.wizard_steps_stepSummary_estimatedPrice()}</h3>
    </div>

    {#if expertDays > 0}
      <div class="price-main">
        <div class="price-label">Geschätzte Investition</div>
        <div class="price-value">ca. {aiFinalPrice.toLocaleString('de-DE')} €</div>
      </div>

      <div class="ai-price-details">
        <div class="ai-price-row">
          <span>{expertDays} Manntage × {DAILY_RATE.toLocaleString('de-DE')} €/Tag</span>
          <span>{aiGrossPrice.toLocaleString('de-DE')} €</span>
        </div>
        {#if aiDiscountPercent > 0}
          <div class="ai-price-row discount">
            <span>Mengenrabatt ({aiDiscountPercent}%)</span>
            <span>−{aiDiscountAmount.toLocaleString('de-DE')} €</span>
          </div>
        {/if}
        <div class="ai-price-divider"></div>
        <div class="ai-price-row total">
          <span>Geschätzter Preis</span>
          <span>{aiFinalPrice.toLocaleString('de-DE')} €</span>
        </div>
      </div>
    {:else}
      <div class="price-main">
        <div class="price-label">Preis auf Anfrage</div>
        <div class="price-value-placeholder">Manntage angeben</div>
      </div>
      <p class="price-hint">Trag im Schritt „Details" die geschätzte Anzahl an Manntagen ein, um eine Preisindikation zu erhalten.</p>
    {/if}

    <div class="ai-rate-info">
      <span class="rate-badge">Tagessatz {DAILY_RATE.toLocaleString('de-DE')} €</span>
      {#if aiDiscountPercent === 0 && expertDays > 0}
        <span class="rate-badge">Kein Rabatt (≤ 10 Tage)</span>
      {:else if aiDiscountPercent > 0}
        <span class="rate-badge rate-discount">Mengenrabatt ab 11 Tage (bis 20%)</span>
      {/if}
    </div>

  {:else}
    <!-- ─── Website / App: Festpreis mit Aufschlüsselung ─────────────────── -->
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
        <div class="price-row">
          <span class="price-label">Basispreis ({config.subType || config.projectType})</span>
          <span class="price-amount">{basePrice.toLocaleString('de-DE')} €</span>
        </div>

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

        <div class="price-row subtotal">
          <span class="price-label">Basis nach Anpassungen</span>
          <span class="price-amount">{adjustedBasePrice.toLocaleString('de-DE')} €</span>
        </div>

        <div class="price-divider"></div>

        {#if selectedFeatures.length > 0}
          <div class="price-row">
            <span class="price-label">
              Features ({selectedFeatures.length}x)
            </span>
            <span class="price-amount">+{totalFeatureCost.toLocaleString('de-DE')} €</span>
          </div>

          {#if featureDiscount > 0}
            <div class="price-row discount">
              <span class="price-label">Mengenrabatt ({featureDiscountPercent.toFixed(0)}%)</span>
              <span class="price-amount negative">-{featureDiscount.toLocaleString('de-DE')} €</span>
            </div>
          {/if}

          <div class="price-divider"></div>

          <div class="price-row subtotal">
            <span class="price-label">Features gesamt</span>
            <span class="price-amount">{discountedFeatureCost.toLocaleString('de-DE')} €</span>
          </div>
        {/if}

        <div class="price-divider thick"></div>

        <div class="price-row total">
          <span class="price-label">GESAMTPREIS</span>
          <span class="price-amount">{finalPrice.toLocaleString('de-DE')} €</span>
        </div>
      </div>
    {/if}
  {/if}

  <div class="price-note">
    <small>💡 Dies ist eine unverbindliche Schätzung. Der finale Preis wird nach einem persönlichen Gespräch festgelegt.</small>
  </div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .price-breakdown-container {
    @apply rounded-xl border border-success/20 bg-linear-to-br from-success/10 to-success/5 p-6;
  }

  .price-breakdown-header {
    @apply mb-4 flex items-center justify-between;

    h3 {
      @apply text-base-content m-0 text-xl font-bold;
    }

    .toggle-details-btn {
      @apply text-primary flex cursor-pointer items-center gap-2 bg-transparent border-0 px-2 py-1 text-sm font-medium transition-colors;

      &:hover {
        @apply underline opacity-80;
      }
    }
  }

  .price-main {
    @apply mb-6 text-center;

    .price-label {
      @apply mb-2 text-sm font-medium tracking-wide uppercase text-base-content/70;
    }

    .price-value {
      @apply text-success text-4xl font-bold;
    }

    .price-value-placeholder {
      @apply text-base-content/40 text-2xl font-semibold italic;
    }
  }

  /* ─── KI/Freestyle styles ─── */
  .ai-price-details {
    @apply bg-base-100/50 space-y-2 rounded-lg p-4 mb-4;
  }

  .ai-price-row {
    @apply text-base-content flex items-center justify-between py-1 text-sm;

    &.discount {
      @apply text-success/80;
    }

    &.total {
      @apply font-bold text-base;
    }
  }

  .ai-price-divider {
    @apply border-base-300 my-2 border-t;
  }

  .ai-rate-info {
    @apply flex flex-wrap gap-2 mb-4;
  }

  .rate-badge {
    @apply bg-base-200 text-base-content/70 rounded-full px-3 py-1 text-xs font-medium;

    &.rate-discount {
      @apply bg-success/10 text-success;
    }
  }

  .price-hint {
    @apply text-base-content/60 text-sm text-center mb-4 italic;
  }

  /* ─── Website/App styles ─── */
  .price-details {
    @apply bg-base-100/50 space-y-2 rounded-lg p-4;
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
      @apply text-sm text-base-content/80;

      .price-amount {
        @apply text-sm;
      }
    }

    &.discount {
      @apply text-sm text-success/80;
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
      @apply border-success/30 border-t-2;
    }
  }

  .price-note {
    @apply mt-4 text-center text-base-content/60;

    small {
      @apply text-xs italic;
    }
  }
</style>
