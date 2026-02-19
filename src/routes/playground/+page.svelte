<script lang="ts">
  import TEASER from '$lib/components/ui/teaser.svelte';
  import { goto } from '$app/navigation';
  import FullWidthSlider from '$lib/components/ui/full-width-slider.svelte';
  import HeroSlider from '$lib/components/ui/hero-slider.svelte';
  import CarouselSlider from '$lib/components/ui/carousel-slider.svelte';
  import BoxSlider from '$lib/components/ui/box-slider.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import Hero from '$lib/components/ui/hero.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<Section>
  <div class="prose">
    <h1>{m.playground_boxslider_title()}</h1>
  </div>
  <BoxSlider></BoxSlider>
</Section>

<Section>
  <div class="prose">
    <h1>{m.playground_heroslider_title()}</h1>
  </div>
  <HeroSlider></HeroSlider>
</Section>

<Section>
  <div class="prose">
    <h1>{m.playground_carouselslider_title()}</h1>
  </div>
  <CarouselSlider></CarouselSlider>
</Section>

<div class="prose">
  <h1>{m.playground_fullwidthslider_title()}</h1>
</div>
<FullWidthSlider></FullWidthSlider>

<Section>
  <Hero
    headline={m.playground_hero_default_with_image()}
    subheadline={m.playground_hero_subheadline()}
    image={'$images/slider/slide1.jpg'}
    position={'top'}
    imageAlt={m.playground_hero_image_alt()}
    variant={'default '}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={m.playground_hero_default_without_image()}
    subheadline={m.playground_hero_subheadline()}
    variant={'default'}
    position={'bottom'}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={m.playground_hero_centered_with_image()}
    subheadline={m.playground_hero_subheadline()}
    image={'$images/slider/slide2.jpg'}
    imageAlt={m.playground_hero_image_alt()}
    variant={'centered'}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={m.playground_hero_centered_without_image()}
    subheadline={m.playground_hero_subheadline()}
    variant={'centered'}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={m.playground_hero_split_with_image()}
    subheadline={m.playground_hero_subheadline()}
    image={'$images/slider/slide3.jpg'}
    imageAlt={m.playground_hero_image_alt()}
    variant={'split'}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<Section>
  <Hero
    headline={m.playground_hero_split_without_image()}
    subheadline={m.playground_hero_subheadline()}
    variant={'split'}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<Section fullWidth={true}>
  <Hero
    headline={m.playground_hero_fullwidth()}
    subheadline={m.playground_hero_subheadline()}
    image={'$images/slider/slide1.jpg'}
    position={'bottom'}
    imageAlt={m.playground_hero_image_alt()}
    variant={'default '}
    showButton={true}
    buttonText={m.playground_hero_cta_text()}
    buttonAction={{}}
  ></Hero>
</Section>

<TEASER customImageURL={'https://picsum.photos/id/46/1920/1080'} headline={m.teaser_default_headline()} subheadline={m.teaser_default_subheadline()}></TEASER>

<Section>
  <button
    class="btn-basic"
    onclick={() => {
      goto('/');
    }}>{m.playground_back_to_home()}</button
  >
  <div class="spacer"></div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
</style>
