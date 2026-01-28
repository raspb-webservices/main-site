<script lang="ts">
  import { m } from '$lib/paraglide/messages';

  let { config } = $props();

  // PWA-specific variables
  let pwaApproach: string = $state('new'); // 'new' or 'extend'
  let pwaExistingUrl: string = $state('');

  // CMS-specific variables
  let cmsComplexity: number = $state(50); // 0-100 scale
  let cmsContentStructure: string = $state('');

  // General project variables
  let serviceLevel: number = $state(50); // 0 = Full-Service, 100 = Active Participation
  let engineeringApproach: number = $state(50); // 0 = Quick & Dirty, 100 = Over-engineered
  let specialRequirements: string = $state('');
  let projectGoal: string = $state('');
  let targetAudience: string = $state('');
  let timelinePreference: string = $state('moderate');
  let specificDeadline: string = $state('');
  let budgetRange: string = $state('');

  // Reactive updates to config
  $effect(() => {
    if (config.subType === 'pwaSimple' || config.subType === 'pwaExtended') {
      config.pwaApproach = pwaApproach;
      config.pwaExistingUrl = pwaExistingUrl;
    }

    if (config.subType === 'cms' || config.subType === 'cmsPlus') {
      config.cmsComplexity = cmsComplexity;
      config.cmsContentStructure = cmsContentStructure;
    }

    config.serviceLevel = serviceLevel;
    config.engineeringApproach = engineeringApproach;
    config.specialRequirements = specialRequirements;
    config.projectGoal = projectGoal;
    config.targetAudience = targetAudience;
    config.timelinePreference = timelinePreference;
    config.specificDeadline = specificDeadline;
    config.budgetRange = budgetRange;
  });

  const timelineOptions = [
    { value: 'urgent', label: 'Schnellstmöglich - Zeit ist entscheidend' },
    { value: 'fast', label: 'Sehr schnell - kann einige Tage/Wochen warten' },
    { value: 'moderate', label: 'Längere Projektlaufzeit - mehrere Monate' },
    { value: 'flexible', label: 'Kein Zeitdruck - alles vorbereitet' },
    { value: 'delayed', label: 'Langsamer Start - Konzeption noch nicht fertig' },
    { value: 'deadline', label: 'Konkretes Datum in der Zukunft' },
    { value: 'whenever', label: 'Ganz egal - fertig ist fertig' }
  ];

  const budgetOptions = [
    { value: 'small', label: 'Bis 5.000 €' },
    { value: 'medium', label: '5.000 € - 15.000 €' },
    { value: 'large', label: '15.000 € - 30.000 €' },
    { value: 'xlarge', label: '30.000 € - 50.000 €' },
    { value: 'enterprise', label: 'Über 50.000 €' },
    { value: 'flexible', label: 'Flexibel - abhängig vom Umfang' }
  ];
</script>

<div class="step-header">
  <h1>
    {m['wizard_stepBasicDetails_titleFirst']()} <span class="inner-text-special">{m['wizard_stepBasicDetails_titleHighlight']()}</span>
    {m['wizard_stepBasicDetails_titleSecond']()}
  </h1>
  <p class="teaser">{m['wizard_stepBasicDetails_teaser']()}</p>
</div>

