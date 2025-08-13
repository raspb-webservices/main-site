<script>
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import { isLoading } from 'svelte-i18n';
  import '../app.css';

  let { children } = $props();
</script>

<div class="wrapper">
  {#if $isLoading}
    <div class="loading-spinner"></div>
  {:else}
    <HEADER />
    <div class="content-container">
      {@render children?.()}
    </div>
    <FOOTER />
  {/if}
  <CookieConsentComponent></CookieConsentComponent>
</div>

<style lang="postcss">
  @reference '../app.css';

  .loading-spinner {
    @apply border-primary/20 border-t-primary mx-auto h-16 w-16 rounded-full border-4;
    animation: spin 1s linear infinite;
  }
</style>