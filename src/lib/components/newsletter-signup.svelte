<script lang="ts">
  import { PUBLIC_BREVO_FORM_ID } from '$env/static/public';
  import { onMount } from 'svelte';

  let formId = PUBLIC_BREVO_FORM_ID ?? '';
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    if (!formId) return;

    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.async = true;
    document.head.appendChild(script);
  });
</script>

<div class="newsletter-wrapper">
  <div class="newsletter-inner">
    <div class="newsletter-copy">
      <h2 class="newsletter-title">Praxiswissen direkt ins Postfach</h2>
      <p class="newsletter-sub">
        Kein Spam. Nur nützliche Impulse zu KI, Digitalisierung und modernen Webprojekten — für den
        Mittelstand.
      </p>
    </div>
    {#if mounted && formId}
      <div class="sib-form" id="sib-form-container">
        <div
          id="sib-container"
          class="sib-container--large sib-container--vertical"
          style="text-align:center; max-width:640px; margin:0 auto;"
        >
          <iframe
            title="Brevo Newsletter Signup"
            src="https://sibforms.com/serve/MUIFAAl{formId}"
            frameborder="0"
            scrolling="auto"
            allowfullscreen
            style="display:block; max-width:100%; width:640px; height:350px;"
          ></iframe>
        </div>
      </div>
    {:else if mounted}
      <div class="form-placeholder">
        <p class="placeholder-text">Newsletter-Formular wird konfiguriert.</p>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference '../../app.css';

  .newsletter-wrapper {
    @apply bg-base-200/50 rounded-2xl p-8 md:p-12;
  }

  .newsletter-inner {
    @apply mx-auto flex max-w-4xl flex-col items-center gap-8 text-center;
  }

  .newsletter-copy {
    @apply flex flex-col gap-3;
  }

  .newsletter-title {
    @apply text-base-content text-2xl font-bold md:text-3xl;
  }

  .newsletter-sub {
    @apply text-base-content/70 text-base leading-relaxed;
  }

  .form-placeholder {
    @apply border-base-300 rounded-xl border-2 border-dashed p-8;
  }

  .placeholder-text {
    @apply text-base-content/50 text-sm;
  }
</style>
