<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.privacyNotice_meta_title()}</title>
  <meta name="description" content={m.privacyNotice_meta_description()} />
  <meta property="og:title" content={m.privacyNotice_meta_title()} />
  <meta property="og:description" content={m.privacyNotice_meta_description()} />
</svelte:head>

<Section>
  <div class="privacy-notice-content prose">
    <h1>{m.privacyNotice_title()}</h1>
    <h2>{m.privacyNotice_section1_title()}</h2>
    <h3>{m.privacyNotice_generalNotice_title()}</h3>

    <p>{m.privacyNotice_generalNotice_text()}</p>

    <h3>{m.privacyNotice_section1_dataCollection_title()}</h3>
    <h4>{m.privacyNotice_section1_dataCollection_responsibleTitle()}</h4>
    <p>
      {m.privacyNotice_section1_dataCollection_responsibleText()}
    </p>

    <h4>{m.privacyNotice_section1_dataCollection_howCollectedTitle()}</h4>
    <p>
      {m.privacyNotice_section1_dataCollection_howCollectedText1()}
    </p>
    <p>
      {m.privacyNotice_section1_dataCollection_howCollectedText2()}
    </p>

    <h4>{m.privacyNotice_section1_dataCollection_purposeTitle()}</h4>
    <p>
      {m.privacyNotice_section1_dataCollection_purposeText()}
    </p>

    <h4>{m.privacyNotice_section1_dataCollection_rightsTitle()}</h4>
    <p>
      {m.privacyNotice_section1_dataCollection_rightsText()}
    </p>

    <h2>{m.privacyNotice_section2_title()}</h2>
    <h3>{m.privacyNotice_section2_netlify_title()}</h3>
    <p>
      {m.privacyNotice_section2_netlify_text1()}
    </p>
    <p>
      {m.privacyNotice_section2_netlify_text2()}
      <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">https://www.netlify.com/privacy/</a>.
    </p>
    <p>
      {m.privacyNotice_section2_netlify_text3()}
    </p>

    <h2>{m.privacyNotice_section3_title()}</h2>
    <h3>{m.privacyNotice_section3_dataProtection_title()}</h3>
    <p>
      {m.privacyNotice_section3_dataProtection_text1()}
    </p>
    <p>
      {m.privacyNotice_section3_dataProtection_text2()}
    </p>

    <h3>{m.privacyNotice_section3_responsibleBody_title()}</h3>
    <p>{m.privacyNotice_section3_responsibleBody_text1()}</p>

    <div class="contact-info">
      <p><strong>{m.privacyNotice_section3_responsibleBody_companyName()}</strong></p>
      <p>{m.privacyNotice_section3_responsibleBody_name()}</p>
      <p>{m.privacyNotice_section3_responsibleBody_address()}</p>
      <p>{m.privacyNotice_section3_responsibleBody_zipCity()}</p>
      <div class="spacer"></div>
      <p><strong>{m.privacyNotice_section3_responsibleBody_phone()}</strong> 06732 - 9648113</p>
      <p><strong>{m.privacyNotice_section3_responsibleBody_email()}</strong> <a href="mailto:contact@raspb.de">contact@raspb.de</a></p>
    </div>

    <div class="spacer"></div>

    <p>
      {m.privacyNotice_section3_responsibleBody_text2()}
    </p>

    <h3>{m.privacyNotice_section3_storageDuration_title()}</h3>
    <p>
      {m.privacyNotice_section3_storageDuration_text()}
    </p>

    <h3>{m.privacyNotice_section3_withdrawalOfConsent_title()}</h3>
    <p>
      {m.privacyNotice_section3_withdrawalOfConsent_text()}
    </p>

    <h3>{m.privacyNotice_section3_rightToComplain_title()}</h3>
    <p>
      {m.privacyNotice_section3_rightToComplain_text()}
    </p>

    <h3>{m.privacyNotice_section3_rightToDataPortability_title()}</h3>
    <p>
      {m.privacyNotice_section3_rightToDataPortability_text()}
    </p>

    <h2>{m.privacyNotice_section4_title()}</h2>

    <h3>{m.privacyNotice_section4_cookies_title()}</h3>
    <p>
      {m.privacyNotice_section4_cookies_text1()}
    </p>
    <p>
      {m.privacyNotice_section4_cookies_text2()}
    </p>
    <p>
      {m.privacyNotice_section4_cookies_text3()}
    </p>
    <p>
      {m.privacyNotice_section4_cookies_text4()}
    </p>

    <h3>{m.privacyNotice_section4_serverLogFiles_title()}</h3>
    <p>
      {m.privacyNotice_section4_serverLogFiles_text1()}
    </p>
    <ul class="basic-list">
      <li>{m.privacyNotice_section4_serverLogFiles_list_item1()}</li>
      <li>{m.privacyNotice_section4_serverLogFiles_list_item2()}</li>
      <li>{m.privacyNotice_section4_serverLogFiles_list_item3()}</li>
      <li>{m.privacyNotice_section4_serverLogFiles_list_item4()}</li>
      <li>{m.privacyNotice_section4_serverLogFiles_list_item5()}</li>
      <li>{m.privacyNotice_section4_serverLogFiles_list_item6()}</li>
    </ul>
    <p>{m.privacyNotice_section4_serverLogFiles_text2()}</p>
    <p>
      {m.privacyNotice_section4_serverLogFiles_text3()}
    </p>

    <h3>{m.privacyNotice_section4_contactForm_title()}</h3>
    <p>
      {m.privacyNotice_section4_contactForm_text1()}
    </p>
    <p>
      {m.privacyNotice_section4_contactForm_text2()}
    </p>
    <p>
      {m.privacyNotice_section4_contactForm_text3()}
    </p>

    <h2>{m.privacyNotice_section5_title()}</h2>

    <h3>{m.privacyNotice_section5_auth0_title()}</h3>
    <p>
      {m.privacyNotice_section5_auth0_text1()}
    </p>
    <p>
      {m.privacyNotice_section5_auth0_text2()}
    </p>
    <p>
      {m.privacyNotice_section5_auth0_text3()}
    </p>
    <p>
      {m.privacyNotice_section5_auth0_text4()}
      <a href="https://auth0.com/privacy" target="_blank" rel="noopener noreferrer">https://auth0.com/privacy</a>.
    </p>

    <h3>{m.privacyNotice_section5_hygraph_title()}</h3>
    <p>
      {m.privacyNotice_section5_hygraph_text1()}
    </p>
    <p>
      {m.privacyNotice_section5_hygraph_text2()}
    </p>
    <p>
      {m.privacyNotice_section5_hygraph_text3()}
    </p>
    <p>
      {m.privacyNotice_section5_hygraph_text4()}
      <a href="https://hygraph.com/privacy" target="_blank" rel="noopener noreferrer">https://hygraph.com/privacy</a>.
    </p>

    <h2>{m.privacyNotice_section6_title()}</h2>
    <p>{m.privacyNotice_section6_intro()}</p>
    <ul class="basic-list">
      <li>{m.privacyNotice_section6_rights_rightToInformation()}</li>
      <li>{m.privacyNotice_section6_rights_rightToCorrection()}</li>
      <li>{m.privacyNotice_section6_rights_rightToDeletion()}</li>
      <li>{m.privacyNotice_section6_rights_rightToRestriction()}</li>
      <li>{m.privacyNotice_section6_rights_rightToDataPortability()}</li>
      <li>{m.privacyNotice_section6_rights_rightToObject()}</li>
    </ul>
    <p>{m.privacyNotice_section6_contact()} <a href="mailto:contact@raspb.de">contact@raspb.de</a></p>

    <h2>{m.privacyNotice_section7_title()}</h2>
    <p>
      {m.privacyNotice_section7_text()}
    </p>

    <p><strong>{m.privacyNotice_section7_status()}</strong> {m.privacyNotice_section7_date()}</p>

    <div class="spacer"></div>

    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}
    >
      {m.privacyNotice_backToHomepage()}
    </button>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .privacy-notice-content {
    @apply max-w-5xl px-4;
  }
</style>
