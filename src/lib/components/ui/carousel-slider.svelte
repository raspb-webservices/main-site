<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';

  register();

  let mySwiper;
  let textSwiper;

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
      text: 'Discover breathtaking landscapes and create unforgettable memories with our premium outdoor experiences.',
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
      text: 'Every moment becomes a story worth telling when you embrace the adventure that calls to you.',
      cta: 'Start Journey'
    },
    {
      image: '/images/slider/slide5.jpg',
      title: 'Where Dreams Take Flight',
      text: 'Soar beyond your comfort zone and discover what lies beyond the horizon of possibility.',
      cta: 'Take Flight'
    }
  ];

  const active = 1;
  const spaceBetween = 10;

  const onProgress = (e) => {
    const [swiper, progress] = e.detail;
    console.log(progress);
  };
  const onSlideChange = (e) => {
    console.log('slide changed');
  };

  const params = {
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,
    watchSlidesProgress: true,
    speed: 650,
    grabCursor: true,
    keyboard: { enabled: true },
    navigation: {
      nextEl: '.carousel-swiper-button-next',
      prevEl: '.carousel-swiper-button-prev'
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
      init() {}
    }
  };
  const params2 = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 400,
    navigation: {
      nextEl: '.carousel-swiper-button-next',
      prevEl: '.carousel-swiper-button-prev'
    },
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
    Object.assign(textSwiper, params2);
    textSwiper.initialize();
    mySwiper.initialize();
  });
</script>

<div class="carousel-slider-container">
  <swiper-container bind:this={mySwiper} init="false" class="carousel-swiper">
    {#each slides as s}
      <swiper-slide>
        <div class="carousel-slide" style={`--bg-image: url('${s.image}')`}></div>
      </swiper-slide>
    {/each}
  </swiper-container>

  <div class="carousel-card">
    <button class="carousel-swiper-button-prev carousel-card-nav" type="button" aria-label="previous">
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <swiper-container bind:this={textSwiper} init="false" class="carousel-card-content">
      {#each slides as s}
        <swiper-slide>
          <div class="carousel-card-content">
            <h2 class="carousel-headline line-clamp-1">{s.title}</h2>
            <p class="carousel-subtext line-clamp-3">{s.text}</p>
            {#if s.cta}
              <button class="btn-basic">{s.cta}</button>
            {/if}
          </div>
        </swiper-slide>
      {/each}
    </swiper-container>

    <button class="carousel-swiper-button-next carousel-card-nav" type="button" aria-label="next">
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  :global(swiper-container.carousel-swiper swiper-slide.swiper-slide-prev .carousel-slide) {
    transform: translate3d(170px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1);
  }
  :global(swiper-container.carousel-swiper swiper-slide.swiper-slide-next .carousel-slide) {
    @apply -translate-x-1/2;
  }

  .carousel-slider-container {
    @apply relative aspect-video w-full;

    .carousel-slide {
      @apply aspect-video w-full rounded-3xl bg-cover bg-center bg-no-repeat shadow-lg;
      background-image: var(--bg-image);
    }

    .carousel-card {
      @apply absolute right-1/2 bottom-0 z-10 flex h-72 w-8/12 translate-x-1/2 items-center justify-center rounded-2xl bg-white/90 px-10 py-4 shadow-2xl backdrop-blur-md;

      .carousel-card-content {
        @apply m-auto flex h-full w-full max-w-10/12 flex-col items-center justify-center text-center;

        .carousel-subtext {
          @apply p-4 pb-6 leading-snug;
        }
      }

      .carousel-card-nav {
        @apply shrink-0 cursor-pointer rounded-full bg-white p-2 text-neutral-800 shadow-md transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-900 md:p-3;
      }
    }
  }
</style>
