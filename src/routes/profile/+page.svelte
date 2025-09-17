<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { isAuthenticated, user, userroles } from '$store/sharedStates.svelte';
  import { goto } from '$app/navigation';
  import type { User } from '$interfaces/user.interface';
  import ProfileEditModal from '$lib/components/modals/profile/edit.svelte';
  import auth from '../../authService';
  import Loader from '$lib/components/loader.svelte';

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
  <title>raspb Webservices - Mein Profil</title>
  <meta name="description" content="Profilseite für eingeloggte Nutzer" />
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
                <p class="tiny-label">E-Mail / Login</p>
                <p class="no-padding"><strong>{currentUser.email}</strong></p>
              </div>
              <div class="col-span-5">
                <p class="tiny-label">ID</p>
                <p class="no-padding"><strong>{currentUser.sub}</strong></p>
              </div>
              {#if currentUser.salutation}
                <div class="col-span-3">
                  <p class="tiny-label">Anrede</p>
                  <p class="no-padding"><strong>{currentUser.salutation}</strong></p>
                </div>
              {/if}
              {#if currentUser.givenName}
                <div class="col-span-4">
                  <p class="tiny-label">Vorname</p>
                  <p class="no-padding"><strong>{currentUser.givenName}</strong></p>
                </div>
              {/if}
              {#if currentUser.familyName}
                <div class="col-span-5">
                  <p class="tiny-label">Nachname</p>
                  <p class="no-padding"><strong>{currentUser.familyName}</strong></p>
                </div>
              {/if}
              {#if currentUser.companyAddress}
                <div class="col-span-full">
                  <p class="tiny-label">Anschrift</p>
                  <p class="no-padding"><strong>{currentUser.companyAddress}</strong></p>
                </div>
              {/if}
              {#if currentUser.postCode}
                <div class="col-span-3">
                  <p class="tiny-label">PLZ</p>
                  <p class="no-padding"><strong>{currentUser.postCode}</strong></p>
                </div>
              {/if}
              {#if currentUser.city}
                <div class="col-span-9">
                  <p class="tiny-label">Ort</p>
                  <p class="no-padding"><strong>{currentUser.city}</strong></p>
                </div>
              {/if}
              {#if currentUser.country}
                <div class="col-span-full">
                  <p class="tiny-label">Land</p>
                  <p class="no-padding"><strong>{currentUser.country}</strong></p>
                </div>
              {/if}
              {#if currentUser.phone}
                <div class="col-span-6">
                  <p class="tiny-label">Telefon</p>
                  <p class="no-padding"><strong>{currentUser.phone}</strong></p>
                </div>
              {/if}
              <div class="col-span-6 flex justify-end">
                <button
                  class="btn btn-simple"
                  onclick={() => {
                    editModal.openModal();
                  }}>Daten editieren</button
                >
              </div>
            </div>

            <!-- Projects at the bottom -->
            <div class="divider"></div>
            <div class="col-span-full flex items-center justify-between">
              <h3 class="no-padding">Aktive Projekte: <span class="inner-text-special">{currentUser.projectIds ? currentUser.projectIds.length : 0}</span></h3>
              <div>
                <button
                  class="btn btn-simple mr-3"
                  onclick={() => {
                    goto('/dashboard');
                  }}>Zu den Projekten</button
                >
                <button
                  class="btn btn-simple"
                  onclick={() => {
                    goto('/extended-project-wizard');
                  }}
                >
                  Neues Projekt starten</button
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
      <h1>Sie müssen angemeldet sein, um Ihr Profil einsehen zu können</h1>
      <p class="teaser">Sie haben noch keinen Account? Hier können Sie sich registrieren...</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}>Anmelden</button
        >
        <button
          class="btn-basic"
          onclick={() => {
            goto('/registration');
          }}>Registrierung</button
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
