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
  let hasAdminAccess = $derived(isAuth && currentUserRoles.includes('admin'));

  // Projekt-Daten
  let projects: (Project & { id: string })[] = $state([]);
  let loading = $state(false);
  let error = $state('');
  let selectedProject: (Project & { id: string }) | null = $state(null);
  let modalDialog: HTMLDialogElement;
  let setupModalDialog: HTMLDialogElement;

  // Setup-Bearbeitung
  let editingProject: (Project & { id: string }) | null = $state(null);
  let setupForm = $state({
    github: {
      username: '',
      password: '',
      authTokens: '',
      isConfigured: false
    },
    netlify: {
      username: '',
      password: '',
      authTokens: '',
      isConfigured: false
    },
    hygraph: {
      username: '',
      password: '',
      authTokens: '',
      isConfigured: false
    },
    auth0: {
      username: '',
      password: '',
      authTokens: '',
      isConfigured: false
    }
  });
  let setupSaving = $state(false);
  let setupError = $state('');

  // Prüfe Zugriffsberechtigung beim Laden der Seite
  onMount(async () => {
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

  function redirectToHome() {
    goto('/');
  }

  function editProjectSetup(project: Project & { id: string }) {
    editingProject = project;

    // Formular mit aktuellen Werten vorausfüllen
    setupForm.github.username = project.setup?.github?.username || '';
    setupForm.github.password = project.setup?.github?.password || '';
    setupForm.github.authTokens = project.setup?.github?.authTokens ? JSON.stringify(project.setup.github.authTokens, null, 2) : '';
    setupForm.github.isConfigured = project.setup?.github?.isConfigured || false;

    setupForm.netlify.username = project.setup?.netlify?.username || '';
    setupForm.netlify.password = project.setup?.netlify?.password || '';
    setupForm.netlify.authTokens = project.setup?.netlify?.authTokens ? JSON.stringify(project.setup.netlify.authTokens, null, 2) : '';
    setupForm.netlify.isConfigured = project.setup?.netlify?.isConfigured || false;

    setupForm.hygraph.username = project.setup?.hygraph?.username || '';
    setupForm.hygraph.password = project.setup?.hygraph?.password || '';
    setupForm.hygraph.authTokens = project.setup?.hygraph?.authTokens ? JSON.stringify(project.setup.hygraph.authTokens, null, 2) : '';
    setupForm.hygraph.isConfigured = project.setup?.hygraph?.isConfigured || false;

    setupForm.auth0.username = project.setup?.auth0?.username || '';
    setupForm.auth0.password = project.setup?.auth0?.password || '';
    setupForm.auth0.authTokens = project.setup?.auth0?.authTokens ? JSON.stringify(project.setup.auth0.authTokens, null, 2) : '';
    setupForm.auth0.isConfigured = project.setup?.auth0?.isConfigured || false;

    setupError = '';
    setupModalDialog?.showModal();
  }

  function closeSetupModal() {
    setupModalDialog?.close();
    editingProject = null;
    setupError = '';
  }

  async function saveProjectSetup() {
    if (!editingProject) return;

    setupSaving = true;
    setupError = '';

    try {
      // Auth-Tokens JSON parsen
      const parseAuthTokens = (tokenString: string) => {
        if (!tokenString.trim()) return null;
        try {
          return JSON.parse(tokenString);
        } catch (e) {
          throw new Error('Ungültiges JSON-Format in Auth Tokens');
        }
      };

      const setupData = {
        github: {
          username: setupForm.github.username || null,
          password: setupForm.github.password || null,
          authTokens: parseAuthTokens(setupForm.github.authTokens),
          isConfigured: setupForm.github.isConfigured,
          lastUpdated: new Date().toISOString()
        },
        netlify: {
          username: setupForm.netlify.username || null,
          password: setupForm.netlify.password || null,
          authTokens: parseAuthTokens(setupForm.netlify.authTokens),
          isConfigured: setupForm.netlify.isConfigured,
          lastUpdated: new Date().toISOString()
        },
        hygraph: {
          username: setupForm.hygraph.username || null,
          password: setupForm.hygraph.password || null,
          authTokens: parseAuthTokens(setupForm.hygraph.authTokens),
          isConfigured: setupForm.hygraph.isConfigured,
          lastUpdated: new Date().toISOString()
        },
        auth0: {
          username: setupForm.auth0.username || null,
          password: setupForm.auth0.password || null,
          authTokens: parseAuthTokens(setupForm.auth0.authTokens),
          isConfigured: setupForm.auth0.isConfigured,
          lastUpdated: new Date().toISOString()
        }
      };

      const response = await fetch(`/api/project/patch/${editingProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editingProject.id,
          setup: setupData
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Projekt in der Liste aktualisieren
        const projectIndex = projects.findIndex((p) => p.id === editingProject.id);
        if (projectIndex !== -1) {
          projects[projectIndex] = { ...projects[projectIndex], setup: setupData };
        }

        // Ausgewähltes Projekt aktualisieren falls es das gleiche ist
        if (selectedProject?.id === editingProject.id) {
          selectedProject = { ...selectedProject, setup: setupData };
        }

        closeSetupModal();
      } else {
        setupError = result.error || 'Fehler beim Speichern der Setup-Daten';
      }
    } catch (error) {
      console.error('Error saving setup:', error);
      setupError = error instanceof Error ? error.message : 'Unbekannter Fehler beim Speichern';
    } finally {
      setupSaving = false;
    }
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
                <p class="py-6">Es wurden noch keine Projekte erstellt.</p>
              </div>
            </div>
          </div>
        {:else}
          <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each projects as project}
              <div
                class="card bg-base-100 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
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
                      <span class="text-base-content/60">Kunde:</span>
                      <span class="font-medium">
                        {project.owner?.givenName || ''}
                        {project.owner?.familyName || 'Unbekannt'}
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

                  <div class="card-actions mt-4 justify-end">
                    <div class="text-base-content/50 text-xs italic">Klicken für Details →</div>
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
            <h1 class="text-error text-4xl font-bold">Zugriff verweigert</h1>
            <p class="py-6 text-lg">
              Sie haben nicht die erforderlichen Berechtigungen, um auf diese Seite zuzugreifen. Nur Nutzer mit Administrator-Rechten können das Dashboard
              verwenden.
            </p>
            <div class="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <div class="font-bold">Angemeldet als: {currentUser['name'] || currentUser['email']}</div>
                <div class="text-xs">Ihre Rollen: {currentUserRoles.join(', ')}</div>
              </div>
            </div>
            <button class="btn btn-primary mt-4" onclick={redirectToHome}> Zur Startseite zurückkehren </button>
          </div>
        </div>
      </div>
    </Section>
  {:else}
    <!-- Lade-Zustand oder Weiterleitung -->
    <Section>
      <div class="flex flex-col items-center justify-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="text-base-content/70 mt-4 text-lg">Überprüfe Berechtigung...</p>
      </div>
    </Section>
  {/if}
</div>

<!-- DaisyUI Modal für Projektdetails -->
<dialog bind:this={modalDialog} class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    {#if selectedProject}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4">✕</button>
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

        <!-- Kunde & Kontakt -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Kunde & Kontakt</h4>
            <div class="space-y-3">
              {#if selectedProject.owner?.salutation}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Anrede:</span>
                  <span class="font-medium">{selectedProject.owner.salutation}</span>
                </div>
              {/if}
              <div class="flex justify-between">
                <span class="text-base-content/60">Name:</span>
                <span class="font-medium">
                  {selectedProject.owner?.givenName || ''}
                  {selectedProject.owner?.familyName || 'Unbekannt'}
                </span>
              </div>
              {#if selectedProject.owner?.email}
                <div class="flex justify-between">
                  <span class="text-base-content/60">E-Mail:</span>
                  <a href="mailto:{selectedProject.owner.email}" class="text-primary font-medium hover:underline">
                    {selectedProject.owner.email}
                  </a>
                </div>
              {/if}
              {#if selectedProject.owner?.phone}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Telefon:</span>
                  <a href="tel:{selectedProject.owner.phone}" class="text-primary font-medium hover:underline">
                    {selectedProject.owner.phone}
                  </a>
                </div>
              {/if}
              {#if selectedProject.owner?.company}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Unternehmen:</span>
                  <span class="font-medium">{selectedProject.owner.company}</span>
                </div>
              {/if}
              {#if selectedProject.owner?.address || selectedProject.owner?.postCode || selectedProject.owner?.city}
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60">Adresse:</span>
                  <div class="text-sm">
                    {#if selectedProject.owner?.address}
                      <div>{selectedProject.owner.address}</div>
                    {/if}
                    {#if selectedProject.owner?.postCode || selectedProject.owner?.city}
                      <div>
                        {selectedProject.owner?.postCode || ''}
                        {selectedProject.owner?.city || ''}
                      </div>
                    {/if}
                    {#if selectedProject.owner?.country}
                      <div>{selectedProject.owner.country}</div>
                    {/if}
                  </div>
                </div>
              {/if}
              <div class="divider my-2"></div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Kunde ID:</span>
                <span class="font-mono text-xs font-medium">{selectedProject.owner?.id || 'Nicht verfügbar'}</span>
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
                      <button onclick={() => window.open(file.url, '_blank')} class="btn btn-xs btn-primary"> Öffnen </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}

        <!-- Service Setup -->
        <div class="card bg-base-200 lg:col-span-2">
          <div class="card-body">
            <h4 class="card-title text-base">Service Setup</h4>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <!-- GitHub Setup -->
              <div class="bg-base-100 rounded-lg p-4">
                <div class="mb-3 flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  <span class="font-semibold">GitHub</span>
                  {#if selectedProject.setup?.github?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject.setup?.github?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject.setup?.github?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject.setup?.github?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              </div>

              <!-- Netlify Setup -->
              <div class="bg-base-100 rounded-lg p-4">
                <div class="mb-3 flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001.017.001z"
                    />
                  </svg>
                  <span class="font-semibold">Netlify</span>
                  {#if selectedProject.setup?.netlify?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject.setup?.netlify?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject.setup?.netlify?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject.setup?.netlify?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              </div>

              <!-- Hygraph Setup -->
              <div class="bg-base-100 rounded-lg p-4">
                <div class="mb-3 flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.073 18.564L5.5 15.846V8.154l5.427 2.718v7.692zm2.146 0V10.872L18.5 8.154v7.692l-5.427 2.718zM12 9.282L6.573 6.564 12 3.846l5.427 2.718L12 9.282z"
                    />
                  </svg>
                  <span class="font-semibold">Hygraph</span>
                  {#if selectedProject.setup?.hygraph?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject.setup?.hygraph?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject.setup?.hygraph?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject.setup?.hygraph?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              </div>

              <!-- Auth0 Setup -->
              <div class="bg-base-100 rounded-lg p-4">
                <div class="mb-3 flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.537c3.785-2.809 5.167-7.703 3.815-12.015z"
                    />
                  </svg>
                  <span class="font-semibold">Auth0</span>
                  {#if selectedProject.setup?.auth0?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject.setup?.auth0?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject.setup?.auth0?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject.setup?.auth0?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <button class="btn btn-primary btn-sm" onclick={() => editProjectSetup(selectedProject)}> Setup bearbeiten </button>
            </div>
          </div>
        </div>

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
              {#if selectedProject.setup?.github?.lastUpdated || selectedProject.setup?.netlify?.lastUpdated || selectedProject.setup?.hygraph?.lastUpdated || selectedProject.setup?.auth0?.lastUpdated}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Setup zuletzt aktualisiert:</span>
                  <span class="text-xs font-medium">
                    {formatDate(
                      selectedProject.setup?.github?.lastUpdated ||
                        selectedProject.setup?.netlify?.lastUpdated ||
                        selectedProject.setup?.hygraph?.lastUpdated ||
                        selectedProject.setup?.auth0?.lastUpdated ||
                        ''
                    )}
                  </span>
                </div>
              {/if}
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

<!-- Setup-Bearbeitungsmodal -->
<dialog bind:this={setupModalDialog} class="modal">
  <div class="modal-box w-11/12 max-w-4xl">
    {#if editingProject}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4">✕</button>
      </form>

      <h3 class="mb-4 text-lg font-bold">Service Setup bearbeiten - {editingProject.name}</h3>

      {#if setupError}
        <div class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{setupError}</span>
        </div>
      {/if}

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- GitHub Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <h4 class="card-title text-base">GitHub</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.github.username} placeholder="GitHub Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.github.password} placeholder="GitHub Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.github.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.github.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Netlify Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001.017.001z"
                />
              </svg>
              <h4 class="card-title text-base">Netlify</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.netlify.username} placeholder="Netlify Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.netlify.password} placeholder="Netlify Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.netlify.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.netlify.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Hygraph Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.073 18.564L5.5 15.846V8.154l5.427 2.718v7.692zm2.146 0V10.872L18.5 8.154v7.692l-5.427 2.718zM12 9.282L6.573 6.564 12 3.846l5.427 2.718L12 9.282z"
                />
              </svg>
              <h4 class="card-title text-base">Hygraph</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.hygraph.username} placeholder="Hygraph Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.hygraph.password} placeholder="Hygraph Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.hygraph.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.hygraph.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Auth0 Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.537c3.785-2.809 5.167-7.703 3.815-12.015z"
                />
              </svg>
              <h4 class="card-title text-base">Auth0</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.auth0.username} placeholder="Auth0 Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.auth0.password} placeholder="Auth0 Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.auth0.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.auth0.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button type="button" class="btn btn-ghost" onclick={closeSetupModal}> Abbrechen </button>
        <button type="button" class="btn btn-primary" onclick={saveProjectSetup} disabled={setupSaving}>
          {#if setupSaving}
            <span class="loading loading-spinner loading-sm"></span>
            Speichern...
          {:else}
            Speichern
          {/if}
        </button>
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
