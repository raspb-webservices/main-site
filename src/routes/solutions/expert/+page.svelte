<script lang="ts">
  // TODO: Paraglide i18n keys hinzufügen in messages/pages/solutions/de.json + en.json
  // import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { resolve } from '$app/paths';

  const services = [
    {
      id: 'ai',
      icon: '🧠',
      title: 'KI Use Cases & Architektur',
      description:
        'Von der Idee zum produktiven KI-Feature: RAG, Agents, LLM-Integration, Prompt Engineering.'
    },
    {
      id: 'dev',
      icon: '⚙️',
      title: 'Individualentwicklung',
      description:
        'Full-Stack-Entwicklung, API-Design, Systemintegration. Modern, wartbar, ohne technische Schulden.'
    },
    {
      id: 'consulting',
      icon: '📐',
      title: 'Technisches Consulting',
      description:
        'Architektur-Review, Tech-Stack-Entscheidungen, Code-Qualität – ich sage, was ich sehe.'
    },
    {
      id: 'mvp',
      icon: '🚀',
      title: 'MVP & Prototyping',
      description:
        'Schnell zur lauffähigen Demo. Ideal für Investoren-Präsentationen und interne Validierung.'
    },
    {
      id: 'audit',
      icon: '🔍',
      title: 'Code-Audit & Debugging',
      description:
        'Hartnäckige Bugs, Performance-Probleme, Security-Review – ich finde, was andere übersehen.'
    },
    {
      id: 'augmentation',
      icon: '🏋️',
      title: 'Team-Augmentation',
      description:
        'Temporäre Verstärkung für Ihr Entwicklungsteam – nahtlose Integration, sofort produktiv.'
    }
  ];

  const steps = [
    {
      id: 'briefing',
      title: 'Anfrage & Briefing',
      description: 'Kurzes Gespräch (30 Min.) – ich verstehe Ihr Problem, Sie verstehen meinen Ansatz.'
    },
    {
      id: 'offer',
      title: 'Angebot & Buchung',
      description: 'Klares Angebot: Scope, Tagessatz, Zeitrahmen. Kein Kleingedrucktes.'
    },
    {
      id: 'execution',
      title: 'Umsetzung',
      description: 'Ich arbeite fokussiert an Ihrer Herausforderung – remote oder vor Ort.'
    },
    {
      id: 'handover',
      title: 'Ergebnis & Übergabe',
      description: 'Saubere Dokumentation, Übergabe an Ihr Team, optional: Folgebetreuung.'
    }
  ];
</script>

<svelte:head>
  <title>Experten-Support auf Abruf – 1.000 €/Tag | raspb</title>
  <meta name="description" content="Senior-Entwickler, KI-Architekt, Consultant – genau wenn Sie ihn brauchen. Tagessatz 1.000 €. Kein Overhead. Kein Headcount." />
</svelte:head>

<!-- ─── HERO ──────────────────────────────────────────────────── -->
<section class="hero-section">
  <nav class="solutions-nav">
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/') as any)} class="logo-link">raspb</a>
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/solutions/website') as any)} class="nav-cta">← Webseiten-Paket</a>
  </nav>

  <div class="hero-content">
    <span class="hero-badge">1.000 € / Tag</span>
    <h1 class="hero-headline">
      Rent an Expert.
    </h1>
    <p class="hero-sub">
      Senior-Entwickler, KI-Architekt und Consultant –
      genau dann, wenn Sie ihn brauchen.<br />
      Kein Overhead. Kein Headcount.
    </p>
    <div class="hero-actions">
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      <a href={resolve(localizeHref('/appointment') as any)} class="btn-primary-xl">Jetzt anfragen</a>
      <a href="#services" class="btn-ghost-xl">Was ich mache</a>
    </div>
  </div>
</section>

