<script>
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import auth from '../authService';
  import { onMount } from 'svelte';
  import '../app.css';

  let { children } = $props();

  onMount(async () => {
    const auth0Client = await auth.createClient();
    await auth.checkAuthState(auth0Client);
  });
</script>

<div class="wrapper">
  <HEADER />
  <div class="content-container">
    {@render children?.()}
  </div>
  <FOOTER />
  <CookieConsentComponent></CookieConsentComponent>
</div>
