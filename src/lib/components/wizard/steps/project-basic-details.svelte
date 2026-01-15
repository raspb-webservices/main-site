<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { config } = $props();
</script>

<div class="step-header">
  <h1>
    {m['wizard_stepBasicDetails_titleFirst']()} <span class="inner-text-special">{m['wizard_stepBasicDetails_titleHighlight']()}</span>
    {m['wizard_stepBasicDetails_titleSecond']()}
  </h1>
  <p class="teaser">{m['wizard_stepBasicDetails_teaser']()}</p>
</div>

<div class="content-section">
  <div class="form-control mb-8 w-full">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m['wizard_form_projectDescription']()}</span>
    </label>
    <p>{m['wizard_form_projectDescription_subTitle']()}</p>
    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={config.projectType === 'webApplication' || config.projectType === 'artificialIntelligence'
        ? m['wizard_form_placeholders_webApplication']()
        : config.projectType === 'freestyle'
          ? m['wizard_form_placeholders_freestyle']()
          : m['wizard_form_placeholders_default']()}
      rows="8"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{m['wizard_form_characters']({ count: config.description.length })}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-control w-full">
      <p>Ausprägung (bei PWA: Neu oder bestehende webseite upgraden? bei cms komplexität?)</p>
      <p>Wie viel selbst machen?</p>
      <p>Quick and Dirty oder Overengenieered</p>
      <p>Besonderheiten</p>
      <p>Ziele, Zielgruppe</p>
      <p>Zeitrahmen</p>
      <p>Budget</p>

      <p>---</p>

      <p>Bei Freestyle: Komplexitätseinschätzung (Manntage?)</p>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-14 border-t pt-8 text-center md:border-t-0;

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 m-auto max-w-4xl text-center;
    }
  }
  .content-section {
    @apply mb-12 md:mx-10 lg:mx-20;
    .form-control {
      @apply w-full;

      .label-text {
        @apply text-base-content;
      }

      .label-text-alt {
        @apply text-base-content/60;
      }
    }

    .textarea {
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
