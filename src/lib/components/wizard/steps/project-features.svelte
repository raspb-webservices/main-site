<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { availableFeatures, featureCategoryColors } from '$lib/configs/wizard-config';
  let { config, customFeatures = null, calculatePrice, isExtendedConfigurator = false } = $props();
</script>

<div class="step-header">
  <h1>{m['wizard.steps.step4.titleFirst']()} <span class="inner-text-special">{m['wizard.steps.step4.titleHighlight']()}</span></h1>
  <p class="teaser">{m['wizard.steps.step4.teaser']()}</p>
</div>

<div class="features-grid">
  {#each availableFeatures as feature}
    <label class="card service-card cursor-pointer transition-all duration-300" class:card-selected={config.features.includes(feature.name)}>
      <div class="card-body">
        <div class="card-actions items-center justify-start">
          <input type="checkbox" class="checkbox checkbox-primary" bind:group={config.features} value={feature.name} onchange={() => calculatePrice()} />
          <h3 class="card-title no-padding">{m[feature.title]()}</h3>
        </div>
        <p class="no-padding">{m[feature.description]()}</p>

        <div class="card-actions justify-end">
          <div class="badge { featureCategoryColors[feature.category] || 'badge-info' }">{m[feature.category]()}</div>
        </div>
      </div>
    </label>
  {/each}
</div>

{#if customFeatures || isExtendedConfigurator}
  <div class="form-control mt-8 md:mx-10 lg:mx-20">
    <label class="label" for="customFeatures">
      <span class="label-text text-lg font-semibold">{m['wizard.form.customFeatures']()}</span>
    </label>
    <textarea
      id="customFeatures"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={customFeatures}
      placeholder={m['wizard.form.customFeaturesPlaceholder']()}
      rows="4"
    ></textarea>
  </div>
{:else}
  <div class="form-control mt-8 md:mx-10 lg:mx-20">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m['wizard.form.projectDescription']()}</span>
    </label>
    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={m['wizard.form.placeholders.default']()}
      rows="4"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{m['wizard.form.characters']({ count: config.description.length })}</span>
    </div>
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

  .features-grid {
    @apply mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3;

    .service-card {
      @apply border-base-300/80 border bg-white transition-all duration-300;

      &:hover {
        @apply bg-primary/1 border-base-300 shadow-md;
      }

      &.card-selected {
        @apply ring-primary ring-offset-base-100 ring-2 ring-offset-2;
        &:hover {
          @apply bg-primary/1 cursor-default;
        }
      }

      .card-body {
        @apply text-base-content;

        .card-title {
          @apply text-base-content;
        }

        p {
          @apply text-base-content/80;
        }
      }
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
