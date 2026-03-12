<script lang="ts">
  import logoSquare from '$images/logo-square.webp';
  import dsgvoSeal from '$images/dsgvo-konform.png';
  import lightHouseBatch from '$images/lighthouse.png';

  const benefits = [
    { icon: '🚀', title: 'Blitzschnell - in jeder Hinsicht', description: 'Von Beauftragung bis zum Go Live in unter zwei Wochen? Versprochen! Aber nicht nur die Umsetzung, auch deine neue Webseite wird super schnell sein: Instant Ladezeiten, verzögerungsfreie User-Experience.' },
    { icon: '✨', title: 'Modern & Zukunftssicher', description: 'Wir wissen, auf was es ankommt und setzen ausschließlich auf modernste Webtechnologien, Methoden und Tools: transparent, wartungsarm, erweiterbar, sicher, robust, nachhaltig.' },
    { icon: '🎯', title: 'So wie du es willst', description: 'Neues schaffen oder Bestehendes ausbauen? Upgrade gefällig? Wir heben auf Wunsch deine bestehende Webseite auf neue technische Füße – ohne Design und Inhalt neu zu erfinden.' },
    { icon: '📊', title: 'Verifizierbare Performance', description: 'Du, deine Kunden und Google werden deine neue Seite lieben. Wir garantieren einen Lighthouse-Score von mind. 95 % und liefern somit eine SEO-Basisoptimierung immer mit.' },
    { icon: '🎨', title: 'Individuelles Design – Top Notch', description: 'Kein Template, kein Baukasten, nur Best Practices kuratiert umgesetzt – maßgeschneidert nach deiner Marke (oder Designwunsch). UI & UX auf höchstem Niveau.' },
    { icon: '📱', title: 'Mobile First', description: 'Perfekte Darstellung auf jedem Gerät: Smartphone, Tablet, Desktop und alles dazwischen. Unsere Lösungen sind von Natur aus voll-responsiv!' },
    { icon: '🤝', title: 'Full Service & volle Flexibilität', description: 'Alles aus einer Hand – alles durch einen Ansprechpartner verantwortet: Konzept, Design, UI/UX, Frontend, Backend, Datenmodell, Administration.' },
    { icon: '🛡️', title: 'Sicher, zuverlässig, sorgenfrei', description: 'Code-Review durch Experten (keine Black-Box), DSGVO-konforme Umsetzung mit Impressum, Datenschutz und Cookie Consent, SSL/HTTPS by default, sichere Hosting-Infrastruktur in Deutschland.' },
    { icon: '☁️', title: 'Domain & Hosting inklusive', description: 'Wir betreiben deine Webseite innerhalb unserer Infrastruktur und verwalten auf Wunsch deine Domain / DNS. Im ersten Jahr sind Hosting und Wartung völlig kostenlos.' },
    { icon: '🌐', title: 'Keine Grenzen – Tausende Optionen', description: 'Benötigst du Special Features (Social Media Integration, Interaktive Karte, 3D-Tour, Mehrsprachigkeit, ...)? Jede denkbare Ergänzung, jeder Sonderwunsch ist möglich.' }
  ];

  const testimonials = [
    { quote: 'Ich bin nachhaltig beeindruckt, in welcher Geschwindigkeit produktionsreife Ergebnisse vorlagen. Auch wurde auf jede noch so kleine Anfrage direkt und ausführlich reagiert. Wir haben uns zu jeder Zeit perfekt aufgehoben gefühlt. Die Entscheidung raspb unsere Webseite erstellen zu lassen war ein echter Glücksgriff!', author: 'Julia Schumacher', company: 'Pro Civibus Stiftung GmbH' },
    { quote: 'Hier wird nicht nur umgesetzt, sondern auch mitgedacht. Wir haben unsere in die Jahre gekommene Webseite komplett modernisieren lassen. Dabei wurden Inhalte und unser Look & Feel übernommen, ohne das wir Arbeit damit hatten. Einfach nur Top.', author: 'Jens Klemann', company: 'STRATECO GmbH' },
    { quote: 'Auch sehr spezielle Anforderungen an die Gestaltung hat raspb pixel-perfect umgesetzt. Jeder Lösungsansatz wurde detailliert erklärt und man hat verständliche Empfehlungen erhalten. Man merkt sehr schnell, dass hier echte Kompetenz dahinter steht.', author: 'Lea Bell', company: 'Wunschwurm e.V.' }
  ];

  const pricingTiers = [
    {
      label: 'Webvisitenkarte', price: 399, featured: false,
      features: ['Einfach nur (unter eigener Domain) online sein', 'Simpler, aber individueller Einseiter', 'Die wichtigsten Infos direkt sichtbar (z.B. Anfahrt, Telefonnummer, Öffnungszeiten)', 'In 3 Tagen live, kein hin und her, kein Stress', 'Inklusive Hosting & Domain Mapping', 'Auch geeignet für individuelle Maintenance- oder Error-Seiten']
    },
    {
      label: 'One-Pager', price: 699, featured: false,
      features: ['Klassischer One-Pager mit Sprungmarken-Navigation', 'Scrollbare Seite mit mehreren Sektionen', 'Eigene Unterseiten für Impressum und Datenschutz', 'Details über Modal-Dialoge visualisierbar', 'Auch als Kampagnenseite oder Landing Page geeignet']
    },
    {
      label: 'Corporate Website', price: 999, featured: true,
      features: ['Der absolute Standard: Professioneller Unternehmensauftritt', 'Bis zu 10 Inhaltsseiten + Impressum, Datenschutz, Cookie Settings', 'Optimierte Navigation + Mobile Navigation', 'Kontaktformular mit Benachrichtigungs-Workflow inklusive', 'Passend für 90 % aller Vorhaben']
    }
  ];
