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
            <h4 class="card-title text-base">Grundinformationen</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Projekttyp:</span>
                <span class="font-medium">{selectedProject.projectType || 'Nicht angegeben'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Untertyp:</span>
                <span class="font-medium">{selectedProject.subType || 'Nicht angegeben'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Projektstatus:</span>
                {#if selectedProject.projectStatus}
                  <div class="badge {getStatusBadgeClass(selectedProject.projectStatus)} badge-sm">
                    {getStatusLabel(selectedProject.projectStatus)}
                  </div>
                {:else}
                  <span class="font-medium">Nicht angegeben</span>
                {/if}
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Beschreibung:</span>
                <span class="text-sm">{selectedProject.description || 'Keine Beschreibung verfügbar'}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Projektdetails:</span>
                <span class="text-sm">{selectedProject.projectDetails || 'Keine Details verfügbar'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Projekt-Spezifikationen -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Projekt-Spezifikationen</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Domain:</span>
                <span class="font-medium">{selectedProject.desiredDomain || 'Nicht angegeben'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Domain-Status:</span>
                <div class="badge badge-outline badge-sm">{selectedProject.domainStatus || 'Nicht angegeben'}</div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Ziele:</span>
                <span class="text-sm">{selectedProject.goals || 'Nicht angegeben'}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Zielgruppe:</span>
                <span class="text-sm">{selectedProject.targetAudience || 'Nicht angegeben'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Timeline:</span>
                <span class="font-medium">{selectedProject.timeline || 'Nicht angegeben'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget & Preise -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Budget & Preise</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Budget:</span>
                <span class="font-medium">{formatBudget(selectedProject.budget || '')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Geschätzter Preis:</span>
                <span class="font-medium">
                  {selectedProject.estimatedPrice ? `${selectedProject.estimatedPrice}€` : 'Nicht berechnet'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Features</h4>
            {#if selectedProject.features && selectedProject.features.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each selectedProject.features as feature}
                  <div class="badge badge-success badge-sm">{feature}</div>
                {/each}
              </div>
            {:else}
              <p class="text-sm text-base-content/60">Keine Features ausgewählt</p>
            {/if}
            {#if selectedProject.customFeature}
              <div class="mt-2">
                <div class="text-sm text-base-content/60">Custom Feature:</div>
                <div class="text-sm pt-1">{selectedProject.customFeature}</div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Design -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Design</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">Primärfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.primaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject.primaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject.primaryColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">Sekundärfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.secondaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject.secondaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject.secondaryColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">Akzentfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.accentColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject.accentColour}"></div>
                    <span class="font-mono text-xs">{selectedProject.accentColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Schriftart:</span>
                <span class="font-medium">{selectedProject.desiredFont || 'Nicht angegeben'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dateien -->
        {#if selectedProject.relatedFiles && selectedProject.relatedFiles.length > 0}
          <div class="card bg-base-200">
            <div class="card-body">
              <h4 class="card-title text-base">Dateien</h4>
              <div class="space-y-2">
                {#each selectedProject.relatedFiles as file}
                  <div class="bg-base-100 flex items-center justify-between rounded p-2">
                    <span class="truncate text-sm">{file.fileName || 'Unbenannte Datei'}</span>
                    {#if file.url}
                      <button onclick={() => window.open(file.url, '_blank')} class="btn btn-xs btn-simple"> Öffnen </button>
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
            <h4 class="card-title text-base">Metadaten</h4>
            <div class="space-y-3">
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Projekt ID:</span>
                <span class="font-mono text-xs">{selectedProject.id}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Erstellt am:</span>
                <span class="font-medium">
                  {selectedProject.createdAt ? formatDate(selectedProject.createdAt) : 'Unbekannt'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
