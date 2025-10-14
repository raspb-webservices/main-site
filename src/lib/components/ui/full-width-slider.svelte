<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  
  register();

  let mySwiper;
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
      disableOnInteraction: false,
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
      <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6"/>
      </svg>
    </button>
    <button class="full-width-swiper-button-next hero-nav-btn" type="button" aria-label="next">
      <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/>
      </svg>
    </button>
  </div>

  <!-- Custom Pagination -->
  <div class="full-width-swiper-pagination hero-pagination"></div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .hero-slider-container {
    @apply relative w-full h-screen overflow-hidden;
  }

  .hero-swiper {
    @apply w-full h-full;
  }

  .hero-slide {
    @apply relative w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center;
    background-image: var(--bg-image);
  }

  .hero-overlay {
    @apply absolute inset-0 bg-black/40 z-10;
  }

  .hero-content {
    @apply relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20;
  }

  .hero-text {
    @apply max-w-3xl;
  }

  .hero-headline {
    @apply text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight;
    font-family: var(--font-circular);
  }

  .hero-subtext {
    @apply text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl;
    font-family: var(--font-circular);
    font-weight: 300;
  }

  .hero-cta {
    @apply text-lg md:text-xl px-8 py-4 md:px-12 md:py-5;
  }

  .hero-navigation {
    @apply absolute top-1/2 -translate-y-1/2 z-30 w-full flex justify-between px-6 md:px-12 lg:px-20 pointer-events-none;
  }

  .hero-nav-btn {
    @apply bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 md:p-4 transition-all duration-300 pointer-events-auto;
    
    &:hover {
      @apply scale-110 shadow-lg;
    }

    &:disabled {
      @apply opacity-50 cursor-not-allowed;
    }
  }

  .hero-pagination {
    @apply absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3;
  }

  /* Custom pagination styling */
  :global(.hero-pagination .swiper-pagination-bullet) {
    @apply w-12 h-1 bg-white/50 rounded-full transition-all duration-300 cursor-pointer;
  }

  :global(.hero-pagination .swiper-pagination-bullet-active) {
    @apply bg-white scale-y-150;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .hero-headline {
      @apply text-3xl md:text-4xl mb-4;
    }

    .hero-subtext {
      @apply text-base md:text-lg mb-6;
    }

    .hero-cta {
      @apply text-base px-6 py-3;
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
    @apply w-full h-full;
  }
</style>
