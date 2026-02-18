<script lang="ts">
  import type { Project } from '$interfaces/project.interface';
  import {
    availableFeatures,
    featureCategoryColors,
    formFieldTypes,
    googleFonts,
    projectTypesWebApp,
    projectTypesAiFreestyle,
    projectSubTypesWebsite,
    projectSubTypesApp,
    projectSubTypesAi,
    projectSubTypesFreestyle
  } from '$lib/configs/wizard-config';
  import {
    formatDate,
    formatBudget,
    getStatusBadgeClass,
    getStatusLabel,
    getProjectTypeLabel,
    getProjectSubTypeLabel,
    getProjectTypeIcon,
    getStatusProgress,
    getFeatureLabel,
    isProjectEditable,
    isProjectSubmitted,
    ToArray
  } from '$lib/helper/projectUtils';
  import { projectStatus } from '$interfaces/project.interface';
  import { m } from '$lib/paraglide/messages';
  import { authFetch } from '$lib/helper/auth-fetch';
  import { uploadAssetWithStatusCheck } from '$lib/helper/uploadAsset';

  let { project = $bindable(), onClose, onProjectUpdated }: {
    project: Project | null;
    onClose: () => void;
    onProjectUpdated?: (project: Project) => void;
  } = $props();

  let activeTab = $state<'overview' | 'specs' | 'design' | 'features' | 'files'>('overview');
  let saving = $state(false);
  let saveMessage = $state('');
  let saveError = $state(false);
  let submitting = $state(false);
  let showSubmitConfirm = $state(false);
  let uploading = $state(false);
  let uploadProgress = $state('');
  let uploadedFiles: File[] = $state([]);

  let editable = $derived(project ? isProjectEditable(project.projectStatus) : false);
  let submitted = $derived(project ? isProjectSubmitted(project.projectStatus) : false);
  let progress = $derived(project ? getStatusProgress(project.projectStatus) : 0);
  let icon = $derived(project ? getProjectTypeIcon(project.projectType) : '📁');

  let editData: Partial<Project> = $state({});
  let lastProjectId: string | undefined = $state(undefined);

  function parseJsonField<T>(value: unknown): T[] {
    if (Array.isArray(value)) return value as T[];
    if (typeof value === 'string') {
      try { return JSON.parse(value) as T[]; } catch { return []; }
    }
    return [];
  }

  $effect(() => {
    if (project) {
      const isNewProject = project.id !== lastProjectId;
      lastProjectId = project.id;

      editData = {
        ...project,
        features: project.features || [],
        pages: parseJsonField(project.pages),
        formFields: parseJsonField(project.formFields)
      };

      if (isNewProject) {
        activeTab = 'overview';
        saveMessage = '';
        saveError = false;
        showSubmitConfirm = false;
      }
      
      // Prevent body scrolling when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scrolling when drawer is closed
      document.body.style.overflow = '';
    }
    
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';
    };
  });

  const allProjectTypes = [...projectTypesWebApp, ...projectTypesAiFreestyle];
  const allSubTypes = [...projectSubTypesWebsite, ...projectSubTypesApp, ...projectSubTypesAi, ...projectSubTypesFreestyle];

  function resolveTitle(key: string): string {
    const fn = (m as unknown as Record<string, (() => string) | undefined>)[key];
    return fn ? fn() : key;
  }

  function updateField(field: keyof Project, value: unknown) {
    if (!editable) return;
    editData = { ...editData, [field]: value };
  }

  function toggleFeature(featureId: string) {
    if (!editable) return;
    const current = editData.features || [];
    if (current.includes(featureId)) {
      editData = { ...editData, features: current.filter((f) => f !== featureId) };
    } else {
      editData = { ...editData, features: [...current, featureId] };
    }
  }

  // Pages management
  function addPage() {
    const pages = [...(editData.pages || []), { name: '', content: '' }];
    editData = { ...editData, pages };
  }

  function removePage(index: number) {
    const pages = (editData.pages || []).filter((_, i) => i !== index);
    editData = { ...editData, pages };
  }

  function updatePage(index: number, field: string, value: string) {
    const pages = [...(editData.pages || [])];
    pages[index] = { ...pages[index], [field]: value };
    editData = { ...editData, pages };
  }

  // Form fields management
  function addFormField() {
    const formFields = [...(editData.formFields || []), { type: 'text', name: '', required: false }];
    editData = { ...editData, formFields };
  }

  function removeFormField(index: number) {
    const formFields = (editData.formFields || []).filter((_, i) => i !== index);
    editData = { ...editData, formFields };
  }

  function updateFormField(index: number, field: string, value: unknown) {
    const formFields = [...(editData.formFields || [])];
    formFields[index] = { ...formFields[index], [field]: value };
    editData = { ...editData, formFields };
  }

  // File upload management
  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const newFiles = Array.from(target.files);
      uploadedFiles = [...uploadedFiles, ...newFiles];
      target.value = ''; // Reset input
    }
  }

  function removeUploadedFile(index: number) {
    uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
  }

  async function uploadFilesAndSave() {
    if (!project?.id || uploadedFiles.length === 0) return;
    
    uploading = true;
    uploadProgress = `Lade ${uploadedFiles.length} Datei(en) hoch...`;
    saveError = false;

    try {
      const uploadedAssetIds: string[] = [];

      // Upload each file with status check
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
        saveError = true;
        setTimeout(() => { uploadProgress = ''; }, 3000);
        return;
      }

      uploadProgress = `${uploadedAssetIds.length} Datei(en) hochgeladen, verknüpfe mit Projekt...`;

      // Get existing file IDs
      const existingFileIds = (project.relatedFiles || []).map((f) => ({ id: f.id })).filter(f => f.id);
      const newFileIds = uploadedAssetIds.map((id) => ({ id }));
      const allFileIds = [...existingFileIds, ...newFileIds];

      // Patch project with new files
      const response = await authFetch(`/api/project/patch/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          relatedFiles: allFileIds
        })
      });

      if (response.ok) {
        const data = await response.json();
        project = { ...project, relatedFiles: data.data.relatedFiles };
        editData = { ...editData, relatedFiles: data.data.relatedFiles };
        
        uploadProgress = 'Veröffentliche Projekt...';
        
        // Publish project
        await authFetch(`/api/project/publish/${project.id}`, { method: 'POST' });
        
        uploadProgress = 'Dateien erfolgreich hochgeladen!';
        saveError = false;
        uploadedFiles = [];
        onProjectUpdated?.(project);
      } else {
        uploadProgress = 'Fehler beim Verknüpfen der Dateien';
        saveError = true;
      }
    } catch (error) {
      console.error('File upload error:', error);
      uploadProgress = 'Fehler beim Hochladen';
      saveError = true;
    } finally {
      uploading = false;
      setTimeout(() => { uploadProgress = ''; }, 5000);
    }
  }

  async function saveProject() {
    if (!project?.id || !editable) return;
    saving = true;
    saveMessage = '';
    saveError = false;
    
    console.group('🔵 PROJECT SAVE REQUEST');
    console.log('Project ID:', project.id);
    console.log('Editable:', editable);

    try {
      // Helper function to convert null to empty string
      const sanitizeString = (value: unknown): string => {
        if (value === null || value === undefined) return '';
        return String(value);
      };

      const requestBody = {
        id: project.id,
        name: sanitizeString(editData.name),
        description: sanitizeString(editData.description),
        projectCategory: sanitizeString(editData.projectCategory),
        projectType: sanitizeString(editData.projectType),
        subType: sanitizeString(editData.subType),
        projectDetails: sanitizeString(editData.projectDetails),
        desiredDomain: sanitizeString(editData.desiredDomain),
        domainStatus: sanitizeString(editData.domainStatus),
        goals: sanitizeString(editData.goals),
        inspiration: sanitizeString(editData.inspiration),
        targetAudience: sanitizeString(editData.targetAudience),
        budget: sanitizeString(editData.budget),
        timeline: sanitizeString(editData.timeline),
        features: editData.features,
        customFeature: sanitizeString(editData.customFeature),
        primaryColour: sanitizeString(editData.primaryColour),
        secondaryColour: sanitizeString(editData.secondaryColour),
        accentColour: sanitizeString(editData.accentColour),
        desiredFont: sanitizeString(editData.desiredFont),
        estimatedPrice: editData.estimatedPrice,
        serviceLevel: editData.serviceLevel,
        engineeringApproach: editData.engineeringApproach,
        specialRequirements: sanitizeString(editData.specialRequirements),
        timelinePreference: sanitizeString(editData.timelinePreference),
        specificDeadline: sanitizeString(editData.specificDeadline),
        budgetRange: sanitizeString(editData.budgetRange),
        pwaApproach: sanitizeString(editData.pwaApproach),
        pwaExistingUrl: sanitizeString(editData.pwaExistingUrl),
        cmsComplexity: editData.cmsComplexity,
        cmsContentStructure: sanitizeString(editData.cmsContentStructure),
        pages: editData.pages,
        formFields: editData.formFields
      };
      
      console.log('Request URL:', `/api/project/patch/${project.id}`);
      console.log('Request Body (sanitized):', requestBody);
      
      const response = await authFetch(`/api/project/patch/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      console.log('Response Status:', response.status, response.statusText);
      console.log('Response OK:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ SUCCESS - Response Data:', data);
        project = { ...project, ...editData };
        saveMessage = m.dashboard_drawer_save_success();
        saveError = false;
        onProjectUpdated?.(project);

        // Publish wird server-seitig im PATCH-Endpoint nach 3s automatisch durchgeführt
      } else {
        const errorText = await response.text();
        console.error('❌ ERROR - Response:', errorText);
        console.error('Status:', response.status);
        console.error('Headers:', Object.fromEntries(response.headers.entries()));
        saveMessage = m.dashboard_drawer_save_error();
        saveError = true;
      }
    } catch (error) {
      console.error('❌ EXCEPTION:', error);
      saveMessage = m.dashboard_drawer_save_error();
      saveError = true;
    } finally {
      console.groupEnd();
      saving = false;
      setTimeout(() => { saveMessage = ''; }, 3000);
    }
  }

  async function submitProject() {
    if (!project?.id || !editable) return;
    submitting = true;

    try {
      const sanitizeString = (value: unknown): string | undefined => {
        if (value === null || value === undefined) return undefined;
        return String(value);
      };

      // Sanitiertes Patch-Objekt – identisch mit saveProject(), plus projectStatus
      const patchData = {
        id: project.id,
        name: sanitizeString(editData.name),
        description: sanitizeString(editData.description),
        projectCategory: sanitizeString(editData.projectCategory),
        projectType: sanitizeString(editData.projectType),
        subType: sanitizeString(editData.subType),
        projectDetails: sanitizeString(editData.projectDetails),
        desiredDomain: sanitizeString(editData.desiredDomain),
        domainStatus: sanitizeString(editData.domainStatus),
        goals: sanitizeString(editData.goals),
        inspiration: sanitizeString(editData.inspiration),
        targetAudience: sanitizeString(editData.targetAudience),
        budget: sanitizeString(editData.budget),
        timeline: sanitizeString(editData.timeline),
        features: editData.features,
        customFeature: sanitizeString(editData.customFeature),
        primaryColour: sanitizeString(editData.primaryColour),
        secondaryColour: sanitizeString(editData.secondaryColour),
        accentColour: sanitizeString(editData.accentColour),
        desiredFont: sanitizeString(editData.desiredFont),
        estimatedPrice: editData.estimatedPrice ?? undefined,
        serviceLevel: editData.serviceLevel ?? undefined,
        engineeringApproach: editData.engineeringApproach ?? undefined,
        specialRequirements: sanitizeString(editData.specialRequirements),
        timelinePreference: sanitizeString(editData.timelinePreference),
        specificDeadline: sanitizeString(editData.specificDeadline),
        budgetRange: sanitizeString(editData.budgetRange),
        pwaApproach: sanitizeString(editData.pwaApproach),
        pwaExistingUrl: sanitizeString(editData.pwaExistingUrl),
        cmsComplexity: editData.cmsComplexity ?? undefined,
        cmsContentStructure: sanitizeString(editData.cmsContentStructure),
        pages: editData.pages,
        formFields: editData.formFields,
        projectStatus: ToArray(projectStatus)[1] // 'introduced'
      };
      const saveResponse = await authFetch(`/api/project/patch/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData)
      });

      if (saveResponse.ok) {
        project = { ...project, ...editData, projectStatus: ToArray(projectStatus)[1] };
        saveMessage = m.dashboard_drawer_submit_success();
        saveError = false;
        showSubmitConfirm = false;
        onProjectUpdated?.(project);

        // Publish wird server-seitig im PATCH-Endpoint nach 3s automatisch durchgeführt
      } else {
        saveMessage = m.dashboard_drawer_submit_error();
        saveError = true;
      }
    } catch {
      saveMessage = m.dashboard_drawer_submit_error();
      saveError = true;
    } finally {
      submitting = false;
    }
  }
</script>

{#if project}
  <!-- Backdrop -->
  <button class="drawer-backdrop" onclick={onClose} aria-label={m.dashboard_drawer_close()}></button>

  <!-- Drawer Panel -->
  <div class="drawer-panel">
    <!-- Header -->
    <div class="drawer-header">
      <div class="header-bg-gradient"></div>
      <div class="header-content">
        <div class="flex items-center gap-3">
          <span class="text-3xl">{icon}</span>
          <div>
            <h2 class="text-xl font-bold text-white">{project.name}</h2>
            <div class="mt-1 flex items-center gap-2">
              {#if project.projectStatus}
                <span class="badge badge-sm {getStatusBadgeClass(project.projectStatus)}">{getStatusLabel(project.projectStatus)}</span>
              {/if}
              {#if editable}
                <span class="badge badge-sm badge-outline border-white/30 text-white/80">{m.dashboard_projectCard_draft()}</span>
              {:else}
                <span class="badge badge-sm bg-white/15 border-white/20 text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                  {m.dashboard_projectCard_locked()}
                </span>
              {/if}
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20" onclick={onClose} aria-label={m.dashboard_drawer_close()}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Progress -->
      <div class="progress-row">
        <div class="progress-track">
          <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        <span class="text-xs text-white/60">{progress}%</span>
      </div>
    </div>

    <!-- Locked Notice -->
    {#if !editable}
      <div class="locked-notice">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <span>{m.dashboard_drawer_locked_notice()}</span>
      </div>
    {/if}

    <!-- Tabs -->
    <div class="drawer-tabs">
      <button class="tab-btn" class:active={activeTab === 'overview'} onclick={() => activeTab = 'overview'}>{m.dashboard_drawer_tab_overview()}</button>
      <button class="tab-btn" class:active={activeTab === 'specs'} onclick={() => activeTab = 'specs'}>{m.dashboard_drawer_tab_specs()}</button>
      <button class="tab-btn" class:active={activeTab === 'design'} onclick={() => activeTab = 'design'}>{m.dashboard_drawer_tab_design()}</button>
      <button class="tab-btn" class:active={activeTab === 'features'} onclick={() => activeTab = 'features'}>{m.dashboard_drawer_tab_features()}</button>
      <button class="tab-btn" class:active={activeTab === 'files'} onclick={() => activeTab = 'files'}>{m.dashboard_drawer_tab_files()}</button>
    </div>

    <!-- Tab Content -->
    <div class="drawer-content">
      <!-- OVERVIEW TAB -->
      {#if activeTab === 'overview'}
        <div class="tab-panel">
          <div class="field-group">
            <span class="field-label">{m.dashboard_edit_label_name()}</span>
            {#if editable}
              <input type="text" class="input input-bordered w-full" value={editData.name || ''} oninput={(e) => updateField('name', e.currentTarget.value)} />
            {:else}
              <p class="field-value">{project.name}</p>
            {/if}
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_details_label_description()}</span>
            {#if editable}
              <textarea class="textarea textarea-bordered w-full" rows="3" value={editData.description || ''} oninput={(e) => updateField('description', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_description()}></textarea>
            {:else}
              <p class="field-value">{project.description || m.dashboard_details_fallback_no_description()}</p>
            {/if}
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_details_label_details()}</span>
            {#if editable}
              <textarea class="textarea textarea-bordered w-full" rows="4" value={editData.projectDetails || ''} oninput={(e) => updateField('projectDetails', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_details()}></textarea>
            {:else}
              <p class="field-value">{project.projectDetails || m.dashboard_details_fallback_no_details()}</p>
            {/if}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_type()}</span>
              {#if editable}
                <select class="select select-bordered w-full" value={editData.projectType || ''} onchange={(e) => updateField('projectType', e.currentTarget.value)}>
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each allProjectTypes as pt}
                    <option value={pt.id}>{resolveTitle(pt.label ?? pt.title)}</option>
                  {/each}
                </select>
              {:else}
                <p class="field-value">{getProjectTypeLabel(project.projectType || '') || m.dashboard_details_fallback_not_specified()}</p>
              {/if}
            </div>

            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_subtype()}</span>
              {#if editable}
                <select class="select select-bordered w-full" value={editData.subType || ''} onchange={(e) => updateField('subType', e.currentTarget.value)}>
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  {#each allSubTypes as st}
                    <option value={st.id}>{resolveTitle(st.title)}</option>
                  {/each}
                </select>
              {:else}
                <p class="field-value">{getProjectSubTypeLabel(project.subType || '') || m.dashboard_details_fallback_not_specified()}</p>
              {/if}
            </div>
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_details_label_goals()}</span>
            {#if editable}
              <textarea class="textarea textarea-bordered w-full" rows="2" value={editData.goals || ''} oninput={(e) => updateField('goals', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_goals()}></textarea>
            {:else}
              <p class="field-value">{project.goals || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>

          <!-- Meta info -->
          <div class="meta-info">
            <div class="flex justify-between text-sm">
              <span class="text-base-content/50">{m.dashboard_details_label_project_id()}</span>
              <span class="font-mono text-xs">{project.id}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-base-content/50">{m.dashboard_details_label_created_at()}</span>
              <span>{project.createdAt ? formatDate(project.createdAt) : m.dashboard_details_fallback_unknown()}</span>
            </div>
          </div>
        </div>

      <!-- SPECS TAB -->
      {:else if activeTab === 'specs'}
        <div class="tab-panel">
          <div class="field-group">
            <span class="field-label">{m.dashboard_details_label_domain()}</span>
            {#if editable}
              <input type="text" class="input input-bordered w-full" value={editData.desiredDomain || ''} oninput={(e) => updateField('desiredDomain', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_domain()} />
            {:else}
              <p class="field-value">{project.desiredDomain || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_details_label_audience()}</span>
            {#if editable}
              <textarea class="textarea textarea-bordered w-full" rows="2" value={editData.targetAudience || ''} oninput={(e) => updateField('targetAudience', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_audience()}></textarea>
            {:else}
              <p class="field-value">{project.targetAudience || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_drawer_label_inspiration()}</span>
            {#if editable}
              <textarea class="textarea textarea-bordered w-full" rows="2" value={editData.inspiration || ''} oninput={(e) => updateField('inspiration', e.currentTarget.value)}></textarea>
            {:else}
              <p class="field-value">{project.inspiration || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_budget()}</span>
              {#if editable}
                <input type="text" class="input input-bordered w-full" value={editData.budget || ''} oninput={(e) => updateField('budget', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_budget()} />
              {:else}
                <p class="field-value">{formatBudget(project.budget || '')}</p>
              {/if}
            </div>

            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_timeline()}</span>
              {#if editable}
                <input type="text" class="input input-bordered w-full" value={editData.timeline || ''} oninput={(e) => updateField('timeline', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_timeline()} />
              {:else}
                <p class="field-value">{project.timeline || m.dashboard_details_fallback_not_specified()}</p>
              {/if}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="field-group">
              <span class="field-label">{m.dashboard_drawer_label_timelinePreference()}</span>
              {#if editable}
                <select class="select select-bordered w-full" value={editData.timelinePreference || ''} onchange={(e) => updateField('timelinePreference', e.currentTarget.value)}>
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  <option value="urgent">Dringend</option>
                  <option value="fast">Schnell</option>
                  <option value="moderate">Moderat</option>
                  <option value="flexible">Flexibel</option>
                  <option value="delayed">Verzögert</option>
                  <option value="whenever">Irgendwann</option>
                </select>
              {:else}
                <p class="field-value">{project.timelinePreference || m.dashboard_details_fallback_not_specified()}</p>
              {/if}
            </div>

            <div class="field-group">
              <span class="field-label">{m.dashboard_drawer_label_budgetRange()}</span>
              {#if editable}
                <select class="select select-bordered w-full" value={editData.budgetRange || ''} onchange={(e) => updateField('budgetRange', e.currentTarget.value)}>
                  <option value="">{m.dashboard_edit_placeholder_select()}</option>
                  <option value="small">Klein (bis 1.000€)</option>
                  <option value="medium">Mittel (1.000–5.000€)</option>
                  <option value="large">Groß (5.000–15.000€)</option>
                  <option value="xlarge">Sehr groß (15.000–50.000€)</option>
                  <option value="enterprise">Enterprise (50.000€+)</option>
                  <option value="flexible">Flexibel</option>
                </select>
              {:else}
                <p class="field-value">{project.budgetRange || m.dashboard_details_fallback_not_specified()}</p>
              {/if}
            </div>
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_drawer_label_specialRequirements()}</span>
            {#if editable}
              <textarea class="textarea textarea-bordered w-full" rows="3" value={editData.specialRequirements || ''} oninput={(e) => updateField('specialRequirements', e.currentTarget.value)}></textarea>
            {:else}
              <p class="field-value">{project.specialRequirements || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>

          <!-- Sliders for service level and engineering approach -->
          <div class="field-group">
            <span class="field-label">{m.dashboard_drawer_label_serviceLevel()}</span>
            <div class="slider-row">
              <span class="slider-label-left">{m.dashboard_drawer_serviceLevel_full()}</span>
              {#if editable}
                <input type="range" min="0" max="100" class="range range-primary range-sm flex-1" value={editData.serviceLevel ?? 50} oninput={(e) => updateField('serviceLevel', parseInt(e.currentTarget.value))} />
              {:else}
                <input type="range" min="0" max="100" class="range range-primary range-sm flex-1" value={project.serviceLevel ?? 50} disabled />
              {/if}
              <span class="slider-label-right">{m.dashboard_drawer_serviceLevel_active()}</span>
            </div>
          </div>

          <div class="field-group">
            <span class="field-label">{m.dashboard_drawer_label_engineeringApproach()}</span>
            <div class="slider-row">
              <span class="slider-label-left">{m.dashboard_drawer_engineering_quick()}</span>
              {#if editable}
                <input type="range" min="0" max="100" class="range range-secondary range-sm flex-1" value={editData.engineeringApproach ?? 50} oninput={(e) => updateField('engineeringApproach', parseInt(e.currentTarget.value))} />
              {:else}
                <input type="range" min="0" max="100" class="range range-secondary range-sm flex-1" value={project.engineeringApproach ?? 50} disabled />
              {/if}
              <span class="slider-label-right">{m.dashboard_drawer_engineering_over()}</span>
            </div>
          </div>

          <!-- Pages -->
          <div class="field-group">
            <span class="field-label">{m.dashboard_drawer_label_pages()}</span>
            {#if editable}
              <div class="space-y-2">
                {#each editData.pages || [] as page, i}
                  <div class="bg-base-200 rounded-lg p-3 space-y-2">
                    <div class="flex items-center gap-2">
                      <input type="text" class="input input-bordered input-sm flex-1" value={page.name} placeholder={m.dashboard_drawer_page_name()} oninput={(e) => updatePage(i, 'name', e.currentTarget.value)} />
                      <button class="btn btn-ghost btn-sm btn-square text-error" onclick={() => removePage(i)} aria-label={m.dashboard_drawer_remove()}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                      </button>
                    </div>
                    <textarea class="textarea textarea-bordered textarea-sm w-full" rows="2" value={page.content || ''} placeholder={m.dashboard_drawer_page_content()} oninput={(e) => updatePage(i, 'content', e.currentTarget.value)}></textarea>
                  </div>
                {/each}
                <button class="btn btn-outline btn-sm w-full" onclick={addPage}>+ {m.dashboard_drawer_add_page()}</button>
              </div>
            {:else}
              {#if (parseJsonField(project.pages)).length > 0}
                <div class="space-y-2">
                  {#each parseJsonField<{name: string, content?: string}>(project.pages) as page}
                    <div class="bg-base-200 rounded-lg p-3">
                      <span class="text-sm font-medium">{page.name}</span>
                      {#if page.content}
                        <p class="text-base-content/60 mt-1 text-xs">{page.content}</p>
                      {/if}
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-base-content/50 text-sm">{m.dashboard_drawer_no_pages()}</p>
              {/if}
            {/if}
          </div>

          <!-- Form Fields -->
          <div class="field-group">
            <span class="field-label">{m.dashboard_drawer_label_formFields()}</span>
            {#if editable}
              <div class="space-y-2">
                {#each editData.formFields || [] as field, i}
                  <div class="bg-base-200 flex items-center gap-2 rounded-lg p-3">
                    <select class="select select-bordered select-sm" value={field.type} onchange={(e) => updateFormField(i, 'type', e.currentTarget.value)}>
                      {#each formFieldTypes as ft}
                        <option value={ft.id}>{resolveTitle(ft.title)}</option>
                      {/each}
                    </select>
                    <input type="text" class="input input-bordered input-sm flex-1" value={field.name} placeholder={m.dashboard_drawer_formField_name()} oninput={(e) => updateFormField(i, 'name', e.currentTarget.value)} />
                    <label class="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="checkbox" class="checkbox checkbox-sm" checked={field.required || false} onchange={(e) => updateFormField(i, 'required', e.currentTarget.checked)} />
                      <span class="hidden sm:inline">{m.dashboard_drawer_formField_required()}</span>
                    </label>
                    <button class="btn btn-ghost btn-sm btn-square text-error" onclick={() => removeFormField(i)} aria-label={m.dashboard_drawer_remove()}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>
                  </div>
                {/each}
                <button class="btn btn-outline btn-sm w-full" onclick={addFormField}>+ {m.dashboard_drawer_add_formField()}</button>
              </div>
            {:else}
              {#if (parseJsonField(project.formFields)).length > 0}
                <div class="flex flex-wrap gap-2">
                  {#each parseJsonField<{name: string, type: string, required?: boolean}>(project.formFields) as field}
                    <span class="badge badge-outline badge-sm">{field.name} ({field.type}){field.required ? ' *' : ''}</span>
                  {/each}
                </div>
              {:else}
                <p class="text-base-content/50 text-sm">{m.dashboard_drawer_no_formFields()}</p>
              {/if}
            {/if}
          </div>
        </div>

      <!-- DESIGN TAB -->
      {:else if activeTab === 'design'}
        <div class="tab-panel">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_primary_color()}</span>
              {#if editable}
                <div class="color-picker-row">
                  <input type="color" class="color-swatch" value={editData.primaryColour || '#000000'} oninput={(e) => updateField('primaryColour', e.currentTarget.value)} />
                  <input type="text" class="input input-bordered input-sm flex-1 font-mono text-xs" value={editData.primaryColour || ''} oninput={(e) => updateField('primaryColour', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_color()} />
                </div>
              {:else}
                <div class="color-display">
                  {#if project.primaryColour}
                    <div class="color-swatch-static" style="background-color: {project.primaryColour}"></div>
                    <span class="font-mono text-xs">{project.primaryColour}</span>
                  {:else}
                    <span class="text-base-content/50 text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              {/if}
            </div>

            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_secondary_color()}</span>
              {#if editable}
                <div class="color-picker-row">
                  <input type="color" class="color-swatch" value={editData.secondaryColour || '#000000'} oninput={(e) => updateField('secondaryColour', e.currentTarget.value)} />
                  <input type="text" class="input input-bordered input-sm flex-1 font-mono text-xs" value={editData.secondaryColour || ''} oninput={(e) => updateField('secondaryColour', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_color()} />
                </div>
              {:else}
                <div class="color-display">
                  {#if project.secondaryColour}
                    <div class="color-swatch-static" style="background-color: {project.secondaryColour}"></div>
                    <span class="font-mono text-xs">{project.secondaryColour}</span>
                  {:else}
                    <span class="text-base-content/50 text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              {/if}
            </div>

            <div class="field-group">
              <span class="field-label">{m.dashboard_details_label_accent_color()}</span>
              {#if editable}
                <div class="color-picker-row">
                  <input type="color" class="color-swatch" value={editData.accentColour || '#000000'} oninput={(e) => updateField('accentColour', e.currentTarget.value)} />
                  <input type="text" class="input input-bordered input-sm flex-1 font-mono text-xs" value={editData.accentColour || ''} oninput={(e) => updateField('accentColour', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_color()} />
                </div>
              {:else}
                <div class="color-display">
                  {#if project.accentColour}
                    <div class="color-swatch-static" style="background-color: {project.accentColour}"></div>
                    <span class="font-mono text-xs">{project.accentColour}</span>
                  {:else}
                    <span class="text-base-content/50 text-sm">{m.dashboard_details_fallback_not_specified()}</span>
                  {/if}
                </div>
              {/if}
            </div>
          </div>

          <!-- Color Preview (clickable in edit mode) -->
          {#if editData.primaryColour || editData.secondaryColour || editData.accentColour}
            <div class="color-preview">
              <div class="flex gap-3">
                {#if editData.primaryColour}
                  {#if editable}
                    <label class="color-preview-swatch" style="background-color: {editData.primaryColour}">
                      <input type="color" class="sr-only" value={editData.primaryColour} oninput={(e) => updateField('primaryColour', e.currentTarget.value)} />
                    </label>
                  {:else}
                    <div class="h-12 flex-1 rounded-lg shadow-sm" style="background-color: {editData.primaryColour}"></div>
                  {/if}
                {/if}
                {#if editData.secondaryColour}
                  {#if editable}
                    <label class="color-preview-swatch" style="background-color: {editData.secondaryColour}">
                      <input type="color" class="sr-only" value={editData.secondaryColour} oninput={(e) => updateField('secondaryColour', e.currentTarget.value)} />
                    </label>
                  {:else}
                    <div class="h-12 flex-1 rounded-lg shadow-sm" style="background-color: {editData.secondaryColour}"></div>
                  {/if}
                {/if}
                {#if editData.accentColour}
                  {#if editable}
                    <label class="color-preview-swatch" style="background-color: {editData.accentColour}">
                      <input type="color" class="sr-only" value={editData.accentColour} oninput={(e) => updateField('accentColour', e.currentTarget.value)} />
                    </label>
                  {:else}
                    <div class="h-12 flex-1 rounded-lg shadow-sm" style="background-color: {editData.accentColour}"></div>
                  {/if}
                {/if}
              </div>
            </div>
          {/if}

          <div class="field-group">
            <span class="field-label">{m.dashboard_details_label_font()}</span>
            {#if editable}
              <select class="select select-bordered w-full" value={editData.desiredFont || ''} onchange={(e) => updateField('desiredFont', e.currentTarget.value)}>
                <option value="">{m.dashboard_edit_placeholder_font()}</option>
                {#each googleFonts as font}
                  <option value={font}>{font}</option>
                {/each}
              </select>
            {:else}
              <p class="field-value">{project.desiredFont || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>
        </div>

      <!-- FEATURES TAB -->
      {:else if activeTab === 'features'}
        <div class="tab-panel">
          {#if editable}
            <p class="text-base-content/60 mb-4 text-sm">{m.dashboard_edit_label_features_select()}</p>
            <div class="features-grid">
              {#each availableFeatures as feature}
                {@const isSelected = (editData.features || []).includes(feature.id)}
                {@const categoryColor = featureCategoryColors[feature.category || ''] || 'badge-neutral'}
                <button
                  class="feature-toggle"
                  class:selected={isSelected}
                  onclick={() => toggleFeature(feature.id)}
                >
                  <span class="feature-toggle-name">{getFeatureLabel(feature.id)}</span>
                  {#if isSelected}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  {/if}
                </button>
              {/each}
            </div>
          {:else}
            {#if project.features && project.features.length > 0}
              <div class="features-grid">
                {#each project.features as feature}
                  <div class="feature-display">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>{getFeatureLabel(feature)}</span>
                  </div>
                {/each}
              </div>
            {:else}
              <p class="text-base-content/50">{m.dashboard_details_fallback_no_features()}</p>
            {/if}
          {/if}

          <div class="field-group mt-6">
            <span class="field-label">{m.dashboard_details_label_custom_feature()}</span>
            {#if editable}
              <input type="text" class="input input-bordered w-full" value={editData.customFeature || ''} oninput={(e) => updateField('customFeature', e.currentTarget.value)} placeholder={m.dashboard_edit_placeholder_custom_feature()} />
            {:else}
              <p class="field-value">{project.customFeature || m.dashboard_details_fallback_not_specified()}</p>
            {/if}
          </div>
        </div>

      <!-- FILES TAB -->
      {:else if activeTab === 'files'}
        <div class="tab-panel">
          <!-- Upload section (editable mode) -->
          {#if editable}
            <div class="field-group">
              <span class="field-label">{m.dashboard_drawer_upload_files()}</span>
              <div class="upload-area">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  class="hidden"
                  onchange={handleFileUpload}
                  accept="*/*"
                />
                <label for="file-upload" class="upload-label">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span class="text-sm font-medium">Dateien auswählen</span>
                  <span class="text-xs text-base-content/50">oder hier ablegen</span>
                </label>
              </div>

              <!-- Selected files for upload -->
              {#if uploadedFiles.length > 0}
                <div class="space-y-2 mt-3">
                  <span class="text-xs font-medium uppercase text-base-content/60">Ausgewählte Dateien ({uploadedFiles.length})</span>
                  {#each uploadedFiles as file, i}
                    <div class="bg-base-200 flex items-center justify-between rounded-lg p-3">
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

              <!-- Upload progress -->
              {#if uploadProgress}
                <div class="mt-3 rounded-lg p-3 {saveError ? 'bg-error/10' : 'bg-success/10'}">
                  <p class="text-sm {saveError ? 'text-error' : 'text-success'}">{uploadProgress}</p>
                </div>
              {/if}
            </div>
            
          {/if}

          <!-- Existing files -->
          {#if project.relatedFiles && project.relatedFiles.length > 0}
            <div class="space-y-3">
              <span class="text-xs font-medium uppercase tracking-wider text-base-content/60">Bereits hochgeladene Dateien</span>
              {#each project.relatedFiles as file}
                <div class="bg-base-200 flex items-center justify-between rounded-lg p-4">
                  <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/40 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm font-medium">{file.fileName || m.dashboard_details_fallback_unnamed_file()}</span>
                  </div>
                  {#if file.url}
                    <button onclick={() => window.open(file.url, '_blank')} class="btn btn-sm btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {m.dashboard_details_button_open()}
                    </button>
                  {/if}
                </div>
              {/each}
            </div>
          {:else if !editable}
            <div class="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/20 mb-3 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p class="text-base-content/40 text-sm">{m.dashboard_drawer_no_files()}</p>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Footer Actions -->
    <div class="drawer-footer">
      {#if saveMessage}
        <div class="save-message" class:error={saveError}>
          {saveMessage}
        </div>
      {/if}

      {#if editable}
        <div class="footer-actions">
          <button class="btn-basic save-btn" onclick={saveProject} disabled={saving}>
            {#if saving}
              <span class="loading loading-spinner loading-sm"></span>
              {m.dashboard_drawer_saving()}
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {m.dashboard_drawer_save_button()}
            {/if}
          </button>

          {#if !showSubmitConfirm}
            <button class="submit-btn" onclick={() => showSubmitConfirm = true}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              {m.dashboard_drawer_submit_button()}
            </button>
          {:else}
            <div class="submit-confirm">
              <p class="text-warning text-xs">{m.dashboard_drawer_submit_confirm()}</p>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-warning" onclick={submitProject} disabled={submitting}>
                  {#if submitting}
                    <span class="loading loading-spinner loading-xs"></span>
                  {/if}
                  {m.dashboard_drawer_submit_button()}
                </button>
                <button class="btn btn-sm btn-ghost" onclick={() => showSubmitConfirm = false}>
                  {m.dashboard_edit_button_cancel()}
                </button>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference '../../../app.css';

  .drawer-backdrop {
    @apply fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300;
  }

  .drawer-panel {
    @apply bg-base-100 fixed top-0 right-0 z-50 flex h-full w-full max-w-2xl flex-col shadow-2xl;
    animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .drawer-header {
    @apply relative overflow-hidden px-6 pt-6 pb-4;
  }

  .header-bg-gradient {
    @apply absolute inset-0;
    background: linear-gradient(135deg, oklch(0.6056 0.2189 292.72), oklch(0.6559 0.2118 354.31), oklch(0.6668 0.2591 322.15));
  }

  .header-content {
    @apply relative z-10 flex items-start justify-between;
  }

  .progress-row {
    @apply relative z-10 mt-4 flex items-center gap-3;
  }

  .progress-track {
    @apply h-1.5 flex-1 overflow-hidden rounded-full bg-white/20;
  }

  .progress-fill {
    @apply h-full rounded-full bg-white/80 transition-all duration-700;
  }

  .locked-notice {
    @apply bg-warning/10 text-warning flex items-center gap-2 px-6 py-3 text-sm;
  }

  .drawer-tabs {
    @apply border-base-200 flex gap-0 overflow-x-auto border-b px-6;
  }

  .tab-btn {
    @apply text-base-content/50 relative cursor-pointer px-4 py-3 text-sm font-medium transition-colors;

    &:hover {
      @apply text-base-content/80;
    }

    &.active {
      @apply text-base-content;
      &::after {
        content: '';
        @apply absolute right-0 bottom-0 left-0 h-0.5 rounded-t;
        background: linear-gradient(90deg, oklch(0.6056 0.2189 292.72), oklch(0.6559 0.2118 354.31));
      }
    }
  }

  .drawer-content {
    @apply flex-1 overflow-y-auto px-6 py-4;
  }

  .tab-panel {
    @apply space-y-5;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .field-group {
    @apply space-y-1.5;
  }

  .field-label {
    @apply text-base-content/60 block text-xs font-medium uppercase tracking-wider;
  }

  .field-value {
    @apply text-base-content text-sm;
  }

  .meta-info {
    @apply border-base-200 mt-4 space-y-2 border-t pt-4;
  }

  .slider-row {
    @apply flex items-center gap-3;
  }

  .slider-label-left,
  .slider-label-right {
    @apply text-base-content/50 text-xs;
  }

  .color-picker-row {
    @apply flex items-center gap-2;
  }

  .color-swatch {
    @apply h-8 w-8 cursor-pointer rounded border-0;
  }

  .color-display {
    @apply flex items-center gap-2;
  }

  .color-swatch-static {
    @apply border-base-300 h-6 w-6 rounded border;
  }

  .color-preview {
    @apply mt-4 rounded-lg p-4;
    background: linear-gradient(135deg, oklch(0 0 0 / 0.03), oklch(0 0 0 / 0.06));
  }

  .color-preview-swatch {
    @apply h-12 flex-1 cursor-pointer rounded-lg shadow-sm transition-all;

    &:hover {
      @apply shadow-md scale-105;
    }
  }

  .features-grid {
    @apply grid grid-cols-1 gap-2 sm:grid-cols-2;
  }

  .feature-toggle {
    @apply bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all;

    &:hover {
      @apply bg-base-300;
    }

    &.selected {
      @apply border border-success/30 bg-success/10;
    }
  }

  .feature-toggle-name {
    @apply text-left text-sm;
  }

  .feature-display {
    @apply bg-base-200 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm;
  }

  .drawer-footer {
    @apply border-base-200 border-t px-6 py-4;
  }

  .save-message {
    @apply mb-3 rounded-lg px-3 py-2 text-center text-sm font-medium;
    @apply bg-success/10 text-success;

    &.error {
      @apply bg-error/10 text-error;
    }
  }

  .footer-actions {
    @apply flex flex-wrap items-center gap-3;
  }

  .save-btn {
    @apply flex-1 gap-2 px-6! py-3! text-sm!;
  }

  .submit-btn {
    @apply flex items-center gap-2 rounded-lg border-2 border-dashed border-warning/40 bg-transparent px-6 py-3 text-sm font-bold text-warning transition-all;
    &:hover {
      @apply border-warning bg-warning/10;
    }
  }

  .submit-confirm {
    @apply flex flex-1 flex-col gap-2;
  }

  .upload-area {
    @apply border-2 border-dashed border-base-300 rounded-lg transition-all;

    &:hover {
      @apply border-primary/50 bg-base-200/50;
    }
  }

  .upload-label {
    @apply flex flex-col items-center justify-center gap-2 p-8 cursor-pointer text-base-content/60 transition-colors;

    &:hover {
      @apply text-primary;
    }
  }

  .divider {
    @apply relative my-6 h-px bg-base-200 text-center;

    &::before {
      content: attr(data-content);
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 text-base-content/40 px-4 text-xs uppercase tracking-wider;
    }
  }
</style>
