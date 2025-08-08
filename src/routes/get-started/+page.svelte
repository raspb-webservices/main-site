<script lang="ts">
  import { goto } from '$app/navigation';
  import Wizard from '$lib/components/wizard/wizard.svelte';
</script>

<section class="get-started-content-wrapper">
  <div class="hero-section">
    <h1>Projekt <span class="inner-text-special">konfigurieren</span></h1>

    <div class="teaser-content">
      <p class="lead-text">
        In nur wenigen Minuten zu Ihrem maßgeschneiderten Angebot – unser intelligenter Konfigurator führt Sie Schritt für Schritt durch alle wichtigen
        Entscheidungen.
      </p>

      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-text">
            <h3>Schnell & Effizient</h3>
            <p>Keine langen Gespräche – definieren Sie Ihr Projekt in 5-10 Minuten</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">💰</div>
          <div class="benefit-text">
            <h3>Transparente Preise</h3>
            <p>Erhalten Sie sofort eine realistische Kostenschätzung für Ihr Vorhaben</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">🎯</div>
          <div class="benefit-text">
            <h3>Präzise Planung</h3>
            <p>Alle Details werden erfasst – für ein perfekt auf Sie zugeschnittenes Ergebnis</p>
          </div>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">📋</div>
          <div class="benefit-text">
            <h3>Komplette Dokumentation</h3>
            <p>Am Ende erhalten Sie eine detaillierte Projektbeschreibung zum Download</p>
          </div>
        </div>
      </div>

      <div class="cta-text">
        <p class="no-padding">
          <strong>So funktioniert's:</strong> Wählen Sie Ihren Projekttyp, beschreiben Sie Ihre Anforderungen, definieren Sie gewünschte Features und Design – fertig!
          Sie erhalten sofort eine Kostenschätzung und können Ihre Konfiguration als PDF herunterladen.
        </p>
      </div>
    </div>
  </div>

  <div class="wizard-section">
    <Wizard />
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  section.get-started-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
  }

  .hero-section {
    @apply mb-16 text-center;

    h1 {
      @apply mb-8;
    }
  }

  .teaser-content {
    @apply mx-auto max-w-4xl;
  }

  .lead-text {
    @apply text-base-content/80 mb-12 text-center text-xl;
    line-height: 1.6;
  }

  .benefits-grid {
    @apply mb-12 grid grid-cols-1 gap-8 md:grid-cols-2;
  }

  .benefit-item {
    @apply bg-base-100 border-base-200 flex items-start gap-4 rounded-xl border p-6 shadow-sm;
    transition: all 0.3s ease;

    &:hover {
      @apply translate-y-[-2px] shadow-md;
    }
  }

  .benefit-icon {
    @apply flex-shrink-0 text-3xl;
  }

  .benefit-text {
    h3 {
      @apply text-base-content mb-2 text-lg font-semibold;
    }

    p {
      @apply text-base-content/70 text-sm leading-relaxed;
    }
  }

  .cta-text {
    @apply bg-primary/5 border-primary/20 rounded-xl border p-6 text-center;

    p {
      @apply text-base-content/80 text-base leading-relaxed;
      margin: 0;
    }

    strong {
      @apply text-primary font-semibold;
    }
  }

  .wizard-section {
    @apply mb-16;
  }

  .back-section {
    @apply text-center;
  }
</style>
