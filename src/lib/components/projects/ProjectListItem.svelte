<script lang="ts">
  import type { Project } from '$interfaces/project.interface';
  import { formatDate, formatBudget, getStatusBadgeClass, getStatusLabel } from '$lib/helper/projectUtils';

  export let project: Project & { id: string };
  export let openProjectModal: (project: Project & { id: string }) => void;
</script>

<tr class="cursor-pointer hover" onclick={() => openProjectModal(project)}>
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
