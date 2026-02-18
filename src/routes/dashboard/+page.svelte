<script lang="ts">
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
  import NewProjectCard from '$lib/components/projects/NewProjectCard.svelte';
  import ProjectDetailDrawer from '$lib/components/projects/ProjectDetailDrawer.svelte';
  import ProjectEditModal from '$lib/components/modals/dashboard/project-edit-modal.svelte';
  import type { Project } from '$interfaces/project.interface';
  import type { User } from '$interfaces/user.interface';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import auth from '$services/auth-service';
  import { authFetch } from '$lib/helper/auth-fetch';
  import LottieLoader from '$lib/components/lottie-loader.svelte';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { ToArray, getStatusLabel, getProjectTypeLabel } from '$lib/helper/projectUtils';
  import { projectStatus } from '$interfaces/project.interface';
  import { projectTypesWebApp, projectTypesAiFreestyle } from '$lib/configs/wizard-config';

  let isAuth = $derived(isAuthenticated.value);
  let currentUser = $derived(user.value) as User;
  let currentUserRoles = $derived(userroles.value);
  let hasCustomerAccess = $derived(isAuth && currentUserRoles.includes('customer'));
  let hasAdminAccess = $derived(isAuth && currentUserRoles.includes('admin'));

  let projectEditModal: ProjectEditModal;
  let showSection = $state('');

  let projects: Project[] = $state([]);
  let selectedProject: Project | null = $state(null);
  let drawerOpen = $state(false);

  let loading = $state(false);
  let error = $state('');

  // Stats
  let totalProjects = $derived(projects.length);
  let statusArray = $derived(ToArray(projectStatus));
  let inProgressCount = $derived(projects.filter((p) => p.projectStatus === statusArray[0]).length);
  let submittedCount = $derived(projects.filter((p) => {
    const idx = statusArray.indexOf(p.projectStatus || '');
    return idx >= 1 && idx < 5;
  }).length);
  let completedCount = $derived(projects.filter((p) => {
    const idx = statusArray.indexOf(p.projectStatus || '');
    return idx >= 5;
  }).length);

  // Greeting name
  let userName = $derived(
    (currentUser as User)?.givenName || (currentUser as User)?.familyName || ''
  );

  // Admin filter state
  let filtersOpen = $state(false);
  let searchQuery = $state('');
  let filterType = $state('');
  let filterStatus = $state('');

  // All available project types for the dropdown
  const allProjectTypes = [...projectTypesWebApp, ...projectTypesAiFreestyle];

  // Derived filtered project list (only for admin)
  let filteredProjects = $derived(
    hasAdminAccess
      ? projects.filter((p) => {
          const q = searchQuery.trim().toLowerCase();
          const matchesSearch =
            !q ||
            (p.name?.toLowerCase().includes(q)) ||
            ([p.owner?.givenName, p.owner?.familyName, p.owner?.company]
              .filter(Boolean)
              .join(' ')
              .toLowerCase()
              .includes(q));
          const matchesType = !filterType || p.projectType === filterType;
          const matchesStatus = !filterStatus || p.projectStatus === filterStatus;
          return matchesSearch && matchesType && matchesStatus;
        })
      : projects
  );

  let activeFilterCount = $derived(
    [searchQuery.trim(), filterType, filterStatus].filter(Boolean).length
  );

  function clearFilters() {
    searchQuery = '';
    filterType = '';
    filterStatus = '';
  }

  $effect(() => {
    if (!isAuth) {
      showSection = 'not-authorized';
      loading = false;
      return;
    }
    showSection = 'projects';
    if (hasCustomerAccess || hasAdminAccess) {
      loadProjects();
    }
  });

  async function loadProjects() {
    loading = true;
    error = '';

    if (hasAdminAccess) {
      try {
        const response = await authFetch('/api/project/get');
        const data = await response.json();

        if (response.ok) {
          projects = data.projects || [];
        } else {
          error = m.dashboard_errorLoadingProjects();
        }
        if (projects.length === 0) showSection = 'no-projects';
      } catch (err) {
        error = m.dashboard_networkErrorLoadingProjects();
        console.error('Error loading projects:', err);
      } finally {
        loading = false;
      }
    } else {
      if (!currentUser?.projectIds || currentUser.projectIds.length === 0) {
        showSection = 'no-projects';
        loading = false;
        return;
      }
      try {
        const response = await authFetch('/api/project/get/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: currentUser.projectIds })
        });
        const data = await response.json();

        if (response.ok) {
          projects = data.projects || [];
        } else {
          error = m.dashboard_errorLoadingProjects();
        }
        if (projects.length === 0) showSection = 'no-projects';
      } catch (err) {
        error = m.dashboard_networkErrorLoadingProjects();
        console.error('Error loading projects:', err);
      } finally {
        loading = false;
      }
    }
  }

  function openProjectModal(project: Project) {
    selectedProject = project;
    if (hasAdminAccess) {
      projectEditModal.openModal();
    } else {
      drawerOpen = true;
    }
  }

  function closeDrawer() {
    drawerOpen = false;
  }

  function handleProjectUpdated(updatedProject: Project) {
    projects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
  }

  async function login() {
    const popup = openAuth0Popup(450, 650);
    try {
      if (!popup) throw new Error('Popup konnte nicht geöffnet werden (Popup-Blocker?).');
      const auth0Client = await auth.getClient();
      await auth.loginWithPopup(auth0Client, { authorizationParams: {} }, popup);
    } catch (e) {
      console.error('Error occurred: ', e);
    }
  }
