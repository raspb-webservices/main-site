<script lang="ts">
  import { _ } from 'svelte-i18n';
  const target = "/thank-you"
</script>

<section class="contact-content-wrapper">
  <h1>{$_('contact.title')}</h1>
  <div class="px-20 pt-10">
    <p>{$_('contact.intro')}</p>

    <div class="spacer"></div>

    <form name="contact" method="POST" action="{target}" netlify>
      <input type="hidden" name="form-name" value="contact" />
      <div class="form-field-container">
        <div class="form-field-section">
          <label for="first-name">{$_('contact.form.firstNameLabel')}</label>
          <input type="text" id="first-name" name="first-name" placeholder="{$_('contact.form.firstNamePlaceholder')}" required />
        </div>
        <div class="form-field-section">
          <label for="last-name">{$_('contact.form.lastNameLabel')}</label>
          <input type="text" id="last-name" name="last-name" placeholder="{$_('contact.form.lastNamePlaceholder')}" required />
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width">
          <label for="email">{$_('contact.form.emailLabel')}</label>
          <input type="email" id="email" name="email" placeholder="{$_('contact.form.emailPlaceholder')}" required />
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width">
          <label for="phone">{$_('contact.form.phoneLabel')}</label>
          <input type="tel" id="phone" name="phone" placeholder="{$_('contact.form.phonePlaceholder')}" />
        </div>
      </div>

      <div class="form-field-container">
        <div class="form-field-section full-width">
          <label for="message">{$_('contact.form.messageLabel')}</label>
          <span class="additional-information"></span>
          <textarea id="message" name="message" rows="4" placeholder="" required></textarea>
        </div>
      </div>
      <div class="form-field-container">
        <div class="form-field-section full-width checkbox-dialog">
          <input id="dsgvo" name="dsgvo" type="checkbox" value="dsgvo-confirmed" class="is-checkbox accent-secondary" required />
          <label for="dsgvo">{$_('contact.form.dsgvoLabel')}</label>
        </div>
      </div>
      <div class="medium-spacer"></div>
      <button type="submit" class="btn-basic">{$_('contact.form.submitButton')}</button>
    </form>
  </div>

  <div class="big-spacer"></div>

</section>

<style lang="postcss">
  @reference '../../app.css';
  section.contact-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
    form {
      @apply w-full max-w-4xl;
      .form-field-container {
        @apply mb-4 grid w-full gap-6 md:grid-cols-2;
        .form-field-section {
          &.full-width {
            @apply col-span-full;
          }
          &.checkbox-dialog {
            @apply flex h-6 items-center;
            label {
              @apply !mb-0 !ml-3 cursor-pointer;
              &:hover {
                @apply text-mediumGrey;
              }
            }
          }
          label {
            @apply text-darkGrey mb-1 block text-base;

            &[for='first-name'],
            &[for='last-name'],
            &[for='email'],
            &[for='phone'],
            &[for='message'] {
              @apply pl-0.5 font-bold;
            }
          }
          input,
          textarea {
            @apply border-mediumGrey text-darkGrey focus:border-secondary focus:ring-secondary mt-1 block w-full border bg-white p-3 text-sm;
          }
          input.is-checkbox {
            @apply focus:ring-secondary mt-0 h-6 w-6 p-0 focus:ring-1;
          }

          .additional-information {
            @apply text-mediumGrey text-sm;
          }
        }
      }
    }
  }
</style>
