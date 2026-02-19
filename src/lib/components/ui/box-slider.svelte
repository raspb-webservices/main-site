<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';

  register();

  let mySwiper: any;
  const params = {
    slidesPerView: 1,
    spaceBetween: 5,
    keyboard: {
      enabled: true
    },
    navigation: {
      nextEl: '.box-swiper-button-next',
      prevEl: '.box-swiper-button-prev'
    },
    pagination: {
      el: '.box-swiper-pagination',
      clickable: true
    },
    loop: true,
    speed: 1000,

    on: {
      init() {}
    }
  };

  onMount(() => {
    Object.assign(mySwiper, params);
    mySwiper.initialize();
  });
</script>

<div class="carousel-container">
  <swiper-container bind:this={mySwiper} init="false" class="box-swiper">
    <swiper-slide><div class="swiper-image" style="--image-url:url({'$images/slider/slide1.jpg'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'$images/slider/slide2.jpg'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'$images/slider/slide3.jpg'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'$images/slider/slide4.jpg'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'$images/slider/slide5.jpg'})"></div></swiper-slide>
  </swiper-container>

  <div class="swiper-controls">
    <button class="box-swiper-button-prev btn btn-circle opacity-70" type="button" aria-label="previous">
      <svg viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        ></path>
      </svg>
    </button>
    <div class="box-swiper-pagination"></div>
    <button class="box-swiper-button-next btn btn-circle opacity-70" type="button" aria-label="next">
      <svg viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        ></path>
      </svg>
    </button>
  </div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .swiper-image {
    @apply bg-primary/5 block aspect-video w-full rounded-3xl bg-cover bg-center bg-no-repeat shadow-lg;
    background-image: var(--image-url);
  }

  .box-swiper-pagination {
    @apply flex w-full items-center justify-center gap-2;
  }
  :global(.box-swiper-pagination .swiper-pagination-bullet) {
    @apply bg-primary/40 h-5 w-5 rounded-full;
  }
  :global(.box-swiper-pagination .swiper-pagination-bullet-active) {
    @apply bg-primary;
  }
  :global(swiper-container.box-swiper) {
    @apply -m-7;
  }
  :global(swiper-container.box-swiper swiper-slide) {
    @apply p-7;
  }

  .swiper-controls {
    @apply m-3 flex items-center justify-between;
    .box-swiper-button-prev,
    .box-swiper-button-next {
      @apply bg-primary/20 hover:bg-primary/10 text-primary h-10 w-10 cursor-pointer rounded-xl p-2;
    }
  }
</style>
