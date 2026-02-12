<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import { m } from '$lib/paraglide/messages';

  // Register Swiper web components
  register();

  type Slide = {
    image: string;
    title: string;
    text: string;
    cta?: string;
  };

  const slides: Slide[] = [
    {
      image: '/images/slider/slide1.jpg',
      title: m.carousel_slide1_title(),
      text: m.carousel_slide1_text(),
      cta: m.carousel_slide1_cta()
    },
    {
      image: '/images/slider/slide2.jpg',
      title: m.carousel_slide2_title(),
      text: m.carousel_slide2_text(),
      cta: m.carousel_slide2_cta()
    },
    {
      image: '/images/slider/slide3.jpg',
      title: m.carousel_slide3_title(),
      text: m.carousel_slide3_text(),
      cta: m.carousel_slide3_cta()
    },
    {
      image: '/images/slider/slide4.jpg',
      title: m.carousel_slide4_title(),
      text: m.carousel_slide4_text(),
      cta: m.carousel_slide4_cta()
    },
    {
      image: '/images/slider/slide5.jpg',
      title: m.carousel_slide5_title(),
      text: m.carousel_slide5_text(),
      cta: m.carousel_slide5_cta()
    }
  ];

  let mySwiper: HTMLElement & { initialize: () => void };
  let active = 1; // Start with the second slide prominent, as requested

  const params = {
    // Show center slide large, neighbors peek left/right
    slidesPerView: 'auto' as const,
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    watchSlidesProgress: true,
    speed: 650,
    grabCursor: true,
    keyboard: { enabled: true },
    navigation: {
      nextEl: '.hero-swiper-button-next',
      prevEl: '.hero-swiper-button-prev'
    },
    // No pagination for this variant
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: -60,
      depth: 240,
      modifier: 1.08,
      slideShadows: false
    },
    on: {
      init() {
        // set initial real index (loop mode adjusts indexes internally)
        // The web component events provide [swiper, ...] in detail
      }
    }
  };

  onMount(() => {
    Object.assign(mySwiper, params);
    mySwiper.initialize();

    // After initialize, use the underlying Swiper instance for events
    setTimeout(() => {
      // @ts-ignore web component holds swiper instance on .swiper
      const swiper = (mySwiper as any).swiper;
      if (!swiper) return;
      swiper.slideToLoop(1, 0);
      active = swiper.realIndex;
      swiper.on('slideChange', () => {
        active = swiper.realIndex;
      });
    }, 0);
  });
</script>

<div class="hero-slider-container">
  <swiper-container bind:this={mySwiper} init="false" class="hero-swiper">
    {#each slides as s}
      <swiper-slide>
        <div class="hero-slide" style={`--bg-image: url('${s.image}')`}></div>
      </swiper-slide>
    {/each}
  </swiper-container>

  <!-- Overlay content card with arrows inside -->
  <div class="hero-card">
    <button class="hero-swiper-button-prev hero-card-nav" type="button" aria-label={m.carousel_nav_previous()}>
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <div class="hero-card-content">
      <h2 class="hero-headline line-clamp-1">{slides[active]?.title}</h2>
      <p class="hero-subtext line-clamp-3">{slides[active]?.text}</p>
      {#if slides[active]?.cta}
        <button class="btn-basic hero-cta">{slides[active]?.cta}</button>
      {/if}
    </div>

    <button class="hero-swiper-button-next hero-card-nav" type="button" aria-label={m.carousel_nav_next()}>
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>

  <!-- Pagination removed by request -->
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .hero-slider-container {
    @apply relative aspect-video w-full overflow-visible;
  }

  .hero-swiper {
    @apply h-full w-full overflow-visible;
  }

  .hero-slide {
    @apply relative h-[70%] w-full overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat shadow-xl transition-transform duration-500 ease-out md:h-[72%] lg:h-[74%];
    background-image: var(--bg-image);
  }

  .hero-headline {
    @apply mb-3 text-xl leading-tight font-bold text-neutral-900 md:mb-4 md:text-2xl lg:text-3xl xl:text-4xl;
    font-family: var(--font-circular);
  }

  .hero-subtext {
    @apply mb-5 max-w-2xl text-sm leading-relaxed text-neutral-700 md:mb-6 md:text-base lg:text-lg;
    font-family: var(--font-circular);
    font-weight: 300;
  }

  .hero-cta {
    @apply px-6 py-3 text-base md:px-8 md:py-4 md:text-lg;
  }

  /* Overlay content card (front-most) */
  .hero-card {
    /* Card mittig und so positioniert, dass Pfeilmittelpunkt ~ Bildunterkante */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    /* Slide-Höhe ~ 74% => Bildunterkante = 74%; Card Mitte = Bildunterkante */
    bottom: calc(11% - (var(--card-h) / 2));
    z-index: 30;
    --card-h: 240px;
    min-height: var(--card-h);
    @apply flex w-[90%] items-center justify-between gap-4 rounded-2xl bg-white/90 px-6 py-6 shadow-2xl backdrop-blur-md md:w-[80%] md:gap-6 md:px-8 md:py-7 lg:w-[70%] lg:px-12;
  }

  .hero-card-content {
    @apply flex flex-1 flex-col items-center justify-center gap-3 text-center md:px-6;
  }

  .hero-card-nav {
    @apply shrink-0 rounded-full bg-white p-2 text-neutral-800 shadow-md transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-900 md:p-3;
  }

  /* pagination styles removed */

  /* Slide scaling to achieve small-left / big-center / small-right */
  :global(.hero-swiper .swiper-slide) {
    @apply transition-transform duration-500 ease-out will-change-transform;
  }
  /* Give slides an explicit width for slidesPerView:'auto'; etwas schmaler, damit Nachbarn breiter sichtbar sind */
  :global(.hero-swiper swiper-slide) {
    width: clamp(260px, 58vw, 980px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.hero-swiper .swiper-slide) {
    z-index: 0;
  }
  :global(.hero-swiper .swiper-slide-prev),
  :global(.hero-swiper .swiper-slide-next) {
    transform: scale(0.94);
    z-index: 10;
  }
  :global(.hero-swiper .swiper-slide-prev) {
    transform-origin: right center;
  }
  :global(.hero-swiper .swiper-slide-next) {
    transform-origin: left center;
  }
  :global(.hero-swiper .swiper-slide-active) {
    transform: scale(1);
    z-index: 20;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .hero-card {
      --card-h: 200px;
    }
    .hero-headline {
      @apply mb-2 text-lg md:text-xl;
    }

    .hero-subtext {
      @apply mb-4 text-sm md:text-base;
    }

    .hero-cta {
      @apply px-5 py-2.5 text-sm;
    }
  }
  /* Size the swiper wrapper area to let slides peek around */
  :global(.hero-swiper .swiper-wrapper) {
    @apply items-center; /* vertical align slides */
  }
</style>
