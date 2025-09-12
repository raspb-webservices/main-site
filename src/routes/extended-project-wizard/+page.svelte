<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import Wizard from '$lib/components/wizard/wizard.svelte';
</script>

<svelte:head>
  <title>Extended Wizard</title>
  <meta name="description" content="Extended Wizard" />
</svelte:head>

<Section>
  <div class="prose">
    <h1>Extended <span class="inner-text-special">Projekt</span>-Konfigurator</h1>
    <p class="teaser">
      Die volle Projekt-Konfigurator Erfahrung erhalten Sie hier im extended Wizard. Wenn Sie das möchten, können Sie hier bereits alle Details des anstehenden
      Projekts erfassen. Bestimmen Sie neben Features, Struktur und Design auch die Inhalte für jede Seite oder beschreiben Sonderwünsche. Die hier erfassten
      Projekte können direkt beauftrag werden und Ergbenisse stehen in Rekortzeit zur Verfügung.
    </p>
    <div class="spacer"></div>
    <div class="wizard-section" id="wizard">
      <Wizard></Wizard>
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .wizard-section {
    @apply mb-16;
  }
</style>
