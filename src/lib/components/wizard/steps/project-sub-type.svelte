<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { subTypes, projectTypes } from '$lib/configs/wizard-config';

  export let config: any; // TODO: Use proper type for config
  export let selectSubType: (type: string) => void;
</script>

<div class="step-header">
  <h1>
    {$_('wizard.steps.step2.titleFirst')} <span class="inner-text-special">{$_('wizard.config.projectTypes.' + config.projectType + '.title')}</span>
    {$_('wizard.steps.step2.titleSecond')}
  </h1>
  <p class="teaser">{$_('wizard.steps.step2.teaser')}</p>
</div>

<div class="subtypes-grid">
  {#each subTypes.filter((st) => st.parentId === config.projectType) as subtype}
    <div
      class="card service-card cursor-pointer transition-all duration-300"
      class:card-selected={config.subType === subtype.id}
      role="button"
      tabindex="0"
      onclick={() => selectSubType(subtype.id)}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectSubType(subtype.id);
        }
      }}
      aria-label="Select subtype: {subtype.title}"
    >
      <div class="card-body">
        <h3 class="card-title">{$_(subtype.title)}</h3>
        <p class="no-padding">{$_(subtype.description)}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-success">ab {subtype.lowestPrice}€</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-8 border-t pt-0 text-center md:border-t-0; /* Adjusted margins and padding */

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70;
    }
  }
  .subtypes-grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2;
    .service-card {
      @apply bg-white border-base-300/80 border transition-all duration-300;

      &:hover {
        @apply bg-primary/1 border-base-300 shadow-md;
      }

      &.card-selected {
        @apply ring-primary ring-offset-base-100 ring-2 ring-offset-2;
        &:hover {
          @apply bg-primary/1 cursor-default;
        }
      }

      .service-card-header {
        @apply mb-4 flex items-center justify-between;

        .service-icon {
          @apply text-3xl;
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
