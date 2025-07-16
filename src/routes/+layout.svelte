<script>
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="wrapper">
  <HEADER />
  <div class="content-container">
    {@render children?.()}
  </div>
  <FOOTER />
  <CookieConsentComponent></CookieConsentComponent>
</div>
