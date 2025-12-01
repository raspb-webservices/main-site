<script>
  import { isLoading } from 'svelte-i18n';
  import { navigating } from '$app/state';
  import { onMount } from 'svelte';
  import Loader from '$lib/components/loader.svelte';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import '../app.css';
  import Chatbot from '$lib/components/chatbot.svelte';
  import LottieLoader from '$lib/components/lottie-loader.svelte';

  let { children } = $props();
  let showInitialLoader = $state(true);

  onMount(() => {
    setTimeout(() => {
      showInitialLoader = false;
    }, 750);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  });
</script>

<svelte:head>
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#f33199" />
  <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
  <link rel="shortcut icon" href="/icons/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="raspb" />
</svelte:head>

<div class="wrapper">
  {#if $isLoading || navigating.to || showInitialLoader}
    <div class="global-loading">
      <LottieLoader />
    </div>
  {:else}
    <HEADER />
    <main>
      {@render children?.()}
    </main>
    <FOOTER />
    <elevenlabs-convai agent-id="agent_6201k7sa8fxafb7r2g21x6c1xnr1"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
  {/if}
  <CookieConsentComponent></CookieConsentComponent>
</div>
