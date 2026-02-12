<script lang="ts">
  import { formatDate, formatBudget, getStatusBadgeClass, getStatusLabel } from '$lib/helper/projectUtils';
  import { m } from '$lib/paraglide/messages';

  let { selectedProject } = $props();
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    {#if selectedProject}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
      </form>

      <h3 class="mb-4 text-lg font-bold">{selectedProject.name}</h3>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Grundinformationen -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">{m.dashboard_details_section_basic()}</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_type()}</span>
                <span class="font-medium">{selectedProject.projectType || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_subtype()}</span>
                <span class="font-medium">{selectedProject.subType || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_status()}</span>
                {#if selectedProject.projectStatus}
                  <div class="badge {getStatusBadgeClass(selectedProject.projectStatus)} badge-sm">
                    {getStatusLabel(selectedProject.projectStatus)}
                  </div>
                {:else}
                  <span class="font-medium">{m.dashboard_details_fallback_not_specified()}</span>
                {/if}
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_description()}</span>
                <span class="text-sm">{selectedProject.description || m.dashboard_details_fallback_no_description()}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_details()}</span>
                <span class="text-sm">{selectedProject.projectDetails || m.dashboard_details_fallback_no_details()}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Projekt-Spezifikationen -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">{m.dashboard_details_section_specs()}</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_domain()}</span>
                <span class="font-medium">{selectedProject.desiredDomain || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_domain_status()}</span>
                <div class="badge badge-outline badge-sm">{selectedProject.domainStatus || m.dashboard_details_fallback_not_specified()}</div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_goals()}</span>
                <span class="text-sm">{selectedProject.goals || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_audience()}</span>
                <span class="text-sm">{selectedProject.targetAudience || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_timeline()}</span>
                <span class="font-medium">{selectedProject.timeline || m.dashboard_details_fallback_not_specified()}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget & Preise -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">{m.dashboard_details_section_budget()}</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_budget()}</span>
                <span class="font-medium">{formatBudget(selectedProject.budget || '')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_estimated_price()}</span>
                <span class="font-medium">
                  {selectedProject.estimatedPrice ? `${selectedProject.estimatedPrice}€` : m.dashboard_details_fallback_not_calculated()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">{m.dashboard_details_section_features()}</h4>
            {#if selectedProject.features && selectedProject.features.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each selectedProject.features as feature}
                  <div class="badge badge-success badge-sm">{feature}</div>
                {/each}
              </div>
            {:else}
              <p class="text-base-content/60 text-sm">{m.dashboard_details_fallback_no_features()}</p>
            {/if}
            {#if selectedProject.customFeature}
              <div class="mt-2">
                <div class="text-base-content/60 text-sm">{m.dashboard_details_label_custom_feature()}</div>
                <div class="pt-1 text-sm">{selectedProject.customFeature}</div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Design -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">{m.dashboard_details_section_design()}</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_primary_color()}</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.primaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject.primaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject.primaryColour}</span>
                  {:else}
                    <span class="text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_secondary_color()}</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.secondaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject.secondaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject.secondaryColour}</span>
                  {:else}
                    <span class="text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_accent_color()}</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.accentColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject.accentColour}"></div>
                    <span class="font-mono text-xs">{selectedProject.accentColour}</span>
                  {:else}
                    <span class="text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_font()}</span>
                <span class="font-medium">{selectedProject.desiredFont || m.dashboard_details_fallback_not_specified()}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dateien -->
        {#if selectedProject.relatedFiles && selectedProject.relatedFiles.length > 0}
          <div class="card bg-base-200">
            <div class="card-body">
              <h4 class="card-title text-base">{m.dashboard_details_section_files()}</h4>
              <div class="space-y-2">
                {#each selectedProject.relatedFiles as file}
                  <div class="bg-base-100 flex items-center justify-between rounded p-2">
                    <span class="truncate text-sm">{file.fileName || m.dashboard_details_fallback_unnamed_file()}</span>
                    {#if file.url}
                      <button onclick={() => window.open(file.url, '_blank')} class="btn btn-xs btn-simple"> {m.dashboard_details_button_open()} </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}

        <!-- Metadaten -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">{m.dashboard_details_section_meta()}</h4>
            <div class="space-y-3">
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_project_id()}</span>
                <span class="font-mono text-xs">{selectedProject.id}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_created_at()}</span>
                <span class="font-medium">
                  {selectedProject.createdAt ? formatDate(selectedProject.createdAt) : m.dashboard_details_fallback_unknown()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
