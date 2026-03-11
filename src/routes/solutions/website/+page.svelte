<script lang="ts">
  import { onMount } from 'svelte';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { resolve } from '$app/paths';
  import Stage from '$lib/components/ui/stage.svelte';
  import GetAnAppointmentModal from '$lib/components/modals/general/get-an-appointment-modal.svelte';
  import logoSquare from '$images/logo-square.webp';
  import dsgvoSeal from '$images/dsgvo-konform.png';
  import lightHouseBatch from '$images/lighthouse.png';
  import { register } from 'swiper/element/bundle';

  function gotoExternal(target: string) {
    window.open(target, '_blank');
  }

  register();

  let appointmentModal: GetAnAppointmentModal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let testimonialSwiper: any;

  const testimonials = [
    { quote: 'Ich bin nachhaltig beeindruckt, in welcher Geschwindigkeit produktionsreife Ergebnisse vorlagen. Auch wurde auf jede noch so kleine Anfrage direkt und ausführlich reagiert. Wir haben uns zu jeder Zeit perfekt aufgehoben gefühlt. Die Entscheidung raspb unsere Webseite erstellen zu lassen war ein echter Grlücksgriff!', author: 'Julia Schumacher', company: 'Pro Civibus Stiftung GmbH' },
    { quote: 'Hier wird nicht nur umgesetzt, sondern auch mitgedacht. Wir haben unsere in die Jahre gekommene Webseite komplett modernisieren lassen. Dabei wurden Inhalte und unser Look & Feel übernommen, ohne das wir Arbeit damit hatte. Einfach nur Top. ', author: 'Jens Klemann', company: 'STRATECO GmbH' },
    { quote: 'Auch sehr spezielle Anforderungen an die Gestaltung hat raspb pixel-perfect umgesetzt. Jeder Lösungsansatz wurde detailliert erklärt und man hat verständliche Empfehlungen erhalten. Man merkt sehr schnell, dass hier echte Kompetenz dahinter steht.', author: 'Lea Bell', company: 'Wunschwurm e.V.' }
  ];

  onMount(() => {
    Object.assign(testimonialSwiper, {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      autoplay: { delay: 11000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.testimonial-pagination', clickable: true }
    });
    testimonialSwiper.initialize();
  });

  const benefits = [
    {
      id: 'fast',
      icon: '🚀',
      title: 'Blitzschnell - in jeder Hinsicht',
      description:
        'Von Beauftragung bis zum Go Live in unter zwei Wochen? Versprochen!<br>Aber nicht nur die Umsetzung, auch deine neue Webseite wird super schnell sein: Instant Ladezeiten, verzögerungsfreie User-Experience.'
    },
    {
      id: 'innovativ',
      icon: '✨',
      title: 'Modern & Zukunftssicher',
      description:
        'Wir wissen, auf was es ankommt und setzen ausschließlich auf modernste Webtechnologien, Methoden und Tools: transparent, wartungsarm, erweiterbar, sicher, robust, nachhaltig, ... '
    },
    {
      id: 'yourCommand',
      icon: '🎯',
      title: 'So wie du es willst',
      description:
        'Neues schaffen oder Bestehendes ausbauen? Upgrade gefällig? Wir heben <em>auf Wunsch</em> deine bestehende Webseite auf neue technische Füße - ohne Design und Inhalt neu zu erfinden.'
    },
    {
      id: 'reliable',
      icon: '📊',
      title: 'Verifizierbare Performance',
      description:
        'Du, deine Kunden und Google werden deine neue Seite lieben. Wir garantieren einen Lighthouse-Score von mind. 95% und liefern somit eine SEO-Basisoptimierung immer mit.'
    },
    {
      id: 'design',
      icon: '🎨',
      title: 'Individuelles Design - Top Notch',
      description:
        'Kein Template, kein Baukasten, nur Best Practices kuratiert umgesetzt - maßgeschneidert nach deiner Marke (oder Designwunsch). UI & UX auf höchstem Niveau.'
    },
    {
      id: 'mobile',
      icon: '📱',
      title: 'Mobile First',
      description: 'Perfekte Darstellung auf jedem Gerät: Smartphone, Tablet, Desktop und alles dazwischen. Unsere Lösungen sind von Natur aus voll-responsiv!'
    },
    {
      id: 'support',
      icon: '🤝',
      title: 'Full Service & volle Flexibilität',
      description:
        'Alles aus einer Hand - alles durch einen Ansprechpartner verantwortet: Konzept, Design, UI/UX, Frontend, Backend, Datenmodell, Administration, ... '
    },
    {
      id: 'secure',
      icon: '🛡️',
      title: 'Sicher, zuverlässig, sorgenfrei',
      description:
        'Code-Review durch Experten (keine Black-Box), DSGVO-konforme Umsetzung mit Impressum, Datenschutz und Cookie Consent, SSL/HTTPS by default, sichere Hosting-Infrastruktur in Deutschland, etc. '
    },
    {
      id: 'nobrainer',
      icon: '☁️',
      title: 'Domain & Hosting inklusive',
      description:
        'Wir betreiben deine Webseite innerhalb unserer Infrastruktur und verwalten auf Wunsch deine Domain / DNS. Im ersten Jahr sind Hosting und Wartung völlig kostenlos.'
    },
    {
      id: 'limitless',
      icon: '🌐',
      title: 'Keine Grenzen - Tausende Optionen',
      description:
        'Benötigst du Special Features (Social Media Integration, Interaktive Karte, 3D-Tour, Mehrsprachigkeit, ... )? Jede denkbare Ergänzung, jeder Sonderwunsch ist möglich.'
    }
  ];

  const pricingTiers = [
    {
      id: 'visitenkarte',
      label: 'Webvisitenkarte',
      price: 399,
      features: [
        'Einfach nur (unter eigener Domain) online sein',
        'Simpler, aber individueller Einseiter',
        'Die wichtigsten Infos direkt sichtbar (z.B. Anfahrt, Telefonnummer, Öffnungszeiten)',
        'In 3 Tagen live, kein hin und her, kein Stress',
        'Inklusive Hosting & Domain Mapping',
        'Auch geeignet für individuelle Maintenance- oder Error-Seiten'
      ]
    },
    {
      id: 'onepager',
      label: 'One-Pager',
      price: 699,
      features: [
        'Klassischer One-Pager mit Sprungmarken-Navigation',
        'Scrollbare Seite mit mehreren Sektionen',
        'Eigene Unterseiten für Impressum und Datenschutz',
        'Details über Modal-Dialoge visualisierbar',
        'Auch als Kampagnenseite oder Landing page geeignet',
      ]
    },
    {
      id: 'corporate',
      label: 'Corporate Website',
      price: 999,
      featured: true,
      features: [
        'Der absolute Standard: Professioneller Unternehmensauftritt',
        'Bis zu zu 10 Inhaltsseiten + Impressum, Datenschutz, Cookie Settings',
        'Optimierte Navigation + Mobile Navigation',
        'Kontaktformular mit Benachrichtigungs-Workflow inklusive',
        'Passend für 90% aller Vorhaben'
      ]
    }
  ];
</script>

<svelte:head>
  <title>Professionelle Webseite unter 1.000 € | raspb</title>
  <meta name="description" content="Die beste Webseite, die Sie je hatten – für unter 1.000 €. Modern, schnell, und maßgeschneidert für Ihr Unternehmen." />
</svelte:head>

<!-- ─── HERO (above the fold, raspb gradient) ────────────────── -->
<Stage style="basic-gradient">
  <div class="flex min-h-screen w-full flex-col">
    <!-- Nav: logo only, no links to other LPs -->
    <nav class="flex w-full items-center px-6 py-6 md:px-12">
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      <a href={resolve(localizeHref('/') as any)}>
        <img src={logoSquare} alt="raspb" class="h-16 w-auto" />
      </a>
    </nav>

    <!-- Hero content -->
    <div class="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-16 text-center">
      <div class="badge badge-outline border-white/40 text-white">bereits ab 399 €</div>
      <h1 class="massive animate-fade-in-up">
        Die beste Webseite,<br />
        die du je hattest!
      </h1>
      <p class="small-teaser  max-w-4xl">
        Professionell und individuell nach deinen Vorgaben erstellte Unternehmenswebseite:<br>modern - schnell - sicher<br />
        Kein Template-Einheitsbrei. Kein Abo. Keine versteckten Kosten.
      </p>
      <div class="flex flex-wrap justify-center gap-4 pt-2">
        <button class="btn-basic animate-fade-in-from-side" onclick={() => appointmentModal?.openModal()}> Jetzt Termin buchen </button>
        <a href="#benefits" class="btn-inverted-outline animate-fade-in-from-side"> Was ist alles für mich drin? </a>
      </div>
    </div>
  </div>
</Stage>

<!-- ─── BENEFITS ─────────────────────────────────────────────── -->
<section class="w-full pt-20 pb-24">
  <div id="benefits" class="mx-auto max-w-7xl px-4 pt-4">
    <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">
      Nur das Beste für dich - warum du deine Webseite von <span class="inner-text-special">raspb</span> erstellen lassen solltest
    </h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each benefits as benefit (benefit.id)}
        <div class="card border-base-300 bg-base-100 border shadow-sm transition hover:shadow-lg">
          <div class="card-body gap-3">
            <span class="text-3xl">{benefit.icon}</span>
            <h3 class="card-title">{benefit.title}</h3>
            <p class="text-base-content/70 text-sm">{@html benefit.description}</p>
          </div>
        </div>
      {/each}
      <!-- DSGVO Siegel -->
      <div class="flex items-center justify-center p-6 cursor-pointer opacity-80 hover:opacity-100" onclick={() => { gotoExternal('https://de.wikipedia.org/wiki/Datenschutz-Grundverordnung')}} aria-label="Datenschutz-Grundverordnung">
        <img src={dsgvoSeal} alt="DSGVO konform" class="max-h-40 w-auto object-contain" />
      </div>
      <div class="flex items-center justify-center p-6 cursor-pointer opacity-80 hover:opacity-100" onclick={() => { gotoExternal('https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?hl=de')}} aria-label="Lighthouse-Leistungsbewertung">
        <img src={lightHouseBatch} alt="DSGVO konform" class="max-h-40 w-auto object-contain" />
      </div>
    </div>
  </div>
