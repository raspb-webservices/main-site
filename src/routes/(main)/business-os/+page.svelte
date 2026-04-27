<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import Section from '$lib/components/ui/section.svelte';
  import CTABox from '$lib/components/snippets/cta-box.svelte';
</script>

<svelte:head>
  <title>raspb Business OS - KI-gestütztes Geschäftsoperatingssystem für KMUs</title>
  <meta name="description" content="Entdecken Sie das raspb Business OS - eine KI-gestützte Plattform, die Ihre Geschäftsprozesse automatisiert, Kosten senkt und die Effizienz steigert. Für KMUs, Vereine und Stiftungen." />
  <meta property="og:title" content="raspb Business OS - KI-gestütztes Geschäftsoperatingssystem" />
  <meta property="og:description" content="Die Zukunft der Geschäftsprozess-Automatisierung für KMUs. KI-Agenten, die 24/7 arbeiten." />
  <meta property="og:type" content="product" />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="business-os-page">
  <!-- Hero Section -->
  <section class="hero bg-gradient-to-br from-primary/10 to-secondary/10 py-24">
    <div class="container mx-auto px-6 text-center">
      <span class="badge badge-warning mb-4">🔒 Shadow Page - In Entwicklung</span>
      <h1 class="text-5xl font-bold mb-6">
        raspb <span class="text-primary">Business OS</span>
      </h1>
      <p class="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
        Das KI-gestützte Geschäftsoperatingssystem, das Ihre Routineaufgaben automatisiert
        und Ihnen Zeit für das Wesentliche gibt.
      </p>
      <div class="flex gap-4 justify-center">
        <a href={localizeHref('/contact')} class="btn btn-primary btn-lg">
          Demo anfordern
        </a>
        <a href={localizeHref('/#services')} class="btn btn-outline btn-lg">
          Mehr erfahren
        </a>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <Section>
    <div class="container mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">Was ist das Business OS?</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">🤖</div>
            <h3 class="card-title justify-center">KI-Agenten</h3>
            <p>20 spezialisierte KI-Agenten übernehmen Ihre Routineaufgaben - von der Datenerfassung bis zum Kundenservice.</p>
          </div>
        </div>

        <div class="card bg-base-200 shadow-lg">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="card-title justify-center">Prozess-Automatisierung</h3>
            <p>Automatisieren Sie wiederkehrende Abläufe und reduzieren Sie manuelle Arbeit um bis zu 80%.</p>
          </div>
        </div>

        <div class="card bg-base-200 shadow-lg">
          <div class="card-body text-center">
            <div class="text-4xl mb-4">📊</div>
            <h3 class="card-title justify-center">Echtzeit-Analytics</h3>
            <p>Erhalten Sie Einblicke in Ihre Geschäftsprozesse und treffen Sie datengestützte Entscheidungen.</p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- How it works -->
  <Section>
    <div class="container mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">So funktioniert's</h2>
      
      <div class="steps steps-vertical md:steps-horizontal">
        <div class="step step-primary">
          <div class="step-title">Bedarf analysieren</div>
          <div class="text-base-content/70">Wir analysieren Ihre Geschäftsprozesse und identifizieren Automatisierungspotenziale.</div>
        </div>
        <div class="step step-primary">
          <div class="step-title">Agenten konfigurieren</div>
          <div class="text-base-content/70">Passende KI-Agenten werden für Ihre Aufgaben ausgewählt und individuell angepasst.</div>
        </div>
        <div class="step step-primary">
          <div class="step-title">Integration & Go-Live</div>
          <div class="text-base-content/70">Nahtlose Integration in Ihre bestehende IT-Landschaft und produktiver Einsatz.</div>
        </div>
      </div>
    </div>
  </Section>

  <!-- CTA Section -->
  <Section>
    <div class="container mx-auto px-6 py-16">
      <CTABox
        title="Bereit für die Zukunft?"
        description="Kontaktieren Sie uns für eine kostenlose Erstberatung zum raspb Business OS."
        buttonText="Jetzt beraten lassen"
        buttonHref={localizeHref('/contact')}
      />
    </div>
  </Section>

  <!-- Footer Note -->
  <div class="bg-base-200 py-8">
    <div class="container mx-auto px-6 text-center text-sm text-base-content/50">
      <p>⚠️ Dies ist eine experimentelle Shadow-Page. Das Business OS befindet sich in der Entwicklung.</p>
      <p>Kontaktieren Sie uns für更多信息: <a href="mailto:info@raspb.de" class="link">info@raspb.de</a></p>
    </div>
  </div>
</div>

<style>
  .business-os-page {
    min-height: 100vh;
  }
  
  .hero {
    padding-top: 8rem;
  }
</style>
