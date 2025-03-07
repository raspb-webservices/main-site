<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import { generateSlides } from '$lib/helper/generateSlides';

  const slides = generateSlides(12);
  const options = {
    rewind: true,
    gap: '1rem',
    autoplay: true,
    arrows: true,
    keyboard: 'global' as 'global'
  };
</script>

<Splide {options} hasTrack={false} aria-label="My Favorite Images">
  <div class="custom-wrapper">
    <div class="relative">
      <SplideTrack>
        {#each slides as slide}
          <SplideSlide>
            <img src={slide.src} alt={slide.alt} />
          </SplideSlide>
        {/each}
      </SplideTrack>
    </div>

    <div class="splide__progress">
      <div class="splide__progress__bar"></div>
    </div>
  </div>
</Splide>

<style lang="postcss">
  .custom-wrapper {
    @apply overflow-hidden rounded-2xl;
  }
</style>
