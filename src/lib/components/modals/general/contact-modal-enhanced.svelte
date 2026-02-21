<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';

  let { projectData } = $props();
  let modal: HTMLDialogElement;
  let isLoading = $state(false);
  let error = $state('');
  let success = $state(false);

  // Customer data
  let salutation = $state('');
  let givenName = $state('');
  let familyName = $state('');
  let email = $state('');
  let phone = $state('');
  let company = $state('');
  let address = $state('');
  let postCode = $state('');
  let city = $state('');
  let country = $state('Deutschland');
  let acceptPrivacy = $state(false);

  export function openModal() {
    resetForm();
    modal?.showModal();
  }

  export function closeModal() {
    modal?.close();
  }

  function resetForm() {
    salutation = '';
    givenName = '';
    familyName = '';
    email = '';
    phone = '';
    company = '';
    address = '';
    postCode = '';
    city = '';
    country = 'Deutschland';
    acceptPrivacy = false;
    error = '';
    success = false;
    isLoading = false;
  }

  function validateForm() {
    if (!salutation) {
      error = 'Bitte wählen Sie eine Anrede.';
      return false;
    }
    if (!givenName.trim()) {
      error = 'Bitte geben Sie Ihren Vornamen an.';
      return false;
    }
    if (!familyName.trim()) {
      error = 'Bitte geben Sie Ihren Nachnamen an.';
      return false;
    }
    if (!email.trim()) {
      error = 'Bitte geben Sie Ihre Email-Adresse an.';
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = 'Bitte geben Sie eine gültige Email-Adresse an.';
      return false;
    }
    if (!company.trim()) {
      error = 'Bitte geben Sie Ihre Firma/Organisation an.';
      return false;
    }
    if (!acceptPrivacy) {
      error = 'Bitte akzeptieren Sie die Datenschutzbestimmungen.';
      return false;
    }
    error = '';
    return true;
  }

  async function handleSubmit(event?: Event) {
    // Prevent any form submission
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!validateForm()) {
      return;
    }

    isLoading = true;
    error = '';

    console.log('Starting project submission...', { projectData });

    try {
      // 1. Create Customer first
      const customerResponse = await fetch('/api/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          salutation,
          givenName,
          familyName,
          email,
          phone,
          company,
          address,
          postCode,
          city,
          country
        })
      });

      if (!customerResponse.ok) {
        const errorData = await customerResponse.json();
        throw new Error(errorData.error || 'Fehler beim Erstellen des Kunden');
      }

      const customerResult = await customerResponse.json();
      const customerId = customerResult.data?.id;

      // 2. Create project (without owner yet)
      const projectResponse = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!projectResponse.ok) {
        const errorData = await projectResponse.json();
        throw new Error(errorData.error || 'Fehler beim Erstellen des Projekts');
      }

      const projectResult = await projectResponse.json();
      const projectId = projectResult.data?.id;

      // 3. Link customer to project
      const linkResponse = await fetch(`/api/project/link-customer/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerId })
      });

      if (!linkResponse.ok) {
        console.error('Fehler beim Verknüpfen von Customer und Projekt');
        // Continue anyway - project and customer were created
      }

      // 4. Send email notification
      const completeProjectData = {
        ...projectData,
        owner: {
          salutation,
          givenName,
          familyName,
          email,
          phone,
          company
        }
      };

      const emailResponse = await fetch('/api/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: {
            email: 'request@raspb.de',
            name: 'raspb Webservices - Wizard'
          },
          to: [
            {
              email: 'raspb.webservices@gmail.com',
              name: 'raspb Webservices'
            }
          ],
          subject: `Neue Projektanfrage: ${completeProjectData.projectType || 'Projekt'} - ${company}`,
          category: 'project-request',
          templateProps: {
            projectData: completeProjectData,
            projectId
          }
        })
      });

      if (!emailResponse.ok) {
        console.error('Email-Versand fehlgeschlagen, aber Projekt wurde erstellt');
        // Continue anyway - project was created successfully
      }

      // Success! Keep loading indicator until everything is done
      isLoading = false;
      success = true;
    } catch (err) {
      isLoading = false;
      error = err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten.';
      console.error('Error submitting project:', err);
    }
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={closeModal} disabled={isLoading}>✕</button>
    </form>

    <h3 class="mb-2 text-2xl font-bold">{m.wizard_modals_contact_title()}</h3>
    <p class="text-base-content/70 mb-6">{@html m.wizard_modals_contact_description()}</p>

    {#if success}
      <div class="alert alert-success mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <div class="font-bold">Vielen Dank!</div>
          <div class="text-sm">Ihre Projektanfrage wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen!</div>
        </div>
      </div>
    {:else}
      <div class="form-container">
        <!-- Salutation -->
        <div class="form-group">
          <label for="salutation" class="form-label">
            Anrede <span class="required">*</span>
          </label>
          <select id="salutation" bind:value={salutation} class="form-select" disabled={isLoading} required>
            <option value="">Bitte wählen...</option>
            <option value="mr">Herr</option>
            <option value="mrs">Frau</option>
            <option value="company">Firma</option>
            <option value="other">Divers</option>
          </select>
        </div>

        <!-- Name Fields -->
        <div class="form-row">
          <div class="form-group">
            <label for="givenName" class="form-label">
              Vorname <span class="required">*</span>
            </label>
            <input id="givenName" type="text" bind:value={givenName} class="form-input" placeholder="Max" disabled={isLoading} required />
          </div>

          <div class="form-group">
            <label for="familyName" class="form-label">
              Nachname <span class="required">*</span>
            </label>
            <input id="familyName" type="text" bind:value={familyName} class="form-input" placeholder="Mustermann" disabled={isLoading} required />
          </div>
        </div>

        <!-- Contact Fields -->
        <div class="form-row">
          <div class="form-group">
            <label for="email" class="form-label">
              Email <span class="required">*</span>
            </label>
            <input id="email" type="email" bind:value={email} class="form-input" placeholder="max@beispiel.de" disabled={isLoading} required />
          </div>

          <div class="form-group">
            <label for="phone" class="form-label">
              Telefon <span class="optional">(optional)</span>
            </label>
            <input id="phone" type="tel" bind:value={phone} class="form-input" placeholder="+49 123 456789" disabled={isLoading} />
          </div>
        </div>

        <!-- Company -->
        <div class="form-group">
          <label for="company" class="form-label">
            Firma/Organisation <span class="required">*</span>
          </label>
          <input id="company" type="text" bind:value={company} class="form-input" placeholder="Beispiel GmbH" disabled={isLoading} required />
        </div>

        <!-- Address (Optional) -->
        <div class="form-group">
          <label for="address" class="form-label">
            Adresse <span class="optional">(optional)</span>
          </label>
          <input id="address" type="text" bind:value={address} class="form-input" placeholder="Musterstraße 123" disabled={isLoading} />
        </div>

        <!-- City Fields -->
        <div class="form-row">
          <div class="form-group form-group-small">
            <label for="postCode" class="form-label">
              PLZ <span class="optional">(opt.)</span>
            </label>
            <input id="postCode" type="text" bind:value={postCode} class="form-input" placeholder="12345" disabled={isLoading} />
          </div>

          <div class="form-group form-group-large">
            <label for="city" class="form-label">
              Stadt <span class="optional">(opt.)</span>
            </label>
            <input id="city" type="text" bind:value={city} class="form-input" placeholder="Berlin" disabled={isLoading} />
          </div>

          <div class="form-group form-group-large">
            <label for="country" class="form-label">
              Land <span class="optional">(opt.)</span>
            </label>
            <input id="country" type="text" bind:value={country} class="form-input" disabled={isLoading} />
          </div>
        </div>

        <!-- Privacy Checkbox -->
        <div class="form-group">
          <label class="flex cursor-pointer items-start gap-3">
            <input type="checkbox" bind:checked={acceptPrivacy} class="checkbox checkbox-primary mt-1" disabled={isLoading} required />
            <span class="text-sm">
              Ich habe die <a href={localizeHref('/privacy')} target="_blank" class="link link-primary">Datenschutzbestimmungen</a> gelesen und akzeptiere sie.
              <span class="required">*</span>
            </span>
          </label>
        </div>

        <!-- Error Message -->
        {#if error}
          <div class="alert alert-error mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        {/if}

        <!-- Required Fields Note -->
        <div class="text-base-content/60 mt-4 text-xs">
          <span class="required">*</span> Pflichtfelder
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="modal-action">
        <button type="button" class="btn btn-outline" onclick={closeModal} disabled={isLoading}>
          {m.wizard_modals_contact_cancel()}
        </button>
        <button type="button" class="btn btn-primary" onclick={handleSubmit} disabled={isLoading}>
          {#if isLoading}
            <span class="loading loading-spinner loading-sm"></span>
            Wird versendet...
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Projekt anfragen
          {/if}
        </button>
      </div>
    {/if}
  </div>

  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal} disabled={isLoading}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';

  .form-container {
    @apply space-y-4;
  }

  .form-group {
    @apply w-full;
  }

  .form-row {
    @apply grid grid-cols-1 gap-4 md:grid-cols-2;

    .form-group-small {
      @apply md:col-span-1;
      flex: 0 0 30%;
    }

    .form-group-large {
      @apply flex-1 md:col-span-1;
    }
  }

  .form-label {
    @apply text-base-content mb-1 block text-sm font-medium;
  }

  .form-input,
  .form-select {
    @apply border-base-300 text-base-content focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 transition-colors;

    &:disabled {
      @apply cursor-not-allowed opacity-50;
    }

    &::placeholder {
      @apply text-base-content/40;
    }
  }

  .required {
    @apply text-error;
  }

  .optional {
    @apply text-base-content/50 text-xs font-normal;
  }
</style>
