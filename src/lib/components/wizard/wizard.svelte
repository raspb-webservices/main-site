<script lang="ts">
  import { onMount } from 'svelte';
  import type { WizardConfig, Project } from '$interfaces/project.interface';
  import { uploadAsset, publishAsset } from '$helper/uploadAsset';
  import { projectTypes, subTypes, availableFeatures, googleFonts, formFieldTypes, featureCategoryColors } from './wizard-config';

  // State
  let currentStep = $state(1);
  let showResetModal = $state(false);

  let config: WizardConfig = $state({
    step: 1,
    name: '',
    description: '',
    projectType: '',
    subType: '',
    projectDetails: '',
    desiredDomain: '',
    domainStatus: '',
    goals: '',
    targetAudience: '',
    budget: '',
    timeline: '',
    features: [],
    customFeature: '',
    primaryColour: '#c1121f',
    secondaryColour: '#003049',
    accentColour: '#fdf0d5',
    desiredFont: '',
    customFont: '',
    estimatedPrice: 0,
    formFields: [],
    pages: [],
    relatedFiles: [],
    uploadedFiles: [],
    owner: {
      id: ''
    }
  });

  // Additional wizard-specific properties
  let uploadedFiles: File[] = $state([]);
  let customFeatures = $state('');
  let isUploading = $state(false);
  let uploadProgress = $state('');

  // Dynamic step configuration based on project type
  const stepConfig = $derived(getStepConfig(config.projectType));
  function getStepConfig(projectType: string) {
    const baseSteps = [
      { id: 1, title: 'Projekttyp', required: true },
      { id: 2, title: 'Details', required: true },
      { id: 3, title: 'Beschreibung', required: false }
    ];

    if (projectType === 'website' || projectType === 'cms') {
      return [
        ...baseSteps,
        { id: 4, title: 'Features', required: false },
        { id: 5, title: 'Inhalte', required: false },
        { id: 6, title: 'Design', required: false },
        { id: 7, title: 'Zusammenfassung', required: false }
      ];
    } else if (projectType === 'freestyle') {
      return [...baseSteps, { id: 4, title: 'Materialien', required: false }, { id: 5, title: 'Zusammenfassung', required: false }];
    } else {
      return [...baseSteps, { id: 4, title: 'Design', required: false }, { id: 5, title: 'Zusammenfassung', required: false }];
    }
  }

  const maxSteps = $derived(stepConfig.length);

  // Functions
  function selectProjectType(type: string) {
    config.projectType = type;
    config.subType = '';
    currentStep = 1;
  }

  function selectSubType(subType: string) {
    config.subType = subType;
  }

  function addPage() {
    config.pages = [...config.pages, { name: '', content: '' }];
  }

  function removePage(index: number) {
    config.pages = config.pages.filter((_, i) => i !== index);
  }

  function addFormField() {
    config.formFields = [...config.formFields, { type: '', name: '', required: false }];
  }

  function removeFormField(index: number) {
    config.formFields = config.formFields.filter((_, i) => i !== index);
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= maxSteps) {
      currentStep = step;
    }
  }

  function nextStep() {
    if (currentStep < maxSteps) {
      currentStep++;
      calculatePrice();
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
    }
  }

  function openResetModal() {
    showResetModal = true;
  }

  function closeResetModal() {
    showResetModal = false;
  }

  function confirmReset() {
    currentStep = 1;
    config = {
      step: 1,
      name: '',
      description: '',
      projectType: '',
      subType: '',
      projectDetails: '',
      desiredDomain: '',
      domainStatus: '',
      goals: '',
      targetAudience: '',
      budget: '',
      timeline: '',
      features: [],
      customFeature: '',
      primaryColour: '#003049',
      secondaryColour: '#c1121f',
      accentColour: '#fdf0d5',
      desiredFont: '',
      customFont: '',
      estimatedPrice: 0,
      formFields: [],
      pages: [],
      relatedFiles: [],
      uploadedFiles: [],
      owner: {
        id: ''
      }
    };
    uploadedFiles = [];
    customFeatures = '';
    closeResetModal();
  }

  function calculatePrice() {
    let basePrice = 0;

    // Base price from project type
    const projectType = projectTypes.find((p) => p.id === config.projectType);
    if (projectType) {
      basePrice = (projectType.lowestPrice + projectType.highestPrice) / 2;
    }

    // Subtype price (replaces base price)
    const subTypeData = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);
    if (subTypeData) {
      basePrice = subTypeData.price;
    }

    // Additional complexity factors
    const complexityFactor = 1 + (config.description.length / 1000) * 0.2 + (config.features.length / 10) * 0.3;

    config.estimatedPrice = Math.round(basePrice * complexityFactor);
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      // Neue Dateien zu den bestehenden hinzufügen
      const newFiles = Array.from(target.files);
      uploadedFiles = [...uploadedFiles, ...newFiles];
      
      // Input zurücksetzen, damit dieselbe Datei erneut ausgewählt werden kann
      target.value = '';
    }
  }

  function removeFile(index: number) {
    uploadedFiles = uploadedFiles.filter((_, i) => i !== index);
  }

  async function uploadAllFiles() {
    if (uploadedFiles.length === 0) return [];
    
    isUploading = true;
    uploadProgress = 'Dateien werden hochgeladen...';
    const uploadedAssetIds: string[] = [];
    
    try {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        uploadProgress = `Lade Datei ${i + 1} von ${uploadedFiles.length} hoch: ${file.name}`;
        
        const assetId = await uploadAsset(file);
        if (assetId && assetId !== 'error') {
          uploadedAssetIds.push(assetId);
          
          // Datei als erfolgreich hochgeladen markieren
          uploadProgress = `Datei ${i + 1} von ${uploadedFiles.length} erfolgreich hochgeladen`;
        } else {
          console.error(`Fehler beim Hochladen der Datei: ${file.name}`);
          uploadProgress = `Fehler beim Hochladen der Datei: ${file.name}`;
        }
      }
      
      uploadProgress = `Alle ${uploadedAssetIds.length} Dateien erfolgreich hochgeladen`;
      return uploadedAssetIds;
      
    } catch (error) {
      console.error('Fehler beim Hochladen der Dateien:', error);
      uploadProgress = 'Fehler beim Hochladen der Dateien';
      return [];
    } finally {
      isUploading = false;
    }
  }

  function generateJSON() {
    const result = {
      ...config,
      timestamp: new Date().toISOString(),
      uploadedFiles: uploadedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    };

    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projekt-konfiguration.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Neue Funktion zum Senden der Daten an die API
  async function submitToAPI() {
    try {
      // Erst alle Dateien hochladen
      let uploadedAssetIds: string[] = [];
      if (uploadedFiles.length > 0) {
        uploadedAssetIds = await uploadAllFiles();
        
        // Wenn Upload fehlgeschlagen ist, Abbruch
        if (uploadedAssetIds.length === 0 && uploadedFiles.length > 0) {
          alert('Fehler beim Hochladen der Dateien. Bitte versuchen Sie es erneut.');
          return;
        }
      }

      // Prepare project data according to Project interface
      console.log("CONFIG ", config);

      const projectData: Project = {
        name: config.name,
        description: config.description,
        projectType: config.projectType,
        subType: config.subType,
        projectDetails: config.projectDetails,
        desiredDomain: config.desiredDomain,
        domainStatus: config.domainStatus,
        goals: config.goals,
        targetAudience: config.targetAudience,
        budget: config.budget,
        timeline: config.timeline,
        features: config.features,
        customFeature: customFeatures || config.customFeature, 
        primaryColour: config.primaryColour,
        secondaryColour: config.secondaryColour,
        accentColour: config.accentColour,
        desiredFont: config.desiredFont,
        estimatedPrice: config.estimatedPrice,
        formFields: config.formFields,
        pages: config.pages,
        relatedFiles: uploadedAssetIds.map(id => ({ id }))
      };

      console.log("projectData  ", projectData);

      const response = await fetch('/api/project/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Projekt erfolgreich übermittelt! Wir werden uns bald bei Ihnen melden.');
        console.log('Projekt erstellt:', result.data);

        // Redirect to thank you page
        window.location.href = '/danke';
      } else {
        alert('Fehler beim Übermitteln: ' + result.error);
        console.error('API Fehler:', result.error);
      }
    } catch (error) {
      alert('Fehler beim Übermitteln des Projekts. Bitte versuchen Sie es später erneut.');
      console.error('Netzwerk Fehler:', error);
    }
  }

  onMount(() => {
    calculatePrice();
  });
