<script lang="ts">
  import { _ } from 'svelte-i18n';
  let { config, addPage, removePage, removeFormField, addFormField, formFieldTypes } = $props();
</script>

<!-- Step 5: Content Details (only for website/cms) -->
<div class="step-header">
  <h1>{$_('wizard.steps.step5.titleFirst')} <span class="inner-text-special">{$_('wizard.steps.step5.titleHighlight')}</span></h1>
  <p class="teaser">{$_('wizard.steps.step5.teaser')}</p>
</div>

<!-- Pages/Sections -->
<div class="content-section">
  <h2>{$_('wizard.steps.step5.content.pages.title')}</h2>
  <p>{$_('wizard.steps.step5.content.pages.description')}</p>

  <div class="space-y-6">
    {#each config.pages as page, i}
      <div class="card bg-base-100 border-base-300 border">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-lg">{$_('wizard.steps.step5.content.pages.pageTitle')} {i + 1}</h4>
            <button type="button" class="btn btn-error btn-sm" onclick={() => removePage(i)} aria-label={$_('wizard.steps.step5.content.pages.removePage')}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {$_('wizard.steps.step5.content.pages.remove')}
            </button>
          </div>

          <div class="form-control mb-4 w-full">
            <label class="label" for="pageName{i}">
              <span class="label-text font-semibold">{$_('wizard.content.pages.pageName')}</span>
            </label>
            <input
              type="text"
              id="pageName{i}"
              class="input input-bordered w-full"
              bind:value={config.pages[i].name}
              placeholder={$_('wizard.content.pages.pageNamePlaceholder')}
            />
          </div>

          <div class="form-control mb-4 w-full">
            <label class="label" for="pageContent{i}">
              <span class="label-text font-semibold">{$_('wizard.content.pages.pageContent')}</span>
            </label>
            <textarea
              id="pageContent{i}"
              class="textarea textarea-bordered w-full"
              bind:value={config.pages[i].content}
              placeholder={$_('wizard.content.pages.pageContentPlaceholder')}
              rows="3"
            ></textarea>
          </div>

          <div class="form-control w-full">
            <label class="label" for="pageCharacteristic{i}">
              <span class="label-text font-semibold">{$_('wizard.content.pages.pageCharacteristic')}</span>
            </label>
            <textarea
              id="pageCharacteristic{i}"
              class="textarea textarea-bordered w-full"
              bind:value={config.pages[i].characteristic}
              placeholder={$_('wizard.content.pages.pageCharacteristicPlaceholder')}
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <button type="button" class="btn btn-simple mt-4" onclick={addPage}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    {$_('wizard.content.pages.addPage')}
  </button>
</div>

<!-- Form Fields (only if contact form is selected) -->
{#if config.features.includes('kontaktformular')}
  <div class="content-section">
    <h2>{$_('wizard.content.formFields.title')}</h2>
    <p>{$_('wizard.content.formFields.description')}</p>

    <div class="space-y-4">
      {#each config.formFields as field, i}
        <div class="card bg-base-100 border-base-300 border">
          <div class="card-body">
            <div class="mb-4 flex items-center justify-between">
              <h4 class="card-title text-lg">{$_('wizard.content.formFields.field')} {i + 1}</h4>
              <button type="button" class="btn btn-error btn-sm" onclick={() => removeFormField(i)} aria-label={$_('wizard.content.formFields.removeField')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {$_('wizard.content.formFields.remove')}
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="form-control w-full">
                <label class="label" for="fieldType{i}">
                  <span class="label-text font-semibold">{$_('wizard.content.formFields.fieldType')}</span>
                </label>
                <select id="fieldType{i}" class="select select-bordered w-full" bind:value={config.formFields[i].type}>
                  <option value="">{$_('wizard.content.formFields.fieldTypePlaceholder')}</option>
                  {#each formFieldTypes as fieldType}
                    <option value={fieldType.id}>{$_(fieldType.title)}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control w-full">
                <label class="label" for="fieldName{i}">
                  <span class="label-text font-semibold">{$_('wizard.content.formFields.fieldName')}</span>
                </label>
                <input
                  type="text"
                  id="fieldName{i}"
                  class="input input-bordered w-full"
                  bind:value={config.formFields[i].name}
                  placeholder={$_('wizard.content.formFields.fieldNamePlaceholder')}
                />
              </div>
            </div>

            <div class="form-control mt-4">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={config.formFields[i].required} />
                <span class="label-text">{$_('wizard.content.formFields.required')}</span>
              </label>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <button type="button" class="btn btn-simple mt-4" onclick={addFormField}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      {$_('wizard.content.formFields.addField')}
    </button>
  </div>
{/if}

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
    @apply mb-12 md:mx-10 lg:mx-20;

    h2 {
      @apply text-base-content mt-2 mb-4 p-0;
    }

    p {
      @apply text-base-content/80 mb-6;
    }
  }
</style>
