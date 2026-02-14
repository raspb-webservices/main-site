<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.appointment_meta_title()}</title>
  <meta name="description" content={m.appointment_meta_description()} />
  <meta property="og:title" content={m.appointment_meta_title()} />
  <meta property="og:description" content={m.appointment_meta_description()} />
</svelte:head>

<Section noSpacing={true}>
  <div class="iframe-container">
    <iframe src="https://nextcloud.raspb.eu/apps/appointments/embed/QC0rcD04c8q8NbC1/form" width="500" height="700" title={m.appointment_iframe_title()}
    ></iframe>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .iframe-container {
    @apply flex w-full items-center justify-center py-10;
    iframe {
      @apply scale-70 rounded-2xl md:scale-100;
    }
  }
</style>
