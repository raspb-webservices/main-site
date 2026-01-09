<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<section class="appointment-content-wrapper">
  <Stage style={'basic-gradient'}>
    <div class="inner-box reduced prose py-36">
      <h1 class="massive animate-fade-in-up">{m['appointment.title']()}</h1>
      <p class="teaser animate-fade-in-up">{m['appointment.subtitle']()}</p>

    </div>
  </Stage>

  <div class="spacer"></div>

  <Section customColor={'#fafafa'} noSpacing={true}>
    <iframe src="https://calendly.com/raspb-webservices/erstgespraech?hide_gdpr_banner=1" title="Termin vereinbaren" width="100%" height="900"></iframe>
  </Section>
</section>

<style lang="postcss">
  @reference '../../app.css';
</style>
