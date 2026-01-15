<script lang="ts">
  import '../app.css';
  import { pwaInfo } from 'virtual:pwa-info';
  import { navigating } from '$app/state';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import LottieLoader from '$lib/components/lottie-loader.svelte';
  import CookieConsentComponent from '$lib/components/cookie-consent.svelte';

  let { children } = $props();

  const webManifestLink = pwaInfo?.webManifest.linkTag ?? '';
  $effect(() => {
    if (!pwaInfo) return;
    (async () => {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({
        immediate: true,
        onRegistered(registration) {
          console.log('PWA Service Worker registered', registration);
        },
        onRegisterError(error) {
          console.error('PWA Service Worker registration error', error);
        }
      });
    })();
  });
</script>

<svelte:head>
  {@html webManifestLink}
  <link rel="preload" href="/lotties/loading.lottie" as="fetch" crossorigin="anonymous" />
  <link rel="preload" href="/icons/flags/germany-flag.svg" as="image" type="image/svg+xml" fetchpriority="high" />
  <link rel="preload" href="/icons/flags/uk-flag.svg" as="image" type="image/svg+xml" fetchpriority="high" />
  <link rel="preload" href="/images/home-gradient.svg" as="image" type="image/svg+xml" fetchpriority="high" />
  <link rel="preload" href="/fonts/circular/CircularStd-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/circular/CircularStd-Book.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/circular/CircularStd-Light.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/circular/CircularStd-Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous" />
  <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
  <link rel="shortcut icon" href="/icons/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="raspb" />
</svelte:head>

<div class="wrapper">
  {#if navigating.to}
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
