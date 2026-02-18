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
    featureCategoryColors,
    formFieldTypes
  } from '$lib/configs/wizard-config';
  import PriceBreakdown from '../price-breakdown.svelte';

  let { config, isPreparingAssets, assetPreparationProgress } = $props();

  // Helper functions
  function getServiceLevelText(level: number) {
    if (level < 20) return '👥 Full-Service (Wir übernehmen alles)';
    if (level < 40) return '🤝 Überwiegend Full-Service';
    if (level < 60) return '⚖️ Ausgewogene Zusammenarbeit';
    if (level < 80) return '💪 Aktive Mitwirkung';
    return '🚀 Maximale Eigenleistung';
  }

  function getEngineeringText(level: number) {
    if (level < 20) return '⚡ Pragmatisch & Schnell';
    if (level < 40) return '📊 Standard-Qualität';
    if (level < 60) return '⭐ Hochwertig';
    if (level < 80) return '💎 Premium-Qualität';
    return '🏆 Maximal robust & skalierbar';
  }

  function getTimelineText(pref: string) {
    const map: Record<string, string> = {
      urgent: '🔴 Dringend (< 2 Wochen)',
      fast: '🟠 Schnell (2-4 Wochen)',
      moderate: '🟡 Moderat (1-2 Monate)',
      flexible: '🟢 Flexibel (2-3 Monate)',
      delayed: '🔵 Entspannt (3+ Monate)',
      deadline: '📅 Fester Termin',
      whenever: '⏰ Wann immer möglich'
    };
    return map[pref] || pref;
  }

  function getBudgetText(range: string) {
    const map: Record<string, string> = {
      small: '💵 Klein (< 5.000 €)',
      medium: '💰 Mittel (5.000 - 15.000 €)',
      large: '💎 Groß (15.000 - 50.000 €)',
      xlarge: '🏆 Sehr groß (50.000 - 100.000 €)',
      enterprise: '🏢 Enterprise (> 100.000 €)',
      flexible: '🤝 Flexibel'
    };
    return map[range] || range;
  }
</script>

<div class="step-header">
  <h1>
    {m.wizard_stepSummary_titleFirst()} <span class="inner-text-special">{m.wizard_stepSummary_titleHighlight()}</span>
    {m.wizard_stepSummary_titleSecond()}
  </h1>
  <p class="teaser">{m.wizard_stepSummary_teaser()}</p>
</div>

