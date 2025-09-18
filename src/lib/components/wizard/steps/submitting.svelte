<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<div class="loading-overlay">
    <div class="loading-content">
      <div class="loading-animation">
        <div class="loading-spinner"></div>
        <div class="loading-pulse"></div>
      </div>
      <h2 class="loading-title">{$_('wizard.loading.title')}</h2>
      <p class="loading-text">{$_('wizard.loading.description')}</p>
      <div class="loading-steps">
        <div class="loading-step">
          <span class="loading-step-icon">✓</span>
          <span>{$_('wizard.loading.steps.preparing')}</span>
        </div>
        <div class="loading-step">
          <span class="loading-step-icon">⏳</span>
          <span>{$_('wizard.loading.steps.creating')}</span>
        </div>
        <div class="loading-step">
          <span class="loading-step-icon">⏳</span>
          <span>{$_('wizard.loading.steps.sending')}</span>
        </div>
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
</style>