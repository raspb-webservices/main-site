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
    isValid = !!(customerData.givenName?.trim() && 
                customerData.familyName?.trim() && 
                customerData.email?.trim() && 
                isValidEmail(customerData.email) && 
                customerData.password?.trim() && 
                isValidPassword(customerData.password) &&
                customerData.password === customerData.passwordConfirm);
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
    <h1>{m['wizard.contactForm.title']()} <span class="inner-text-special">{m['wizard.contactForm.titleHighlight']()}</span></h1>
    <p class="teaser">
      {m['wizard.contactForm.teaser']()}
    </p>
  </div>

  <div class="content-section">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Anrede -->
      <div class="form-control w-full">
        <label class="label" for="salutation">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.salutation.label']()}</span>
        </label>
        <select
          id="salutation"
          class="select select-bordered w-full"
          value={customerData.salutation || ''}
          onchange={(e) => updateField('salutation', e.currentTarget.value)}
        >
          <option value="">{m['wizard.contactForm.fields.salutation.placeholder']()}</option>
          <option value="Herr">{m['wizard.contactForm.fields.salutation.options.herr']()}</option>
          <option value="Frau">{m['wizard.contactForm.fields.salutation.options.frau']()}</option>
          <option value="Divers">{m['wizard.contactForm.fields.salutation.options.divers']()}</option>
        </select>
      </div>

      <!-- Firma (optional) -->
      <div class="form-control w-full">
        <label class="label" for="company">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.company.label']()}</span>
        </label>
        <input
          type="text"
          id="company"
          class="input input-bordered w-full"
          value={customerData.company || ''}
          oninput={(e) => updateField('company', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.company.placeholder']()}
        />
      </div>

      <!-- Vorname -->
      <div class="form-control w-full">
        <label class="label" for="givenName">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.givenName.label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="text"
          id="givenName"
          class="input input-bordered w-full"
          class:input-error={customerData.givenName !== undefined && !customerData.givenName?.trim()}
          value={customerData.givenName || ''}
          oninput={(e) => updateField('givenName', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.givenName.placeholder']()}
          required
        />
      </div>

      <!-- Nachname -->
      <div class="form-control w-full">
        <label class="label" for="familyName">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.familyName.label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="text"
          id="familyName"
          class="input input-bordered w-full"
          class:input-error={customerData.familyName !== undefined && !customerData.familyName?.trim()}
          value={customerData.familyName || ''}
          oninput={(e) => updateField('familyName', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.familyName.placeholder']()}
          required
        />
      </div>

      <!-- E-Mail -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="email">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.email.label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="email"
          id="email"
          class="input input-bordered w-full"
          class:input-error={customerData.email !== undefined && (!customerData.email?.trim() || !isValidEmail(customerData.email))}
          value={customerData.email || ''}
          oninput={(e) => updateField('email', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.email.placeholder']()}
          required
        />
        {#if customerData.email && !isValidEmail(customerData.email)}
          <div class="label">
            <span class="label-text-alt text-error">{m['wizard.contactForm.fields.email.validation']()}</span>
          </div>
        {/if}
      </div>

      <!-- Telefon -->
      <div class="form-control w-full">
        <label class="label" for="phone">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.phone.label']()}</span>
        </label>
        <input
          type="tel"
          id="phone"
          class="input input-bordered w-full"
          value={customerData.phone || ''}
          oninput={(e) => updateField('phone', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.phone.placeholder']()}
        />
      </div>

      <!-- Adresse -->
      <div class="form-control w-full">
        <label class="label" for="address">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.address.label']()}</span>
        </label>
        <input
          type="text"
          id="address"
          class="input input-bordered w-full"
          value={customerData.address || ''}
          oninput={(e) => updateField('address', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.address.placeholder']()}
        />
      </div>

      <!-- PLZ -->
      <div class="form-control w-full">
        <label class="label" for="postCode">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.postCode.label']()}</span>
        </label>
        <input
          type="text"
          id="postCode"
          class="input input-bordered w-full"
          value={customerData.postCode || ''}
          oninput={(e) => updateField('postCode', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.postCode.placeholder']()}
          maxlength="5"
        />
      </div>

      <!-- Stadt -->
      <div class="form-control w-full">
        <label class="label" for="city">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.city.label']()}</span>
        </label>
        <input
          type="text"
          id="city"
          class="input input-bordered w-full"
          value={customerData.city || ''}
          oninput={(e) => updateField('city', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.city.placeholder']()}
        />
      </div>

      <!-- Land -->
      <div class="form-control w-full">
        <label class="label" for="country">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.country.label']()}</span>
        </label>
        <select
          id="country"
          class="select select-bordered w-full"
          value={customerData.country || 'Deutschland'}
          onchange={(e) => updateField('country', e.currentTarget.value)}
        >
          <option value="Deutschland">{m['wizard.contactForm.fields.country.options.deutschland']()}</option>
          <option value="Österreich">{m['wizard.contactForm.fields.country.options.oesterreich']()}</option>
          <option value="Schweiz">{m['wizard.contactForm.fields.country.options.schweiz']()}</option>
          <option value="Niederlande">{m['wizard.contactForm.fields.country.options.niederlande']()}</option>
          <option value="Belgien">{m['wizard.contactForm.fields.country.options.belgien']()}</option>
          <option value="Frankreich">{m['wizard.contactForm.fields.country.options.frankreich']()}</option>
          <option value="Italien">{m['wizard.contactForm.fields.country.options.italien']()}</option>
          <option value="Spanien">{m['wizard.contactForm.fields.country.options.spanien']()}</option>
          <option value="Polen">{m['wizard.contactForm.fields.country.options.polen']()}</option>
          <option value="Tschechien">{m['wizard.contactForm.fields.country.options.tschechien']()}</option>
          <option value="Andere">{m['wizard.contactForm.fields.country.options.andere']()}</option>
        </select>
      </div>

      <!-- Password -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="password">
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.password.label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="password"
          id="password"
          class="input input-bordered w-full"
          class:input-error={customerData.password !== undefined && (!customerData.password?.trim() || !isValidPassword(customerData.password))}
          value={customerData.password || ''}
          oninput={(e) => updateField('password', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.password.placeholder']()}
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
          <span class="label-text font-semibold">{m['wizard.contactForm.fields.passwordConfirm.label']()} <span class="text-error">*</span></span>
        </label>
        <input
          type="password"
          id="passwordConfirm"
          class="input input-bordered w-full"
          class:input-error={customerData.passwordConfirm !== undefined && customerData.password !== customerData.passwordConfirm}
          value={customerData.passwordConfirm || ''}
          oninput={(e) => updateField('passwordConfirm', e.currentTarget.value)}
          placeholder={m['wizard.contactForm.fields.passwordConfirm.placeholder']()}
          required
        />
        {#if customerData.passwordConfirm && customerData.password !== customerData.passwordConfirm}
          <div class="label">
            <span class="label-text-alt text-error">{m['wizard.contactForm.fields.passwordConfirm.validation']()}</span>
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
          <div class="font-bold">{m['wizard.contactForm.privacy.title']()}</div>
          <div class="text-sm">
            {m['wizard.contactForm.privacy.description']()} <a href="/privacy-notice" class="link link-primary" target="_blank">{m['wizard.contactForm.privacy.link']()}</a>.
          </div>
        </div>
      </div>
    </div>

    <!-- Pflichtfeld-Hinweis -->
    <div class="mt-4">
      <p class="text-base-content/60 text-sm">
        <span class="text-error">*</span> {m['wizard.contactForm.requiredNote']()}
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
