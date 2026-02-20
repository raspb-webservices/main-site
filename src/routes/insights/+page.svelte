<script lang="ts">
  import Section from '/components/ui/section.svelte';
  import TechLogoShowcase from '/components/tech-logo-showcase.svelte';
  import Stage from '/components/ui/stage.svelte';
  import ReferenceCard from '/components/projects/ReferenceCard.svelte';
  import { onMount } from 'svelte';
  import { m } from '/paraglide/messages';
  import { getLocale, localizeHref, setLocale } from '/paraglide/runtime';

  let activeContent = ('tech');

  const projects = [
    {
      name: 'Wunschwurm',
      description: 'Komplexe Plattform für soziale Initiativen in Mainz. Digitalisierung von Wunschzetteln, Nutzerverwaltung für verschiedene Rollen und Tracking des Erfüllungsprozesses.',
      image: '/assets/projects/wunschwurm-hero.jpg',
      isLighthouse: true,
      url: 'https://wunschwurm.de',
      tech: ['SvelteKit', 'Hygraph', 'Auth0', 'Mapbox']
    },
    {
      name: 'SC Hahnheim',
      description: 'Frischer digitaler Auftritt für den lokalen Sportverein. Selbstständige Inhaltspflege durch jede Abteilung und pflegbarer Vereinskalender.',
      image: '/assets/projects/sc-hahnheim.jpg',
      url: 'https://sc-hahnheim.de/',
      tech: ['SvelteKit', 'Hygraph', 'TailwindCSS']
    },
    {
      name: 'Pro Civibus Stiftung',
      description: 'Corporate Excellence für eine Mainzer Stiftung. Interaktive Historie, LinkedIn-Integration und automatisierte Kontakt-Flows.',
      image: '/assets/projects/pro-civibus.jpg',
      url: 'https://pro-civibus-stiftung.de/',
      tech: ['SvelteKit', 'LinkedIn-API', 'TailwindCSS']
    },
    {
      name: 'Schumacher & Gienow',
      description: 'Moderner Kanzlei-Relaunch in Frankfurt. Wordpress-Ablöse mit vollständigem Content-Scraping und optimierten Prozess-Flows.',
      image: '/assets/projects/schumacher-gienow.jpg',
      url: 'https://schumacher-gienow.de/',
      tech: ['SvelteKit', 'Scraping', 'TailwindCSS']
    },
    {
      name: 'MGV Hahnheim',
      description: 'Agilität in Bestform: Eine moderne, sichere Inhaltsseite, in wenigen Stunden live gesetzt – ohne Qualitätsverlust.',
      image: '/assets/projects/mgv-hahnheim.jpg',
      url: 'https://mgv-1880-86-hahnheim.de/',
      tech: ['SvelteKit', 'DaisyUI', 'Node.js']
    }
  ];

  const handleHashChange = (event: HashChangeEvent) => {
    const newHash = new URL(event.newURL).hash.slice(1);
    if (newHash === 'tech' || newHash === 'project' || newHash === 'showcase') {
      activeContent = newHash;
      setTimeout(() => {
        scrollToSection('insights-content-container');
      }, 250);
    }
  };

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
    const hashString = hash.slice(1);
    if (hashString === 'tech' || hashString === 'project' || hashString === 'showcase') {
      activeContent = hashString;
      scrollToSection('insights-content-container');
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });
</script>

<svelte:head>
  <title>{m.insights_meta_title()}</title>
  <meta name="description" content={m.insights_meta_description()} />
  <meta property="og:title" content={m.insights_meta_title()} />
  <meta property="og:description" content={m.insights_meta_description()} />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">{m.insights_header_title()}</h1>
    <p class="teaser animate-fade-in-up">{m.insights_header_subtitle()}</p>
  </div>

  <div class="inner-box reduced -mt-12 -mb-24">
    <div class="tab-tile-collection fade-in">
      <button
        class="tab-tile tech"
        class:active={activeContent === 'tech'}
        onclick={() => {
          activeContent = 'tech';
          scrollToSection('insights-content-container');
        }}
      >
        <h3 class="add-padding">{m.insights_tabs_tech_title()}</h3>
        <p>{m.insights_tabs_tech_description()}</p>
      </button>
      <button
        class="tab-tile project"
        class:active={activeContent === 'project'}
        onclick={() => {
          activeContent = 'project';
          scrollToSection('insights-content-container');
        }}
      >
        <h3 class="add-padding">{m.insights_tabs_project_title()}</h3>
        <p>{m.insights_tabs_project_description()}</p>
      </button>
      <button
        class="tab-tile showcase"
        class:active={activeContent === 'showcase'}
        onclick={() => {
          activeContent = 'showcase';
          scrollToSection('insights-content-container');
        }}
      >
        <h3 class="add-padding">{m.insights_tabs_showcase_title()}</h3>
        <p>{m.insights_tabs_showcase_description()}</p>
      </button>
    </div>
  </div>
