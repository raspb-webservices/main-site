<script lang="ts">
  import { onMount } from 'svelte';
  import { isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Wizard from '$lib/components/wizard/wizard.svelte';
  import { goto } from '$app/navigation';
  import auth from '../../lib/services/auth-service';
  import Loader from '$lib/components/loader.svelte';
  import { _ } from 'svelte-i18n';

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
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);
  }
</script>

<svelte:head>
  <title>{$_('extendedProjectWizard.meta.title')}</title>
  <meta name="description" content={$_('extendedProjectWizard.meta.description')} />
</svelte:head>

{#if loading}
  <div class="global-loading">
    <Loader size={'large'}></Loader>
  </div>
{:else if showSection === 'not-authorized'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>{$_('extendedProjectWizard.notAuthorized.title')}</h1>
      <p class="teaser">{$_('extendedProjectWizard.notAuthorized.teaser')}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}>{$_('extendedProjectWizard.notAuthorized.loginButton')}</button
        >
        <button
          class="btn-basic"
          onclick={() => {
            goto('/registration');
          }}>{$_('extendedProjectWizard.notAuthorized.registrationButton')}</button
        >
      </div>
    </div>
  </Section>
{:else if showSection === 'wizard'}
  <Section>
    <div class="prose">
      <h1>{$_('extendedProjectWizard.wizard.title')} <span class="inner-text-special">{$_('extendedProjectWizard.wizard.titleHighlight')}</span>{$_('extendedProjectWizard.wizard.titleSuffix')}</h1>
      <p class="teaser">
        {$_('extendedProjectWizard.wizard.teaser')}
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
