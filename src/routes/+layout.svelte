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

  let { children } = $props();
  let showInitialLoader = $state(true);

  onMount(() => {
    setTimeout(() => {
      showInitialLoader = false;
    }, 333);

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
      <Loader size={'large'}></Loader>
    </div>
  {:else}
    <HEADER />
    <main>
      {@render children?.()}
    </main>
    <!-- <Chatbot /> -->
    <!-- <elevenlabs-convai agent-id="agent_6201k7sa8fxafb7r2g21x6c1xnr1"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script> -->
    
    <div id="elevenlabs-audionative-widget" data-height="90" data-width="100%" data-frameborder="no" data-scrolling="no" data-publicuserid="decdfd880a01909cf6a5150606344652389012cf2f457f4d128805aa3618afbe" data-playerurl="https://elevenlabs.io/player/index.html" >Loading the <a href="https://elevenlabs.io/text-to-speech" target="_blank" rel="noopener">Elevenlabs Text to Speech</a> AudioNative Player...</div><script src="https://elevenlabs.io/player/audioNativeHelper.js" type="text/javascript"></script>
    <FOOTER />
  {/if}
  <CookieConsentComponent></CookieConsentComponent>
</div>
