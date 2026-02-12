<script lang="ts">
  import { m } from '$lib/paraglide/messages';

  let {
    headline = '',
    subheadline = '',
    image = '',
    imageAlt = '',
    variant = 'default',
    position = 'default',
    showButton = false,
    buttonText = m.hero_default_button(),
    buttonAction
  } = $props();
</script>

<div
  class="hero-container"
  class:centered={variant === 'centered'}
  class:split={variant === 'split'}
  class:pushDown={position === 'bottom'}
  class:pushUp={position === 'top'}
>
  <div class="hero-content">
    <div class="text-content" class:animate-fade-in-up={variant === 'centered'} class:animate-fade-in-from-side={variant === 'split'}>
      {#if headline}
        <h1 class="hero-headline">{@html headline}</h1>
      {/if}

      {#if subheadline}
        <h2 class="hero-subheadline">{subheadline}</h2>
      {/if}

      {#if showButton && buttonText}
        <button class="btn-basic hero-button" onclick={buttonAction}>
          {buttonText}
        </button>
      {/if}
    </div>

    {#if image && variant === 'split'}
      <div class="image-content">
        <div class="hero-image-container">
          <img src={image} alt={imageAlt} class="hero-image" />
        </div>
      </div>
    {/if}
  </div>

  {#if image && variant !== 'split'}
    <div class="background-image" style="background-image: url('{image}')"></div>
  {/if}
</div>

<style lang="postcss">
  @reference '../../../app.css';
  
  .hero-container {
    @apply relative flex min-h-[50vh] w-full overflow-hidden;

    &.centered {
      @apply flex items-center justify-center text-center;
    }

    &.pushDown {
      @apply items-end;
    }

    &.pushUp {
      @apply items-start;
    }
  }

  .hero-container .hero-content {
    @apply relative z-10 w-full;
  }

  .split .hero-content {
    @apply grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14;
    @apply px-4 py-16;
  }

  .centered .hero-content {
    @apply flex flex-col items-center justify-center px-4;
    @apply mx-auto max-w-4xl;
  }

  .hero-container:not(.split):not(.centered) .hero-content {
    @apply flex flex-col justify-center px-4 py-20;
  }

  .text-content {
    @apply w-full;
  }

  .split .text-content {
    @apply mr-8;
  }

  .centered .text-content {
    @apply flex flex-col items-center justify-center;
  }

  .hero-headline {
    @apply pb-8 text-4xl leading-tight font-bold md:text-6xl;
  }

  .centered .hero-headline {
    @apply pb-6 text-6xl md:text-8xl;
  }

  .hero-headline :global(span.inner-text-special) {
    @apply inline-block bg-linear-to-r from-purple-500 via-pink-500 to-violet-500 bg-clip-text text-transparent;
  }

  .hero-subheadline {
    @apply pb-6 text-xl leading-relaxed font-light;
  }

  .centered .hero-subheadline {
    @apply pb-8 text-2xl;
  }

  .hero-button {
    @apply mt-4;
  }

  .image-content {
    @apply w-full;
  }

  .hero-image-container {
    @apply relative aspect-5/3 w-full overflow-hidden rounded-2xl shadow-2xl;
  }

  .hero-image {
    @apply h-full w-full object-cover object-center;
  }

  .background-image {
    @apply absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20;
  }

  .background-image::after {
    @apply absolute inset-0 bg-linear-to-r from-black/30 to-transparent;
    content: '';
  }

  .hero-container:not(.split):not(.centered) .text-content .hero-headline,
  .hero-container:not(.split):not(.centered) .text-content .hero-subheadline {
    @apply drop-shadow-lg;
  }
</style>
