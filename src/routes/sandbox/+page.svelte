<script lang="ts">
  import TEASER from '$lib/components/teaser.svelte';
  import { goto } from '$app/navigation';
  import Slider from '$lib/components/slider.svelte';
</script>

<TEASER customImageURL={'https://picsum.photos/id/46/1920/1080'} headline={'Hier kommt eine tolle Headline'} subheadline={'Und eine super SubHeadline'}
></TEASER>

<section class="test-content-wrapper fade-in">
  <h1>Test</h1>
  <div class="pt-10 lg:px-20">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis, reiciendis
      autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis, reiciendis
      autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
    </p>

    <div class="big-spacer"></div>

    <Slider></Slider>
<div class="big-spacer"></div>

    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}>Zurück zur Startseite</button
    >
  </div>
  <div class="spacer"></div>
</section>

<style lang="postcss">
    @reference '../../app.css';
  section.test-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
  }
</style>
