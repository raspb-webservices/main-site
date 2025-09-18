<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';

  let { variant = 'default' } = $props();
</script>

<div class="cta-section">
  <div class="cta-content">
    {#if variant === 'default' }
          <h1>{$_('ctaBox.titleFirst')} <span class="inner-text-special">{$_('ctaBox.titleHighlight')}</span></h1>
    <p class="cta-text">
      {$_('ctaBox.description')}
    </p>
    {:else}
        <h1>{$_('ctaBox.variant2.titleFirst')} <span class="inner-text-special">{$_('ctaBox.variant2.titleHighlight')}</span></h1>
    <p class="cta-text">
      {$_('ctaBox.variant2.description')}
    </p>
    {/if}

    <div class="cta-benefits">
      <div class="cta-benefit">
        <div class="benefit-icon">⚡</div>
        <div>
          <h4>{$_('ctaBox.benefits.zeit.title')}</h4>
          <p>{$_('ctaBox.benefits.zeit.description')}</p>
        </div>
      </div>
      <div class="cta-benefit">
        <div class="benefit-icon">🎯</div>
        <div>
          <h4>{$_('ctaBox.benefits.massgeschneidert.title')}</h4>
          <p>{$_('ctaBox.benefits.massgeschneidert.description')}</p>
        </div>
      </div>
      <div class="cta-benefit">
        <div class="benefit-icon">🤝</div>
        <div>
          <h4>{$_('ctaBox.benefits.contact.title')}</h4>
          <p>{$_('ctaBox.benefits.contact.description')}</p>
        </div>
      </div>
    </div>

    <div class="cta-buttons">
      <button
        class="btn-basic cta-primary"
        onclick={() => {
          goto('/get-started');
        }}
      >
        {$_('ctaBox.buttonText')}
      </button>
      <button class="btn btn-outline btn-lg px-8 py-4" onclick={() => goto('/faq')}> {$_('ctaBox.faqButtonText')} </button>
    </div>

    <p class="cta-note">
      {@html $_('ctaBox.note')}
    </p>
  </div>
</div>

<style lang="postcss">
  @reference '../../../app.css';
  .cta-section {
    @apply from-base-100 to-base-200 text-base-content flex cursor-default flex-col items-center justify-center rounded-3xl border-0 bg-linear-to-tl p-6 py-20 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg;

    .cta-content {
      @apply max-w-5xl px-6;

      h1 {
        @apply mb-6 text-4xl font-bold md:text-5xl;
      }

      .cta-text {
        @apply text-base-content m-auto mb-8 max-w-4xl text-lg leading-relaxed;
      }

      .cta-benefits {
        @apply mb-8 grid grid-cols-1 gap-6 md:grid-cols-3;

        .cta-benefit {
          @apply to-base-100 flex items-start rounded-lg bg-linear-to-tl from-base-50 p-3 text-left;

          .benefit-icon {
            @apply mt-1 mr-4 text-3xl;
          }

          h4 {
            @apply mb-1 font-semibold;
          }

          p {
            @apply text-base-content text-sm;
          }
        }
      }

      .cta-buttons {
        @apply mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row;

        .cta-primary {
          @apply px-8 py-4 text-lg;
        }
      }

      .cta-note {
        @apply text-base-content bg-base-300/70 m-auto max-w-4xl rounded-lg p-4 text-sm;
      }
    }
  }
</style>
