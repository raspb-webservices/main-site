<script>
  import { createAuth0Client } from '@auth0/auth0-spa-js';
  import { user, isAuthenticated, popupOpen } from '$store/sharedStates.svelte';
  import auth from '../authService';
  import { Auth0Client } from '@auth0/auth0-spa-js';
  import { onMount } from 'svelte';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import '../app.css';

  let { children } = $props();

  async function login() {
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);
    const claims = await auth.getIdTokenClaims(auth0Client);
  }

  async function logout() {
    const auth0Client = await auth.createClient();
    await auth.logout(auth0Client);
    console.log('USER: ', user.get());
  }
</script>

<div class="wrapper">
  <HEADER />
  <div class="content-container">
    {@render children?.()}
  </div>
  <FOOTER />
  <CookieConsentComponent></CookieConsentComponent>
</div>
