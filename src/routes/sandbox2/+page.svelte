<script lang="ts">
  import Section from '$lib/components/section.svelte';

  // Sample-Konfiguration für PDF-Test - E-Commerce Plattform
  const sampleConfig = {
    name: 'Premium E-Commerce Plattform für GreenLife Naturkosmetik',
    projectType: 'webApplication',
    subType: 'eCommerce',
    description:
      'Eine hochmoderne E-Commerce Plattform für nachhaltige Naturkosmetik mit integriertem CMS, Kundenverwaltung, Zahlungsabwicklung und umfassenden Marketing-Tools. Die Plattform soll das Wachstum von GreenLife unterstützen und eine nahtlose Shopping-Experience bieten.',
    projectDetails: 'Vollständige E-Commerce Lösung mit Produktkatalog, Warenkorb, Checkout-Prozess, Kundenkonto-Verwaltung, Bestellverfolgung, Inventory Management und Admin-Dashboard',
    targetAudience: 'Umweltbewusste Verbraucher, Naturkosmetik-Enthusiasten, Wellness-Interessierte, Frauen und Männer zwischen 25-55 Jahren mit mittlerem bis höherem Einkommen',
    goals: 'Online-Umsatz steigern, Markenbekanntheit erhöhen, Kundenbindung stärken, nachhaltiges Image kommunizieren, internationale Expansion vorbereiten',
    inspiration: 'Minimalistisches, natürliches Design inspiriert von skandinavischen E-Commerce Seiten wie Goop, The Ordinary und lokalen Naturkosmetik-Brands',
    desiredDomain: 'greenlife-naturkosmetik.com',
    domainStatus: 'Bereits registriert, Transfer erforderlich',
    projectStatus: 'created',
    timeline: '12-16 Wochen',
    budget: '15000-25000€',
    estimatedPrice: 18500,
    features: [
      'eCommerce',
      'zahlungsbawicklung',
      'benutzerkonten',
      'suchfunktion',
      'bildergalerie',
      'portfolioGrid',
      'kontaktformular',
      'newsletterRegistrierung',
      'mehrsprachigkeit',
      'analyticsIntegration',
      'seo',
      'bewertungsmechanismus',
      'kalender',
      'downloadbereich',
      'cookieConsent',
      'barrierefreiheitTools',
      'marketingTools',
      'customFilter',
      'akkordeon',
      'tabs'
    ],
    customFeature: 'Nachhaltigkeits-Tracker für CO2-Fußabdruck, Ingredient-Scanner mit KI-basierter Hauttyp-Analyse, Subscription-Box Service, Loyalty-Programm mit Punktesystem, AR-basierte Produktvisualisierung',
    pages: [
      {
        name: 'Startseite',
        content: 'Hero-Slider mit saisonalen Produkten, Featured Categories, Bestseller-Sektion, Nachhaltigkeits-Mission, Kundenbewertungen und Newsletter-Anmeldung',
        characteristic: 'Parallax-Scrolling, animierte Produktkarten, Video-Hintergründe'
      },
      {
        name: 'Shop',
        content: 'Produktkatalog mit erweiterten Filtermöglichkeiten, Kategorien, Suchfunktion, Sortieroptionen und Produktvergleich',
        characteristic: 'Ajax-basierte Filter, Infinite Scroll, Quick-View Modals'
      },
      {
        name: 'Produktdetails',
        content: 'Hochauflösende Produktbilder, 360°-Ansicht, Inhaltsstoffe, Anwendungshinweise, Kundenbewertungen, verwandte Produkte',
        characteristic: 'Zoom-Funktion, Bildergalerie, Bewertungs-Widget, Wishlist-Integration'
      },
      {
        name: 'Warenkorb & Checkout',
        content: 'Übersichtlicher Warenkorb, Gutschein-Codes, Versandoptionen, sichere Zahlungsabwicklung, Gastbestellung',
        characteristic: 'Multi-Step Checkout, Progress-Indicator, Auto-Save Funktionalität'
      },
      {
        name: 'Mein Konto',
        content: 'Bestellhistorie, Adressverwaltung, Wishlist, Abonnements, Treuepunkte, persönliche Empfehlungen',
        characteristic: 'Dashboard-Layout, Bestellverfolgung, Download-Bereich für Rechnungen'
      },
      {
        name: 'Über uns',
        content: 'Unternehmensgeschichte, Nachhaltigkeits-Mission, Team-Vorstellung, Zertifizierungen, Auszeichnungen',
        characteristic: 'Timeline-Design, Zertifikats-Galerie, Team-Slider'
      },
      {
        name: 'Nachhaltigkeit',
        content: 'CO2-neutrale Produktion, Verpackungskonzept, Lieferkette, Umwelt-Initiativen, Impact-Berichte',
        characteristic: 'Interaktive Infografiken, Progress-Bars, Impact-Counter'
      },
      {
        name: 'Beauty Guide',
        content: 'Hauttyp-Test, Produktempfehlungen, Anwendungstipps, Video-Tutorials, Ingredient-Lexikon',
        characteristic: 'Quiz-Funktionalität, Video-Player, Accordion-Layout'
      },
      {
        name: 'Blog',
        content: 'Beauty-Tipps, Nachhaltigkeits-Artikel, Produktneuheiten, Experteninterviews, Kundenstories',
        characteristic: 'CMS-Integration, Kategorien-Filter, Social Sharing, Kommentarfunktion'
      },
      {
        name: 'Kontakt & Support',
        content: 'Kontaktformular, Live-Chat, FAQ, Rückgabe-Portal, Standort-Informationen, Support-Tickets',
        characteristic: 'Chatbot-Integration, FAQ-Suche, Ticket-System'
      }
    ],
    formFields: [
      { name: 'Anrede', type: 'select', required: true },
      { name: 'Vorname', type: 'text', required: true },
      { name: 'Nachname', type: 'text', required: true },
      { name: 'E-Mail', type: 'email', required: true },
      { name: 'Telefon', type: 'tel', required: false },
      { name: 'Geburtsdatum', type: 'date', required: false },
      { name: 'Hauttyp', type: 'select', required: false },
      { name: 'Produktinteresse', type: 'checkbox', required: false },
      { name: 'Newsletter', type: 'checkbox', required: false },
      { name: 'Datenschutz', type: 'checkbox', required: true },
      { name: 'Nachricht', type: 'textarea', required: false }
    ],
    primaryColour: '#2d5a27',
    secondaryColour: '#8fbc8f',
    accentColour: '#f4a261',
    desiredFont: 'Poppins',
    customFont: 'Poppins, system-ui, sans-serif',
    relatedFiles: [
      { fileName: 'Brand_Guidelines_GreenLife.pdf', url: '/uploads/brand-guidelines.pdf' },
      { fileName: 'Product_Catalog_2024.xlsx', url: '/uploads/product-catalog.xlsx' },
      { fileName: 'Logo_Variations.zip', url: '/uploads/logo-pack.zip' }
    ]
  };

  const sampleCustomerData = {
    salutation: 'Frau',
    givenName: 'Sarah',
    familyName: 'Müller',
    email: 'sarah.mueller@greenlife-kosmetik.de',
    phone: '+49 89 98765432',
    company: 'GreenLife Naturkosmetik GmbH',
    address: 'Biopark Straße 42',
    postCode: '80339',
    city: 'München',
    country: 'Deutschland'
  };

  const sampleUploadedFiles = [
    { name: 'GreenLife_Logo_Primary.svg', size: 67890, type: 'image/svg+xml' },
    { name: 'Brand_Guidelines_2024.pdf', size: 4567890, type: 'application/pdf' },
    { name: 'Product_Images_Collection.zip', size: 45678901, type: 'application/zip' },
    { name: 'Sustainability_Report.pdf', size: 3456789, type: 'application/pdf' },
    { name: 'Customer_Testimonials.mp4', size: 123456789, type: 'video/mp4' },
    { name: 'Ingredient_Database.xlsx', size: 2345678, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { name: 'Packaging_Mockups.psd', size: 78901234, type: 'image/vnd.adobe.photoshop' },
    { name: 'Website_Inspiration.pdf', size: 5678901, type: 'application/pdf' }
  ];

  const sampleCustomFeatures =
    'KI-basierte Hautanalyse mit Kamera-Integration, AR-Produktvisualisierung für virtuelle Anprobe, Subscription-Box Service mit personalisierten Produktempfehlungen, Loyalty-Programm mit Punktesystem und Belohnungen, CO2-Fußabdruck-Tracker für jede Bestellung, Multi-Vendor Marketplace für Partner-Brands, Live-Shopping Events mit Video-Streaming, Chatbot mit NLP für Produktberatung, Progressive Web App (PWA) für Mobile-First Experience, Headless CMS für Content-Management, API-Integration zu ERP-System und Warenwirtschaft';

  let isGenerating = $state(false);
  let error = $state('');

  async function generateTestPDF() {
    isGenerating = true;
    error = '';

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          config: sampleConfig,
          customerData: sampleCustomerData,
          uploadedFiles: sampleUploadedFiles,
          customFeatures: sampleCustomFeatures,
          filename: `RASPB_Projekt_${sampleConfig.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
        })
      });

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
        console.log("errorData ", errorData);
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
  <title>PDF Generator Test - Sandbox</title>
  <meta name="description" content="Test-Seite für den PDF-Generator" />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>PDF Generator Test</h1>
    <p class="teaser">Hier können Sie den PDF-Generator mit einer Sample-Konfiguration testen.</p>

    <!-- Sample Config Display -->
    <div class="mt-8">
      <h2>Sample-Konfiguration</h2>
      <div class="bg-base-200 mt-4 rounded-lg p-6">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 text-lg font-bold">Projekt-Details</h3>
            <ul class="space-y-1 text-sm">
              <li><strong>Name:</strong> {sampleConfig.name}</li>
              <li><strong>Typ:</strong> {sampleConfig.projectType} - {sampleConfig.subType}</li>
              <li><strong>Budget:</strong> {sampleConfig.budget}</li>
              <li><strong>Geschätzter Preis:</strong> {sampleConfig.estimatedPrice}€</li>
              <li><strong>Timeline:</strong> {sampleConfig.timeline}</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Features</h3>
            <div class="flex flex-wrap gap-1">
              {#each sampleConfig.features as feature}
                <span class="badge badge-primary badge-sm">{feature}</span>
              {/each}
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="mb-2 text-lg font-bold">Seiten ({sampleConfig.pages.length})</h3>
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
          <h3 class="mb-2 text-lg font-bold">Kunde</h3>
          <p class="text-sm">
            {sampleCustomerData.givenName}
            {sampleCustomerData.familyName}
            ({sampleCustomerData.company}) - {sampleCustomerData.email}
          </p>
        </div>

        <div class="mt-4">
          <h3 class="mb-2 text-lg font-bold">Dateien ({sampleUploadedFiles.length})</h3>
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
          PDF wird generiert...
        {:else}
          Test-PDF generieren
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
      <h2>Anleitung</h2>
      <div class="bg-info/10 border-info/20 mt-4 rounded-lg border p-4">
        <ol class="list-inside list-decimal space-y-2 text-sm">
          <li>Klicken Sie auf "Test-PDF generieren" um den PDF-Generator zu testen</li>
          <li>Das PDF wird automatisch heruntergeladen, wenn die Generierung erfolgreich war</li>
          <li>Überprüfen Sie das generierte PDF auf korrekte Darstellung aller Daten</li>
          <li>Bei Fehlern werden diese hier angezeigt</li>
        </ol>
      </div>
    </div>

    <!-- Sample Data JSON -->
    <div class="mt-8">
      <h2>Sample-Daten (JSON)</h2>
      <div class="collapse-arrow bg-base-200 collapse mt-4">
        <input type="checkbox" />
        <div class="collapse-title text-lg font-medium">Vollständige Konfiguration anzeigen</div>
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
  @reference '../../app.css';
</style>
