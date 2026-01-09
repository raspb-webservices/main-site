<script lang="ts">
  import { onMount } from 'svelte';
  import { isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Wizard from '$lib/components/wizard/wizard.svelte';
  import { goto } from '$app/navigation';
  import auth from '$services/auth-service';
  import Loader from '$lib/components/loader.svelte';
  import { m } from '$lib/paraglide/messages';
  import { openAuth0Popup } from '$helper/loginOpener';

  let isAuth = $derived(isAuthenticated.get());
  let currentUserRoles = $derived(userroles.get());
  let hasCustomerAccess = $derived(isAuth && currentUserRoles.includes('customer'));
  let hasAdminAccess = $derived(isAuth && currentUserRoles.includes('admin'));

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
      showSection = 'wizard';
      loading = false;
      return;
    }
  }

  async function login() {
    const popup: Window = openAuth0Popup(450, 650);
    try {
      if (!popup) throw new Error('Popup konnte nicht geöffnet werden (Popup-Blocker?).');
      const auth0Client = await auth.createClient();
      await auth.loginWithPopup(auth0Client, { authorizationParams: {} }, popup);
    } catch (e) {
      console.error('Error occurred: ', e);
    }
  }
</script>

<svelte:head>
  <title>{m['extendedProjectWizard.meta.title']()}</title>
  <meta name="description" content={m['extendedProjectWizard.meta.description']()} />
</svelte:head>

{#if loading}
  <div class="global-loading">
    <Loader size={'large'}></Loader>
  </div>
{:else if showSection === 'not-authorized'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>{m['extendedProjectWizard.notAuthorized.title']()}</h1>
      <p class="teaser">{m['extendedProjectWizard.notAuthorized.teaser']()}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}>{m['extendedProjectWizard.notAuthorized.loginButton']()}</button
        >
        <button
          class="btn-basic"
          onclick={() => {
            goto('/registration');
          }}>{m['extendedProjectWizard.notAuthorized.registrationButton']()}</button
        >
      </div>
    </div>
  </Section>
{:else if showSection === 'wizard'}
  <Section>
    <div class="prose">
      <h1>{m['extendedProjectWizard.wizard.title']()} <span class="inner-text-special">{m['extendedProjectWizard.wizard.titleHighlight']()}</span>{m['extendedProjectWizard.wizard.titleSuffix']()}</h1>
      <p class="teaser">
        {m['extendedProjectWizard.wizard.teaser']()}
      </p>
      <div class="spacer"></div>
      <div class="wizard-section" id="wizard">
        <Wizard></Wizard>
      </div>
    </div>
  </Section>
{/if}

<style lang="postcss">
  @reference '../../app.css';
  .inner-content-wrapper {
    @apply m-auto flex max-w-5xl flex-col items-center justify-center text-center;
  }
  .wizard-section {
    @apply mb-16;
  }
</style>
