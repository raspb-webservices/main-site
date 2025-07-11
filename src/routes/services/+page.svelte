<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import { goto } from '$app/navigation';
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

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <!-- One-Page Websites -->
        <div class="service-card">
          <div class="service-card-header">
            <h3>One-Page Websites</h3>
            <div class="service-icon">🎯</div>
          </div>
          <p>Kompakte, fokussierte Präsentation Ihres Angebots auf einer einzigen, scrollbaren Seite.</p>
          <ul class="service-features">
            <li>Perfekt für Startups und kleine Unternehmen</li>
            <li>Klare Botschaft, starker Call-to-Action</li>
            <li>Optimiert für Conversion</li>
            <li>Schnelle Ladezeiten</li>
          </ul>
        </div>

        <!-- Landing Pages -->
        <div class="service-card">
          <div class="service-card-header">
            <h3>Landing Pages</h3>
            <div class="service-icon">🚀</div>
          </div>
          <p>Temporäre Kampagnenseiten für Marketing-Aktionen, Produktlaunches oder Events.</p>
          <ul class="service-features">
            <li>Zielgerichtete Conversion-Optimierung</li>
            <li>A/B-Testing-fähig</li>
            <li>Integration mit Analytics</li>
            <li>Schnelle Umsetzung</li>
          </ul>
        </div>

        <!-- Corporate Websites -->
        <div class="service-card">
          <div class="service-card-header">
            <h3>Corporate Websites</h3>
            <div class="service-icon">🏢</div>
          </div>
          <p>Professionelle Unternehmensauftritte mit mehreren Seiten, umfassenden Inhalten und erweiterten Funktionen.</p>
          <ul class="service-features">
            <li>Mehrseitige Struktur</li>
            <li>Professionelles Design</li>
            <li>SEO-optimiert</li>
            <li>Kontaktformulare und Interaktionen</li>
          </ul>
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

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Einfache Inhaltsbearbeitung -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Einfache Inhaltsbearbeitung</h3>
            <div class="service-icon">✏️</div>
          </div>
          <p>Machen Sie bestehende Seiten editierbar oder ermöglichen Sie die einfache Bearbeitung einzelner Inhalte.</p>
          <ul class="service-features">
            <li>Inline-Editing direkt auf der Website</li>
            <li>Benutzerfreundliche Oberfläche</li>
            <li>Keine technischen Kenntnisse erforderlich</li>
            <li>Sofortige Vorschau der Änderungen</li>
            <li>Versionskontrolle und Backup</li>
          </ul>
          <div class="service-use-cases">
            <h4>Ideal für:</h4>
            <span class="use-case">Kleine Unternehmen</span>
            <span class="use-case">Vereine</span>
            <span class="use-case">Praxen</span>
          </div>
        </div>

        <!-- Komplexe CMS-Systeme -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Komplexe CMS-Systeme</h3>
            <div class="service-icon">🏗️</div>
          </div>
          <p>Individuelle Content-Management-Systeme mit vielschichtigen Informationsobjekten und erweiterten Funktionen.</p>
          <ul class="service-features">
            <li>Benutzerdefinierte Content-Typen</li>
            <li>Workflow-Management</li>
            <li>Mehrsprachigkeit</li>
            <li>Benutzerrollen und Rechte</li>
            <li>API-Integration</li>
          </ul>
          <div class="service-use-cases">
            <h4>Ideal für:</h4>
            <span class="use-case">Große Unternehmen</span>
            <span class="use-case">Verlage</span>
            <span class="use-case">E-Commerce</span>
          </div>
        </div>

        <!-- Blog & Content-getriebene Websites -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Blog & Content-Plattformen</h3>
            <div class="service-icon">📝</div>
          </div>
          <p>Spezialisierte Lösungen für Blogs, Magazine und content-getriebene Websites.</p>
          <ul class="service-features">
            <li>Optimiert für Content-Erstellung</li>
            <li>SEO-Tools integriert</li>
            <li>Social Media Integration</li>
            <li>Kommentar-System</li>
            <li>Newsletter-Integration</li>
          </ul>
          <div class="service-use-cases">
            <h4>Ideal für:</h4>
            <span class="use-case">Blogger</span>
            <span class="use-case">Journalisten</span>
            <span class="use-case">Content Creator</span>
          </div>
        </div>

        <!-- Headless CMS -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Headless CMS</h3>
            <div class="service-icon">🔗</div>
          </div>
          <p>Flexible Content-Verwaltung mit API-basierter Auslieferung für multiple Kanäle.</p>
          <ul class="service-features">
            <li>Content einmal erstellen, überall nutzen</li>
            <li>API-first Ansatz</li>
            <li>Flexibilität bei der Darstellung</li>
            <li>Zukunftssicher und skalierbar</li>
            <li>Integration in bestehende Systeme</li>
          </ul>
          <div class="service-use-cases">
            <h4>Ideal für:</h4>
            <span class="use-case">Multi-Channel</span>
            <span class="use-case">Apps + Web</span>
            <span class="use-case">Enterprise</span>
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

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Web Applications -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Web Applications</h3>
            <div class="service-icon">💻</div>
          </div>
          <p>Browser-basierte Anwendungen für spezifische Aufgaben und Workflows.</p>
          <ul class="service-features">
            <li>Plattformunabhängig</li>
            <li>Keine Installation erforderlich</li>
            <li>Automatische Updates</li>
            <li>Responsive Design</li>
            <li>Offline-Funktionalität möglich</li>
          </ul>
          <div class="app-examples">
            <h4>Beispiele:</h4>
            <span class="example">Dashboards</span>
            <span class="example">Kalkulatoren</span>
            <span class="example">Formulare</span>
            <span class="example">Tools</span>
          </div>
        </div>

        <!-- Progressive Web Apps -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Progressive Web Apps (PWA)</h3>
            <div class="service-icon">📱</div>
          </div>
          <p>Das Beste aus Web und App - installierbar, offline-fähig und mit nativen Features.</p>
          <ul class="service-features">
            <li>App-ähnliches Verhalten im Browser</li>
            <li>Installierbar auf allen Geräten</li>
            <li>Push-Benachrichtigungen</li>
            <li>Offline-Funktionalität</li>
            <li>Zugriff auf Gerätehardware</li>
          </ul>
          <div class="app-examples">
            <h4>Features:</h4>
            <span class="example">Service Worker</span>
            <span class="example">App Manifest</span>
            <span class="example">Caching</span>
            <span class="example">Background Sync</span>
          </div>
        </div>

        <!-- Native Mobile Apps -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Native Mobile Apps</h3>
            <div class="service-icon">📲</div>
          </div>
          <p>Vollwertige Apps für iOS und Android App Stores mit nativer Performance.</p>
          <ul class="service-features">
            <li>App Store Distribution</li>
            <li>Native Performance</li>
            <li>Vollzugriff auf Gerätehardware</li>
            <li>Plattformspezifische UI</li>
            <li>Erweiterte Sicherheitsfeatures</li>
          </ul>
          <div class="app-examples">
            <h4>Technologien:</h4>
            <span class="example">React Native</span>
            <span class="example">Capacitor</span>
            <span class="example">Cordova</span>
            <span class="example">Hybrid</span>
          </div>
        </div>

        <!-- Komplexe Anwendungen -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Komplexe Anwendungen</h3>
            <div class="service-icon">⚙️</div>
          </div>
          <p>Umfangreiche Anwendungen mit erweiterten Funktionen und Integrationen.</p>
          <ul class="service-features">
            <li>Datenbank-Integration</li>
            <li>API-Entwicklung</li>
            <li>Benutzerauthentifizierung</li>
            <li>Real-time Features</li>
            <li>Skalierbare Architektur</li>
          </ul>
          <div class="app-examples">
            <h4>Beispiele:</h4>
            <span class="example">CRM-Systeme</span>
            <span class="example">E-Learning</span>
            <span class="example">Booking-Systeme</span>
            <span class="example">Collaboration Tools</span>
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
          Haben Sie spezielle Anforderungen, die nicht in die Standard-Kategorien passen? Wir entwickeln maßgeschneiderte Lösungen für jeden Use-Case - von
          einzelnen Komponenten bis hin zu komplexen Systemen.
        </p>
      </div>

      <div class="individual-grid">
        <div class="individual-main">
          <h3>Flexible Lösungen für einzigartige Anforderungen</h3>
          <p>
            Manchmal braucht es mehr als Standard-Lösungen. Unsere Individualentwicklung deckt alle Bereiche ab, die nicht in die klassischen Kategorien passen.
            Dabei können wir sowohl komplette Projekte als auch einzelne Bausteine realisieren.
          </p>

          <div class="individual-categories">
            <div class="category">
              <h4>🧩 Einzelne Komponenten</h4>
              <ul>
                <li>UI-Komponenten und Widgets</li>
                <li>Spezielle Formulare</li>
                <li>Interaktive Elemente</li>
                <li>Custom Plugins</li>
              </ul>
            </div>

            <div class="category">
              <h4>🔧 System-Erweiterungen</h4>
              <ul>
                <li>Erweiterung bestehender Websites</li>
                <li>API-Integrationen</li>
                <li>Datenbank-Migrationen</li>
                <li>Performance-Optimierungen</li>
              </ul>
            </div>

            <div class="category">
              <h4>📊 Spezial-Anwendungen</h4>
              <ul>
                <li>Event-Registrierungssysteme</li>
                <li>Daten-Dashboards</li>
                <li>Reporting-Tools</li>
                <li>Automatisierungs-Scripts</li>
              </ul>
            </div>

            <div class="category">
              <h4>🎨 UI/UX Design</h4>
              <ul>
                <li>Interface-Design</li>
                <li>User Experience Optimierung</li>
                <li>Prototyping</li>
                <li>Design-Systeme</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="individual-examples">
          <h4>Beispiel-Projekte</h4>
          <div class="example-list">
            <div class="example-item">
              <strong>API-Dashboard</strong>
              <p>Schicke Darstellung von API-Daten mit Real-time Updates</p>
            </div>
            <div class="example-item">
              <strong>Buchungssystem</strong>
              <p>Maßgeschneidertes Reservierungssystem für Dienstleister</p>
            </div>
            <div class="example-item">
              <strong>Datenmodellierung</strong>
              <p>Strukturierung und Optimierung komplexer Datenstrukturen</p>
            </div>
            <div class="example-item">
              <strong>Custom CRM</strong>
              <p>Branchenspezifische Kundenverwaltung mit speziellen Features</p>
            </div>
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
          Nutzen Sie die Kraft der Künstlichen Intelligenz für Ihr Unternehmen. Von der Beratung bis zur fertigen KI-Lösung - wir helfen Ihnen dabei, Prozesse
          zu optimieren und neue Möglichkeiten zu erschließen.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- KI Beratung & Support -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>KI-Beratung & Support</h3>
            <div class="service-icon">🧠</div>
          </div>
          <p>Umfassende Beratung und Unterstützung bei der Integration von KI in Ihre Geschäftsprozesse.</p>
          <ul class="service-features">
            <li>Allgemeine KI-Beratung und Strategieentwicklung</li>
            <li>Prompt Engineering für optimale Ergebnisse</li>
            <li>Context Engineering für präzise KI-Antworten</li>
            <li>Use-Case Identifikation und Bewertung</li>
            <li>ROI-Analyse für KI-Projekte</li>
          </ul>
        </div>

        <!-- KI-Agenten Entwicklung -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>KI-Agenten Entwicklung</h3>
            <div class="service-icon">🤖</div>
          </div>
          <p>Maßgeschneiderte KI-Agenten für spezifische Aufgaben und Anwendungsfälle.</p>
          <ul class="service-features">
            <li>Custom Chatbots und Assistenten</li>
            <li>Automatisierte Kundenbetreuung</li>
            <li>Content-Generierung und -Optimierung</li>
            <li>Datenanalyse und Reporting-Agenten</li>
            <li>Integration in bestehende Systeme</li>
          </ul>
        </div>

        <!-- Workflow-Optimierung -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>Workflow-Optimierung mit KI</h3>
            <div class="service-icon">⚡</div>
          </div>
          <p>Digitale Prozesse und Abläufe mit KI vereinfachen, verkürzen und vergünstigen.</p>
          <ul class="service-features">
            <li>Prozessanalyse und Optimierungspotentiale</li>
            <li>Automatisierung wiederkehrender Aufgaben</li>
            <li>Intelligente Dokumentenverarbeitung</li>
            <li>Predictive Analytics für bessere Entscheidungen</li>
            <li>Integration von KI in bestehende Workflows</li>
          </ul>
          <div class="workflow-benefits">
            <h4>Vorteile:</h4>
            <span class="benefit">Zeit sparen</span>
            <span class="benefit">Kosten reduzieren</span>
            <span class="benefit">Fehler minimieren</span>
            <span class="benefit">Effizienz steigern</span>
          </div>
        </div>

        <!-- AI as Infrastructure -->
        <div class="service-card large">
          <div class="service-card-header">
            <h3>AI as Infrastructure</h3>
            <div class="service-icon">🏗️</div>
          </div>
          <p>KI-Infrastruktur als Service - mieten statt kaufen für maximale Flexibilität.</p>
          <ul class="service-features">
            <li>Skalierbare KI-Infrastruktur</li>
            <li>Pay-per-Use Modelle</li>
            <li>Managed KI-Services</li>
            <li>24/7 Monitoring und Support</li>
            <li>Regelmäßige Updates und Verbesserungen</li>
          </ul>
          <div class="infrastructure-models">
            <h4>Service-Modelle:</h4>
            <span class="model">Projekt-basiert</span>
            <span class="model">Monatliche Miete</span>
            <span class="model">Usage-basiert</span>
            <span class="model">Hybrid-Modelle</span>
          </div>
        </div>
      </div>
      <!-- KI Beratungsthemen Workflow Automatuion = Digitalisierung von Aufgaben, Vorängen, Prozesse, ganzen Positionen /  Abteilungen-->

      <!-- KI Use Cases -->
      <div class="ki-use-cases">
        <h3>Typische KI Use-Cases</h3>
        <div class="use-cases-grid">
          <div class="use-case-item">
            <div class="use-case-icon">📧</div>
            <h4>E-Mail Automation</h4>
            <p>Intelligente E-Mail-Bearbeitung und automatische Antworten</p>
          </div>
          <div class="use-case-item">
            <div class="use-case-icon">📄</div>
            <h4>Dokumenten-AI</h4>
            <p>Automatische Extraktion und Verarbeitung von Dokumenteninhalten</p>
          </div>
          <div class="use-case-item">
            <div class="use-case-icon">💬</div>
            <h4>Customer Support</h4>
            <p>24/7 KI-gestützter Kundensupport mit menschlicher Qualität</p>
          </div>
          <div class="use-case-item">
            <div class="use-case-icon">📊</div>
            <h4>Business Intelligence</h4>
            <p>KI-basierte Datenanalyse und Geschäftsprognosen</p>
          </div>
          <div class="use-case-item">
            <div class="use-case-icon">🎯</div>
            <h4>Personalisierung</h4>
            <p>Individualisierte Inhalte und Empfehlungen für Nutzer</p>
          </div>
          <div class="use-case-item">
            <div class="use-case-icon">🔍</div>
            <h4>Content-Analyse</h4>
            <p>Automatische Kategorisierung und Bewertung von Inhalten</p>
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
          Sie sofort einen transparenten Festpreis. Keine versteckten Kosten, keine Überraschungen - nur klare Preise für maßgeschneiderte Lösungen.
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
            class="btn btn-primary-large"
            onclick={() => {
              goto('/get-started');
            }}
          >
            Projekt jetzt konfigurieren
          </button>
          <button class="btn btn-secondary" onclick={() => goto('/faq')}> Häufige Fragen </button>
        </div>

        <p class="cta-note">
          💡 <strong>Tipp:</strong> Der Konfigurator dauert nur 3-5 Minuten und Sie erhalten sofort Ihren persönlichen Projektpreis. Unverbindlich und kostenlos.
        </p>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';

  .services-content-wrapper {
    .service-section {
      @apply flex flex-col items-center justify-center;

      .service-header {
        @apply m-auto mb-12 max-w-5xl text-center;
      }
    }

    .service-card {
      @apply card from-lightGrey/70 via-lightGrey/90 to-lightGrey/45 cursor-default bg-gradient-to-br shadow-sm transition-transform duration-300;

      &:hover {
        @apply translate-y-1.5;
      }

      &.large {
        @apply card-lg;
      }

      .service-card-header {
        @apply mb-4 flex items-center justify-between;

        h3 {
          @apply card-title text-xl;
        }

        .service-icon {
          @apply text-3xl;
        }
      }

      .service-features {
        @apply mb-4 list-none space-y-2 p-0;

        li {
          @apply text-neutral flex items-center;

          &::before {
            content: '✓';
            @apply text-wine mr-3 font-bold;
          }
        }
      }

      .service-use-cases,
      .app-examples,
      .workflow-benefits,
      .infrastructure-models {
        @apply mt-4;

        h4 {
          @apply text-mediumGrey mb-2 text-sm font-semibold;
        }

        .use-case,
        .example,
        .benefit,
        .model {
          @apply bg-lightGrey text-mediumGrey mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm;
        }
      }
    }

    .individual-grid {
      @apply grid grid-cols-1 gap-8 lg:grid-cols-3;

      .individual-main {
        @apply lg:col-span-2;

        .individual-categories {
          @apply mt-8 grid grid-cols-1 gap-6 md:grid-cols-2;

          .category {
            @apply bg-lightGrey/50 rounded-lg p-6;

            h4 {
              @apply text-darkGrey mb-3 text-lg font-semibold;
            }

            ul {
              @apply list-none space-y-2 p-0;

              li {
                @apply text-neutral flex items-center;

                &::before {
                  content: '•';
                  @apply text-wine mr-2;
                }
              }
            }
          }
        }
      }

      .individual-examples {
        @apply from-lightGrey/70 to-lightGrey/90 rounded-lg bg-gradient-to-br p-6;

        h4 {
          @apply text-darkGrey mb-4 text-lg font-semibold;
        }

        .example-list {
          @apply space-y-4;

          .example-item {
            @apply border-wine border-l-4 pl-4;

            strong {
              @apply text-darkGrey mb-1 block;
            }

            p {
              @apply text-neutral text-sm;
            }
          }
        }
      }
    }

    .ki-use-cases {
      @apply mt-12;

      h3 {
        @apply text-darkGrey mb-8 text-center text-2xl font-bold;
      }

      .use-cases-grid {
        @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;

        .use-case-item {
          @apply from-lightGrey/50 to-lightGrey/80 rounded-lg bg-gradient-to-br p-6 text-center transition-transform duration-300;

          &:hover {
            @apply translate-y-1;
          }

          .use-case-icon {
            @apply mb-3 text-4xl;
          }

          h4 {
            @apply text-darkGrey mb-2 text-lg font-semibold;
          }

          p {
            @apply text-neutral text-sm;
          }
        }
      }
    }

    .cta-section {
      @apply flex flex-col items-center justify-center text-center;

      .cta-content {
        @apply max-w-4xl;

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

          .btn-primary-large {
            @apply btn btn-primary btn-lg px-8 py-4 text-lg;
          }

          .btn-secondary {
            @apply btn btn-outline btn-lg px-8 py-4;
          }
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
</style>
