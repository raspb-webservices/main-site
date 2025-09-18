<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$_('imprint.meta.title')}</title>
  <meta name="description" content={$_('imprint.meta.description')} />
</svelte:head>

  <Section>
    <div class="imprint-content prose">
      <h1>{$_('imprint.title')}</h1>

      <h2>{$_('imprint.section5TMG')}</h2>
      <div class="contact-info">
        <p class="no-padding"><strong>{$_('imprint.companyName')}</strong></p>
        <p>{$_('imprint.address')}<br />{$_('imprint.zipCity')}</p>
      </div>
      <div class="spacer"></div>
      <h3>{$_('imprint.representedBy')}</h3>
      <p>Markus Härtig</p>

      <h3>{$_('imprint.contact')}</h3>
      <div class="contact-details">
        <p class="no-padding"><strong>{$_('imprint.phone')}</strong> 06732 - 9648113</p>
        <p><strong>{$_('imprint.email')}</strong> <a href="mailto:contact@raspb.de">contact@raspb.de</a></p>
      </div>

      <div class="spacer"></div>

      <h3>{$_('imprint.registerEntry')}</h3>
      <p>{$_('imprint.companyInFormation')}</p>

      <h3>{$_('imprint.vatId')}</h3>
      <p>
        {$_('imprint.vatIdText')}<br />
        {$_('imprint.vatIdPending')}
      </p>

      <h3>{$_('imprint.euDisputeResolution')}</h3>
      <p>
        {$_('imprint.euDisputeResolutionText')}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a><br />
        {$_('imprint.euDisputeResolutionEmail')}
      </p>

      <h3>{$_('imprint.consumerDisputeResolution')}</h3>
      <p>{$_('imprint.consumerDisputeResolutionText')}</p>

      <h3>{$_('imprint.liabilityForContent')}</h3>
      <p>
        {$_('imprint.liabilityForContentText1')}
      </p>

      <p>
        {$_('imprint.liabilityForContentText2')}
      </p>

      <h3>{$_('imprint.liabilityForLinks')}</h3>
      <p>
        {$_('imprint.liabilityForLinksText1')}
      </p>

      <p>
        {$_('imprint.liabilityForLinksText2')}
      </p>

      <h3>{$_('imprint.copyright')}</h3>
      <p>
        {$_('imprint.copyrightText1')}
      </p>

      <p>
        {$_('imprint.copyrightText2')}
      </p>

      <div class="spacer"></div>
      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>{$_('imprint.backToHomepage')}</button
      >
    </div>
  </Section>


<style lang="postcss">
  @reference '../../app.css';
  .imprint-content {
    @apply px-4;
  }
</style>