</script>

<svelte:head>
  <title>raspb – Professionelle Webseite (Druckversion)</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="print-root">

  <!-- ─── HEADER ─────────────────────────────────────────────── -->
  <header class="print-header">
    <img src={logoSquare} alt="raspb" class="print-logo" />
    <div class="print-header-text">
      <h1 class="print-h1">Die beste Webseite, die du je hattest.</h1>
      <p class="print-sub">Professionell · Individuell · Modern · Schnell · Sicher · Bereits ab 399 €</p>
    </div>
  </header>

  <hr class="print-divider" />

  <!-- ─── BENEFITS ───────────────────────────────────────────── -->
  <section class="print-section">
    <h2 class="print-h2">Warum raspb – was du bekommst</h2>
    <div class="print-grid-3">
      {#each benefits as b}
        <div class="print-card">
          <div class="print-card-icon">{b.icon}</div>
          <strong class="print-card-title">{b.title}</strong>
          <p class="print-card-desc">{b.description}</p>
        </div>
      {/each}
      <div class="print-badge-cell">
        <img src={dsgvoSeal} alt="DSGVO konform" class="print-badge-img" />
        <img src={lightHouseBatch} alt="Lighthouse Score 95+" class="print-badge-img" />
      </div>
    </div>
  </section>

  <hr class="print-divider" />

  <!-- ─── TESTIMONIALS ───────────────────────────────────────── -->
  <section class="print-section">
    <h2 class="print-h2">Das sagen unsere Kunden</h2>
    <div class="print-grid-3">
      {#each testimonials as t}
        <figure class="print-quote">
          <blockquote class="print-blockquote">&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption class="print-figcaption">
            <strong>{t.author}</strong><br />{t.company}
          </figcaption>
        </figure>
      {/each}
    </div>
  </section>

  <hr class="print-divider" />

  <!-- ─── PRICING ────────────────────────────────────────────── -->
  <section class="print-section">
    <h2 class="print-h2">Das richtige Paket für dich</h2>
    <div class="print-grid-3">
      {#each pricingTiers as tier}
        <div class="print-pricing-card" class:print-pricing-featured={tier.featured}>
          {#if tier.featured}<div class="print-featured-label">Beliebteste Wahl</div>{/if}
          <div class="print-pricing-header">
            <strong class="print-pricing-label">{tier.label}</strong>
            <span class="print-pricing-price">ab {tier.price} €</span>
          </div>
          <ul class="print-feature-list">
            {#each tier.features as f}
              <li>✓ {f}</li>
            {/each}
          </ul>
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

  /* ── Benefit cards ── */
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

  /* ── Badge cell ── */
  .print-badge-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
  }
  .print-badge-img { max-height: 80px; width: auto; object-fit: contain; }

  /* ── Testimonials ── */
  .print-quote {
    margin: 0;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.78rem;
    break-inside: avoid;
  }
  .print-blockquote {
    margin: 0 0 0.5rem;
    font-style: italic;
    color: #333;
    line-height: 1.5;
  }
  .print-figcaption { color: #666; font-size: 0.75rem; }

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
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }
  .print-pricing-label { font-size: 0.9rem; }
  .print-pricing-price { font-size: 1.1rem; font-weight: 700; white-space: nowrap; }
  .print-feature-list {
    margin: 0;
    padding: 0;
    list-style: none;
    color: #444;
    line-height: 1.6;
  }

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
