<script lang="ts">
  import type { Project } from '$interfaces/project.interface';
  import { formatDate, formatBudget, getStatusBadgeClass, getStatusLabel, getProjectTypeLabel } from '$lib/helper/projectUtils';
  import { m } from '$lib/paraglide/messages';
  let { project, openProjectModal } = $props();

  function openThisProjectModal(project: Project) {
    // Emit function call
    openProjectModal(project);
  }
</script>

<tr class="hover cursor-pointer" onclick={() => openThisProjectModal(project)}>
  <td>
    <div class="font-medium">{project.name}</div>
  </td>
  <td>{getProjectTypeLabel(project.projectType || '') || m.dashboard_details_fallback_unknown()}</td>
  <td>
    {#if project.projectStatus}
      <div class="badge {getStatusBadgeClass(project.projectStatus)} badge-sm">
        {getStatusLabel(project.projectStatus)}
      </div>
    {/if}
  </td>
  <td>{formatBudget(project.budget || '')}</td>
  <td>{project.createdAt ? formatDate(project.createdAt) : m.dashboard_details_fallback_unknown()}</td>
</tr>
