<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { projectTypes } from '$lib/configs/wizard-config';
  let { config } = $props();
</script>

<div class="thank-you-overlay">
  <div class="thank-you-content">
    <div class="thank-you-animation">
      <div class="success-checkmark flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-success h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    <h1 class="thank-you-title">{$_('wizard.modals.thankYou.title')}</h1>
    <p class="thank-you-subtitle">{$_('wizard.modals.thankYou.subtitle')}</p>
    <div class="thank-you-details">
      <div class="thank-you-card">
        <h3>{$_('wizard.modals.thankYou.whatHappensNext')}</h3>
        <ul class="thank-you-steps">
          <li>
            <span class="step-number">1</span>
            <span>{$_('wizard.modals.thankYou.steps.step1')}</span>
          </li>
          <li>
            <span class="step-number">2</span>
            <span>{$_('wizard.modals.thankYou.steps.step2')}</span>
          </li>
          <li>
            <span class="step-number">3</span>
            <span>{$_('wizard.modals.thankYou.steps.step3')}</span>
          </li>
        </ul>
      </div>
      <div class="thank-you-info">
        <p><strong>{$_('wizard.modals.thankYou.projectName')}</strong><br /> {config.name}</p>
        <p><strong>{$_('wizard.modals.thankYou.estimatedPrice')}</strong> {config.estimatedPrice.toLocaleString()} €</p>
        <p><strong>{$_('wizard.modals.thankYou.projectType')}</strong><br /> {$_(projectTypes.find((p) => p.id === config.projectType)?.title)}</p>
      </div>
    </div>
    <div class="thank-you-actions">
      <button
        onclick={() => {
          goto('/');
        }}
        class="btn btn-simple btn-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        {$_('wizard.modals.thankYou.home')}
      </button>
      <a href="/contact" class="btn btn-link btn-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        {$_('wizard.modals.thankYou.contact')}
      </a>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference '../../../../app.css';

  /* Loading Overlay Styles - Dark Theme Support */
  .loading-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
  }

  .loading-content {
    @apply bg-base-100 border-base-300 mx-4 max-w-md rounded-2xl border p-12 text-center shadow-2xl;
  }

  .loading-animation {
    @apply relative mb-8;
  }

  .loading-spinner {
    @apply border-primary/20 border-t-primary mx-auto h-16 w-16 rounded-full border-4;
    animation: spin 1s linear infinite;
  }

  .loading-pulse {
    @apply border-primary/40 absolute inset-0 mx-auto h-16 w-16 rounded-full border-4;
    animation: pulse 2s ease-in-out infinite;
  }

  .loading-title {
    @apply text-base-content mb-4 text-2xl font-bold;
  }

  .loading-text {
    @apply text-base-content/70 mb-8;
  }

  .loading-steps {
    @apply space-y-3 text-left;
  }

  .loading-step {
    @apply text-base-content flex items-center gap-3 text-sm;
  }

  .loading-step-icon {
    @apply bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full font-bold;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.1;
    }
  }

  /* Thank You Page Styles - Dark Theme Support */
  .thank-you-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center p-4;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(34, 197, 94, 0.1));
    backdrop-filter: blur(12px);
  }

  .thank-you-content {
    @apply bg-base-100 border-base-300 w-full max-w-4xl rounded-3xl border p-12 text-center shadow-2xl;
  }

  .thank-you-animation {
    @apply mb-8;
  }

  .success-checkmark {
    @apply mx-auto mb-6;
    animation: checkmark-bounce 0.6s ease-in-out;
  }

  .thank-you-title {
    @apply text-success mb-4 text-4xl font-bold;
  }

  .thank-you-subtitle {
    @apply text-base-content/70 mb-12 text-xl;
  }

  .thank-you-details {
    @apply mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2;
  }

  .thank-you-card {
    @apply bg-base-200 border-base-300 rounded-2xl border p-8;
  }

  .thank-you-card h3 {
    @apply text-base-content mb-6 text-xl font-bold;
  }

  .thank-you-steps {
    @apply space-y-4;
  }

  .thank-you-steps li {
    @apply text-base-content flex items-start gap-4;
  }

  .step-number {
    @apply bg-primary text-primary-content mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold;
  }

  .thank-you-info {
    @apply bg-success/10 border-success/20 space-y-3 rounded-2xl border p-8;
  }

  .thank-you-info p {
    @apply text-base-content;
  }

  .thank-you-actions {
    @apply flex flex-col justify-center gap-4 sm:flex-row;
  }

  @keyframes checkmark-bounce {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  
</style>
