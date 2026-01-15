<script lang="ts">
  import type { Customer } from '$interfaces/customer.interface';
  import { m } from '$lib/paraglide/messages';

  interface Props {
    customerData: Partial<Customer>;
    onUpdate: (data: Partial<Customer>) => void;
    isValid?: boolean;
  }

  let { customerData = $bindable(), onUpdate, isValid = $bindable() }: Props = $props();

  // Reaktive Validierung
  $effect(() => {
    isValid = !!(
      customerData.givenName?.trim() &&
      customerData.familyName?.trim() &&
      customerData.email?.trim() &&
      isValidEmail(customerData.email) &&
      customerData.password?.trim() &&
      isValidPassword(customerData.password) &&
      customerData.password === customerData.passwordConfirm
    );
  });

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string): boolean {
    if (!password || password.length < 8) return false;

    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasSpecialChar && hasLowerCase && hasUpperCase && hasNumber;
  }

  function getPasswordValidationMessage(password: string): string {
    if (!password) return '';

    const requirements = [];
    if (password.length < 8) requirements.push('mindestens 8 Zeichen');
    if (!/[!@#$%^&*]/.test(password)) requirements.push('Sonderzeichen (!@#$%^&*)');
    if (!/[a-z]/.test(password)) requirements.push('Kleinbuchstaben (a-z)');
    if (!/[A-Z]/.test(password)) requirements.push('Großbuchstaben (A-Z)');
    if (!/[0-9]/.test(password)) requirements.push('Zahlen (0-9)');

    if (requirements.length === 0) return '';
    return `Passwort benötigt: ${requirements.join(', ')}`;
  }

  function updateField(field: keyof Customer, value: string) {
    const updatedData = { ...customerData, [field]: value };
    customerData = updatedData;
    onUpdate(updatedData);
  }
</script>

<div class="contact-form">
  <div class="step-header">
    <h1>{m['wizard_contactForm_title']()} <span class="inner-text-special">{m['wizard_contactForm_titleHighlight']()}</span></h1>
    <p class="teaser">
      {m['wizard_contactForm_teaser']()}
    </p>
  </div>

  <div class="content-section">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Anrede -->
      <div class="form-control w-full">
        <label class="label" for="salutation">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_salutation_label']()}</span>
        </label>
        <select
          id="salutation"
          class="select select-bordered w-full"
          value={customerData.salutation || ''}
          onchange={(e) => updateField('salutation', e.currentTarget.value)}
        >
          <option value="">{m['wizard_contactForm_fields_salutation_placeholder']()}</option>
          <option value="Herr">{m['wizard_contactForm_fields_salutation_options_herr']()}</option>
          <option value="Frau">{m['wizard_contactForm_fields_salutation_options_frau']()}</option>
          <option value="Divers">{m['wizard_contactForm_fields_salutation_options_divers']()}</option>
        </select>
      </div>

      <!-- Firma (optional) -->
      <div class="form-control w-full">
        <label class="label" for="company">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_company_label']()}</span>
        </label>
        <input
          type="text"
          id="company"
          class="input input-bordered w-full"
          value={customerData.company || ''}
          oninput={(e) => updateField('company', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_company_placeholder']()}
        />
      </div>

      <!-- Vorname -->
      <div class="form-control w-full">
        <label class="label" for="givenName">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_givenName_label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="text"
          id="givenName"
          class="input input-bordered w-full"
          class:input-error={customerData.givenName !== undefined && !customerData.givenName?.trim()}
          value={customerData.givenName || ''}
          oninput={(e) => updateField('givenName', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_givenName_placeholder']()}
          required
        />
      </div>

      <!-- Nachname -->
      <div class="form-control w-full">
        <label class="label" for="familyName">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_familyName_label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="text"
          id="familyName"
          class="input input-bordered w-full"
          class:input-error={customerData.familyName !== undefined && !customerData.familyName?.trim()}
          value={customerData.familyName || ''}
          oninput={(e) => updateField('familyName', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_familyName_placeholder']()}
          required
        />
      </div>

      <!-- E-Mail -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="email">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_email_label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="email"
          id="email"
          class="input input-bordered w-full"
          class:input-error={customerData.email !== undefined && (!customerData.email?.trim() || !isValidEmail(customerData.email))}
          value={customerData.email || ''}
          oninput={(e) => updateField('email', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_email_placeholder']()}
          required
        />
        {#if customerData.email && !isValidEmail(customerData.email)}
          <div class="label">
            <span class="label-text-alt text-error">{m['wizard_contactForm_fields_email_validation']()}</span>
          </div>
        {/if}
      </div>

      <!-- Telefon -->
      <div class="form-control w-full">
        <label class="label" for="phone">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_phone_label']()}</span>
        </label>
        <input
          type="tel"
          id="phone"
          class="input input-bordered w-full"
          value={customerData.phone || ''}
          oninput={(e) => updateField('phone', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_phone_placeholder']()}
        />
      </div>

      <!-- Adresse -->
      <div class="form-control w-full">
        <label class="label" for="address">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_address_label']()}</span>
        </label>
        <input
          type="text"
          id="address"
          class="input input-bordered w-full"
          value={customerData.address || ''}
          oninput={(e) => updateField('address', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_address_placeholder']()}
        />
      </div>

      <!-- PLZ -->
      <div class="form-control w-full">
        <label class="label" for="postCode">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_postCode_label']()}</span>
        </label>
        <input
          type="text"
          id="postCode"
          class="input input-bordered w-full"
          value={customerData.postCode || ''}
          oninput={(e) => updateField('postCode', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_postCode_placeholder']()}
          maxlength="5"
        />
      </div>

      <!-- Stadt -->
      <div class="form-control w-full">
        <label class="label" for="city">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_city_label']()}</span>
        </label>
        <input
          type="text"
          id="city"
          class="input input-bordered w-full"
          value={customerData.city || ''}
          oninput={(e) => updateField('city', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_city_placeholder']()}
        />
      </div>

      <!-- Land -->
      <div class="form-control w-full">
        <label class="label" for="country">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_country_label']()}</span>
        </label>
        <select
          id="country"
          class="select select-bordered w-full"
          value={customerData.country || 'Deutschland'}
          onchange={(e) => updateField('country', e.currentTarget.value)}
        >
          <option value="Deutschland">{m['wizard_contactForm_fields_country_options_deutschland']()}</option>
          <option value="Österreich">{m['wizard_contactForm_fields_country_options_oesterreich']()}</option>
          <option value="Schweiz">{m['wizard_contactForm_fields_country_options_schweiz']()}</option>
          <option value="Niederlande">{m['wizard_contactForm_fields_country_options_niederlande']()}</option>
          <option value="Belgien">{m['wizard_contactForm_fields_country_options_belgien']()}</option>
          <option value="Frankreich">{m['wizard_contactForm_fields_country_options_frankreich']()}</option>
          <option value="Italien">{m['wizard_contactForm_fields_country_options_italien']()}</option>
          <option value="Spanien">{m['wizard_contactForm_fields_country_options_spanien']()}</option>
          <option value="Polen">{m['wizard_contactForm_fields_country_options_polen']()}</option>
          <option value="Tschechien">{m['wizard_contactForm_fields_country_options_tschechien']()}</option>
          <option value="Andere">{m['wizard_contactForm_fields_country_options_andere']()}</option>
        </select>
      </div>

      <!-- Password -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="password">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_password_label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="password"
          id="password"
          class="input input-bordered w-full"
          class:input-error={customerData.password !== undefined && (!customerData.password?.trim() || !isValidPassword(customerData.password))}
          value={customerData.password || ''}
          oninput={(e) => updateField('password', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_password_placeholder']()}
          required
        />
        {#if customerData.password && !isValidPassword(customerData.password)}
          <div class="label">
            <span class="label-text-alt text-error">{getPasswordValidationMessage(customerData.password)}</span>
          </div>
        {/if}
      </div>

      <!-- Password Confirmation -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="passwordConfirm">
          <span class="label-text font-semibold">{m['wizard_contactForm_fields_passwordConfirm_label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="password"
          id="passwordConfirm"
          class="input input-bordered w-full"
          class:input-error={customerData.passwordConfirm !== undefined && customerData.password !== customerData.passwordConfirm}
          value={customerData.passwordConfirm || ''}
          oninput={(e) => updateField('passwordConfirm', e.currentTarget.value)}
          placeholder={m['wizard_contactForm_fields_passwordConfirm_placeholder']()}
          required
        />
        {#if customerData.passwordConfirm && customerData.password !== customerData.passwordConfirm}
          <div class="label">
            <span class="label-text-alt text-error">{m['wizard_contactForm_fields_passwordConfirm_validation']()}</span>
          </div>
        {/if}
      </div>
    </div>

    <!-- Hinweise -->
    <div class="mt-8">
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class="font-bold">{m['wizard_contactForm_privacy_title']()}</div>
          <div class="text-sm">
            {m['wizard_contactForm_privacy_description']()}
            <a href="/privacy-notice" class="link link-primary" target="_blank">{m['wizard_contactForm_privacy_link']()}</a>.
          </div>
        </div>
      </div>
    </div>

    <!-- Pflichtfeld-Hinweis -->
    <div class="mt-4">
      <p class="text-base-content/60 text-sm">
        <span class="text-error">*</span>
        {m['wizard_contactForm_requiredNote']()}
      </p>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference '../../../app.css';

  .contact-form {
    @apply w-full;
  }

  .step-header {
    @apply mb-8 text-center;

    h1 {
      @apply mb-4;
    }
  }

  .content-section {
    @apply space-y-6;
  }

  .form-control {
    @apply w-full;
  }

  .input-error {
    @apply border-error;
  }

  .link {
    @apply underline;
  }
</style>