</Stage>

<div id="insights-content-container" class="mt-16">
  {#if activeContent === 'tech'}
    <Section noSpacing={true}>
      <div class="inner-box fade-in prose pt-36 pb-16">
        <h2>
          {m.insights_techInsights_titleFirst()} <span class="inner-text-special">{m.insights_techInsights_titleHighlight()}</span>
          {m.insights_techInsights_titleSecond()}
        </h2>
        <p class="teaser">
          {@html m.insights_techInsights_teaser()}
        </p>
      </div>
    </Section>

    <Section fullWidth={true} noSpacing={true}>
      <TechLogoShowcase speed={0.15} />
    </Section>

    <Section noSpacing={true}>
      <div class="inner-box animate-fade-in-up prose py-24">
        <h2>{m.insights_webtechnologien_title()}</h2>
        <p class="teaser">
          {m.insights_webtechnologien_subtitle()}
        </p>
        <div class="bg-base-200 prose rounded-2xl p-8 shadow-lg">
          <h3 class="text-primary pt-1">{m.insights_webtechnologien_absatz1headline()}</h3>
          <p class="leading-relaxed">
            {@html m.insights_webtechnologien_absatz1()}
          </p>
          <h3 class="text-primary pt-6">{m.insights_webtechnologien_absatz2headline()}</h3>
          <p class="leading-relaxed">
            {@html m.insights_webtechnologien_absatz2()}
          </p>
          <h3 class="text-primary pt-6">{m.insights_webtechnologien_absatz3headline()}</h3>
          <p class="mb-4 leading-relaxed">
            {@html m.insights_webtechnologien_absatz3()}
          </p>

          <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html m.insights_webtechnologien_vorteile_sicherheit()}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html m.insights_webtechnologien_vorteile_performance()}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html m.insights_webtechnologien_vorteile_skalierbarkeit()}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html m.insights_webtechnologien_vorteile_skalierbarkeit2()}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html m.insights_webtechnologien_vorteile_entwicklerfreundlichkeit()}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html m.insights_webtechnologien_vorteile_kosteneffizienz()}</p>
            </div>
          </div>
          <h3 class="text-primary pt-6">{m.insights_webtechnologien_absatz4headline()}</h3>
          <p class="leading-relaxed">
            {@html m.insights_webtechnologien_absatz4()}
          </p>
          <h3 class="text-primary pt-6">{m.insights_webtechnologien_absatz5headline()}</h3>
          <p class="leading-relaxed">
            {@html m.insights_webtechnologien_absatz5()}
          </p>
        </div>
      </div>
    </Section>
  {:else if activeContent === 'project'}
    <Section noSpacing={true}>
      <div class="inner-box animate-fade-in-up prose pt-36 pb-24">
        <h2 class="text-4xl font-bold">
          {m.insights_projectInsights_titleFirst()} <span class="inner-text-special">{m.insights_projectInsights_titleHighlight()}</span>
          {m.insights_projectInsights_titleSecond()}?
        </h2>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph1()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph2()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph3()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph4()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph5()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph6()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph7()}
        </p>
        <p class="animate-fade-in-up">
          {@html m.insights_projectInsights_paragraph8()}
        </p>
      </div>
    </Section>
  {:else if activeContent === 'showcase'}
    <Section noSpacing={true}>
      <div class="inner-box animate-fade-in-up prose pt-36 pb-24">
        <h2>{m.insights_showcase_title()}</h2>
        <p>{m.insights_showcase_description()}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {#each projects as project}
            <ReferenceCard {project} />
          {/each}
        </div>
      </div>
    </Section>
  {/if}
</div>

<style lang="postcss">
  @reference "../../app.css";

  .tab-tile-collection {
    @apply flex flex-wrap items-center justify-center gap-12 lg:flex-nowrap;
    .tab-tile {
      @apply flex aspect-square w-60 flex-col items-center justify-center rounded-3xl bg-white p-6 text-center text-black drop-shadow-2xl;
      &:hover {
        @apply cursor-pointer bg-neutral-100 drop-shadow-lg;
      }
      &.active,
      &.active:hover {
        @apply cursor-default bg-neutral-50 drop-shadow-lg;
      }

      &.tech {
        &:hover,
        &.active {
          h3 {
            @apply text-lightBlue;
          }
        }
      }
      &.project {
        &:hover,
        &.active {
          h3 {
            @apply text-purple2;
          }
        }
      }
      &.showcase {
        &:hover,
        &.active {
          h3 {
            @apply text-pink;
          }
        }
      }
    }
  }
</style>