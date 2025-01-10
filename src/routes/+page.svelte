<script lang="ts">
  import SLIDER from '$lib/components/slider.svelte';
  import markdownit from 'markdown-it';

  export let data: any;

  const md = markdownit();

  function renderMarkdown(content: string) {
    return md.render(content);
  }
</script>

<svelte:head>
  <title>raspb Webservices</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<section class="home-content-wrapper">
  <div class="pb-8">
    <SLIDER></SLIDER>
  </div>

  <h1>Welcome to SvelteKit</h1>
  <p class="p2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veritatis doloribus ratione magni labore voluptatum totam a exercitationem quis incidunt
    accusamus cum reprehenderit tenetur velit, sint commodi ab saepe ipsam?
  </p>
  <div class="bigSpacer"></div>
  {#each data.contents as snippet}
    <h2>{snippet.headline}</h2>
    <h4>{snippet.subheadline}</h4>
    <div>{@html renderMarkdown(snippet.text)}</div>
    <div class="spacer"></div>
  {/each}

  <div class="big-spacer"></div>
</section>

<style lang="postcss">
  section.home-content-wrapper {
    @apply m-auto h-full w-full max-w-screen-xl px-4 py-12;
  }
</style>
