<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Section from '$lib/components/ui/section.svelte';
  import { goto } from '$app/navigation';
  import auth from '$services/auth-service';

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


  function openAuth0Popup(arg0: number, arg1: number): Window {
    throw new Error('Function not implemented.');
  }
</script>

<svelte:head>
  <title>{$_('login.meta.title')}</title>
  <meta name="description" content={$_('login.meta.description')}/>
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
      <h1>{$_('login.title')}</h1>
      <p class="teaser">{$_('login.teaser')}</p>
      <div class="spacer"></div>
      <div class="flex gap-6">
        <button
          class="btn-basic"
          onclick={() => {
            login();
          }}>{$_('login.loginButton')}</button
        >
                <button
          class="btn-basic"
          onclick={() => {
            goto('/registration');
          }}>{$_('login.registerButton')}</button
        >
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
    .inner-content-wrapper {
    @apply m-auto flex max-w-4xl flex-col items-center justify-center text-center;
  }
</style>
