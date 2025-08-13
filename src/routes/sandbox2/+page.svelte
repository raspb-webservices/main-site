<script lang="ts">
  import Section from '$lib/components/section.svelte';

  // Sample-Konfiguration für PDF-Test
  const sampleConfig = {
    name: 'Moderne Unternehmenswebsite für TechStart GmbH',
    projectType: 'website',
    subType: 'corporateWebsite',
    description:
      'Eine professionelle Unternehmenswebsite mit modernem Design, die das innovative Image von TechStart GmbH widerspiegelt und potenzielle Kunden überzeugt.',
    targetAudience: 'B2B-Kunden, Technologie-Entscheider, potenzielle Investoren und Fachkräfte',
    goals: 'Steigerung der Online-Präsenz, Lead-Generierung, Vertrauensaufbau und Positionierung als Technologieführer',
    desiredDomain: 'techstart-solutions.de',
    domainStatus: 'Noch nicht registriert',
    timeline: '6-8 Wochen',
    budget: '5000-8000€',
    estimatedPrice: 6500,
    features: ['kontaktformular', 'seo', 'bildergalerie', 'analyticsIntegration', 'newsletterRegistrierung', 'suchfunktion'],
    pages: [
      {
        name: 'Startseite',
        content: 'Hero-Bereich mit Unternehmensvision, Service-Übersicht, Testimonials und Call-to-Action',
        characteristic: 'Animierte Elemente und interaktive Komponenten'
      },
      {
        name: 'Über uns',
        content: 'Unternehmensgeschichte, Team-Vorstellung, Werte und Mission',
        characteristic: 'Team-Galerie mit Hover-Effekten'
      },
      {
        name: 'Services',
        content: 'Detaillierte Beschreibung aller Dienstleistungen mit Preisübersicht',
        characteristic: 'Interaktive Service-Karten'
      },
      {
        name: 'Portfolio',
        content: 'Showcase erfolgreicher Projekte mit Case Studies',
        characteristic: 'Filterfunktion nach Kategorien'
      },
      {
        name: 'Blog',
        content: 'Fachbeiträge, News und Insights aus der Tech-Branche',
        characteristic: 'CMS-Integration für einfache Verwaltung'
      },
      {
        name: 'Kontakt',
        content: 'Kontaktformular, Standort-Karte und Anfahrtsbeschreibung',
        characteristic: 'Interaktive Karte mit Mapbox'
      }
    ],
    formFields: [
      { name: 'Vorname', type: 'text', required: true },
      { name: 'Nachname', type: 'text', required: true },
      { name: 'E-Mail', type: 'email', required: true },
      { name: 'Unternehmen', type: 'text', required: false },
      { name: 'Telefon', type: 'tel', required: false },
      { name: 'Betreff', type: 'select', required: true },
      { name: 'Nachricht', type: 'textarea', required: true },
      { name: 'Newsletter', type: 'checkbox', required: false }
    ],
    primaryColour: '#2563eb',
    secondaryColour: '#64748b',
    accentColour: '#f59e0b',
    desiredFont: 'Inter',
    customFont: 'Inter, system-ui, sans-serif'
  };

  const sampleCustomerData = {
    salutation: 'Herr',
    givenName: 'Markus',
    familyName: 'Schmidt',
    email: 'markus.schmidt@techstart.de',
    phone: '+49 30 12345678',
    company: 'TechStart GmbH',
    address: 'Technologiepark 15',
    postCode: '10115',
    city: 'Berlin',
    country: 'Deutschland'
  };

  const sampleUploadedFiles = [
    { name: 'Logo_TechStart.svg', size: 45678 },
    { name: 'Corporate_Design_Guide.pdf', size: 2345678 },
    { name: 'Produktbilder.zip', size: 15678901 },
    { name: 'Testimonial_Videos.mp4', size: 89012345 }
  ];

  const sampleCustomFeatures =
    'Mehrsprachigkeit (DE/EN), Live-Chat Integration, Kundenportal mit Login-Bereich, Newsletter-System mit Automation, Social Media Integration';

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
      <button class="btn btn-primary btn-lg" onclick={generateTestPDF} disabled={isGenerating}>
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
