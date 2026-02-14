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
    formFieldTypes
  } from '$lib/configs/wizard-config';
  let { config, isPreparingAssets, assetPreparationProgress } = $props();
</script>

<div class="step-header">
  <h1>
    {#if config.name}
      {config.name} -
    {/if}
    <span class="inner-text-special">{m.wizard_steps_stepSummary_titleHighlight()}</span>
  </h1>
  {#if config.description}
    <p class="teaser">
      {config.description.substring(0, 150)}{config.description.length > 150 ? '...' : ''}
    </p>
  {:else}
    <p class="teaser">{m.wizard_steps_stepSummary_teaser()}</p>
  {/if}
</div>

<!-- Asset Preparation Progress -->
{#if isPreparingAssets || assetPreparationProgress}
  <div class="mb-8">
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <div class="font-bold">{m.wizard_steps_stepSummary_preparingAssets_title()}</div>
        <div class="text-sm">{assetPreparationProgress}</div>
      </div>
      {#if isPreparingAssets}
        <span class="loading loading-ring loading-md"></span>
      {/if}
    </div>
  </div>
{/if}

<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
  <div class="space-y-6">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">{m.wizard_steps_stepSummary_projectType()}</h3>
        <p class="no-padding">{projectTypesWebApp.find((p) => p.id === config.projectType)?.title}</p>
        <p class="text-base-content/70 no-padding text-sm">
          {projectSubTypesWebsite.find((s) => s.id === config.subType && s.parentId === config.projectType)?.title}
        </p>
      </div>
    </div>

    {#if config.description}
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title">{m.wizard_steps_stepSummary_projectDescription()}</h3>
          <p class="no-padding text-sm">{config.description.substring(0, 200)}{config.description.length > 200 ? '...' : ''}</p>
        </div>
      </div>
    {/if}

    {#if (config.features ?? []).length > 0}
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title">{m.wizard_steps_stepSummary_selectedFeatures()}</h3>
          <div class="flex flex-wrap gap-2">
            {#each config.features ?? [] as featureId}
              <div class="badge badge-primary">
                {(m as unknown as Record<string, () => string>)[availableFeatures.find((f) => f.id === featureId)?.title ?? '']?.()}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    {#if (config.pages ?? []).length > 0}
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title">{m.wizard_steps_stepSummary_pagesSections()}</h3>
          <div class="flex flex-wrap items-center gap-2">
            {#each config.pages ?? [] as page}
              {#if page.name.trim()}
                <div class="badge badge-outline">{page.name}</div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    {/if}

    {#if (config.formFields ?? []).length > 0}
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title">{m.wizard_steps_stepSummary_formFields()}</h3>
          <div class="space-y-1">
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
      </div>
    {/if}

    {#if config.projectType !== 'freestyle'}
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title">{m.wizard_steps_stepSummary_design()}</h3>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
            <span class="font-semibold">{m.wizard_steps_stepSummary_colors()}</span>
            <div class="flex gap-2 md:col-span-2">
              <div class="border-base-300 h-8 w-8 rounded border-2" style="background-color: {config.primaryColour}"></div>
              <div class="border-base-300 h-8 w-8 rounded border-2" style="background-color: {config.secondaryColour}"></div>
              <div class="border-base-300 h-8 w-8 rounded border-2" style="background-color: {config.accentColour}"></div>
            </div>

            <span class="font-semibold">{m.wizard_steps_stepSummary_font()}</span>
            <div class="flex gap-2 md:col-span-2">
              <span style="font-family: {config.customFont || config.desiredFont}, sans-serif">{config.customFont || config.desiredFont}</span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="card bg-success text-success-content">
    <div class="card-body text-center">
      <h2 class="card-title justify-center text-3xl">{m.wizard_steps_stepSummary_estimatedPrice()}</h2>
      <div class="text-5xl font-bold">{config.estimatedPrice}€</div>
      <div class="text-sm opacity-80">{m.wizard_steps_stepSummary_average({ price: (config.estimatedPrice ?? 0).toLocaleString() })}</div>
      <p class="no-padding text-sm opacity-80">{m.wizard_steps_stepSummary_disclaimer()}</p>

      <div class="divider"></div>

      <div class="space-y-2 text-left">
        <div class="flex justify-between">
          <span>{m.wizard_steps_stepSummary_basePrice()}</span>
          <span>{(projectTypesWebApp.find((p) => p.id === config.projectType)?.basePrice ?? 0).toLocaleString()}€</span>
        </div>
        {#if config.subType}
          <div class="flex justify-between">
            <span>{projectTypesWebApp.find((s) => s.id === config.subType && s.parentId === config.projectType)?.basePrice ?? 0}€</span>
          </div>
        {/if}
        {#if (config.features ?? []).length > 0}
          <div class="flex justify-between">
            <span>{m.wizard_steps_stepSummary_featuresIncluded({ count: (config.features ?? []).length })}</span>
            <span>{m.wizard_steps_stepSummary_included()}</span>
          </div>
        {/if}
      </div>
    </div>
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
</style>
