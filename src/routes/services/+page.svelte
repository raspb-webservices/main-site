<script lang="ts">
  import Section from '/components/ui/section.svelte';
  import Stage from '/components/ui/stage.svelte';
  import { m } from '/paraglide/messages';
  import { goto } from '/navigation';
  import { localizeHref } from '/paraglide/runtime';

  /* Visual Assets from Repo */
  const lighthouseImg = '/src/lib/assets/images/perfect-score.jpg';
  const lighthouseMobileImg = '/src/lib/assets/images/perfect-score-mobile.jpg';
</script>

<svelte:head>
  <title>Services | raspb webservices - Digitale Exzellenz & KI</title>
  <meta name="description" content="Entdecken Sie unsere Services: Von High-Performance Web-Apps mit 100% Lighthouse-Score bis hin zu revolutionären KI-Agenten und n8n-Automatisierung." />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box prose py-36 text-center lg:text-left">
    <h1 class="massive animate-fade-in-up leading-tight">
      Digitale Präsenz, die <span class="text-primary">verkauft</span>.<br/>
      KI, die wirklich <span class="text-secondary">arbeitet</span>.
    </h1>
    <p class="teaser animate-fade-in-up max-w-2xl opacity-80">
      Wir bauen nicht einfach nur Software. Wir erschaffen Ihren digitalen Wettbewerbsvorteil – mit handwerklicher Präzision und der Geschwindigkeit modernster KI-Innovation.
    </p>
    <div class="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start animate-fade-in-up">
      <button class="btn btn-primary btn-lg shadow-xl" onclick={() => goto(localizeHref('/wizard'))}>
        Projekt starten
      </button>
      <a href="#web-apps" class="btn btn-outline btn-lg">Unsere Services</a>
    </div>
  </div>
</Stage>

<!-- Pillar 1: Web & App Excellence -->
<div id="web-apps">
  <Section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
      <div class="prose order-2 lg:order-1">
        <div class="badge badge-primary badge-outline mb-4 uppercase tracking-widest font-bold">Web- & App-Excellence</div>
        <h2 class="text-4xl font-bold mb-6">Ihre Konkurrenz lädt noch, <span class="text-primary">Sie konvertieren schon.</span></h2>
        <p class="text-lg leading-relaxed mb-8">
          In einer Welt von 3-Sekunden-Aufmerksamkeitsspannen ist Geschwindigkeit Ihre wichtigste Währung. Wir nutzen <strong>SvelteKit</strong>, um Webseiten zu bauen, die sich wie native Apps anfühlen – blitzschnell, sicher und wartungsarm.
        </p>
        
        <div class="space-y-6">
          <div class="flex gap-4 items-start">
            <div class="bg-primary/10 p-3 rounded-xl text-primary">✅</div>
            <div>
              <h4 class="font-bold mb-1">100% Lighthouse Performance</h4>
              <p class="text-sm opacity-70">Maximale Sichtbarkeit bei Google und perfekte User Experience durch Zero Technical Debt.</p>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <div class="bg-primary/10 p-3 rounded-xl text-primary">🛡️</div>
            <div>
              <h4 class="font-bold mb-1">DSGVO-Konformität by Design</h4>
              <p class="text-sm opacity-70">Kein Cookie-Chaos, keine unnötigen Tracker. Sicherheit, die Vertrauen bei Ihren Kunden schafft.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative order-1 lg:order-2">
        <div class="mockup-browser border bg-base-300 shadow-2xl overflow-hidden animate-fade-in-up">
          <div class="mockup-browser-toolbar">
            <div class="input border border-base-content/10">https://raspb.de/excellence</div>
          </div>
          <img src={lighthouseImg} alt="Lighthouse 100% Score" class="w-full opacity-90 hover:opacity-100 transition-opacity" />
        </div>
        <!-- Floating Mobile Mockup -->
        <div class="absolute -bottom-10 -left-10 hidden xl:block w-48 shadow-2xl rounded-[2rem] border-8 border-base-300 overflow-hidden transform -rotate-6">
          <img src={lighthouseMobileImg} alt="Mobile Lighthouse Score" class="w-full" />
        </div>
      </div>
    </div>
  </Section>
</div>

