<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { projectCategories } from '$lib/configs/wizard-config';
  let { config, selectProjectCategory } = $props();
</script>

<div class="step-header">
  <h1>
    {m['wizard_stepCategory_titleFirst']()} <span class="inner-text-special">{m['wizard_stepCategory_titleHighlight']()}</span>
    {m['wizard_stepCategory_titleSecond']()}
  </h1>
  <p class="teaser">{m['wizard_stepCategory_teaser']()}</p>
</div>

<div class="project-categories">
  {#each projectCategories as category}
    <div
      class="card service-card cursor-pointer transition-all duration-300"
      class:card-selected={config.projectCategory === category.id}
      role="button"
      tabindex="0"
      onclick={() => selectProjectCategory(category.id)}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProjectCategory(category.id);
        }
      }}
      aria-label="Select project type: {category.title}"
    >
      <div class="card-body">
        <div class="service-card-header">
          <h3 class="card-title no-padding">{m[category.title]?.() ?? category.title}</h3>
          <div class="service-icon">{category.icon}</div>
        </div>
        <p class="no-padding">{m[category.description]()}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-12 border-t pt-8 text-center md:border-t-0;

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 m-auto max-w-5xl;
    }
  }
  .project-categories {
    @apply flex flex-row flex-wrap items-center justify-center gap-10 md:flex-nowrap;
    .service-card {
      @apply border-base-300/80 max-w-md border bg-white transition-all duration-300;

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
