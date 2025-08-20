<script lang="ts">
  import type { Customer } from '$interfaces/customer.interface';

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
                customerData.password === customerData.passwordConfirm);
  });

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function updateField(field: keyof Customer, value: string) {
    const updatedData = { ...customerData, [field]: value };
    customerData = updatedData;
    onUpdate(updatedData);
  }
</script>

<div class="contact-form">
  <div class="step-header">
    <h1>Ihre <span class="inner-text-special">Kontaktdaten</span></h1>
    <p class="teaser">
      Damit wir Ihnen ein individuelles Angebot erstellen können, benötigen wir Ihre Kontaktdaten. Diese werden vertraulich behandelt und nur für die
      Projektabwicklung verwendet.
    </p>
  </div>

  <div class="content-section">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Anrede -->
      <div class="form-control w-full">
        <label class="label" for="salutation">
          <span class="label-text font-semibold">Anrede:</span>
        </label>
        <select
          id="salutation"
          class="select select-bordered w-full"
          value={customerData.salutation || ''}
          onchange={(e) => updateField('salutation', e.currentTarget.value)}
        >
          <option value="">Bitte wählen...</option>
          <option value="Herr">Herr</option>
          <option value="Frau">Frau</option>
          <option value="Divers">Divers</option>
        </select>
      </div>

      <!-- Firma (optional) -->
      <div class="form-control w-full">
        <label class="label" for="company">
          <span class="label-text font-semibold">Firma (optional):</span>
        </label>
        <input
          type="text"
          id="company"
          class="input input-bordered w-full"
          value={customerData.company || ''}
          oninput={(e) => updateField('company', e.currentTarget.value)}
          placeholder="Firmenname..."
        />
      </div>

      <!-- Vorname -->
      <div class="form-control w-full">
        <label class="label" for="givenName">
          <span class="label-text font-semibold">Vorname: <span class="text-error">*</span></span>
        </label>
        <input
          type="text"
          id="givenName"
          class="input input-bordered w-full"
          class:input-error={customerData.givenName !== undefined && !customerData.givenName?.trim()}
          value={customerData.givenName || ''}
          oninput={(e) => updateField('givenName', e.currentTarget.value)}
          placeholder="Ihr Vorname..."
          required
        />
      </div>

      <!-- Nachname -->
      <div class="form-control w-full">
        <label class="label" for="familyName">
          <span class="label-text font-semibold">Nachname: <span class="text-error">*</span></span>
        </label>
        <input
          type="text"
          id="familyName"
          class="input input-bordered w-full"
          class:input-error={customerData.familyName !== undefined && !customerData.familyName?.trim()}
          value={customerData.familyName || ''}
          oninput={(e) => updateField('familyName', e.currentTarget.value)}
          placeholder="Ihr Nachname..."
          required
        />
      </div>

      <!-- E-Mail -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="email">
          <span class="label-text font-semibold">E-Mail-Adresse: <span class="text-error">*</span></span>
        </label>
        <input
          type="email"
          id="email"
          class="input input-bordered w-full"
          class:input-error={customerData.email !== undefined && (!customerData.email?.trim() || !isValidEmail(customerData.email))}
          value={customerData.email || ''}
          oninput={(e) => updateField('email', e.currentTarget.value)}
          placeholder="ihre.email@beispiel.de"
          required
        />
        {#if customerData.email && !isValidEmail(customerData.email)}
          <div class="label">
            <span class="label-text-alt text-error">Bitte geben Sie eine gültige E-Mail-Adresse ein</span>
          </div>
        {/if}
      </div>

      <!-- Telefon -->
      <div class="form-control w-full">
        <label class="label" for="phone">
          <span class="label-text font-semibold">Telefon (optional):</span>
        </label>
        <input
          type="tel"
          id="phone"
          class="input input-bordered w-full"
          value={customerData.phone || ''}
          oninput={(e) => updateField('phone', e.currentTarget.value)}
          placeholder="+49 123 456789"
        />
      </div>

      <!-- Adresse -->
      <div class="form-control w-full">
        <label class="label" for="address">
          <span class="label-text font-semibold">Straße & Hausnummer (optional):</span>
        </label>
        <input
          type="text"
          id="address"
          class="input input-bordered w-full"
          value={customerData.address || ''}
          oninput={(e) => updateField('address', e.currentTarget.value)}
          placeholder="Musterstraße 123"
        />
      </div>

      <!-- PLZ -->
      <div class="form-control w-full">
        <label class="label" for="postCode">
          <span class="label-text font-semibold">Postleitzahl (optional):</span>
        </label>
        <input
          type="text"
          id="postCode"
          class="input input-bordered w-full"
          value={customerData.postCode || ''}
          oninput={(e) => updateField('postCode', e.currentTarget.value)}
          placeholder="12345"
          maxlength="5"
        />
      </div>

      <!-- Stadt -->
      <div class="form-control w-full">
        <label class="label" for="city">
          <span class="label-text font-semibold">Stadt (optional):</span>
        </label>
        <input
          type="text"
          id="city"
          class="input input-bordered w-full"
          value={customerData.city || ''}
          oninput={(e) => updateField('city', e.currentTarget.value)}
          placeholder="Musterstadt"
        />
      </div>

      <!-- Land -->
      <div class="form-control w-full">
        <label class="label" for="country">
          <span class="label-text font-semibold">Land (optional):</span>
        </label>
        <select
          id="country"
          class="select select-bordered w-full"
          value={customerData.country || 'Deutschland'}
          onchange={(e) => updateField('country', e.currentTarget.value)}
        >
          <option value="Deutschland">Deutschland</option>
          <option value="Österreich">Österreich</option>
          <option value="Schweiz">Schweiz</option>
          <option value="Niederlande">Niederlande</option>
          <option value="Belgien">Belgien</option>
          <option value="Frankreich">Frankreich</option>
          <option value="Italien">Italien</option>
          <option value="Spanien">Spanien</option>
          <option value="Polen">Polen</option>
          <option value="Tschechien">Tschechien</option>
          <option value="Andere">Andere</option>
        </select>
      </div>

      <!-- Password -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="password">
          <span class="label-text font-semibold">Passwort: <span class="text-error">*</span></span>
        </label>
        <input
          type="password"
          id="password"
          class="input input-bordered w-full"
          class:input-error={customerData.password !== undefined && !customerData.password?.trim()}
          value={customerData.password || ''}
          oninput={(e) => updateField('password', e.currentTarget.value)}
          placeholder="Geben Sie ein sicheres Passwort ein"
          required
        />
      </div>

      <!-- Password Confirmation -->
      <div class="form-control w-full md:col-span-2">
        <label class="label" for="passwordConfirm">
          <span class="label-text font-semibold">Passwort bestätigen: <span class="text-error">*</span></span>
        </label>
        <input
          type="password"
          id="passwordConfirm"
          class="input input-bordered w-full"
          class:input-error={customerData.passwordConfirm !== undefined && customerData.password !== customerData.passwordConfirm}
          value={customerData.passwordConfirm || ''}
          oninput={(e) => updateField('passwordConfirm', e.currentTarget.value)}
          placeholder="Passwort erneut eingeben"
          required
        />
        {#if customerData.passwordConfirm && customerData.password !== customerData.passwordConfirm}
          <div class="label">
            <span class="label-text-alt text-error">Die Passwörter stimmen nicht überein</span>
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
          <div class="font-bold">Datenschutz</div>
          <div class="text-sm">
            Ihre Daten werden ausschließlich für die Bearbeitung Ihrer Projektanfrage verwendet und nicht an Dritte weitergegeben. Weitere Informationen finden
            Sie in unserer <a href="/datenschutz" class="link link-primary" target="_blank">Datenschutzerklärung</a>.
          </div>
        </div>
      </div>
    </div>

    <!-- Pflichtfeld-Hinweis -->
    <div class="mt-4">
      <p class="text-base-content/60 text-sm">
        <span class="text-error">*</span> Pflichtfelder sind für die Bearbeitung Ihrer Anfrage erforderlich.
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
