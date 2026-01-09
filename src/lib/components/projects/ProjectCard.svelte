<script lang="ts">
  import type { Project } from '$interfaces/project.interface';
  import { formatDate, formatBudget, getStatusBadgeClass, getStatusLabel, getProjectTypeLabel } from '$lib/helper/projectUtils';
  import { m } from '$lib/paraglide/messages';
  let { project, openProjectModal } = $props();

  function openThisProjectModal(project:Project) {
    // Emit function call
    openProjectModal(project)
  }
</script>

<button
  class="card bg-base-200 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
  onclick={ () => openThisProjectModal(project) }
>
  <div class="card-body">
    <div class="mb-4 flex items-start justify-between">
      <h2 class="line-clamp-3">{project.name}</h2>
      <div class="flex flex-row absolute top-[-7px] right-[25px] gap-1">
        <div class="badge badge-primary badge-sm">{ getProjectTypeLabel(project.projectType)}</div>
        {#if project.projectStatus}
          <div class="badge {getStatusBadgeClass(project.projectStatus)} badge-sm">
            {getStatusLabel(project.projectStatus)}
          </div>
        {/if}
      </div>
    </div>

    <p class="text-base-content/70 mb-4 line-clamp-3 text-sm">
      {project.description || 'Keine Beschreibung verfügbar'}
    </p>

    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-base-content/60">Budget:</span>
        <span class="font-medium">{formatBudget(project.budget || '')}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-base-content/60">Erstellt:</span>
        <span class="font-medium">
          {project.createdAt ? formatDate(project.createdAt) : 'Unbekannt'}
        </span>
      </div>
    </div>

    <div class="card-actions mt-4 justify-end">
      <div class="text-base-content/50 text-xs italic">Klicken für Details →</div>
    </div>
  </div>
</button>

<style lang="postcss">
  @reference '../../../app.css';

  .card-body {
    @apply text-left;
  }
</style>