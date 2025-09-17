<script lang="ts">
  import { onMount } from 'svelte';
  import { isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Wizard from '$lib/components/wizard/wizard.svelte';
  import { goto } from '$app/navigation';
  import auth from '../../authService';
  import Loader from '$lib/components/loader.svelte';

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
  <title>Extended Wizard</title>
  <meta name="description" content="Extended Wizard" />
</svelte:head>

{#if loading}
  <div class="global-loading">
    <Loader size={'large'}></Loader>
  </div>
{:else if showSection === 'not-authorized'}
  <Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
      <h1>Sie müssen angemeldet sein, um den erweiterten Projektkonfigurator nutzen zu können</h1>
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
{:else if showSection === 'wizard'}
  <Section>
    <div class="prose">
      <h1>Extended <span class="inner-text-special">Projekt</span>-Konfigurator</h1>
      <p class="teaser">
        Die volle Projekt-Konfigurator Erfahrung erhalten Sie hier im extended Wizard. Wenn Sie das möchten, können Sie hier bereits alle Details des anstehenden
        Projekts erfassen. Bestimmen Sie neben Features, Struktur und Design auch die Inhalte für jede Seite oder beschreiben Sonderwünsche. Die hier erfassten
        Projekte können direkt beauftrag werden und Ergbenisse stehen in Rekortzeit zur Verfügung.
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
