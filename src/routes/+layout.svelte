<script>
  import { isLoading } from 'svelte-i18n';
  import { navigating } from '$app/state';
  import { onMount } from 'svelte';
  import Loader from '$lib/components/loader.svelte';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import favicon from '$lib/assets/favicon.ico';
  import faviconSvg from '$lib/assets/favicon.svg';
  import appleTouch from '$lib/assets/apple-touch-icon.png';
  import favicon96 from '$lib/assets/favicon-96x96.png';
  import webmanifest from '$lib/assets/site.webmanifest';
  import '../app.css';
  import Chatbot from '$lib/components/chatbot.svelte';

  let { children } = $props();
  let showInitialLoader = $state(true);

  onMount(() => {
    setTimeout(() => {
      showInitialLoader = false;
    }, 333);
  });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={favicon96} sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href={faviconSvg} />
  <link rel="shortcut icon" href={favicon} />
  <link rel="apple-touch-icon" sizes="180x180" href={appleTouch} />
  <meta name="apple-mobile-web-app-title" content="raspb" />
  <link rel="manifest" href={webmanifest} />
</svelte:head>

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
    <Chatbot />
    <FOOTER />
  {/if}
  <CookieConsentComponent></CookieConsentComponent>
</div>
