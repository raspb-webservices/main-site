<script lang="ts">
  import TEASER from '$lib/components/ui/teaser.svelte';
  import { goto } from '$app/navigation';
  import FullWidthSlider from '$lib/components/ui/full-width-slider.svelte';
  import HeroSlider from '$lib/components/ui/hero-slider.svelte';
  import CarouselSlider from '$lib/components/ui/carousel-slider.svelte';
  import BoxSlider from '$lib/components/ui/box-slider.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Hero from '$lib/components/ui/hero.svelte';
</script>

<Section>
  <div class="prose">
    <h1>BoxSlider (placed in SECTION)</h1>
  </div>
  <BoxSlider></BoxSlider>
</Section>

<Section>
  <div class="prose">
    <h1>HeroSlider (placed in SECTION)</h1>
  </div>
  <HeroSlider></HeroSlider>
</Section>

<Section>
  <div class="prose">
    <h1>CarouselSlider (placed in SECTION)</h1>
  </div>
  <CarouselSlider></CarouselSlider>
</Section>

<div class="prose">
  <h1>FullWidthSlider</h1>
</div>
<FullWidthSlider></FullWidthSlider>

<Section>
  <Hero
    headline={'Default with image'}
    subheadline={'This is a Subheadline'}
    image={'/images/slider/slide1.jpg'}
    position={'top'}
    imageAlt={'This is an image'}
    variant={'default '}
    showButton={true}
    buttonText={'this is the CTA text... '}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={'Default without image'}
    subheadline={'This is a Subheadline'}
    variant={'default'}
    position={'bottom'}
    showButton={true}
    buttonText={'this is the CTA text... '}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={'Centered with image'}
    subheadline={'This is a Subheadline'}
    image={'/images/slider/slide2.jpg'}
    imageAlt={'This is an image'}
    variant={'centered'}
    showButton={true}
    buttonText={'this is the CTA text...  '}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={'Centered without image'}
    subheadline={'This is a Subheadline'}
    variant={'centered'}
    showButton={true}
    buttonText={'this is the CTA text...  '}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={'Split with image'}
    subheadline={'This is a Subheadline'}
    image={'/images/slider/slide3.jpg'}
    imageAlt={'This is an image'}
    variant={'split'}
    showButton={true}
    buttonText={'this is the CTA text...  '}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={'Split without image'}
    subheadline={'This is a Subheadline'}
    variant={'split'}
    showButton={true}
    buttonText={'this is the CTA text...  '}
    buttonAction={{}}
  ></Hero>
</Section>

<Section fullWidth={true}>
  <Hero
    headline={'FullWidth Hero'}
    subheadline={'This is a Subheadline'}
    image={'/images/slider/slide1.jpg'}
    position={'bottom'}
    imageAlt={'This is an image'}
    variant={'default '}
    showButton={true}
    buttonText={'this is the CTA text... '}
    buttonAction={{}}
  ></Hero>
</Section>

<TEASER customImageURL={'https://picsum.photos/id/46/1920/1080'} headline={'Hier kommt eine tolle Headline'} subheadline={'Und eine super SubHeadline'}
></TEASER>

<Section>
  <button
    class="btn-basic"
    onclick={() => {
      goto('/');
    }}>Zurück zur Startseite</button
  >
  <div class="spacer"></div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
</style>
