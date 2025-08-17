<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Wizard from '$lib/components/wizard/wizard.svelte';

  interface PageData {
    projectType: string | null;
    subType: string | null;
  }

  const { data }: { data: PageData } = $props();

  function scrollToWizard(offset = 0) {
    const target = document.getElementById('wizard');
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    if (data.projectType || data.subType) {
      setTimeout(() => {
        scrollToWizard(30);
      }, 300);
    }
  });
</script>

<section class="get-started-content-wrapper">
  <div class="hero-section">
    <h1>Projekt <span class="inner-text-special">konfigurieren</span></h1>

    <div class="teaser-content">
      <p class="lead-text">
        In nur wenigen Minuten zu Ihrem maßgeschneiderten Angebot - unser intelligenter Konfigurator führt Sie Schritt für Schritt durch alle wichtigen
        Entscheidungen.
      </p>

      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-text">
            <h3>Schnell & Effizient</h3>
            <p>Keine langen Gespräche - definieren Sie Ihr Projekt in 5-10 Minuten</p>
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
            <p>Alle Details werden erfasst - für ein perfekt auf Sie zugeschnittenes Ergebnis</p>
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
          <strong>So funktioniert's:</strong> Wählen Sie Ihren Projekttyp, beschreiben Sie Ihre Anforderungen, definieren Sie gewünschte Features und Design - fertig!
          Sie erhalten sofort eine Kostenschätzung und können Ihre Konfiguration als PDF herunterladen.
        </p>
      </div>
    </div>
  </div>

  <div class="wizard-section" id="wizard">
    <Wizard initialProjectType={data.projectType} initialSubType={data.subType} />
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
    @apply bg-base-200 flex items-start gap-4 rounded-xl p-6 shadow-sm text-base-content;
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
    @apply bg-base-200 border-base-300 rounded-xl border p-6 text-center text-base-content;

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

</style>
