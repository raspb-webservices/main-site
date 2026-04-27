<script lang="ts">
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
</script>

<svelte:head>
  <title>KI-Potenzial-Audit | raspb webservices</title>
  <meta
    name="description"
    content="Erfahren Sie mit dem KI-Potenzial-Audit von raspb, wo KI in Ihrem Unternehmen echten ROI bringt. Festpreis ab 990 €, BAFA-Förderung bis 2.800 € möglich."
  />
  <meta property="og:title" content="KI-Potenzial-Audit | raspb webservices" />
  <meta
    property="og:description"
    content="Erfahren Sie mit dem KI-Potenzial-Audit von raspb, wo KI in Ihrem Unternehmen echten ROI bringt. Festpreis ab 990 €, BAFA-Förderung bis 2.800 € möglich."
  />
</svelte:head>

<!-- 1. Hero Section -->
<Stage style="fancy-gradient">
  <div class="inner-box reduced prose py-36">
    <div class="badge badge-primary mb-6 font-bold tracking-widest uppercase">KI-Potenzial-Audit</div>
    <h1 class="animate-fade-in-up">
      Ihr Unternehmen steckt voller KI-Potenzial.<br />
      <span class="inner-text-special">Wissen Sie, wo?</span>
    </h1>
    <p class="teaser animate-fade-in-up">
      In wenigen Tagen wissen Sie, welche Prozesse sich lohnen, was es kostet — und wie Sie bis zu 2.800&nbsp;€ Förderung mitnehmen.
      Ohne Berater-Geschwätz. Ohne Lock-in.
    </p>
    <div class="flex flex-wrap gap-4">
      <a href="mailto:hallo@raspb.de" class="btn-basic animate-fade-in-from-side">
        Kostenloses Erstgespräch vereinbaren
      </a>
    </div>
  </div>
</Stage>

<!-- 2. Problem Section -->
<Section>
  <div class="prose mx-auto max-w-3xl text-center">
    <h2 class="add-padding">
      KMUs verpassen gerade den <span class="inner-text-special">entscheidenden Moment</span>.
    </h2>
    <p class="teaser boxed">
      KI wird täglich besser — und während Ihre Mitbewerber bereits testen, warten viele Unternehmen noch auf das richtige Signal.
    </p>
  </div>
  <div class="massive-spacer"></div>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div class="bg-base-100 border-base-300 rounded-box animate-fade-in-up border p-8">
      <div class="text-primary mb-4 text-4xl font-bold">01</div>
      <h3 class="mb-3 text-lg font-bold">KI-Rückstand</h3>
      <p class="text-sm opacity-70">
        KI-Tools werden täglich besser — Ihre Mitbewerber testen bereits. Wer jetzt nicht einsteigt, kämpft in 2 Jahren mit doppeltem Rückstand.
      </p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box animate-fade-in-up border p-8">
      <div class="text-primary mb-4 text-4xl font-bold">02</div>
      <h3 class="mb-3 text-lg font-bold">Fehlendes Know-how</h3>
      <p class="text-sm opacity-70">
        „Wo fangen wir an?" — diese Frage blockiert viele Unternehmen. Intern fehlt das Wissen, welche Prozesse sich wirklich lohnen.
      </p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box animate-fade-in-up border p-8">
      <div class="text-primary mb-4 text-4xl font-bold">03</div>
      <h3 class="mb-3 text-lg font-bold">Teure Berater</h3>
      <p class="text-sm opacity-70">
        IT-Dienstleister verkaufen teure Projekte statt ehrlicher Beratung. Stunden-Abrechnung ohne klares Ergebnis.
      </p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box animate-fade-in-up border p-8">
      <div class="text-primary mb-4 text-4xl font-bold">04</div>
      <h3 class="mb-3 text-lg font-bold">Verfallende BAFA-Förderung</h3>
      <p class="text-sm opacity-70">
        Fördergelder verfallen ungenutzt. Das BAFA-Programm zahlt bis zu 2.800&nbsp;€ — aber nur, wenn Sie jetzt handeln.
      </p>
    </div>
  </div>
</Section>

