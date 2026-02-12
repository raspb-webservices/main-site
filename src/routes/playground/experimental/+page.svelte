<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, localizeHref, setLocale } from '$lib/paraglide/runtime';

  // Sample-Konfiguration für PDF-Test - SaaS Immobilienverwaltung
  const sampleConfig = {
    name: 'PropTech360 - Intelligente Immobilienverwaltungsplattform',
    projectType: 'webApplication',
    subType: 'customApp',
    description:
      'Eine umfassende SaaS-Plattform für die digitale Immobilienverwaltung mit KI-gestützten Analysen, automatisierten Workflows, Mieter-Portal, Eigentümer-Dashboard und integriertem Facility Management. Die Lösung revolutioniert die traditionelle Hausverwaltung durch Digitalisierung und Automatisierung.',
    projectDetails:
      'Multi-Tenant SaaS-Anwendung mit Rollen-basiertem Zugriff, API-First Architektur, Real-time Notifications, Mobile Apps, IoT-Integration für Smart Building Features, Machine Learning für Predictive Maintenance und automatisierte Buchhaltung',
    targetAudience:
      'Hausverwaltungsunternehmen, Immobilieneigentümer, Property Manager, Facility Manager, Mieter und Gewerbetreibende - primär B2B mit B2C Komponenten',
    goals:
      'Digitalisierung der Immobilienverwaltung, Effizienzsteigerung um 40%, Kostensenkung durch Automatisierung, Verbesserung der Mieter-Zufriedenheit, Skalierung auf 10.000+ verwaltete Einheiten',
    inspiration:
      'Moderne SaaS-Dashboards wie Notion, Linear und Figma kombiniert mit Immobilien-spezifischen Lösungen wie Buildium, AppFolio und deutschen Marktführern wie DOMUS und ista',
    desiredDomain: 'proptech360.de',
    domainStatus: 'Verfügbar, Registrierung erforderlich',
    projectStatus: 'prototype',
    timeline: '20-24 Wochen',
    budget: '35000-50000€',
    estimatedPrice: 42500,
    features: [
      'benutzerkonten',
      'zahlungsbawicklung',
      'suchfunktion',
      'kalender',
      'terminbuchung',
      'dateiupload',
      'downloadbereich',
      'analyticsIntegration',
      'seo',
      'mehrsprachigkeit',
      'kontaktformular',
      'newsletterRegistrierung',
      'customFilter',
      'customCarousel',
      'megaMenu',
      'portfolioGrid',
      'akkordeon',
      'tabs',
      'multiStepDialog',
      'chatbot',
      'konfigurator',
      'assistent',
      'bewertungsmechanismus',
      'themeSwitcher',
      'cookieConsent',
      'videoEmbedding',
      'barrierefreiheitTools',
      'marketingTools',
      'mapsIntegration',
      'socialMedieIntegration'
    ],
    customFeature:
      'KI-basierte Mietpreis-Optimierung, IoT-Sensoren für Predictive Maintenance, Blockchain-basierte Mietverträge, AR-Besichtigungen, Automatische Nebenkostenabrechnung mit OCR, Chatbot für Mieteranfragen, Mobile App mit Push-Notifications, API-Integration zu Banken und Versicherungen, Machine Learning für Leerstandsprognosen',
    pages: [
      {
        name: 'Landing Page',
        content: 'Hero-Section mit Produktdemo, Feature-Highlights, Kundenstimmen, Preismodelle, ROI-Rechner und Demo-Anfrage',
        characteristic: 'Animated Dashboard-Preview, Interactive ROI Calculator, Video-Testimonials'
      },
      {
        name: 'Dashboard (Verwalter)',
        content: 'Übersicht aller Immobilien, KPIs, Umsatz-Charts, Aufgaben-Management, Benachrichtigungen, Quick-Actions',
        characteristic: 'Real-time Data Updates, Drag & Drop Widgets, Responsive Charts'
      },
      {
        name: 'Immobilien-Verwaltung',
        content: 'Objektliste, Detailansichten, Grundrisse, Dokumente, Mieter-Übersicht, Wartungshistorie, Finanzen',
        characteristic: 'Interactive Floor Plans, Document Management, Photo Galleries'
      },
      {
        name: 'Mieter-Portal',
        content: 'Persönliches Dashboard, Mietvertrag, Nebenkostenabrechnungen, Schadensmeldungen, Kommunikation, Zahlungen',
        characteristic: 'Mobile-First Design, Push Notifications, Secure Document Vault'
      },
      {
        name: 'Wartung & Service',
        content: 'Wartungskalender, Aufträge-Management, Handwerker-Portal, Kostentracking, Qualitätskontrolle, Reporting',
        characteristic: 'Workflow Automation, Photo Documentation, Rating System'
      },
      {
        name: 'Finanzen & Buchhaltung',
        content: 'Mieteingang-Tracking, Nebenkostenabrechnung, Rechnungsstellung, DATEV-Export, Steuer-Reports, Cashflow-Prognosen',
        characteristic: 'Automated Calculations, Bank Integration, Tax Compliance'
      },
      {
        name: 'Kommunikation',
        content: 'Nachrichten-Center, Rundschreiben, Aushänge, Mieter-App Notifications, E-Mail Templates, SMS-Versand',
        characteristic: 'Multi-Channel Communication, Template Engine, Delivery Tracking'
      },
      {
        name: 'Berichte & Analytics',
        content: 'Performance-KPIs, Leerstand-Analysen, Mietpreis-Benchmarks, Wartungskosten, Mieter-Zufriedenheit, Custom Reports',
        characteristic: 'Interactive Charts, Export Functions, Scheduled Reports'
      },
      {
        name: 'Einstellungen & Admin',
        content: 'Benutzer-Verwaltung, Rollen & Rechte, System-Konfiguration, API-Keys, Backup-Management, Audit-Logs',
        characteristic: 'Role-Based Access Control, Security Settings, System Monitoring'
      },
      {
        name: 'Mobile App',
        content: 'Native iOS/Android Apps für Mieter und Verwalter mit Offline-Funktionalität, Push-Notifications und Kamera-Integration',
        characteristic: 'Progressive Web App, Offline Sync, Camera Integration'
      },
      {
        name: 'API-Dokumentation',
        content: 'REST API Dokumentation, Webhooks, SDK Downloads, Code-Beispiele, Sandbox-Umgebung, Rate Limits',
        characteristic: 'Interactive API Explorer, Code Generators, Testing Tools'
      },
      {
        name: 'Support & Hilfe',
        content: 'Knowledge Base, Video-Tutorials, Live-Chat, Ticket-System, Webinar-Kalender, Community-Forum',
        characteristic: 'Searchable Knowledge Base, Video Library, Community Features'
      }
    ],
    formFields: [
      { name: 'Anrede', type: 'select', required: true },
      { name: 'Vorname', type: 'text', required: true },
      { name: 'Nachname', type: 'text', required: true },
      { name: 'E-Mail', type: 'email', required: true },
      { name: 'Telefon', type: 'tel', required: true },
      { name: 'Unternehmen', type: 'text', required: true },
      { name: 'Position', type: 'text', required: false },
      { name: 'Anzahl verwaltete Einheiten', type: 'number', required: true },
      { name: 'Aktuelles System', type: 'select', required: false },
      { name: 'Budget-Rahmen', type: 'select', required: false },
      { name: 'Gewünschter Start', type: 'date', required: false },
      { name: 'Besondere Anforderungen', type: 'textarea', required: false },
      { name: 'Demo gewünscht', type: 'checkbox', required: false },
      { name: 'Newsletter', type: 'checkbox', required: false },
      { name: 'Datenschutz', type: 'checkbox', required: true },
      { name: 'AGB', type: 'checkbox', required: true }
    ],
    primaryColour: '#1e40af',
    secondaryColour: '#64748b',
    accentColour: '#10b981',
    desiredFont: 'Inter',
    customFont: 'Inter, system-ui, -apple-system, sans-serif',
    relatedFiles: [
      { fileName: 'PropTech360_Brand_Guidelines.pdf', url: '/uploads/brand-guidelines.pdf' },
      { fileName: 'Technical_Specifications.pdf', url: '/uploads/tech-specs.pdf' },
      { fileName: 'UI_Mockups_Collection.fig', url: '/uploads/ui-mockups.fig' },
      { fileName: 'Logo_Assets.zip', url: '/uploads/logo-assets.zip' },
      { fileName: 'API_Documentation.pdf', url: '/uploads/api-docs.pdf' }
    ]
  };

  const sampleCustomerData = {
    salutation: 'Herr',
    givenName: 'Michael',
    familyName: 'Schmidt',
    email: 'michael.schmidt@immobilien-schmidt.de',
    phone: '+49 30 12345678',
    company: 'Schmidt Immobilienverwaltung GmbH',
    address: 'Potsdamer Platz 15',
    postCode: '10785',
    city: 'Berlin',
    country: 'Deutschland'
  };

  const sampleUploadedFiles = [
    { name: 'PropTech360_Logo_Variants.svg', size: 89123, type: 'image/svg+xml' },
    { name: 'Corporate_Identity_Manual.pdf', size: 6789012, type: 'application/pdf' },
    { name: 'UI_UX_Wireframes.fig', size: 23456789, type: 'application/octet-stream' },
    { name: 'Database_Schema_Documentation.pdf', size: 4567890, type: 'application/pdf' },
    { name: 'API_Integration_Requirements.docx', size: 1234567, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { name: 'Property_Management_Workflow.xlsx', size: 3456789, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { name: 'Competitor_Analysis_Report.pdf', size: 5678901, type: 'application/pdf' },
    { name: 'User_Journey_Maps.pdf', size: 2345678, type: 'application/pdf' },
    { name: 'Technical_Architecture_Diagram.png', size: 1567890, type: 'image/png' },
    { name: 'Security_Requirements.pdf', size: 2789012, type: 'application/pdf' },
    { name: 'GDPR_Compliance_Checklist.pdf', size: 1890123, type: 'application/pdf' },
    { name: 'Mobile_App_Mockups.sketch', size: 12345678, type: 'application/octet-stream' }
  ];

  const sampleCustomFeatures =
    'KI-basierte Mietpreis-Optimierung mit Marktdaten-Integration, IoT-Sensoren für Predictive Maintenance und Energieoptimierung, Blockchain-basierte Smart Contracts für Mietverträge, AR-gestützte Immobilienbesichtigungen mit 3D-Rundgängen, Automatische Nebenkostenabrechnung mit OCR-Rechnungserkennung, Multilingualer Chatbot für Mieteranfragen mit NLP, Native Mobile Apps mit Offline-Synchronisation, API-Integration zu Banken für automatische Mietzahlungsabgleich, Machine Learning für Leerstandsprognosen und Wartungsplanung, Digitale Unterschriften mit rechtsgültiger Dokumentation, Real-time Dashboard mit WebSocket-Updates, Automatisierte Compliance-Checks für Mietrecht und Steuervorschriften';

  let isGenerating = $state(false);
  let error = $state('');

  async function generateTestPDF() {
    isGenerating = true;
    error = '';

    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          config: sampleConfig,
          customerData: sampleCustomerData,
          uploadedFiles: sampleUploadedFiles,
          customFeatures: sampleCustomFeatures,
          filename: `RASPB_Projekt_${sampleConfig.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
          submittedLocale: getLocale()
        })
      });

      console.log('PDF res ', response);

      if (response.ok) {
        // PDF erfolgreich generiert - Download starten
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RASPB_Test_Projekt_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        console.log('errorData ', errorData);
        error = errorData.error || 'PDF-Generierung fehlgeschlagen';
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      error = 'Netzwerkfehler bei der PDF-Generierung';
    } finally {
      isGenerating = false;
    }
  }
</script>

<svelte:head>
  <title>{m.experimental_meta_title()}</title>
  <meta name="description" content={m.experimental_meta_description()} />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>{m.experimental_title()}</h1>
    <p class="teaser">{m.experimental_teaser()}</p>

    <!-- Sample Config Display -->
    <div class="mt-8">
      <h2>{m.experimental_sample_config()}</h2>
      <div class="bg-base-200 mt-4 rounded-lg p-6">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 text-lg font-bold">{m.experimental_project_details()}</h3>
            <ul class="space-y-1 text-sm">
              <li><strong>{m.experimental_project_name()}</strong> {sampleConfig.name}</li>
              <li><strong>{m.experimental_project_type()}</strong> {sampleConfig.projectType} - {sampleConfig.subType}</li>
              <li><strong>{m.experimental_project_budget()}</strong> {sampleConfig.budget}</li>
              <li><strong>{m.experimental_project_estimated_price()}</strong> {sampleConfig.estimatedPrice}€</li>
              <li><strong>{m.experimental_project_timeline()}</strong> {sampleConfig.timeline}</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">{m.experimental_features()}</h3>
            <div class="flex flex-wrap gap-1">
              {#each sampleConfig.features as feature}
                <span class="badge badge-primary badge-sm">{feature}</span>
              {/each}
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="mb-2 text-lg font-bold">{m.experimental_pages()} ({sampleConfig.pages.length})</h3>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {#each sampleConfig.pages as page}
              <div class="bg-base-100 rounded p-3">
                <div class="text-sm font-semibold">{page.name}</div>
                <div class="text-base-content/70 mt-1 text-xs">{page.content.substring(0, 50)}...</div>
              </div>
            {/each}
          </div>
        </div>

        <div class="mt-4">
          <h3 class="mb-2 text-lg font-bold">{m.experimental_customer()}</h3>
          <p class="text-sm">
            {sampleCustomerData.givenName}
            {sampleCustomerData.familyName}
            ({sampleCustomerData.company}) - {sampleCustomerData.email}
          </p>
        </div>

        <div class="mt-4">
          <h3 class="mb-2 text-lg font-bold">{m.experimental_files()} ({sampleUploadedFiles.length})</h3>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
            {#each sampleUploadedFiles as file}
              <div class="bg-base-100 rounded p-2 text-sm">
                <div class="font-medium">{file.name}</div>
                <div class="text-base-content/70 text-xs">{Math.round(file.size / 1024)} KB</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Test Button -->
    <div class="mt-8 text-center">
      <button class="btn btn-simple btn-lg" onclick={generateTestPDF} disabled={isGenerating}>
        {#if isGenerating}
          <span class="loading loading-spinner loading-sm"></span>
          {m.experimental_generating()}
        {:else}
          {m.experimental_generate_button()}
        {/if}
      </button>
    </div>

    <!-- Error Display -->
    {#if error}
      <div class="alert alert-error mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    {/if}

    <!-- Instructions -->
    <div class="mt-8">
      <h2>{m.experimental_instructions_title()}</h2>
      <div class="bg-info/10 border-info/20 mt-4 rounded-lg border p-4">
        <ol class="list-inside list-decimal space-y-2 text-sm">
          <li>{m.experimental_instructions_step1()}</li>
          <li>{m.experimental_instructions_step2()}</li>
          <li>{m.experimental_instructions_step3()}</li>
          <li>{m.experimental_instructions_step4()}</li>
        </ol>
      </div>
    </div>

    <!-- Sample Data JSON -->
    <div class="mt-8">
      <h2>{m.experimental_sample_data()}</h2>
      <div class="collapse-arrow bg-base-200 collapse mt-4">
        <input type="checkbox" />
        <div class="collapse-title text-lg font-medium">{m.experimental_show_config()}</div>
        <div class="collapse-content">
          <pre class="bg-base-100 overflow-x-auto rounded p-4 text-xs"><code
              >{JSON.stringify(
                {
                  config: sampleConfig,
                  customerData: sampleCustomerData,
                  uploadedFiles: sampleUploadedFiles,
                  customFeatures: sampleCustomFeatures
                },
                null,
                2
              )}</code
            ></pre>
        </div>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../../app.css';
</style>
