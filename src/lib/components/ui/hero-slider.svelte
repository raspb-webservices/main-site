<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';

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
      title: 'Experience Adventure Like Never Before',
      text:
        'Discover breathtaking landscapes and create unforgettable memories with our premium outdoor experiences.',
      cta: 'Get Started'
    },
    {
      image: '/images/slider/slide2.jpg',
      title: 'Push Your Limits',
      text: 'Challenge yourself with thrilling adventures that test your courage and reward your spirit.',
      cta: 'Join Adventure'
    },
    {
      image: '/images/slider/slide3.jpg',
      title: "Nature's Playground Awaits",
      text: 'Immerse yourself in pristine wilderness and connect with the raw beauty of the natural world.',
      cta: 'Explore Now'
    },
    {
      image: '/images/slider/slide4.jpg',
      title: 'Create Lasting Memories',
      text:
        'Every moment becomes a story worth telling when you embrace the adventure that calls to you.',
      cta: 'Start Journey'
    },
    {
      image: '/images/slider/slide5.jpg',
      title: 'Where Dreams Take Flight',
      text:
        'Soar beyond your comfort zone and discover what lies beyond the horizon of possibility.',
      cta: 'Take Flight'
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
      stretch: -120,
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
    <button class="hero-swiper-button-prev hero-card-nav" type="button" aria-label="previous">
      <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
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

    <button class="hero-swiper-button-next hero-card-nav" type="button" aria-label="next">
      <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>

  <!-- Pagination removed by request -->
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .hero-slider-container {
    @apply relative w-full aspect-video overflow-visible;
  }

  .hero-swiper {
    @apply w-full h-full overflow-visible;
  }

  .hero-slide {
    @apply relative h-[70%] md:h-[72%] lg:h-[74%] bg-cover bg-center bg-no-repeat rounded-xl shadow-xl overflow-hidden transition-transform duration-500 ease-out w-full;
    background-image: var(--bg-image);
  }

  .hero-headline {
    @apply text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-900 mb-3 md:mb-4 leading-tight;
    font-family: var(--font-circular);
  }

  .hero-subtext {
    @apply text-sm md:text-base lg:text-lg text-neutral-700 mb-5 md:mb-6 leading-relaxed max-w-2xl;
    font-family: var(--font-circular);
    font-weight: 300;
  }

  .hero-cta {
    @apply text-base md:text-lg px-6 py-3 md:px-8 md:py-4;
  }

  /* Overlay content card (front-most) */
  .hero-card {
    /* Card mittig und so positioniert, dass Pfeilmittelpunkt ~ Bildunterkante */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    /* Slide-Höhe ~ 74% => Bildunterkante = 74%; Card Mitte = Bildunterkante */
    bottom: calc(26% - (var(--card-h) / 2));
    z-index: 30;
    --card-h: 240px;
    min-height: var(--card-h);
    @apply w-[90%] md:w-[80%] lg:w-[70%] bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl flex items-center justify-between gap-4 md:gap-6 px-6 md:px-8 lg:px-12 py-6 md:py-7; 
  }

  .hero-card-content {
    @apply flex-1 text-center md:px-6 flex flex-col items-center justify-center gap-3;
  }

  .hero-card-nav {
    @apply shrink-0 bg-white text-neutral-800 hover:text-neutral-900 hover:bg-neutral-50 rounded-full shadow-md p-2 md:p-3 transition-colors duration-200;
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
  :global(.hero-swiper .swiper-slide) { z-index: 0; }
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
    .hero-card { --card-h: 200px; }
    .hero-headline {
      @apply text-lg md:text-xl mb-2;
    }

    .hero-subtext {
      @apply text-sm md:text-base mb-4;
    }

    .hero-cta {
      @apply text-sm px-5 py-2.5;
    }
    .hero-pagination {
      @apply bottom-2;
    }
  }
  /* Size the swiper wrapper area to let slides peek around */
  :global(.hero-swiper .swiper-wrapper) {
    @apply items-center; /* vertical align slides */
  }
</style>