<!-- 3. Lösung -->
<Section customColor="#F8F7FC">
  <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
    <div class="prose">
      <div class="badge badge-primary mb-4 font-bold tracking-widest uppercase">Unsere Lösung</div>
      <h2 class="add-padding">
        Der KI-Potenzial-Audit — <span class="inner-text-special">strukturiert, ehrlich, konkret.</span>
      </h2>
      <p>
        Ein strukturierter Analyse-Sprint, der Ihnen zeigt, wo KI in Ihrem Unternehmen echten ROI bringt — und wo nicht.
        Kein Vendor-Lock-in. Kein Folgeauftrag erzwungen. Nur ehrliche Analyse.
      </p>
    </div>
    <div class="space-y-4">
      <div class="bg-base-50 rounded-box flex items-start gap-5 p-6 shadow-sm">
        <div class="from-purple to-pink flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-r text-white font-bold">
          1
        </div>
        <div>
          <h4 class="mb-1 font-bold">Ist-Analyse Ihrer Kernprozesse</h4>
          <p class="text-sm opacity-70">Vertrieb, Verwaltung, Produktion, Service — wir analysieren, was wirklich passiert.</p>
        </div>
      </div>
      <div class="bg-base-50 rounded-box flex items-start gap-5 p-6 shadow-sm">
        <div class="from-purple to-pink flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-r text-white font-bold">
          2
        </div>
        <div>
          <h4 class="mb-1 font-bold">KI-Potenzial-Bewertung</h4>
          <p class="text-sm opacity-70">Pro Prozessbereich: Aufwand vs. Nutzen — realistisch und ohne Hype.</p>
        </div>
      </div>
      <div class="bg-base-50 rounded-box flex items-start gap-5 p-6 shadow-sm">
        <div class="from-purple to-pink flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-r text-white font-bold">
          3
        </div>
        <div>
          <h4 class="mb-1 font-bold">Konkrete Roadmap</h4>
          <p class="text-sm opacity-70">Priorisierte Maßnahmen mit realistischen Kosten — umsetzbar, nicht theoretisch.</p>
        </div>
      </div>
      <div class="bg-base-50 rounded-box flex items-start gap-5 p-6 shadow-sm">
        <div class="from-purple to-pink flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-r text-white font-bold">
          4
        </div>
        <div>
          <h4 class="mb-1 font-bold">Förder-Check & Empfehlung</h4>
          <p class="text-sm opacity-70">Welche BAFA-Programme greifen — und was sich wirklich lohnt, was Hype ist.</p>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- 4. Pakete / Preise -->
<Section>
  <div class="prose mx-auto max-w-3xl text-center">
    <h2 class="add-padding">Transparente Pakete. <span class="inner-text-special">Festpreise.</span></h2>
    <p class="teaser boxed">Keine Überraschungen. Kein Time &amp; Material. Sie wissen vor dem Start, was es kostet.</p>
  </div>
  <div class="massive-spacer"></div>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!-- Basis -->
    <div class="bg-base-50 border-base-300 rounded-box border p-10 shadow-sm">
      <div class="badge badge-primary mb-4 font-bold tracking-widest uppercase">Basis-Audit</div>
      <div class="mb-2 text-5xl font-bold">990&nbsp;€</div>
      <p class="text-sm opacity-60 mb-8">Festpreis · ca. 5 Werktage</p>
      <ul class="basic-list mb-8">
        <li>Ist-Analyse Kernprozesse</li>
        <li>KI-Potenzial-Bewertung</li>
        <li>Schriftliche Roadmap</li>
        <li>BAFA-Förder-Check</li>
      </ul>
      <a href="mailto:hallo@raspb.de?subject=Interesse%20Basis-Audit" class="btn-basic block text-center">
        Basis-Audit anfragen
      </a>
    </div>

    <!-- Premium -->
    <div class="bg-iconic-blue rounded-box p-10 text-white shadow-xl">
      <div class="badge badge-primary mb-4 font-bold tracking-widest uppercase">Premium-Audit</div>
      <div class="mb-2 text-5xl font-bold">1.990&nbsp;€</div>
      <p class="mb-8 text-sm opacity-60">Festpreis · ca. 5 Werktage + 4 Wochen</p>
      <ul class="mb-8 space-y-3">
        <li class="flex items-center gap-3 text-lg font-light">
          <span class="text-primary">&#10003;</span> Ist-Analyse Kernprozesse
        </li>
        <li class="flex items-center gap-3 text-lg font-light">
          <span class="text-primary">&#10003;</span> KI-Potenzial-Bewertung
        </li>
        <li class="flex items-center gap-3 text-lg font-light">
          <span class="text-primary">&#10003;</span> Schriftliche Roadmap
        </li>
        <li class="flex items-center gap-3 text-lg font-light">
          <span class="text-primary">&#10003;</span> BAFA-Förder-Check
        </li>
        <li class="flex items-center gap-3 text-lg font-bold">
          <span class="text-primary">&#10003;</span> Umsetzungsbegleitung 1 Monat
        </li>
        <li class="flex items-center gap-3 text-lg font-bold">
          <span class="text-primary">&#10003;</span> Technische Konzeption 1. Maßnahme
        </li>
        <li class="flex items-center gap-3 text-lg font-bold">
          <span class="text-primary">&#10003;</span> Wöchentlicher Status-Call
        </li>
      </ul>
      <a href="mailto:hallo@raspb.de?subject=Interesse%20Premium-Audit" class="btn-basic block text-center">
        Premium-Audit anfragen
      </a>
    </div>
  </div>

  <!-- BAFA Hinweis -->
  <div class="massive-spacer"></div>
  <div class="from-purple/10 to-pink/10 rounded-box border border-purple/20 bg-linear-to-r p-8 text-center">
    <p class="text-lg font-semibold">
      Beide Pakete sind über das <strong>BAFA-Programm „Beratung von kleinen und mittleren Unternehmen"</strong> förderfähig.
    </p>
    <p class="mt-2 text-base opacity-80">
      Bis zu <strong>2.800&nbsp;€ Zuschuss</strong> möglich — Ihr Netto-Invest beim Basis-Audit kann damit auf unter <strong>0&nbsp;€</strong> sinken.
    </p>
  </div>
