<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$_('privacyNotice.meta.title')}</title>
  <meta name="description" content={$_('privacyNotice.meta.description')} />
</svelte:head>

<div class="content-area privacy-notice">
  <Section>
    <div class="inner-content-wrapper prose">
      <h1>{$_('privacyNotice.title')}</h1>

      <h2>{$_('privacyNotice.section1.title')}</h2>

      <h3>{$_('privacyNotice.generalNotice.title')}</h3>
      <p>{$_('privacyNotice.generalNotice.text')}</p>

      <h3>{$_('privacyNotice.section1.dataCollection.title')}</h3>
      <h4>{$_('privacyNotice.section1.dataCollection.responsibleTitle')}</h4>
      <p>
        {$_('privacyNotice.section1.dataCollection.responsibleText')}
      </p>

      <h4>{$_('privacyNotice.section1.dataCollection.howCollectedTitle')}</h4>
      <p>
        {$_('privacyNotice.section1.dataCollection.howCollectedText1')}
      </p>
      <p>
        {$_('privacyNotice.section1.dataCollection.howCollectedText2')}
      </p>

      <h4>{$_('privacyNotice.section1.dataCollection.purposeTitle')}</h4>
      <p>
        {$_('privacyNotice.section1.dataCollection.purposeText')}
      </p>

      <h4>{$_('privacyNotice.section1.dataCollection.rightsTitle')}</h4>
      <p>
        {$_('privacyNotice.section1.dataCollection.rightsText')}
      </p>

      <h2>{$_('privacyNotice.section2.title')}</h2>
      <h3>{$_('privacyNotice.section2.netlify.title')}</h3>
      <p>
        {$_('privacyNotice.section2.netlify.text1')}
      </p>
      <p>
        {$_('privacyNotice.section2.netlify.text2')}
        <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">https://www.netlify.com/privacy/</a>.
      </p>
      <p>
        {$_('privacyNotice.section2.netlify.text3')}
      </p>

      <h2>{$_('privacyNotice.section3.title')}</h2>

      <h3>{$_('privacyNotice.section3.dataProtection.title')}</h3>
      <p>
        {$_('privacyNotice.section3.dataProtection.text1')}
      </p>
      <p>
        {$_('privacyNotice.section3.dataProtection.text2')}
      </p>

      <h3>{$_('privacyNotice.section3.responsibleBody.title')}</h3>
      <p>{$_('privacyNotice.section3.responsibleBody.text1')}</p>
      <div class="contact-info prose">
        <p>
          <strong>{$_('privacyNotice.section3.responsibleBody.companyName')}</strong><br />
          {$_('privacyNotice.section3.responsibleBody.name')}<br />
          {$_('privacyNotice.section3.responsibleBody.address')}<br />
          {$_('privacyNotice.section3.responsibleBody.zipCity')}
        </p>
        <p>
          <strong>{$_('privacyNotice.section3.responsibleBody.phone')}</strong> 06732 - 9648113<br />
          <strong>{$_('privacyNotice.section3.responsibleBody.email')}</strong> <a href="mailto:contact@raspb.de">contact@raspb.de</a>
        </p>
      </div>
      <p>
        {$_('privacyNotice.section3.responsibleBody.text2')}
      </p>

      <h3>{$_('privacyNotice.section3.storageDuration.title')}</h3>
      <p>
        {$_('privacyNotice.section3.storageDuration.text')}
      </p>

      <h3>{$_('privacyNotice.section3.withdrawalOfConsent.title')}</h3>
      <p>
        {$_('privacyNotice.section3.withdrawalOfConsent.text')}
      </p>

      <h3>{$_('privacyNotice.section3.rightToComplain.title')}</h3>
      <p>
        {$_('privacyNotice.section3.rightToComplain.text')}
      </p>

      <h3>{$_('privacyNotice.section3.rightToDataPortability.title')}</h3>
      <p>
        {$_('privacyNotice.section3.rightToDataPortability.text')}
      </p>

      <h2>{$_('privacyNotice.section4.title')}</h2>

      <h3>{$_('privacyNotice.section4.cookies.title')}</h3>
      <p>
        {$_('privacyNotice.section4.cookies.text1')}
      </p>

      <p>
        {$_('privacyNotice.section4.cookies.text2')}
      </p>

      <p>
        {$_('privacyNotice.section4.cookies.text3')}
      </p>

      <p>
        {$_('privacyNotice.section4.cookies.text4')}
      </p>

      <h3>{$_('privacyNotice.section4.serverLogFiles.title')}</h3>
      <p>
        {$_('privacyNotice.section4.serverLogFiles.text1')}
      </p>
      <ul>
        <li>{$_('privacyNotice.section4.serverLogFiles.list.item1')}</li>
        <li>{$_('privacyNotice.section4.serverLogFiles.list.item2')}</li>
        <li>{$_('privacyNotice.section4.serverLogFiles.list.item3')}</li>
        <li>{$_('privacyNotice.section4.serverLogFiles.list.item4')}</li>
        <li>{$_('privacyNotice.section4.serverLogFiles.list.item5')}</li>
        <li>{$_('privacyNotice.section4.serverLogFiles.list.item6')}</li>
      </ul>
      <p>{$_('privacyNotice.section4.serverLogFiles.text2')}</p>
      <p>
        {$_('privacyNotice.section4.serverLogFiles.text3')}
      </p>

      <h3>{$_('privacyNotice.section4.contactForm.title')}</h3>
      <p>
        {$_('privacyNotice.section4.contactForm.text1')}
      </p>
      <p>
        {$_('privacyNotice.section4.contactForm.text2')}
      </p>
      <p>
        {$_('privacyNotice.section4.contactForm.text3')}
      </p>

      <h2>{$_('privacyNotice.section5.title')}</h2>

      <h3>{$_('privacyNotice.section5.auth0.title')}</h3>
      <p>
        {$_('privacyNotice.section5.auth0.text1')}
      </p>
      <p>
        {$_('privacyNotice.section5.auth0.text2')}
      </p>
      <p>
        {$_('privacyNotice.section5.auth0.text3')}
      </p>
      <p>
        {$_('privacyNotice.section5.auth0.text4')}
        <a href="https://auth0.com/privacy" target="_blank" rel="noopener noreferrer">https://auth0.com/privacy</a>.
      </p>

      <h3>{$_('privacyNotice.section5.hygraph.title')}</h3>
      <p>
        {$_('privacyNotice.section5.hygraph.text1')}
      </p>
      <p>
        {$_('privacyNotice.section5.hygraph.text2')}
      </p>
      <p>
        {$_('privacyNotice.section5.hygraph.text3')}
      </p>
      <p>
        {$_('privacyNotice.section5.hygraph.text4')}
        <a href="https://hygraph.com/privacy" target="_blank" rel="noopener noreferrer">https://hygraph.com/privacy</a>.
      </p>

      <h2>{$_('privacyNotice.section6.title')}</h2>
      <p>{$_('privacyNotice.section6.intro')}</p>
      <ul>
        <li><strong>{$_('privacyNotice.section6.rights.rightToInformation')}</strong></li>
        <li><strong>{$_('privacyNotice.section6.rights.rightToCorrection')}</strong></li>
        <li><strong>{$_('privacyNotice.section6.rights.rightToDeletion')}</strong></li>
        <li><strong>{$_('privacyNotice.section6.rights.rightToRestriction')}</strong></li>
        <li><strong>{$_('privacyNotice.section6.rights.rightToDataPortability')}</strong></li>
        <li><strong>{$_('privacyNotice.section6.rights.rightToObject')}</strong></li>
      </ul>
      <p>{$_('privacyNotice.section6.contact')} <a href="mailto:contact@raspb.de">contact@raspb.de</a></p>

      <h2>{$_('privacyNotice.section7.title')}</h2>
      <p>
        {$_('privacyNotice.section7.text')}
      </p>

      <p><strong>{$_('privacyNotice.section7.status')}</strong> {$_('privacyNotice.section7.date')}</p>

      <div class="spacer"></div>

      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>{$_('privacyNotice.backToHomepage')}</button
      >
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
  .content-area.privacy-notice {
    ul {
      @apply mb-7 pl-5;
      list-style-type: square;
      li {
        @apply p-1 text-lg font-light;
        &::marker {
          @apply text-primary;
        }
      }
    }
  }
</style>
