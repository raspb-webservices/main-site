<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
  import { getLocale } from '$lib/paraglide/runtime';
</script>

<svelte:head>
  <title>{m.imprint_meta_title()}</title>
  <meta name="description" content={m.imprint_meta_description()} />
  <meta property="og:title" content={m.imprint_meta_title()} />
  <meta property="og:description" content={m.imprint_meta_description()} />
</svelte:head>

<Section>
  <div class="imprint-content prose">
    <h1>{m.imprint_title()}</h1>
    <h2>{m.imprint_section5TMG()}</h2>

    <div class="contact-info">
      <p><strong>{m.imprint_companyName()}</strong></p>
      <p>{m.imprint_address()}</p>
      <p>{m.imprint_zipCity()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_representedBy()}</h3>
    <div class="details-wrapper">
      <p>{m.imprint_representative()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_contact()}</h3>
    <div class="details-wrapper">
      <p><strong>{m.imprint_phone()}</strong> {m.imprint_phone_no()}</p>
      <p><strong>{m.imprint_fax()}</strong> {m.imprint_fax_no()}</p>
      <p><strong>{m.imprint_email()}</strong> <a href="mailto:{m.imprint_email_address()}">{m.imprint_email_address()}</a></p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_registerEntry()}</h3>
    <div class="details-wrapper">
      <p>{m.imprint_companyInFormation()}</p>
      <div class="medium-spacer"></div>
      <p><strong>{m.imprint_registerCourt()}</strong> {m.imprint_registerCourt_name()}</p>
      <p><strong>{m.imprint_registerEntity()}</strong> {m.imprint_registerEntity_name()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_vatId()}</h3>
    <div class="details-wrapper">
      <p>{m.imprint_vatIdText()}</p>
      <p>{m.imprint_vatIdPending()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_professionalLiabilityInsurance()}</h3>
    <div class="details-wrapper">
      <p><strong>{m.imprint_insurerNameAndAddress()}</strong></p>
      <p>{m.imprint_insurerName()}</p>
      <p>{m.imprint_insurerAddress()}</p>
      <p>{m.imprint_insurerZipCity()}</p>

      <div class="spacer"></div>

      <p><strong>{m.imprint_insuranceCoverage()}</strong></p>
      <p>{m.imprint_insuranceCoverageText()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_euDisputeResolution()}</h3>
    <div class="details-wrapper">
      <p>
        {m.imprint_euDisputeResolutionText()}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>
      </p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_consumerDisputeResolution()}</h3>
    <div class="details-wrapper">
      <p>{m.imprint_consumerDisputeResolutionText()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_liabilityForContent()}</h3>
    <div class="details-wrapper prose">
      <p>
        {m.imprint_liabilityForContentText1()}
      </p>
      <p>
        {m.imprint_liabilityForContentText2()}
      </p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_editoriallyResponsible()}</h3>
    <div class="details-wrapper">
      <p>{m.imprint_representative()}</p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_liabilityForLinks()}</h3>
    <div class="details-wrapper prose">
      <p>
        {m.imprint_liabilityForLinksText1()}
      </p>
      <p>
        {m.imprint_liabilityForLinksText2()}
      </p>
    </div>

    <div class="spacer"></div>

    <h3>{m.imprint_copyright()}</h3>
    <div class="details-wrapper prose">
      <p>
        {m.imprint_copyrightText1()}
      </p>
      <p>
        {m.imprint_copyrightText2()}
      </p>
    </div>

    <div class="spacer"></div>

    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}
    >
      {m.imprint_backToHomepage()}
    </button>

    <div class="spacer"></div>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .imprint-content {
    @apply max-w-5xl px-4;
  }
</style>
