<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import { m } from '$lib/paraglide/messages';
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';
  import lighthouseImg from '$lib/assets/images/perfect-score.jpg';
  import lighthouseMobileImg from '$lib/assets/images/perfect-score-mobile.jpg';
  import CTABox from '$lib/components/snippets/cta-box.svelte';
</script>

<svelte:head>
  <title>Services | raspb webservices - Digitale Exzellenz & KI</title>
  <meta
    name="description"
    content="Entdecken Sie unsere Services: Von High-Performance Web-Apps mit 100% Lighthouse-Score bis hin zu revolutionären KI-Agenten und n8n-Automatisierung."
  />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box prose py-36 text-center lg:text-left">
    <h1 class="animate-fade-in-up">
      Digitale Präsenz, die <span class="opacity-65">verkauft</span>.<br />
      KI, die wirklich <span class="opacity-65">für dich arbeitet</span>.
    </h1>
    <p class="teaser animate-fade-in-up max-w-2xl">
      Wir bauen nicht einfach nur Software. Wir erschaffen Ihren digitalen Wettbewerbsvorteil – mit handwerklicher Präzision und der Geschwindigkeit modernster
      KI-Innovation.
    </p>

    <div class="animate-fade-in-up mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
      <button class="btn-basic animate-fade-in-from-side" onclick={() => goto(localizeHref('/wizard'))}> Projekt starten </button>
      <a href="#web-apps" class="btn-inverted-outline animate-fade-in-from-side">Unsere Services</a>
    </div>
  </div>
</Stage>

<!-- Pillar 1: Web & App Excellence -->
<div id="web-apps">
  <Section>
    <div class="grid grid-cols-1 items-center gap-16 py-20 lg:grid-cols-2">
      <div class="prose order-2 lg:order-1">
        <div class="badge badge-primary badge-outline mb-4 font-bold tracking-widest uppercase">Web- & App-Excellence</div>
        <h2 class="mb-6 text-4xl font-bold">Ihre Konkurrenz lädt noch, <span class="text-primary">Sie konvertieren schon.</span></h2>
        <p class="mb-8 text-lg leading-relaxed">
          In einer Welt von 3-Sekunden-Aufmerksamkeitsspannen ist Geschwindigkeit Ihre wichtigste Währung. Wir nutzen <strong>SvelteKit</strong>, um Webseiten
          zu bauen, die sich wie native Apps anfühlen – blitzschnell, sicher und wartungsarm.
        </p>

        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="bg-primary/10 text-primary rounded-xl p-3">✅</div>
            <div>
              <h4 class="mb-1 font-bold">100% Lighthouse Performance</h4>
              <p class="text-sm opacity-70">Maximale Sichtbarkeit bei Google und perfekte User Experience durch Zero Technical Debt.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-primary/10 text-primary rounded-xl p-3">🛡️</div>
            <div>
              <h4 class="mb-1 font-bold">DSGVO-Konformität by Design</h4>
              <p class="text-sm opacity-70">Kein Cookie-Chaos, keine unnötigen Tracker. Sicherheit, die Vertrauen bei Ihren Kunden schafft.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative order-1 lg:order-2">
        <div class="mockup-browser bg-base-300 animate-fade-in-up overflow-hidden border shadow-2xl">
          <div class="mockup-browser-toolbar">
            <div class="input border-base-content/10 border">https://raspb.de/excellence</div>
          </div>
          <img src={lighthouseImg} alt="Lighthouse 100% Score" class="w-full opacity-90 transition-opacity hover:opacity-100" />
        </div>
        <!-- Floating Mobile Mockup -->
        <div class="border-base-300 absolute -bottom-10 -left-10 hidden w-48 -rotate-6 transform overflow-hidden rounded-4xl border-8 shadow-2xl xl:block">
          <img src={lighthouseMobileImg} alt="Mobile Lighthouse Score" class="w-full" />
        </div>
      </div>
    </div>
  </Section>
</div>

<!-- Pillar 2: AI & Automation -->
<div class="bg-base-200">
  <Section>
    <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div class="relative order-2 lg:order-1">
        <div class="from-secondary/20 to-accent/20 flex aspect-square items-center justify-center rounded-3xl bg-linear-to-br p-12 shadow-inner">
          <!-- Visual representation of Automation/AI -->
          <div class="grid h-full w-full grid-cols-2 gap-4">
            <div class="ai-card rounded-2xl p-6 shadow-lg" style="--delay: 0s;">
              <span class="text-4xl">🤖</span>
              <p class="mt-2 text-xs font-bold uppercase opacity-50">KI-Agenten</p>
            </div>
            <div class="ai-card rounded-2xl p-6 shadow-lg" style="--delay: 0.1s;">
              <span class="text-4xl">🔗</span>
              <p class="mt-2 text-xs font-bold uppercase opacity-50">n8n Workflows</p>
            </div>
            <div class="ai-card rounded-2xl p-6 shadow-lg" style="--delay: 0.2s;">
              <span class="text-4xl">🧠</span>
              <p class="mt-2 text-xs font-bold uppercase opacity-50">RAG / Brain</p>
            </div>
            <div class="ai-card rounded-2xl p-6 shadow-lg" style="--delay: 0.3s;">
              <span class="text-4xl">📊</span>
              <p class="mt-2 text-xs font-bold uppercase opacity-50">Business Intelligence</p>
            </div>
          </div>
        </div>
      </div>

      <div class="prose order-1 lg:order-2">
        <div class="badge badge-secondary badge-outline mb-4 font-bold tracking-widest uppercase">AI-Innovation & Automation</div>
        <h2 class="mb-6 text-4xl font-bold">Gewinnen Sie Ihren <span class="text-secondary">Arbeitsalltag zurück.</span></h2>
        <p class="mb-8 text-lg leading-relaxed">
          Stellen Sie sich vor, Ihre Routineaufgaben erledigen sich von selbst. Wir bauen <strong>KI-Agenten</strong> und
          <strong>Automatisierungs-Workflows</strong>, die nicht nur Daten schieben, sondern echte Entscheidungen treffen.
        </p>

        <div class="card bg-base-100 border-secondary mb-6 border-l-4 p-6 shadow-xl">
          <p class="m-0 italic opacity-90">
            "Seit wir n8n und Agenten-System einsetzen, sparen wir >15 Stunden pro Woche in der Kundenakquise. Die KI qualifiziert Leads vor, während wir an
            Projekten arbeiten."
          </p>
          <p class="m-0 mt-4 text-sm font-bold opacity-50">— Ein fiktives, aber realisierbares Kundenzitat</p>
        </div>

        <ul class="list-none space-y-3 p-0 font-medium opacity-80">
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
  <CTABox></CTABox>
  <div class="big-spacer"></div>
 </Section>


<!-- <Section>
  <div class="bg-neutral rounded-[3rem] p-12 lg:p-20 text-center text-neutral-content shadow-2xl relative overflow-hidden my-20">
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
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
</Section> -->

<style lang="postcss">
  @reference "../../app.css";

  @keyframes fade-in-up-card {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ai-card {
    @apply bg-base-100;
    animation: fade-in-up-card 0.5s ease-out both;
    animation-delay: var(--delay, 0s);
  }
</style>
