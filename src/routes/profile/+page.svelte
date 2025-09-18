<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { isAuthenticated, user, userroles } from '$store/sharedStates.svelte';
  import { goto } from '$app/navigation';
  import type { User } from '$interfaces/user.interface';
  import ProfileEditModal from '$lib/components/modals/profile/edit.svelte';
  import auth from '../../authService';

  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get()) as User;
  let currentUserRoles = $derived(userroles.get());
  let editModal: ProfileEditModal;

  let showSection = $state('');
  let loading = $state(false);

  onMount(async () => {
    loading = true;
    checkAccess();
  });

  $effect(() => {
    checkAccess();
  });

  function checkAccess() {
    if (!isAuth) {
      showSection = 'not-authorized';
      loading = false;
      return;
    } else {
      showSection = 'profile';
      loading = false;
      return;
    }
  }

  async function login() {
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);
  }
</script>

<svelte:head>
  <title>{$_('profile.meta.title')}</title>
  <meta name="description" content={$_('profile.meta.description')} />
</svelte:head>

{#if isAuth}
  <Section>
    <div class="prose text-center">
      <h1><span class="inner-text-special">{$_('profile.title')}</span></h1>
    </div>

    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-3 flex flex-col items-center justify-center">
        <div class="avatar">
          <div class="mask mask-squircle w-full">
            <img src={currentUser.picture} alt={currentUser.givenName} />
          </div>
        </div>

        <div class="main-data">
          <h2 class="no-padding">
            {currentUser.givenName}
            {currentUser.familyName}
          </h2>
          <p class="teaser">{currentUser.company}</p>
        </div>
      </div>

      <!-- Right Column: Detailed Information -->
      <div class="col-span-9">
        <div class="card bg-base-100 w-full shadow-xl">
          <div class="card-body p-8">
            <div class="grid grid-cols-12 gap-x-8 gap-y-4">
              <!-- Email first -->
              <div class="col-span-7">
                <p class="tiny-label">{$_('profile.emailLogin')}</p>
                <p class="no-padding"><strong>{currentUser.email}</strong></p>
              </div>
              <div class="col-span-5">
                <p class="tiny-label">{$_('profile.id')}</p>
                <p class="no-padding"><strong>{currentUser.sub}</strong></p>
              </div>
              {#if currentUser.salutation}
                <div class="col-span-3">
                  <p class="tiny-label">{$_('profile.salutation')}</p>
                  <p class="no-padding"><strong>{currentUser.salutation}</strong></p>
                </div>
              {/if}
              {#if currentUser.givenName}
                <div class="col-span-4">
                  <p class="tiny-label">{$_('profile.firstName')}</p>
                  <p class="no-padding"><strong>{currentUser.givenName}</strong></p>
                </div>
              {/if}
              {#if currentUser.familyName}
                <div class="col-span-5">
                  <p class="tiny-label">{$_('profile.lastName')}</p>
                  <p class="no-padding"><strong>{currentUser.familyName}</strong></p>
                </div>
              {/if}
              {#if currentUser.companyAddress}
                <div class="col-span-full">
                  <p class="tiny-label">{$_('profile.address')}</p>
                  <p class="no-padding"><strong>{currentUser.companyAddress}</strong></p>
                </div>
              {/if}
              {#if currentUser.postCode}
                <div class="col-span-3">
                  <p class="tiny-label">{$_('profile.zipCode')}</p>
                  <p class="no-padding"><strong>{currentUser.postCode}</strong></p>
                </div>
              {/if}
              {#if currentUser.city}
                <div class="col-span-9">
                  <p class="tiny-label">{$_('profile.city')}</p>
                  <p class="no-padding"><strong>{currentUser.city}</strong></p>
                </div>
              {/if}
              {#if currentUser.country}
                <div class="col-span-full">
                  <p class="tiny-label">{$_('profile.country')}</p>
                  <p class="no-padding"><strong>{currentUser.country}</strong></p>
                </div>
              {/if}
              {#if currentUser.phone}
                <div class="col-span-6">
                  <p class="tiny-label">{$_('profile.phone')}</p>
                  <p class="no-padding"><strong>{currentUser.phone}</strong></p>
                </div>
              {/if}
              <div class="col-span-6 flex justify-end">
                <button
                  class="btn btn-simple"
                  onclick={() => {
                    editModal.openModal();
                  }}>{$_('profile.editData')}</button
                >
              </div>
            </div>

            <!-- Projects at the bottom -->
            <div class="divider"></div>
            <div class="col-span-full flex items-center justify-between">
              <h3 class="no-padding">{$_('profile.activeProjects')} <span class="inner-text-special">{currentUser.projectIds ? currentUser.projectIds.length : 0}</span></h3>
              <div>
                <button
                  class="btn btn-simple mr-3"
                  onclick={() => {
                    goto('/dashboard');
                  }}>{$_('profile.toProjects')}</button
                >
                <button
                  class="btn btn-simple"
                  onclick={() => {
                    goto('/extended-project-wizard');
                  }}
                >
                  {$_('profile.startNewProject')}</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
{:else if showSection === 'not-authorized'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1> {$_('profile.notAuthorized.title')}</h1>
      <p class="teaser">{$_('profile.notAuthorized.teaser')}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}> {$_('profile.notAuthorized.loginButton')}</button
        >
        <button
          class="btn-basic"
          onclick={() => {
            goto('/registration');
          }}> {$_('profile.notAuthorized.registrationButton')}</button
        >
      </div>
    </div>
  </Section>
{/if}

<ProfileEditModal bind:this={editModal} />

<style lang="postcss">
  @reference '../../app.css';
  .inner-content-wrapper {
    @apply m-auto flex max-w-4xl flex-col items-center justify-center text-center;
  }
  .main-data {
    @apply px-4 py-6;
  }
</style>
