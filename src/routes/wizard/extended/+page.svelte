<script lang="ts">
  import { onMount } from 'svelte';
  import { isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Wizard from '$lib/components/wizard/wizard-extended.svelte';
  import { goto } from '$app/navigation';
  import auth from '$services/auth-service';
  import Loader from '$lib/components/loader.svelte';
  import { m } from '$lib/paraglide/messages';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { localizeHref } from '$lib/paraglide/runtime';

  let isAuth = $derived(isAuthenticated.value);
  let currentUserRoles = $derived(userroles.value);
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

<svelte:head>
  <title>{m.extendedProjectWizard_meta_title()}</title>
  <meta name="description" content={m.extendedProjectWizard_meta_description()} />
</svelte:head>

{#if loading}
  <div class="global-loading">
    <Loader size={'large'}></Loader>
  </div>
{:else if showSection === 'not-authorized'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>{m.extendedProjectWizard_notAuthorized_title()}</h1>
      <p class="teaser">{m.extendedProjectWizard_notAuthorized_teaser()}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}>{m.extendedProjectWizard_notAuthorized_loginButton()}</button
        >
        <button
          class="btn-basic"
          onclick={() => {
            goto(localizeHref('/registration'));
          }}>{m.extendedProjectWizard_notAuthorized_registrationButton()}</button
        >
      </div>
    </div>
  </Section>
{:else if showSection === 'wizard'}
  <Section>
    <div class="prose">
      <h1>
        {m.extendedProjectWizard_wizard_title()} <span class="inner-text-special">{m.extendedProjectWizard_wizard_titleHighlight()}</span>{m.extendedProjectWizard_wizard_titleSuffix()}
      </h1>
      <p class="teaser">
        {m.extendedProjectWizard_wizard_teaser()}
      </p>
      <div class="spacer"></div>
      <div class="wizard-section" id="wizard">
        <Wizard></Wizard>
      </div>
    </div>
  </Section>
{/if}

<style lang="postcss">
  @reference '../../../app.css';
  .inner-content-wrapper {
    @apply m-auto flex max-w-5xl flex-col items-center justify-center text-center;
  }
  .wizard-section {
    @apply mb-16;
  }
</style>
