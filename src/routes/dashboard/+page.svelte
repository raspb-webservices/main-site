<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import { onMount } from 'svelte';
  import type { Project } from '$interfaces/project.interface';

  // Reaktive Variablen für Authentifizierung und Rollen
  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get());
  let currentUserRoles = $derived(userroles.get());
  let hasAdminAccess = $derived(isAuth && currentUserRoles.includes('admin'));

  // Projekt-Daten
  let projects: (Project & { id: string })[] = $state([]);
  let loading = $state(false);
  let error = $state('');
  let selectedProject: (Project & { id: string }) | null = $state(null);
  let modalDialog: HTMLDialogElement;

  // Prüfe Zugriffsberechtigung beim Laden der Seite
  onMount(() => {
    checkAccess();
    if (hasAdminAccess) {
      loadProjects();
    }
  });

  // Prüfe Zugriff bei Änderungen der Authentifizierung oder Rollen
  $effect(() => {
    checkAccess();
    if (hasAdminAccess && projects.length === 0) {
      loadProjects();
    }
  });

  function checkAccess() {
    if (!isAuth) {
      // Nutzer ist nicht eingeloggt - weiterleiten zur Startseite
      goto('/');
      return;
    }
    
    if (!currentUserRoles.includes('admin')) {
      // Nutzer hat keine Admin-Rechte - zeige Fehlermeldung
      return;
    }
  }

  async function loadProjects() {
    loading = true;
    error = '';
    
    try {
      const response = await fetch('/api/project/get');
      const data = await response.json();
      
      if (response.ok) {
        projects = data.projects || [];
      } else {
        error = 'Fehler beim Laden der Projekte';
      }
    } catch (err) {
      error = 'Netzwerkfehler beim Laden der Projekte';
      console.error('Error loading projects:', err);
    } finally {
      loading = false;
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

  function redirectToHome() {
    goto('/');
  }
</script>

<svelte:head>
  <title>raspb Webservices - Mein Dashboard</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="content-area">
  {#if hasAdminAccess}
    <!-- Dashboard-Inhalt für Admin-Nutzer -->
    <Section>
      <h1>Mein Dashboard</h1>
      <p class="teaser no-padding">Hier sind alle Projekte aufgelistet</p>
      
      <!-- Projekt-Liste -->
      <div class="mt-8">
        {#if loading}
          <div class="flex flex-col items-center justify-center py-12">
            <span class="loading loading-spinner loading-lg text-primary"></span>
            <p class="mt-4 text-base-content/70">Projekte werden geladen...</p>
          </div>
        {:else if error}
          <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <div>
              <button class="btn btn-sm btn-outline" onclick={loadProjects}>
                Erneut versuchen
              </button>
            </div>
          </div>
        {:else if projects.length === 0}
          <div class="hero min-h-[300px]">
            <div class="hero-content text-center">
              <div class="max-w-md">
                <h2 class="text-2xl font-bold">Noch keine Projekte</h2>
                <p class="py-6">Es wurden noch keine Projekte erstellt.</p>
              </div>
            </div>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {#each projects as project}
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1" onclick={() => openProjectModal(project)}>
                <div class="card-body">
                  <div class="flex justify-between items-start mb-4">
                    <h2 class="card-title text-lg">{project.name}</h2>
                    <div class="badge badge-primary badge-sm">{project.projectType || 'Unbekannt'}</div>
                  </div>
                  
                  <p class="text-base-content/70 text-sm line-clamp-3 mb-4">
                    {project.description || 'Keine Beschreibung verfügbar'}
                  </p>
                  
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-base-content/60">Kunde:</span>
                      <span class="font-medium">
                        {project.owner?.givenName || ''} {project.owner?.familyName || 'Unbekannt'}
                      </span>
                    </div>
                    
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
                  
                  <div class="card-actions justify-end mt-4">
                    <div class="text-xs text-base-content/50 italic">Klicken für Details →</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </Section>
  {:else if isAuth && !currentUserRoles.includes('admin')}
    <!-- Fehlermeldung für eingeloggte Nutzer ohne Admin-Rechte -->
    <Section>
      <div class="hero min-h-[500px]">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-4xl font-bold text-error">Zugriff verweigert</h1>
            <p class="py-6 text-lg">
              Sie haben nicht die erforderlichen Berechtigungen, um auf diese Seite zuzugreifen.
              Nur Nutzer mit Administrator-Rechten können das Dashboard verwenden.
            </p>
            <div class="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <div class="font-bold">Angemeldet als: {currentUser['name'] || currentUser['email']}</div>
                <div class="text-xs">Ihre Rollen: {currentUserRoles.join(', ')}</div>
              </div>
            </div>
            <button class="btn btn-primary mt-4" onclick={redirectToHome}>
              Zur Startseite zurückkehren
            </button>
          </div>
        </div>
      </div>
    </Section>
  {:else}
    <!-- Lade-Zustand oder Weiterleitung -->
    <Section>
      <div class="flex flex-col items-center justify-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-4 text-lg text-base-content/70">Überprüfe Berechtigung...</p>
      </div>
    </Section>
  {/if}
</div>

<!-- DaisyUI Modal für Projektdetails -->
<dialog bind:this={modalDialog} class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    {#if selectedProject}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
      </form>
      
      <h3 class="font-bold text-lg mb-4">{selectedProject.name}</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        
        <!-- Kunde & Kontakt -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Kunde & Kontakt</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Name:</span>
                <span class="font-medium">
                  {selectedProject.owner?.givenName || ''} {selectedProject.owner?.familyName || 'Unbekannt'}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Kunde ID:</span>
                <span class="font-medium text-xs">{selectedProject.owner?.id || 'Nicht verfügbar'}</span>
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
        {#if selectedProject.features && selectedProject.features.length > 0}
          <div class="card bg-base-200">
            <div class="card-body">
              <h4 class="card-title text-base">Features</h4>
              <div class="flex flex-wrap gap-2">
                {#each selectedProject.features as feature}
                  <div class="badge badge-success badge-sm">{feature}</div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Design -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Design</h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-base-content/60">Primärfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.primaryColour}
                    <div class="w-4 h-4 rounded border border-base-300" style="background-color: {selectedProject.primaryColour}"></div>
                    <span class="text-xs font-mono">{selectedProject.primaryColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-base-content/60">Sekundärfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.secondaryColour}
                    <div class="w-4 h-4 rounded border border-base-300" style="background-color: {selectedProject.secondaryColour}"></div>
                    <span class="text-xs font-mono">{selectedProject.secondaryColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-base-content/60">Akzentfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject.accentColour}
                    <div class="w-4 h-4 rounded border border-base-300" style="background-color: {selectedProject.accentColour}"></div>
                    <span class="text-xs font-mono">{selectedProject.accentColour}</span>
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
                  <div class="flex justify-between items-center p-2 bg-base-100 rounded">
                    <span class="text-sm truncate">{file.fileName || 'Unbenannte Datei'}</span>
                    {#if file.url}
                      <button onclick={ () => {window.open(file.url,'_blank')}} class="btn btn-xs btn-primary">
                        Öffnen
                      </button>
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
                <span class="text-xs font-mono">{selectedProject.id}</span>
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
    <button>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../app.css';
</style>
