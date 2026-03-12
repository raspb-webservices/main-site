<script lang="ts">
  import { localizeHref } from '$lib/paraglide/runtime';
  import { resolve } from '$app/paths';
  import Stage from '$lib/components/ui/stage.svelte';
  import GetAnAppointmentModal from '$lib/components/modals/general/get-an-appointment-modal.svelte';
  import logoSquare from '$images/logo-square.webp';

  let appointmentModal: GetAnAppointmentModal;

  const services = [
    {
      id: 'ai',
      icon: '🧠',
      title: 'KI Use Cases & Architektur',
      description: 'Von der Idee zum produktiven KI-Feature: RAG, Agents, LLM-Integration, Prompt Engineering.'
    },
    {
      id: 'dev',
      icon: '⚙️',
      title: 'Individualentwicklung',
      description: 'Full-Stack-Entwicklung, API-Design, Systemintegration. Modern, wartbar, ohne technische Schulden.'
    },
    {
      id: 'consulting',
      icon: '📐',
      title: 'Technisches Consulting',
      description: 'Architektur-Review, Tech-Stack-Entscheidungen, Code-Qualität – ich sage, was ich sehe.'
    },
    {
      id: 'mvp',
      icon: '🚀',
      title: 'MVP & Prototyping',
      description: 'Schnell zur lauffähigen Demo. Ideal für Investoren-Präsentationen und interne Validierung.'
    },
    {
      id: 'audit',
      icon: '🔍',
      title: 'Code-Audit & Debugging',
      description: 'Hartnäckige Bugs, Performance-Probleme, Security-Review – ich finde, was andere übersehen.'
    },
    {
      id: 'augmentation',
      icon: '🏋️',
      title: 'Team-Augmentation',
      description: 'Temporäre Verstärkung für Ihr Entwicklungsteam – nahtlose Integration, sofort produktiv.'
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

  const pricingTiers = [
    {
      id: 'day',
      label: 'Tagesengagement',
      price: '1.000 €',
      unit: '/Tag',
      featured: false,
      note: 'Ideal für konkrete Aufgaben & Workshops'
    },
    {
      id: 'sprint',
      label: 'Sprint (5 Tage)',
      price: '4.500 €',
      unit: '/Woche',
      featured: true,
      note: 'Für ein vollständiges Feature oder MVP-Segment'
    }
  ];
</script>

<svelte:head>
  <title>Experten-Support auf Abruf – 1.000 €/Tag | raspb</title>
  <meta
    name="description"
    content="Senior-Entwickler, KI-Architekt, Consultant – genau wenn Sie ihn brauchen. Tagessatz 1.000 €. Kein Overhead. Kein Headcount."
  />
</svelte:head>

<!-- ─── HERO ──────────────────────────────────────────────────── -->
<Stage style="basic-gradient">
  <div class="flex min-h-screen w-full flex-col">
    <nav class="flex w-full items-center px-6 py-6 md:px-12">
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      <a href={resolve(localizeHref('/') as any)}>
        <img src={logoSquare} alt="raspb" class="h-16 w-auto" />
      </a>
    </nav>

    <div class="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-16 text-center">
      <div class="badge badge-outline border-white/40 text-white">1.000 € / Tag</div>
      <h1 class="massive animate-fade-in-up">Rent an Expert.</h1>
      <p class="small-teaser max-w-4xl">
        Senior-Entwickler, KI-Architekt und Consultant –<br />
        genau dann, wenn Sie ihn brauchen.<br />
        Kein Overhead. Kein Headcount.
      </p>
      <div class="flex flex-wrap justify-center gap-4 pt-2">
        <button class="btn-basic animate-fade-in-from-side" onclick={() => appointmentModal?.openModal()}> Jetzt anfragen </button>
        <a href="#services" class="btn-inverted-outline animate-fade-in-from-side"> Was ich mache </a>
      </div>
    </div>
  </div>
</Stage>

<!-- ─── LEISTUNGEN ───────────────────────────────────────────── -->
<section id="services" class="w-full py-24">
  <div class="mx-auto max-w-7xl px-4">
    <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">Womit ich helfe</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each services as service (service.id)}
        <div class="card border-base-300 bg-base-100 border shadow-sm transition hover:shadow-lg">
          <div class="card-body gap-3">
            <span class="text-3xl">{service.icon}</span>
            <h3 class="card-title">{service.title}</h3>
            <p class="text-base-content/70 text-sm">{service.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── HOW IT WORKS ─────────────────────────────────────────── -->
<section class="bg-base-200 w-full py-24">
  <div class="mx-auto max-w-3xl px-4">
    <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">So funktioniert es</h2>
    <div class="flex flex-col gap-8">
      {#each steps as step, i (step.id)}
        <div class="flex items-start gap-6">
          <span class="bg-primary text-primary-content flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold">
            {i + 1}
          </span>
          <div>
            <h3 class="mb-1 font-semibold">{step.title}</h3>
            <p class="text-base-content/70 text-sm">{step.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── PRICING ───────────────────────────────────────────────── -->
<section class="w-full py-24">
  <div class="mx-auto max-w-4xl px-4">
    <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">Transparente Konditionen</h2>
    <div class="grid gap-6 md:grid-cols-2">
      {#each pricingTiers as tier (tier.id)}
        <div class="card bg-base-100 flex flex-col shadow-xl {tier.featured ? 'border-primary border-2' : 'border-base-300 border'}">
          <div class="card-body items-center gap-6 text-center">
            {#if tier.featured}
              <span class="badge badge-primary">Beliebteste Wahl</span>
            {:else}
              <span class="badge badge-secondary">Einzeltag</span>
            {/if}
            <h3 class="text-xl font-bold">{tier.label}</h3>
            <div class="flex items-baseline gap-2">
              <span class="text-5xl font-bold">{tier.price}</span>
              <span class="text-base-content/50">{tier.unit}</span>
            </div>
            <p class="text-base-content/60 flex-1 text-sm">{tier.note}</p>
            <div class="card-actions mt-auto w-full">
              <button class="btn w-full {tier.featured ? 'btn-primary' : 'btn-outline'}" onclick={() => appointmentModal?.openModal()}>Termin buchen </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── FOOTER STRIP ─────────────────────────────────────────── -->
<footer class="border-base-300 flex flex-col items-center gap-4 border-t px-6 py-8 text-center">
  <div class="flex flex-wrap justify-center gap-6 text-sm">
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/imprint') as any)} class="text-base-content/60 hover:text-primary no-underline transition">Impressum</a>
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/privacy') as any)} class="text-base-content/60 hover:text-primary no-underline transition">Datenschutz</a>
    <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
    <a href={resolve(localizeHref('/') as any)} class="text-base-content/60 hover:text-primary no-underline transition">Zur Hauptseite</a>
  </div>
  <p class="text-base-content/40 text-xs">© {new Date().getFullYear()} raspb – Alle Rechte vorbehalten</p>
</footer>

<!-- ─── MODALS ────────────────────────────────────────────────── -->
<GetAnAppointmentModal bind:this={appointmentModal} />
