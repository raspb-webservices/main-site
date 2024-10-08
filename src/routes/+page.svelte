<script lang="ts">
  import { goto } from '$app/navigation';
  export let data: any;
</script>

<svelte:head>
  <title>raspb Webservices</title>
  <meta
    name="description"
    content="Hier kann eine Beschreibung stehen..."
  />
</svelte:head>
<section class="home-content-wrapper">
  <div class="container">
    <div class="inner-container">
      <h1>Welcome to SvelteKit</h1>
      <p class="p2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veritatis doloribus ratione magni labore voluptatum totam a exercitationem quis incidunt accusamus cum reprehenderit tenetur velit, sint commodi ab saepe ipsam?</p>
      <div class="bigSpacer"></div>
      {#each data.contents as snippet}
        <h2>{snippet.headline}</h2>
        <div class="spacer"></div>
      {/each}
    </div>
  </div>
  <div class="big-spacer"></div>
</section>