<script lang="ts">
  export let headline: string = '';
  export let subheadline: string = '';
  export let image: string = '';
  export let imageAlt: string = '';
  export let variant: 'default' | 'centered' | 'split' = 'default';
  export let showButton: boolean = false;
  export let buttonText: string = 'Learn More';
  export let buttonAction: (() => void) | undefined = undefined;
</script>

<div class="hero-container" class:centered={variant === 'centered'} class:split={variant === 'split'}>
  <div class="hero-content">
    <div class="text-content" class:animate-fade-in-up={variant === 'centered'} class:animate-fade-in-from-side={variant === 'split'}>
      {#if headline}
        <h1 class="hero-headline">{@html headline}</h1>
      {/if}

      {#if subheadline}
        <h3 class="hero-subheadline">{subheadline}</h3>
      {/if}

      {#if showButton && buttonText}
        <button class="btn-basic hero-button" on:click={buttonAction}>
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
  @reference '../../app.css';
  .hero-container {
    @apply relative min-h-[60vh] w-full overflow-hidden;
  }

  .hero-container.centered {
    @apply flex items-center justify-center text-center;
    min-height: 70vh;
  }

  .hero-container.split {
    @apply min-h-[80vh];
  }

  .hero-content {
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
    @apply min-h-[60vh];
  }

  .text-content {
    @apply w-full;
  }

  .split .text-content {
    @apply mr-8;
  }

  .hero-headline {
    @apply pb-8 text-4xl leading-tight font-bold md:text-6xl;
  }

  .centered .hero-headline {
    @apply pb-6 text-6xl md:text-8xl;
  }

  .hero-headline :global(span.inner-text-special) {
    @apply inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 bg-clip-text text-transparent;
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
    @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
  }

  .hero-image {
    @apply h-full w-full object-cover object-center;
  }

  .background-image {
    @apply absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20;
  }

  .background-image::after {
    @apply absolute inset-0 bg-gradient-to-r from-black/30 to-transparent;
    content: '';
  }

  .hero-container:not(.split):not(.centered) .text-content .hero-headline,
  .hero-container:not(.split):not(.centered) .text-content .hero-subheadline {
    @apply drop-shadow-lg;
  }
</style>
