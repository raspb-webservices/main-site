<script lang="ts">
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';

  interface Certificate {
    id: string;
    name: string;
    issuer: string;
    issuerLogo: string;
    date: string;
    category: 'ai-expertise' | 'legal' | 'fundamentals';
    description: string;
    credentialId?: string;
    verificationUrl?: string;
  }

  const certificates: Certificate[] = [
    // Anthropic AI Academy
    {
      id: 'claude-101',
      name: 'Claude 101',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Grundlagen des Claude-Modells und seiner Fähigkeiten'
    },
    {
      id: 'claude-code-101',
      name: 'Claude Code 101',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Programmierung und Code-Generierung mit Claude'
    },
    {
      id: 'claude-code-in-action',
      name: 'Claude Code in Action',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Praktische Anwendung von Claude Code in Projekten'
    },
    {
      id: 'claude-with-the-anthropic-api',
      name: 'Claude with the Anthropic API',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Integration der Anthropic API in Anwendungen'
    },
    {
      id: 'claude-with-amazon-bedrock',
      name: 'Claude with Amazon Bedrock',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Deployment von Claude über Amazon Bedrock'
    },
    {
      id: 'claude-with-google-vertex-ai',
      name: 'Claude with Google Vertex AI',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Integration von Claude in Google Cloud Vertex AI'
    },
    {
      id: 'introduction-to-agent-skills',
      name: 'Introduction to Agent Skills',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Entwicklung und Verwaltung von KI-Agent-Fähigkeiten'
    },
    {
      id: 'introduction-to-claude-cowork',
      name: 'Introduction to Claude CoWork',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Kollaborative Arbeit mit Claude in Teams'
    },
    {
      id: 'introduction-to-model-context-protocol',
      name: 'Introduction to Model Context Protocol',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Grundlagen des Model Context Protocol (MCP)'
    },
    {
      id: 'introduction-to-subagents',
      name: 'Introduction to Subagents',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Erstellung und Verwaltung von Sub-Agents'
    },
    {
      id: 'model-context-protocol-advanced-topics',
      name: 'Model Context Protocol – Advanced Topics',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'ai-expertise',
      description: 'Fortgeschrittene Konzepte des Model Context Protocol'
    },
    {
      id: 'ai-fluency-framework-and-foundation',
      name: 'AI Fluency – Framework and Foundation',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'Grundlegende KI-Kompetenzen und Frameworks'
    },
    {
      id: 'ai-fluency-ai-capabilities-and-limitations',
      name: 'AI Fluency – AI Capabilities and Limitations',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'Verständnis von KI-Fähigkeiten und Grenzen'
    },
    {
      id: 'ai-fluency-for-educators',
      name: 'AI Fluency for Educators',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'KI-Kompetenzen für Bildungsakteure'
    },
    {
      id: 'ai-fluency-for-nonprofits',
      name: 'AI Fluency for Nonprofits',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'KI-Anwendung für Non-Profit-Organisationen'
    },
    {
      id: 'ai-fluency-for-students',
      name: 'AI Fluency for Students',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'KI-Bildung für Studierende'
    },
    {
      id: 'teaching-the-ai-fluency-framework',
      name: 'Teaching the AI Fluency Framework',
      issuer: 'Anthropic',
      issuerLogo: '/images/certificates/logos/anthropic.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'Vermittlung von KI-Kompetenzen'
    },
    // eRecht24
    {
      id: 'erecht24-ki-day-2026',
      name: 'KI Day 2026',
      issuer: 'eRecht24',
      issuerLogo: '/images/certificates/logos/erecht24.svg',
      date: '25.02.2026',
      category: 'legal',
      description: 'Strategische, praktische und rechtssichere Nutzung von KI-Systemen im Unternehmenskontext'
    },
    // Google
    {
      id: 'google-ai-fundamentals',
      name: 'AI Fundamentals',
      issuer: 'Google',
      issuerLogo: '/images/certificates/logos/google.svg',
      date: '2025',
      category: 'fundamentals',
      description: 'Grundlagen der KI und maschinelles Lernen'
    }
  ];

  const categories = [
    { id: 'ai-expertise', label: 'KI-Expertise', icon: '🤖', color: 'primary' },
    { id: 'legal', label: 'Recht & Compliance', icon: '⚖️', color: 'secondary' },
    { id: 'fundamentals', label: 'Grundlagen', icon: '📚', color: 'accent' }
  ];

  let activeCategory = $state<string | null>(null);
  let hoveredCert = $state<string | null>(null);

  function filterByCategory(categoryId: string | null) {
    activeCategory = activeCategory === categoryId ? null : categoryId;
  }

  function getFilteredCertificates() {
    if (!activeCategory) return certificates;
    return certificates.filter(c => c.category === activeCategory);
  }
</script>

<svelte:head>
  <title>Zertifikate & Qualifikationen | Markus Härtig – AI Experte</title>
  <meta name="description" content="19 Zertifikate und Qualifikationen in Künstlicher Intelligenz von Anthropic, Google und eRecht24. Nachweisbare Expertise in KI-Agenten, MCP und rechtssicherer KI-Nutzung." />
  <meta property="og:title" content="Zertifikate & Qualifikationen | Markus Härtig – AI Experte" />
  <meta property="og:description" content="19 Zertifikate und Qualifikationen in Künstlicher Intelligenz. Nachweisbare Expertise in KI-Agenten, MCP und rechtssicherer KI-Nutzung." />
</svelte:head>

