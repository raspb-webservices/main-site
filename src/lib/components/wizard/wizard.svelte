<script lang="ts">
  import { onMount } from 'svelte';
  import type { WizardConfig, Project } from '$interfaces/project.interface';
  import type { Customer } from '$interfaces/customer.interface';
  import { uploadAsset, publishAsset, createAsset, uploadMultipleAssetsWithDelay, publishMultipleAssets } from '$helper/uploadAsset';
  import { projectTypes, subTypes, availableFeatures, googleFonts, formFieldTypes, featureCategoryColors } from './wizard-config';
  import { goto } from '$app/navigation';
  import ContactForm from './contact-form.svelte';

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
    features: ['cookieConsent'],
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
    uploadedFiles: []
  });

  // Additional wizard-specific properties
  let uploadedFiles: File[] = $state([]);
  let customFeatures = $state('');
  let isUploading = $state(false);
  let uploadProgress = $state('');

  // Customer data for contact form
  let customerData: Partial<Customer> = $state({
    salutation: '',
    givenName: '',
    familyName: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    postCode: '',
    city: '',
    country: 'Deutschland'
  });
  let isContactFormValid = $state(false);
  let createdCustomerId = $state<string>('');

  // Loading and error states
  let isSubmitting = $state(false);
  let showErrorModal = $state(false);
  let errorDetails = $state<string[]>([]);
  let showThankYou = $state(false);
  let errorModal: HTMLDialogElement;
  let resetModal: HTMLDialogElement;

  // Asset upload states
  let uploadedAssetIds: string[] = $state([]);
  let isPreparingAssets = $state(false);
  let assetPreparationProgress = $state('');

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
        { id: 7, title: 'Kontakt', required: true },
        { id: 8, title: 'Ergebnis', required: false }
      ];
    } else if (projectType === 'webApplication') {
      return [
        ...baseSteps,
        { id: 4, title: 'Materialien', required: false },
        { id: 5, title: 'Kontakt', required: true },
        { id: 6, title: 'Ergebnis', required: false }
      ];
    } else if (projectType === 'artificialIntelligence') {
      return [
        ...baseSteps,
        { id: 4, title: 'Materialien', required: false },
        { id: 5, title: 'Kontakt', required: true },
        { id: 6, title: 'Ergebnis', required: false }
      ];
    } else {
      // freestyle
      return [...baseSteps, { id: 4, title: 'Kontakt', required: true }, { id: 5, title: 'Ergebnis', required: false }];
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
    config.pages = [...config.pages, { name: '', content: '', characteristic: '' }];
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

  function scrollToTop() {
    // Scroll to the top of the wizard container

    setTimeout(() => {
      const wizardContainer = document.querySelector('.wizard-container');

      console.log('wizardContainer', wizardContainer);

      if (wizardContainer) {
        wizardContainer.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      } else {
        // Fallback: scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= maxSteps) {
      currentStep = step;
      scrollToTop();
    }
  }

  function nextStep() {
    if (currentStep < maxSteps) {
      currentStep++;
      scrollToTop();

      // If entering the final step, prepare assets
      if (currentStep === maxSteps) {
        calculatePrice();
        prepareAssetsForFinalStep();
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      scrollToTop();
    }
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
      features: ['cookieConsent'],
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

  // Function to prepare assets when entering final step
  async function prepareAssetsForFinalStep() {
    if (uploadedFiles.length === 0 || uploadedAssetIds.length > 0) return;

    isPreparingAssets = true;
    assetPreparationProgress = 'Bereite Assets vor...';

    try {
      const preparedAssetIds = await uploadMultipleAssetsWithDelay(
        uploadedFiles,
        3000, // 3 second delay between uploads to avoid rate limiting
        (message, current, total, assetId) => {
          assetPreparationProgress = `[${current}/${total}] ${message}`;
        }
      );

      uploadedAssetIds = preparedAssetIds;

      if (preparedAssetIds.length > 0) {
        assetPreparationProgress = `${preparedAssetIds.length} von ${uploadedFiles.length} Assets bereit zum Veröffentlichen`;
      } else {
        assetPreparationProgress = 'Keine Assets konnten vorbereitet werden';
      }
    } catch (error) {
      console.error('Fehler beim Vorbereiten der Assets:', error);
      assetPreparationProgress = 'Fehler beim Vorbereiten der Assets';
    } finally {
      isPreparingAssets = false;
    }
  }

  // Legacy function for manual upload (kept for compatibility)
  async function uploadAllFiles() {
    if (uploadedFiles.length === 0) return [];

    isUploading = true;
    uploadProgress = 'Dateien werden hochgeladen...';

    try {
      const uploadedAssetIds = await uploadMultipleAssetsWithDelay(uploadedFiles, 2000, (message, current, total) => {
        uploadProgress = `[${current}/${total}] ${message}`;
      });

      if (uploadedAssetIds.length > 0) {
        uploadProgress = `Alle ${uploadedAssetIds.length} von ${uploadedFiles.length} Dateien erfolgreich verarbeitet`;
      } else {
        uploadProgress = 'Keine Dateien konnten erfolgreich hochgeladen werden';
      }

      return uploadedAssetIds;
    } catch (error) {
      console.error('Fehler beim Hochladen der Dateien:', error);
      uploadProgress = 'Fehler beim Hochladen der Dateien';
      return [];
    } finally {
      isUploading = false;
    }
  }

  async function generatePDF() {
    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import('jspdf');

      const doc = new jsPDF();

      // RASPB brand colors - violett-rosa Verläufe
      const brandPurple = { r: 139, g: 69, b: 19 }; // #8B4513 (Saddle Brown - als Basis für Violett)
      const brandPink = { r: 219, g: 112, b: 147 }; // #DB7093 (Pale Violet Red)
      const brandViolet = { r: 138, g: 43, b: 226 }; // #8A2BE2 (Blue Violet)
      const brandRose = { r: 255, g: 182, b: 193 }; // #FFB6C1 (Light Pink)
      const brandDeepPurple = { r: 75, g: 0, b: 130 }; // #4B0082 (Indigo)
      const brandLavender = { r: 230, g: 230, b: 250 }; // #E6E6FA (Lavender)
      const accentGold = { r: 255, g: 215, b: 0 }; // #FFD700 (Gold)

      let yPosition = 20;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // Helper function to create gradient effect with rectangles
      function createGradientHeader(startColor: any, endColor: any, height: number) {
        const steps = 20;
        const stepHeight = height / steps;

        for (let i = 0; i < steps; i++) {
          const ratio = i / (steps - 1);
          const r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
          const g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
          const b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);

          doc.setFillColor(r, g, b);
          doc.rect(0, i * stepHeight, pageWidth, stepHeight, 'F');
        }
      }

      // Helper function to create section headers with gradient
      function createSectionHeader(text: string, y: number) {
        const headerHeight = 15;
        const steps = 10;
        const stepHeight = headerHeight / steps;

        // Create gradient from violet to pink
        for (let i = 0; i < steps; i++) {
          const ratio = i / (steps - 1);
          const r = Math.round(brandViolet.r + (brandPink.r - brandViolet.r) * ratio);
          const g = Math.round(brandViolet.g + (brandPink.g - brandViolet.g) * ratio);
          const b = Math.round(brandViolet.b + (brandPink.b - brandViolet.b) * ratio);

          doc.setFillColor(r, g, b);
          doc.rect(margin, y - 5 + i * stepHeight, contentWidth, stepHeight, 'F');
        }

        // Add text
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(text, margin + 5, y + 5);
      }

      // Helper function to add text with word wrapping
      function addText(text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + lines.length * fontSize * 0.4;
      }

      // Helper function to add a new page if needed
      function checkPageBreak(requiredSpace: number) {
        if (yPosition + requiredSpace > doc.internal.pageSize.height - 30) {
          doc.addPage();
          addPageHeader();
          yPosition = 50;
        }
      }

      // Helper function to add page header
      function addPageHeader() {
        // Mini gradient header for subsequent pages
        createGradientHeader(brandDeepPurple, brandRose, 25);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('RASPB', margin, 15);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Projekt Konfiguration', margin + 35, 15);
      }

      // Main header with dramatic gradient
      createGradientHeader(brandDeepPurple, brandRose, 50);

      // Add decorative elements
      doc.setFillColor(accentGold.r, accentGold.g, accentGold.b);
      doc.circle(pageWidth - 30, 25, 8, 'F');
      doc.setFillColor(255, 255, 255);
      doc.circle(pageWidth - 30, 25, 6, 'F');

      // Main title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('RASPB', margin, 25);

      doc.setFontSize(18);
      doc.setFont('helvetica', 'normal');
      doc.text('Projekt Konfiguration', margin, 40);

      // Subtitle with date
      doc.setFontSize(10);
      doc.setTextColor(brandLavender.r, brandLavender.g, brandLavender.b);
      doc.text(`Erstellt am ${new Date().toLocaleDateString('de-DE')}`, pageWidth - margin - 50, 40);

      yPosition = 65;
      doc.setTextColor(0, 0, 0);

      // Project Overview Section
      createSectionHeader('PROJEKT ÜBERSICHT', yPosition);
      yPosition += 25;
      doc.setFont('helvetica', 'normal');

      // Project Name with special styling
      if (config.name) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
        doc.text('Projektname:', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        yPosition = addText(config.name, margin + 50, yPosition, contentWidth - 50, 16);
        yPosition += 8;
      }

      // Project Type
      const projectType = projectTypes.find((p) => p.id === config.projectType);
      const subType = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);

      if (projectType) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
        doc.text('Projekttyp:', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        yPosition = addText(`${projectType.title}${subType ? ` - ${subType.title}` : ''}`, margin + 40, yPosition, contentWidth - 40, 12);
        yPosition += 8;
      }

      // Estimated Price with special highlight
      if (config.estimatedPrice > 0) {
        // Price highlight box
        doc.setFillColor(brandLavender.r, brandLavender.g, brandLavender.b);
        doc.roundedRect(margin, yPosition - 3, contentWidth, 20, 3, 3, 'F');

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(brandDeepPurple.r, brandDeepPurple.g, brandDeepPurple.b);
        doc.text('Geschätzter Preis:', margin + 5, yPosition + 8);

        doc.setFontSize(18);
        doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
        doc.text(`${config.estimatedPrice.toLocaleString()}€`, margin + 70, yPosition + 8);

        yPosition += 25;
      }

      // Project Description
      if (config.description) {
        checkPageBreak(40);
        createSectionHeader('PROJEKTBESCHREIBUNG', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        yPosition = addText(config.description, margin, yPosition, contentWidth, 10);
        yPosition += 15;
      }

      // Project Details
      checkPageBreak(60);
      createSectionHeader('PROJEKT DETAILS', yPosition);
      yPosition += 25;

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const details = [
        { label: 'Zielgruppe', value: config.targetAudience },
        { label: 'Hauptziele', value: config.goals },
        { label: 'Gewünschte Domain', value: config.desiredDomain },
        { label: 'Domain-Status', value: config.domainStatus },
        { label: 'Zeitrahmen', value: config.timeline },
        { label: 'Budget', value: config.budget }
      ];

      details.forEach((detail) => {
        if (detail.value) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text(`${detail.label}:`, margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          yPosition = addText(detail.value, margin + 45, yPosition, contentWidth - 45, 10);
          yPosition += 5;
        }
      });

      // Features (if any)
      if (config.features.length > 0) {
        checkPageBreak(40);
        yPosition += 10;

        createSectionHeader('GEWÄHLTE FEATURES', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        config.features.forEach((featureId) => {
          const feature = availableFeatures.find((f) => f.name === featureId);
          if (feature) {
            // Feature bullet with color
            doc.setTextColor(brandPink.r, brandPink.g, brandPink.b);
            doc.text('●', margin + 5, yPosition);
            doc.setTextColor(0, 0, 0);
            doc.text(feature.title, margin + 10, yPosition);
            yPosition += 6;
            if (feature.description) {
              doc.setTextColor(100, 100, 100);
              yPosition = addText(`  ${feature.description}`, margin + 15, yPosition, contentWidth - 20, 9);
              doc.setTextColor(0, 0, 0);
              yPosition += 3;
            }
          }
        });

        if (customFeatures) {
          yPosition += 5;
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('Weitere Features:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          yPosition += 6;
          yPosition = addText(customFeatures, margin + 5, yPosition, contentWidth - 10, 10);
        }
      }

      // Pages/Content (if any)
      if (config.pages.length > 0) {
        checkPageBreak(40);
        yPosition += 10;

        createSectionHeader('SEITEN/BEREICHE', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        config.pages.forEach((page, index) => {
          if (page.name.trim()) {
            checkPageBreak(25);

            // Page number with colored background
            doc.setFillColor(brandRose.r, brandRose.g, brandRose.b);
            doc.circle(margin + 5, yPosition - 2, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text(`${index + 1}`, margin + 3, yPosition);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
            doc.text(page.name, margin + 12, yPosition);
            yPosition += 6;

            if (page.content) {
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Inhalte:', margin + 5, yPosition);
              yPosition += 5;
              yPosition = addText(page.content, margin + 10, yPosition, contentWidth - 15, 9);
              yPosition += 3;
            }

            if (page.characteristic) {
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Besonderheiten:', margin + 5, yPosition);
              yPosition += 5;
              yPosition = addText(page.characteristic, margin + 10, yPosition, contentWidth - 15, 9);
              yPosition += 8;
            }
          }
        });
      }

      // Form Fields (if any)
      if (config.formFields.length > 0) {
        checkPageBreak(40);
        yPosition += 10;

        createSectionHeader('FORMULAR-FELDER', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        config.formFields.forEach((field, index) => {
          if (field.name.trim()) {
            const fieldType = formFieldTypes.find((f) => f.id === field.type);

            // Field number with colored background
            doc.setFillColor(brandRose.r, brandRose.g, brandRose.b);
            doc.circle(margin + 5, yPosition - 2, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text(`${index + 1}`, margin + 3, yPosition);

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(`${field.name}`, margin + 12, yPosition);
            doc.text(`(${fieldType?.title || field.type})`, margin + 80, yPosition);

            if (field.required) {
              doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
              doc.text('*Pflicht', margin + 130, yPosition);
              doc.setTextColor(0, 0, 0);
            }
            yPosition += 6;
          }
        });
      }

      // Design (if not individual project)
      if (config.projectType !== 'individual') {
        checkPageBreak(50);
        yPosition += 10;

        createSectionHeader('DESIGN', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        // Colors with visual representation
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
        doc.text('Farbschema:', margin, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);

        // Primary Color
        doc.text(`Primärfarbe: ${config.primaryColour}`, margin + 5, yPosition);
        // Color swatch simulation
        doc.setFillColor(
          parseInt(config.primaryColour.slice(1, 3), 16),
          parseInt(config.primaryColour.slice(3, 5), 16),
          parseInt(config.primaryColour.slice(5, 7), 16)
        );
        doc.rect(margin + 70, yPosition - 3, 8, 5, 'F');
        yPosition += 6;

        // Secondary Color
        doc.text(`Sekundärfarbe: ${config.secondaryColour}`, margin + 5, yPosition);
        doc.setFillColor(
          parseInt(config.secondaryColour.slice(1, 3), 16),
          parseInt(config.secondaryColour.slice(3, 5), 16),
          parseInt(config.secondaryColour.slice(5, 7), 16)
        );
        doc.rect(margin + 70, yPosition - 3, 8, 5, 'F');
        yPosition += 6;

        // Accent Color
        doc.text(`Akzentfarbe: ${config.accentColour}`, margin + 5, yPosition);
        doc.setFillColor(
          parseInt(config.accentColour.slice(1, 3), 16),
          parseInt(config.accentColour.slice(3, 5), 16),
          parseInt(config.accentColour.slice(5, 7), 16)
        );
        doc.rect(margin + 70, yPosition - 3, 8, 5, 'F');
        yPosition += 10;

        // Font
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
        doc.text('Schriftart:', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(config.customFont || config.desiredFont || 'Nicht angegeben', margin + 30, yPosition);
        yPosition += 15;
      }

      // Uploaded Files
      if (uploadedFiles.length > 0) {
        checkPageBreak(40);
        yPosition += 10;

        createSectionHeader('HOCHGELADENE DATEIEN', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        uploadedFiles.forEach((file, index) => {
          // File icon
          doc.setTextColor(brandPink.r, brandPink.g, brandPink.b);
          doc.text('📄', margin, yPosition);
          doc.setTextColor(0, 0, 0);
          doc.text(`${index + 1}. ${file.name}`, margin + 8, yPosition);
          doc.text(`(${Math.round(file.size / 1024)}KB)`, margin + 120, yPosition);
          yPosition += 6;
        });
      }

      // Contact Information
      if (customerData.givenName || customerData.familyName || customerData.email) {
        checkPageBreak(50);
        yPosition += 10;

        createSectionHeader('KONTAKTINFORMATIONEN', yPosition);
        yPosition += 25;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        if (customerData.salutation) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('Anrede:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(customerData.salutation, margin + 25, yPosition);
          yPosition += 6;
        }

        if (customerData.givenName || customerData.familyName) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('Name:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(`${customerData.givenName || ''} ${customerData.familyName || ''}`.trim(), margin + 25, yPosition);
          yPosition += 6;
        }

        if (customerData.email) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('E-Mail:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(customerData.email, margin + 25, yPosition);
          yPosition += 6;
        }

        if (customerData.phone) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('Telefon:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(customerData.phone, margin + 25, yPosition);
          yPosition += 6;
        }

        if (customerData.company) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('Unternehmen:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.text(customerData.company, margin + 35, yPosition);
          yPosition += 6;
        }

        if (customerData.address || customerData.postCode || customerData.city) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(brandViolet.r, brandViolet.g, brandViolet.b);
          doc.text('Adresse:', margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          yPosition += 6;

          if (customerData.address) {
            doc.text(customerData.address, margin + 5, yPosition);
            yPosition += 5;
          }
          if (customerData.postCode || customerData.city) {
            doc.text(`${customerData.postCode || ''} ${customerData.city || ''}`.trim(), margin + 5, yPosition);
            yPosition += 5;
          }
          if (customerData.country) {
            doc.text(customerData.country, margin + 5, yPosition);
            yPosition += 5;
          }
        }
      }

      // Footer with branding
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        // Footer gradient
        const footerY = doc.internal.pageSize.height - 20;
        const footerSteps = 5;
        const footerStepHeight = 10 / footerSteps;

        for (let j = 0; j < footerSteps; j++) {
          const ratio = j / (footerSteps - 1);
          const r = Math.round(brandDeepPurple.r + (brandLavender.r - brandDeepPurple.r) * ratio);
          const g = Math.round(brandDeepPurple.g + (brandLavender.g - brandDeepPurple.g) * ratio);
          const b = Math.round(brandDeepPurple.b + (brandLavender.b - brandDeepPurple.b) * ratio);

          doc.setFillColor(r, g, b);
          doc.rect(0, footerY + j * footerStepHeight, pageWidth, footerStepHeight, 'F');
        }

        // Footer text
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(`Erstellt am ${new Date().toLocaleDateString('de-DE')} | Seite ${i} von ${totalPages}`, margin, footerY + 8);
        doc.text('RASPB Webservices | www.raspb.de', pageWidth - margin - 60, footerY + 8);
      }

      // Save the PDF
      const fileName = `${config.name || 'Projekt'}_Konfiguration_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Fehler beim Erstellen des PDFs. Bitte versuchen Sie es erneut.');
    }
  }

  function closeErrorModal() {
    errorModal?.close();
    showErrorModal = false;
    errorDetails = [];
    // Redirect back to step 1 while preserving user input
    currentStep = 1;
  }

  function openResetModal() {
    resetModal?.showModal();
  }

  function closeResetModal() {
    resetModal?.close();
    showResetModal = false;
  }

  function showThankYouPage() {
    showThankYou = true;
  }

  // Neue Funktion zum Senden der Daten an die API
  async function submitToAPI() {
    isSubmitting = true;
    errorDetails = [];

    try {
      // Step 1: Create customer first
      console.log('Creating customer:', customerData);

      const customerResponse = await fetch('/api/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      const customerResult = await customerResponse.json();

      if (!customerResult.success) {
        errorDetails.push(`Customer-Fehler: ${customerResult.error || 'Unbekannter Fehler'}`);
        if (customerResult.details) {
          errorDetails.push(...customerResult.details);
        }
        throw new Error('Customer creation failed');
      }

      createdCustomerId = customerResult.data.id;
      console.log('Customer erstellt/gefunden:', createdCustomerId);

      // Step 2: Publish customer
      try {
        const publishCustomerResponse = await fetch(`/api/customer/publish/${createdCustomerId}`, {
          method: 'POST'
        });
        const publishCustomerResult = await publishCustomerResponse.json();

        if (publishCustomerResponse.ok && publishCustomerResult.success) {
          console.log('Customer veröffentlicht:', publishCustomerResult);
        } else {
          console.warn('Customer publishing failed, but customer was created:', publishCustomerResult);
          // Don't fail the entire process if customer publishing fails
        }
      } catch (publishCustomerError) {
        console.warn('Customer publishing error:', publishCustomerError);
        // Don't fail the entire process if customer publishing fails
      }

      // Step 3: Prepare asset IDs (use pre-uploaded or fallback to upload now)
      let finalAssetIds: string[] = [];
      if (uploadedAssetIds.length > 0) {
        console.log('Using pre-uploaded assets:', uploadedAssetIds);
        finalAssetIds = uploadedAssetIds;
      } else if (uploadedFiles.length > 0) {
        // Fallback: If no pre-uploaded assets, upload them now
        console.log('No pre-uploaded assets found, uploading now...');
        finalAssetIds = await uploadAllFiles();

        if (finalAssetIds.length === 0 && uploadedFiles.length > 0) {
          errorDetails.push('Fehler beim Hochladen der Dateien');
          throw new Error('File upload failed');
        }
      }

      // Step 4: Create project (without owner initially to avoid circular dependency)
      console.log('Creating project with assets:', finalAssetIds);

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
        relatedFiles: finalAssetIds.map((id) => ({ id }))
        // Note: owner will be linked separately
      };

      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (result.success && result.data?.id) {
        const projectId = result.data.id;
        console.log('Projekt erstellt:', projectId);

        // Step 5: Link customer to project
        try {
          const linkResponse = await fetch(`/api/project/link-customer/${projectId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId: createdCustomerId })
          });
          const linkResult = await linkResponse.json();

          if (linkResponse.ok && linkResult.success) {
            console.log('Customer mit Projekt verknüpft:', linkResult);
          } else {
            console.warn('Customer linking failed, but project was created:', linkResult);
            // Don't fail the entire process if linking fails
          }
        } catch (linkError) {
          console.warn('Customer linking error:', linkError);
          // Don't fail the entire process if linking fails
        }

        // Step 6: Publish the project
        try {
          const publishResponse = await fetch(`/api/project/publish/${projectId}`, {
            method: 'POST'
          });
          const publishResult = await publishResponse.json();

          if (publishResponse.ok && publishResult) {
            console.log('Projekt veröffentlicht:', publishResult);
          } else {
            console.warn('Project publishing failed, but project was created:', publishResult);
            // Don't fail the entire process if publishing fails
          }
        } catch (publishError) {
          console.warn('Project publishing error:', publishError);
          // Don't fail the entire process if publishing fails
        }

        // Step 7: Now publish all assets AFTER project is published
        if (finalAssetIds.length > 0) {
          console.log('Publishing assets after project publication:', finalAssetIds);

          const publishedAssetIds = await publishMultipleAssets(finalAssetIds, (message, current, total) => {
            // Update loading steps to show asset publishing progress
            console.log(`Asset publishing: ${message}`);
          });

          if (publishedAssetIds.length === 0 && finalAssetIds.length > 0) {
            console.warn('Asset publishing failed, but project was created and published');
            // Don't fail the entire process if asset publishing fails
          } else {
            console.log('Assets successfully published:', publishedAssetIds);
          }
        }

        // Show thank you page
        showThankYouPage();
      } else {
        // Collect detailed error information
        errorDetails.push(`API Fehler: ${result.error || 'Unbekannter Fehler'}`);
        if (result.details) {
          errorDetails.push(...result.details);
        }
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Submission error:', error);

      // Add network error if no other errors were collected
      if (errorDetails.length === 0) {
        errorDetails.push('Netzwerk Fehler: Verbindung zum Server fehlgeschlagen');
        errorDetails.push('Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut');
      }

      // Show error modal
      showErrorModal = true;
    } finally {
      isSubmitting = false;
    }
  }

  onMount(() => {
    calculatePrice();
  });
</script>

<div class="wizard-container">
  <!-- Header with Reset Button -->
  <div class="wizard-header">
    <h1 id="projekt-konfigurator">Projekt <span class="inner-text-special">Konfigurator</span></h1>
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
      <div class="bg-base-300 absolute top-6 right-0 left-0 mx-8 h-0.5"></div>
      <!-- Progress connecting line -->
      <div
        class="bg-primary absolute top-6 right-0 left-0 mx-8 h-0.5 transition-all duration-300"
        style="width: {currentStep > 1 ? `calc(${((currentStep - 1) / (stepConfig.length - 1)) * 100}% - ${currentStep - 1}rem )` : '0%'}"
      ></div>

      {#each stepConfig as step, i}
        <button
          type="button"
          class="relative z-10 flex min-w-24 cursor-pointer flex-col items-center border-none bg-transparent p-2 transition-all duration-200"
          onclick={() => goToStep(i + 1)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              goToStep(i + 1);
            }
          }}
          aria-label="Go to step {i + 1}: {step.title}"
          aria-current={i + 1 === currentStep ? 'step' : undefined}
        >
          <!-- Step Circle -->
          <div
            class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200
                   {i + 1 <= currentStep ? 'bg-primary text-primary-content border-primary' : 'bg-base-100 border-base-300 hover:bg-base-300'}"
          >
            {i + 1}
          </div>
          <!-- Step Title -->
          <div class="mt-2 max-w-20 text-center text-xs font-medium">
            {step.title}
          </div>
        </button>
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
            role="button"
            tabindex="0"
            onclick={() => selectProjectType(type.id)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectProjectType(type.id);
              }
            }}
            aria-label="Select project type: {type.title}"
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
            role="button"
            tabindex="0"
            onclick={() => selectSubType(subtype.id)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectSubType(subtype.id);
              }
            }}
            aria-label="Select subtype: {subtype.title}"
          >
            <div class="card-body">
              <h3 class="card-title">{subtype.title}</h3>
              <p class="no-padding">{subtype.description}</p>
              <div class="card-actions justify-end">
                <div class="badge badge-success">ab {subtype.price.toLocaleString()}€</div>
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
              <option value="5-10-days">5 - 10 Tage </option>
              <option value="2-4-weeks">2 - 4 Wochen</option>
              <option value="2-6-months">2 - 6 Monate</option>
              <option value="flexible">Flexibel</option>
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label" for="budget">
              <span class="label-text font-semibold">Ihr Budget:</span>
            </label>
            <select id="budget" class="select select-bordered w-full" bind:value={config.budget}>
              <option value="">Bitte wählen...</option>
              <option value="under-500">Unter 500€</option>
              <option value="1k-3k">1.000€ - 3.000€</option>
              <option value="3k-7k">3.000€ - 7.000€</option>
              <option value="7k-10k">7.000€ - 10.000€</option>
              <option value="10k-15k">10.000€ - 15.000€</option>
              <option value="over-20k">mehr als 15.000€</option>
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
                  <button type="button" class="btn btn-error btn-sm" onclick={() => removePage(i)} aria-label="Seite entfernen">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Entfernen
                  </button>
                </div>

                <div class="form-control mb-4 w-full">
                  <label class="label" for="pageName{i}">
                    <span class="label-text font-semibold">Seitenname:</span>
                  </label>
                  <input
                    type="text"
                    id="pageName{i}"
                    class="input input-bordered w-full"
                    bind:value={config.pages[i].name}
                    placeholder="z.B. Startseite, Über uns, Kontakt, Leistungen..."
                  />
                </div>

                <div class="form-control mb-4 w-full">
                  <label class="label" for="pageContent{i}">
                    <span class="label-text font-semibold">Gewünschte Inhalte:</span>
                  </label>
                  <textarea
                    id="pageContent{i}"
                    class="textarea textarea-bordered w-full"
                    bind:value={config.pages[i].content}
                    placeholder="Beschreiben Sie, welche Inhalte auf dieser Seite stehen sollen: Texte, Bilder, Funktionen, etc."
                    rows="3"
                  ></textarea>
                </div>

                <div class="form-control w-full">
                  <label class="label" for="pageCharacteristic{i}">
                    <span class="label-text font-semibold">Besonderheiten der Seite:</span>
                  </label>
                  <textarea
                    id="pageCharacteristic{i}"
                    class="textarea textarea-bordered w-full"
                    bind:value={config.pages[i].characteristic}
                    placeholder="Welche Features sollen auf dieser Seite platziert werden? Sollen Inhaltsvorschläge erarbeitet werden oder sollen Inhalte exakt wie vorgegeben übernommen werden?"
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
                    <button type="button" class="btn btn-error btn-sm" onclick={() => removeFormField(i)} aria-label="Formularfeld entfernen">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Entfernen
                    </button>
                  </div>

                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="form-control w-full">
                      <label class="label" for="fieldType{i}">
                        <span class="label-text font-semibold">Feldtyp:</span>
                      </label>
                      <select id="fieldType{i}" class="select select-bordered w-full" bind:value={config.formFields[i].type}>
                        <option value="">Feldtyp wählen...</option>
                        {#each formFieldTypes as fieldType}
                          <option value={fieldType.id}>{fieldType.title}</option>
                        {/each}
                      </select>
                    </div>

                    <div class="form-control w-full">
                      <label class="label" for="fieldName{i}">
                        <span class="label-text font-semibold">Feldname/Beschriftung:</span>
                      </label>
                      <input
                        type="text"
                        id="fieldName{i}"
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
            <label class="label" for="googleFonts">
              <span class="label-text font-semibold">Google Fonts Auswahl:</span>
            </label>
            <select id="googleFonts" class="select select-bordered w-full" bind:value={config.desiredFont}>
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
        <p>Laden Sie hier Styleguides, Mockups, Logos, Bilder oder andere relevante Dateien hoch, die uns bei der Umsetzung helfen.</p>

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
            <span class="label-text-alt"
              >Unterstützte Formate: Allgemeine Dateien (PDF, .txt, ...), Office Dokumente (Word, Powerpoint, ...), Bildformate (.jpg, .png, ...)</span
            >
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
                  <button type="button" class="btn btn-sm btn-error" onclick={() => removeFile(i)} aria-label="Datei entfernen">
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
                  <button type="button" class="btn btn-sm btn-error" onclick={() => removeFile(i)} aria-label="Datei entfernen">
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
    {:else if (currentStep === 7 && (config.projectType === 'website' || config.projectType === 'cms')) || (currentStep === 5 && (config.projectType === 'webApplication' || config.projectType === 'artificialIntelligence')) || (currentStep === 4 && config.projectType === 'individual')}
      <!-- Contact Form Step -->
      <ContactForm bind:customerData bind:isValid={isContactFormValid} onUpdate={(data) => (customerData = data)} />
    {:else if currentStep === maxSteps}
      <!-- Final Step: Summary -->
      <div class="step-header">
        <h1><span class="inner-text-special">Zusammenfassung</span></h1>
        <p class="teaser">Überprüfen Sie Ihre Konfiguration. Sie können jederzeit zu vorherigen Schritten zurückkehren, um Änderungen vorzunehmen.</p>
      </div>

      <!-- Asset Preparation Progress -->
      {#if isPreparingAssets || assetPreparationProgress}
        <div class="mb-8">
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div class="font-bold">Assets werden vorbereitet</div>
              <div class="text-sm">{assetPreparationProgress}</div>
            </div>
            {#if isPreparingAssets}
              <span class="loading loading-spinner loading-md"></span>
            {/if}
          </div>
        </div>
      {/if}

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
        disabled={(currentStep === 1 && !config.projectType) ||
          (currentStep === 2 && !config.subType) ||
          (stepConfig[currentStep - 1]?.title === 'Kontakt' && !isContactFormValid)}
      >
        Weiter
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {:else}
      <div class="flex gap-4">
        <button type="button" class="btn-basic" onclick={generatePDF}>
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

<!-- Loading Overlay -->
{#if isSubmitting}
  <div class="loading-overlay">
    <div class="loading-content">
      <div class="loading-animation">
        <div class="loading-spinner"></div>
        <div class="loading-pulse"></div>
      </div>
      <h2 class="loading-title">Projekt wird übermittelt...</h2>
      <p class="loading-text">Bitte warten Sie, während wir Ihr Projekt verarbeiten.</p>
      <div class="loading-steps">
        <div class="loading-step">
          <span class="loading-step-icon">✓</span>
          <span>Daten werden vorbereitet</span>
        </div>
        <div class="loading-step">
          <span class="loading-step-icon">⏳</span>
          <span>Projekt wird erstellt</span>
        </div>
        <div class="loading-step">
          <span class="loading-step-icon">⏳</span>
          <span>Bestätigung wird gesendet</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Error Modal -->
<dialog bind:this={errorModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
    </form>

    <h3 class="text-error mb-4 text-lg font-bold">Fehler beim Übermitteln</h3>

    <div class="space-y-4">
      <p>Bei der Übermittlung Ihres Projekts sind folgende Fehler aufgetreten:</p>

      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <ul class="space-y-1">
            {#each errorDetails as error}
              <li class="text-sm">{error}</li>
            {/each}
          </ul>
        </div>
      </div>

      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class="font-bold">Was passiert jetzt?</div>
          <div class="text-sm">
            Nach dem Schließen dieses Dialogs werden Sie zu Schritt 1 zurückgeleitet. Ihre Eingaben bleiben dabei erhalten, sodass Sie das Problem beheben und
            erneut versuchen können.
          </div>
        </div>
      </div>
    </div>

    <div class="modal-action">
      <button type="button" class="btn btn-primary" onclick={closeErrorModal}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        Zurück zu Schritt 1
      </button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Thank You Page -->
{#if showThankYou}
  <div class="thank-you-overlay">
    <div class="thank-you-content">
      <div class="thank-you-animation">
        <div class="success-checkmark flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-success h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h1 class="thank-you-title">Vielen Dank!</h1>
      <p class="thank-you-subtitle">Ihr Projekt wurde erfolgreich übermittelt</p>
      <div class="thank-you-details">
        <div class="thank-you-card">
          <h3>Was passiert als nächstes?</h3>
          <ul class="thank-you-steps">
            <li>
              <span class="step-number">1</span>
              <span>Wir prüfen Ihre Anfrage innerhalb von 24 Stunden</span>
            </li>
            <li>
              <span class="step-number">2</span>
              <span>Sie erhalten ein detailliertes Angebot per E-Mail</span>
            </li>
            <li>
              <span class="step-number">3</span>
              <span>Wir vereinbaren einen Termin für ein persönliches Gespräch</span>
            </li>
          </ul>
        </div>
        <div class="thank-you-info">
          <p><strong>Projektname:</strong> {config.name}</p>
          <p><strong>Geschätzter Preis:</strong> {config.estimatedPrice.toLocaleString()}€</p>
          <p><strong>Projekttyp:</strong> {projectTypes.find((p) => p.id === config.projectType)?.title}</p>
        </div>
      </div>
      <div class="thank-you-actions">
        <button
          onclick={() => {
            goto('/');
          }}
          class="btn btn-primary btn-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Zur Startseite
        </button>
        <a href="/kontakt" class="btn btn-link btn-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Kontakt aufnehmen
        </a>
      </div>
    </div>
  </div>
{/if}

<!-- Reset Modal -->
<dialog bind:this={resetModal} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
    </form>

    <h3 class="mb-4 text-lg font-bold">Von vorne beginnen?</h3>
    <p class="py-4">Möchten Sie wirklich von vorne beginnen? Alle Ihre bisherigen Eingaben gehen dabei verloren.</p>

    <div class="modal-action">
      <button type="button" class="btn btn-outline" onclick={closeResetModal}>Abbrechen</button>
      <button type="button" class="btn btn-error" onclick={confirmReset}>Ja, zurücksetzen</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

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
      @apply bg-base-200;
    }

    &.card-selected {
      @apply ring-primary ring-2 ring-offset-2;
      &:hover {
        @apply cursor-default bg-transparent;
      }
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

  /* Loading Overlay Styles */
  .loading-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
  }

  .loading-content {
    @apply bg-base-100 mx-4 max-w-md rounded-2xl p-12 text-center shadow-2xl;
  }

  .loading-animation {
    @apply relative mb-8;
  }

  .loading-spinner {
    @apply border-primary/20 border-t-primary mx-auto h-16 w-16 rounded-full border-4;
    animation: spin 1s linear infinite;
  }

  .loading-pulse {
    @apply border-primary/40 absolute inset-0 mx-auto h-16 w-16 rounded-full border-4;
    animation: pulse 2s ease-in-out infinite;
  }

  .loading-title {
    @apply text-base-content mb-4 text-2xl font-bold;
  }

  .loading-text {
    @apply text-base-content/70 mb-8;
  }

  .loading-steps {
    @apply space-y-3 text-left;
  }

  .loading-step {
    @apply flex items-center gap-3 text-sm;
  }

  .loading-step-icon {
    @apply bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full font-bold;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.1;
    }
  }

  /* Thank You Page Styles */
  .thank-you-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center p-4;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(34, 197, 94, 0.1));
    backdrop-filter: blur(12px);
  }

  .thank-you-content {
    @apply bg-base-100 w-full max-w-4xl rounded-3xl p-12 text-center shadow-2xl;
  }

  .thank-you-animation {
    @apply mb-8;
  }

  .success-checkmark {
    @apply mx-auto mb-6;
    animation: checkmark-bounce 0.6s ease-in-out;
  }

  .thank-you-title {
    @apply text-success mb-4 text-4xl font-bold;
  }

  .thank-you-subtitle {
    @apply text-base-content/70 mb-12 text-xl;
  }

  .thank-you-details {
    @apply mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2;
  }

  .thank-you-card {
    @apply bg-base-200 rounded-2xl p-8;
  }

  .thank-you-card h3 {
    @apply text-base-content mb-6 text-xl font-bold;
  }

  .thank-you-steps {
    @apply space-y-4;
  }

  .thank-you-steps li {
    @apply flex items-start gap-4;
  }

  .step-number {
    @apply bg-primary text-primary-content mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold;
  }

  .thank-you-info {
    @apply bg-success/10 border-success/20 space-y-3 rounded-2xl border p-8;
  }

  .thank-you-info p {
    @apply text-base-content;
  }

  .thank-you-actions {
    @apply flex flex-col justify-center gap-4 sm:flex-row;
  }

  @keyframes checkmark-bounce {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Responsive improvements */
  @media (max-width: 768px) {
    .loading-content {
      @apply p-8;
    }

    .thank-you-content {
      @apply p-8;
    }

    .thank-you-title {
      @apply text-3xl;
    }

    .thank-you-subtitle {
      @apply text-lg;
    }
  }
</style>