<!-- ─── LEISTUNGEN ───────────────────────────────────────────── -->
<section id="services" class="services-section">
  <h2 class="section-title">Womit ich helfe</h2>
  <div class="services-grid">
    {#each services as service (service.id)}
      <div class="service-card">
        <span class="service-icon">{service.icon}</span>
        <div>
          <h3 class="service-title">{service.title}</h3>
          <p class="service-desc">{service.description}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ─── HOW IT WORKS ─────────────────────────────────────────── -->
<section class="process-section">
  <h2 class="section-title">So funktioniert es</h2>
  <div class="process-steps">
    {#each steps as step, i (step.id)}
      <div class="process-step">
        <span class="step-number">{i + 1}</span>
        <div>
          <h3 class="step-title">{step.title}</h3>
          <p class="step-desc">{step.description}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ─── PRICING ───────────────────────────────────────────────── -->
<section class="pricing-section">
  <h2 class="section-title">Transparente Konditionen</h2>
  <div class="pricing-cards">
    <div class="pricing-card">
      <span class="pricing-badge">Tagesengagement</span>
      <div class="pricing-amount">
        <span class="pricing-value">1.000 €</span>
        <span class="pricing-unit">/Tag</span>
      </div>
      <p class="pricing-note">Ideal für konkrete Aufgaben & Workshops</p>
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      <a href={resolve(localizeHref('/appointment') as any)} class="btn-primary-xl">Termin buchen</a>
    </div>

    <div class="pricing-card pricing-card--highlight">
      <span class="pricing-badge">Sprint (5 Tage)</span>
      <div class="pricing-amount">
        <span class="pricing-value">4.500 €</span>
        <span class="pricing-unit">/Woche</span>
      </div>
      <p class="pricing-note">Für ein vollständiges Feature oder MVP-Segment</p>
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      <a href={resolve(localizeHref('/appointment') as any)} class="btn-primary-xl">Projekt starten</a>
    </div>
  </div>
</section>

<!-- ─── CTA BANNER ────────────────────────────────────────────── -->
<section class="cta-banner">
  <h2 class="cta-title">Herausforderung? Lass uns reden.</h2>
  <p class="cta-sub">30 Minuten kostenloses Erstgespräch – unverbindlich, direkt, ohne Agentur-Overhead.</p>
  <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
  <a href={resolve(localizeHref('/appointment') as any)} class="btn-primary-xl">Jetzt Termin vereinbaren</a>
</section>

<!-- ─── FOOTER STRIP ─────────────────────────────────────────── -->
<footer class="solutions-footer">
  <div class="footer-links">
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/imprint') as any)}>Impressum</a>
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/privacy') as any)}>Datenschutz</a>
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/') as any)}>Zurück zur Hauptseite</a>
  </div>
  <p class="footer-copy">© {new Date().getFullYear()} raspb – Alle Rechte vorbehalten</p>
</footer>

<style lang="postcss">
  @reference '../../../app.css';

  .hero-section {
    @apply relative flex min-h-screen flex-col bg-linear-to-br from-neutral to-base-300 px-6 py-8;
  }

  .solutions-nav {
    @apply flex items-center justify-between pb-8;
  }

  .logo-link {
    @apply text-xl font-bold text-primary no-underline;
  }

  .nav-cta {
    @apply text-sm font-medium text-base-content/60 no-underline transition hover:text-primary;
  }

  .hero-content {
    @apply mx-auto flex max-w-3xl flex-1 flex-col justify-center gap-6 py-16 text-center;
  }

  .hero-badge {
    @apply mx-auto w-fit rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-content;
  }

  .hero-headline {
    @apply text-6xl font-bold leading-tight tracking-tight text-base-content md:text-8xl;
  }

  .hero-sub {
    @apply mx-auto max-w-xl text-lg text-base-content/70;
  }

  .hero-actions {
    @apply flex flex-wrap justify-center gap-4 pt-2;
  }

  .btn-primary-xl {
    @apply btn btn-primary btn-lg no-underline;
  }

  .btn-ghost-xl {
    @apply btn btn-ghost btn-lg no-underline;
  }

  .services-section {
    @apply mx-auto max-w-5xl px-6 py-24;
  }

  .section-title {
    @apply mb-12 text-center text-3xl font-bold md:text-4xl;
  }

  .services-grid {
    @apply grid gap-6 md:grid-cols-2;
  }

  .service-card {
    @apply flex gap-5 rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:shadow-lg;
  }

  .service-icon {
    @apply shrink-0 text-3xl;
  }

  .service-title {
    @apply mb-1 font-semibold;
  }

  .service-desc {
    @apply text-sm text-base-content/70;
  }

  .process-section {
    @apply bg-base-200 px-6 py-24;
  }

  .process-steps {
    @apply mx-auto flex max-w-3xl flex-col gap-8;
  }

  .process-step {
    @apply flex items-start gap-6;
  }

  .step-number {
    @apply flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content;
  }

  .step-title {
    @apply mb-1 font-semibold;
  }

  .step-desc {
    @apply text-sm text-base-content/70;
  }

  .pricing-section {
    @apply mx-auto max-w-4xl px-6 py-24;
  }

  .pricing-cards {
    @apply flex flex-col gap-6 md:flex-row;
  }

  .pricing-card {
    @apply flex flex-1 flex-col items-center gap-4 rounded-3xl border border-base-300 bg-base-100 p-8 text-center;

    &--highlight {
      @apply border-2 border-primary shadow-xl;
    }
  }

  .pricing-badge {
    @apply rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary;
  }

  .pricing-amount {
    @apply flex items-baseline gap-2;
  }

  .pricing-value {
    @apply text-5xl font-bold text-base-content;
  }

  .pricing-unit {
    @apply text-base-content/50;
  }

  .pricing-note {
    @apply flex-1 text-sm text-base-content/60;
  }

  .cta-banner {
    @apply flex flex-col items-center gap-6 bg-primary px-6 py-24 text-center text-primary-content;
  }

  .cta-title {
    @apply text-3xl font-bold md:text-4xl;
  }

  .cta-sub {
    @apply max-w-xl text-primary-content/80;
  }

  .solutions-footer {
    @apply flex flex-col items-center gap-4 border-t border-base-300 px-6 py-8 text-center;
  }

  .footer-links {
    @apply flex gap-6 text-sm;

    a {
      @apply text-base-content/60 no-underline transition hover:text-primary;
    }
  }

  .footer-copy {
    @apply text-xs text-base-content/40;
  }
</style>
