<script lang="ts">
  import { user, isAuthenticated, popupOpen } from '$store/sharedStates.svelte';
  import SLIDER from '$lib/components/slider.svelte';
  import Hero from '$lib/components/hero.svelte';
  import markdownit from 'markdown-it';
  import Section from '$lib/components/section.svelte';
  import RaspbPhilosophyModal from '$lib/components/raspb-philosophy-modal.svelte';
  import { goto } from '$app/navigation';

  const { data } = $props();

  let currentUser = $derived(user.get());
  const md = markdownit();
  let philosophyModal: RaspbPhilosophyModal;

  function renderMarkdown(content: string) {
    return md.render(content);
  }

  // Hero button action for testing
  function handleHeroButton() {
    console.log('Hero button clicked!');
    goto('/einblicke');
  }

  function openPhilosophyModal() {
    philosophyModal?.openModal();
  }

  // Modal state for balance section
  let zeitModal: HTMLDialogElement;
  let kostenModal: HTMLDialogElement;
  let qualitaetModal: HTMLDialogElement;

  function openZeitModal() {
    zeitModal?.showModal();
  }

  function openKostenModal() {
    kostenModal?.showModal();
  }

  function openQualitaetModal() {
    qualitaetModal?.showModal();
  }
</script>

<svelte:head>
  <title>raspb Webservices - Digitale Lösungen nach Maß</title>
  <meta
    name="description"
    content="Professionelle Webentwicklung, CMS-Lösungen und KI-Services für KMUs, Vereine und Stiftungen. Transparent, günstig und nach bewährter raspb Philosophie."
  />
</svelte:head>

