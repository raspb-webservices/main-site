<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import TechLogoShowcase from '$lib/components/tech-logo-showcase.svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';

  let activeContent = $state('tech');

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
  });

  onDestroy(() => {
    window.removeEventListener('hashchange', handleHashChange);
  });
</script>

<svelte:head>
  <title>{$_('insights.meta.title')}</title>
  <meta name="description" content={$_('insights.meta.description')} />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box reduced py-36 prose">
    <h1 class="massive animate-fade-in-up">{$_('insights.header.title')}</h1>
    <p class="teaser animate-fade-in-up">{$_('insights.header.subtitle')}</p>
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
        <h3 class="add-padding">Wir funktioniert raspb?</h3>
        <p>Hier gibt es Einblicke in unsere Technolgisches Ökossystem.</p>
      </button>
      <button
        class="tab-tile project"
        class:active={activeContent === 'project'}
        onclick={() => {
          activeContent = 'project';
          scrollToSection('insights-content-container');
        }}
      >
        <h3 class="add-padding">Wie läuft ein Projekt bei raspb?</h3>
        <p>Ein typisches Projekt vom Konfigurator zum Go-Live.</p>
      </button>
      <button
        class="tab-tile showcase"
        class:active={activeContent === 'showcase'}
        onclick={() => {
          activeContent = 'showcase';
          scrollToSection('insights-content-container');
        }}
      >
        <h3 class="add-padding">Wie sehen die Ergebnisse aus?</h3>
        <p>Finden Sie hier eine Auswahl von Referenzprojekten.</p>
      </button>
    </div>
  </div>
</Stage>

<div id="insights-content-container" class="mt-16">
  {#if activeContent === 'tech'}
    <Section noSpacing={true}>
      <div class="inner-box fade-in prose pt-36 pb-16">
        <h2>raspb - ein harmonisches System für Ihren Unternehmenserfolg</h2>
        <p class="teaser">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dignissimos veniam quam quae itaque, officiis blanditiis non, aspernatur adipisci ad porro
          magnam eum fugit aut labore laudantium optio nostrum. Doloribus!
        </p>
        <p class="teaser">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dignissimos veniam quam quae itaque, officiis blanditiis non, aspernatur adipisci ad porro
          magnam eum fugit aut labore laudantium optio nostrum. Doloribus!
        </p>
      </div>
    </Section>

    <Section fullWidth={true} noSpacing={true}>
      <TechLogoShowcase speed={0.15} />
    </Section>

    <Section noSpacing={true}>
      <div class="inner-box animate-fade-in-up prose py-24">
        <h2>{$_('insights.webtechnologien.title')}</h2>
        <p class="teaser">
          {$_('insights.webtechnologien.subtitle')}
        </p>
        <div class="bg-base-200 prose rounded-2xl p-8 shadow-lg">
          <h3 class="text-primary pt-1">{$_('insights.webtechnologien.absatz1headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz1')}
          </p>
          <h3 class="text-primary pt-6">{$_('insights.webtechnologien.absatz2headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz2')}
          </p>
          <h3 class="text-primary pt-6">{$_('insights.webtechnologien.absatz3headline')}</h3>
          <p class="mb-4 leading-relaxed">
            {@html $_('insights.webtechnologien.absatz3')}
          </p>

          <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html $_('insights.webtechnologien.vorteile.sicherheit')}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html $_('insights.webtechnologien.vorteile.performance')}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html $_('insights.webtechnologien.vorteile.skalierbarkeit')}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html $_('insights.webtechnologien.vorteile.skalierbarkeit2')}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html $_('insights.webtechnologien.vorteile.entwicklerfreundlichkeit')}</p>
            </div>
            <div class="bg-base-100 rounded-xl px-4 py-2">
              <p>{@html $_('insights.webtechnologien.vorteile.kosteneffizienz')}</p>
            </div>
          </div>
          <h3 class="text-primary pt-6">{$_('insights.webtechnologien.absatz4headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz4')}
          </p>
          <h3 class="text-primary pt-6">{$_('insights.webtechnologien.absatz5headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz5')}
          </p>
        </div>
      </div>
    </Section>
  {:else if activeContent === 'project'}
    <Section noSpacing={true}>
      <div class="inner-box animate-fade-in-up pt-36 pb-24 prose">
        <h2 class="text-4xl font-bold">
          {$_('insights.projectInsights.titleFirst')} <span class="inner-text-special">{$_('insights.projectInsights.titleHighlight')}</span>
          {$_('insights.projectInsights.titleSecond')}?
        </h2>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph1')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph2')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph3')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph4')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph5')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph6')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph7')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.projectInsights.paragraph8')}
        </p>
      </div>
    </Section>
  {:else if activeContent === 'showcase'}
    <Section noSpacing={true}>
      <div class="inner-box animate-fade-in-up pt-36 pb-24 prose">
        <h2>Digital Erfolge ein paar Beispiele</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod optio saepe dolores, aliquam rerum sit omnis voluptates, quis suscipit itaque officia nam facere eos atque ab molestiae blanditiis est necessitatibus.</p>
      </div>
    </Section>
  {/if}
</div>

<style lang="postcss">
  @reference '../../app.css';

  .tab-tile-collection {
    @apply flex flex-wrap items-center justify-center gap-12 lg:flex-nowrap;
    .tab-tile {
      @apply flex aspect-square w-60 flex-col items-center justify-center rounded-3xl bg-white p-6 text-center text-black drop-shadow-2xl;
      &:hover {
        @apply bg-base-100 cursor-pointer drop-shadow-lg;
      }
      &.active,
      &.active:hover {
        @apply bg-base-100 cursor-default drop-shadow-lg;
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
