<script lang="ts">
  import { isLoading } from 'svelte-i18n';
  import { page, navigating } from '$app/state';
  import { onMount } from 'svelte';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import CookieConsentComponent from '$lib/components/cookieconsent.svelte';
  import '../app.css';
  import LottieLoader from '$lib/components/lottie-loader.svelte';

  let { children } = $props();
  let showInitialLoader = $state(false);

  onMount(() => {
    setTimeout(() => {
      showInitialLoader = false;
    }, 750);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
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
  <link rel="preload" href="/lotties/loading.lottie" as="fetch" crossorigin="anonymous" />
  <link rel="preload" href="/icons/flags/germany-flag.svg" as="image" type="image/svg+xml" />
  <link rel="preload" href="/icons/flags/uk-flag.svg" as="image" type="image/svg+xml" />
  <link rel="preload" href="/images/home-gradient.svg" as="image" type="image/svg+xml" />
  <link rel="preload" href="/fonts/circular/CircularStd-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/circular/CircularStd-Book.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/circular/CircularStd-Light.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/circular/CircularStd-Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous">
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

  {/if}

  <CookieConsentComponent />
</div>
