<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m['imprint_meta_title']()}</title>
  <meta name="description" content={m['imprint_meta_description']()} />
</svelte:head>

<Section>
  <div class="imprint-content prose">
    <h1>{m['imprint_title']()}</h1>

    <h2>{m['imprint_section5TMG']()}</h2>
    <div class="contact-info">
      <p class="no-padding"><strong>{m['imprint_companyName']()}</strong></p>
      <p>{m['imprint_address']()}<br />{m['imprint_zipCity']()}</p>
    </div>
    <div class="spacer"></div>
    <h3>{m['imprint_representedBy']()}</h3>
    <p>Markus Härtig</p>

    <h3>{m['imprint_contact']()}</h3>
    <div class="contact-details">
      <p class="no-padding"><strong>{m['imprint_phone']()}</strong> 06732 - 9648113</p>
      <p><strong>{m['imprint_email']()}</strong> <a href="mailto:contact@raspb.de">contact@raspb.de</a></p>
    </div>

    <div class="spacer"></div>

    <h3>{m['imprint_registerEntry']()}</h3>
    <p>{m['imprint_companyInFormation']()}</p>

    <h3>{m['imprint_vatId']()}</h3>
    <p>
      {m['imprint_vatIdText']()}<br />
      {m['imprint_vatIdPending']()}
    </p>

    <h3>{m['imprint_euDisputeResolution']()}</h3>
    <p>
      {m['imprint_euDisputeResolutionText']()}
      <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a><br />
      {m['imprint_euDisputeResolutionEmail']()}
    </p>

    <h3>{m['imprint_consumerDisputeResolution']()}</h3>
    <p>{m['imprint_consumerDisputeResolutionText']()}</p>

    <h3>{m['imprint_liabilityForContent']()}</h3>
    <p>
      {m['imprint_liabilityForContentText1']()}
    </p>

    <p>
      {m['imprint_liabilityForContentText2']()}
    </p>

    <h3>{m['imprint_liabilityForLinks']()}</h3>
    <p>
      {m['imprint_liabilityForLinksText1']()}
    </p>

    <p>
      {m['imprint_liabilityForLinksText2']()}
    </p>

    <h3>{m['imprint_copyright']()}</h3>
    <p>
      {m['imprint_copyrightText1']()}
    </p>

    <p>
      {m['imprint_copyrightText2']()}
    </p>

    <div class="spacer"></div>
    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}>{m['imprint_backToHomepage']()}</button
    >
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .imprint-content {
    @apply px-4;
  }
</style>