</Section>

<!-- 5. Prozess -->
<Section customColor="#F8F7FC">
  <div class="prose mx-auto max-w-3xl text-center">
    <h2 class="add-padding">So läuft es ab — <span class="inner-text-special">in 4 Schritten.</span></h2>
  </div>
  <div class="massive-spacer"></div>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    <div class="text-center">
      <div class="from-purple via-pink to-violet mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-135 text-2xl font-bold text-white">
        1
      </div>
      <h3 class="mb-3 text-lg font-bold">Kostenloses Erstgespräch</h3>
      <p class="text-sm opacity-70">30 Minuten — wir verstehen Ihr Unternehmen, Ihre Prozesse und Ihre Ziele.</p>
    </div>
    <div class="text-center">
      <div class="from-purple via-pink to-violet mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-135 text-2xl font-bold text-white">
        2
      </div>
      <h3 class="mb-3 text-lg font-bold">Audit-Sprint</h3>
      <p class="text-sm opacity-70">Ca. 5 Werktage — Analyse, Interviews, Bewertung. Wir arbeiten strukturiert und effizient.</p>
    </div>
    <div class="text-center">
      <div class="from-purple via-pink to-violet mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-135 text-2xl font-bold text-white">
        3
      </div>
      <h3 class="mb-3 text-lg font-bold">Ergebnis-Präsentation</h3>
      <p class="text-sm opacity-70">Roadmap, Empfehlungen, Förderoption — konkret, schriftlich, sofort nutzbar.</p>
    </div>
    <div class="text-center">
      <div class="from-purple via-pink to-violet mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-135 text-2xl font-bold text-white">
        4
      </div>
      <h3 class="mb-3 text-lg font-bold">Optional: Umsetzung</h3>
      <p class="text-sm opacity-70">Im Premium-Paket: 1 Monat Umsetzungsbegleitung inklusive — kein Zwang, keine Pflicht.</p>
    </div>
  </div>
</Section>

<!-- 6. USPs -->
<Section>
  <div class="prose mx-auto max-w-3xl text-center">
    <h2 class="add-padding">Warum raspb?</h2>
  </div>
  <div class="massive-spacer"></div>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="bg-base-100 border-base-300 rounded-box border p-8">
      <h3 class="mb-3 font-bold">Festpreis — keine Überraschungen</h3>
      <p class="text-sm opacity-70">Sie wissen vor dem Start, was es kostet. Keine Stunden-Abrechnung, kein Scope-Creep.</p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box border p-8">
      <h3 class="mb-3 font-bold">Ehrliche Beratung statt Verkauf</h3>
      <p class="text-sm opacity-70">Wenn KI bei Ihnen keinen ROI bringt, sagen wir das. Wir bauen auf Vertrauen, nicht auf Folgeaufträge.</p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box border p-8">
      <h3 class="mb-3 font-bold">Code-Ownership & kein Lock-in</h3>
      <p class="text-sm opacity-70">Alle Ergebnisse, Dokumente und Konzepte gehören Ihnen — nicht uns.</p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box border p-8">
      <h3 class="mb-3 font-bold">Human in the Loop</h3>
      <p class="text-sm opacity-70">KI beschleunigt unsere Analyse, Experten prüfen und steuern. Keine Blackbox-Ergebnisse.</p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box border p-8">
      <h3 class="mb-3 font-bold">BAFA-Förderung möglich</h3>
      <p class="text-sm opacity-70">Als akkreditierter Beratungsdienstleister begleiten wir Sie durch den Förderantrag. Bis zu 2.800&nbsp;€ Zuschuss.</p>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box border p-8">
      <h3 class="mb-3 font-bold">Für den Mittelstand gemacht</h3>
      <p class="text-sm opacity-70">Speziell für KMU mit 5–50 Mitarbeitern in der DACH-Region — pragmatisch, verständlich, umsetzbar.</p>
    </div>
  </div>
</Section>

<!-- 7. CTA Footer -->
<Stage style="basic-gradient">
  <div class="inner-box reduced prose py-36 text-center">
    <h2 class="animate-fade-in-up text-white">
      Starten Sie jetzt — kostenlos und unverbindlich.
    </h2>
    <p class="teaser boxed animate-fade-in-up text-white/80">
      30 Minuten Erstgespräch. Kein Verkaufsdruck. Nur ehrliche Einschätzung — ob und wie KI bei Ihnen Sinn ergibt.
    </p>
    <div class="massive-spacer"></div>
    <a href="mailto:hallo@raspb.de?subject=KI-Audit%20Erstgespräch" class="btn-basic animate-fade-in-from-side">
      Erstgespräch vereinbaren → hallo@raspb.de
    </a>
  </div>
</Stage>
