<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
  import { isAuthenticated, user } from '$store/sharedStates.svelte';
  import { goto } from '$app/navigation';
  import type { User } from '$interfaces/user.interface';
  import ProfileEditModal from '$lib/components/modals/profile/edit.svelte';
  
  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get()) as User;
  let editModal: ProfileEditModal;

</script>

<svelte:head>
  <title>raspb Webservices - Mein Profil</title>
  <meta name="description" content="Profilseite für eingeloggte Nutzer" />
</svelte:head>

<Section>
  <div class="text-center prose">
    <h1><span class="inner-text-special">{$_('profile.title')}</span></h1>
    <!-- <p>{JSON.stringify(currentUser)}</p> -->
  </div>

  {#if isAuth}
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
                <button class="btn btn-simple" onclick={() => {editModal.openModal()}}>Daten editieren</button>
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
                    goto('/customer-dashboard');
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
  {:else}
    <div class="alert alert-warning shadow-lg">
      <div class="flex items-center justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path></svg
        >
        <p class="no-padding pl-4">Sie müssen angemeldet sein, um Ihr Profil einsehen zu können.</p>
      </div>
    </div>
  {/if}
</Section>
<ProfileEditModal bind:this={editModal} />

<style lang="postcss">
  @reference '../../app.css';
  .main-data {
    @apply px-4 py-6;
  }
</style>
