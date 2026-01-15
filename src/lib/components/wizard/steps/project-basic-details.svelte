<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { config } = $props();
</script>



<div class="step-header">
  <h1>
    {m['wizard_stepBasicDetails_titleFirst']()} <span class="inner-text-special">{m['wizard_stepBasicDetails_titleHighlight']()}</span>
    {m['wizard_stepBasicDetails_titleSecond']()}
  </h1>
  <p class="teaser">{m['wizard_stepBasicDetails_teaser']()}</p>
</div>


<div class="basic-details-section">
  <div class="form-control mb-8 w-full">

    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m['wizard_form_projectDescription']()}</span>
    </label>

    <p>{m['wizard_form_projectDescription_subTitle']()}</p>

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

  <div class="grid grid-cols-1 gap-6">
    <div class="form-control w-full prose">
      {#if config.subType === 'pwaSimple' || config.subType === 'pwaExtended' }
        <h3>Du hast eine PWA - Progressive Web Application - als Wunschprojekt ausgewählt</h3>
        <p>Diese Wahl ist der perfekte Weg, um eine Anwendung schnell und flexibel zu erstellen. Diese hat einen größeren Funktionsumfang als eine Webseite, aber ist weniger komplex als eine native iOS oder Android Anwendung. Wir bauen flexibel an deiner individuellen App, ganz nach deinen Vorstellungen.</p>
        <p>Bleibt die Frage: Möchste du eine bestehende Webseite oder Webanwendugn zu einer PWA ausbauen oder soll eine entsprechende Anwendung auf der grünen Wiese entwickelt werden werden.</p>
        <p>Neu erstellen oder ausbauen?</p>
        <div class="spacer"></div>
      {/if}
      {#if config.subType === 'cms' || config.subType === 'cmsPlus' }
        <h3>Du hast ein Content Management Syste als Wunschprojekt ausgewählt</h3>
        <p>Diese Wahl ist der perfekte Ansatz um Inhalte komfortabel verwalten zu können. Eine CMS kann eine einzelne Inhaltsseite sein, die ein Nutzer über eine Eingabemaske bearbeiten kann - aber auch eine hoch-komplexes Redakltionssystem mit 100ten Informationsobjekten, berechtigungsabhängige Freigaben und Dutzenden Sonderfunktionen. Auch als Backbone deiner App kann ein CMS eingesetzt werden (headless). Strenggenommen ist auch ein Onlineshop ein CMS. Hier sind die Inhaltsobjekte eben Produkte die verwaltet werden wollen.</p>
        <p>Bitte gib uns hier noch ein paar Infos dazu, wie du die Komplexität einschätzt. Geht es um ein paar bestehende Seiten die bearbeitbar gemacht werden sollen, oder um die Konzeption und Umsetzung vieler Informationsbausteine?</p>
      {/if}

      <div class="spacer"></div>

      <h3>Full-Service oder aktive Beteiligung?</h3>
      <p>Wie viel willst du selbst machen. Was kann beigetragen werden? Details können wir noch im persönlichen Gespräch klären, aber ein grober Indikator ist entscheidend für eine passende Einschätzung.</p>
      <p>Stellst du strukturierte und Aufbereitetet Inhalte zur verfügung oder sollen wir "texten". Was ist mit Bilder, Video, andere Assets, die eingesetzt werden sollen? Hast du ein Styleguide, dessen Gestaltung anzuwenden ist oder muss ein Design neu erfunden werden? Wie sieht es konzeptionell aus. Kennst du nur dein Ziel und suchts jemanden, der dir alles abnimmt, den Weg vorschlägt und ebnet, oder hast du selbst bereits konkrete Vorstellungen (ein Plan, ein Konzept) wie du es erreichen kannst und suchst lediglich jemanden der die Umsetzung übernimmt oder unterstützend zur Seite steht?</p>
      <p>Bitte teil uns hier mit, was du dir wünschst / erwartest. Klar, je mehr du selbst beisteuerst, umso geringer fallen die Kosten aus.</p>

      <div class="spacer"></div>

      <h3>In welche Richtung denkst du eher: Quick and Dirty oder lieber Overengenieered</h3>
      <p>Sind wir mal ehrlich. Ein kleiner Unternehmensauftritt im Internet braucht nicht die Security-Features eines Online-Bankings. Jeder hat hier andere Ansprüche, die das gesamte Projekt bedingen. Bist du eher auf der Seite schnell, günstig, innovativ, aber u.U. auch fehler- und risikoanfällig oder muss es "bullet-proof", hochsicher, hochverfügbar, etc. sein (macht Projekte träge und teuer und schränkt ein - z.B. KI darf nur lokal laufen)</p>
      <p>Teile uns hier doch deine Präferenzen mit. Beide Richtungen haben ihre Daseinsberechtigung. Welche möchtest du für dein Projekt einschlagen?</p>
  
      <div class="spacer"></div>

      <h3>Gibt es Besonderheiten?</h3>
      <p>Jedes IT-Projekt hat vieles, das immer wieder gleich ist. Aber, jedes IT-Projekt ist auch einzigartig, individuell und mitunter sehr speziell. Gibt es deinem Vorhaben Besonderheiten? Müssen externe Systeme, Dienste, usw. angebunden werden?</p>
      <p>Beschreibe hier das, was dein Projekt vom Standard abhebt.</p>

      <div class="spacer"></div>

      <h3>Kannst du das Ziel exakt beschreiben? Was möchtest du mit diesem Projekt erreichen?  Kann man das messen? Wan gilt die Umsetzung als Erfolg?</h3>

      <div class="spacer"></div>

      <h3>Welche Zielgruppe möchtest du bedienen? Welche Personengruppe wird mit deiner Webseite/Anwendung arbeiten?</h3>

      <div class="spacer"></div>

      <h3>Welche zeitlichen Vorstelleungen hast du (auch unrealistische, wie: muss morgen fertig sein)</h3>
      <p>Schnellst möglich, zeit ist hier wirklich entscheidend</p>
      <p>Ich möchte schon sehr schnell Ergebnisse sehen und fertig werden, kann aber auch ein paar Tage / Wochen / Monate warten</p>
      <p>Ich plane mit einer längeren Projektlaufzeit. Ich möchte über mehrere Monate immer mal wieder einen Fortschritt sehen.</p>
      <p>Ich habe alles beisammen, aber keinen Zeitdruck.</p>
      <p>Ich möchte schon mal langsam starten, bin aber mit Konzeption/Zuarbeit die nächste Zeit noch beschäftigt. Es wird sich also - von meiner Seite aus - sich noch hinziehen.</p>
      <p>Ich würde gerne die Fertigstellung auf ein konkretes Datum in der Zukunft planen. Und zwar: </p>
      <p>Ganz egal. Wenn es fertig ist, ist es fertig.</p>

<div class="spacer"></div>

  <h3>Über welchen Budgetrahmen sprechen wir?</h3>
  <p>Die bereits getätigte Auswahl schränkt den Kostenrahmen schon mal deutlich ein. Aber eine Webseite, mit speziellen Anforderungen und sehr vielen Features, die umzusetzen sind, kann schnell das 10fache des Preises erreichen. Um abzugleichen, ob der erwartete Funktionsumfang in das Budget passt, ist es von Vorteil, diese Information hier zu haben. Möglicherweise ist zwischen deinem Zeile und deinem Budget auch noch viel Platz, sodass man zusätzliche Funktionen oder andere Nice-to-haves berücksichtigen kann.</p>

  <div class="spacer"></div>

      <h3>Du hast einen Freestyle Projekt ausgewählt oder möchtest einen KI Use Case Umsetzen?</h3>
      <p>Trotz exakter Beschreibung lassen sich diese Projekte nicht ganz optimal greifen und kurskorrekturen sind im laufenden Projekt zu erwarten. Wir arbeiten stets agil, aber hier gibt es je nach Modus zu viele Unbekannte. Freestyle und KI Projekte sind bei uns daher keine Festpreisprojekte, sondern werden nach Time, Material & Erffort abgerechnet. Das bedeutet, dass wir zu Beginn die Komplexität des Vorhabens schätzen und dann eine Kontingent von  Manntagen für das Projekt buchen lassen. Wenn das aufgebraucht ist, kann nachbudgetuiert werden oder die Weiterarbeit wird eingestellt. Wenn das Projekt abgeschlossen werden kann und noch Ressourcen übrig sind, werden diese entweder auf andere Aufgabe/Projekte verteilt oder ausgezahlt.</p>
      <p>Du buchst den Experten und setzt ihn ein, wie du es für richtig hältst.</p>
    </div>
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
        @apply border-primary bg-primary/1;
      }

      &::placeholder {
        @apply text-base-content/50;
      }
    }
  }
</style>
