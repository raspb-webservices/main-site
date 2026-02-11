<script lang="ts">
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
  import ProjectListItem from '$lib/components/projects/ProjectListItem.svelte';
  import ProjectDetailsModal from '$lib/components/modals/dashboard/project-details-modal.svelte';
  import ProjectEditModal from '$lib/components/modals/dashboard/project-edit-modal.svelte';
  import type { Project } from '$interfaces/project.interface';
  import type { User } from '$interfaces/user.interface';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import auth from '$services/auth-service';
  import LottieLoader from '$lib/components/lottie-loader.svelte';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { localizeHref } from '$lib/paraglide/runtime';

  let isAuth = $derived(isAuthenticated.value);
  let currentUser = $derived(user.value) as User;
  let currentUserRoles = $derived(userroles.value);
  let hasCustomerAccess = $derived(isAuth && currentUserRoles.includes('customer'));
  let hasAdminAccess = $derived(isAuth && currentUserRoles.includes('admin'));

  let projectDetailsModal: ProjectDetailsModal;
  let projectEditModal: ProjectEditModal;
  let showSection = $state('');

  let projects: Project[] = $state([]);
  let selectedProject: Project | null = $state(null);

  let loading = $state(false);
  let error = $state('');
  let viewMode = $state<'grid' | 'list'>('grid');

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
        const response = await fetch('/api/project/get');
        const data = await response.json();

        if (response.ok) {
          projects = data.projects || [];
        } else {
          error = m['dashboard_errorLoadingProjects']();
        }
        if (projects.length === 0) showSection = 'no-projects';
      } catch (err) {
        error = m['dashboard_networkErrorLoadingProjects']();
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
        const response = await fetch('/api/project/get/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: currentUser.projectIds })
        });
        const data = await response.json();

        if (response.ok) {
          projects = data.projects || [];
        } else {
          error = m['dashboard_errorLoadingProjects']();
        }
        if (projects.length === 0) showSection = 'no-projects';
      } catch (err) {
        error = m['dashboard_networkErrorLoadingProjects']();
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
      projectDetailsModal.openModal();
    }
  }

  async function login() {
    const popup = openAuth0Popup(450, 650);
    try {
      if (!popup) throw new Error('Popup konnte nicht geöffnet werden (Popup-Blocker?).');
      const auth0Client = await auth.createClient();
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
      <h1>{m['dashboard_notAuthorized_title']()}</h1>
      <p class="teaser">{m['dashboard_notAuthorized_teaser']()}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}
        >
          {m['dashboard_notAuthorized_loginButton']()}</button
        >
        <button
          class="btn-basic"
          onclick={() => {
            goto(localizeHref('/registration'));
          }}
        >
          {m['dashboard_notAuthorized_registrationButton']()}</button
        >
      </div>
    </div>
  </Section>
{:else if showSection === 'no-projects'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>{m['dashboard_noProjects_title']()}</h1>
      <p class="teaser">{m['dashboard_noProjects_teaser']()}</p>
      <div class="spacer"></div>
      <div class="flex">
        <button
          class="btn-basic"
          onclick={() => {
            goto(localizeHref('/wizard/extended'));
          }}>{m['dashboard_noProjects_startButton']()}</button
        >
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
        <button class="btn btn-sm btn-outline" onclick={loadProjects}> {m['dashboard_retryButton']()} </button>
      </div>
    </div>
  </div>
{:else}
  <Section>
    <h1>{m['dashboard_myDashboardTitle']()}</h1>
    <p class="teaser no-padding">{m['dashboard_myDashboardTeaser']()}</p>

    <div class="mb-4 flex justify-end">
      <div class="join">
        <button class={'btn btn-sm join-item ' + (viewMode === 'grid' ? 'btn-active' : '')} onclick={() => (viewMode = 'grid')}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          {m['dashboard_viewMode_grid']()}
        </button>
        <button class={'btn btn-sm join-item ' + (viewMode === 'list' ? 'btn-active' : '')} onclick={() => (viewMode = 'list')}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          {m['dashboard_viewMode_list']()}
        </button>
      </div>
    </div>

    {#if viewMode === 'grid'}
      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {#each projects as project}
          <ProjectCard {project} {openProjectModal} />
        {/each}
      </div>
    {:else}
      <div class="mt-6 overflow-x-auto">
        <table class="table-zebra table">
          <thead>
            <tr>
              <th>{m['dashboard_tableHeaders_project']()}</th>
              <th>{m['dashboard_tableHeaders_type']()}</th>
              <th>{m['dashboard_tableHeaders_status']()}</th>
              <th>{m['dashboard_tableHeaders_budget']()}</th>
              <th>{m['dashboard_tableHeaders_created']()}</th>
            </tr>
          </thead>
          <tbody>
            {#each projects as project}
              <ProjectListItem {project} {openProjectModal} />
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </Section>
{/if}

<ProjectDetailsModal bind:this={projectDetailsModal} {selectedProject}></ProjectDetailsModal>
<ProjectEditModal bind:this={projectEditModal} {selectedProject}></ProjectEditModal>

<style lang="postcss">
  @reference '../../app.css';
  .inner-content-wrapper {
    @apply m-auto flex max-w-4xl flex-col items-center justify-center text-center;
  }
</style>
