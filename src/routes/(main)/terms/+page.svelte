<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.terms_meta_title()}</title>
  <meta name="description" content={m.terms_meta_description()} />
  <meta property="og:title" content={m.terms_meta_title()} />
  <meta property="og:description" content={m.terms_meta_description()} />
</svelte:head>

<Section>
  <div class="terms-and-conditions-content prose">
    <h1>{m.terms_title()}</h1>
    <p class="subtitle">{m.terms_subtitle()}</p>
    <p class="stand">{m.terms_stand()}</p>

    <!-- § 1 -->
    <h2>{m.terms_section1_title()}</h2>
    <p>{m.terms_section1_1_text()}</p>
    <p>{m.terms_section1_2_text()}</p>
    <p>{m.terms_section1_3_text()}</p>
    <p>{m.terms_section1_4_text()}</p>

    <!-- § 2 -->
    <h2>{m.terms_section2_title()}</h2>
    <h3>{m.terms_section2_1_title()}</h3>
    <p>{m.terms_section2_1_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section2_1_list_a()}</li>
      <li>{m.terms_section2_1_list_b()}</li>
      <li>{m.terms_section2_1_list_c()}</li>
      <li>{m.terms_section2_1_list_d()}</li>
      <li>{m.terms_section2_1_list_e()}</li>
      <li>{m.terms_section2_1_list_f()}</li>
      <li>{m.terms_section2_1_list_g()}</li>
      <li>{m.terms_section2_1_list_h()}</li>
    </ul>
    <h3>{m.terms_section2_2_title()}</h3>
    <p>{m.terms_section2_2_text()}</p>
    <h3>{m.terms_section2_3_title()}</h3>
    <p>{m.terms_section2_3_text()}</p>
    <h3>{m.terms_section2_4_title()}</h3>
    <p>{m.terms_section2_4_text()}</p>

    <!-- § 3 -->
    <h2>{m.terms_section3_title()}</h2>
    <p>{m.terms_section3_1_text()}</p>
    <p>{m.terms_section3_2_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section3_2_list_a()}</li>
      <li>{m.terms_section3_2_list_b()}</li>
      <li>{m.terms_section3_2_list_c()}</li>
    </ul>
    <p>{m.terms_section3_3_text()}</p>
    <p>{m.terms_section3_4_text()}</p>

    <!-- § 4 -->
    <h2>{m.terms_section4_title()}</h2>
    <h3>{m.terms_section4_1_title()}</h3>
    <p>{m.terms_section4_1_text()}</p>
    <h3>{m.terms_section4_2_title()}</h3>
    <p>{m.terms_section4_2_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section4_2_list_a()}</li>
      <li>{m.terms_section4_2_list_b()}</li>
      <li>{m.terms_section4_2_list_c()}</li>
    </ul>
    <h3>{m.terms_section4_3_title()}</h3>
    <ul class="basic-list">
      <li>{m.terms_section4_3_list_a()}</li>
      <li>{m.terms_section4_3_list_b()}</li>
      <li>{m.terms_section4_3_list_c()}</li>
    </ul>
    <h3>{m.terms_section4_4_title()}</h3>
    <ul class="basic-list">
      <li>{m.terms_section4_4_list_a()}</li>
      <li>{m.terms_section4_4_list_b()}</li>
      <li>{m.terms_section4_4_list_c()}</li>
    </ul>
    <h3>{m.terms_section4_5_title()}</h3>
    <p>{m.terms_section4_5_text()}</p>
    <h3>{m.terms_section4_6_title()}</h3>
    <p>{m.terms_section4_6_text()}</p>

    <!-- § 5 -->
    <h2>{m.terms_section5_title()}</h2>
    <p>{m.terms_section5_1_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section5_1_list_a()}</li>
      <li>{m.terms_section5_1_list_b()}</li>
      <li>{m.terms_section5_1_list_c()}</li>
      <li>{m.terms_section5_1_list_d()}</li>
      <li>{m.terms_section5_1_list_e()}</li>
    </ul>
    <p>{m.terms_section5_2_text()}</p>
    <p>{m.terms_section5_3_text()}</p>

    <!-- § 6 -->
    <h2>{m.terms_section6_title()}</h2>
    <p>{m.terms_section6_1_text()}</p>
    <p>{m.terms_section6_2_text()}</p>
    <p>{m.terms_section6_3_text()}</p>
    <p>{m.terms_section6_4_text()}</p>

    <!-- § 7 -->
    <h2>{m.terms_section7_title()}</h2>
    <p>{m.terms_section7_1_text()}</p>
    <p>{m.terms_section7_2_text()}</p>
    <p>{m.terms_section7_3_text()}</p>
    <p>{m.terms_section7_4_text()}</p>

    <!-- § 8 -->
    <h2>{m.terms_section8_title()}</h2>
    <h3>{m.terms_section8_1_title()}</h3>
    <p>{m.terms_section8_1_text()}</p>
    <h3>{m.terms_section8_2_title()}</h3>
    <p>{m.terms_section8_2_text()}</p>
    <h3>{m.terms_section8_3_title()}</h3>
    <p>{m.terms_section8_3_text()}</p>
    <h3>{m.terms_section8_4_title()}</h3>
    <p>{m.terms_section8_4_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section8_4_list_a()}</li>
      <li>{m.terms_section8_4_list_b()}</li>
      <li>{m.terms_section8_4_list_c()}</li>
      <li>{m.terms_section8_4_list_d()}</li>
      <li>{m.terms_section8_4_list_e()}</li>
    </ul>
    <h3>{m.terms_section8_5_title()}</h3>
    <p>{m.terms_section8_5_text()}</p>

    <!-- § 9 -->
    <h2>{m.terms_section9_title()}</h2>
    <h3>{m.terms_section9_1_title()}</h3>
    <ul class="basic-list">
      <li>{m.terms_section9_1_list_a()}</li>
      <li>{m.terms_section9_1_list_b()}</li>
      <li>{m.terms_section9_1_list_c()}</li>
    </ul>
    <h3>{m.terms_section9_2_title()}</h3>
    <p>{m.terms_section9_2_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section9_2_list_a()}</li>
      <li>{m.terms_section9_2_list_b()}</li>
      <li>{m.terms_section9_2_list_c()}</li>
      <li>{m.terms_section9_2_list_d()}</li>
    </ul>
    <h3>{m.terms_section9_3_title()}</h3>
    <p>{m.terms_section9_3_text()}</p>

    <!-- § 10 -->
    <h2>{m.terms_section10_title()}</h2>
    <h3>{m.terms_section10_1_title()}</h3>
    <p>{m.terms_section10_1_text()}</p>
    <h3>{m.terms_section10_2_title()}</h3>
    <p>{m.terms_section10_2_text()}</p>
    <h3>{m.terms_section10_3_title()}</h3>
    <p>{m.terms_section10_3_text()}</p>
    <h3>{m.terms_section10_4_title()}</h3>
    <p>{m.terms_section10_4_text()}</p>
    <h3>{m.terms_section10_5_title()}</h3>
    <p>{m.terms_section10_5_text()}</p>

    <!-- § 11 -->
    <h2>{m.terms_section11_title()}</h2>
    <p>{m.terms_section11_1_text()}</p>
    <p>{m.terms_section11_2_text()}</p>
    <p>{m.terms_section11_3_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section11_3_list_a()}</li>
      <li>{m.terms_section11_3_list_b()}</li>
      <li>{m.terms_section11_3_list_c()}</li>
      <li>{m.terms_section11_3_list_d()}</li>
    </ul>
    <p>{m.terms_section11_4_text()}</p>

    <!-- § 12 -->
    <h2>{m.terms_section12_title()}</h2>
    <p>{m.terms_section12_1_text()}</p>
    <p>{m.terms_section12_2_text()}</p>
    <p>{m.terms_section12_3_text()}</p>
    <p>{m.terms_section12_4_text()}</p>

    <!-- § 13 -->
    <h2>{m.terms_section13_title()}</h2>
    <p>{m.terms_section13_1_text()}</p>
    <p>{m.terms_section13_2_text()}</p>
    <p>{m.terms_section13_3_text()}</p>

    <!-- § 14 -->
    <h2>{m.terms_section14_title()}</h2>
    <h3>{m.terms_section14_1_title()}</h3>
    <ul class="basic-list">
      <li>{m.terms_section14_1_list_a()}</li>
      <li>{m.terms_section14_1_list_b()}</li>
    </ul>
    <h3>{m.terms_section14_2_title()}</h3>
    <p>{m.terms_section14_2_intro()}</p>
    <ul class="basic-list">
      <li>{m.terms_section14_2_list_a()}</li>
      <li>{m.terms_section14_2_list_b()}</li>
      <li>{m.terms_section14_2_list_c()}</li>
    </ul>
    <h3>{m.terms_section14_3_title()}</h3>
    <ul class="basic-list">
      <li>{m.terms_section14_3_list_a()}</li>
      <li>{m.terms_section14_3_list_b()}</li>
      <li>{m.terms_section14_3_list_c()}</li>
    </ul>

    <!-- § 15 -->
    <h2>{m.terms_section15_title()}</h2>
    <h3>{m.terms_section15_1_title()}</h3>
    <p>{m.terms_section15_1_text()}</p>
    <h3>{m.terms_section15_2_title()}</h3>
    <p>{m.terms_section15_2_text()}</p>
    <h3>{m.terms_section15_3_title()}</h3>
    <p>{m.terms_section15_3_text()}</p>
    <h3>{m.terms_section15_4_title()}</h3>
    <p>{m.terms_section15_4_text()}</p>
    <h3>{m.terms_section15_5_title()}</h3>
    <p>{m.terms_section15_5_intro()}</p>
    <ol class="basic-list">
      <li>{m.terms_section15_5_list_1()}</li>
      <li>{m.terms_section15_5_list_2()}</li>
      <li>{m.terms_section15_5_list_3()}</li>
      <li>{m.terms_section15_5_list_4()}</li>
    </ol>

    <!-- Kontakt -->
    <h2>{m.terms_contact_title()}</h2>
    <div class="contact-info">
      <p><strong>{m.terms_contact_company()}</strong></p>
      <p>{m.terms_contact_address()}</p>
      <p><strong>{m.terms_contact_email_label()}</strong> <a href="mailto:kontakt@raspb.de">kontakt@raspb.de</a></p>
      <p><strong>{m.terms_contact_web_label()}</strong> <a href="https://raspb.de">raspb.de</a></p>
      <p>{m.terms_contact_ustid()}</p>
      <p>{m.terms_contact_hrb()}</p>
    </div>

    <div class="spacer"></div>

    <button
      class="btn-basic"
      onclick={() => {
        goto(resolve('/'));
      }}>{m.terms_backToHomepage()}</button
    >
  </div>
</Section>

<style lang="postcss">
  @reference '../../../app.css';
  .terms-and-conditions-content {
    @apply max-w-5xl px-4;
  }
  .subtitle {
    @apply text-base-content/60 mt-0;
  }
  .stand {
    @apply text-base-content/60 text-sm;
  }
  .contact-info {
    @apply flex flex-col gap-1;
  }
</style>
