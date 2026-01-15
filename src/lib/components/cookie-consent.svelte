<script>
  import { onMount } from 'svelte';
  import * as CookieConsent from 'vanilla-cookieconsent';
  import config from '$configs/cookie-consent-config';
  import 'vanilla-cookieconsent/dist/cookieconsent.css';

  onMount(() => {
    CookieConsent.run(config);
  });
</script>
