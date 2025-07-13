<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import { goto } from '$app/navigation';

  // Modal control functions
  function openModal(modalId: string) {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  function closeModal(modalId: string) {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }
</script>

<svelte:head>
  <title>Services - raspb Webservices</title>
  <meta
    name="description"
    content="Entdecken Sie unser umfassendes Service-Portfolio: Webseiten, CMS-Lösungen, Applikationen, Individualentwicklung und KI-Services für Ihr digitales Projekt."
  />
</svelte:head>

<div class="services-content-wrapper">
  <!-- Hero/Teaser Section -->
  <Section type={'centerTeaser'}>
    <div class="animate-fade-in-up flex w-full flex-col items-center justify-center text-center">
      <h1 class="massive">Unsere <span class="inner-text-special">Services</span></h1>
      <h3>Maßgeschneiderte digitale Lösungen für jeden Bedarf - von der einfachen Website bis zur komplexen KI-Integration</h3>
      <button
        class="btn-basic"
        onclick={() => {
          goto('/get-started');
        }}>Projekt konfigurieren</button
      >
    </div>

    <div class="massive-spacer"></div>
    <div class="massive-spacer"></div>

    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
      <div class="animate-fade-in-from-side mr-8">
        <h2>Von der Idee zur <span class="inner-text-special">digitalen Realität</span></h2>
        <p>
          Unser umfassendes Service-Portfolio deckt alle Aspekte der digitalen Transformation ab. Ob Sie eine einfache Präsenz im Web benötigen oder komplexe,
          KI-gestützte Anwendungen entwickeln möchten - wir haben die passende Lösung.
        </p>
        <p>
          Jeder Service wird nach der bewährten raspb-Philosophie umgesetzt: schnell, kostengünstig und in höchster Qualität. Dabei behalten Sie stets die volle
          Kontrolle über Ihr digitales Eigentum.
        </p>
        <div class="benefits">
          <div class="item">Transparente Festpreise</div>
          <div class="item">Keine Folgekosten</div>
          <div class="item">Vollständige Code-Übergabe</div>
          <div class="item">Moderne Technologien</div>
          <div class="item">Persönlicher Ansprechpartner</div>
          <div class="item">Agile Entwicklung</div>
        </div>
      </div>
      <div>
        <div class="image-container">
          <div class="services-image"></div>
        </div>
      </div>
    </div>
    <div class="massive-spacer"></div>
  </Section>

  <!-- Services Overview with Visual Highlight -->
  <Section>
    <div class="service-overview-highlight">
      <div class="highlight-content">
        <h2 class="text-center mb-8">Unsere <span class="inner-text-special">Service-Kategorien</span></h2>
        <div class="service-categories-grid">
          <div class="category-card">
            <div class="category-icon">🌐</div>
            <h3>Webseiten</h3>
            <p>Von One-Pagern bis Corporate Sites</p>
          </div>
          <div class="category-card">
            <div class="category-icon">📝</div>
            <h3>Content Management</h3>
            <p>Einfache bis komplexe CMS-Lösungen</p>
          </div>
          <div class="category-card">
            <div class="category-icon">📱</div>
            <h3>Applikationen</h3>
            <p>Web Apps, PWAs und Mobile Apps</p>
          </div>
          <div class="category-card">
            <div class="category-icon">⚙️</div>
            <h3>Individualentwicklung</h3>
            <p>Maßgeschneiderte Lösungen</p>
          </div>
          <div class="category-card">
            <div class="category-icon">🤖</div>
            <h3>KI-Services</h3>
            <p>Beratung, Agenten & Automation</p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- Webseiten Section -->
  <Section>
    <div class="service-section">
      <div class="service-header">
        <h1>Webseiten <span class="inner-text-special">für jeden Anspruch</span></h1>
        <p class="teaser">
          Von eleganten One-Pagern bis hin zu umfassenden Corporate Websites - wir entwickeln Webseiten, die Ihre Zielgruppe begeistern und Ihre Geschäftsziele
          unterstützen.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <!-- One-Page Websites -->
        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>One-Page Websites</h3>
              <div class="service-icon">🎯</div>
            </div>
            <p>Kompakte, fokussierte Präsentation auf einer scrollbaren Seite. Perfekt für Startups und klare Botschaften.</p>
            <div class="service-highlights">
              <span class="highlight">Conversion-optimiert</span>
              <span class="highlight">Schnelle Ladezeiten</span>
              <span class="highlight">Mobile-first</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-onepage')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Landing Pages -->
        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Landing Pages</h3>
              <div class="service-icon">🚀</div>
            </div>
            <p>Zielgerichtete Kampagnenseiten für Marketing-Aktionen, Produktlaunches oder Events mit maximaler Conversion.</p>
            <div class="service-highlights">
              <span class="highlight">A/B-Testing</span>
              <span class="highlight">Analytics</span>
              <span class="highlight">Schnelle Umsetzung</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-landing')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Corporate Websites -->
        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Corporate Websites</h3>
              <div class="service-icon">🏢</div>
            </div>
            <p>Professionelle Unternehmensauftritte mit mehreren Seiten, umfassenden Inhalten und erweiterten Funktionen.</p>
            <div class="service-highlights">
              <span class="highlight">SEO-optimiert</span>
              <span class="highlight">Mehrseitig</span>
              <span class="highlight">Professionell</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-corporate')}>
              Mehr Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- CMS Section -->
  <Section>
    <div class="service-section">
      <div class="service-header">
        <h1>Content Management <span class="inner-text-special">nach Maß</span></h1>
        <p class="teaser">
          Behalten Sie die Kontrolle über Ihre Inhalte mit maßgeschneiderten CMS-Lösungen - von einfacher Seitenbearbeitung bis hin zu komplexen
          Content-Strukturen.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Einfache Inhaltsbearbeitung -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Einfache Inhaltsbearbeitung</h3>
              <div class="service-icon">✏️</div>
            </div>
            <p>Machen Sie bestehende Seiten editierbar oder ermöglichen Sie die einfache Bearbeitung einzelner Inhalte.</p>
            <div class="service-highlights">
              <span class="highlight">Inline-Editing</span>
              <span class="highlight">Benutzerfreundlich</span>
              <span class="highlight">Sofortige Vorschau</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-simple-cms')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Komplexe CMS-Systeme -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Komplexe CMS-Systeme</h3>
              <div class="service-icon">🏗️</div>
            </div>
            <p>Individuelle Content-Management-Systeme mit vielschichtigen Informationsobjekten und erweiterten Funktionen.</p>
            <div class="service-highlights">
              <span class="highlight">Custom Content-Typen</span>
              <span class="highlight">Workflow-Management</span>
              <span class="highlight">Mehrsprachigkeit</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-complex-cms')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Blog & Content-getriebene Websites -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Blog & Content-Plattformen</h3>
              <div class="service-icon">📝</div>
            </div>
            <p>Spezialisierte Lösungen für Blogs, Magazine und content-getriebene Websites.</p>
            <div class="service-highlights">
              <span class="highlight">SEO-Tools</span>
              <span class="highlight">Social Media</span>
              <span class="highlight">Newsletter</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-blog-cms')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Headless CMS -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Headless CMS</h3>
              <div class="service-icon">🔗</div>
            </div>
            <p>Flexible Content-Verwaltung mit API-basierter Auslieferung für multiple Kanäle.</p>
            <div class="service-highlights">
              <span class="highlight">API-first</span>
              <span class="highlight">Multi-Channel</span>
              <span class="highlight">Zukunftssicher</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-headless-cms')}>
              Mehr Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- Applikationen Section -->
  <Section>
    <div class="service-section">
      <div class="service-header">
        <h1>Applikationen <span class="inner-text-special">für Web & Mobile</span></h1>
        <p class="teaser">
          Von einfachen Browser-Anwendungen bis hin zu nativen Mobile Apps - wir setzen auf Progressive Web App Technologie für maximale Reichweite und
          Performance.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Web Applications -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Web Applications</h3>
              <div class="service-icon">💻</div>
            </div>
            <p>Browser-basierte Anwendungen für spezifische Aufgaben und Workflows.</p>
            <div class="service-highlights">
              <span class="highlight">Plattformunabhängig</span>
              <span class="highlight">Keine Installation</span>
              <span class="highlight">Auto-Updates</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-web-apps')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Progressive Web Apps -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Progressive Web Apps (PWA)</h3>
              <div class="service-icon">📱</div>
            </div>
            <p>Das Beste aus Web und App - installierbar, offline-fähig und mit nativen Features.</p>
            <div class="service-highlights">
              <span class="highlight">Installierbar</span>
              <span class="highlight">Offline-fähig</span>
              <span class="highlight">Push-Notifications</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-pwa')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Native Mobile Apps -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Native Mobile Apps</h3>
              <div class="service-icon">📲</div>
            </div>
            <p>Vollwertige Apps für iOS und Android App Stores mit nativer Performance.</p>
            <div class="service-highlights">
              <span class="highlight">App Store</span>
              <span class="highlight">Native Performance</span>
              <span class="highlight">Hardware-Zugriff</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-native-apps')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Komplexe Anwendungen -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Komplexe Anwendungen</h3>
              <div class="service-icon">⚙️</div>
            </div>
            <p>Umfangreiche Anwendungen mit erweiterten Funktionen und Integrationen.</p>
            <div class="service-highlights">
              <span class="highlight">Datenbank-Integration</span>
              <span class="highlight">Real-time Features</span>
              <span class="highlight">Skalierbar</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-complex-apps')}>
              Mehr Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- Individualentwicklung Section -->
  <Section>
    <div class="service-section">
      <div class="service-header">
        <h1>Individual<span class="inner-text-special">entwicklung</span></h1>
        <p class="teaser">
          Haben Sie spezielle Anforderungen, die nicht in die Standard-Kategorien passen? Wir entwickeln maßgeschneiderte Lösungen für jeden Use-Case.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Einzelne Komponenten</h3>
              <div class="service-icon">🧩</div>
            </div>
            <p>UI-Komponenten, Widgets, spezielle Formulare und Custom Plugins.</p>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-components')}>
              Mehr Details
            </button>
          </div>
        </div>

        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>System-Erweiterungen</h3>
              <div class="service-icon">🔧</div>
            </div>
            <p>Erweiterung bestehender Websites, API-Integrationen und Performance-Optimierungen.</p>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-extensions')}>
              Mehr Details
            </button>
          </div>
        </div>

        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Spezial-Anwendungen</h3>
              <div class="service-icon">📊</div>
            </div>
            <p>Event-Registrierung, Daten-Dashboards, Reporting-Tools und Automatisierungs-Scripts.</p>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-special-apps')}>
              Mehr Details
            </button>
          </div>
        </div>

        <div class="service-card">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>UI/UX Design</h3>
              <div class="service-icon">🎨</div>
            </div>
            <p>Interface-Design, User Experience Optimierung, Prototyping und Design-Systeme.</p>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-design')}>
              Mehr Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- KI Services Section -->
  <Section>
    <div class="service-section">
      <div class="service-header">
        <h1>KI-Services <span class="inner-text-special">& Automation</span></h1>
        <p class="teaser">
          Nutzen Sie die Kraft der Künstlichen Intelligenz für Ihr Unternehmen. Von der Beratung bis zur fertigen KI-Lösung.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- KI Beratung & Support -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>KI-Beratung & Support</h3>
              <div class="service-icon">🧠</div>
            </div>
            <p>Umfassende Beratung und Unterstützung bei der Integration von KI in Ihre Geschäftsprozesse.</p>
            <div class="service-highlights">
              <span class="highlight">Strategieentwicklung</span>
              <span class="highlight">Prompt Engineering</span>
              <span class="highlight">ROI-Analyse</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-ki-beratung')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- KI-Agenten Entwicklung -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>KI-Agenten Entwicklung</h3>
              <div class="service-icon">🤖</div>
            </div>
            <p>Maßgeschneiderte KI-Agenten für spezifische Aufgaben und Anwendungsfälle.</p>
            <div class="service-highlights">
              <span class="highlight">Custom Chatbots</span>
              <span class="highlight">Content-Generierung</span>
              <span class="highlight">System-Integration</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-ki-agenten')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- Workflow-Optimierung -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>Workflow-Optimierung</h3>
              <div class="service-icon">⚡</div>
            </div>
            <p>Digitale Prozesse und Abläufe mit KI vereinfachen, verkürzen und vergünstigen.</p>
            <div class="service-highlights">
              <span class="highlight">Prozessanalyse</span>
              <span class="highlight">Automatisierung</span>
              <span class="highlight">Predictive Analytics</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-workflow')}>
              Mehr Details
            </button>
          </div>
        </div>

        <!-- AI as Infrastructure -->
        <div class="service-card large">
          <div class="service-card-content">
            <div class="service-card-header">
              <h3>AI as Infrastructure</h3>
              <div class="service-icon">🏗️</div>
            </div>
            <p>KI-Infrastruktur als Service - mieten statt kaufen für maximale Flexibilität.</p>
            <div class="service-highlights">
              <span class="highlight">Skalierbar</span>
              <span class="highlight">Pay-per-Use</span>
              <span class="highlight">24/7 Support</span>
            </div>
            <button class="btn btn-outline btn-sm mt-4" onclick={() => openModal('modal-ai-infrastructure')}>
              Mehr Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- Call to Action Section -->
  <Section>
    <div class="cta-section">
      <div class="cta-content">
        <h1>Bereit für Ihr <span class="inner-text-special">digitales Projekt</span>?</h1>
        <p class="cta-text">
          Sie haben die perfekte Lösung für Ihr Vorhaben gefunden? Unser intelligenter Konfigurator hilft Ihnen dabei, Ihr Projekt zu spezifizieren und erhalten
          Sie sofort einen transparenten Festpreis.
        </p>

        <div class="cta-benefits">
          <div class="cta-benefit">
            <div class="benefit-icon">⚡</div>
            <div>
              <h4>Sofortiger Preis</h4>
              <p>Erhalten Sie binnen Minuten einen verbindlichen Festpreis</p>
            </div>
          </div>
          <div class="cta-benefit">
            <div class="benefit-icon">🎯</div>
            <div>
              <h4>Maßgeschneidert</h4>
              <p>Jede Lösung wird individuell auf Ihre Bedürfnisse zugeschnitten</p>
            </div>
          </div>
          <div class="cta-benefit">
            <div class="benefit-icon">🤝</div>
            <div>
              <h4>Persönlicher Kontakt</h4>
              <p>Ein fester Ansprechpartner begleitet Sie durch das gesamte Projekt</p>
            </div>
          </div>
        </div>

        <div class="cta-buttons">
          <button
            class="btn btn-primary btn-lg px-8 py-4 text-lg"
            onclick={() => {
              goto('/get-started');
            }}
          >
            Projekt jetzt konfigurieren
          </button>
          <button class="btn btn-outline btn-lg px-8 py-4" onclick={() => goto('/faq')}> Häufige Fragen </button>
        </div>

        <p class="cta-note">
          💡 <strong>Tipp:</strong> Der Konfigurator dauert nur 3-5 Minuten und Sie erhalten sofort Ihren persönlichen Projektpreis. Unverbindlich und kostenlos.
        </p>
      </div>
    </div>
  </Section>
</div>

<!-- DaisyUI Modals for detailed information -->

<!-- One-Page Websites Modal -->
<dialog id="modal-onepage" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">One-Page Websites</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Startups, kleine Unternehmen, Produktpräsentationen, Portfolios</p>
      
      <div>
        <h4 class="font-semibold mb-2">Leistungen im Detail:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Responsive Design für alle Geräte</li>
          <li>Optimierte Ladezeiten unter 3 Sekunden</li>
          <li>SEO-Grundoptimierung</li>
          <li>Kontaktformular mit Spam-Schutz</li>
          <li>Google Analytics Integration</li>
          <li>SSL-Zertifikat inklusive</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Technische Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Moderne CSS-Animationen</li>
          <li>Smooth Scrolling Navigation</li>
          <li>Lazy Loading für Bilder</li>
          <li>Progressive Web App Features</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 1-2 Wochen</p>
        <p class="text-sm"><strong>Wartung:</strong> Optional verfügbar</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Landing Pages Modal -->
<dialog id="modal-landing" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Landing Pages</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Marketing-Kampagnen, Produktlaunches, Events, Lead-Generierung</p>
      
      <div>
        <h4 class="font-semibold mb-2">Conversion-Optimierung:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>A/B-Testing Setup für Headlines und CTAs</li>
          <li>Heatmap-Integration (Hotjar/Crazy Egg)</li>
          <li>Conversion-Tracking mit Google Analytics</li>
          <li>Optimierte Formulare mit minimalen Feldern</li>
          <li>Social Proof Integration</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Marketing-Integration:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Facebook Pixel Integration</li>
          <li>Google Ads Conversion-Tracking</li>
          <li>E-Mail-Marketing-Tool Anbindung</li>
          <li>CRM-Integration (HubSpot, Salesforce)</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 3-5 Tage</p>
        <p class="text-sm"><strong>Performance:</strong> Optimiert für maximale Conversion-Rate</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Corporate Websites Modal -->
<dialog id="modal-corporate" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Corporate Websites</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Mittelständische Unternehmen, Agenturen, Beratungen, B2B-Firmen</p>
      
      <div>
        <h4 class="font-semibold mb-2">Umfangreiche Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Mehrseitige Struktur (5-20 Seiten)</li>
          <li>Erweiterte SEO-Optimierung</li>
          <li>Professionelles Corporate Design</li>
          <li>Kontaktformulare und Interaktionen</li>
          <li>Team- und Über-uns-Seiten</li>
          <li>Service-/Produktpräsentationen</li>
          <li>News/Blog-Integration</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Erweiterte Funktionen:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Mehrsprachigkeit (DACH-Region)</li>
          <li>Erweiterte Analytics und Tracking</li>
          <li>Newsletter-Integration</li>
          <li>Social Media Anbindung</li>
          <li>Downloadbereich für Dokumente</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 3-6 Wochen</p>
        <p class="text-sm"><strong>Wartung:</strong> Empfohlen für optimale Performance</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Simple CMS Modal -->
<dialog id="modal-simple-cms" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Einfache Inhaltsbearbeitung</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Kleine Unternehmen, Vereine, Praxen, Restaurants</p>
      
      <div>
        <h4 class="font-semibold mb-2">Benutzerfreundliche Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Inline-Editing direkt auf der Website</li>
          <li>WYSIWYG-Editor für Texte</li>
          <li>Einfacher Bildupload und -verwaltung</li>
          <li>Sofortige Vorschau der Änderungen</li>
          <li>Automatische Backups</li>
          <li>Versionskontrolle</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Technische Details:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Keine technischen Kenntnisse erforderlich</li>
          <li>Sichere Benutzeranmeldung</li>
          <li>Mobile Bearbeitung möglich</li>
          <li>Automatische SEO-Optimierung</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Setup-Zeit:</strong> 1-2 Tage</p>
        <p class="text-sm"><strong>Schulung:</strong> 30 Minuten Online-Training inklusive</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Complex CMS Modal -->
<dialog id="modal-complex-cms" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Komplexe CMS-Systeme</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Große Unternehmen, Verlage, E-Commerce, Portale</p>
      
      <div>
        <h4 class="font-semibold mb-2">Enterprise Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Benutzerdefinierte Content-Typen</li>
          <li>Workflow-Management mit Freigabeprozessen</li>
          <li>Mehrsprachigkeit und Lokalisierung</li>
          <li>Benutzerrollen und Rechteverwaltung</li>
          <li>API-Integration für Drittsysteme</li>
          <li>Erweiterte Suchfunktionen</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Skalierbarkeit:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Hochperformante Datenbank-Architektur</li>
          <li>CDN-Integration für globale Verfügbarkeit</li>
          <li>Automatische Skalierung</li>
          <li>Umfangreiche Analytics und Reporting</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 6-12 Wochen</p>
        <p class="text-sm"><strong>Support:</strong> Dedicated Support-Team verfügbar</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Blog CMS Modal -->
<dialog id="modal-blog-cms" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Blog & Content-Plattformen</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Blogger, Journalisten, Content Creator, Magazine</p>
      
      <div>
        <h4 class="font-semibold mb-2">Content-optimierte Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Optimiert für Content-Erstellung</li>
          <li>SEO-Tools und Meta-Tag-Management</li>
          <li>Social Media Integration und Auto-Posting</li>
          <li>Kommentar-System mit Moderation</li>
          <li>Newsletter-Integration (Mailchimp, ConvertKit)</li>
          <li>Kategorien und Tag-System</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Monetarisierung:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Werbeplatz-Management</li>
          <li>Affiliate-Link-Integration</li>
          <li>Premium-Content-Bereiche</li>
          <li>E-Mail-Marketing-Tools</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 2-4 Wochen</p>
        <p class="text-sm"><strong>Content-Migration:</strong> Bestehende Inhalte übernehmen wir gerne</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Headless CMS Modal -->
<dialog id="modal-headless-cms" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Headless CMS</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Multi-Channel-Publishing, Apps + Web, Enterprise-Lösungen</p>
      
      <div>
        <h4 class="font-semibold mb-2">API-First Ansatz:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Content einmal erstellen, überall nutzen</li>
          <li>RESTful und GraphQL APIs</li>
          <li>Flexibilität bei der Darstellung</li>
          <li>Zukunftssicher und skalierbar</li>
          <li>Integration in bestehende Systeme</li>
          <li>Entwicklerfreundliche Dokumentation</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Use Cases:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Website + Mobile App mit gleichen Inhalten</li>
          <li>Mehrere Websites aus einer Quelle</li>
          <li>IoT-Geräte und Digital Signage</li>
          <li>E-Commerce mit verschiedenen Frontends</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 4-8 Wochen</p>
        <p class="text-sm"><strong>Technologie:</strong> Hygraph, Strapi oder Custom Solution</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Web Apps Modal -->
<dialog id="modal-web-apps" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Web Applications</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Dashboards, Tools, Kalkulatoren, Verwaltungssysteme</p>
      
      <div>
        <h4 class="font-semibold mb-2">Technische Vorteile:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Plattformunabhängig (Windows, Mac, Linux)</li>
          <li>Keine Installation erforderlich</li>
          <li>Automatische Updates</li>
          <li>Responsive Design für alle Bildschirmgrößen</li>
          <li>Offline-Funktionalität möglich</li>
          <li>Sichere Datenübertragung</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Beispiel-Anwendungen:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Business Dashboards mit Real-time Daten</li>
          <li>Projektmanagement-Tools</li>
          <li>Finanz-Kalkulatoren</li>
          <li>Inventar-Verwaltungssysteme</li>
          <li>Zeiterfassungs-Tools</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 2-8 Wochen je nach Komplexität</p>
        <p class="text-sm"><strong>Technologie:</strong> SvelteKit, React oder Vue.js</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- PWA Modal -->
<dialog id="modal-pwa" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Progressive Web Apps (PWA)</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> App-ähnliche Erfahrungen ohne App Store</p>
      
      <div>
        <h4 class="font-semibold mb-2">App-ähnliche Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Installierbar auf allen Geräten</li>
          <li>Funktioniert offline</li>
          <li>Push-Benachrichtigungen</li>
          <li>Zugriff auf Gerätehardware (Kamera, GPS)</li>
          <li>App-Icon auf dem Homescreen</li>
          <li>Vollbild-Modus ohne Browser-UI</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Technische Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Service Worker für Offline-Funktionalität</li>
          <li>App Manifest für Installation</li>
          <li>Intelligentes Caching</li>
          <li>Background Sync</li>
          <li>Automatische Updates</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 3-6 Wochen</p>
        <p class="text-sm"><strong>Vorteil:</strong> Keine App Store Gebühren oder Genehmigungen</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Native Apps Modal -->
<dialog id="modal-native-apps" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Native Mobile Apps</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Apps mit hohen Performance-Anforderungen</p>
      
      <div>
        <h4 class="font-semibold mb-2">Native Vorteile:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>App Store und Google Play Distribution</li>
          <li>Native Performance und Geschwindigkeit</li>
          <li>Vollzugriff auf alle Gerätehardware</li>
          <li>Plattformspezifische UI-Elemente</li>
          <li>Erweiterte Sicherheitsfeatures</li>
          <li>Tiefe System-Integration</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Entwicklungsansatz:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>React Native für iOS und Android</li>
          <li>Capacitor für Web-zu-App Konvertierung</li>
          <li>Shared Codebase für Effizienz</li>
          <li>Native Module bei Bedarf</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 8-16 Wochen</p>
        <p class="text-sm"><strong>App Store:</strong> Unterstützung bei Veröffentlichung inklusive</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Complex Apps Modal -->
<dialog id="modal-complex-apps" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Komplexe Anwendungen</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> CRM-Systeme, E-Learning-Plattformen, Booking-Systeme</p>
      
      <div>
        <h4 class="font-semibold mb-2">Enterprise-Features:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Umfangreiche Datenbank-Integration</li>
          <li>API-Entwicklung und -Integration</li>
          <li>Benutzerauthentifizierung und -verwaltung</li>
          <li>Real-time Features (Chat, Notifications)</li>
          <li>Skalierbare Microservice-Architektur</li>
          <li>Umfangreiche Reporting-Funktionen</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Beispiel-Systeme:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Customer Relationship Management (CRM)</li>
          <li>E-Learning und Kursplattformen</li>
          <li>Buchungs- und Reservierungssysteme</li>
          <li>Collaboration und Projektmanagement-Tools</li>
          <li>Inventory Management Systeme</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 12-24 Wochen</p>
        <p class="text-sm"><strong>Support:</strong> Langfristige Wartung und Weiterentwicklung</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Individual Development Modals -->
<dialog id="modal-components" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Einzelne Komponenten</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Spezielle UI-Elemente, Widgets, Custom Plugins</p>
      
      <div>
        <h4 class="font-semibold mb-2">Komponenten-Typen:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Interaktive UI-Komponenten</li>
          <li>Spezielle Formulare und Eingabefelder</li>
          <li>Datenvisualisierung und Charts</li>
          <li>Custom Widgets für Websites</li>
          <li>Wiederverwendbare Code-Module</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 1-3 Wochen</p>
        <p class="text-sm"><strong>Integration:</strong> Nahtlose Einbindung in bestehende Systeme</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-extensions" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">System-Erweiterungen</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Bestehende Websites erweitern und optimieren</p>
      
      <div>
        <h4 class="font-semibold mb-2">Erweiterungs-Services:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Neue Features für bestehende Websites</li>
          <li>API-Integrationen (Payment, CRM, etc.)</li>
          <li>Performance-Optimierungen</li>
          <li>Datenbank-Migrationen</li>
          <li>Security-Updates und Härtung</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 1-4 Wochen</p>
        <p class="text-sm"><strong>Kompatibilität:</strong> Arbeiten mit allen gängigen Technologien</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-special-apps" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Spezial-Anwendungen</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Einzigartige Geschäftsanforderungen</p>
      
      <div>
        <h4 class="font-semibold mb-2">Anwendungsbeispiele:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Event-Registrierungssysteme</li>
          <li>Business Intelligence Dashboards</li>
          <li>Reporting und Analytics Tools</li>
          <li>Automatisierungs-Scripts</li>
          <li>Datenverarbeitungs-Pipelines</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 2-8 Wochen</p>
        <p class="text-sm"><strong>Ansatz:</strong> Agile Entwicklung mit regelmäßigen Reviews</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-design" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">UI/UX Design</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Optimale Benutzererfahrung und modernes Design</p>
      
      <div>
        <h4 class="font-semibold mb-2">Design-Services:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>User Interface Design</li>
          <li>User Experience Optimierung</li>
          <li>Interaktive Prototyping</li>
          <li>Design-Systeme und Style Guides</li>
          <li>Usability Testing</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 2-6 Wochen</p>
        <p class="text-sm"><strong>Tools:</strong> Figma, Adobe Creative Suite</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<!-- KI Services Modals -->
<dialog id="modal-ki-beratung" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">KI-Beratung & Support</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Unternehmen, die KI strategisch einsetzen möchten</p>
      
      <div>
        <h4 class="font-semibold mb-2">Beratungs-Services:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>KI-Strategieentwicklung für Ihr Unternehmen</li>
          <li>Prompt Engineering für optimale Ergebnisse</li>
          <li>Context Engineering für präzise KI-Antworten</li>
          <li>Use-Case Identifikation und Bewertung</li>
          <li>ROI-Analyse für KI-Projekte</li>
          <li>Change Management für KI-Einführung</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 2-4 Wochen</p>
        <p class="text-sm"><strong>Deliverable:</strong> Umfassende KI-Strategie und Roadmap</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-ki-agenten" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">KI-Agenten Entwicklung</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Automatisierte Kundenbetreuung und Content-Generierung</p>
      
      <div>
        <h4 class="font-semibold mb-2">Agent-Typen:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Custom Chatbots für Websites</li>
          <li>Automatisierte Kundenbetreuung</li>
          <li>Content-Generierung und -Optimierung</li>
          <li>Datenanalyse und Reporting-Agenten</li>
          <li>E-Mail-Automation mit KI</li>
          <li>Integration in bestehende CRM-Systeme</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 4-8 Wochen</p>
        <p class="text-sm"><strong>Training:</strong> Individuelle Schulung auf Ihre Daten</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-workflow" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Workflow-Optimierung mit KI</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Effizienzsteigerung durch intelligente Automatisierung</p>
      
      <div>
        <h4 class="font-semibold mb-2">Optimierungs-Bereiche:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Prozessanalyse und Optimierungspotentiale</li>
          <li>Automatisierung wiederkehrender Aufgaben</li>
          <li>Intelligente Dokumentenverarbeitung</li>
          <li>Predictive Analytics für bessere Entscheidungen</li>
          <li>Integration von KI in bestehende Workflows</li>
          <li>Qualitätskontrolle durch KI</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Messbare Vorteile:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Zeit sparen (bis zu 70% Reduktion)</li>
          <li>Kosten reduzieren</li>
          <li>Fehler minimieren</li>
          <li>Effizienz steigern</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Projektdauer:</strong> 6-12 Wochen</p>
        <p class="text-sm"><strong>ROI:</strong> Messbare Effizienzsteigerung bereits nach 4 Wochen</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-ai-infrastructure" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">AI as Infrastructure</h3>
    <div class="space-y-4">
      <p><strong>Perfekt für:</strong> Skalierbare KI-Lösungen ohne eigene Infrastruktur</p>
      
      <div>
        <h4 class="font-semibold mb-2">Service-Modelle:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Skalierbare KI-Infrastruktur in der Cloud</li>
          <li>Pay-per-Use Modelle für Kosteneffizienz</li>
          <li>Managed KI-Services ohne Wartungsaufwand</li>
          <li>24/7 Monitoring und technischer Support</li>
          <li>Regelmäßige Updates und Verbesserungen</li>
          <li>Compliance und Datenschutz inklusive</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-2">Abrechnungsmodelle:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Projekt-basierte Abrechnung</li>
          <li>Monatliche Miete für kontinuierliche Nutzung</li>
          <li>Usage-basierte Abrechnung nach Verbrauch</li>
          <li>Hybrid-Modelle für optimale Flexibilität</li>
        </ul>
      </div>
      
      <div class="bg-base-200 p-4 rounded-lg">
        <p class="text-sm"><strong>Setup-Zeit:</strong> 1-2 Wochen</p>
        <p class="text-sm"><strong>Skalierung:</strong> Automatisch je nach Bedarf</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Schließen</button>
      </form>
    </div>
  </div>
</dialog>

<style lang="postcss">
  @reference '../../app.css';

  .services-content-wrapper {
    .service-overview-highlight {
      @apply bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 my-12 rounded-3xl;
      
      .highlight-content {
        @apply max-w-6xl mx-auto px-6;
        
        h2 {
          @apply text-4xl font-bold mb-12;
        }
      }
      
      .service-categories-grid {
        @apply grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6;
        
        .category-card {
          @apply bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20;
          
          .category-icon {
            @apply text-4xl mb-4;
          }
          
          h3 {
            @apply text-lg font-semibold mb-2 text-darkGrey;
          }
          
          p {
            @apply text-sm text-neutral;
          }
        }
      }
    }

    .service-section {
      @apply flex flex-col items-center justify-center;

      .service-header {
        @apply m-auto mb-12 max-w-5xl text-center;
      }
    }

    .service-card {
      @apply bg-gradient-to-br from-lightGrey/70 via-lightGrey/90 to-lightGrey/45 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-lightGrey/50;

      &.large {
        @apply min-h-[280px];
      }

      .service-card-content {
        @apply p-6 h-full flex flex-col;
      }

      .service-card-header {
        @apply mb-4 flex items-center justify-between;

        h3 {
          @apply text-xl font-semibold text-darkGrey;
        }

        .service-icon {
          @apply text-3xl;
        }
      }

      p {
        @apply text-neutral mb-4 flex-grow;
      }

      .service-highlights {
        @apply flex flex-wrap gap-2 mb-4;

        .highlight {
          @apply bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium;
        }
      }
    }

    .cta-section {
      @apply flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/5 to-secondary/5 py-16 rounded-3xl;

      .cta-content {
        @apply max-w-4xl px-6;

        h1 {
          @apply text-darkGrey mb-6 text-4xl font-bold md:text-5xl;
        }

        .cta-text {
          @apply text-neutral mb-8 text-lg leading-relaxed;
        }

        .cta-benefits {
          @apply mb-8 grid grid-cols-1 gap-6 md:grid-cols-3;

          .cta-benefit {
            @apply flex items-start text-left;

            .benefit-icon {
              @apply mt-1 mr-4 text-3xl;
            }

            h4 {
              @apply text-darkGrey mb-1 font-semibold;
            }

            p {
              @apply text-neutral text-sm;
            }
          }
        }

        .cta-buttons {
          @apply mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row;
        }

        .cta-note {
          @apply text-neutral bg-lightGrey/50 rounded-lg p-4 text-sm;
        }
      }
    }

    .benefits {
      @apply mt-4 flex flex-wrap gap-2;
      .item {
        @apply text-mediumGrey bg-lightGrey w-fit rounded-lg p-2 text-sm;
      }
    }

    .image-container {
      @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
      .services-image {
        @apply h-full w-full bg-cover bg-center bg-no-repeat;
        background-image: url('/images/visualisation-1.jpg');
      }
    }
  }

  /* Modal Styles */
  .modal-box {
    @apply max-w-2xl;
  }
</style>
