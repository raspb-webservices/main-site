<script lang="ts">
  import { onMount } from 'svelte';
  import { trackEvent } from '$lib/analytics/plausible.client';

  // import.meta.env is used instead of $env/static/public so the component
  // builds gracefully even when PUBLIC_BREVO_FORM_ID is not yet set.
  const formId: string = (import.meta.env.PUBLIC_BREVO_FORM_ID as string) ?? '';

  onMount(() => {
    if (!formId) return;

    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.async = true;
    document.head.appendChild(script);

    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.(`[data-brevo-form-id="${formId}"]`)) {
        trackEvent('Newsletter Signup', { source: 'blog' });
      }
    };
    document.addEventListener('submit', handler, true);
    return () => document.removeEventListener('submit', handler, true);
  });
</script>

<div class="newsletter-box">
  <div class="content">
    <h3>IT-Wissen direkt ins Postfach</h3>
    <p>Praktische Tipps zu KI, Digitalisierung und IT-Sicherheit — monatlich, ohne Spam.</p>
  </div>

  {#if !formId}
    <div class="placeholder">
      <p class="hint">Newsletter-Anmeldung — kommt bald.</p>
    </div>
  {:else}
    <div
      id="sib-form-{formId}"
      data-brevo-form-id={formId}
      class="sib-form"
    >
      <div id="sib-container--{formId}"></div>
      <link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css" />
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference '../../app.css';

  .newsletter-box {
    @apply bg-primary/5 border-primary/20 flex flex-col gap-6 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between;
  }

  .content {
    h3 {
      @apply text-base-content mb-1 text-xl font-bold;
    }
    p {
      @apply text-base-content/70 text-sm leading-relaxed;
    }
  }

  .placeholder {
    .hint {
      @apply text-base-content/50 text-sm italic;
    }
  }

  .sib-form {
    @apply min-w-72;
  }
</style>
