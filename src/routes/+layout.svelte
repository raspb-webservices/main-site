<script lang="ts">
  import '../app.css';
  import { navigating } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { trackPageview } from '$lib/analytics/plausible.client';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import LottieLoader from '$lib/components/lottie-loader.svelte';
  import CookieConsentComponent from '$lib/components/cookie-consent.svelte';
  import 'flag-icons/css/flag-icons.min.css';
  import { m } from '$lib/paraglide/messages';
  import { getLocale } from '$lib/paraglide/runtime';
  import auth from '$services/auth-service';
  import { onMount } from 'svelte';

  let { children } = $props();

  const ogLocaleMap: Record<string, string> = { de: 'de_DE', en: 'en_US' };

  onMount(() => {
    auth.checkSession();
  });

  // Track pageviews manually via Plausible to avoid history.pushState conflicts
  // with SvelteKit's router (replaces autoCapturePageviews: true in plausible.client.ts)
  afterNavigate(() => {
    trackPageview();
  });

  // Reload page when a new service worker version takes over or assets go stale
  $effect(() => {
    if (!('serviceWorker' in navigator)) return;

    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hadController) window.location.reload();
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'STALE_ASSETS') window.location.reload();
    });
  });
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="preload" href="$images/home-gradient.svg" as="image" type="image/svg+xml" fetchpriority="high" />
  <link rel="preload" href="$fonts/circular/CircularStd-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$fonts/circular/CircularStd-Book.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$fonts/circular/CircularStd-Light.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$fonts/circular/CircularStd-Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous" />
  <link rel="icon" type="image/png" href="$icons/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="$icons/favicon.svg" />
  <link rel="shortcut icon" href="$icons/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="$icons/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="raspb" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="raspb" />
  <meta property="og:image" content="https://raspb.de/icons/apple-touch-icon.png" />
  <meta property="og:locale" content={ogLocaleMap[getLocale()] ?? 'de_DE'} />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div class="wrapper">
  {#if navigating.to}
    <div class="global-loading">
      <LottieLoader />
    </div>
  {:else}
    <a href="#main-content" class="skip-nav">{m.layout_skip_to_content()}</a>
    <HEADER />
    <main id="main-content">
      {@render children?.()}
    </main>
    <FOOTER />
  {/if}
  <CookieConsentComponent />
</div>

<style lang="postcss">
  @reference '../app.css';

  .skip-nav {
    @apply absolute top-0 z-100 -left-2500 bg-primary px-4 py-2 font-bold text-white no-underline;

    &:focus {
      @apply left-0;
    }
  }
</style>
