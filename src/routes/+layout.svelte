<script>
  import { isLoading } from 'svelte-i18n';
  import { navigating } from '$app/state';
  import { onMount } from 'svelte';
  import Loader from '$lib/components/loader.svelte';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import '../app.css';

  let { children } = $props();
  let showInitialLoader = $state(true);

  onMount(() => {
    setTimeout(() => {
      showInitialLoader = false;
    }, 333);
  });
</script>

<div class="wrapper">
  {#if $isLoading || navigating.to || showInitialLoader}
  <div class="global-loading">
    <Loader size={'large'}></Loader>
  </div>
  {:else}
    <HEADER />
    <main>
      {@render children?.()}
    </main>
    <FOOTER />
  {/if}
  <CookieConsentComponent></CookieConsentComponent>
</div>
