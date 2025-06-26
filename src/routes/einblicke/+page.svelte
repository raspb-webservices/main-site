<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
</script>

<svelte:head>
  <title>raspb Webservices - Einblicke</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>Einblicke</h1>
    <p class="teaser no-padding">Vertrauen und Transparenz sind wichtig für eine gute Kundenbeziehhung. Hier möchten wir Einblicke in unserer Arbeit und einen typischen Projektablauf geben, damit glasklar ist, womit sie rechnen können.</p>
  </Section>

    <Section>
    <div class="animate-fade-in-up flex w-full flex-col items-center justify-center text-center max-w-4xl m-auto">
      <h1>Wir setzen <span class="inner-text-special">moderne Webtechnologien</span> ein</h1>
      <h3>Wir haben unseren eigenen Technologie-Stack entwickelt, der auf dem Jamstack basiert und alles einfacher, schneller und effizienter macht, ohne dabei Einschränkungen in Kauf nehmen zu müssen.</h3>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>