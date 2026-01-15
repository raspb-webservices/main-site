<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { projectTypesWebApp } from '$lib/configs/wizard-config';
  let { config, selectProjectType } = $props();
</script>

<div class="step-header">
  <h1>
    {m['wizard.stepType.titleFirst']()} <span class="inner-text-special">{m['wizard.stepType.titleHighlight']()}</span>
    {m['wizard.stepType.titleSecond']()}
  </h1>
  <p class="teaser">{m['wizard.stepType.teaser']()}</p>
</div>

<div class="project-types">
  {#each projectTypesWebApp as type}
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
          <h3 class="card-title no-padding">{m[type.title]?.() ?? type.title}</h3>
          <div class="service-icon">{type.icon}</div>
        </div>
        <p class="no-padding">{m[type.description]?.() ?? type.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-primary">ab {type.lowestPrice.toLocaleString()} €</div>
        </div>
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
  .project-types {
    @apply flex flex-row gap-10 items-center justify-center flex-wrap md:flex-nowrap;
    .service-card {
      @apply bg-white border-base-300/80 border transition-all duration-300 max-w-md;

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