</script>

<div class="wizard-container">
  <!-- Header with Reset Button -->
  <div class="wizard-header">
    <h1>Projekt <span class="inner-text-special">Konfigurator</span></h1>
    <button type="button" class="btn btn-outline btn-sm" onclick={openResetModal}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Von vorne beginnen
    </button>
  </div>

  <!-- Progress Bar with Dynamic Steps -->
  <div class="progress-wrapper">
    <div class="relative flex w-full items-center justify-between">
      <!-- Background connecting line -->
      <div class="bg-base-300 absolute top-4 left-4 h-0.5 -translate-y-1/2" style="right: 2rem;"></div>
      <!-- Progress connecting line -->
      <div
        class="bg-primary absolute top-4 left-4 h-0.5 -translate-y-1/2 transition-all duration-300"
        style="width: {currentStep > 1 ? `calc(${((currentStep - 1) / (stepConfig.length - 1)) * 100}% - 2rem)` : '0%'}"
      ></div>

      {#each stepConfig as step, i}
        <div class="relative z-10 flex cursor-pointer flex-col items-center" onclick={() => goToStep(i + 1)}>
          <!-- Step Circle -->
          <div
            class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200
                   {i + 1 <= currentStep ? 'bg-primary text-primary-content border-primary' : 'bg-base-100 border-base-300'}
                   hover:scale-110"
          >
            {i + 1}
          </div>
          <!-- Step Title -->
          <div class="mt-2 max-w-20 text-center text-xs font-medium">
            {step.title}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Step Content -->
  <div class="step-content-wrapper">
    {#if currentStep === 1}
      <!-- Step 1: Project Type Selection -->
      <div class="step-header">
        <h1>Was möchten Sie <span class="inner-text-special">realisieren</span>?</h1>
        <p class="teaser">Wählen Sie den Typ Ihres Projekts aus. Diese Auswahl bestimmt die verfügbaren Optionen in den folgenden Schritten.</p>
      </div>

      <div class="project-types-grid">
        {#each projectTypes as type}
          <div
            class="card service-card cursor-pointer transition-all duration-300"
            class:card-selected={config.projectType === type.id}
            onclick={() => selectProjectType(type.id)}
          >
            <div class="card-body">
              <div class="service-card-header">
                <h3 class="card-title no-padding">{type.title}</h3>
                <div class="service-icon">{type.icon}</div>
              </div>
              <p class="no-padding">{type.description}</p>
              <div class="card-actions justify-end">
                <div class="badge badge-primary">{type.lowestPrice.toLocaleString()}€ - {type.highestPrice.toLocaleString()}€</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if currentStep === 2}
      <!-- Step 2: Subtype Selection -->
      <div class="step-header">
        <h1>Welche Art von <span class="inner-text-special">{projectTypes.find((p) => p.id === config.projectType)?.title}</span> benötigen Sie?</h1>
        <p class="teaser">Wählen Sie die passende Variante für Ihr Projekt. Jede Option hat unterschiedliche Funktionen und Preise.</p>
      </div>

      <div class="subtypes-grid">
        {#each subTypes.filter((st) => st.parentId === config.projectType) as subtype}
          <div
            class="card service-card cursor-pointer transition-all duration-300"
            class:card-selected={config.subType === subtype.id}
            onclick={() => selectSubType(subtype.id)}
          >
            <div class="card-body">
              <h3 class="card-title">{subtype.title}</h3>
              <p class="no-padding">{subtype.description}</p>
              <div class="card-actions justify-end">
                <div class="badge badge-success">{subtype.price.toLocaleString()}€</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if currentStep === 3}
      <!-- Step 3: Project Description -->
      <div class="step-header">
        <h1>Beschreiben Sie Ihr <span class="inner-text-special">Vorhaben</span></h1>
        <p class="teaser">Je detaillierter Sie Ihr Projekt beschreiben, desto genauer können wir Ihnen helfen und den Preis kalkulieren.</p>
      </div>

      <div class="content-section">
        <div class="form-control mb-8 w-full">
          <label class="label" for="projectName">
            <span class="label-text text-lg font-semibold">Projektname:</span>
          </label>
          <input
            type="text"
            id="projectName"
            class="input input-bordered input-lg w-full"
            bind:value={config.name}
            placeholder="Geben Sie Ihrem Projekt einen Namen..."
          />
        </div>

        <div class="form-control mb-8 w-full">
          <label class="label" for="description">
            <span class="label-text text-lg font-semibold">Projektbeschreibung:</span>
          </label>
          <textarea
            id="description"
            class="textarea textarea-bordered textarea-lg w-full"
            bind:value={config.description}
            placeholder={config.projectType === 'webapp' || config.projectType === 'mobile'
              ? 'Beschreiben Sie detailliert die gewünschten Funktionen und Features Ihrer App: Welche Hauptfunktionen soll sie haben? Wie sollen Benutzer damit interagieren? Welche Daten werden verarbeitet? Gibt es spezielle Anforderungen an Performance oder Sicherheit?'
              : config.projectType === 'individual'
                ? 'Beschreiben Sie Ihr individuelles Projekt im Detail: Welches Problem soll gelöst werden? Welche spezifischen Anforderungen haben Sie? Welche Systeme sollen integriert werden? Welche Funktionen sind besonders wichtig?'
                : 'Beschreiben Sie Ihr Vorhaben im Detail: Was ist das Ziel? Welche Probleme soll es lösen? Welche Zielgruppe sprechen Sie an? Haben Sie bereits konkrete Vorstellungen zum Design oder Funktionen?'}
            rows="8"
          ></textarea>
          <div class="label">
            <span class="label-text-alt">Zeichen: {config.description.length}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="form-control w-full">
            <label class="label" for="targetAudience">
              <span class="label-text font-semibold">Wer ist Ihre Zielgruppe?</span>
            </label>
            <input
              type="text"
              id="targetAudience"
              class="input input-bordered w-full"
              bind:value={config.targetAudience}
              placeholder="z.B. Kleine Unternehmen, Privatpersonen, B2B-Kunden..."
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="goals">
              <span class="label-text font-semibold">Was sind Ihre Hauptziele?</span>
            </label>
            <input
              type="text"
              id="goals"
              class="input input-bordered w-full"
              bind:value={config.goals}
              placeholder="z.B. Mehr Kunden gewinnen, Prozesse digitalisieren..."
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="desiredDomain">
              <span class="label-text font-semibold">Gewünschte Domain:</span>
            </label>
            <input
              type="text"
              id="desiredDomain"
              class="input input-bordered w-full"
              bind:value={config.desiredDomain}
              placeholder="z.B. meine-firma.de, example.com..."
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="domainStatus">
              <span class="label-text font-semibold">Domain-Status:</span>
            </label>
            <select id="domainStatus" class="select select-bordered w-full" bind:value={config.domainStatus}>
              <option value="">Bitte wählen...</option>
              <option value="owned">Domain bereits im Besitz</option>
              <option value="needs-registration">Domain muss registriert werden</option>
              <option value="needs-transfer">Domain muss übertragen werden</option>
              <option value="undecided">Noch nicht entschieden</option>
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label" for="timeline">
              <span class="label-text font-semibold">Gewünschter Zeitrahmen:</span>
            </label>
            <select id="timeline" class="select select-bordered w-full" bind:value={config.timeline}>
              <option value="">Bitte wählen...</option>
              <option value="asap">So schnell wie möglich</option>
              <option value="1-month">Innerhalb 1 Monat</option>
              <option value="2-3-months">2-3 Monate</option>
              <option value="3-6-months">3-6 Monate</option>
              <option value="flexible">Flexibel</option>
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label" for="budget">
              <span class="label-text font-semibold">Ihr Budget:</span>
            </label>
            <select id="budget" class="select select-bordered w-full" bind:value={config.budget}>
              <option value="">Bitte wählen...</option>
              <option value="under-2k">Unter 2.000€</option>
              <option value="2k-5k">2.000€ - 5.000€</option>
              <option value="5k-10k">5.000€ - 10.000€</option>
              <option value="10k-20k">10.000€ - 20.000€</option>
              <option value="over-20k">Über 20.000€</option>
            </select>
          </div>
        </div>
      </div>
    {:else if currentStep === 4 && (config.projectType === 'website' || config.projectType === 'cms')}
      <!-- Step 4: Features Selection (only for website/cms) -->
      <div class="step-header">
        <h1>Welche <span class="inner-text-special">Features</span> benötigen Sie?</h1>
        <p class="teaser">Wählen Sie alle gewünschten Funktionen aus. Jedes Feature erweitert die Möglichkeiten Ihres Projekts und beeinflusst den Preis.</p>
      </div>

      <div class="features-grid">
        {#each availableFeatures as feature}
          <label class="card service-card cursor-pointer transition-all duration-300" class:card-selected={config.features.includes(feature.name)}>
            <div class="card-body">
              <div class="card-actions items-center justify-start">
                <input type="checkbox" class="checkbox checkbox-primary" bind:group={config.features} value={feature.name} onchange={() => calculatePrice()} />
                <h3 class="card-title no-padding">{feature.title}</h3>
              </div>
              <p class="no-padding">{feature.description}</p>

              <div class="card-actions justify-end">
                <div class="badge {featureCategoryColors[feature.category || 'Funktionalität']}">{feature.category}</div>
              </div>
            </div>
          </label>
        {/each}
      </div>

      <div class="form-control mt-8 w-full">
        <label class="label" for="customFeatures">
          <span class="label-text text-lg font-semibold">Weitere gewünschte Features:</span>
        </label>
        <textarea
          id="customFeatures"
          class="textarea textarea-bordered textarea-lg w-full"
          bind:value={customFeatures}
          placeholder="Beschreiben Sie weitere spezielle Anforderungen, die nicht in der Liste stehen..."
          rows="4"
        ></textarea>
      </div>
    {:else if currentStep === 5 && (config.projectType === 'website' || config.projectType === 'cms')}
      <!-- Step 5: Content Details (only for website/cms) -->
      <div class="step-header">
        <h1>Inhalte und <span class="inner-text-special">Struktur</span></h1>
        <p class="teaser">Definieren Sie die Struktur und Inhalte Ihres Projekts. Diese Informationen helfen uns bei der Planung und Umsetzung.</p>
      </div>

      <!-- Pages/Sections -->
      <div class="content-section">
        <h2>Seiten/Bereiche</h2>
        <p>Welche Seiten oder Bereiche soll Ihre Website haben? Beschreiben Sie auch die gewünschten Inhalte für jede Seite.</p>

        <div class="space-y-6">
          {#each config.pages as _, i}
            <div class="card bg-base-100 border-base-300 border">
              <div class="card-body">
                <div class="mb-4 flex items-center justify-between">
                  <h4 class="card-title text-lg">Seite {i + 1}</h4>
                  <button type="button" class="btn btn-error btn-sm" onclick={() => removePage(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Entfernen
                  </button>
                </div>

                <div class="form-control mb-4 w-full">
                  <label class="label">
                    <span class="label-text font-semibold">Seitenname:</span>
                  </label>
                  <input
                    type="text"
                    class="input input-bordered w-full"
                    bind:value={config.pages[i].name}
                    placeholder="z.B. Startseite, Über uns, Kontakt, Leistungen..."
                  />
                </div>

                <div class="form-control w-full">
                  <label class="label">
                    <span class="label-text font-semibold">Gewünschte Inhalte:</span>
                  </label>
                  <textarea
                    class="textarea textarea-bordered w-full"
                    bind:value={config.pages[i].content}
                    placeholder="Beschreiben Sie, welche Inhalte auf dieser Seite stehen sollen: Texte, Bilder, Funktionen, etc."
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <button type="button" class="btn btn-primary mt-4" onclick={addPage}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Seite hinzufügen
        </button>
      </div>

      <!-- Form Fields (only if contact form is selected) -->
      {#if config.features.includes('kontaktformular')}
        <div class="content-section">
          <h2>Formular-Felder</h2>
          <p>Da Sie ein Kontaktformular gewählt haben, definieren Sie hier die gewünschten Felder und deren Bezeichnungen.</p>

          <div class="space-y-4">
            {#each config.formFields as _, i}
              <div class="card bg-base-100 border-base-300 border">
                <div class="card-body">
                  <div class="mb-4 flex items-center justify-between">
                    <h4 class="card-title text-lg">Feld {i + 1}</h4>
                    <button type="button" class="btn btn-error btn-sm" onclick={() => removeFormField(i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Entfernen
                    </button>
                  </div>

                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="form-control w-full">
                      <label class="label">
                        <span class="label-text font-semibold">Feldtyp:</span>
                      </label>
                      <select class="select select-bordered w-full" bind:value={config.formFields[i].type}>
                        <option value="">Feldtyp wählen...</option>
                        {#each formFieldTypes as fieldType}
                          <option value={fieldType.id}>{fieldType.title}</option>
                        {/each}
                      </select>
                    </div>

                    <div class="form-control w-full">
                      <label class="label">
                        <span class="label-text font-semibold">Feldname/Beschriftung:</span>
                      </label>
                      <input
                        type="text"
                        class="input input-bordered w-full"
                        bind:value={config.formFields[i].name}
                        placeholder="z.B. Name, E-Mail, Nachricht, Telefon..."
                      />
                    </div>
                  </div>

                  <div class="form-control mt-4">
                    <label class="label cursor-pointer justify-start gap-4">
                      <input type="checkbox" class="checkbox checkbox-primary" bind:checked={config.formFields[i].required} />
                      <span class="label-text">Pflichtfeld</span>
                    </label>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <button type="button" class="btn btn-primary mt-4" onclick={addFormField}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Feld hinzufügen
          </button>
        </div>
      {/if}
    {:else if (currentStep === 6 && (config.projectType === 'website' || config.projectType === 'cms')) || (currentStep === 4 && (config.projectType === 'webapp' || config.projectType === 'mobile'))}
      <!-- Design Step (not for individual development) -->
      <div class="step-header">
        <h1>Design und <span class="inner-text-special">Materialien</span></h1>
        <p class="teaser">Definieren Sie das visuelle Erscheinungsbild Ihres Projekts. Diese Einstellungen bestimmen das Look & Feel.</p>
      </div>

      <!-- Color Selection -->
      <div class="content-section">
        <h2>Farbschema</h2>
        <p>Wählen Sie die Hauptfarben für Ihr Projekt. Falls Sie bereits Corporate Colors haben, geben Sie diese hier an.</p>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="form-control w-full">
            <label class="label" for="primaryColor">
              <span class="label-text font-semibold">Primärfarbe:</span>
            </label>
            <div class="join w-full">
              <input type="color" id="primaryColor" class="join-item h-12 w-16 border-0" bind:value={config.primaryColour} />
              <input type="text" class="input input-bordered join-item flex-1" bind:value={config.primaryColour} />
            </div>
          </div>

          <div class="form-control w-full">
            <label class="label" for="secondaryColor">
              <span class="label-text font-semibold">Sekundärfarbe:</span>
            </label>
            <div class="join w-full">
              <input type="color" id="secondaryColor" class="join-item h-12 w-16 border-0" bind:value={config.secondaryColour} />
              <input type="text" class="input input-bordered join-item flex-1" bind:value={config.secondaryColour} />
            </div>
          </div>

          <div class="form-control w-full">
            <label class="label" for="accentColor">
              <span class="label-text font-semibold">Akzentfarbe:</span>
            </label>
            <div class="join w-full">
              <input type="color" id="accentColor" class="join-item h-12 w-16 border-0" bind:value={config.accentColour} />
              <input type="text" class="input input-bordered join-item flex-1" bind:value={config.accentColour} />
            </div>
          </div>
        </div>
      </div>

      <!-- Font Selection -->
      <div class="content-section">
        <h2>Schriftart</h2>
        <p>Wählen Sie eine Schriftart aus unserer Auswahl oder geben Sie Ihre Corporate Font an.</p>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-semibold">Google Fonts Auswahl:</span>
            </label>
            <select class="select select-bordered select-lg w-full" bind:value={config.desiredFont}>
              {#each googleFonts as font}
                <option value={font}>{font}</option>
              {/each}
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label" for="customFont">
              <span class="label-text font-semibold">Oder eigene Schriftart:</span>
            </label>
            <input
              type="text"
              id="customFont"
              class="input input-bordered w-full"
              bind:value={config.customFont}
              placeholder="z.B. Helvetica Neue, Arial, Corporate Font Name..."
            />
          </div>
        </div>

        <div class="alert mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <div class="font-bold">Schriftart-Vorschau:</div>
            <div style="font-family: {config.customFont || config.desiredFont}, sans-serif; font-size: 1.1em; margin-top: 0.5rem;">
              Dies ist ein Beispieltext in der gewählten Schriftart "{config.customFont || config.desiredFont}". So wird Ihr Text später aussehen.
            </div>
          </div>
        </div>
      </div>

      <!-- File Upload -->
      <div class="content-section">
        <h2>Materialien hochladen</h2>
        <p>Laden Sie Styleguides, Logos, Bilder oder andere relevante Dateien hoch, die uns bei der Umsetzung helfen.</p>

        <div class="form-control w-full">
          <input
            type="file"
            id="fileUpload"
            class="file-input file-input-bordered file-input-primary w-full"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.svg,.ai,.psd"
            onchange={handleFileUpload}
          />
          <div class="label">
            <span class="label-text-alt">Unterstützte Formate: PDF, DOC, JPG, PNG, GIF, SVG, AI, PSD</span>
          </div>
        </div>

        {#if uploadedFiles.length > 0}
          <div class="mt-6">
            <h3>Hochgeladene Dateien:</h3>
            <div class="space-y-2">
              {#each uploadedFiles as file, i}
                <div class="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>{file.name} ({Math.round(file.size / 1024)}KB)</span>
                  <button type="button" class="btn btn-sm btn-error" onclick={() => removeFile(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        {#if isUploading && uploadProgress}
          <div class="mt-6">
            <div class="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <div class="font-bold">Upload läuft...</div>
                <div class="text-sm">{uploadProgress}</div>
              </div>
              <span class="loading loading-spinner loading-md"></span>
            </div>
          </div>
        {/if}
      </div>
    {:else if currentStep === 4 && config.projectType === 'individual'}
      <!-- Materials Step for Individual Development -->
      <div class="step-header">
        <h1>Materialien und <span class="inner-text-special">Dokumente</span></h1>
        <p class="teaser">Laden Sie relevante Dokumente, Spezifikationen oder andere Materialien hoch, die uns bei der Umsetzung helfen.</p>
      </div>

      <div class="content-section">
        <h2>Dokumente hochladen</h2>
        <p>Laden Sie Spezifikationen, Wireframes, bestehende Dokumentationen oder andere relevante Dateien hoch.</p>

        <div class="form-control w-full">
          <input
            type="file"
            id="fileUpload"
            class="file-input file-input-bordered file-input-primary w-full"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.svg,.ai,.psd,.txt,.xlsx,.pptx"
            onchange={handleFileUpload}
          />
          <div class="label">
            <span class="label-text-alt">Unterstützte Formate: PDF, DOC, JPG, PNG, GIF, SVG, AI, PSD, TXT, XLSX, PPTX</span>
          </div>
        </div>

        {#if uploadedFiles.length > 0}
          <div class="mt-6">
            <h3>Hochgeladene Dateien:</h3>
            <div class="space-y-2">
              {#each uploadedFiles as file, i}
                <div class="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>{file.name} ({Math.round(file.size / 1024)}KB)</span>
                  <button type="button" class="btn btn-sm btn-error" onclick={() => removeFile(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        {#if isUploading && uploadProgress}
          <div class="mt-6">
            <div class="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <div class="font-bold">Upload läuft...</div>
                <div class="text-sm">{uploadProgress}</div>
              </div>
              <span class="loading loading-spinner loading-md"></span>
            </div>
          </div>
        {/if}
      </div>
    {:else if currentStep === maxSteps}
      <!-- Final Step: Summary -->
      <div class="step-header">
        <h1><span class="inner-text-special">Zusammenfassung</span></h1>
        <p class="teaser">Überprüfen Sie Ihre Konfiguration. Sie können jederzeit zu vorherigen Schritten zurückkehren, um Änderungen vorzunehmen.</p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="space-y-6">
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title">Projekttyp</h3>
              <p class="no-padding">{projectTypes.find((p) => p.id === config.projectType)?.title}</p>
              <p class="text-base-content/70 no-padding text-sm">
                {subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType)?.title}
              </p>
            </div>
          </div>

          {#if config.description}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Projektbeschreibung</h3>
                <p class="no-padding text-sm">{config.description.substring(0, 200)}{config.description.length > 200 ? '...' : ''}</p>
              </div>
            </div>
          {/if}

          {#if config.features.length > 0}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Gewählte Features</h3>
                <div class="flex flex-wrap gap-2">
                  {#each config.features as featureId}
                    <div class="badge badge-primary">{availableFeatures.find((f) => f.name === featureId)?.title}</div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}

          {#if config.pages.length > 0}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Seiten/Bereiche</h3>
                <div class="space-y-2">
                  {#each config.pages as page}
                    {#if page.name.trim()}
                      <div class="badge badge-outline badge-lg">{page.name}</div>
                    {/if}
                  {/each}
                </div>
              </div>
            </div>
          {/if}

          {#if config.formFields.length > 0}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Formular-Felder</h3>
                <div class="space-y-1">
                  {#each config.formFields as field}
                    {#if field.name.trim()}
                      <div class="flex items-center gap-2">
                        <div class="badge badge-outline">{formFieldTypes.find((f) => f.id === field.type)?.title}</div>
                        <span class="text-sm">{field.name}</span>
                        {#if field.required}
                          <div class="badge badge-error badge-xs">Pflicht</div>
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            </div>
          {/if}

          {#if config.projectType !== 'individual'}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Design</h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-4">
                    <span class="font-semibold">Farben:</span>
                    <div class="flex gap-2">
                      <div class="border-base-300 h-8 w-8 rounded border-2" style="background-color: {config.primaryColour}"></div>
                      <div class="border-base-300 h-8 w-8 rounded border-2" style="background-color: {config.secondaryColour}"></div>
                      <div class="border-base-300 h-8 w-8 rounded border-2" style="background-color: {config.accentColour}"></div>
                    </div>
                  </div>
                  <div>
                    <span class="font-semibold">Schriftart:</span>
                    <span style="font-family: {config.customFont || config.desiredFont}, sans-serif">{config.customFont || config.desiredFont}</span>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <div class="card bg-success text-success-content">
          <div class="card-body text-center">
            <h2 class="card-title justify-center text-3xl">Geschätzter Preis</h2>
            <div class="text-5xl font-bold">{config.estimatedPrice}€</div>
            <div class="text-sm opacity-80">Durchschnitt: {config.estimatedPrice.toLocaleString()}€</div>
            <p class="no-padding text-sm opacity-80">*Unverbindliche Schätzung. Der finale Preis wird nach einem persönlichen Gespräch festgelegt.</p>

            <div class="divider"></div>

            <div class="space-y-2 text-left">
              <div class="flex justify-between">
                <span>Basis ({projectTypes.find((p) => p.id === config.projectType)?.title}):</span>
                <span
                  >{projectTypes.find((p) => p.id === config.projectType)?.lowestPrice.toLocaleString()}€ - {projectTypes
                    .find((p) => p.id === config.projectType)
                    ?.highestPrice.toLocaleString()}€</span
                >
              </div>
              {#if config.subType}
                <div class="flex justify-between">
                  <span>{subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType)?.title}:</span>
                  <span>{subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType)?.price.toLocaleString()}€</span>
                </div>
              {/if}
              {#if config.features.length > 0}
                <div class="flex justify-between">
                  <span>Features ({config.features.length}):</span>
                  <span>Inklusive</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Navigation -->
  <div class="wizard-navigation">
    {#if currentStep > 1}
      <button type="button" class="btn-basic" onclick={prevStep}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Zurück
      </button>
    {:else}
      <div></div>
    {/if}

    {#if currentStep < maxSteps}
      <button
        type="button"
        class="btn-basic"
        onclick={nextStep}
        disabled={(currentStep === 1 && !config.projectType) || (currentStep === 2 && !config.subType)}
      >
        Weiter
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {:else}
      <div class="flex gap-4">
        <button type="button" class="btn-basic" onclick={generateJSON}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Konfiguration herunterladen
        </button>
        <button type="button" class="btn-basic" onclick={submitToAPI}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Projekt einreichen
        </button>
      </div>
    {/if}
  </div>
</div>

<!-- Reset Modal -->
{#if showResetModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Von vorne beginnen?</h3>
      <p class="py-4">Möchten Sie wirklich von vorne beginnen? Alle Ihre bisherigen Eingaben gehen dabei verloren.</p>
      <div class="modal-action">
        <button type="button" class="btn btn-outline" onclick={closeResetModal}>Abbrechen</button>
        <button type="button" class="btn btn-error" onclick={confirmReset}>Ja, zurücksetzen</button>
      </div>
    </div>
    <button class="modal-backdrop" aria-label="close modal" onclick={closeResetModal}></button>
  </div>
{/if}

<style lang="postcss">
  @reference '../../../app.css';

  .wizard-container {
    @apply bg-lightGrey rounded-2xl shadow-lg;
    .inner-box {
      @apply mx-0 my-4 p-8;
    }
  }

  .wizard-header {
    @apply border-base-300 mb-8 flex items-center justify-between border-b px-6 pb-4;

    h1 {
      @apply m-0 p-0;
    }
  }

  .progress-wrapper {
    @apply mx-6 mb-12;
  }

  .step-content-wrapper {
    @apply mb-8 min-h-96 px-6;
  }

  .step-header {
    @apply mb-12 text-center;

    h1 {
      @apply mb-4;
    }
  }

  .project-types-grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
  }

  .subtypes-grid {
    @apply grid grid-cols-1 gap-6 md:grid-cols-2;
  }

  .features-grid {
    @apply mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3;
  }

  .service-card {
    @apply transition-all duration-300;

    &:hover {
      @apply translate-y-1.5;
    }

    &.card-selected {
      @apply ring-primary ring-2 ring-offset-2;
    }

    .service-card-header {
      @apply mb-4 flex items-center justify-between;

      .service-icon {
        @apply text-3xl;
      }
    }
  }

  .content-section {
    @apply mb-12;

    h2 {
      @apply mb-4;
    }

    p {
      @apply mb-6;
    }
  }

  .wizard-navigation {
    @apply border-base-300 flex items-center justify-between border-t p-6;
  }

  /* Form styling improvements */
  .form-control {
    @apply w-full;
  }

  .textarea,
  .input,
  .select {
    @apply w-full;
  }

  .label {
    @apply w-full;
  }

  .join {
    @apply w-full;
  }
</style>
