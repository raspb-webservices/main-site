<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { projectTypes } from '$lib/configs/wizard-config';
  let { config, selectProjectType } = $props();
</script>

<div class="step-header">
  <h1>{$_('wizard.steps.step1.titleFirst')} <span class="inner-text-special">{$_('wizard.steps.step1.titleHighlight')}</span></h1>
  <p class="teaser">{$_('wizard.steps.step1.teaser')}</p>
</div>

<div class="project-types-grid">
  {#each projectTypes as type}
    <div
      class="card service-card cursor-pointer transition-all duration-300"
      class:card-selected={config.projectType === type.id}
      role="button"
      tabindex="0"
      onclick={() => selectProjectType(type.id)}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProjectType(type.id);
        }
      }}
      aria-label="Select project type: {type.title}"
    >
      <div class="card-body">
        <div class="service-card-header">
          <h3 class="card-title no-padding">{$_(type.title)}</h3>
          <div class="service-icon">{type.icon}</div>
        </div>
        <p class="no-padding">{$_(type.description)}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-primary">{type.lowestPrice.toLocaleString()}€ - {type.highestPrice.toLocaleString()}€</div>
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
  .project-types-grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;

    .service-card {
      @apply bg-base-100 border-base-300 border transition-all duration-300;

      &:hover {
        @apply bg-base-200 border-base-300;
      }

      &.card-selected {
        @apply ring-primary ring-offset-base-100 ring-2 ring-offset-2;
        &:hover {
          @apply bg-base-100 cursor-default;
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
