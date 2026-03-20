<script lang="ts">
  import { trackPageview } from '$lib/analytics/plausible.client';
  import CookieConsentComponent from '$lib/components/cookie-consent.svelte';
  import { afterNavigate } from '$app/navigation';
  import { getLocale } from '$lib/paraglide/runtime';

  let { children } = $props();

  afterNavigate(() => {
    trackPageview();
  });

  const lang = getLocale();
</script>

<svelte:head>
  <meta property="og:locale" content={lang === 'de' ? 'de_DE' : 'en_US'} />
</svelte:head>

<div class="solutions-layout">
  {@render children?.()}
</div>

<CookieConsentComponent />

<style lang="postcss">
  @reference '../../app.css';

  .solutions-layout {
    @apply min-h-dvh;
  }
</style>
