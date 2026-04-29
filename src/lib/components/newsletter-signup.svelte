<script lang="ts">
  import { trackEvent } from '$lib/analytics/plausible.client';

  type State = 'idle' | 'loading' | 'success' | 'error';
  type ErrorType = 'already_subscribed' | 'invalid_email' | 'service_unavailable' | 'unknown';

  let email = $state('');
  let formState = $state<State>('idle');
  let errorType = $state<ErrorType>('unknown');

  const errorMessages: Record<ErrorType, string> = {
    already_subscribed: 'Diese E-Mail-Adresse ist bereits angemeldet.',
    invalid_email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    service_unavailable: 'Der Newsletter-Service ist momentan nicht verfügbar. Bitte versuche es später.',
    unknown: 'Ein unbekannter Fehler ist aufgetreten. Bitte versuche es später.'
  };

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (formState === 'loading') return;

    formState = 'loading';

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        formState = 'success';
        trackEvent('Newsletter Signup', { source: 'blog' });
        return;
      }

      const data = await res.json().catch(() => ({}));
      errorType = (data?.error as ErrorType) ?? 'unknown';
      formState = 'error';
    } catch {
      errorType = 'unknown';
      formState = 'error';
    }
  }
</script>

<div class="newsletter-box">
  <div class="content">
    <h3>IT-Wissen direkt ins Postfach</h3>
    <p>Praktische Tipps zu KI, Digitalisierung und IT-Sicherheit — monatlich, ohne Spam.</p>
  </div>

  <div class="form-area">
    {#if formState === 'success'}
      <p class="success-msg">Bitte bestätige deine Email-Adresse.</p>
    {:else}
      <form onsubmit={handleSubmit} class="signup-form">
        <input
          type="email"
          name="email"
          bind:value={email}
          placeholder="deine@email.de"
          required
          disabled={formState === 'loading'}
          class="email-input"
          autocomplete="email"
        />
        <button type="submit" disabled={formState === 'loading'} class="submit-btn">
          {formState === 'loading' ? 'Wird angemeldet…' : 'Anmelden'}
        </button>
      </form>

      {#if formState === 'error'}
        <p class="error-msg">{errorMessages[errorType]}</p>
      {/if}

      <p class="dsgvo-hint">
        Mit Anmelden stimmst du unserer <a href="/datenschutz">Datenschutzerklärung</a> zu.
      </p>
    {/if}
  </div>
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

  .form-area {
    @apply flex min-w-72 flex-col gap-2;
  }

  .signup-form {
    @apply flex gap-2;
  }

  .email-input {
    @apply border-base-300 bg-base-100 text-base-content focus:border-primary min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-0 disabled:opacity-50;
  }

  .submit-btn {
    @apply bg-primary text-primary-content hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50;
  }

  .success-msg {
    @apply text-success text-sm font-medium;
  }

  .error-msg {
    @apply text-error text-xs;
  }

  .dsgvo-hint {
    @apply text-base-content/50 text-xs;
    a {
      @apply underline;
    }
  }
</style>
