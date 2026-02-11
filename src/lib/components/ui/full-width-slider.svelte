<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';

  register();

  let mySwiper: any;
  const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 2000,
    keyboard: {
      enabled: true
    },
    navigation: {
      nextEl: '.full-width-swiper-button-next',
      prevEl: '.full-width-swiper-button-prev'
    },
    pagination: {
      el: '.full-width-swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    on: {
      init() {}
    }
  };

  onMount(() => {
    Object.assign(mySwiper, params);
    mySwiper.initialize();
  });
</script>

<div class="hero-slider-container">
  <swiper-container bind:this={mySwiper} init="false" class="hero-swiper">
    <!-- Slide 1 -->
    <swiper-slide>
      <div class="hero-slide" style="--bg-image: url('/images/slider/slide1.jpg')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-headline">Experience Adventure Like Never Before</h1>
            <p class="hero-subtext">Discover breathtaking landscapes and create unforgettable memories with our premium outdoor experiences.</p>
            <button class="btn-basic hero-cta">Get Started</button>
          </div>
        </div>
      </div>
    </swiper-slide>

    <!-- Slide 2 -->
    <swiper-slide>
      <div class="hero-slide" style="--bg-image: url('/images/slider/slide2.jpg')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-headline">Push Your Limits</h1>
            <p class="hero-subtext">Challenge yourself with thrilling adventures that test your courage and reward your spirit.</p>
            <button class="btn-basic hero-cta">Join Adventure</button>
          </div>
        </div>
      </div>
    </swiper-slide>

    <!-- Slide 3 -->
    <swiper-slide>
      <div class="hero-slide" style="--bg-image: url('/images/slider/slide3.jpg')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-headline">Nature's Playground Awaits</h1>
            <p class="hero-subtext">Immerse yourself in pristine wilderness and connect with the raw beauty of the natural world.</p>
            <button class="btn-basic hero-cta">Explore Now</button>
          </div>
        </div>
      </div>
    </swiper-slide>

    <!-- Slide 4 -->
    <swiper-slide>
      <div class="hero-slide" style="--bg-image: url('/images/slider/slide4.jpg')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-headline">Create Lasting Memories</h1>
            <p class="hero-subtext">Every moment becomes a story worth telling when you embrace the adventure that calls to you.</p>
            <button class="btn-basic hero-cta">Start Journey</button>
          </div>
        </div>
      </div>
    </swiper-slide>

    <!-- Slide 5 -->
    <swiper-slide>
      <div class="hero-slide" style="--bg-image: url('/images/slider/slide5.jpg')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-headline">Where Dreams Take Flight</h1>
            <p class="hero-subtext">Soar beyond your comfort zone and discover what lies beyond the horizon of possibility.</p>
            <button class="btn-basic hero-cta">Take Flight</button>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper-container>

  <!-- Custom Navigation -->
  <div class="hero-navigation">
    <button class="full-width-swiper-button-prev hero-nav-btn" type="button" aria-label="previous">
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" />
      </svg>
    </button>
    <button class="full-width-swiper-button-next hero-nav-btn" type="button" aria-label="next">
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>

  <!-- Custom Pagination -->
  <div class="full-width-swiper-pagination hero-pagination"></div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .hero-slider-container {
    @apply relative h-screen w-full overflow-hidden;
  }

  .hero-swiper {
    @apply h-full w-full;
  }

  .hero-slide {
    @apply relative flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat;
    background-image: var(--bg-image);
  }

  .hero-overlay {
    @apply absolute inset-0 z-10 bg-black/40;
  }

  .hero-content {
    @apply relative z-20 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20;
  }

  .hero-text {
    @apply max-w-3xl;
  }

  .hero-headline {
    @apply mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-7xl;
    font-family: var(--font-circular);
  }

  .hero-subtext {
    @apply mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl;
    font-family: var(--font-circular);
    font-weight: 300;
  }

  .hero-cta {
    @apply px-8 py-4 text-lg md:px-12 md:py-5 md:text-xl;
  }

  .hero-navigation {
    @apply pointer-events-none absolute top-1/2 z-30 flex w-full -translate-y-1/2 justify-between px-6 md:px-12 lg:px-20;
  }

  .hero-nav-btn {
    @apply pointer-events-auto rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:p-4;

    &:hover {
      @apply scale-110 shadow-lg;
    }

    &:disabled {
      @apply cursor-not-allowed opacity-50;
    }
  }

  .hero-pagination {
    @apply absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3;
  }

  /* Custom pagination styling */
  :global(.hero-pagination .swiper-pagination-bullet) {
    @apply h-1 w-12 cursor-pointer rounded-full bg-white/50 transition-all duration-300;
  }

  :global(.hero-pagination .swiper-pagination-bullet-active) {
    @apply scale-y-150 bg-white;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .hero-headline {
      @apply mb-4 text-3xl md:text-4xl;
    }

    .hero-subtext {
      @apply mb-6 text-base md:text-lg;
    }

    .hero-cta {
      @apply px-6 py-3 text-base;
    }

    .hero-navigation {
      @apply px-4;
    }

    .hero-nav-btn {
      @apply p-2;
    }

    .hero-pagination {
      @apply bottom-6;
    }
  }

  :global(.hero-swiper .swiper-slide) {
    @apply h-full w-full;
  }
</style>
