<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import Section from '$lib/components/ui/section.svelte';
  import { goto } from '$app/navigation';
  import auth from '$services/auth-service';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { openAuth0Popup } from '$helper/loginOpener';

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
  <title>{m['login_meta_title']()}</title>
  <meta name="description" content={m['login_meta_description']()} />
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
    <h1>{m['login_title']()}</h1>
    <p class="teaser">{m['login_teaser']()}</p>
    <div class="spacer"></div>
    <div class="flex gap-6">
      <button
        class="btn-basic"
        onclick={() => {
          login();
        }}>{m['login_loginButton']()}</button
      >
      <button
        class="btn-basic"
        onclick={() => {
          goto(localizeHref('/registration'));
        }}>{m['login_registerButton']()}</button
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
