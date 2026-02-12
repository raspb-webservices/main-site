<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<Section noSpacing={true}>
  <div class="iframe-container">
    <iframe src="https://nextcloud.raspb.eu/apps/appointments/embed/QC0rcD04c8q8NbC1/form" width="500" height="700" title={m.appointment_iframe_title()}></iframe>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .iframe-container {
    @apply flex items-center justify-center w-full py-10;
    iframe {
      @apply md:scale-100 scale-70 rounded-2xl;
    }
  }
</style>