<div class="home-content-wrapper">
  <Section type={'centerTeaser'}>
    <div class="animate-fade-in-up flex w-full flex-col items-center justify-center text-center">
      <h1 class="massive">Digital Experience <span class="inner-text-special">nach Maß</span></h1>
      <h3>skalierbar - sicher - nach bewährter <button class="text-link-button" onclick={openPhilosophyModal}>raspb Philosophie</button> - super günstig</h3>
      <button
        class="btn-basic"
        onclick={() => {
          goto('/einblicke');
        }}>mehr erfahren</button
      >
    </div>

    <div class="massive-spacer"></div>
    <div class="massive-spacer"></div>

    <div class="grid grid-cols-1 items-center gap-12 gap-y-10 lg:grid-cols-2 lg:gap-14 lg:gap-y-4">
      <div class="animate-fade-in-from-side mr-8">
        <h2>Für KMUs, für Vereine, für Stiftungen, ... <span class="inner-text-special">für alle</span></h2>
        <p>
          Jeder, der im Internet sichtbar sein will, braucht eine Webseite. Diese ist so individuell wie Sie selbst und Wünsche und Anforderungen variieren.
          Egal ob einfache Webvisitenkarte, umfangreicher Unternehmensauftritt oder mächtige Content Management Plattform. Bei raspb finden Sie die perfekte
          Lösung für Ihre Vorhaben.
        </p>
        <p>
          Darüber hinaus entwickeln wir für Sie auf Wunsch auch komplexe Webanwendungen (PWA) oder unterstützen Sie bei individuellen Herausforderungen in Ihrem
          Unternehmen (Freestyle Development, spezielle KI-Use-Cases).
        </p>
        <p>
          Dank unseres einzigartigen Ansatzes, können wir die gängigsten IT-Services unglaublich schnell und kosteneffizient anbieten. Dabei erhalten Sie alles
          aus einer Hand, perfekt aufeinander abgestimmt: Koherente Ergebnisse, weniger Reibungspunkte, weniger Fehlerpotenziale, weniger Projektstress.
        </p>
      </div>
      <div>
        <div class="image-container">
          <div class="solution-image"></div>
        </div>
      </div>
      <div class="benefits col-span-full">
        <p class="w-full">
          Sie müssen sich um nichts kümmern (außer Ihre Idee so detailliert wie möglich zu beschreiben). Wir liefern ab - in jeder Disziplin:
        </p>
        <div class="item">Konzept</div>
        <div class="item">Design</div>
        <div class="item">UI / UX</div>
        <div class="item">Programmierung (Frontend & Backend)</div>
        <div class="item">Datenmodellierung</div>
        <div class="item">Hosting / Administration</div>
        <div class="item">Domain- / DNS-Konfiguration</div>
        <div class="item">Projektdurchführung</div>
        <div class="item">Monitoring</div>
      </div>
    </div>
    <div class="massive-spacer"></div>
  </Section>

  <Section>
    <div class="flex flex-col items-center justify-center">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1>Unsere <span class="inner-text-special">Services</span> im Überblick</h1>
        <p class="teaser">
          Von der ersten Idee bis zur finalen Umsetzung - wir begleiten Sie mit modernster Technologie und jahrelanger Expertise zu Ihrem digitalen Erfolg.
        </p>
      </div>
      <div class="spacer"></div>

      <!-- Services Grid with improved layout -->
      <div class="services-grid">
        <!-- Webseiten -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">🌐</div>
            <h3 class="no-padding">Webseiten</h3>
          </div>
          <p class="no-padding">
            Von eleganten One-Pagern bis hin zu umfassenden Unternehmensauftritten und professionellen Blogs - wir entwickeln Webseiten, die Ihre Zielgruppe
            begeistern.
          </p>
          <ul class="service-features">
            <li>Responsives Design - perfekte Darstellung auf jedem Gerät</li>
            <li>State-of-the-art - Nutzung modernster Webtechnologien</li>
            <li>Performant, sicher, benutzerfreundlich</li>
            <li>Individuell und flexibel erweiterbar</li>
            <li>Ihre Webseite, Ihr Code - kein geschlossenes System</li>
            <li>
              <span class="tooltip tooltip-secondary tooltip-left"
                ><span class="tooltip-content"
                  ><p class="no-padding p-2 text-sm">
                    Bereits nach wenigen Tagen liefern wir Ihre neue Webseite aus. Für das erste Jahr sind Wartung und Hosting inklusive. Im Anschluss können
                    Sie mit Ihrer Webseite machen, was Sie möchten...
                  </p></span
                >Keine Folgekosten, kein Mietmodell</span
              >
            </li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=website')}>Projekt kalkulieren</button>
          </div>
        </div>

        <!-- Custom CMS -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">📝</div>
            <h3 class="no-padding">Custom CMS</h3>
          </div>
          <p class="no-padding">
            Ein Content-Management-System gibt Ihnen auch zukünftig die volle Kontrolle über Ihre Inhalte. Wir entwickeln für Sie eine maßgeschneiderte Lösung,
            die all Ihre Anforderungen erfüllt.
          </p>
          <ul class="service-features">
            <li>Volle Kontrolle über Ihre Inhalte</li>
            <li>
              <span class="tooltip tooltip-secondary tooltip-left"
                ><span class="tooltip-content"
                  ><p class="no-padding p-2 text-sm">
                    Sie können als Informationsobjekt auch Nachrichten, Termine, Produkte, Kunden, usw. - was immer Sie möchten - speichern und verwalten.
                    Starten Sie jetzt ihr persönliches CMS-Projekt mit uns.
                  </p></span
                >Beliebige Datenstrukturen abbilden</span
              >
            </li>
            <li>Sicher, schnell und einfach</li>
            <li>Wartungsarm und beliebig erweiterbar</li>
            <li>Bestehende Webseiten nachträglich "editierbar" machen</li>
            <li>Headless: erfasste Inhalte auch an anderer Stelle nutzen</li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=cms')}>Projekt kalkulieren</button>
          </div>
        </div>

        <!-- Webanwendungen -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">📱</div>
            <h3 class="no-padding">Webanwendungen</h3>
          </div>
          <p class="no-padding">
            Webanwendungen und Mobile-Applications - mit überschaubarer Komplexität - können ebenfalls mit der raspb Methode schnell und günstig von uns
            entwickelt werden!
          </p>
          <ul class="service-features">
            <li>Ihre Webseite als App - oder Start auf weißer Leinwand</li>
            <li>PWA - (Progressive Web Application) powered</li>
            <li>Service Worker: Offline-Fähigkeiten</li>
            <li>Service Worker: Push-Benachrichtigungen</li>
            <li>Entwickelte Anwendungen können in die App Stores (iOS & Android)</li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=webApplication')}>Projekt kalkulieren</button>
          </div>
        </div>

        <!-- Freestyle -->
        <div class="service-card freestyle">
          <div class="service-card-header">
            <div class="service-icon">⚙️</div>
            <h3 class="no-padding">Freestyle (Individualentwicklung)</h3>
          </div>
          <p class="no-padding">
            Möchten Sie einen ganz bestimmten Use-Case umsetzen, der in keine der Kategorien passt? Wir entwickeln auch einzelne Bestandteile, Module,
            Komponenten - nach Ihren Vorgaben.
          </p>
          <div class="service-examples">
            <span class="example-tag">Event-Registrierung</span>
            <span class="example-tag">Daten-Dashboard</span>
            <span class="example-tag">API-Visualisierung</span>
            <span class="example-tag">Einzelne Module, Plugins, Komponenten</span>
            <span class="example-tag">UI Bausteine </span>
          </div>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=freestyle')}>Jetzt anfragen</button>
          </div>
        </div>

        <!-- KI Services - spans full width -->
        <div class="service-card lg:col-span-2">
          <div class="service-card-header">
            <div class="service-icon">🤖</div>
            <h3 class="no-padding">KI Services</h3>
          </div>

          <p>
            Künstliche Intelligenz (KI oder auch Artificial Intelligence = AI) ist in aller Munde, aber wie kann man sie am besten für sich nutzbar machen? Wir
            modellieren für Sie KI-gestützte Workflows oder ganze KI-Anwendungen für Ihr Business.
          </p>

          <div class="service-list">
            <div class="service-item">
              <div class="service-icon">🧠</div>
              <div>
                <h4 class="no-padding">KI-Beratung & Strategie</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">Prompt Engineering, Context Engineering, ROI-Analyse</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">🤖</div>
              <div>
                <h4 class="no-padding">KI-Agenten Entwicklung</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">Custom Chatbots, Content-Generierung, System-Integration</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">⚡</div>
              <div>
                <h4 class="no-padding">Workflow-Optimierung</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">Prozessanalyse, Automatisierung, Predictive Analytics</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">🏗️</div>
              <div>
                <h4 class="no-padding">AI as Infrastructure</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">Skalierbare KI-Infrastruktur, Pay-per-Use, 24/7 Support</p>
              </div>
            </div>
          </div>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=artificialIntelligence')}>KI-Beratung anfragen</button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="balance-section">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1>Die perfekte <span class="inner-text-special">Balance</span></h1>
        <p class="teaser">
          Wir haben verstanden, dass erfolgreiche Projekte das optimale Gleichgewicht zwischen Zeit, Kosten und Qualität erfordern. <button
            class="text-link-button"
            onclick={openPhilosophyModal}>Unsere Philosophie</button
          > "perfectly balanced" steht für diese harmonische Abstimmung aller Faktoren.
        </p>
      </div>
      <div class="spacer"></div>

      <div class="balance-grid">
        <!-- Zeit -->
        <div class="balance-card">
          <div class="balance-icon">⚡</div>
          <div class="balance-content">
            <h3>Zeit</h3>
            <p>
              Schnelle Umsetzung durch agile Entwicklungsprozesse, KI-Unterstützung und bewährtes System von Best-Practice-Bausteinen kombiniert mit
              Individualentwicklung von Experten. <button class="text-link-button inverted-underline" onclick={openZeitModal}>Mehr erfahren &rsaquo;</button>
            </p>
            <div class="balance-features">
              <span class="feature-tag">Agile Methoden</span>
              <span class="feature-tag">KI-Unterstützung</span>
              <span class="feature-tag">Bewährte Bausteine</span>
              <span class="feature-tag">Expertenteam</span>
              <span class="feature-tag">raspb Ökosystem</span>
            </div>
          </div>
        </div>

        <!-- Kosten -->
        <div class="balance-card">
          <div class="balance-icon">💰</div>
          <div class="balance-content">
            <h3>Kosten</h3>
            <p>
              Transparente Festpreise ohne versteckte Kosten - keine nachfolgenden Abogebühren - keine zwangsweise Abnahme. Dank der raspb Methode können wir ein unschlagbares
              Preis-Leistungs-Verhältnis bieten. <button class="text-link-button inverted-underline" onclick={openKostenModal}>Mehr erfahren &rsaquo;</button>
            </p>
            <div class="balance-features">
              <span class="feature-tag">Festpreise</span>
              <span class="feature-tag">Keine Folgekosten</span>
              <span class="feature-tag">Transparenz</span>
              <span class="feature-tag">Fair & günstig</span>
              <span class="feature-tag">Unverbindlicher Projektkonfigurator</span>
            </div>
          </div>
        </div>

        <!-- Qualität -->
        <div class="balance-card">
          <div class="balance-icon">🏆</div>
          <div class="balance-content">
            <h3>Qualität</h3>
            <p>
              Höchste Standards in Design und Programmierung. Bewährte und geprüfte Qualität durch Verwendung modernster Webtechnologien, Frameworks und
              eigenentwickelter Module - erstellt und geprüft von Experten. <button class="text-link-button inverted-underline" onclick={openQualitaetModal}>Mehr erfahren &rsaquo;</button>
            </p>
            <div class="tech-stack">
              <img src="icons/tech-logos/node-js-logo.svg" alt="Node.js" class="tech-logo" />
              <img src="icons/tech-logos/svelte-logo.svg" alt="Svelte" class="tech-logo smaller" />
              <img src="icons/tech-logos/typescript-logo.svg" alt="TypeScript" class="tech-logo smaller" />
              <img src="icons/tech-logos/GitHub-logo.svg" alt="GitHub" class="tech-logo" />
              <img src="icons/tech-logos/netlify-logo.svg" alt="Netlify" class="tech-logo long" />
              <img src="icons/tech-logos/tailwindcss-logo.svg" alt="TailwindCSS" class="tech-logo long" />
              <img src="icons/tech-logos/GraphQL-logo.svg" alt="GraphQL" class="tech-logo long" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="features-section">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1>Was uns <span class="inner-text-special">auszeichnet</span></h1>
        <p class="teaser">Unsere Alleinstellungsmerkmale machen den Unterschied für Ihren Erfolg. Erfahren Sie, warum Kunden raspb wählen.</p>
      </div>
      <div class="spacer"></div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <div class="feature-content">
            <h3>Alles aus einer Hand</h3>
            <p>Von der ersten Beratung über Design und Programmierung bis hin zur Wartung - wir begleiten Sie durch den gesamten Prozess.</p>
            <ul class="feature-list">
              <li>Konzeption & Beratung</li>
              <li>Design & UX/UI</li>
              <li>Entwicklung & Testing</li>
              <li>Hosting & Wartung</li>
            </ul>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">👤</div>
          <div class="feature-content">
            <h3>Persönlicher Ansprechpartner</h3>
            <p>Sie haben einen festen Ansprechpartner, der Ihr Projekt von Anfang bis Ende betreut und Ihre Anforderungen genau versteht.</p>
            <div class="contact-info">
              <div class="contact-avatar">
              </div>
              <div class="contact-details">
                <strong>Direkter Draht zu Ihrem Projektleiter</strong>
                <p>Keine Warteschleifen, keine Umwege</p>
              </div>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💎</div>
          <div class="feature-content">
            <h3>Transparente Festpreise</h3>
            <p>Durch unseren Online-Konfigurator erhalten Sie klare, verbindliche Festpreise ohne versteckte Kosten oder böse Überraschungen.</p>
            <div class="price-benefits">
              <div class="price-item">
                <span class="price-check">✓</span>
                <span>Sofortiger Festpreis</span>
              </div>
              <div class="price-item">
                <span class="price-check">✓</span>
                <span>Keine versteckten Kosten</span>
              </div>
              <div class="price-item">
                <span class="price-check">✓</span>
                <span>Keine Folgegebühren</span>
              </div>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🛠️</div>
          <div class="feature-content">
            <h3>Maßgeschneiderte Lösungen</h3>
            <p>Jedes Projekt ist einzigartig. Wir entwickeln individuell auf Ihre Bedürfnisse zugeschnittene Lösungen statt 08/15-Produkte.</p>
            <div class="solution-types">
              <span class="solution-tag">Individual</span>
              <span class="solution-tag">Flexibel</span>
              <span class="solution-tag">Skalierbar</span>
              <span class="solution-tag">Zukunftssicher</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="cta-section">
      <div class="massive-spacer"></div>
      <div class="cta-content">
        <h1>Lassen Sie uns <span class="inner-text-special">gemeinsam starten</span></h1>
        <p class="cta-text">
          Bereit für Ihr nächstes digitales Projekt? Unser intelligenter Konfigurator hilft Ihnen dabei, Ihr Projekt zu spezifizieren und Sie erhalten sofort
          einen transparenten Festpreis.
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
            class="btn-basic cta-primary"
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
      <div class="massive-spacer"></div>
    </div>
  </Section>

  <section class="direct-section hidden">
    {#each data.contents as snippet}
      <h2>{snippet.headline}</h2>
      <h4>{snippet.subheadline}</h4>
      <div>{@html renderMarkdown(snippet.text)}</div>
      <div class="spacer"></div>
    {/each}
  </section>
</div>

<!-- Philosophy Modal -->
<RaspbPhilosophyModal bind:this={philosophyModal} />

<!-- Balance Modals -->
<!-- Zeit Modal -->
<dialog bind:this={zeitModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div class="flex items-center gap-4 mb-6">
      <div class="text-5xl">⚡</div>
      <h2 class="text-2xl font-bold text-primary no-padding">Zeit - Schnelle Umsetzung</h2>
    </div>
    
    <div class="prose max-w-none">
      <p class="text-base leading-relaxed">
        Zeit ist in der digitalen Welt ein entscheidender Faktor. Während andere Agenturen Monate für die Umsetzung benötigen, liefern wir dank unserer einzigartigen raspb-Methode bereits nach wenigen Tagen erste Ergebnisse.
      </p>
      
      <p class="text-base leading-relaxed">
        Unser Geheimnis liegt in der perfekten Kombination aus bewährten Bausteinen, KI-gestützten Entwicklungsprozessen und der Expertise unseres Teams. Wir haben über Jahre hinweg ein Ökosystem aus wiederverwendbaren Komponenten entwickelt, das es uns ermöglicht, auch komplexe Projekte in Rekordzeit umzusetzen - ohne Kompromisse bei der Qualität.
      </p>
      
      <p class="text-base leading-relaxed">
        Agile Entwicklungsmethoden sorgen dafür, dass Sie bereits während der Entwicklung Feedback geben können und das Endergebnis genau Ihren Vorstellungen entspricht. So sparen wir nicht nur Zeit, sondern stellen auch sicher, dass das Projekt von Anfang an in die richtige Richtung läuft.
      </p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Kosten Modal -->
<dialog bind:this={kostenModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div class="flex items-center gap-4 mb-6">
      <div class="text-5xl">💰</div>
      <h2 class="text-2xl font-bold text-primary no-padding">Kosten - Transparente Festpreise</h2>
    </div>
    
    <div class="prose max-w-none">
      <p class="text-base leading-relaxed">
        Schluss mit bösen Überraschungen! Bei raspb erhalten Sie von Anfang an transparente Festpreise ohne versteckte Kosten. Unser intelligenter Online-Konfigurator ermittelt bereits vor Projektbeginn einen verbindlichen Preis - basierend auf Ihren konkreten Anforderungen.
      </p>
      
      <p class="text-base leading-relaxed">
        Im Gegensatz zu vielen anderen Anbietern gibt es bei uns keine monatlichen Abogebühren oder Zwangsabnahmen. Sie zahlen einmal für die Entwicklung und erhalten Ihre fertige Lösung - komplett in Ihrem Besitz. Das erste Jahr Hosting und Wartung ist bereits inklusive, danach können Sie frei entscheiden, wie Sie mit Ihrem Projekt verfahren möchten.
      </p>
      
      <p class="text-base leading-relaxed">
        Dank unserer effizienten Entwicklungsmethoden und dem raspb-Ökosystem können wir Ihnen ein unschlagbares Preis-Leistungs-Verhältnis bieten. Qualität muss nicht teuer sein - bei uns bekommen Sie beides: Höchste Standards zu fairen Preisen.
      </p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Qualität Modal -->
<dialog bind:this={qualitaetModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div class="flex items-center gap-4 mb-6">
      <div class="text-5xl">🏆</div>
      <h2 class="text-2xl font-bold text-primary no-padding">Qualität - Höchste Standards</h2>
    </div>
    
    <div class="prose max-w-none">
      <p class="text-base leading-relaxed">
        Qualität ist bei raspb nicht verhandelbar. Wir setzen ausschließlich auf modernste Webtechnologien und bewährte Frameworks wie SvelteKit, TypeScript, TailwindCSS und Node.js. Jede Zeile Code wird von unseren Experten geschrieben und durchläuft strenge Qualitätskontrollen.
      </p>
      
      <p class="text-base leading-relaxed">
        Unsere eigenentwickelten Module und Komponenten sind über Jahre hinweg gewachsen und in unzähligen Projekten erprobt. Sie profitieren von dieser Erfahrung und erhalten Lösungen, die nicht nur heute funktionieren, sondern auch zukunftssicher sind. Performance, Sicherheit und Benutzerfreundlichkeit stehen dabei immer im Fokus.
      </p>
      
      <p class="text-base leading-relaxed">
        Durch kontinuierliche Code-Reviews, automatisierte Tests und den Einsatz modernster Entwicklungstools stellen wir sicher, dass Ihr Projekt den höchsten Qualitätsstandards entspricht. Das Ergebnis: Robuste, skalierbare und wartungsfreundliche Lösungen, die Ihnen langfristig Freude bereiten.
      </p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../app.css';

  .home-content-wrapper {
    .direct-section {
      @apply m-auto mb-10 w-full max-w-7xl p-4;
    }
    .benefits {
      @apply flex flex-wrap gap-2;
      .item {
        @apply text-mediumGrey bg-lightGrey w-fit rounded-lg p-2;
      }
    }
    .image-container {
      @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
      .solution-image {
        @apply h-full w-full bg-cover bg-center bg-no-repeat;
        background-image: url('/images/visualization-2.png');
      }
    }

    /* Services Grid Styles */
    .services-grid {
      @apply grid grid-cols-1 gap-6 lg:grid-cols-2;

      .service-card {
        @apply from-lightGrey/70 via-lightGrey/90 to-lightGrey/45 border-lightGrey/50 flex flex-col justify-between rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg;

        .service-card-header {
          @apply mb-4 flex min-w-full flex-wrap items-center gap-4;

          .service-icon {
            @apply text-4xl;
          }

          h3 {
            @apply text-darkGrey text-xl font-semibold;
          }
        }

        p {
          @apply text-neutral mb-4;
        }

        .service-features {
          @apply mb-6 space-y-2;

          li {
            @apply text-neutral flex items-start text-sm;

            &::before {
              @apply from-purple to-pink mt-1.5 mr-3 h-2 w-2 min-w-2 rounded-full bg-gradient-to-r;
              content: '';
            }
          }
        }

        .service-list {
          @apply mt-4 grid grid-cols-1 gap-4 md:grid-cols-2;

          .service-item {
            @apply flex items-start gap-3;

            .service-icon {
              @apply text-2xl;
            }

            h4 {
              @apply text-darkGrey font-semibold;
            }

            p {
              @apply text-neutral text-sm;
            }
          }
        }

        .service-examples {
          @apply mb-4 flex flex-wrap gap-2;

          .example-tag {
            @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
          }
        }

        .service-card-actions {
          @apply mt-auto;
          &.push-right {
            @apply flex items-center justify-end;
          }
        }
      }
    }

    /* Balance Section Styles */
    .balance-section {
      @apply flex flex-col items-center justify-center;

      .balance-grid {
        @apply grid grid-cols-1 gap-8 lg:grid-cols-3;

        .balance-card {
          @apply from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br p-6 text-center;

          .balance-icon {
            @apply mb-4 text-5xl;
          }

          .balance-content {
            h3 {
              @apply text-darkGrey mb-4 text-xl font-semibold;
            }

            p {
              @apply text-neutral mb-4;
            }

            .balance-features {
              @apply flex flex-wrap justify-center gap-2;

              .feature-tag {
                @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
              }
            }

            .tech-stack {
              @apply flex flex-wrap items-center justify-center gap-4;

              .tech-logo {
                @apply h-12 w-12 rounded-lg;
                &.long {
                  @apply h-12 w-24;
                }
                &.smaller {
                  @apply h-10;
                }
              }
            }
          }
        }
      }

      .balance-image {
        @apply mt-12 overflow-hidden rounded-2xl shadow-lg;

        img {
          @apply h-auto w-full;
        }
      }
    }

    /* Features Section Styles */
    .features-section {
      @apply flex flex-col items-center justify-center;

      .features-grid {
        @apply grid grid-cols-1 gap-8 lg:grid-cols-2;

        .feature-card {
          @apply from-accent/5 to-secondary/5 rounded-2xl bg-gradient-to-br p-6;

          .feature-icon {
            @apply mb-4 text-4xl;
          }

          .feature-content {
            h3 {
              @apply text-darkGrey mb-3 text-xl font-semibold;
            }

            p {
              @apply text-neutral mb-4;
            }

            .feature-list {
              @apply space-y-2;

              li {
                @apply text-neutral flex items-center text-sm;

                &::before {
                  @apply from-accent to-secondary mr-3 h-2 w-2 min-w-2 rounded-full bg-gradient-to-r;
                  content: '';
                }
              }
            }

            .contact-info {
              @apply flex items-center gap-4;

              .contact-avatar {
                img {
                  @apply h-15 w-15 rounded-full shadow-md;
                }
              }

              .contact-details {
                strong {
                  @apply text-darkGrey block font-semibold;
                }

                p {
                  @apply text-neutral text-sm;
                }
              }
            }

            .price-benefits {
              @apply space-y-2;

              .price-item {
                @apply flex items-center gap-3;

                .price-check {
                  @apply text-success text-lg font-bold;
                }

                span:last-child {
                  @apply text-neutral text-sm;
                }
              }
            }

            .solution-types {
              @apply flex flex-wrap gap-2;

              .solution-tag {
                @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
              }
            }
          }
        }
      }

      .features-image {
        @apply mt-12 overflow-hidden rounded-2xl shadow-lg;

        img {
          @apply h-auto w-full;
        }
      }
    }

    /* CTA Section Styles */
    .cta-section {
      @apply from-primary/5 via-secondary/5 to-accent/5 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br text-center;

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

          .cta-primary {
            @apply px-8 py-4 text-lg;
          }
        }

        .cta-note {
          @apply text-neutral bg-lightGrey/50 rounded-lg p-4 text-sm;
        }
      }
    }
  }
</style>
