<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  register();

  let mySwiper;
  const params = {
    slidesPerView: 1,
    spaceBetween: 10,
    keyboard: {
      enabled: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
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

<div class="carousel-container">
  <swiper-container bind:this={mySwiper} init="false">
    <swiper-slide><div class="swiper-image" style="--image-url:url({'https://picsum.photos/1024/350?v=2'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'https://picsum.photos/1024/350?v=3'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'https://picsum.photos/1024/350?v=4'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'https://picsum.photos/1024/350?v=5'})"></div></swiper-slide>
    <swiper-slide><div class="swiper-image" style="--image-url:url({'https://picsum.photos/1024/350?v=6'})"></div></swiper-slide>
  </swiper-container>

  <div class="swiper-controls">
    <button class="swiper-button-prev" type="button" aria-label="previous">
      <svg viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        ></path>
      </svg></button
    >
    <div class="swiper-pagination"></div>
    <button class="swiper-button-next" type="button" aria-label="next">
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
  @reference '../../app.css';

  .swiper-image {
    @apply bg-primary/5 block h-[450px] w-full bg-cover bg-center bg-no-repeat;
    background-image: var(--image-url);
  }
</style>
