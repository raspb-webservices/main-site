<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { projectSubTypesWebsite } from '$lib/configs/wizard-config';
  let { config, selectProjectSubType } = $props();
</script>

<div class="step-header">
  <h1>
    {m['wizard_stepSubType_titleFirst']()} <span class="inner-text-special">{m['wizard_stepSubType_titleHighlight']()}</span>{m[
      'wizard_stepSubType_titleSecond'
    ]()}
  </h1>
  <p class="teaser">{m['wizard_stepSubType_teaser']({ project: m['wizard.type.' + config.projectType + '.title']?.() ?? config.projectType })}</p>
</div>

<div class="subtypes-grid">
  {#each projectSubTypesWebsite as subtype}
    <div
      class="card service-card cursor-pointer transition-all duration-300"
      class:card-selected={config.subType === subtype.id}
      role="button"
      tabindex="0"
      onclick={() => selectProjectSubType(subtype.id)}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProjectSubType(subtype.id);
        }
      }}
      aria-label="Select subtype: {subtype.title}"
    >
      <div class="card-body">
        <h3 class="card-title">{m[subtype.title]?.() ?? subtype.title}</h3>
        <p class="no-padding">{m[subtype.description]?.() ?? subtype.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-success">bereits ab {subtype.lowestPrice}€</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-8 border-t pt-8 text-center md:border-t-0; /* Adjusted margins and padding */

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70;
    }
  }
  .subtypes-grid {
    @apply flex flex-row flex-wrap items-center justify-center gap-10;
    .service-card {
      @apply border-base-300/80 max-w-md border bg-white transition-all duration-300 md:max-w-lg;

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
</style>
