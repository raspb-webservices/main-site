<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Section from '$lib/components/ui/section.svelte';
  import { goto } from '$app/navigation';
  import auth from '../../authService';

  async function login() {
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);
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