<div class="summary-container">
  <!-- Project Overview -->
  <section class="summary-section">
    <h2 class="section-title">📋 Projekt-Übersicht</h2>
    <div class="summary-grid">
      <div class="summary-card">
        <div class="card-label">Kategorie</div>
        <div class="card-value">
          {(m as unknown as Record<string, () => string>)[projectCategories?.find((p) => p.id === config.projectCategory)?.title ?? '']?.()}
        </div>
      </div>

      <div class="summary-card">
        <div class="card-label">Projekttyp</div>
        <div class="card-value">
          {#if config.projectCategory === 'websites-and-apps'}
            {(m as unknown as Record<string, () => string>)[projectTypesWebApp?.find((p) => p.id === config.projectType)?.label ?? projectTypesWebApp?.find((p) => p.id === config.projectType)?.title ?? '']?.()}
          {:else}
            {(m as unknown as Record<string, () => string>)[projectTypesAiFreestyle?.find((p) => p.id === config.projectType)?.title ?? '']?.()}
          {/if}
        </div>
        {#if config.subType}
          <div class="card-subtitle">
            {#if config.projectType === 'website'}
              {(m as unknown as Record<string, () => string>)[projectSubTypesWebsite?.find((p) => p.id === config.subType)?.title ?? '']?.()}
            {:else if config.projectType === 'app'}
              {(m as unknown as Record<string, () => string>)[projectSubTypesApp?.find((p) => p.id === config.subType)?.title ?? '']?.()}
            {:else}
              {(m as unknown as Record<string, () => string>)[projectSubTypesAi?.find((p) => p.id === config.subType)?.title ?? '']?.()}
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Project Description -->
  {#if config.description}
    <section class="summary-section">
      <h2 class="section-title">📝 Projektbeschreibung</h2>
      <div class="text-card">
        <p>{config.description}</p>
      </div>
    </section>
  {/if}

  <!-- Project Goals & Audience -->
  {#if config.goals || config.targetAudience}
    <section class="summary-section">
      <h2 class="section-title">🎯 Ziel & Zielgruppe</h2>
      <div class="summary-grid">
        {#if config.goals}
          <div class="text-card">
            <div class="card-label">Projektziel</div>
            <p>{config.goals}</p>
          </div>
        {/if}
        {#if config.targetAudience}
          <div class="text-card">
            <div class="card-label">Zielgruppe</div>
            <p>{config.targetAudience}</p>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Service Level & Engineering -->
  {#if config.serviceLevel !== undefined || config.engineeringApproach !== undefined}
    <section class="summary-section">
      <h2 class="section-title">⚙️ Zusammenarbeit & Umsetzung</h2>
      <div class="summary-grid">
        {#if config.serviceLevel !== undefined}
          <div class="slider-card">
            <div class="card-label">Service-Level</div>
            <div class="slider-visual">
              <div class="slider-track">
                <div class="slider-fill" style="width: {config.serviceLevel}%"></div>
                <div class="slider-thumb" style="left: {config.serviceLevel}%"></div>
              </div>
              <div class="slider-labels">
                <span>Full-Service</span>
                <span>Mitwirkung</span>
              </div>
            </div>
            <div class="slider-result">{getServiceLevelText(config.serviceLevel)}</div>
          </div>
        {/if}

        {#if config.engineeringApproach !== undefined}
          <div class="slider-card">
            <div class="card-label">Engineering-Ansatz</div>
            <div class="slider-visual">
              <div class="slider-track">
                <div class="slider-fill engineering" style="width: {config.engineeringApproach}%"></div>
                <div class="slider-thumb" style="left: {config.engineeringApproach}%"></div>
              </div>
              <div class="slider-labels">
                <span>Schnell</span>
                <span>Hochwertig</span>
              </div>
            </div>
            <div class="slider-result">{getEngineeringText(config.engineeringApproach)}</div>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Timeline & Budget -->
  {#if config.timelinePreference || config.budgetRange}
    <section class="summary-section">
      <h2 class="section-title">⏱️ Timeline & Budget</h2>
      <div class="summary-grid">
        {#if config.timelinePreference}
          <div class="summary-card">
            <div class="card-label">Timeline-Präferenz</div>
            <div class="card-value-large">{getTimelineText(config.timelinePreference)}</div>
            {#if config.specificDeadline && config.timelinePreference === 'deadline'}
              <div class="card-subtitle">Deadline: {new Date(config.specificDeadline).toLocaleDateString('de-DE')}</div>
            {/if}
          </div>
        {/if}

        {#if config.budgetRange}
          <div class="summary-card">
            <div class="card-label">Budget-Kategorie</div>
            <div class="card-value-large">{getBudgetText(config.budgetRange)}</div>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- PWA/CMS Specific -->
  {#if (config.subType === 'pwaSimple' || config.subType === 'pwaExtended') && config.pwaApproach}
    <section class="summary-section">
      <h2 class="section-title">📱 PWA-Details</h2>
      <div class="text-card">
        <div class="card-label">Ansatz</div>
        <p>{config.pwaApproach === 'new' ? '🆕 Neue PWA erstellen' : '🔄 Bestehende Website erweitern'}</p>
        {#if config.pwaExistingUrl}
          <div class="card-subtitle mt-2">URL: {config.pwaExistingUrl}</div>
        {/if}
      </div>
    </section>
  {/if}

  {#if (config.subType === 'cms' || config.subType === 'cmsPlus') && config.cmsComplexity !== undefined}
    <section class="summary-section">
      <h2 class="section-title">📝 CMS-Details</h2>
      <div class="slider-card">
        <div class="card-label">Komplexität</div>
        <div class="slider-visual">
          <div class="slider-track">
            <div class="slider-fill cms" style="width: {config.cmsComplexity}%"></div>
            <div class="slider-thumb" style="left: {config.cmsComplexity}%"></div>
          </div>
          <div class="slider-labels">
            <span>Einfach</span>
            <span>Komplex</span>
          </div>
        </div>
        {#if config.cmsContentStructure}
          <div class="mt-4">
            <div class="card-label">Content-Struktur</div>
            <p>{config.cmsContentStructure}</p>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Features -->
  {#if (config.features ?? []).length > 1}
    <section class="summary-section">
      <h2 class="section-title">🎨 Features ({(config.features ?? []).length - 1} ausgewählt)</h2>
      <div class="features-grid">
        {#each (config.features ?? []).filter((f: string) => f !== 'cookieConsent') as featureId}
          {@const feature = availableFeatures.find((f) => f.id === featureId)}
          {#if feature}
            <div class="feature-badge {featureCategoryColors[feature.category ?? ''] || 'badge-info'}">
              {(m as unknown as Record<string, () => string>)[feature.title]?.()}
            </div>
          {/if}
        {/each}
      </div>
    </section>
  {/if}

  <!-- Extended Content: Pages & Forms -->
  {#if (config.pages ?? []).length > 0 || (config.formFields ?? []).length > 0}
    <section class="summary-section">
      <h2 class="section-title">📄 Inhalte & Struktur</h2>
      <div class="summary-grid">
        {#if (config.pages ?? []).length > 0}
          <div class="text-card">
            <div class="card-label">{m.wizard_steps_stepSummary_pagesSections()}</div>
            <div class="flex flex-wrap items-center gap-2 mt-2">
                {#each config.pages ?? [] as page}
                  {#if page.name.trim()}
                    <div class="badge badge-outline">{page.name}</div>
                  {/if}
                {/each}
            </div>
          </div>
        {/if}

        {#if (config.formFields ?? []).length > 0}
          <div class="text-card">
            <div class="card-label">{m.wizard_steps_stepSummary_formFields()}</div>
            <div class="space-y-1 mt-2">
                {#each config.formFields ?? [] as field}
                  {#if field.name.trim()}
                    <div class="flex items-center gap-2">
                      <div class="badge badge-outline">
                        {(m as unknown as Record<string, () => string>)[formFieldTypes.find((f) => f.id === field.type)?.title ?? '']?.()}
                      </div>
                      <span class="text-sm">{field.name}</span>
                      {#if field.required}
                        <div class="badge badge-error badge-xs">{m.wizard_steps_stepSummary_required()}</div>
                      {/if}
                    </div>
                  {/if}
                {/each}
            </div>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Extended Materials: Uploads -->
  <!-- Note: We don't have access to uploadedFiles array length directly in config unless we passed it. 
       Wait, wizard-extended passes 'config'. Uploaded files are separate. 
       But I can add a prop for file count or pass it in config? 
       Actually, 'config.uploadedFiles' is part of WizardConfig interface, but I store them in 'uploadedFiles' state in parent. 
       I should probably assume the parent manages passing file info if needed, or I rely on what's available.
       But let's check if 'ProjectResult' had access. Yes, it didn't use uploadedFiles for display, just for logic? 
       Wait, ProjectResult didn't show files list.
       But I want to show them if the user asks for "what was entered".
       
       I'll update the component props to accept 'uploadedFilesCount' or similar.
  -->

  <!-- Special Requirements -->
  {#if config.specialRequirements}
    <section class="summary-section">
      <h2 class="section-title">✨ Besondere Anforderungen</h2>
      <div class="text-card">
        <p>{config.specialRequirements}</p>
      </div>
    </section>
  {/if}

  <!-- Price Breakdown -->
  <section class="summary-section">
    <PriceBreakdown {config} />
  </section>
</div>

<style lang="postcss">
  @reference '../../../../app.css';

  .step-header {
    @apply border-t-base-content/40 mt-0 mb-8 border-t pt-0 text-center md:border-t-0;

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 m-auto max-w-4xl text-center;
    }
  }

  .summary-container {
    @apply space-y-8;
  }

  .summary-section {
    @apply space-y-4;

    .section-title {
      @apply text-base-content mb-4 text-2xl font-bold;
    }
  }

  .summary-grid {
    @apply grid grid-cols-1 gap-4 md:grid-cols-2;
  }

  .summary-card {
    @apply bg-base-200 border-base-300 rounded-lg border p-4;

    .card-label {
      @apply text-base-content/60 mb-1 text-xs font-semibold tracking-wide uppercase;
    }

    .card-value {
      @apply text-base-content text-lg font-bold;
    }

    .card-value-large {
      @apply text-base-content text-xl font-bold;
    }

    .card-subtitle {
      @apply text-base-content/70 mt-1 text-sm;
    }
  }

  .text-card {
    @apply bg-base-200 border-base-300 rounded-lg border p-4;

    .card-label {
      @apply text-base-content/60 mb-2 text-xs font-semibold tracking-wide uppercase;
    }

    p {
      @apply text-base-content whitespace-pre-wrap;
    }
  }

  .slider-card {
    @apply bg-base-200 border-base-300 rounded-lg border p-4;

    .card-label {
      @apply text-base-content/60 mb-3 text-xs font-semibold tracking-wide uppercase;
    }

    .slider-visual {
      @apply mb-3;
    }

    .slider-track {
      @apply relative mb-2 h-2 rounded-full bg-gray-200;

      .slider-fill {
        @apply bg-primary absolute top-0 left-0 h-full rounded-full;

        &.engineering {
          @apply bg-secondary;
        }

        &.cms {
          @apply bg-accent;
        }
      }

      .slider-thumb {
        @apply bg-primary absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md;
      }
    }

    .slider-labels {
      @apply text-base-content/60 flex justify-between text-xs;
    }

    .slider-result {
      @apply text-base-content mt-2 font-semibold;
    }
  }

  .features-grid {
    @apply flex flex-wrap gap-2;
  }

  .feature-badge {
    @apply badge badge-lg;
  }

</style>