</section>

<!-- ─── SOCIAL PROOF ──────────────────────────────────────────── -->
<section class="bg-base-200 w-full overflow-hidden py-24">
  <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">Das sagen unsere Kunden</h2>
  <swiper-container bind:this={testimonialSwiper} init="false">
    {#each testimonials as t (t.author)}
      <swiper-slide>
        <figure class="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-base-300 bg-linear-to-br from-base-100 to-base-200/60 px-12 py-12 shadow-lg shadow-base-300/60">
          <blockquote class="text-lg leading-relaxed text-base-content/80 italic text-center">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption class="flex flex-col items-center gap-1">
            <span class="font-semibold">{t.author}</span>
            <span class="text-sm text-base-content/50">{t.company}</span>
          </figcaption>
        </figure>
      </swiper-slide>
    {/each}
  </swiper-container>
  <div class="testimonial-pagination mt-8 flex justify-center gap-2"></div>
</section>

<!-- ─── PRICING ───────────────────────────────────────────────── -->
<section class="w-full py-24">
  <div class="mx-auto max-w-7xl px-4">
    <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">Das richtige Paket für dich</h2>
    <div class="grid gap-6 md:grid-cols-3">
      {#each pricingTiers as tier (tier.id)}
        <div class="card bg-base-100 flex flex-col shadow-xl {tier.featured ? 'border-primary border-2' : 'border-base-300 border'}">
          <div class="card-body items-center gap-6 text-center">
            {#if tier.featured}
              <span class="badge badge-primary">Beliebteste Wahl</span>
            {:else}
              <span class="badge badge-secondary">Einmalpreis</span>
            {/if}
            <h3 class="text-xl font-bold">{tier.label}</h3>
            <div class="flex items-baseline gap-2">
              <span class="text-base-content/50 text-sm">ab</span>
              <span class="text-5xl font-bold">{tier.price} €</span>
            </div>
            <ul class="w-full space-y-3 text-left text-sm">
              {#each tier.features as feature (feature)}
                <li class="flex items-center gap-2">
                  <span class="text-primary font-bold">✓</span>
                  {feature}
                </li>
              {/each}
            </ul>
            <div class="card-actions mt-auto w-full">
              <button class="btn w-full {tier.featured ? 'btn-primary' : 'btn-outline'}" onclick={() => appointmentModal?.openModal()}>
                Gespräch vereinbaren
              </button>
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

<style lang="postcss">
  @reference '../../../app.css';
  :global(.testimonial-pagination .swiper-pagination-bullet) {
    @apply bg-primary/30 h-2.5 w-2.5 cursor-pointer rounded-full transition-all;
  }
  :global(.testimonial-pagination .swiper-pagination-bullet-active) {
    @apply bg-primary w-6;
  }
</style>
