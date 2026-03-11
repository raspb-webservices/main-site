<script lang="ts">
  import { navigating } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { trackPageview } from '$lib/analytics/plausible.client';
  import HEADER from '$lib/components/header.svelte';
  import FOOTER from '$lib/components/footer.svelte';
  import LottieLoader from '$lib/components/lottie-loader.svelte';
  import CookieConsentComponent from '$lib/components/cookie-consent.svelte';
  import { m } from '$lib/paraglide/messages';
  import auth from '$services/auth-service';
  import { getLocale } from '$lib/paraglide/runtime';
  import { onMount } from 'svelte';

  let { children } = $props();

  const ogLocaleMap: Record<string, string> = { de: 'de_DE', en: 'en_US' };

  onMount(() => {
    auth.checkSession();
  });

  afterNavigate(() => {
    trackPageview();
  });
</script>

<svelte:head>
  <link rel="preload" href="$images/home-gradient.svg" as="image" type="image/svg+xml" fetchpriority="high" />
  <link rel="preload" href="$fonts/circular/CircularStd-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$fonts/circular/CircularStd-Book.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$fonts/circular/CircularStd-Light.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$fonts/circular/CircularStd-Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="$lotties/robot-supports.lottie" as="fetch" crossorigin="anonymous" />
  <link rel="preload" href="$lotties/business-launch.lottie" as="fetch" crossorigin="anonymous" />
  <meta property="og:locale" content={ogLocaleMap[getLocale()] ?? 'de_DE'} />
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
  @reference '../../app.css';

  .skip-nav {
    @apply absolute top-0 z-100 -left-2500 bg-primary px-4 py-2 font-bold text-white no-underline;

    &:focus {
      @apply left-0;
    }
  }
</style>
