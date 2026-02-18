<script lang="ts">
  import type { Project } from '$interfaces/project.interface';
  import {
    formatDate,
    formatBudget,
    getStatusBadgeClass,
    getStatusLabel,
    getProjectTypeLabel,
    getProjectTypeIcon,
    getStatusProgress,
    isProjectEditable,
    getFeatureLabel
  } from '$lib/helper/projectUtils';
  import { m } from '$lib/paraglide/messages';

  let { project, openProjectModal } = $props();

  let editable = $derived(isProjectEditable(project.projectStatus));
  let progress = $derived(getStatusProgress(project.projectStatus));
  let icon = $derived(getProjectTypeIcon(project.projectType));
  let typeLabel = $derived(getProjectTypeLabel(project.projectType));
  let visibleFeatures = $derived((project.features || []).slice(0, 3));
  let remainingFeatures = $derived(Math.max(0, (project.features || []).length - 3));
</script>

<button
  class="project-card group"
  onclick={() => openProjectModal(project)}
>
  <!-- Gradient Header -->
  <div class="card-header" style={project.primaryColour ? `--card-accent: ${project.primaryColour}` : ''}>
    <div class="header-bg"></div>
    <div class="header-content">
      <span class="type-icon">{icon}</span>
      <div class="badges">
        {#if typeLabel}
          <span class="badge badge-sm text-white/90 border-white/20 bg-white/15 backdrop-blur-sm">{typeLabel}</span>
        {/if}
        {#if project.projectStatus}
          <span class="badge badge-sm {getStatusBadgeClass(project.projectStatus)}">
            {getStatusLabel(project.projectStatus)}
          </span>
        {/if}
      </div>
    </div>
    {#if !editable}
      <div class="lock-indicator" title={m.dashboard_projectCard_locked()}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
      </div>
    {/if}
  </div>

  <!-- Card Body -->
  <div class="card-body-content">
    <h3 class="project-name">{project.name}</h3>
    <p class="project-description">
      {project.description || m.dashboard_details_fallback_no_description()}
    </p>

    <!-- Progress Bar -->
    <div class="progress-section">
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: {progress}%"></div>
      </div>
      <span class="progress-label">{progress}%</span>
    </div>

    <!-- Features -->
    {#if visibleFeatures.length > 0}
      <div class="features-row">
        {#each visibleFeatures as feature}
          <span class="feature-chip">{getFeatureLabel(feature)}</span>
        {/each}
        {#if remainingFeatures > 0}
          <span class="feature-chip more">+{remainingFeatures}</span>
        {/if}
      </div>
    {/if}

    <!-- Footer Info -->
    <div class="card-footer-info">
      <div class="info-item">
        <span class="info-label">{m.dashboard_projectCard_label_budget()}</span>
        <span class="info-value">{formatBudget(project.budget || '')}</span>
      </div>
      <div class="info-item">
        <span class="info-label">{m.dashboard_projectCard_label_created()}</span>
        <span class="info-value">{project.createdAt ? formatDate(project.createdAt) : m.dashboard_details_fallback_unknown()}</span>
      </div>
    </div>
  </div>

  <!-- Hover Glow -->
  <div class="hover-glow"></div>
</button>

<style lang="postcss">
  @reference '../../../app.css';

  .project-card {
    @apply bg-base-100 relative flex min-h-70 w-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left shadow-md transition-all duration-500;

    &:hover {
      @apply -translate-y-1;
      box-shadow:
        0 20px 40px -12px oklch(0.6668 0.2591 322.15 / 0.15),
        0 4px 12px oklch(0 0 0 / 0.08);

      .hover-glow {
        @apply opacity-100;
      }

      .header-bg {
        @apply scale-105;
      }
    }
  }

  .card-header {
    @apply relative flex h-20 items-end overflow-hidden px-5 pb-3;
    --card-accent: oklch(0.6668 0.2591 322.15);
  }

  .header-bg {
    @apply absolute inset-0 transition-transform duration-700;
    background: linear-gradient(135deg, oklch(0.6056 0.2189 292.72), oklch(0.6559 0.2118 354.31), var(--card-accent));
  }

  .header-content {
    @apply relative z-10 flex w-full items-center justify-between;
  }

  .type-icon {
    @apply text-2xl drop-shadow-md;
  }

  .badges {
    @apply flex flex-row gap-1.5;
  }

  .lock-indicator {
    @apply absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm;
  }

  .card-body-content {
    @apply flex flex-1 flex-col gap-3 p-5;
  }

  .project-name {
    @apply text-base-content line-clamp-2 text-lg font-bold leading-tight;
  }

  .project-description {
    @apply text-base-content/60 line-clamp-2 text-sm font-light;
  }

  .progress-section {
    @apply flex items-center gap-2;
  }

  .progress-bar-track {
    @apply bg-base-200 h-1.5 flex-1 overflow-hidden rounded-full;
  }

  .progress-bar-fill {
    @apply h-full rounded-full transition-all duration-700;
    background: linear-gradient(90deg, oklch(0.6056 0.2189 292.72), oklch(0.6559 0.2118 354.31), oklch(0.6668 0.2591 322.15));
  }

  .progress-label {
    @apply text-base-content/40 text-xs font-medium;
  }

  .features-row {
    @apply flex flex-wrap gap-1.5;
  }

  .feature-chip {
    @apply bg-base-200 text-base-content/70 rounded-full px-2.5 py-0.5 text-[11px] font-medium;

    &.more {
      @apply bg-purple/10 text-purple font-bold;
    }
  }

  .card-footer-info {
    @apply border-base-200 mt-auto flex justify-between border-t pt-3;
  }

  .info-item {
    @apply flex flex-col gap-0.5;
  }

  .info-label {
    @apply text-base-content/40 text-[10px] uppercase tracking-wider;
  }

  .info-value {
    @apply text-base-content text-xs font-medium;
  }

  .hover-glow {
    @apply pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500;
    background: radial-gradient(circle at 50% 0%, oklch(0.6668 0.2591 322.15 / 0.06) 0%, transparent 70%);
  }
</style>