<div class="basic-details-section">
  <!-- Project Description -->
  <div class="form-control mb-8 w-full">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m['wizard_form_projectDescription']()}</span>
    </label>

    <p class="description-subtitle">{m['wizard_form_projectDescription_subTitle']()}</p>

    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={config.projectType === 'app' || config.projectType === 'aiSolution'
        ? m['wizard_form_placeholders_webApplication']()
        : config.projectType === 'freestyle'
          ? m['wizard_form_placeholders_freestyle']()
          : m['wizard_form_placeholders_default']()}
      rows="8"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{m['wizard_form_characters']({ count: config.description.length })}</span>
    </div>
  </div>

  <div class="details-grid">
    <!-- PWA-specific Section -->
    {#if config.subType === 'pwaSimple' || config.subType === 'pwaExtended'}
      <div class="card detail-card">
        <div class="card-body prose">
          <div class="detail-card-header">
            <h3 class="card-title no-padding">Du hast eine PWA - Progressive Web Application - als Wunschprojekt ausgewählt</h3>
            <div class="detail-icon">📱</div>
          </div>
          <p>
            Der perfekte Wahl für eine schnelle, flexible Anwendungen mit größerem Funktionsumfang als eine Webseite, aber mit weniger Komplexität als native
            iOS oder Android Apps.
          </p>
          <p>
            Bleibt die Frage: Möchste du eine bestehende Webseite oder Webanwendugn zu einer PWA ausbauen oder soll eine entsprechende Anwendung auf der grünen
            Wiese neu entwickelt werden?
          </p>
          <div class="form-section">
            <div class="section-label">
              <span class="label-icon">🔧</span>
              Ansatz wählen
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input
                  type="radio"
                  name="pwaApproach"
                  value="new"
                  bind:group={pwaApproach}
                  class="radio radio-primary"
                />
                <div class="radio-content">
                  <span class="radio-title">Neu starten</span>
                  <span class="radio-description">Eine komplett neue PWA entwickeln</span>
                </div>
              </label>
              
              <label class="radio-option">
                <input
                  type="radio"
                  name="pwaApproach"
                  value="extend"
                  bind:group={pwaApproach}
                  class="radio radio-primary"
                />
                <div class="radio-content">
                  <span class="radio-title">Bestehendes ausbauen</span>
                  <span class="radio-description">Eine vorhandene Webseite oder App zur PWA erweitern</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- CMS-specific Section -->
    {#if config.subType === 'cms' || config.subType === 'cmsPlus'}
      <div class="detail-card cms-card">
        <div class="card-icon">📝</div>
        <h3 class="card-title">Content Management System</h3>
        <p class="card-description">
          Ein CMS ermöglicht komfortable Inhaltsverwaltung – von einer einzelnen bearbeitbaren Seite bis zu komplexen Redaktionssystemen mit hunderten Objekten,
          Berechtigungen und Sonderfunktionen.
        </p>

        <div class="form-section">
          <div class="section-label">
            <span class="label-icon">📊</span>
            Komplexität einschätzen
          </div>
          <div class="slider-container">
            <div class="slider-labels">
              <span class="slider-label-left">Einfach</span>
              <span class="slider-label-right">Sehr komplex</span>
            </div>
            <input type="range" min="0" max="100" bind:value={cmsComplexity} class="custom-slider complexity-slider" />
            <div class="slider-value">
              Komplexität: {cmsComplexity < 25
                ? 'Einfach (wenige Seiten)'
                : cmsComplexity < 50
                  ? 'Moderat (mehrere Seitentypen)'
                  : cmsComplexity < 75
                    ? 'Komplex (viele Inhaltsbausteine)'
                    : 'Sehr komplex (Redaktionssystem)'}
            </div>
          </div>
        </div>

        <div class="form-section">
          <label for="cmsContentStructure" class="section-label">
            <span class="label-icon">🗂️</span>
            Beschreibe die Inhaltsstruktur
          </label>
          <textarea
            id="cmsContentStructure"
            bind:value={cmsContentStructure}
            placeholder="z.B. Welche Arten von Inhalten sollen verwaltet werden? Wie viele Seiten/Objekte? Welche Berechtigungen?"
            class="form-textarea"
            rows="4"
          ></textarea>
        </div>
      </div>
    {/if}

    <!-- Service Level -->
    <div class="detail-card">
      <div class="card-icon">🤝</div>
      <h3 class="card-title">Full-Service oder aktive Beteiligung?</h3>
      <p class="card-description">
        Wie viel möchtest du selbst beitragen? Stellst du strukturierte Inhalte, Bilder und Assets zur Verfügung, oder sollen wir alles übernehmen – von Texten
        über Design bis Konzeption?
      </p>

      <div class="form-section">
        <div class="slider-container">
          <div class="slider-labels">
            <span class="slider-label-left">Full-Service<br /><small>Alles abnehmen</small></span>
            <span class="slider-label-right">Aktive Beteiligung<br /><small>Ich liefere viel zu</small></span>
          </div>
          <input type="range" min="0" max="100" bind:value={serviceLevel} class="custom-slider" />
          <div class="slider-value">
            {serviceLevel < 20
              ? 'Kompletter Full-Service – ihr übernehmt alles'
              : serviceLevel < 40
                ? 'Überwiegend Full-Service mit meinen Inputs'
                : serviceLevel < 60
                  ? 'Ausgeglichene Zusammenarbeit'
                  : serviceLevel < 80
                    ? 'Ich liefere viel zu, ihr unterstützt'
                    : 'Maximale Eigenleistung – ihr setzt nur um'}
          </div>
        </div>
        <p class="hint-text">💡 Je mehr du selbst beisteuerst, umso geringer fallen die Kosten aus.</p>
      </div>
    </div>

    <!-- Engineering Approach -->
    <div class="detail-card">
      <div class="card-icon">⚙️</div>
      <h3 class="card-title">Quick & Dirty oder Over-engineered?</h3>
      <p class="card-description">
        Ein kleiner Unternehmensauftritt braucht nicht die Security-Features eines Online-Bankings. Was ist dir wichtiger: schnell, günstig und innovativ, oder
        bullet-proof, hochsicher und hochverfügbar?
      </p>

      <div class="form-section">
        <div class="slider-container">
          <div class="slider-labels">
            <span class="slider-label-left">Quick & Dirty<br /><small>Schnell, flexibel</small></span>
            <span class="slider-label-right">Over-engineered<br /><small>Sicher, robust</small></span>
          </div>
          <input type="range" min="0" max="100" bind:value={engineeringApproach} class="custom-slider engineering-slider" />
          <div class="slider-value">
            {engineeringApproach < 20
              ? 'Pragmatisch & schnell – MVP-Ansatz'
              : engineeringApproach < 40
                ? 'Solide Basis mit Fokus auf Speed'
                : engineeringApproach < 60
                  ? 'Ausgewogener Mittelweg'
                  : engineeringApproach < 80
                    ? 'Hohe Qualität & Sicherheit'
                    : 'Maximum Security & Verfügbarkeit'}
          </div>
        </div>
      </div>
    </div>

    <!-- Special Requirements -->
    <div class="detail-card">
      <div class="card-icon">✨</div>
      <h3 class="card-title">Besonderheiten deines Projekts</h3>
      <p class="card-description">
        Gibt es externe Systeme oder Dienste, die angebunden werden müssen? Spezielle Anforderungen, die dein Projekt vom Standard abheben?
      </p>

      <div class="form-section">
        <textarea
          bind:value={specialRequirements}
          placeholder="z.B. Integration mit ERP-System, spezielle API-Anbindungen, Barrierefreiheit, mehrsprachig..."
          class="form-textarea"
          rows="5"
        ></textarea>
      </div>
    </div>

    <!-- Project Goal -->
    <div class="detail-card">
      <div class="card-icon">🎯</div>
      <h3 class="card-title">Projektziel & Erfolgsmessung</h3>
      <p class="card-description">Beschreibe das Ziel präzise: Was möchtest du erreichen? Lässt sich das messen? Wann gilt die Umsetzung als Erfolg?</p>

      <div class="form-section">
        <textarea
          bind:value={projectGoal}
          placeholder="z.B. 100 neue Leads pro Monat, 50% weniger Support-Anfragen, erfolgreicher Produktlaunch..."
          class="form-textarea"
          rows="5"
        ></textarea>
      </div>
    </div>

    <!-- Target Audience -->
    <div class="detail-card">
      <div class="card-icon">👥</div>
      <h3 class="card-title">Zielgruppe</h3>
      <p class="card-description">Welche Personengruppe wird mit deiner Webseite/Anwendung arbeiten? Kennst du ihre Bedürfnisse?</p>

      <div class="form-section">
        <textarea
          bind:value={targetAudience}
          placeholder="z.B. B2B-Kunden, Endverbraucher 25-45 Jahre, technisch versierte Nutzer, internationale Zielgruppe..."
          class="form-textarea"
          rows="4"
        ></textarea>
      </div>
    </div>

    <!-- Timeline -->
    <div class="detail-card">
      <div class="card-icon">⏱️</div>
      <h3 class="card-title">Zeitliche Vorstellungen</h3>
      <p class="card-description">Wie dringend ist das Projekt? Gibt es einen konkreten Zeitrahmen oder Deadline?</p>

      <div class="form-section">
        <label for="timeline" class="section-label">Zeitrahmen auswählen</label>
        <select id="timeline" bind:value={timelinePreference} class="form-select">
          {#each timelineOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>

        {#if timelinePreference === 'deadline'}
          <div class="form-section mt-4">
            <label for="specificDeadline" class="section-label">
              <span class="label-icon">📅</span>
              Konkretes Datum
            </label>
            <input id="specificDeadline" type="date" bind:value={specificDeadline} class="form-input" />
          </div>
        {/if}
      </div>
    </div>

    <!-- Budget -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="datail-card-header">
          <h3 class="card-title no-padding">Budgetrahmen</h3>
          <div class="detail-icon">💰</div>
        </div>
        <p class="no-padding">
          Um sicherzustellen, dass der erwartete Funktionsumfang in dein Budget passt, hilft uns eine grobe Einschätzung. Möglicherweise gibt es auch Raum für
          zusätzliche Features!
        </p>

        <div class="form-section">
          <label for="budget" class="section-label">Budget-Range</label>
          <select id="budget" bind:value={budgetRange} class="form-select">
            <option value="">Bitte auswählen...</option>
            {#each budgetOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Freestyle Notice -->
    {#if config.subType === 'freestyle'}
      <div class="card detail-card">
        <div class="card-icon">🚀</div>
        <h3 class="card-title">Freestyle / KI Use Case</h3>
        <p class="card-description">
          Freestyle- und KI-Projekte sind keine Festpreisprojekte, sondern werden nach Time, Material & Effort abgerechnet. Wir schätzen die Komplexität und
          buchen ein Kontingent an Manntagen. Wenn das aufgebraucht ist, kann nachbudgetiert werden – übrige Ressourcen werden verteilt oder ausgezahlt.
        </p>
        <div class="info-box">
          <strong>Du buchst den Experten</strong> und setzt ihn ein, wie du es für richtig hältst.
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference '../../../../app.css';

  .step-header {
    @apply border-t-base-content/40 mt-0 mb-14 border-t pt-8 text-center md:border-t-0;

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 m-auto max-w-4xl text-center;
    }
  }

  .basic-details-section {
    @apply mb-12 md:mx-10 lg:mx-20;

    .description-subtitle {
      @apply text-base-content/70 mb-3 text-sm;
    }

    .form-control {
      @apply w-full;

      .label-text {
        @apply text-base-content;
      }

      .label-text-alt {
        @apply text-base-content/60;
      }
    }

    .textarea {
      @apply border-base-300 text-base-content w-full bg-white;

      &:focus {
        @apply border-primary bg-primary/5;
      }

      &::placeholder {
        @apply text-base-content/50;
      }
    }
  }

  .details-grid {
    @apply mt-8 grid grid-cols-1 gap-6;
  }

  .detail-card {
    @apply border-base-300/80 border bg-white transition-all duration-300;

    &:hover {
      @apply bg-primary/1 border-base-300 shadow-md;
    }

    .detail-card-header {
      @apply mb-4 flex items-center justify-between;

      .detail-icon {
        @apply text-3xl;
      }
    }

    .card-body {
      @apply text-base-content;

      .card-title {
        @apply text-base-content;
      }

      p {
        @apply text-base-content/80;
      }
    }
  }

  .form-section {
    @apply mb-4;

    &:last-child {
      @apply mb-0;
    }
  }

  .section-label {
    @apply text-base-content mb-2 flex items-center gap-2 text-base font-semibold;
    .label-icon {
      @apply text-lg;
    }
  }

  .form-input {
    @apply border-base-300 text-base-content focus:border-primary focus:bg-primary/5 w-full rounded-lg border bg-white px-4 py-3 transition-all;

    &::placeholder {
      @apply text-base-content/50;
    }
  }

  .form-textarea {
    @apply border-base-300 text-base-content focus:border-primary focus:bg-primary/5 w-full rounded-lg border bg-white px-4 py-3 transition-all;

    &::placeholder {
      @apply text-base-content/50;
    }
  }

  .form-select {
    @apply border-base-300 text-base-content focus:border-primary focus:bg-primary/5 w-full cursor-pointer rounded-lg border bg-white px-4 py-3 transition-all;
  }

  .slider-container {
    @apply w-full;

    .slider-labels {
      @apply mb-2 flex justify-between text-sm;

      .slider-label-left,
      .slider-label-right {
        @apply text-base-content/70 font-medium;

        small {
          @apply text-base-content/50 block text-xs;
        }
      }
    }

    .custom-slider {
      @apply h-2 w-full cursor-pointer appearance-none rounded-lg;
      background: linear-gradient(to right, #e0e0e0 0%, #4f46e5 50%, #e0e0e0 100%);

      &::-webkit-slider-thumb {
        @apply bg-primary h-6 w-6 cursor-pointer appearance-none rounded-full shadow-md;
        transition: all 0.2s ease;

        &:hover {
          @apply scale-110 shadow-lg;
        }
      }

      &::-moz-range-thumb {
        @apply bg-primary h-6 w-6 cursor-pointer rounded-full border-0 shadow-md;
        transition: all 0.2s ease;

        &:hover {
          @apply scale-110 shadow-lg;
        }
      }
    }

    .slider-value {
      @apply text-primary mt-3 text-center font-semibold;
    }
  }

  .hint-text {
    @apply text-base-content/60 mt-3 text-sm italic;
  }

  .info-box {
    @apply bg-base-200 border-base-300 text-base-content mt-4 rounded-lg border p-4;
  }

  .radio-group {
    @apply flex flex-row gap-3;

    .radio-option {
      @apply border-base-300 flex flex-1 cursor-pointer items-center gap-3 rounded-lg border bg-white p-4 transition-all duration-200;

      &:hover {
        @apply border-primary/50 bg-primary/5;
      }

      &:has(input:checked) {
        @apply border-primary bg-primary/5;
      }

      input[type='radio'] {
        @apply flex-shrink-0;
      }

      .radio-content {
        @apply flex flex-col gap-1;

        .radio-title {
          @apply text-base-content text-base font-semibold;
        }

        .radio-description {
          @apply text-base-content/70 text-sm;
        }
      }
    }
  }

  .mt-4 {
    margin-top: 1rem;
  }
</style>
