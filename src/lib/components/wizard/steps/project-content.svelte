<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { config, addPage, removePage, removeFormField, addFormField, formFieldTypes } = $props();
</script>

<!-- Step 5: Content Details (only for website/cms) -->
<div class="step-header">
  <h1>{m['wizard_steps_step5_titleFirst']()} <span class="inner-text-special">{m['wizard_steps_step5_titleHighlight']()}</span></h1>
  <p class="teaser">{m['wizard_steps_step5_teaser']()}</p>
</div>

<!-- Pages/Sections -->
<div class="content-section">
  <h2>{m['wizard_steps_step5_content_pages_title']()}</h2>
  <p>{m['wizard_steps_step5_content_pages_description']()}</p>

  <div class="space-y-6">
    {#each config.pages as page, i}
      <div class="card border-base-300 border bg-white">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-lg">{m['wizard_steps_step5_content_pages_pageTitle']()} {i + 1}</h4>
            <button type="button" class="btn btn-error btn-sm" onclick={() => removePage(i)} aria-label={m['wizard_steps_step5_content_pages_removePage']()}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {m['wizard_steps_step5_content_pages_remove']()}
            </button>
          </div>

          <div class="form-control mb-4 w-full">
            <label class="label" for="pageName{i}">
              <span class="label-text font-semibold">{m['wizard_content_pages_pageName']()}</span>
            </label>
            <input
              type="text"
              id="pageName{i}"
              class="input input-bordered w-full"
              bind:value={config.pages[i].name}
              placeholder={m['wizard_content_pages_pageNamePlaceholder']()}
            />
          </div>

          <div class="form-control mb-4 w-full">
            <label class="label" for="pageContent{i}">
              <span class="label-text font-semibold">{m['wizard_content_pages_pageContent']()}</span>
            </label>
            <textarea
              id="pageContent{i}"
              class="textarea textarea-bordered w-full"
              bind:value={config.pages[i].content}
              placeholder={m['wizard_content_pages_pageContentPlaceholder']()}
              rows="3"
            ></textarea>
          </div>

          <div class="form-control w-full">
            <label class="label" for="pageCharacteristic{i}">
              <span class="label-text font-semibold">{m['wizard_content_pages_pageCharacteristic']()}</span>
            </label>
            <textarea
              id="pageCharacteristic{i}"
              class="textarea textarea-bordered w-full"
              bind:value={config.pages[i].characteristic}
              placeholder={m['wizard_content_pages_pageCharacteristicPlaceholder']()}
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
    {m['wizard_content_pages_addPage']()}
  </button>
</div>

<!-- Form Fields (only if contact form is selected) -->
{#if config.features.includes('kontaktformular')}
  <div class="content-section">
    <h2>{m['wizard_content_formFields_title']()}</h2>
    <p>{m['wizard_content_formFields_description']()}</p>

    <div class="space-y-4">
      {#each config.formFields as field, i}
        <div class="card border-base-300 border bg-white">
          <div class="card-body">
            <div class="mb-4 flex items-center justify-between">
              <h4 class="card-title text-lg">{m['wizard_content_formFields_field']()} {i + 1}</h4>
              <button type="button" class="btn btn-error btn-sm" onclick={() => removeFormField(i)} aria-label={m['wizard_content_formFields_removeField']()}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {m['wizard_content_formFields_remove']()}
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="form-control w-full">
                <label class="label" for="fieldType{i}">
                  <span class="label-text font-semibold">{m['wizard_content_formFields_fieldType']()}</span>
                </label>
                <select id="fieldType{i}" class="select select-bordered w-full" bind:value={config.formFields[i].type}>
                  <option value="">{m['wizard_content_formFields_fieldTypePlaceholder']()}</option>
                  {#each formFieldTypes as fieldType}
                    <option value={fieldType.id}>{m[fieldType.title]()}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control w-full">
                <label class="label" for="fieldName{i}">
                  <span class="label-text font-semibold">{m['wizard_content_formFields_fieldName']()}</span>
                </label>
                <input
                  type="text"
                  id="fieldName{i}"
                  class="input input-bordered w-full"
                  bind:value={config.formFields[i].name}
                  placeholder={m['wizard_content_formFields_fieldNamePlaceholder']()}
                />
              </div>
            </div>

            <div class="form-control mt-4">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" class="checkbox checkbox-primary" bind:checked={config.formFields[i].required} />
                <span class="label-text">{m['wizard_content_formFields_required']()}</span>
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
      {m['wizard_content_formFields_addField']()}
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
      @apply text-base-content/70 m-auto max-w-4xl text-center;
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
</style>
