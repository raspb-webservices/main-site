<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m['imprint.meta.title']()}</title>
  <meta name="description" content={m['imprint.meta.description']()} />
</svelte:head>

  <Section>
    <div class="imprint-content prose">
      <h1>{m['imprint.title']()}</h1>

      <h2>{m['imprint.section5TMG']()}</h2>
      <div class="contact-info">
        <p class="no-padding"><strong>{m['imprint.companyName']()}</strong></p>
        <p>{m['imprint.address']()}<br />{m['imprint.zipCity']()}</p>
      </div>
      <div class="spacer"></div>
      <h3>{m['imprint.representedBy']()}</h3>
      <p>Markus Härtig</p>

      <h3>{m['imprint.contact']()}</h3>
      <div class="contact-details">
        <p class="no-padding"><strong>{m['imprint.phone']()}</strong> 06732 - 9648113</p>
        <p><strong>{m['imprint.email']()}</strong> <a href="mailto:contact@raspb.de">contact@raspb.de</a></p>
      </div>

      <div class="spacer"></div>

      <h3>{m['imprint.registerEntry']()}</h3>
      <p>{m['imprint.companyInFormation']()}</p>

      <h3>{m['imprint.vatId']()}</h3>
      <p>
        {m['imprint.vatIdText']()}<br />
        {m['imprint.vatIdPending']()}
      </p>

      <h3>{m['imprint.euDisputeResolution']()}</h3>
      <p>
        {m['imprint.euDisputeResolutionText']()}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a><br />
        {m['imprint.euDisputeResolutionEmail']()}
      </p>

      <h3>{m['imprint.consumerDisputeResolution']()}</h3>
      <p>{m['imprint.consumerDisputeResolutionText']()}</p>

      <h3>{m['imprint.liabilityForContent']()}</h3>
      <p>
        {m['imprint.liabilityForContentText1']()}
      </p>

      <p>
        {m['imprint.liabilityForContentText2']()}
      </p>

      <h3>{m['imprint.liabilityForLinks']()}</h3>
      <p>
        {m['imprint.liabilityForLinksText1']()}
      </p>

      <p>
        {m['imprint.liabilityForLinksText2']()}
      </p>

      <h3>{m['imprint.copyright']()}</h3>
      <p>
        {m['imprint.copyrightText1']()}
      </p>

      <p>
        {m['imprint.copyrightText2']()}
      </p>

      <div class="spacer"></div>
      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>{m['imprint.backToHomepage']()}</button
      >
    </div>
  </Section>


<style lang="postcss">
  @reference '../../app.css';
  .imprint-content {
    @apply px-4;
  }
</style>
