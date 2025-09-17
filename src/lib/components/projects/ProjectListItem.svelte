<script lang="ts">
  import type { Project } from '$interfaces/project.interface';
  import { formatDate, formatBudget, getStatusBadgeClass, getStatusLabel, getProjectTypeLabel } from '$lib/helper/projectUtils';
  import { _ } from 'svelte-i18n';
  let { project, openProjectModal } = $props();

  function openThisProjectModal(project:Project) {
    // Emit function call
    openProjectModal(project)
  }
</script>

<tr class="cursor-pointer hover" onclick={ () => openThisProjectModal(project)  }>
  <td>
    <div class="font-medium">{project.name}</div>
  </td>
  <td>{project.projectType || 'Unbekannt'}</td>
  <td>
    {#if project.projectStatus}
      <div class="badge {getStatusBadgeClass(project.projectStatus)} badge-sm">
        {getStatusLabel(project.projectStatus)}
      </div>
    {/if}
  </td>
  <td>{formatBudget(project.budget || '')}</td>
  <td>{project.createdAt ? formatDate(project.createdAt) : 'Unbekannt'}</td>
</tr>
