<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import CTABox from '$lib/components/snippets/cta-box.svelte';
  import { localizeHref } from '$lib/paraglide/runtime';

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  onMount(() => {
    const { hash } = document.location;
    if (hash) scrollToSection(hash.slice(1));
  });
</script>

<svelte:head>
  <title>Agent-Native Services | raspb Webservices</title>
  <meta name="description" content="Hör auf, Tools zu kaufen. Fang an, Agenten einzustellen. Wir transformieren Ihr Business mit Agent-Native Lösungen." />
</svelte:head>

<!-- Hero Section -->
<Stage style={'basic-gradient'}>
  <div class="inner-box reduced prose py-36">
    <div class="badge badge-outline badge-primary animate-fade-in mb-4">The Future is Agent-Native</div>
    <h1 class="massive animate-fade-in-up">
        Hör auf, Tools zu kaufen. <br/>
        <span class="inner-text-special">Fang an, Agenten einzustellen.</span>
    </h1>
    <p class="teaser animate-fade-in-up">
        Die Ära der "Werkzeuge" ist vorbei. Wir bauen <strong>Agent-Native Businesses</strong>: 
        Digitale Ökosysteme, in denen KI nicht nur unterstützt, sondern autonom handelt, entscheidet und wächst.
    </p>
    <div class="flex gap-4 animate-fade-in-up">
        <button
          class="btn-basic"
          onclick={() => goto(localizeHref('/wizard'))}>
          Projekt konfigurieren
        </button>
        <button
          class="btn btn-outline btn-lg"
          onclick={() => scrollToSection('vision')}>
          Vision entdecken
        </button>
    </div>
  </div>
</Stage>

<!-- The Manifest Section -->
<Section id="vision">
    <div class="massive-spacer"></div>
    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div class="prose animate-fadeIn">
            <h2 class="text-4xl font-bold">Agent-Native: <span class="inner-text-special">KI als Fundament, nicht als Add-on.</span></h2>
            <p class="text-xl italic">
                "Not just another Custom GPT. Wir bauen echte agentische Systeme mit Wissen, Integrationen und Autonomie."
            </p>
            <div class="space-y-6 mt-8">
                <div class="flex gap-4">
                    <div class="text-primary text-2xl font-bold">01</div>
                    <div>
                        <h4 class="font-bold">Echte Autonomie</h4>
                        <p>Unsere Agenten führen Aufgaben von A bis Z aus, treffen Entscheidungen und lernen dazu, statt nur Texte zu generieren.</p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="text-primary text-2xl font-bold">02</div>
                    <div>
                        <h4 class="font-bold">Native Integration</h4>
                        <p>Keine Silos. Deine Agenten sind tief in deine Prozesse integriert und bilden das zentrale Nervensystem deines Unternehmens.</p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="text-primary text-2xl font-bold">03</div>
                    <div>
                        <h4 class="font-bold">Human-in-the-Loop</h4>
                        <p>Du setzt die Leitplanken und Ziele. Die KI erledigt die Arbeit. Du kümmerst dich nur noch um die strategischen Ausnahmen.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-base-300 shadow-2xl p-8 border border-primary/20 rotate-1 hover:rotate-0 transition-transform duration-500">
            <pre class="text-sm font-mono text-primary"><code>{`
// raspb Agent Blueprint
export const StratecoAgent = new Agent({
  role: "Sales Operations",
  capabilities: ["negotiate", "schedule", "adapt"],
  foundation: "Agent-Native",
  autonomy: "High"
});

StratecoAgent.on("target_reached", (goal) => {
  console.log("Goal achieved autonomozusly.");
});
            `}</code></pre>
        </div>
    </div>
    <div class="massive-spacer"></div>
</Section>

