<script>
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import '../app.css';
</script>

<div class="wrapper">
  <HEADER />
  <div class="content-container">
    <slot />
  </div>
  <FOOTER />
  <CookieConsentComponent></CookieConsentComponent>
</div>
