<script lang="ts">
  import { projectStatus, salutationOptions, domainStatus, features } from '$interfaces/project.interface';
  import {
    projectCategories,
    projectTypesWebApp,
    projectTypesAiFreestyle,
    projectSubTypesWebsite,
    projectSubTypesApp,
    projectSubTypesAi,
    projectSubTypesFreestyle,
    availableFeatures,
    googleFonts,
    formFieldTypes
  } from '$lib/configs/wizard-config';
  import { uploadAssetWithStatusCheck } from '$lib/helper/uploadAsset';
  import {
    formatDate,
    formatBudget,
    getStatusBadgeClass,
    getStatusLabel,
    getFeatureLabel,
    ToArray,
    getProjectTypeLabel,
    getProjectSubTypeLabel
  } from '$lib/helper/projectUtils';
  import { m } from '$lib/paraglide/messages';
  import { authFetch } from '$lib/helper/auth-fetch';

  let { selectedProject } = $props();

  let modal: HTMLDialogElement;

  let editingSection: string | null = $state(null);
  let editingTitle = $state(false);
  let editError = $state('');
  let editSuccess = $state('');
  let editSaving = $state(false);
  let editForm = $derived(selectedProject);
  let headerTitle = $state('');
  let headerStatus = $state('');
  
  $effect(() => {
    if (selectedProject) {
      headerTitle = selectedProject.name || '';
      headerStatus = selectedProject.projectStatus || '';
    }
  });

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

  // File upload state
  let uploading = $state(false);
  let uploadProgress = $state('');
  let uploadedFiles: File[] = $state([]);

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const newFiles = Array.from(target.files);
      uploadedFiles = [...uploadedFiles, ...newFiles];
      target.value = '';
    }
  }

  function removeUploadedFile(index: number) {
    uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
  }

  async function uploadFilesAndSave() {
    if (!selectedProject?.id || uploadedFiles.length === 0) return;
    
    uploading = true;
    uploadProgress = `Lade ${uploadedFiles.length} Datei(en) hoch...`;
    editError = '';

    try {
      const uploadedAssetIds: string[] = [];

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        uploadProgress = `Verarbeite ${file.name} (${i + 1}/${uploadedFiles.length})...`;

        const assetId = await uploadAssetWithStatusCheck(file, (msg) => {
          uploadProgress = msg;
        });

        if (assetId !== 'error') {
          uploadedAssetIds.push(assetId);
        } else {
          console.error(`Failed to upload: ${file.name}`);
        }
      }

      if (uploadedAssetIds.length === 0) {
        uploadProgress = 'Fehler beim Hochladen der Dateien';
        editError = 'Fehler beim Hochladen';
        setTimeout(() => { uploadProgress = ''; }, 3000);
        return;
      }

      uploadProgress = `${uploadedAssetIds.length} Datei(en) hochgeladen, verknüpfe mit Projekt...`;

      const existingFileIds = (selectedProject.relatedFiles || []).map((f: { id: string }) => ({ id: f.id })).filter((f: { id: string }) => f.id);
      const newFileIds = uploadedAssetIds.map((id) => ({ id }));
      const allFileIds = [...existingFileIds, ...newFileIds];

      const response = await authFetch(`/api/project/patch/${selectedProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedProject.id,
          relatedFiles: allFileIds
        })
      });

      if (response.ok) {
        const data = await response.json();
        selectedProject = { ...selectedProject, relatedFiles: data.data.relatedFiles };
        
        uploadProgress = 'Dateien erfolgreich hochgeladen!';
        uploadedFiles = [];
        setTimeout(() => { uploadProgress = ''; }, 5000);
      } else {
        uploadProgress = 'Fehler beim Verknüpfen der Dateien';
        editError = 'Fehler beim Speichern';
      }
    } catch (error) {
      console.error('File upload error:', error);
      uploadProgress = 'Fehler beim Hochladen';
      editError = 'Fehler beim Hochladen';
    } finally {
      uploading = false;
    }
  }

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

  // Helper function to convert null/undefined to empty string or 0
  function sanitizeValue(value: unknown): string | number | undefined {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value;
    return String(value);
  }

  function sanitizeNumber(value: unknown): number | undefined {
    if (value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  }

  async function saveProjectSection() {
    editSaving = true;
    editError = '';
    editSuccess = '';

    try {
      // Build sanitized project data - convert null/undefined to empty strings or 0
      const sanitizedData: Record<string, unknown> = { id: selectedProject?.id };

      switch (editingSection) {
        case 'grundinformationen':
          sanitizedData.name = sanitizeValue(editForm.name) || '';
          sanitizedData.description = sanitizeValue(editForm.description) || '';
          sanitizedData.projectCategory = sanitizeValue(editForm.projectCategory) || '';
          sanitizedData.projectType = sanitizeValue(editForm.projectType) || '';
          sanitizedData.subType = sanitizeValue(editForm.subType) || '';
          sanitizedData.projectDetails = sanitizeValue(editForm.projectDetails) || '';
          sanitizedData.projectStatus = sanitizeValue(editForm.projectStatus) || '';
          selectedProject = { ...selectedProject, ...sanitizedData };
          break;
        case 'spezifikationen':
          sanitizedData.desiredDomain = sanitizeValue(editForm.desiredDomain) || '';
          sanitizedData.domainStatus = sanitizeValue(editForm.domainStatus) || '';
          sanitizedData.goals = sanitizeValue(editForm.goals) || '';
          sanitizedData.inspiration = sanitizeValue(editForm.inspiration) || '';
          sanitizedData.targetAudience = sanitizeValue(editForm.targetAudience) || '';
          sanitizedData.timeline = sanitizeValue(editForm.timeline) || '';
          sanitizedData.timelinePreference = sanitizeValue(editForm.timelinePreference) || '';
          sanitizedData.specificDeadline = sanitizeValue(editForm.specificDeadline) || '';
          sanitizedData.budgetRange = sanitizeValue(editForm.budgetRange) || '';
          sanitizedData.specialRequirements = sanitizeValue(editForm.specialRequirements) || '';
          sanitizedData.serviceLevel = sanitizeNumber(editForm.serviceLevel);
          sanitizedData.engineeringApproach = sanitizeNumber(editForm.engineeringApproach);
          // PWA fields
          sanitizedData.pwaApproach = sanitizeValue(editForm.pwaApproach) || '';
          sanitizedData.pwaExistingUrl = sanitizeValue(editForm.pwaExistingUrl) || '';
          // CMS fields
          sanitizedData.cmsComplexity = sanitizeNumber(editForm.cmsComplexity);
          sanitizedData.cmsContentStructure = sanitizeValue(editForm.cmsContentStructure) || '';
          // KI & Freestyle fields
          sanitizedData.estimatedExpertDays = sanitizeNumber(editForm.estimatedExpertDays);
          selectedProject = { ...selectedProject, ...sanitizedData };
          break;
        case 'budget':
          sanitizedData.budget = sanitizeValue(editForm.budget) || '';
          sanitizedData.estimatedPrice = sanitizeNumber(editForm.estimatedPrice);
          selectedProject = { ...selectedProject, ...sanitizedData };
          break;
        case 'design':
          sanitizedData.primaryColour = sanitizeValue(editForm.primaryColour) || '';
          sanitizedData.secondaryColour = sanitizeValue(editForm.secondaryColour) || '';
          sanitizedData.accentColour = sanitizeValue(editForm.accentColour) || '';
          sanitizedData.desiredFont = sanitizeValue(editForm.desiredFont) || '';
          selectedProject = { ...selectedProject, ...sanitizedData };
          break;
        case 'features':
          sanitizedData.features = editForm.features || [];
          sanitizedData.customFeature = sanitizeValue(editForm.customFeature) || '';
          selectedProject = { ...selectedProject, ...sanitizedData };
          break;
      }

      const response = await authFetch(`/api/project/patch/${selectedProject?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedProject)
      });
      const result = await response.json();

      if (response.ok) {
        editSuccess = m.dashboard_edit_success_saved();

        setTimeout(() => {
          editingSection = null;
          editSuccess = '';
        }, 2000);
      } else {
        editError = result.error || m.dashboard_edit_error_save();
      }
    } catch (error) {
      console.error('Error saving project:', error);
      editError = error instanceof Error ? error.message : m.dashboard_edit_error_unknown();
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
      const response = await authFetch(`/api/customer/patch/${selectedProject?.owner.id}`, {
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
        customerSuccess = m.dashboard_edit_success_customer();

        // Nach 2 Sekunden den Bearbeitungsmodus verlassen
        setTimeout(() => {
          editingCustomer = false;
          customerSuccess = '';
        }, 2000);
      } else {
        customerError = result.error || m.dashboard_edit_error_customer();
      }
    } catch (error) {
      console.error('Error saving customer:', error);
      customerError = error instanceof Error ? error.message : m.dashboard_edit_error_unknown();
    } finally {
      customerSaving = false;
    }
  }

  function toggleFeature(feature: string) {
    const index = editForm?.features?.indexOf(feature);
    if (index > -1) {
      editForm.features = editForm.features.filter((f: string) => f !== feature);
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
          throw new Error(m.dashboard_setup_error_invalid_json());
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

      const response = await authFetch(`/api/project/patch/${selectedProject?.id}`, {
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
        serviceSuccess = m.dashboard_edit_success_setup();

        // Nach 2 Sekunden den Bearbeitungsmodus verlassen
        setTimeout(() => {
          editingSetupService = null;
          serviceSuccess = '';
        }, 2000);
      } else {
        serviceError = result.error || m.dashboard_edit_error_setup();
      }
    } catch (error) {
      console.error('Error saving service setup:', error);
      serviceError = error instanceof Error ? error.message : m.dashboard_edit_error_unknown();
    } finally {
      serviceSaving = false;
    }
  }
</script>

<dialog bind:this={modal} class="modal edit-project">
  <div class="modal-box w-11/12 max-w-7xl">
    <div class="sticky top-0 z-50 flex justify-end -mb-10 pt-2 pr-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    <!-- Header: Editable Title & Status -->
    <div class="mb-4 flex items-center gap-4 rounded-lg bg-base-200 p-4">
      {#if editingTitle}
        <div class="flex flex-1 items-center gap-2">
          <input
            type="text"
            bind:value={headerTitle}
            class="input input-bordered input-sm flex-1"
            placeholder={m.dashboard_edit_label_name()}
          />
          <select
            bind:value={headerStatus}
            class="select select-bordered select-sm"
          >
            <option value="">{m.dashboard_edit_placeholder_select()}</option>
            {#each ToArray(projectStatus) as status}
              <option value={status as string}>{getStatusLabel(status as string)}</option>
            {/each}
          </select>
          <button
            class="btn btn-sm btn-simple"
            onclick={async () => {
              if (!selectedProject) return;
              editSaving = true;
              const response = await authFetch(`/api/project/patch/${selectedProject.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: selectedProject.id,
                  name: headerTitle,
                  projectStatus: headerStatus
                })
              });
              if (response.ok) {
                selectedProject = { ...selectedProject, name: headerTitle, projectStatus: headerStatus };
                editingTitle = false;
                editSuccess = m.dashboard_edit_success_saved();
                setTimeout(() => { editSuccess = ''; }, 2000);
              } else {
                editError = m.dashboard_edit_error_save();
              }
              editSaving = false;
            }}
            disabled={editSaving}
          >
            {#if editSaving}
              <span class="loading loading-spinner loading-xs"></span>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            {/if}
          </button>
          <button class="btn btn-sm btn-ghost" onclick={() => { editingTitle = false; headerTitle = selectedProject?.name || ''; headerStatus = selectedProject?.projectStatus || ''; }}>
            ✕
          </button>
        </div>
      {:else}
        <div class="flex flex-1 items-center gap-3">
          <h3 class="text-lg font-bold">{selectedProject?.name}</h3>
          {#if selectedProject?.projectStatus}
            <div class="badge {getStatusBadgeClass(selectedProject?.projectStatus)}">
              {getStatusLabel(selectedProject?.projectStatus)}
            </div>
          {/if}
        </div>
        <button class="btn btn-xs btn-simple" onclick={() => { editingTitle = true; headerTitle = selectedProject?.name || ''; headerStatus = selectedProject?.projectStatus || ''; }}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Bearbeiten
        </button>
      {/if}
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Grundinformationen -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">{m.dashboard_details_section_basic()}</h4>
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
                {m.dashboard_edit_button_edit()}
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
                  <span class="label-text">{m.dashboard_edit_label_name()}</span>
                </label>
                <input type="text" bind:value={editForm.name} id="projektname" name="projektname" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="projectCategory">
                  <span class="label-text">{m.dashboard_edit_label_category()}</span>
                </label>
                <select bind:value={editForm.projectCategory} id="projectCategory" name="projectCategory" class="select select-bordered select-sm">
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each projectCategories as category}
                    <option value={category.id}>{(m as unknown as Record<string, () => string>)[category.title]()}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="projectType">
                  <span class="label-text">{m.dashboard_details_label_type()}</span>
                </label>
                <select bind:value={editForm.projectType} id="projectType" name="projectType" class="select select-bordered select-sm">
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each projectTypesWebApp as type}
                    <option value={type.id}>{(m as unknown as Record<string, () => string>)[type.label ?? type.title]?.() ?? type.title}</option>
                  {/each}
                  {#each projectTypesAiFreestyle as type}
                    <option value={type.id}>{(m as unknown as Record<string, () => string>)[type.label ?? type.title]?.() ?? type.title}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="subType">
                  <span class="label-text">{m.dashboard_details_label_subtype()}</span>
                </label>
                <select bind:value={editForm.subType} id="subType" name="subType" class="select select-bordered select-sm">
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each projectSubTypesWebsite as subtype}
                    <option value={subtype.id}>{(m as unknown as Record<string, () => string>)[subtype.title]?.() ?? subtype.title}</option>
                  {/each}
                  {#each projectSubTypesApp as subtype}
                    <option value={subtype.id}>{(m as unknown as Record<string, () => string>)[subtype.title]?.() ?? subtype.title}</option>
                  {/each}
                  {#each projectSubTypesAi as subtype}
                    <option value={subtype.id}>{(m as unknown as Record<string, () => string>)[subtype.title]?.() ?? subtype.title}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="projectStatus">
                  <span class="label-text">{m.dashboard_details_label_status()}</span>
                </label>
                <select bind:value={editForm.projectStatus} id="projectStatus" name="projectStatus" class="select select-bordered select-sm">
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each ToArray(projectStatus) as status}
                    <option value={status as string}>{getStatusLabel(status as string)}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="description">
                  <span class="label-text">{m.dashboard_details_label_description()}</span>
                </label>
                <textarea
                  bind:value={editForm.description}
                  id="description"
                  name="description"
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder={m.dashboard_edit_placeholder_description()}
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label" for="projectDetails">
                  <span class="label-text">{m.dashboard_details_label_details()}</span>
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  bind:value={editForm.projectDetails}
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder={m.dashboard_edit_placeholder_details()}
                ></textarea>
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>{m.dashboard_edit_button_cancel()}</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    {m.dashboard_edit_button_save_loading()}
                  {:else}
                    {m.dashboard_edit_button_save()}
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_type()}</span>
                <span class="font-medium">{getProjectTypeLabel(selectedProject?.projectType)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_subtype()}</span>
                <span class="font-medium">{getProjectSubTypeLabel(selectedProject?.subType)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_status()}</span>
                {#if selectedProject?.projectStatus}
                  <div class="badge {getStatusBadgeClass(selectedProject?.projectStatus)} badge-sm">
                    {getStatusLabel(selectedProject?.projectStatus)}
                  </div>
                {:else}
                  <span class="font-medium">{m.dashboard_details_fallback_not_specified()}</span>
                {/if}
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_description()}</span>
                <span class="text-sm">{selectedProject?.description || m.dashboard_details_fallback_no_description()}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_details()}</span>
                <span class="text-sm">{selectedProject?.projectDetails || m.dashboard_details_fallback_no_details()}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Kunde & Kontakt -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">{m.dashboard_edit_section_customer()}</h4>
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
                {m.dashboard_edit_button_edit()}
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
                  <span class="label-text">{m.dashboard_edit_label_salutation()}</span>
                </label>
                <select bind:value={customerForm.salutation} id="salutation" name="salutation" class="select select-bordered select-sm">
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each ToArray(salutationOptions) as salutation}
                    <option value={salutation}>{salutation}</option>
                  {/each}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="form-control">
                  <label class="label" for="givenName">
                    <span class="label-text">{m.dashboard_edit_label_firstname()}</span>
                  </label>
                  <input type="text" bind:value={customerForm.givenName} id="givenName" name="givenName" class="input input-bordered input-sm" />
                </div>
                <div class="form-control">
                  <label class="label" for="familyName">
                    <span class="label-text">{m.dashboard_edit_label_lastname()}</span>
                  </label>
                  <input type="text" bind:value={customerForm.familyName} id="familyName" name="familyName" class="input input-bordered input-sm" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="email">
                  <span class="label-text">{m.dashboard_edit_label_email()}</span>
                </label>
                <input type="email" bind:value={customerForm.email} id="email" name="email" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="phone">
                  <span class="label-text">{m.dashboard_edit_label_phone()}</span>
                </label>
                <input type="tel" bind:value={customerForm.phone} id="phone" name="phone" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="company">
                  <span class="label-text">{m.dashboard_edit_label_company()}</span>
                </label>
                <input type="text" bind:value={customerForm.company} id="company" name="company" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label" for="address">
                  <span class="label-text">{m.dashboard_edit_label_address()}</span>
                </label>
                <input type="text" bind:value={customerForm.address} id="address" name="address" class="input input-bordered input-sm" />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="form-control">
                  <label class="label" for="postCode">
                    <span class="label-text">{m.dashboard_edit_label_zip()}</span>
                  </label>
                  <input type="text" bind:value={customerForm.postCode} id="postCode" name="postCode" class="input input-bordered input-sm" />
                </div>
                <div class="form-control">
                  <label class="label" for="city">
                    <span class="label-text">{m.dashboard_edit_label_city()}</span>
                  </label>
                  <input type="text" bind:value={customerForm.city} id="city" name="city" class="input input-bordered input-sm" />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="country">
                  <span class="label-text">{m.dashboard_edit_label_country()}</span>
                </label>
                <input type="text" bind:value={customerForm.country} id="country" name="country" class="input input-bordered input-sm" />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelCustomerEdit}>{m.dashboard_edit_button_cancel()}</button>
                <button class="btn btn-sm btn-simple" onclick={saveCustomer} disabled={customerSaving}>
                  {#if customerSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    {m.dashboard_edit_button_save_loading()}
                  {:else}
                    {m.dashboard_edit_button_save()}
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              {#if selectedProject?.owner?.salutation}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_edit_label_salutation()}</span>
                  <span class="font-medium">{selectedProject?.owner.salutation}</span>
                </div>
              {/if}
              <div class="flex justify-between">
                <span class="text-base-content/60">Name:</span>
                <span class="font-medium">
                  {selectedProject?.owner?.givenName || ''}
                  {selectedProject?.owner?.familyName || m.dashboard_details_fallback_unknown()}
                </span>
              </div>
              {#if selectedProject?.owner?.email}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_edit_label_email()}</span>
                  <a href="mailto:{selectedProject?.owner.email}" class="text-primary font-medium hover:underline">
                    {selectedProject?.owner.email}
                  </a>
                </div>
              {/if}
              {#if selectedProject?.owner?.phone}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_edit_label_phone()}</span>
                  <a href="tel:{selectedProject?.owner.phone}" class="text-primary font-medium hover:underline">
                    {selectedProject?.owner.phone}
                  </a>
                </div>
              {/if}
              {#if selectedProject?.owner?.company}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_edit_label_company()}</span>
                  <span class="font-medium">{selectedProject?.owner.company}</span>
                </div>
              {/if}
              {#if selectedProject?.owner?.address || selectedProject?.owner?.postCode || selectedProject?.owner?.city}
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60">{m.dashboard_edit_label_address()}</span>
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
                <span class="text-base-content/60">{m.dashboard_edit_label_customer_id()}</span>
                <span class="font-mono text-xs font-medium">{selectedProject?.owner?.id || m.dashboard_edit_status_unavailable()}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Projekt-Spezifikationen -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">{m.dashboard_details_section_specs()}</h4>
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
                {m.dashboard_edit_button_edit()}
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
                  <span class="label-text">{m.dashboard_details_label_domain()}</span>
                </label>
                <input
                  type="text"
                  bind:value={editForm.desiredDomain}
                  id="desiredDomain"
                  name="desiredDomain"
                  class="input input-bordered input-sm"
                  placeholder={m.dashboard_edit_placeholder_domain()}
                />
              </div>

              <div class="form-control">
                <label class="label" for="domainStatus">
                  <span class="label-text">{m.dashboard_details_label_domain_status()}</span>
                </label>
                <select bind:value={editForm.domainStatus} id="domainStatus" name="domainStatus" class="select select-bordered select-sm">
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each ToArray(domainStatus) as status}
                    <option value={status}>{status}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label" for="goals">
                  <span class="label-text">{m.dashboard_details_label_goals()}</span>
                </label>
                <textarea
                  bind:value={editForm.goals}
                  id="goals"
                  name="goals"
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder={m.dashboard_edit_placeholder_goals()}
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label" for="targetAudience">
                  <span class="label-text">{m.dashboard_details_label_audience()}</span>
                </label>
                <textarea
                  bind:value={editForm.targetAudience}
                  id="targetAudience"
                  name="targetAudience"
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder={m.dashboard_edit_placeholder_audience()}
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label" for="timeline">
                  <span class="label-text">{m.dashboard_details_label_timeline()}</span>
                </label>
                <input
                  type="text"
                  bind:value={editForm.timeline}
                  id="timeline"
                  name="timeline"
                  class="input input-bordered input-sm"
                  placeholder={m.dashboard_edit_placeholder_timeline()}
                />
              </div>

              <div class="form-control">
                <label class="label" for="inspiration">
                  <span class="label-text">{m.dashboard_drawer_label_inspiration()}</span>
                </label>
                <textarea
                  bind:value={editForm.inspiration}
                  id="inspiration"
                  name="inspiration"
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder="Inspirationsquellen, Links, Designs..."
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="form-control">
                  <label class="label" for="timelinePreference">
                    <span class="label-text">{m.dashboard_drawer_label_timelinePreference()}</span>
                  </label>
                  <select bind:value={editForm.timelinePreference} id="timelinePreference" name="timelinePreference" class="select select-bordered select-sm">
                    <option value="">{m.dashboard_edit_placeholder_select()}</option>
                    <option value="urgent">Dringend</option>
                    <option value="fast">Schnell</option>
                    <option value="moderate">Moderat</option>
                    <option value="flexible">Flexibel</option>
                    <option value="delayed">Verzögert</option>
                    <option value="whenever">Irgendwann</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label" for="budgetRange">
                    <span class="label-text">{m.dashboard_drawer_label_budgetRange()}</span>
                  </label>
                  <select bind:value={editForm.budgetRange} id="budgetRange" name="budgetRange" class="select select-bordered select-sm">
                    <option value="">{m.dashboard_edit_placeholder_select()}</option>
                    <option value="small">Klein (bis 1.000€)</option>
                    <option value="medium">Mittel (1.000–5.000€)</option>
                    <option value="large">Groß (5.000–15.000€)</option>
                    <option value="xlarge">Sehr groß (15.000–50.000€)</option>
                    <option value="enterprise">Enterprise (50.000€+)</option>
                    <option value="flexible">Flexibel</option>
                  </select>
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="specificDeadline">
                  <span class="label-text">Deadline</span>
                </label>
                <input
                  type="date"
                  bind:value={editForm.specificDeadline}
                  id="specificDeadline"
                  name="specificDeadline"
                  class="input input-bordered input-sm"
                />
              </div>

              <div class="form-control">
                <label class="label" for="specialRequirements">
                  <span class="label-text">{m.dashboard_drawer_label_specialRequirements()}</span>
                </label>
                <textarea
                  bind:value={editForm.specialRequirements}
                  id="specialRequirements"
                  name="specialRequirements"
                  class="textarea textarea-bordered textarea-sm h-20"
                  placeholder="Besondere Anforderungen..."
                ></textarea>
              </div>

              <!-- Service Level Slider -->
              <div class="form-control">
                <label class="label" for="serviceLevel">
                  <span class="label-text">{m.dashboard_drawer_label_serviceLevel()}</span>
                </label>
                <div class="flex items-center gap-2">
                  <span class="text-xs whitespace-nowrap">{m.dashboard_drawer_serviceLevel_full()}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={editForm.serviceLevel}
                    id="serviceLevel"
                    name="serviceLevel"
                    class="range range-primary range-sm flex-1"
                  />
                  <span class="text-xs whitespace-nowrap">{m.dashboard_drawer_serviceLevel_active()}</span>
                </div>
                <span class="text-xs text-base-content/50">{editForm.serviceLevel ?? 50}/100</span>
              </div>

              <!-- Engineering Approach Slider -->
              <div class="form-control">
                <label class="label" for="engineeringApproach">
                  <span class="label-text">{m.dashboard_drawer_label_engineeringApproach()}</span>
                </label>
                <div class="flex items-center gap-2">
                  <span class="text-xs whitespace-nowrap">{m.dashboard_drawer_engineering_quick()}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={editForm.engineeringApproach}
                    id="engineeringApproach"
                    name="engineeringApproach"
                    class="range range-secondary range-sm flex-1"
                  />
                  <span class="text-xs whitespace-nowrap">{m.dashboard_drawer_engineering_over()}</span>
                </div>
                <span class="text-xs text-base-content/50">{editForm.engineeringApproach ?? 50}/100</span>
              </div>

              <!-- PWA Fields -->
              {#if editForm.subType === 'pwaSimple' || editForm.subType === 'pwaExtended'}
                <div class="border-t border-base-300 pt-4 mt-4">
                  <h5 class="text-sm font-semibold mb-3">PWA-Einstellungen</h5>
                  <div class="form-control">
                    <label class="label" for="pwaApproach">
                      <span class="label-text">PWA-Ansatz</span>
                    </label>
                    <select bind:value={editForm.pwaApproach} id="pwaApproach" name="pwaApproach" class="select select-bordered select-sm">
                      <option value="new">Neue PWA erstellen</option>
                      <option value="extend">Bestehende Website erweitern</option>
                    </select>
                  </div>
                  {#if editForm.pwaApproach === 'extend'}
                    <div class="form-control">
                      <label class="label" for="pwaExistingUrl">
                        <span class="label-text">Bestehende URL</span>
                      </label>
                      <input
                        type="url"
                        bind:value={editForm.pwaExistingUrl}
                        id="pwaExistingUrl"
                        name="pwaExistingUrl"
                        class="input input-bordered input-sm"
                        placeholder="https://..."
                      />
                    </div>
                  {/if}
                </div>
              {/if}

              <!-- CMS Fields -->
              {#if editForm.subType === 'cms' || editForm.subType === 'cmsPlus'}
                <div class="border-t border-base-300 pt-4 mt-4">
                  <h5 class="text-sm font-semibold mb-3">CMS-Einstellungen</h5>
                  <div class="form-control">
                    <label class="label" for="cmsComplexity">
                      <span class="label-text">CMS-Komplexität</span>
                    </label>
                    <div class="flex items-center gap-2">
                      <span class="text-xs">Einfach</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        bind:value={editForm.cmsComplexity}
                        id="cmsComplexity"
                        name="cmsComplexity"
                        class="range range-info range-sm flex-1"
                      />
                      <span class="text-xs">Komplex</span>
                    </div>
                    <span class="text-xs text-base-content/50">{editForm.cmsComplexity ?? 50}/100</span>
                  </div>
                  <div class="form-control">
                    <label class="label" for="cmsContentStructure">
                      <span class="label-text">Content-Struktur</span>
                    </label>
                    <textarea
                      bind:value={editForm.cmsContentStructure}
                      id="cmsContentStructure"
                      name="cmsContentStructure"
                      class="textarea textarea-bordered textarea-sm h-20"
                      placeholder="Beschreiben Sie die gewünschte Content-Struktur..."
                    ></textarea>
                  </div>
                </div>
              {/if}

              <!-- KI & Freestyle Fields -->
              {#if editForm.projectType === 'aiSolution' || editForm.projectType === 'freestyle'}
                <div class="border-t border-base-300 pt-4 mt-4">
                  <h5 class="text-sm font-semibold mb-3">KI & Freestyle Einstellungen</h5>
                  <div class="form-control">
                    <label class="label" for="estimatedExpertDays">
                      <span class="label-text">Geschätzte Expertentage</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      bind:value={editForm.estimatedExpertDays}
                      id="estimatedExpertDays"
                      name="estimatedExpertDays"
                      class="input input-bordered input-sm"
                      placeholder="Anzahl Tage"
                    />
                  </div>
                </div>
              {/if}

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>{m.dashboard_edit_button_cancel()}</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    {m.dashboard_edit_button_save_loading()}
                  {:else}
                    {m.dashboard_edit_button_save()}
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_domain()}</span>
                <span class="font-medium">{selectedProject?.desiredDomain || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_domain_status()}</span>
                <div class="badge badge-outline badge-sm">{selectedProject?.domainStatus || m.dashboard_details_fallback_not_specified()}</div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_goals()}</span>
                <span class="text-sm">{selectedProject?.goals || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_drawer_label_inspiration()}</span>
                <span class="text-sm">{selectedProject?.inspiration || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base-content/60">{m.dashboard_details_label_audience()}</span>
                <span class="text-sm">{selectedProject?.targetAudience || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_timeline()}</span>
                <span class="font-medium">{selectedProject?.timeline || m.dashboard_details_fallback_not_specified()}</span>
              </div>
              {#if selectedProject?.timelinePreference}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_drawer_label_timelinePreference()}</span>
                  <span class="font-medium">{selectedProject?.timelinePreference}</span>
                </div>
              {/if}
              {#if selectedProject?.specificDeadline}
                <div class="flex justify-between">
                  <span class="text-base-content/60">Deadline</span>
                  <span class="font-medium">{new Date(selectedProject?.specificDeadline).toLocaleDateString('de-DE')}</span>
                </div>
              {/if}
              {#if selectedProject?.budgetRange}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_drawer_label_budgetRange()}</span>
                  <span class="font-medium">{selectedProject?.budgetRange}</span>
                </div>
              {/if}
              {#if selectedProject?.specialRequirements}
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60">{m.dashboard_drawer_label_specialRequirements()}</span>
                  <span class="text-sm">{selectedProject?.specialRequirements}</span>
                </div>
              {/if}
              {#if selectedProject?.serviceLevel !== undefined}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_drawer_label_serviceLevel()}</span>
                  <span class="font-medium">{selectedProject?.serviceLevel}/100</span>
                </div>
              {/if}
              {#if selectedProject?.engineeringApproach !== undefined}
                <div class="flex justify-between">
                  <span class="text-base-content/60">{m.dashboard_drawer_label_engineeringApproach()}</span>
                  <span class="font-medium">{selectedProject?.engineeringApproach}/100</span>
                </div>
              {/if}
              {#if selectedProject?.pwaApproach}
                <div class="border-t border-base-300 pt-3 mt-3">
                  <h5 class="text-sm font-semibold mb-2">PWA-Einstellungen</h5>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">PWA-Ansatz</span>
                    <span class="font-medium">{selectedProject?.pwaApproach === 'new' ? 'Neue PWA erstellen' : 'Bestehende erweitern'}</span>
                  </div>
                  {#if selectedProject?.pwaExistingUrl}
                    <div class="flex justify-between mt-1">
                      <span class="text-base-content/60">URL</span>
                      <a href={selectedProject?.pwaExistingUrl} target="_blank" class="text-primary text-sm hover:underline">{selectedProject?.pwaExistingUrl}</a>
                    </div>
                  {/if}
                </div>
              {/if}
              {#if selectedProject?.cmsComplexity !== undefined}
                <div class="border-t border-base-300 pt-3 mt-3">
                  <h5 class="text-sm font-semibold mb-2">CMS-Einstellungen</h5>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Komplexität</span>
                    <span class="font-medium">{selectedProject?.cmsComplexity}/100</span>
                  </div>
                  {#if selectedProject?.cmsContentStructure}
                    <div class="flex flex-col gap-1 mt-1">
                      <span class="text-base-content/60">Content-Struktur</span>
                      <span class="text-sm">{selectedProject?.cmsContentStructure}</span>
                    </div>
                  {/if}
                </div>
              {/if}
              {#if selectedProject?.estimatedExpertDays}
                <div class="border-t border-base-300 pt-3 mt-3">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Geschätzte Expertentage</span>
                    <span class="font-medium">{selectedProject?.estimatedExpertDays} Tage</span>
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>

      <!-- Budget & Preise -->
      <div class="card bg-base-200">
        <div class="card-body">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="card-title text-base">{m.dashboard_details_section_budget()}</h4>
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
                {m.dashboard_edit_button_edit()}
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
                  <span class="label-text">{m.dashboard_details_label_budget()}</span>
                </label>
                <input
                  type="text"
                  bind:value={editForm.budget}
                  id="budget"
                  name="budget"
                  class="input input-bordered input-sm"
                  placeholder={m.dashboard_edit_placeholder_budget()}
                />
              </div>

              <div class="form-control">
                <label class="label" for="estimatedPrice">
                  <span class="label-text">{m.dashboard_details_label_estimated_price()}</span>
                </label>
                <input
                  type="number"
                  bind:value={editForm.estimatedPrice}
                  id="estimatedPrice"
                  name="estimatedPrice"
                  class="input input-bordered input-sm"
                  placeholder={m.dashboard_edit_placeholder_price()}
                />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>{m.dashboard_edit_button_cancel()}</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    {m.dashboard_edit_button_save_loading()}
                  {:else}
                    {m.dashboard_edit_button_save()}
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_budget()}</span>
                <span class="font-medium">{formatBudget(selectedProject?.budget || '')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_estimated_price()}</span>
                <span class="font-medium">
                  {selectedProject?.estimatedPrice ? `${selectedProject?.estimatedPrice}€` : m.dashboard_details_fallback_not_calculated()}
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
            <h4 class="card-title text-base">{m.dashboard_details_section_features()}</h4>
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
                {m.dashboard_edit_button_edit()}
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
                  <span class="label-text">{m.dashboard_edit_label_features_select()}</span>
                </label>
                <div class="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto">
                  {#each ToArray(features) as feature}
                    <label class="label cursor-pointer justify-start">
                      <input
                        id="feature-{feature}"
                        name="feature-{feature}"
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
                  <span class="label-text">{m.dashboard_details_label_custom_feature()}</span>
                </label>
                <input
                  type="text"
                  bind:value={editForm.customFeature}
                  id="customFeature"
                  name="customFeature"
                  class="input input-bordered input-sm"
                  placeholder={m.dashboard_edit_placeholder_custom_feature()}
                />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>{m.dashboard_edit_button_cancel()}</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    {m.dashboard_edit_button_save_loading()}
                  {:else}
                    {m.dashboard_edit_button_save()}
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
              <p class="text-base-content/60 text-sm">{m.dashboard_details_fallback_no_features()}</p>
            {/if}
            {#if selectedProject?.customFeature}
              <div class="mt-2">
                <div class="text-base-content/60 text-sm">{m.dashboard_details_label_custom_feature()}</div>
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
            <h4 class="card-title text-base">{m.dashboard_details_section_design()}</h4>
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
                {m.dashboard_edit_button_edit()}
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
                  <span class="label-text">{m.dashboard_details_label_primary_color()}</span>
                </label>
                <div class="flex items-center gap-2">
                  <input
                    type="color"
                    id="primaryColour"
                    name="primaryColour"
                    bind:value={editForm.primaryColour}
                    class="border-base-300 h-8 w-12 rounded border"
                  />
                  <input
                    type="text"
                    id="primaryColourText"
                    name="primaryColourText"
                    bind:value={editForm.primaryColour}
                    class="input input-bordered input-sm flex-1"
                    placeholder={m.dashboard_edit_placeholder_color()}
                  />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="secondaryColourText">
                  <span class="label-text">{m.dashboard_details_label_secondary_color()}</span>
                </label>
                <div class="flex items-center gap-2">
                  <input
                    type="color"
                    id="secondaryColour"
                    name="secondaryColour"
                    bind:value={editForm.secondaryColour}
                    class="border-base-300 h-8 w-12 rounded border"
                  />
                  <input
                    type="text"
                    id="secondaryColourText"
                    name="secondaryColourText"
                    bind:value={editForm.secondaryColour}
                    class="input input-bordered input-sm flex-1"
                    placeholder={m.dashboard_edit_placeholder_color()}
                  />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="accentColourText">
                  <span class="label-text">{m.dashboard_details_label_accent_color()}</span>
                </label>
                <div class="flex items-center gap-2">
                  <input
                    type="color"
                    id="accentColour"
                    name="accentColour"
                    bind:value={editForm.accentColour}
                    class="border-base-300 h-8 w-12 rounded border"
                  />
                  <input
                    type="text"
                    id="accentColourText"
                    name="accentColourText"
                    bind:value={editForm.accentColour}
                    class="input input-bordered input-sm flex-1"
                    placeholder={m.dashboard_edit_placeholder_color()}
                  />
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="desiredFont">
                  <span class="label-text">{m.dashboard_details_label_font()}</span>
                </label>
                <input
                  type="text"
                  bind:value={editForm.desiredFont}
                  id="desiredFont"
                  name="desiredFont"
                  class="input input-bordered input-sm"
                  placeholder={m.dashboard_edit_placeholder_font()}
                />
              </div>

              <div class="flex justify-end gap-2">
                <button class="btn btn-sm btn-ghost" onclick={cancelEdit}>{m.dashboard_edit_button_cancel()}</button>
                <button class="btn btn-sm btn-simple" onclick={saveProjectSection} disabled={editSaving}>
                  {#if editSaving}
                    <span class="loading loading-spinner loading-xs"></span>
                    {m.dashboard_edit_button_save_loading()}
                  {:else}
                    {m.dashboard_edit_button_save()}
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Anzeigemodus -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_primary_color()}</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject?.primaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject?.primaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject?.primaryColour}</span>
                  {:else}
                    <span class="text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_secondary_color()}</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject?.secondaryColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject?.secondaryColour}"></div>
                    <span class="font-mono text-xs">{selectedProject?.secondaryColour}</span>
                  {:else}
                    <span class="text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_accent_color()}</span>
                <div class="flex items-center gap-2">
                  {#if selectedProject?.accentColour}
                    <div class="border-base-300 h-4 w-4 rounded border" style="background-color: {selectedProject?.accentColour}"></div>
                    <span class="font-mono text-xs">{selectedProject?.accentColour}</span>
                  {:else}
                    <span class="text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_details_label_font()}</span>
                <span class="font-medium">{selectedProject?.desiredFont || m.dashboard_details_fallback_not_specified()}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Dateien -->
      <div class="card bg-base-200 lg:col-span-2">
        <div class="card-body">
          <h4 class="card-title text-base">{m.dashboard_details_section_files()}</h4>
          
          <!-- Upload section -->
          <div class="mb-4">
            <div class="upload-area">
              <input
                type="file"
                id="admin-file-upload"
                multiple
                class="hidden"
                onchange={handleFileUpload}
                accept="*/*"
              />
              <label for="admin-file-upload" class="upload-label">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span class="text-sm font-medium">Dateien auswählen</span>
                <span class="text-xs text-base-content/50">oder hier ablegen</span>
              </label>
            </div>

            {#if uploadedFiles.length > 0}
              <div class="space-y-2 mt-3">
                <span class="text-xs font-medium uppercase text-base-content/60">Ausgewählte Dateien ({uploadedFiles.length})</span>
                {#each uploadedFiles as file, i}
                  <div class="bg-base-100 flex items-center justify-between rounded-lg p-3">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-sm">{file.name}</span>
                      <span class="text-xs text-base-content/50">({Math.round(file.size / 1024)} KB)</span>
                    </div>
                    <button class="btn btn-ghost btn-sm btn-square text-error" onclick={() => removeUploadedFile(i)} aria-label={m.dashboard_drawer_remove()}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                {/each}
                
                <button class="btn btn-primary btn-sm w-full mt-2" onclick={uploadFilesAndSave} disabled={uploading}>
                  {#if uploading}
                    <span class="loading loading-spinner loading-sm"></span>
                    {m.dashboard_drawer_uploading()}
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Dateien hochladen
                  {/if}
                </button>
              </div>
            {/if}

            {#if uploadProgress}
              <div class="mt-3 rounded-lg p-3 {editError ? 'bg-error/10' : 'bg-success/10'}">
                <p class="text-sm {editError ? 'text-error' : 'text-success'}">{uploadProgress}</p>
              </div>
            {/if}
          </div>

          {#if selectedProject?.relatedFiles && selectedProject?.relatedFiles.length > 0}
            <div class="space-y-2">
              <span class="text-xs font-medium uppercase text-base-content/60">Bereits hochgeladene Dateien</span>
              {#each selectedProject?.relatedFiles as file}
                <div class="bg-base-100 flex items-center justify-between rounded p-2">
                  <span class="truncate text-sm">{file.fileName || m.dashboard_details_fallback_unnamed_file()}</span>
                  {#if file.url}
                    <button onclick={() => window.open(file.url, '_blank')} class="btn btn-xs btn-simple"> {m.dashboard_details_button_open()} </button>
                  {/if}
                </div>
              {/each}
            </div>
          {:else if uploadedFiles.length === 0}
            <p class="text-base-content/50 text-sm">{m.dashboard_drawer_no_files()}</p>
          {/if}
        </div>
      </div>

      <!-- Service Setup -->
      <div class="card bg-base-200 lg:col-span-2">
        <div class="card-body">
          <h4 class="card-title text-base">{m.dashboard_edit_section_setup()}</h4>
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
                  <span class="font-semibold">{m.dashboard_setup_section_github()}</span>
                  {#if selectedProject?.setup?.github?.isConfigured}
                    <div class="badge badge-success badge-xs">{m.dashboard_edit_status_configured()}</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">{m.dashboard_edit_status_not_configured()}</div>
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
                    {m.dashboard_edit_button_edit()}
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
                    <input
                      type="text"
                      bind:value={serviceForm.username}
                      id="githubUsername"
                      name="githubUsername"
                      class="input input-bordered input-xs"
                      placeholder="GitHub Username"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="githubPassword">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input
                      type="password"
                      bind:value={serviceForm.password}
                      id="githubPassword"
                      name="githubPassword"
                      class="input input-bordered input-xs"
                      placeholder="GitHub Passwort"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="githubAuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea
                      bind:value={serviceForm.authTokens}
                      id="githubAuthTokens"
                      name="githubAuthTokens"
                      class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs"
                      placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input
                        type="checkbox"
                        id="githubIsConfigured"
                        name="githubIsConfigured"
                        bind:checked={serviceForm.isConfigured}
                        class="checkbox checkbox-xs checkbox-primary"
                      />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>{m.dashboard_edit_button_cancel()}</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                        {m.dashboard_edit_button_save_loading()}
                      {:else}
                        {m.dashboard_edit_button_save()}
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.github?.username || m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.github?.password ? '••••••••' : m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span
                      >{selectedProject?.setup?.github?.authTokens ? m.dashboard_edit_status_tokens_present() : m.dashboard_edit_status_tokens_missing()}</span
                    >
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
                  <span class="font-semibold">{m.dashboard_setup_section_netlify()}</span>
                  {#if selectedProject?.setup?.netlify?.isConfigured}
                    <div class="badge badge-success badge-xs">{m.dashboard_edit_status_configured()}</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">{m.dashboard_edit_status_not_configured()}</div>
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
                    {m.dashboard_edit_button_edit()}
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
                    <input
                      type="text"
                      bind:value={serviceForm.username}
                      id="netlifyUsername"
                      name="netlifyUsername"
                      class="input input-bordered input-xs"
                      placeholder="Netlify Username"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="netlifyPassword">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input
                      type="password"
                      bind:value={serviceForm.password}
                      id="netlifyPassword"
                      name="netlifyPassword"
                      class="input input-bordered input-xs"
                      placeholder="Netlify Passwort"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="netlifyAuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea
                      bind:value={serviceForm.authTokens}
                      id="netlifyAuthTokens"
                      name="netlifyAuthTokens"
                      class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs"
                      placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input
                        type="checkbox"
                        bind:checked={serviceForm.isConfigured}
                        id="netlifyIsConfigured"
                        name="netlifyIsConfigured"
                        class="checkbox checkbox-xs checkbox-primary"
                      />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>{m.dashboard_edit_button_cancel()}</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                        {m.dashboard_edit_button_save_loading()}
                      {:else}
                        {m.dashboard_edit_button_save()}
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.netlify?.username || m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.netlify?.password ? '••••••••' : m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span
                      >{selectedProject?.setup?.netlify?.authTokens ? m.dashboard_edit_status_tokens_present() : m.dashboard_edit_status_tokens_missing()}</span
                    >
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
                  <span class="font-semibold">{m.dashboard_setup_section_hygraph()}</span>
                  {#if selectedProject?.setup?.hygraph?.isConfigured}
                    <div class="badge badge-success badge-xs">{m.dashboard_edit_status_configured()}</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">{m.dashboard_edit_status_not_configured()}</div>
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
                    {m.dashboard_edit_button_edit()}
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
                    <input
                      type="text"
                      bind:value={serviceForm.username}
                      id="hygraphUsername"
                      name="netlifyUsername"
                      class="input input-bordered input-xs"
                      placeholder="Hygraph Username"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="hygraphPassword">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input
                      type="password"
                      bind:value={serviceForm.password}
                      id="hygraphPassword"
                      name="hygraphPassword"
                      class="input input-bordered input-xs"
                      placeholder="Hygraph Passwort"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="hygraphAuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea
                      bind:value={serviceForm.authTokens}
                      id="hygraphAuthTokens"
                      name="hygraphAuthTokens"
                      class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs"
                      placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input
                        type="checkbox"
                        id="hygraphIsConfigured"
                        name="hygraphIsConfigured"
                        bind:checked={serviceForm.isConfigured}
                        class="checkbox checkbox-xs checkbox-primary"
                      />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>{m.dashboard_edit_button_cancel()}</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                        {m.dashboard_edit_button_save_loading()}
                      {:else}
                        {m.dashboard_edit_button_save()}
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.hygraph?.username || m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.hygraph?.password ? '••••••••' : m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span
                      >{selectedProject?.setup?.hygraph?.authTokens ? m.dashboard_edit_status_tokens_present() : m.dashboard_edit_status_tokens_missing()}</span
                    >
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
                  <span class="font-semibold">{m.dashboard_setup_section_auth0()}</span>
                  {#if selectedProject?.setup?.auth0?.isConfigured}
                    <div class="badge badge-success badge-xs">{m.dashboard_edit_status_configured()}</div>
                  {:else}
                    <div class="badge badge-warning badge-xs">{m.dashboard_edit_status_not_configured()}</div>
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
                    {m.dashboard_edit_button_edit()}
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
                    <input
                      type="text"
                      bind:value={serviceForm.username}
                      id="auth0Username"
                      name="auth0Username"
                      class="input input-bordered input-xs"
                      placeholder="Auth0 Username"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="auth0Password">
                      <span class="label-text text-xs">Passwort</span>
                    </label>
                    <input
                      type="password"
                      bind:value={serviceForm.password}
                      id="auth0Password"
                      name="auth0Password"
                      class="input input-bordered input-xs"
                      placeholder="Auth0 Passwort"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label" for="auth0AuthTokens">
                      <span class="label-text text-xs">Auth Tokens (JSON)</span>
                    </label>
                    <textarea
                      bind:value={serviceForm.authTokens}
                      id="auth0AuthTokens"
                      name="auth0AuthTokens"
                      class="textarea textarea-bordered textarea-xs h-16 font-mono text-xs"
                      placeholder="Token"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs">Konfiguriert</span>
                      <input
                        type="checkbox"
                        bind:checked={serviceForm.isConfigured}
                        id="auth0Username"
                        name="auth0Username"
                        class="checkbox checkbox-xs checkbox-primary"
                      />
                    </label>
                  </div>

                  <div class="flex justify-end gap-1">
                    <button class="btn btn-xs btn-ghost" onclick={cancelServiceEdit}>{m.dashboard_edit_button_cancel()}</button>
                    <button class="btn btn-xs btn-simple" onclick={saveSetupService} disabled={serviceSaving}>
                      {#if serviceSaving}
                        <span class="loading loading-spinner loading-xs"></span>
                        {m.dashboard_edit_button_save_loading()}
                      {:else}
                        {m.dashboard_edit_button_save()}
                      {/if}
                    </button>
                  </div>
                </div>
              {:else}
                <!-- Anzeigemodus -->
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Username:</span>
                    <span>{selectedProject?.setup?.auth0?.username || m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Passwort:</span>
                    <span>{selectedProject?.setup?.auth0?.password ? '••••••••' : m.dashboard_details_fallback_not_specified()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/60">Auth Tokens:</span>
                    <span
                      >{selectedProject?.setup?.auth0?.authTokens ? m.dashboard_edit_status_tokens_present() : m.dashboard_edit_status_tokens_missing()}</span
                    >
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
          <h4 class="card-title text-base">{m.dashboard_details_section_meta()}</h4>
          <div class="space-y-3">
            <div class="flex flex-col gap-1">
              <span class="text-base-content/60">{m.dashboard_details_label_project_id()}</span>
              <span class="font-mono text-xs">{selectedProject?.id}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-base-content/60">{m.dashboard_details_label_created_at()}</span>
              <span class="font-medium">
                {selectedProject?.createdAt ? formatDate(selectedProject?.createdAt) : m.dashboard_details_fallback_unknown()}
              </span>
            </div>
            {#if selectedProject?.setup?.github?.lastUpdated || selectedProject?.setup?.netlify?.lastUpdated || selectedProject?.setup?.hygraph?.lastUpdated || selectedProject?.setup?.auth0?.lastUpdated}
              <div class="flex justify-between">
                <span class="text-base-content/60">{m.dashboard_edit_label_setup_updated()}</span>
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
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
