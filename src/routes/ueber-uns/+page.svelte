<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
</script>

<svelte:head>
  <title>raspb Webservices - Über uns</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>Über uns</h1>
    <p class="teaser no-padding">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, dolor soluta. Suscipit nemo ipsam nostrum sunt debitis. Voluptatum quam, quis dolore aspernatur, ab sed fugit neque laudantium, officiis quia quaerat?</p>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>