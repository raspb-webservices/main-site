<script lang="ts">
  import { onMount } from 'svelte';
  import * as CookieConsent from 'vanilla-cookieconsent';
  import config from '$configs/cookie-consent-config';
  import 'vanilla-cookieconsent/dist/cookieconsent.css';

  onMount(() => {
    // Important: this component runs client-side only.
    // The config contains analytics hooks (Plausible opt-in).
    CookieConsent.run(config);

    // If the user already made a choice earlier, `onConsent` is supposed to fire on each page load.
    // Still, we also explicitly sync once here to be robust (e.g. if callback timing differs).
    try {
      const cookie = CookieConsent.getCookie();
      // The config uses `analytics` category for Plausible.
      const allowed = Array.isArray(cookie?.categories) && cookie.categories.includes('analytics');
      config.onConsent?.({ cookie });
      // `config.onConsent` already calls `setPlausibleConsent`, so nothing else is needed.
      // Keeping `allowed` here makes debugging easier.
      void allowed;
    } catch {
      // ignore
    }
  });
</script>