</script>

{#if loading}
  <div class="global-loading">
    <LottieLoader />
  </div>
{:else if showSection === 'not-authorized'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>{m.dashboard_notAuthorized_title()}</h1>
      <p class="teaser">{m.dashboard_notAuthorized_teaser()}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button class="btn-basic" onclick={() => login()}>
          {m.dashboard_notAuthorized_loginButton()}
        </button>
        <button class="btn-basic" onclick={() => goto(localizeHref('/registration'))}>
          {m.dashboard_notAuthorized_registrationButton()}
        </button>
      </div>
    </div>
  </Section>
{:else if showSection === 'no-projects'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>{m.dashboard_noProjects_title()}</h1>
      <p class="teaser">{m.dashboard_noProjects_teaser()}</p>
      <div class="spacer"></div>
      <div class="flex">
        <button class="btn-basic" onclick={() => goto(localizeHref('/wizard/extended'))}>
          {m.dashboard_noProjects_startButton()}
        </button>
      </div>
    </div>
  </Section>
{:else if error}
  <div class="inner-content-wrapper p-16">
    <div class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error}</span>
      <div>
        <button class="btn btn-sm btn-outline" onclick={loadProjects}>{m.dashboard_retryButton()}</button>
      </div>
    </div>
  </div>
{:else}
  <section class="dashboard-section">
    <div class="dashboard-container">
      <!-- Dashboard Header -->
      <div class="dashboard-header animate-fade-in-up">
        <div class="header-text">
          {#if userName}
            <h1>{m.dashboard_greeting({ name: userName })}</h1>
          {:else}
            <h1>{m.dashboard_myDashboardTitle()}</h1>
          {/if}
          <p class="teaser no-padding">
            {#if hasAdminAccess}
              {m.dashboard_adminDashboardTeaser()}
            {:else}
              {m.dashboard_myDashboardTeaser()}
            {/if}
          </p>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon total">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-number">{totalProjects}</span>
              <span class="stat-label">{m.dashboard_stats_total()}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon progress">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-number">{inProgressCount}</span>
              <span class="stat-label">{m.dashboard_stats_inProgress()}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon submitted">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-number">{submittedCount}</span>
              <span class="stat-label">{m.dashboard_stats_submitted()}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon completed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-number">{completedCount}</span>
              <span class="stat-label">{m.dashboard_stats_completed()}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Filter Bar -->
      {#if hasAdminAccess}
        <div class="filter-bar animate-fade-in-up mb-8">
          <div class="filter-bar-header">
            <button
              class="filter-toggle"
              class:filter-toggle--active={filtersOpen}
              onclick={() => (filtersOpen = !filtersOpen)}
              aria-expanded={filtersOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              {m.dashboard_admin_filter_toggle()}
              {#if activeFilterCount > 0}
                <span class="filter-badge">{activeFilterCount}</span>
              {/if}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="filter-chevron h-4 w-4 transition-transform duration-200"
                class:rotate-180={filtersOpen}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {#if activeFilterCount > 0}
              <div class="filter-meta">
                <span class="filter-results">
                  {m.dashboard_admin_filter_results({ count: filteredProjects.length, total: projects.length })}
                </span>
                <button class="filter-clear-btn" onclick={clearFilters}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {m.dashboard_admin_filter_clear()}
                </button>
              </div>
            {/if}
          </div>

          {#if filtersOpen}
            <div class="filter-fields">
              <!-- Search -->
              <div class="filter-field filter-field--wide">
                <div class="filter-input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" class="filter-input-icon h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    class="filter-input"
                    placeholder={m.dashboard_admin_filter_search_placeholder()}
                    bind:value={searchQuery}
                  />
                  {#if searchQuery}
                    <button class="filter-input-clear" onclick={() => (searchQuery = '')} aria-label="Suche löschen">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  {/if}
                </div>
              </div>

              <!-- Project Type -->
              <div class="filter-field">
                <select class="filter-select" bind:value={filterType}>
                  <option value="">{m.dashboard_admin_filter_type_all()}</option>
                  {#each allProjectTypes as type}
                    <option value={type.id}>{getProjectTypeLabel(type.id)}</option>
                  {/each}
                </select>
              </div>

              <!-- Status -->
              <div class="filter-field">
                <select class="filter-select" bind:value={filterStatus}>
                  <option value="">{m.dashboard_admin_filter_status_all()}</option>
                  {#each statusArray as s}
                    <option value={s}>{getStatusLabel(s)}</option>
                  {/each}
                </select>
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Project Grid -->
      <div class="project-grid">
        {#each filteredProjects as project, i}
          <div class="animate-fade-in-up flex" style="animation-delay: {i * 80}ms">
            <ProjectCard {project} {openProjectModal} />
          </div>
        {/each}
        {#if filteredProjects.length === 0 && activeFilterCount > 0}
          <div class="col-span-full filter-no-results">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Keine Projekte gefunden. <button class="link" onclick={clearFilters}>Filter zurücksetzen</button></p>
          </div>
        {/if}
        {#if !hasAdminAccess}
          <div class="animate-fade-in-up flex" style="animation-delay: {filteredProjects.length * 80}ms">
            <NewProjectCard />
          </div>
        {/if}
      </div>
    </div>
  </section>
{/if}

<!-- Drawer for Customer Detail/Edit -->
{#if drawerOpen}
  <ProjectDetailDrawer
    bind:project={selectedProject}
    onClose={closeDrawer}
    onProjectUpdated={handleProjectUpdated}
  />
{/if}

<!-- Admin Edit Modal (kept for admin users) -->
<ProjectEditModal bind:this={projectEditModal} {selectedProject}></ProjectEditModal>

<style lang="postcss">
  @reference '../../app.css';

  .inner-content-wrapper {
    @apply m-auto flex max-w-4xl flex-col items-center justify-center text-center;
  }

  .dashboard-section {
    @apply bg-base-50 w-full py-12 md:py-20;
  }

  .dashboard-container {
    @apply m-auto h-full w-full max-w-7xl px-4;
  }

  .dashboard-header {
    @apply mb-12;
  }

  .header-text {
    @apply mb-8;

    h1 {
      @apply mb-2;
    }
  }

  .stats-row {
    @apply grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4;
  }

  .stat-card {
    @apply bg-base-100 flex items-center gap-4 rounded-xl p-4 shadow-sm transition-all duration-300;

    &:hover {
      @apply shadow-md;
    }
  }

  .stat-icon {
    @apply flex h-10 w-10 items-center justify-center rounded-lg;

    &.total {
      background: linear-gradient(135deg, oklch(0.6056 0.2189 292.72 / 0.15), oklch(0.6668 0.2591 322.15 / 0.15));
      color: oklch(0.6668 0.2591 322.15);
    }

    &.progress {
      background: linear-gradient(135deg, oklch(0.6559 0.2118 354.31 / 0.15), oklch(0.6056 0.2189 292.72 / 0.15));
      color: oklch(0.6559 0.2118 354.31);
    }

    &.submitted {
      @apply bg-info/15 text-info;
    }

    &.completed {
      @apply bg-success/15 text-success;
    }
  }

  .stat-info {
    @apply flex flex-col;
  }

  .stat-number {
    @apply text-base-content text-2xl font-bold leading-none;
  }

  .stat-label {
    @apply text-base-content/50 mt-0.5 text-xs;
  }

  .project-grid {
    @apply grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8;
  }

  /* ── Admin Filter Bar ────────────────────────────────── */
  .filter-bar {
    @apply bg-base-100 border-base-300 rounded-xl border;
  }

  .filter-bar-header {
    @apply flex flex-wrap items-center gap-3 px-4 py-3;
  }

  .filter-toggle {
    @apply text-base-content/70 hover:text-base-content flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150;
    @apply hover:bg-base-200;

    &.filter-toggle--active {
      @apply bg-base-200 text-base-content;
    }
  }

  .filter-badge {
    @apply bg-primary text-primary-content flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold;
  }

  .filter-chevron {
    @apply text-base-content/40;
  }

  .filter-meta {
    @apply ml-auto flex items-center gap-3;
  }

  .filter-results {
    @apply text-base-content/50 text-sm;
  }

  .filter-clear-btn {
    @apply text-error/80 hover:text-error flex cursor-pointer items-center gap-1 text-sm transition-colors;
  }

  .filter-fields {
    @apply border-base-300 grid grid-cols-1 gap-3 border-t px-4 py-4 md:grid-cols-[1fr_auto_auto];
  }

  .filter-field {
    @apply flex items-center;

    &.filter-field--wide {
      @apply flex-1;
    }
  }

  .filter-input-wrapper {
    @apply border-base-300 bg-base-50 focus-within:border-primary relative flex w-full items-center rounded-lg border transition-colors;
  }

  .filter-input-icon {
    @apply text-base-content/40 pointer-events-none absolute left-3;
  }

  .filter-input {
    @apply bg-transparent w-full py-2 pr-8 pl-9 text-sm outline-none;
    &::placeholder {
      @apply text-base-content/30;
    }
  }

  .filter-input-clear {
    @apply text-base-content/40 hover:text-base-content absolute right-2.5 cursor-pointer transition-colors;
  }

  .filter-select {
    @apply border-base-300 bg-base-50 focus:border-primary min-w-40 cursor-pointer rounded-lg border px-3 py-2 text-sm outline-none transition-colors;
  }

  .filter-no-results {
    @apply text-base-content/50 col-span-full flex flex-col items-center gap-3 py-16 text-center;

    .link {
      @apply text-primary cursor-pointer underline;
    }
  }

</style>
