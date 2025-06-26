<script lang="ts">
  import SLIDER from '$lib/components/slider.svelte';
  import markdownit from 'markdown-it';
  import Section from '$lib/components/section.svelte';
  import { goto } from '$app/navigation';

  export let data: any;

  const md = markdownit();

  function renderMarkdown(content: string) {
    return md.render(content);
  }
</script>

<svelte:head>
  <title>raspb Webservices</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="home-content-wrapper">
  <Section type={'centerTeaser'}>
    <div class="animate-fade-in-up flex w-full flex-col items-center justify-center text-center">
      <h1 class="massive">Digital Experience <span class="inner-text-special">nach Maß</span></h1>
      <h3>skalierbar - sicher - nach bewährter raspb Philosophie - super günstig</h3>
      <button
        class="btn-basic"
        onclick={() => {
          goto('/einblicke');
        }}>mehr erfahren</button
      >
    </div>

    <div class="massive-spacer"></div>
    <div class="massive-spacer"></div>

    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
      <div class="animate-fade-in-from-side mr-8">
        <h2>Für KMUs, für Vereine, für Stiftungen, ... <span class="inner-text-special">für alle</span></h2>
        <p>
          Jeder, der mit seiner Uneternehmung oder Idee im Internet sichtbar werden und seine Inhalte an seine Zielgruppe bringen möchte, findet hier die
          perfekte Lösung.
        </p>
        <p>
          Ob einfache Corporate Website, maßgeschneiderte CMS-Lösungen oder individuelle Web-Applikationen. Sie bekommen von uns alles aus einer Hand. Weniger
          Reibungsverluste, weniger Stress, kohärente Ergebnisse:
        </p>
        <div class="benefits">
          <div class="item">Konzept</div>
          <div class="item">Design</div>
          <div class="item">UI / UX</div>
          <div class="item">Programmierung (Frontend & Backend)</div>
          <div class="item">Datenmodellierung</div>
          <div class="item">Hosting / Administration</div>
          <div class="item">Domain- / DNS-Konfiguration</div>
          <div class="item">Projektmanagement</div>
        </div>
      </div>
      <div>
        <div class="image-container">
          <div class="solution-image"></div>
        </div>
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
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <div class="card from-lightGrey/70 via-lightGrey/90 to-lightGrey/45 bg-gradient-to-br card-md w-full shadow-sm">
          <div class="card-body">
            <h2 class="card-title no-padding">Webseiten</h2>
            <p class="no-padding pt-3">
              Von eleganten Onepagern bis hin zu umfassenden Unternehmensauftritten und professionellen Blogs - wir entwickeln Webseiten, die Ihre Zielgruppe
              begeistern.
            </p>
            <ul class="mt-2 mb-3">
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Responsives Design - perfekte Darstellung auf jedem Gerät
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                State of the art - Nutzung modernster Webtechnologien
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Performant, sicher, benutzerfreundlich
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Individuell und flexibel erweierbar
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Ihre Webseite, Ihr Code - kein geschlossenes System
              </li>
            </ul>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Projekt kalkulieren & direkt den Preis erfahren</button>
            </div>
          </div>
        </div>

        <div class="card rom-lightGrey/70 via-lightGrey/90 to-lightGrey/45 bg-gradient-to-br card-md w-full shadow-sm">
          <div class="card-body">
            <h2 class="card-title no-padding">Custom CMS</h2>
            <p class="no-padding pt-3">
              Ein Content-Management-System, gibt Ihnen auch zukünftig die volle Kontrolle über Ihre Inhalte an die Hand. Wir entwickeln für Sie eine
              maßgeschneiderte Lösunge, die all Ihre Anforderungen erfüllt.
            </p>
            <ul class="mt-2 mb-3">
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 rounded-full bg-gradient-to-r"></div>
                Volle Kontrolle über Ihre Inhalte
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Sicher, schnell und einfach
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Wartungsarm und beliebig erweiterbar
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Bestehende Webseiten nachträglich "editierbar" machen
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Headless: erfasste Inhalte auch an anderer Stelle nutzen
              </li>
            </ul>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Projekt kalkulieren & direkt den Preis erfahren</button>
            </div>
          </div>
        </div>

        <div class="card rom-lightGrey/70 via-lightGrey/90 to-lightGrey/45 bg-gradient-to-br card-md w-full shadow-sm">
          <div class="card-body">
            <h2 class="card-title no-padding">Applications (Apps)</h2>
            <p class="no-padding pt-3">
              Webanwendungen und Mobile-Applications - mit einer überschauberen Komplexität - können ebenfalls mit der raspb Methode schnell und günstig von uns
              entwickelt werden!
            </p>
            <ul class="mt-2 mb-3">
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Ihre Webseite als App - oder Start auf weißer Leinwand
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                PWA - (Progressive Web Application) powered
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Service Worker: Offline-Fähigkeiten
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Service Worker: Push Benachrichtigungen
              </li>
              <li class="text-neutral my-1 flex items-center text-lg">
                <div class="from-wine to-pink mr-3 h-2.5 w-2.5 min-w-2.5 rounded-full bg-gradient-to-r"></div>
                Entwickelte Anwendungen können in die App Stores gebracht werden (iOS & Android)
              </li>
            </ul>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Projekt kalkulieren & direkt den Preis erfahren</button>
            </div>
          </div>
        </div>

        <div class="card rom-lightGrey/70 via-lightGrey/90 to-lightGrey/45 bg-gradient-to-br card-md w-full shadow-sm">
          <div class="card-body">
            <h2 class="card-title no-padding">Individualentwicklung</h2>
            <p class="no-padding pt-3">
              Möchten Sie einen ganz bestimmten Use-Case umsetzen, der in keine der Kategorien passt? Haben Sie einen einfachen Wunsch, zögern aber komplexe
              Systeme für dessen Lösung einzuführen? Wir entwickeln auch einzelne Bestandteile, Module, Komponenten - nach Ihren Vorgaben... Zum Beispiel eine
              Event-Registrierung, ein Daten-Dashboard oder ein schickes UI, um einfach die Ausgabe einer API darzustellen.
            </p>
            <p><strong>Sprechen Sie uns an, wir finden gemeinsam heraus, ob Ihr Vorhaben nach Ihren Vorstellungen von uns umgesetzt werden kann.</strong></p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Jetzt Anfragen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="flex flex-col items-center justify-center">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1>Die perfekte <span class="inner-text-special">Balance</span></h1>
        <p class="teaser">
          Wir verstehen, dass erfolgreiche Projekte das optimale Gleichgewicht zwischen Zeit, Kosten und Qualität erfordern. Unsere Philosophie "perfectly
          balanced" steht für diese harmonische Abstimmung aller Faktoren.
        </p>
      </div>
      <div class="spacer"></div>
      <p>
        Zeit: Schnelle Umsetzung durch agile Entwicklungsprozesse, Ki Unterstützung und bewehrtes Systenm von Best Practices Bausteinen und
        Individuelentwicklung von Experten. Wie können wir so schnell sein
      </p>
      <p>
        Kosten: Transparente Festpreise ohne vesteckte Kosten - keine nachfolgeenden Abogebühren - dank der raspb Methode können wir ein unerreichtes
        Preisleistungsverhätnis bieten. Kosten - wie können wir so billig sein?
      </p>
      <p>
        Qualität: Höchste Standards in Design und Programmierung (Bewehrte und geprüfte Qualität: Verwendung moderner Webtechnologien, Frameworks,
        eigenentwicklete Module, usw. (welche? auflisten) geprüft von Experten, von Menschen)
      </p>
    </div>
  </Section>

  <Section>
    <div class="flex flex-col items-center justify-center">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1>Was uns <span class="inner-text-special">auszeichnet</span></h1>
        <p class="teaser">Unsere Alleinstellungsmerkmale machen den Unterschied für Ihren Erfolg. Erfahren Sie, warum Kunden raspb wählen.</p>
      </div>
      <div class="spacer"></div>
      <p>Alles aus einer Hand Von der ersten Beratung über Design und Programmierung bis hin zur Wartung - wir begleiten Sie durch den gesamten Prozess.</p>
      <p>
        Persönlicher Ansprechpartner Sie haben einen festen Ansprechpartner, der Ihr Projekt von Anfang bis Ende betreut und Ihre Anforderungen genau versteht.
      </p>
      <p>
        Transparente Festpreise Durch unseren Online-Fragebogen erhalten Sie klare, verbindliche Festpreise ohne versteckte Kosten oder böse Überraschungen.
        Transparente Preisgestaltung durch Online-Konfigurator
      </p>
      <p>
        Maßgeschneiderte Lösungen Jedes Projekt ist einzigartig. Wir entwickeln individuell auf Ihre Bedürfnisse zugeschnittene Lösungen statt 08/15-Produkte.
      </p>
    </div>
  </Section>

  <Section>
    <div class="flex flex-col items-center justify-center">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1>Lassen Sie uns <span class="inner-text-special">gemeinsam starten</span></h1>
        <p class="teaser">
          Bereit für Ihr nächstes digitales Projekt? Kontaktieren Sie uns für eine unverbindliche Beratung oder konfigurieren Sie direkt Ihr individuelles
          Angebot.
        </p>
      </div>
      <div class="spacer"></div>
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

<style lang="postcss">
  @reference '../app.css';

  .card {
    @apply transition-transform duration-300 cursor-default;
    &:hover {
      @apply translate-y-1.5;
    }
  }

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
    .cta-area {
      @apply mt-8;
    }

    .image-container {
      @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
      .solution-image {
        @apply h-full w-full bg-cover bg-center bg-no-repeat;
        background-image: url('/images/visualization-2.png');
      }
    }
  }
</style>
