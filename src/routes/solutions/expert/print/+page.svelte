<script lang="ts">
  import logoSquare from '$images/logo-square.webp';

  let { data } = $props();

  const services = [
    { icon: '🧠', title: 'KI Use Cases & Architektur', description: 'Von der Idee zum produktiven KI-Feature: RAG, Agents, LLM-Integration, Prompt Engineering.' },
    { icon: '⚙️', title: 'Individualentwicklung', description: 'Full-Stack-Entwicklung, API-Design, Systemintegration. Modern, wartbar, ohne technische Schulden.' },
    { icon: '📐', title: 'Technisches Consulting', description: 'Architektur-Review, Tech-Stack-Entscheidungen, Code-Qualität – ich sage, was ich sehe.' },
    { icon: '🚀', title: 'MVP & Prototyping', description: 'Schnell zur lauffähigen Demo. Ideal für Investoren-Präsentationen und interne Validierung.' },
    { icon: '🔍', title: 'Code-Audit & Debugging', description: 'Hartnäckige Bugs, Performance-Probleme, Security-Review – ich finde, was andere übersehen.' },
    { icon: '🏋️', title: 'Team-Augmentation', description: 'Temporäre Verstärkung für Ihr Entwicklungsteam – nahtlose Integration, sofort produktiv.' }
  ];

  const steps = [
    { title: 'Anfrage & Briefing', description: 'Kurzes Gespräch (30 Min.) – ich verstehe Ihr Problem, Sie verstehen meinen Ansatz.' },
    { title: 'Angebot & Buchung', description: 'Klares Angebot: Scope, Tagessatz, Zeitrahmen. Kein Kleingedrucktes.' },
    { title: 'Umsetzung', description: 'Ich arbeite fokussiert an Ihrer Herausforderung – remote oder vor Ort.' },
    { title: 'Ergebnis & Übergabe', description: 'Saubere Dokumentation, Übergabe an Ihr Team, optional: Folgebetreuung.' }
  ];

  const pricingTiers = [
    {
      label: 'Tagesengagement', price: '1.000 €', unit: '/Tag', featured: false,
      note: 'Ideal für konkrete Aufgaben & Workshops'
    },
    {
      label: 'Sprint (5 Tage)', price: '4.500 €', unit: '/Woche', featured: true,
      note: 'Für ein vollständiges Feature oder MVP-Segment'
    }
  ];
</script>