<!-- Pillar 2: AI & Automation -->
<div class="bg-base-200">
  <Section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
      <div class="relative order-2 lg:order-1">
        <div class="aspect-square rounded-3xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center p-12 shadow-inner">
           <!-- Visual representation of Automation/AI -->
           <div class="grid grid-cols-2 gap-4 w-full h-full">
             <div class="bg-base-100 p-6 rounded-2xl shadow-lg animate-bounce" style="animation-duration: 3s;">
                <span class="text-4xl">🤖</span>
                <p class="text-xs font-bold mt-2 uppercase opacity-50">KI-Agenten</p>
             </div>
             <div class="bg-base-100 p-6 rounded-2xl shadow-lg mt-12 animate-bounce" style="animation-duration: 4s;">
                <span class="text-4xl">🔗</span>
                <p class="text-xs font-bold mt-2 uppercase opacity-50">n8n Workflows</p>
             </div>
             <div class="bg-base-100 p-6 rounded-2xl shadow-lg -mt-6 animate-bounce" style="animation-duration: 5s;">
                <span class="text-4xl">🧠</span>
                <p class="text-xs font-bold mt-2 uppercase opacity-50">RAG / Brain</p>
             </div>
             <div class="bg-base-100 p-6 rounded-2xl shadow-lg mt-6 animate-bounce" style="animation-duration: 3.5s;">
                <span class="text-4xl">📊</span>
                <p class="text-xs font-bold mt-2 uppercase opacity-50">Business Intel</p>
             </div>
           </div>
        </div>
      </div>

      <div class="prose order-1 lg:order-2">
        <div class="badge badge-secondary badge-outline mb-4 uppercase tracking-widest font-bold">AI-Innovation & Automation</div>
        <h2 class="text-4xl font-bold mb-6">Gewinnen Sie Ihren <span class="text-secondary">Arbeitsalltag zurück.</span></h2>
        <p class="text-lg leading-relaxed mb-8">
          Stellen Sie sich vor, Ihre Routineaufgaben erledigen sich von selbst. Wir bauen <strong>KI-Agenten</strong> und <strong>Automatisierungs-Workflows</strong>, die nicht nur Daten schieben, sondern echte Entscheidungen treffen.
        </p>
        
        <div class="card bg-base-100 shadow-xl border-l-4 border-secondary p-6 mb-6">
          <p class="italic opacity-90 m-0">
            "Seit wir n8n und Haley-Agenten einsetzen, sparen wir 15 Stunden pro Woche in der Kundenakquise. Die KI qualifiziert Leads vor, während wir an Projekten arbeiten."
          </p>
          <p class="text-sm font-bold mt-4 opacity-50 m-0">— Ein fiktives, aber realisierbares Kundenziel</p>
        </div>

        <ul class="list-none p-0 space-y-3 font-medium opacity-80">
          <li class="flex items-center gap-3"><span class="text-secondary font-bold">→</span> Intelligente n8n-Workflows</li>
          <li class="flex items-center gap-3"><span class="text-secondary font-bold">→</span> Maßgeschneiderte RAG-Wissensdatenbanken</li>
          <li class="flex items-center gap-3"><span class="text-secondary font-bold">→</span> Voicebots & Chat-Agenten für 24/7 Support</li>
        </ul>
      </div>
    </div>
  </Section>
</div>

<!-- Call to Action -->
<Section>
  <div class="bg-neutral rounded-[3rem] p-12 lg:p-20 text-center text-neutral-content shadow-2xl relative overflow-hidden my-20">
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
    <div class="relative z-10 max-w-3xl mx-auto">
      <h2 class="text-4xl lg:text-5xl font-bold mb-6">Bereit für das nächste Level?</h2>
      <p class="text-xl opacity-80 mb-10">
        Egal ob Sie eine neue digitale Heimat für Ihr Unternehmen suchen oder Ihre Prozesse mit KI revolutionieren wollen – wir sind Ihr Sparringspartner.
      </p>
      <button class="btn btn-primary btn-lg px-12 rounded-full" onclick={() => goto(localizeHref('/wizard'))}>
        Jetzt unverbindlich anfragen
      </button>
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference "../../app.css";
  
  /* Smooth animations and layout adjustments */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>