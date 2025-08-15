<script>
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import { isLoading } from 'svelte-i18n';
  import Loader from '$lib/components/loader.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="wrapper">
  {#if $isLoading}
  <div class="loading-wrapper">
    <Loader size={'large'}></Loader>
  </div>
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
  .loading-wrapper {
    @apply w-full h-dvh flex justify-center items-center;
  }
</style>