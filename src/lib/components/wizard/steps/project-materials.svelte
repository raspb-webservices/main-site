<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { googleFonts } from '$lib/configs/wizard-config';
  let { config, uploadedFiles, handleFileUpload, removeFile, isUploading, uploadProgress } = $props();
</script>

<div class="step-header">
  <h1>{$_('wizard.steps.step6.titleFirst')} <span class="inner-text-special">{$_('wizard.steps.step6.titleHighlight')}</span></h1>
  <p class="teaser">{$_('wizard.steps.step6.teaser')}</p>
</div>

<!-- Color Selection -->
<div class="content-section">
  <h2>{$_('wizard.design.colorScheme')}</h2>
  <p>{$_('wizard.design.colorSchemeDescription')}</p>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <div class="form-control w-full">
      <label class="label" for="primaryColor">
        <span class="label-text font-semibold">{$_('wizard.design.primaryColor')}</span>
      </label>
      <div class="join w-full">
        <input type="color" id="primaryColor" class="join-item h-12 w-16 border-0" bind:value={config.primaryColour} />
        <input type="text" class="input input-bordered join-item flex-1 h-12" bind:value={config.primaryColour} />
      </div>
    </div>

    <div class="form-control w-full">
      <label class="label" for="secondaryColor">
        <span class="label-text font-semibold">{$_('wizard.design.secondaryColor')}</span>
      </label>
      <div class="join w-full">
        <input type="color" id="secondaryColor" class="join-item h-12 w-16 border-0" bind:value={config.secondaryColour} />
        <input type="text" class="input input-bordered join-item flex-1 h-12" bind:value={config.secondaryColour} />
      </div>
    </div>

    <div class="form-control w-full">
      <label class="label" for="accentColor">
        <span class="label-text font-semibold">{$_('wizard.design.accentColor')}</span>
      </label>
      <div class="join w-full">
        <input type="color" id="accentColor" class="join-item h-12 w-16 border-0" bind:value={config.accentColour} />
        <input type="text" class="input input-bordered join-item flex-1 h-12" bind:value={config.accentColour} />
      </div>
    </div>
  </div>
</div>

<!-- Font Selection -->
<div class="content-section">
  <h2>{$_('wizard.design.font')}</h2>
  <p>{$_('wizard.design.fontDescription')}</p>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-control w-full">
      <label class="label" for="googleFonts">
        <span class="label-text font-semibold">{$_('wizard.design.googleFonts')}</span>
      </label>
      <select id="googleFonts" class="select select-bordered w-full" bind:value={config.desiredFont}>
        {#each googleFonts as font}
          <option value={font}>{font}</option>
        {/each}
        <option value="Other Google Fonts">{$_('wizard.design.otherGoogleFonts')}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="customFont">
        <span class="label-text font-semibold">{$_('wizard.design.customFont')}</span>
      </label>
      <input
        type="text"
        id="customFont"
        class="input input-bordered w-full"
        bind:value={config.customFont}
        placeholder={$_('wizard.design.customFontPlaceholder')}
      />
    </div>
  </div>

  {#if config.desiredFont && config.desiredFont !== 'Other Google Fonts'}
    <div class="alert mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" class="stroke-info h-6 w-6 shrink-0">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>

      <div>
        <div class="pt-3 font-bold">{$_('wizard.design.fontPreviewTitle', { values: { font: config.desiredFont } })}</div>
        <div class="my-2 text-2xl" style="font-family: {config.desiredFont}">
          {$_('wizard.design.fontPreview')}
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- File Upload -->
<div class="content-section">
  <h2>{$_('wizard.steps.stepMaterials.files.title')}</h2>
  <p>{$_('wizard.steps.stepMaterials.files.description')}</p>

  <div class="form-control w-full">
    <input
      type="file"
      id="fileUpload"
      class="file-input file-input-bordered file-input-primary w-full"
      multiple
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.svg,.ai,.psd"
      onchange={handleFileUpload}
    />
    <div class="label">
      <span class="label-text-alt">{$_('wizard.steps.stepMaterials.files.formats')}</span>
    </div>
  </div>

  {#if uploadedFiles.length > 0}
    <div class="mt-6">
      <h3>{$_('wizard.steps.stepMaterials.files.uploaded')}</h3>
      <div class="space-y-2">
        {#each uploadedFiles as file, i}
          <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span>{file.name} ({Math.round(file.size / 1024)}KB)</span>
            <button type="button" class="btn btn-sm btn-error" onclick={() => removeFile(i)} aria-label={$_('wizard.steps.stepMaterials.files.removeFile')}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if isUploading && uploadProgress}
    <div class="mt-6">
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class="font-bold">{$_('wizard.steps.stepMaterials.files.uploadRunning')}</div>
          <div class="text-sm">{uploadProgress}</div>
        </div>
        <span class="loading loading-ring loading-md"></span>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-14 border-t pt-0 text-center md:border-t-0; 

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 text-center max-w-4xl m-auto;
    }
  }
  .content-section {
    @apply mb-24 md:mx-10 lg:mx-20;
    &:last-child {
      @apply mb-10;
    }

    h2 {
      @apply text-base-content mt-2 mb-4 p-0;
    }

    p {
      @apply text-base-content/80 mb-6;
    }
        .form-control {
      @apply w-full;

      .label-text {
        @apply text-base-content;
      }

      .label-text-alt {
        @apply text-base-content/60;
      }
    }

  .textarea,
  .input,
  .select {
    @apply border-base-300 text-base-content w-full bg-white;

    &:focus {
      @apply border-primary bg-primary/1;
    }

    &::placeholder {
      @apply text-base-content/50;
    }
  }
  
  }
</style>