<!-- Service Säulen -->
<Section noSpacing={true}>
    <div class="from-primary/10 via-base-100 to-accent/10 rounded-3xl bg-linear-to-br py-24 px-6">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-5xl font-bold text-center mb-16">Drei Säulen der <span class="inner-text-special">Transformation</span></h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Säule A -->
                <div class="card bg-base-100 shadow-xl hover:shadow-primary/20 transition-all border border-base-content/5">
                    <div class="card-body">
                        <div class="text-4xl mb-4">🌐</div>
                        <h3 class="card-title text-2xl">Agent-Native Frontends</h3>
                        <p>Wir bauen Web-Plattformen mit <strong>Svelte 5</strong>, die so schnell und semantisch sauber sind, dass sie sowohl von Kunden als auch von KI-Agenten perfekt bedient werden können.</p>
                        <div class="card-actions mt-4">
                            <div class="badge badge-outline">SvelteKit</div>
                            <div class="badge badge-outline">Tailwind 4</div>
                            <div class="badge badge-outline">SEO+</div>
                        </div>
                    </div>
                </div>

                <!-- Säule B -->
                <div class="card bg-primary text-primary-content shadow-xl scale-105 border-none">
                    <div class="card-body">
                        <div class="text-4xl mb-4">🤖</div>
                        <h3 class="card-title text-2xl">Autonomous Operations</h3>
                        <p>Dein digitales Team, das niemals schläft. Wir entwickeln spezialisierte Agenten für Sales, Support und Ops, die innerhalb deiner Leitplanken autonom handeln.</p>
                        <div class="card-actions mt-4">
                            <div class="badge badge-outline border-white text-white">Custom Agents</div>
                            <div class="badge badge-outline border-white text-white">Automation</div>
                        </div>
                    </div>
                </div>

                <!-- Säule C -->
                <div class="card bg-base-100 shadow-xl hover:shadow-accent/20 transition-all border border-base-content/5">
                    <div class="card-body">
                        <div class="text-4xl mb-4">🧠</div>
                        <h3 class="card-title text-2xl">AI Strategy & Infra</h3>
                        <p>Wir machen dein Unternehmen "Agent-Ready". Von der RAG-Infrastruktur bis zur KI-Roadmap. Wir bauen das Gehirn deiner Unternehmung.</p>
                        <div class="card-actions mt-4">
                            <div class="badge badge-outline">RAG</div>
                            <div class="badge badge-outline">Governance</div>
                            <div class="badge badge-outline">Scaling</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Section>

<!-- Tech Stack Section -->
<Section>
    <div class="massive-spacer"></div>
    <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-bold mb-6">Gebaut für die <span class="inner-text-special">Lichtgeschwindigkeit</span> der KI.</h2>
        <p class="text-xl">Warum wir auf den <strong>raspb-Standard</strong> setzen? Weil im Agent-Native Business Millisekunden über die Conversion entscheiden.</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="flex flex-col items-center p-6 bg-base-200 rounded-2xl">
            <div class="text-3xl font-bold text-primary mb-2">Svelte 5</div>
            <p class="text-sm opacity-70">Runes Power</p>
        </div>
        <div class="flex flex-col items-center p-6 bg-base-200 rounded-2xl">
            <div class="text-3xl font-bold text-primary mb-2">Tailwind 4</div>
            <p class="text-sm opacity-70">Next-Gen CSS</p>
        </div>
        <div class="flex flex-col items-center p-6 bg-base-200 rounded-2xl">
            <div class="text-3xl font-bold text-primary mb-2">DaisyUI 5</div>
            <p class="text-sm opacity-70">Radical UI</p>
        </div>
        <div class="flex flex-col items-center p-6 bg-base-200 rounded-2xl">
            <div class="text-3xl font-bold text-primary mb-2">TypeScript</div>
            <p class="text-sm opacity-70">Total Safety</p>
        </div>
    </div>
</Section>

<!-- CTA -->
<Section>
  <CTABox variant={'service'}></CTABox>
</Section>

<style lang="postcss">
  @reference '../../app.css';

  .massive-spacer {
    @apply h-24 lg:h-36;
  }
</style>
