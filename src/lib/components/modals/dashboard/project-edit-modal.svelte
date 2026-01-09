<script lang="ts">
  import { projectStatus, salutationOptions, domainStatus, features } from '$interfaces/project.interface';
  import { projectTypes, subTypes } from '$lib/configs/wizard-config';
  import { formatDate, formatBudget, getStatusBadgeClass, getStatusLabel, getFeatureLabel, ToArray, getProjectTypeLabel, getSubProjectTypeLabel } from '$lib/helper/projectUtils';
  import { m } from '$lib/paraglide/messages';

  let { selectedProject } = $props();

  let modal: HTMLDialogElement;
  
  let editingSection: string | null = $state(null);
  let editError = $state('');
  let editSuccess = $state('');
  let editSaving = $state(false);
  let editForm = $derived(selectedProject);

  let editingCustomer = $state(false);
  let customerError = $state('');
  let customerSuccess = $state('');
  let customerSaving = $state(false);
  let customerForm = $derived(selectedProject?.owner);

  let editingSetupService: string | null = $state(null);
  let serviceForm = $state({
    username: '',
    password: '',
    authTokens: '',
    isConfigured: false
  });
  let serviceSaving = $state(false);
  let serviceError = $state('');
  let serviceSuccess = $state('');

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }

  function editProjectSection(section: string) {
    if (!selectedProject) return;
    editingSection = section;
    editError = '';
    editSuccess = '';
  }

  function cancelEdit() {
    editingSection = null;
    editError = '';
    editSuccess = '';
  }

  async function saveProjectSection() {
    editSaving = true;
    editError = '';
    editSuccess = '';

    try {
      switch (editingSection) {
        case 'grundinformationen':
          selectedProject = {
            ...selectedProject,
            name: editForm.name,
            description: editForm.description,
            projectType: editForm.projectType,
            subType: editForm.subType,
            projectDetails: editForm.projectDetails,
            projectStatus: editForm.projectStatus
          };
          break;
        case 'spezifikationen':
          selectedProject = {
            ...selectedProject,
            desiredDomain: editForm.desiredDomain,
            domainStatus: editForm.domainStatus,
            goals: editForm.goals,
            targetAudience: editForm.targetAudience,
            timeline: editForm.timeline
          };
          break;
        case 'budget':
          selectedProject = {
            ...selectedProject,
            budget: editForm.budget,
            estimatedPrice: editForm.estimatedPrice
          };
          break;
        case 'design':
          selectedProject = {
            ...selectedProject,
            primaryColour: editForm.primaryColour,
            secondaryColour: editForm.secondaryColour,
            accentColour: editForm.accentColour,
            desiredFont: editForm.desiredFont
          };
          break;
        case 'features':
          selectedProject = {
            ...selectedProject,
            features: editForm.features,
            customFeature: editForm.customFeature
          };
          break;
      }

      const response = await fetch(`/api/project/patch/${selectedProject?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedProject)
      });
      const result = await response.json();

      if (response.ok) {
        editSuccess = 'Änderungen erfolgreich gespeichert!';

        setTimeout(() => {
          editingSection = null;
          editSuccess = '';
        }, 2000);
      } else {
        editError = result.error || 'Fehler beim Speichern der Änderungen';
      }
    } catch (error) {
      console.error('Error saving project:', error);
      editError = error instanceof Error ? error.message : 'Unbekannter Fehler beim Speichern';
    } finally {
      editSaving = false;
    }
  }

  function editCustomer() {
    if (!selectedProject?.owner?.id) return;
    editingCustomer = true;
    customerError = '';
    customerSuccess = '';
  }

  function cancelCustomerEdit() {
    editingCustomer = false;
    customerError = '';
    customerSuccess = '';
  }

  async function saveCustomer() {
    customerSaving = true;
    customerError = '';
    customerSuccess = '';

    try {
      const response = await fetch(`/api/customer/patch/${selectedProject?.owner.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedProject?.owner?.id,
          familyName: customerForm.familyName,
          givenName: customerForm.givenName,
          salutation: customerForm.salutation,
          email: customerForm.email,
          phone: customerForm.phone,
          company: customerForm.company,
          address: customerForm.address,
          postCode: customerForm.postCode,
          city: customerForm.city,
          country: customerForm.country
        })
      });
      const result = await response.json();

      if (response.ok) {
        selectedProject.owner = customerForm;
        customerSuccess = 'Kundendaten erfolgreich gespeichert!';
        
        // Nach 2 Sekunden den Bearbeitungsmodus verlassen
        setTimeout(() => {
          editingCustomer = false;
          customerSuccess = '';
        }, 2000);
      } else {
        customerError = result.error || 'Fehler beim Speichern der Kundendaten';
      }
    } catch (error) {
      console.error('Error saving customer:', error);
      customerError = error instanceof Error ? error.message : 'Unbekannter Fehler beim Speichern';
    } finally {
      customerSaving = false;
    }
  }

  function toggleFeature(feature: string) {
    const index = editForm?.features?.indexOf(feature);
    if (index > -1) {
      editForm.features = editForm.features.filter(f => f !== feature);
    } else {
      editForm.features = [...editForm.features, feature];
    }
  }

  function editSetupService(service: string) {
    if (!selectedProject) return;
    
    editingSetupService = service;
    serviceError = '';
    serviceSuccess = '';

    // Formular mit aktuellen Werten vorausfüllen
    const serviceData = selectedProject?.setup?.[service as keyof typeof selectedProject.setup];
    serviceForm.username = serviceData?.username || '';
    serviceForm.password = serviceData?.password || '';
    serviceForm.authTokens = serviceData?.authTokens ? JSON.stringify(serviceData.authTokens, null, 2) : '';
    serviceForm.isConfigured = serviceData?.isConfigured || false;
  }

  function cancelServiceEdit() {
    editingSetupService = null;
    serviceError = '';
    serviceSuccess = '';
  }

  async function saveSetupService() {
    if (!selectedProject || !editingSetupService) return;

    serviceSaving = true;
    serviceError = '';
    serviceSuccess = '';

    try {
      const parseAuthTokens = (tokenString: string) => {
        if (!tokenString.trim()) return null;
        try {
          return JSON.parse(tokenString);
        } catch (e) {
          throw new Error('Ungültiges JSON-Format in Auth Tokens');
        }
      };

      const currentSetup = selectedProject?.setup || {};
      const updatedSetup = {
        ...currentSetup,
        [editingSetupService]: {
          username: serviceForm.username || null,
          password: serviceForm.password || null,
          authTokens: parseAuthTokens(serviceForm.authTokens),
          isConfigured: serviceForm.isConfigured,
          lastUpdated: new Date().toISOString()
        }
      };

      const response = await fetch(`/api/project/patch/${selectedProject?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedProject?.id,
          setup: updatedSetup
        })
      });

      const result = await response.json();

      if (response.ok) {
        selectedProject = { ...selectedProject, setup: updatedSetup };
        serviceSuccess = 'Service Setup erfolgreich gespeichert!';
        
        // Nach 2 Sekunden den Bearbeitungsmodus verlassen
        setTimeout(() => {
          editingSetupService = null;
          serviceSuccess = '';
        }, 2000);
      } else {
        serviceError = result.error || 'Fehler beim Speichern der Service-Daten';
      }
    } catch (error) {
      console.error('Error saving service setup:', error);
      serviceError = error instanceof Error ? error.message : 'Unbekannter Fehler beim Speichern';
    } finally {
      serviceSaving = false;
    }
  }
</script>

<dialog bind:this={modal} class="modal edit-project">
  <div class="modal-box w-11/12 max-w-5xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
    </form>

    <h3 class="mb-4 text-lg font-bold">{selectedProject?.name}</h3>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Grundinformationen -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">Grundinformationen</h4>
            {#if editingSection !== 'grundinformationen'}
              <button class="btn btn-xs btn-simple" onclick={() => editProjectSection('grundinformationen')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Bearbeiten
              </button>
            {/if}
          </div>

          {#if editingSection === 'grundinformationen'}
            <!-- Bearbeitungsmodus -->
            <div class="space-y-4">
              {#if editError}
                <div class="alert alert-error alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{editError}</span>
                </div>
              {/if}
              {#if editSuccess}
                <div class="alert alert-success alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{editSuccess}</span>
                </div>
              {/if}

              <div class="form-control">
                <label class="label" for="projektname">
                  <span class="label-text">Projektname</span>
                </label>
                <input type="text" bind:value={editForm.name} id="projektname" name="projektname" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="projectType">
                  <span class="label-text">Projekttyp</span>
                </label>
                <select bind:value={editForm.projectType} id="projectType" name="projectType" class="select select-bordered select-sm">
                  <option value="">Bitte wählen</option>
                  {#each projectTypes as type}
                    <option value={type.id}>{m[type.title]()}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="subType">
                  <span class="label-text">Untertyp</span>
                </label>
                <select bind:value={editForm.subType} id="subType" name="subType" class="select select-bordered select-sm">
                  <option value="">Bitte wählen</option>
                  {#each subTypes as type}
                    <option value={type.id}>{m[type.title]()}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="projectStatus">
                  <span class="label-text">Projektstatus</span>
                </label>
                <select bind:value={editForm.projectStatus} id="projectStatus" name="projectStatus" class="select select-bordered select-sm">
                  <option value="">Bitte wählen</option>
                  {#each  ToArray(projectStatus) as status}
                    <option value={status as string}>{getStatusLabel(status as string)}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="description">
                  <span class="label-text">Beschreibung</span>
                </label>
                <textarea bind:value={editForm.description} id="description" name="description" class="textarea textarea-bordered textarea-sm h-20" placeholder="Projektbeschreibung"></textarea>
              </div>

              <div class="form-control">
                <label class="label" for="projectDetails">
                  <span class="label-text">Projektdetails</span>
                </label>
                <textarea
                  id="projectDetails" name="projectDetails"
                  bind:value={editForm.projectDetails}
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder="Detaillierte Projektbeschreibung"
                ></textarea>
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>Abbrechen</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    Speichern...
                  {:else}
                    Speichern
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Projekttyp:</span>
                <span class="font-medium">{getProjectTypeLabel(selectedProject?.projectType)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Untertyp:</span>
                <span class="font-medium">{ getSubProjectTypeLabel(selectedProject?.subType) }</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Projektstatus:</span>
                {#if selectedProject?.projectStatus}
                  <div class="badge {getStatusBadgeClass(selectedProject?.projectStatus)} badge-sm">
                    {getStatusLabel(selectedProject?.projectStatus)}
                  </div>
                {:else}
                  <span class="font-medium">Nicht angegeben</span>
                {/if}
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Beschreibung:</span>
                <span class="text-sm">{selectedProject?.description || 'Keine Beschreibung verfügbar'}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Projektdetails:</span>
                <span class="text-sm">{selectedProject?.projectDetails || 'Keine Details verfügbar'}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Kunde & Kontakt -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">Kunde & Kontakt</h4>
            {#if !editingCustomer && selectedProject?.owner?.id}
              <button class="btn btn-xs btn-simple" onclick={editCustomer}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Bearbeiten
              </button>
            {/if}
          </div>

          {#if editingCustomer}
            <!-- Bearbeitungsmodus -->
            <div class="space-y-4">
              {#if customerError}
                <div class="alert alert-error alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{customerError}</span>
                </div>
              {/if}
              {#if customerSuccess}
                <div class="alert alert-success alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{customerSuccess}</span>
                </div>
              {/if}

              <div class="form-control">
                <label class="label" for="salutation">
                  <span class="label-text">Anrede</span>
                </label>
                <select bind:value={customerForm.salutation} id="salutation" name="salutation" class="select select-bordered select-sm">
                  <option value="">Bitte wählen</option>
                  {#each ToArray(salutationOptions) as salutation}
                    <option value={salutation}>{salutation}</option>
                  {/each}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="form-control">
                  <label class="label" for="givenName">
                    <span class="label-text">Vorname</span>
                  </label>
                  <input type="text" bind:value={customerForm.givenName} id="givenName" name="givenName" class="input input-bordered input-sm" />
                </div>
                <div class="form-control">
                  <label class="label" for="familyName">
                    <span class="label-text">Nachname</span>
                  </label>
                  <input type="text" bind:value={customerForm.familyName} id="familyName" name="familyName" class="input input-bordered input-sm" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="email">
                  <span class="label-text">E-Mail</span>
                </label>
                <input type="email" bind:value={customerForm.email} id="email" name="email" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="phone">
                  <span class="label-text">Telefon</span>
                </label>
                <input type="tel" bind:value={customerForm.phone} id="phone" name="phone" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="company">
                  <span class="label-text">Unternehmen</span>
                </label>
                <input type="text" bind:value={customerForm.company} id="company" name="company" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="address">
                  <span class="label-text">Adresse</span>
                </label>
                <input type="text" bind:value={customerForm.address} id="address" name="address" class="input input-bordered input-sm" />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="form-control">
                  <label class="label" for="postCode">
                    <span class="label-text">PLZ</span>
                  </label>
                  <input type="text" bind:value={customerForm.postCode} id="postCode" name="postCode" class="input input-bordered input-sm" />
                </div>
                <div class="form-control">
                  <label class="label" for="city">
                    <span class="label-text">Stadt</span>
                  </label>
                  <input type="text" bind:value={customerForm.city} id="city" name="city" class="input input-bordered input-sm" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="country">
                  <span class="label-text">Land</span>
                </label>
                <input type="text" bind:value={customerForm.country} id="country" name="country" class="input input-bordered input-sm" />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelCustomerEdit}>Abbrechen</button>
                <button class="btn btn-sm btn-simple" onclick={saveCustomer} disabled={customerSaving}>
                  {#if customerSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    Speichern...
                  {:else}
                    Speichern
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              {#if selectedProject?.owner?.salutation}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Anrede:</span>
                  <span class="font-medium">{selectedProject?.owner.salutation}</span>
                </div>
              {/if}
              <div class="flex justify-between">
                <span class="text-base-content/60">Name:</span>
                <span class="font-medium">
                  {selectedProject?.owner?.givenName || ''}
                  {selectedProject?.owner?.familyName || 'Unbekannt'}
                </span>
              </div>
              {#if selectedProject?.owner?.email}
                <div class="flex justify-between">
                  <span class="text-base-content/60">E-Mail:</span>
                  <a href="mailto:{selectedProject?.owner.email}" class="text-primary font-medium hover:underline">
                    {selectedProject?.owner.email}
                  </a>
                </div>
              {/if}
              {#if selectedProject?.owner?.phone}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Telefon:</span>
                  <a href="tel:{selectedProject?.owner.phone}" class="text-primary font-medium hover:underline">
                    {selectedProject?.owner.phone}
                  </a>
                </div>
              {/if}
              {#if selectedProject?.owner?.company}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Unternehmen:</span>
                  <span class="font-medium">{selectedProject?.owner.company}</span>
                </div>
              {/if}
              {#if selectedProject?.owner?.address || selectedProject?.owner?.postCode || selectedProject?.owner?.city}
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60">Adresse:</span>
                  <div class="text-sm">
                    {#if selectedProject?.owner?.address}
                      <div>{selectedProject?.owner.address}</div>
                    {/if}
                    {#if selectedProject?.owner?.postCode || selectedProject?.owner?.city}
                      <div>
                        {selectedProject?.owner?.postCode || ''}
                        {selectedProject?.owner?.city || ''}
                      </div>
                    {/if}
                    {#if selectedProject?.owner?.country}
                      <div>{selectedProject?.owner.country}</div>
                    {/if}
                  </div>
                </div>
              {/if}
              <div class="divider my-2"></div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Kunde ID:</span>
                <span class="font-mono text-xs font-medium">{selectedProject?.owner?.id || 'Nicht verfügbar'}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Projekt-Spezifikationen -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">Projekt-Spezifikationen</h4>
            {#if editingSection !== 'spezifikationen'}
              <button class="btn btn-xs btn-simple" onclick={() => editProjectSection('spezifikationen')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Bearbeiten
              </button>
            {/if}
          </div>

          {#if editingSection === 'spezifikationen'}
            <!-- Bearbeitungsmodus -->
            <div class="space-y-4">
              {#if editError}
                <div class="alert alert-error alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{editError}</span>
                </div>
              {/if}
              {#if editSuccess}
                <div class="alert alert-success alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{editSuccess}</span>
                </div>
              {/if}

              <div class="form-control">
                <label class="label" for="desiredDomain">
                  <span class="label-text">Domain</span>
                </label>
                <input type="text" bind:value={editForm.desiredDomain} id="desiredDomain" name="desiredDomain" class="input input-bordered input-sm" placeholder="example.com" />
              </div>

              <div class="form-control">
                <label class="label" for="domainStatus">
                  <span class="label-text">Domain-Status</span>
                </label>
                <select bind:value={editForm.domainStatus} id="domainStatus" name="domainStatus" class="select select-bordered select-sm">
                  <option value="">Bitte wählen</option>
                  {#each ToArray(domainStatus) as status}
                    <option value={status}>{status}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="goals">
                  <span class="label-text">Ziele</span>
                </label>
                <textarea bind:value={editForm.goals} id="goals" name="goals" class="textarea textarea-bordered textarea-sm h-20" placeholder="Projektziele beschreiben"></textarea>
              </div>

              <div class="form-control">
                <label class="label" for="targetAudience">
                  <span class="label-text">Zielgruppe</span>
                </label>
                <textarea bind:value={editForm.targetAudience} id="targetAudience" name="targetAudience" class="textarea textarea-bordered textarea-sm h-20" placeholder="Zielgruppe beschreiben"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label" for="timeline">
                  <span class="label-text">Timeline</span>
                </label>
                <input type="text" bind:value={editForm.timeline} id="timeline" name="timeline" class="input input-bordered input-sm" placeholder="z.B. 3 Monate" />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>Abbrechen</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    Speichern...
                  {:else}
                    Speichern
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Domain:</span>
                <span class="font-medium">{selectedProject?.desiredDomain || 'Nicht angegeben'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Domain-Status:</span>
                <div class="badge badge-outline badge-sm">{selectedProject?.domainStatus || 'Nicht angegeben'}</div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Ziele:</span>
                <span class="text-sm">{selectedProject?.goals || 'Nicht angegeben'}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">Zielgruppe:</span>
                <span class="text-sm">{selectedProject?.targetAudience || 'Nicht angegeben'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Timeline:</span>
                <span class="font-medium">{selectedProject?.timeline || 'Nicht angegeben'}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Budget & Preise -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">Budget & Preise</h4>
            {#if editingSection !== 'budget'}
              <button class="btn btn-xs btn-simple" onclick={() => editProjectSection('budget')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Bearbeiten
              </button>
            {/if}
          </div>

          {#if editingSection === 'budget'}
            <!-- Bearbeitungsmodus -->
            <div class="space-y-4">
              {#if editError}
                <div class="alert alert-error alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{editError}</span>
                </div>
              {/if}
              {#if editSuccess}
                <div class="alert alert-success alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{editSuccess}</span>
                </div>
              {/if}

              <div class="form-control">
                <label class="label" for="budget">
                  <span class="label-text">Budget</span>
                </label>
                <input type="text" bind:value={editForm.budget} id="budget" name="budget" class="input input-bordered input-sm" placeholder="z.B. 5000" />
              </div>

              <div class="form-control">
                <label class="label" for="estimatedPrice">
                  <span class="label-text">Geschätzter Preis</span>
                </label>
                <input type="number" bind:value={editForm.estimatedPrice} id="estimatedPrice" name="estimatedPrice" class="input input-bordered input-sm" placeholder="0" />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>Abbrechen</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    Speichern...
                  {:else}
                    Speichern
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">Budget:</span>
                <span class="font-medium">{formatBudget(selectedProject?.budget || '')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Geschätzter Preis:</span>
                <span class="font-medium">
                  {selectedProject?.estimatedPrice ? `${selectedProject?.estimatedPrice}€` : 'Nicht berechnet'}
                </span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Features -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">Features</h4>
            {#if editingSection !== 'features'}
              <button class="btn btn-xs btn-simple" onclick={() => editProjectSection('features')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Bearbeiten
              </button>
            {/if}
          </div>



          {#if editingSection === 'features'}
            <!-- Bearbeitungsmodus -->
            <div class="space-y-4">
              {#if editError}
                <div class="alert alert-error alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{editError}</span>
                </div>
              {/if}
              {#if editSuccess}
                <div class="alert alert-success alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{editSuccess}</span>
                </div>
              {/if}
              <div class="form-control">
                <label class="label" for="feature">
                  <span class="label-text">Features auswählen</span>
                </label>
                <div class="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto">
                  {#each ToArray(features) as feature}
                    <label class="label cursor-pointer justify-start">
                      <input
                        id="feature-{feature}" name="feature-{feature}"
                        type="checkbox"
                        class="checkbox checkbox-sm checkbox-primary mr-2"
                        checked={editForm?.features?.includes(feature)}
                        onchange={() => toggleFeature(feature as string)}
                      />
                      <span class="label-text text-xs">{getFeatureLabel(feature as string)}</span>
                    </label>
                  {/each}
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="customFeature">
                  <span class="label-text">Custom Feature</span>
                </label>
                <input type="text" bind:value={editForm.customFeature} id="customFeature" name="customFeature" class="input input-bordered input-sm" placeholder="Individuelles Feature" />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>Abbrechen</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    Speichern...
                  {:else}
                    Speichern
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            {#if selectedProject?.features && selectedProject?.features.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each selectedProject?.features as feature}
                  <div class="badge badge-success badge-sm">{getFeatureLabel(feature as string)}</div>
                {/each}
              </div>
            {:else}
              <p class="text-base-content/60 text-sm">Keine Features ausgewählt</p>
            {/if}
            {#if selectedProject?.customFeature}
              <div class="mt-2">
                <div class="text-base-content/60 text-sm">Custom Feature:</div>
                <div class="pt-1 text-sm">{selectedProject?.customFeature}</div>
              </div>
            {/if}
          {/if}
        </div>
      </div>

      <!-- Design -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">Design</h4>
            {#if editingSection !== 'design'}
              <button class="btn btn-xs btn-simple" onclick={() => editProjectSection('design')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Bearbeiten
              </button>
            {/if}
          </div>

          {#if editingSection === 'design'}
            <!-- Bearbeitungsmodus -->
            <div class="space-y-4">
              {#if editError}
                <div class="alert alert-error alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{editError}</span>
                </div>
              {/if}
              {#if editSuccess}
                <div class="alert alert-success alert-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{editSuccess}</span>
                </div>
              {/if}

              <div class="form-control">
                <label class="label" for="primaryColourText">
                  <span class="label-text">Primärfarbe</span>
                </label>
                <div class="flex items-center gap-2">
                  <input type="color" id="primaryColour" name="primaryColour" bind:value={editForm.primaryColour} class="border-base-300 h-8 w-12 rounded border" />
                  <input type="text" id="primaryColourText" name="primaryColourText" bind:value={editForm.primaryColour} class="input input-bordered input-sm flex-1" placeholder="#000000" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="secondaryColourText">
                  <span class="label-text">Sekundärfarbe</span>
                </label>
                <div class="flex items-center gap-2">
                  <input type="color" id="secondaryColour" name="secondaryColour" bind:value={editForm.secondaryColour} class="border-base-300 h-8 w-12 rounded border" />
                  <input type="text" id="secondaryColourText" name="secondaryColourText" bind:value={editForm.secondaryColour} class="input input-bordered input-sm flex-1" placeholder="#000000" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="accentColourText">
                  <span class="label-text">Akzentfarbe</span>
                </label>
                <div class="flex items-center gap-2">
                  <input type="color" id="accentColour" name="accentColour" bind:value={editForm.accentColour} class="border-base-300 h-8 w-12 rounded border" />
                  <input type="text" id="accentColourText" name="accentColourText" bind:value={editForm.accentColour} class="input input-bordered input-sm flex-1" placeholder="#000000" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="desiredFont">
                  <span class="label-text">Schriftart</span>
                </label>
                <input type="text" bind:value={editForm.desiredFont} id="desiredFont" name="desiredFont" class="input input-bordered input-sm" placeholder="z.B. Arial, Helvetica" />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>Abbrechen</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    Speichern...
                  {:else}
                    Speichern
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">Primärfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject?.primaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject?.primaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject?.primaryColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">Sekundärfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject?.secondaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject?.secondaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject?.secondaryColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">Akzentfarbe:</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject?.accentColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject?.accentColour}"></div>
                    <span class="font-mono text-xs">{selectedProject?.accentColour}</span>
                  {:else}
                    <span class="text-sm">Nicht angegeben</span>
                  {/if}
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">Schriftart:</span>
                <span class="font-medium">{selectedProject?.desiredFont || 'Nicht angegeben'}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Dateien -->
      {#if selectedProject?.relatedFiles && selectedProject?.relatedFiles.length > 0}
        <div class="card bg-base-200">
          <div class="card-body">
            <h4 class="card-title text-base">Dateien</h4>
            <div class="space-y-2">
              {#each selectedProject?.relatedFiles as file}
                <div class="bg-base-100 flex items-center justify-between rounded p-2">
                  <span class="truncate text-sm">{file.fileName || 'Unbenannte Datei'}</span>
                  {#if file.url}
                    <button onclick={() => window.open(file.url, '_blank')} class="btn btn-xs btn-simple"> Öffnen </button>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <!-- Service Setup -->
      <div class="card bg-base-200 lg:col-span-2">
        <div class="card-body">
          <h4 class="card-title text-base">Service Setup</h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- GitHub Setup -->
            <div class="bg-base-100 rounded-lg p-4">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  <span class="font-semibold">GitHub</span>
                  {#if selectedProject?.setup?.github?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                {#if editingSetupService !== 'github'}
                  <button class="btn btn-xs btn-simple" onclick={() => editSetupService('github')}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Bearbeiten
                  </button>
                {/if}
              </div>

              {#if editingSetupService === 'github'}
                <!-- Bearbeitungsmodus -->
                <div class="space-y-3">
                  {#if serviceError}
                    <div class="alert alert-error alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{serviceError}</span>
                    </div>
                  {/if}
                  {#if serviceSuccess}
                    <div class="alert alert-success alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{serviceSuccess}</span>
                    </div>
                  {/if}

                  <div class="form-control">
                    <label class="label" for="githubUsername">
                      <span class="label-text text-xs">Username</span>
                    </label>
                    <input type="text" bind:value={serviceForm.username}  id="githubUsername" name="githubUsername"  class="input input-bordered input-xs" placeholder="GitHub Username" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="githubPassword">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input type="password" bind:value={serviceForm.password}  id="githubPassword" name="githubPassword"  class="input input-bordered input-xs" placeholder="GitHub Passwort" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="githubAuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea bind:value={serviceForm.authTokens} id="githubAuthTokens" name="githubAuthTokens"  class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs" placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input type="checkbox"  id="githubIsConfigured" name="githubIsConfigured" bind:checked={serviceForm.isConfigured} class="checkbox checkbox-xs checkbox-primary" />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>Abbrechen</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        Speichern
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.github?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.github?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject?.setup?.github?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Netlify Setup -->
            <div class="bg-base-100 rounded-lg p-4">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001.017.001z"
                    />
                  </svg>
                  <span class="font-semibold">Netlify</span>
                  {#if selectedProject?.setup?.netlify?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                {#if editingSetupService !== 'netlify'}
                  <button class="btn btn-xs btn-simple" onclick={() => editSetupService('netlify')}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Bearbeiten
                  </button>
                {/if}
              </div>

              {#if editingSetupService === 'netlify'}
                <!-- Bearbeitungsmodus -->
                <div class="space-y-3">
                  {#if serviceError}
                    <div class="alert alert-error alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{serviceError}</span>
                    </div>
                  {/if}
                  {#if serviceSuccess}
                    <div class="alert alert-success alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{serviceSuccess}</span>
                    </div>
                  {/if}

                  <div class="form-control">
                    <label class="label" for="netlifyUsername">
                      <span class="label-text text-xs">Username</span>
                    </label>
                    <input type="text" bind:value={serviceForm.username} id="netlifyUsername" name="netlifyUsername" class="input input-bordered input-xs" placeholder="Netlify Username" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="netlifyPassword">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input type="password" bind:value={serviceForm.password} id="netlifyPassword" name="netlifyPassword" class="input input-bordered input-xs" placeholder="Netlify Passwort" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="netlifyAuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea bind:value={serviceForm.authTokens} id="netlifyAuthTokens" name="netlifyAuthTokens" class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs" placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input type="checkbox" bind:checked={serviceForm.isConfigured} id="netlifyIsConfigured" name="netlifyIsConfigured" class="checkbox checkbox-xs checkbox-primary" />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>Abbrechen</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        Speichern
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.netlify?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.netlify?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject?.setup?.netlify?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Hygraph Setup -->
            <div class="bg-base-100 rounded-lg p-4">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.073 18.564L5.5 15.846V8.154l5.427 2.718v7.692zm2.146 0V10.872L18.5 8.154v7.692l-5.427 2.718zM12 9.282L6.573 6.564 12 3.846l5.427 2.718L12 9.282z"
                    />
                  </svg>
                  <span class="font-semibold">Hygraph</span>
                  {#if selectedProject?.setup?.hygraph?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                {#if editingSetupService !== 'hygraph'}
                  <button class="btn btn-xs btn-simple" onclick={() => editSetupService('hygraph')}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Bearbeiten
                  </button>
                {/if}
              </div>

              {#if editingSetupService === 'hygraph'}
                <!-- Bearbeitungsmodus -->
                <div class="space-y-3">
                  {#if serviceError}
                    <div class="alert alert-error alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{serviceError}</span>
                    </div>
                  {/if}
                  {#if serviceSuccess}
                    <div class="alert alert-success alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{serviceSuccess}</span>
                    </div>
                  {/if}

                  <div class="form-control">
                    <label class="label" for="hygraphUsername">
                      <span class="label-text text-xs">Username</span>
                    </label>
                    <input type="text" bind:value={serviceForm.username} id="hygraphUsername" name="netlifyUsername" class="input input-bordered input-xs" placeholder="Hygraph Username" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="hygraphPassword">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input type="password" bind:value={serviceForm.password} id="hygraphPassword" name="hygraphPassword" class="input input-bordered input-xs" placeholder="Hygraph Passwort" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="hygraphAuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea bind:value={serviceForm.authTokens} id="hygraphAuthTokens" name="hygraphAuthTokens" class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs" placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input type="checkbox" id="hygraphIsConfigured" name="hygraphIsConfigured" bind:checked={serviceForm.isConfigured} class="checkbox checkbox-xs checkbox-primary" />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>Abbrechen</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        Speichern
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.hygraph?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.hygraph?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject?.setup?.hygraph?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Auth0 Setup -->
            <div class="bg-base-100 rounded-lg p-4">
              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.537c3.785-2.809 5.167-7.703 3.815-12.015z"
                    />
                  </svg>
                  <span class="font-semibold">Auth0</span>
                  {#if selectedProject?.setup?.auth0?.isConfigured}
                    <div class="badge badge-success badge-xs">Konfiguriert</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">Nicht konfiguriert</div>
                  {/if}
                </div>
                {#if editingSetupService !== 'auth0'}
                  <button class="btn btn-xs btn-simple" onclick={() => editSetupService('auth0')}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Bearbeiten
                  </button>
                {/if}
              </div>

              {#if editingSetupService === 'auth0'}
                <!-- Bearbeitungsmodus -->
                <div class="space-y-3">
                  {#if serviceError}
                    <div class="alert alert-error alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{serviceError}</span>
                    </div>
                  {/if}
                  {#if serviceSuccess}
                    <div class="alert alert-success alert-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{serviceSuccess}</span>
                    </div>
                  {/if}

                  <div class="form-control">
                    <label class="label" for="auth0Username">
                      <span class="label-text text-xs">Username</span>
                    </label>
                    <input type="text" bind:value={serviceForm.username} id="auth0Username" name="auth0Username" class="input input-bordered input-xs" placeholder="Auth0 Username" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="auth0Password">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input type="password" bind:value={serviceForm.password} id="auth0Password" name="auth0Password"class="input input-bordered input-xs" placeholder="Auth0 Passwort" />
                  </div>

                  <div class="form-control">
                    <label class="label" for="auth0AuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea bind:value={serviceForm.authTokens} id="auth0AuthTokens" name="auth0AuthTokens"class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs" placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input type="checkbox" bind:checked={serviceForm.isConfigured} id="auth0Username" name="auth0Username" class="checkbox checkbox-xs checkbox-primary" />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>Abbrechen</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        Speichern
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.auth0?.username || 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.auth0?.password ? '••••••••' : 'Nicht angegeben'}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span>{selectedProject?.setup?.auth0?.authTokens ? 'Vorhanden' : 'Nicht vorhanden'}</span>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Metadaten -->
      <div class="card bg-base-200">
        <div class="card-body">
          <h4 class="card-title text-base">Metadaten</h4>
          <div class="space-y-3">
            <div class="flex flex-col gap-1">
              <span class="text-base-content/60">Projekt ID:</span>
              <span class="font-mono text-xs">{selectedProject?.id}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-base-content/60">Erstellt am:</span>
              <span class="font-medium">
                {selectedProject?.createdAt ? formatDate(selectedProject?.createdAt) : 'Unbekannt'}
              </span>
            </div>
            {#if selectedProject?.setup?.github?.lastUpdated || selectedProject?.setup?.netlify?.lastUpdated || selectedProject?.setup?.hygraph?.lastUpdated || selectedProject?.setup?.auth0?.lastUpdated}
              <div class="flex justify-between">
                <span class="text-base-content/60">Setup zuletzt aktualisiert:</span>
                <span class="text-xs font-medium">
                  {formatDate(
                    selectedProject?.setup?.github?.lastUpdated ||
                      selectedProject?.setup?.netlify?.lastUpdated ||
                      selectedProject?.setup?.hygraph?.lastUpdated ||
                      selectedProject?.setup?.auth0?.lastUpdated ||
                      ''
                  )}
                </span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