<Stage style="fancy-gradient">
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">Zertifikate & <span class="inner-text-special">Qualifikationen</span></h1>
    <p class="teaser animate-fade-in-up">19 nachgewiesene Kompetenzen in Künstlicher Intelligenz — von Anthropic, Google und eRecht24.</p>
  </div>
</Stage>

<Section noSpacing={true}>
  <div class="inner-box animate-fade-in-up prose pt-24 pb-12">
    <div class="text-center">
      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3">
        <span class="text-3xl font-bold text-primary">{certificates.length}</span>
        <span class="text-base-content/70">Zertifikate</span>
      </div>
    </div>
  </div>
</Section>

<Section noSpacing={true}>
  <div class="inner-box animate-fade-in-up pt-4 pb-12">
    <div class="flex flex-wrap justify-center gap-3">
      {#each categories as category (category.id)}
        <button
          class="btn btn-lg {activeCategory === category.id ? `btn-${category.color}` : 'btn-outline'}"
          onclick={() => filterByCategory(category.id)}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
          <span class="badge badge-sm">{certificates.filter(c => c.category === category.id).length}</span>
        </button>
      {/each}
    </div>
  </div>
</Section>

<Section noSpacing={true}>
  <div class="inner-box animate-fade-in-up pt-4 pb-24">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each getFilteredCertificates() as cert, index (cert.id)}
        <div
          class="card bg-base-100 border border-base-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style="animation-delay: {index * 0.05}s"
          role="article"
          onmouseenter={() => hoveredCert = cert.id}
          onmouseleave={() => hoveredCert = null}
        >
          <div class="card-body p-6">
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200">
                {#if cert.category === 'ai-expertise'}
                  <span class="text-2xl">🤖</span>
                {:else if cert.category === 'legal'}
                  <span class="text-2xl">⚖️</span>
                {:else}
                  <span class="text-2xl">📚</span>
                {/if}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="card-title text-lg leading-tight">{cert.name}</h3>
                <p class="text-sm text-base-content/60">{cert.issuer} · {cert.date}</p>
              </div>
            </div>
            
            <p class="mt-4 text-sm leading-relaxed text-base-content/70">
              {cert.description}
            </p>
            
            <div class="mt-4 flex items-center gap-2">
              <span class="badge badge-{cert.category === 'ai-expertise' ? 'primary' : cert.category === 'legal' ? 'secondary' : 'accent'} badge-outline">
                {cert.category === 'ai-expertise' ? 'KI-Expertise' : cert.category === 'legal' ? 'Recht' : 'Grundlagen'}
              </span>
            </div>
            
            <div class="mt-4">
              {#if cert.id === 'google-ai-fundamentals'}
                <a 
                  href="/images/certificates/google-ai-fundamentals.png" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-ghost btn-xs"
                >
                  📄 Zertifikat ansehen
                </a>
              {:else}
                <a 
                  href="/images/certificates/pdf/{cert.id}.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-ghost btn-xs"
                >
                  📄 Zertifikat ansehen
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Section>

<Section noSpacing={true}>
  <div class="inner-box animate-fade-in-up pt-8 pb-24">
    <div class="prose m-auto max-w-4xl text-center">
      <h2>Was diese Zertifikate <span class="inner-text-special">beweisen</span></h2>
    </div>
    
    <div class="grid grid-cols-1 gap-8 pt-12 md:grid-cols-3">
      <div class="stat bg-base-200 rounded-2xl p-6 text-center">
        <div class="stat-title">Technische Tiefe</div>
        <div class="stat-value text-primary">11</div>
        <div class="stat-desc">Anthropic Kurse zu Claude, API, MCP und Agenten</div>
      </div>
      
      <div class="stat bg-base-200 rounded-2xl p-6 text-center">
        <div class="stat-title">Rechtliche Absicherung</div>
        <div class="stat-value text-secondary">✓</div>
        <div class="stat-desc">eRecht24 KI Day – DSGVO-konforme KI-Nutzung</div>
      </div>
      
      <div class="stat bg-base-200 rounded-2xl p-6 text-center">
        <div class="stat-title">Fundamentales Verständnis</div>
        <div class="stat-value text-accent">7</div>
        <div class="stat-desc">Google & Anthropic Grundlagen-Kompetenzen</div>
      </div>
    </div>
    
    <div class="prose m-auto max-w-3xl pt-16 text-center">
      <p class="text-lg leading-relaxed">
        Diese Zertifikate belegen meine Expertise in der <strong>praktischen KI-Entwicklung</strong> — 
        von der API-Integration über Agent-Architekturen bis hin zur <strong>rechtssicheren Implementierung</strong> 
        in Unternehmen. Kombiniert mit über 15 Jahren Erfahrung in der Softwareentwicklung 
        und meinem Fokus auf KI-gestützte Automatisierung.
      </p>
    </div>
  </div>
</Section>

<Section>
  <div class="inner-box prose m-auto max-w-3xl text-center">
    <h2>Bereit für <span class="inner-text-special">KI-Exzellenz</span>?</h2>
    <p>Lassen Sie uns besprechen, wie ich meine nachgewiesene Expertise für Ihr Unternehmen einsetzen kann.</p>
    <div class="flex justify-center gap-4 pt-4">
      <a href="/de/kontakt" class="btn btn-primary btn-lg">Kontakt aufnehmen</a>
      <a href="/de/leistungen" class="btn btn-outline btn-lg">Leistungen ansehen</a>
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../../../app.css';
  
  .card {
    @apply transition-all duration-300;
  }
  
  .stat {
    @apply transition-all duration-300;
  }
  
  .stat:hover {
    @apply -translate-y-1 shadow-lg;
  }
</style>
