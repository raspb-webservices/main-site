<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import { onMount } from 'svelte';
  import type { Project } from '$interfaces/project.interface';
  import { projectStatus } from '$interfaces/project.interface';

  // Reaktive Variablen für Authentifizierung und Rollen
  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get());
  let currentUserRoles = $derived(userroles.get());
  let hasCustomerAccess = $derived(isAuth && currentUserRoles.includes('customer'));

  // Projekt-Daten
  let projects: (Project & { id: string })[] = $state([]);
  let loading = $state(false);
  let error = $state('');
  let hasLoaded = $state(false);
  let selectedProject: (Project & { id: string }) | null = $state(null);
  let modalDialog: HTMLDialogElement;
  let viewMode = $state<'grid' | 'list'>('grid'); // Toggle between grid and list view

  // Prüfe Zugriffsberechtigung beim Laden der Seite
  onMount(async () => {
    checkAccess();
    hasLoaded = false; // Reset hasLoaded when component mounts
    if (hasCustomerAccess) {
      loadProjects();
    }
  });

  // Prüfe Zugriff bei Änderungen der Authentifizierung oder Rollen
  $effect(() => {
    checkAccess();
    // Only load projects if we have access and haven't loaded them yet
    // @ts-ignore - currentUser type is not properly defined
    if (hasCustomerAccess && !hasLoaded && projects.length === 0 && currentUser?.projectIds && currentUser.projectIds.length > 0) {
      loadProjects();
      hasLoaded = true;
    }
  });

  function checkAccess() {
    if (!isAuth) {
      // Nutzer ist nicht eingeloggt - weiterleiten zur Startseite
      goto('/');
      return;
    }

    if (!currentUserRoles.includes('customer')) {
      // Nutzer hat keine Kunden-Rechte - weiterleiten zur Startseite
      goto('/');
      return;
    }
  }

  async function loadProjects() {
    // @ts-ignore - currentUser type is not properly defined
    if (!currentUser?.projectIds || currentUser.projectIds.length === 0) {
      loading = false; // Set loading to false when there are no projects
      hasLoaded = true; // Set hasLoaded to true when there are no projects
      return;
    }

    loading = true;
    error = '';

    try {
      // @ts-ignore - currentUser type is not properly defined
      const projectPromises = currentUser.projectIds.map(async (projectId: string) => {
        try {
          const response = await fetch(`/api/project/get/${projectId}`);
          const data = await response.json();
          
          if (response.ok && data.project) {
            return { ...data.project, id: projectId };
          } else {
            console.error(`Error fetching project ${projectId}:`, data);
            return null;
          }
        } catch (err) {
          console.error(`Error fetching project ${projectId}:`, err);
          return null;
        }
      });

      const projectResults = await Promise.all(projectPromises);
      projects = projectResults.filter((project): project is (Project & { id: string }) => project !== null);
    } catch (err) {
      error = 'Fehler beim Laden der Projekte';
      console.error('Error loading projects:', err);
    } finally {
      loading = false;
      hasLoaded = true; // Set hasLoaded to true when loading is complete
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatBudget(budget: string) {
    return budget ? `${budget}€` : 'Nicht angegeben';
  }

  function getStatusBadgeClass(status: string) {
    switch (status) {
      case projectStatus.created:
        return 'badge-neutral';
      case projectStatus.introduced:
        return 'badge-info';
      case projectStatus.prototype:
        return 'badge-warning';
      case projectStatus.refinement:
        return 'badge-secondary';
      case projectStatus.ready:
        return 'badge-accent';
      case projectStatus.published:
        return 'badge-success';
      case projectStatus.paid:
        return 'badge-primary';
      default:
        return 'badge-ghost';
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case projectStatus.created:
        return 'Erstellt';
      case projectStatus.introduced:
        return 'Vorgestellt';
      case projectStatus.prototype:
        return 'Prototyp';
      case projectStatus.refinement:
        return 'Verfeinerung';
      case projectStatus.ready:
        return 'Bereit';
      case projectStatus.published:
        return 'Veröffentlicht';
      case projectStatus.paid:
        return 'Bezahlt';
      default:
        return 'Unbekannt';
    }
  }

  function openProjectModal(project: Project & { id: string }) {
    selectedProject = project;
    modalDialog?.showModal();
  }

  function closeModal() {
    modalDialog?.close();
    selectedProject = null;
  }
</script>

<svelte:head>
  <title>raspb Webservices - Mein Kunden-Dashboard</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="content-area">
  {#if hasCustomerAccess}
    <!-- Dashboard-Inhalt für Kunden-Nutzer -->
    <Section>
      <h1>Mein Kunden-Dashboard</h1>
      <p class="teaser no-padding">Hier sind Ihre Projekte aufgelistet</p>

      <!-- View Toggle and Project List -->
      <div class="mt-8">
        {#if loading}
          <div class="flex flex-col items-center justify-center py-12">
            <span class="loading loading-spinner loading-lg text-primary"></span>
            <p class="text-base-content/70 mt-4">Projekte werden geladen...</p>
          </div>
        {:else if error}
          <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <div>
              <button class="btn btn-sm btn-outline" onclick={loadProjects}> Erneut versuchen </button>
            </div>
          </div>
        {:else if projects.length === 0}
          <div class="hero min-h-[300px]">
            <div class="hero-content text-center">
              <div class="max-w-md">
                <h2 class="text-2xl font-bold">Noch keine Projekte</h2>
                <p class="py-6">Es wurden noch keine Projekte für Sie erstellt.</p>
              </div>
            </div>
          </div>
        {:else}
          <!-- View Toggle -->
          <div class="mb-4 flex justify-end">
            <div class="join">
              <button 
                class={"btn btn-sm join-item " + (viewMode === 'grid' ? 'btn-active' : '')}
                onclick={() => viewMode = 'grid'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Kacheln
              </button>
              <button 
                class={"btn btn-sm join-item " + (viewMode === 'list' ? 'btn-active' : '')}
                onclick={() => viewMode = 'list'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Liste
              </button>
            </div>
          </div>

          <!-- Project Display -->
          {#if viewMode === 'grid'}
            <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {#each projects as project}
                <div 
                  class="card bg-base-200 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  onclick={() => openProjectModal(project)}
                >
                  <div class="card-body">
                    <div class="mb-4 flex items-start justify-between">
                      <h2 class="card-title text-lg">{project.name}</h2>
                      <div class="flex flex-col gap-1">
                        <div class="badge badge-primary badge-sm">{project.projectType || 'Unbekannt'}</div>
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
                </div>
              {/each}
            </div>
          {:else}
            <div class="mt-6 overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th>Projekt</th>
                    <th>Typ</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Erstellt</th>
                  </tr>
                </thead>
                <tbody>
                  {#each projects as project}
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
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        {/if}
      </div>
    </Section>
  {/if}
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>

<!-- DaisyUI Modal für Projektdetails -->
<dialog bind:this={modalDialog} class="modal">
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