<svelte:head>
  <title>raspb – Experten-Support auf Abruf (Druckversion)</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="print-root">

  <!-- ─── HEADER ─────────────────────────────────────────────── -->
  <header class="print-header">
    <img src={logoSquare} alt="raspb" class="print-logo" />
    <div class="print-header-text">
      <h1 class="print-h1">Rent an Expert.</h1>
      <p class="print-sub">Senior-Entwickler · KI-Architekt · Consultant · 1.000 € / Tag · Kein Overhead · Kein Headcount</p>
    </div>
    <div class="print-qr">
      {@html data.qrSvg}
      <span class="print-qr-label">raspb.de/solutions/expert</span>
    </div>
  </header>

  <hr class="print-divider" />

  <!-- ─── LEISTUNGEN ─────────────────────────────────────────── -->
  <section class="print-section">
    <h2 class="print-h2">Womit ich helfe</h2>
    <div class="print-grid-3">
      {#each services as s (s.title)}
        <div class="print-card">
          <div class="print-card-icon">{s.icon}</div>
          <strong class="print-card-title">{s.title}</strong>
          <p class="print-card-desc">{s.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <hr class="print-divider" />

  <!-- ─── PROZESS ─────────────────────────────────────────────── -->
  <section class="print-section">
    <h2 class="print-h2">So funktioniert es</h2>
    <div class="print-steps">
      {#each steps as step, i (step.title)}
        <div class="print-step">
          <span class="print-step-number">{i + 1}</span>
          <div>
            <strong class="print-step-title">{step.title}</strong>
            <p class="print-step-desc">{step.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <hr class="print-divider" />

  <!-- ─── PRICING ────────────────────────────────────────────── -->
  <section class="print-section">
    <h2 class="print-h2">Transparente Konditionen</h2>
    <div class="print-grid-2">
      {#each pricingTiers as tier (tier.label)}
        <div class="print-pricing-card" class:print-pricing-featured={tier.featured}>
          {#if tier.featured}<div class="print-featured-label">Beliebteste Wahl</div>{/if}
          <div class="print-pricing-header">
            <strong class="print-pricing-label">{tier.label}</strong>
            <span class="print-pricing-price">{tier.price}<span class="print-pricing-unit">{tier.unit}</span></span>
          </div>
          <p class="print-pricing-note">{tier.note}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- ─── FOOTER ─────────────────────────────────────────────── -->
  <footer class="print-footer">
    <span>raspb · {new Date().getFullYear()}</span>
    <span>raspb.de</span>
    <span>hallo@raspb.de</span>
  </footer>

</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, sans-serif;
    color: #1a1a2e;
    background: white;
  }

  .print-root {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* ── Header ── */
  .print-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-bottom: 1.5rem;
  }
  .print-logo { height: 64px; width: auto; }
  .print-h1 { margin: 0 0 0.25rem; font-size: 1.75rem; line-height: 1.2; }
  .print-sub { margin: 0; font-size: 0.9rem; color: #555; }
  .print-header-text { flex: 1; }
  .print-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
  }
  .print-qr :global(svg) { width: 80px; height: 80px; }
  .print-qr-label { font-size: 0.6rem; color: #888; text-align: center; }

  /* ── Divider ── */
  .print-divider { border: none; border-top: 1px solid #ddd; margin: 1.5rem 0; }

  /* ── Section ── */
  .print-section { margin-bottom: 1rem; }
  .print-h2 { font-size: 1.2rem; font-weight: 700; margin: 0 0 1rem; }

  /* ── 3-col grid ── */
  .print-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  /* ── 2-col grid ── */
  .print-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  /* ── Service cards ── */
  .print-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.78rem;
    break-inside: avoid;
  }
  .print-card-icon { font-size: 1.25rem; margin-bottom: 0.25rem; }
  .print-card-title { display: block; margin-bottom: 0.25rem; font-size: 0.82rem; }
  .print-card-desc { margin: 0; color: #555; line-height: 1.4; }

  /* ── Process steps ── */
  .print-steps {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .print-step {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.78rem;
    break-inside: avoid;
  }
  .print-step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #7c3aed;
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
    flex-shrink: 0;
  }
  .print-step-title { display: block; font-size: 0.82rem; margin-bottom: 0.2rem; }
  .print-step-desc { margin: 0; color: #555; line-height: 1.4; }

  /* ── Pricing ── */
  .print-pricing-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.78rem;
    position: relative;
    break-inside: avoid;
  }
  .print-pricing-featured { border-color: #7c3aed; border-width: 2px; }
  .print-featured-label {
    font-size: 0.68rem;
    font-weight: 700;
    color: #7c3aed;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.4rem;
  }
  .print-pricing-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.4rem;
    gap: 0.5rem;
  }
  .print-pricing-label { font-size: 0.9rem; }
  .print-pricing-price { font-size: 1.1rem; font-weight: 700; white-space: nowrap; }
  .print-pricing-unit { font-size: 0.78rem; font-weight: 400; color: #888; margin-left: 0.1rem; }
  .print-pricing-note { margin: 0; color: #555; line-height: 1.4; }

  /* ── Footer ── */
  .print-footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    display: flex;
    gap: 2rem;
    font-size: 0.75rem;
    color: #888;
  }

  /* ── Print media ── */
  @media print {
    :global(body) { font-size: 11pt; }
    .print-root { padding: 0; max-width: 100%; }
    .print-h1 { font-size: 16pt; }
    .print-h2 { font-size: 12pt; }
    .print-divider { margin: 1rem 0; }
  }

  /* ── Screen only: subtle preview styling ── */
  @media screen {
    .print-root { padding: 3rem 2rem; }
    .print-header { background: #f8f8ff; border-radius: 12px; padding: 1.5rem; }
  }
</style>
