<script lang="ts">
  import '../app.css';
  import 'flag-icons/css/flag-icons.min.css';
  import { setWasmUrl } from '@lottiefiles/dotlottie-svelte';

  setWasmUrl('/dotlottie-player.wasm');

  let { children } = $props();
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous" />
  <link rel="icon" type="image/png" href="$icons/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="$icons/favicon.svg" />
  <link rel="shortcut icon" href="$icons/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="$icons/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="raspb" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="raspb" />
  <meta property="og:image" content="https://raspb.de/screenshots/screenshot-desktop.png" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

{@render children?.()}
