<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import TechLogoShowcase from '$lib/components/tech-logo-showcase.svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import { locale, _ } from 'svelte-i18n';

  let activeContent = $state('tech');
</script>

<svelte:head>
  <title>{$_('insights.meta.title')}</title>
  <meta name="description" content={$_('insights.meta.description')} />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box reduced py-36">
    <h1 class="massive animate-fade-in-up">{$_('insights.header.title')}</h1>
    <p class="teaser animate-fade-in-up">{$_('insights.header.subtitle')}</p>
  </div>

  <div class="inner-box reduced -mt-12 -mb-24">
    <div class="flex flex-wrap items-center justify-center gap-12 lg:flex-nowrap">
      <div
        class="flex aspect-square w-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-white bg-white text-center font-bold text-black shadow-2xl hover:shadow-md hover:bg-base-200"
        onclick={() => (activeContent = 'tech')}
      >
        Wir funktioniert raspb - Unser Technologie-Stack
      </div>
      <div
        class="flex aspect-square w-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-white bg-white text-center font-bold text-black shadow-2xl hover:shadow-md hover:bg-base-200"
        onclick={() => (activeContent = 'project')}
      >
        Wie sieht ein typisches Projekt bei raspb aus?
      </div>
      <div
        class="flex aspect-square w-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-white bg-white text-center font-bold text-black shadow-2xl hover:shadow-md hover:bg-base-200"
        onclick={() => (activeContent = 'showcase')}
      >
        Wie sehen Projektergebnisse von raspb aus?
      </div>
    </div>
  </div>
</Stage>

{#if activeContent === 'tech'}
  <Section fullWidth={true}>
    <TechLogoShowcase speed={0.15} />
    <div class="inner-box animate-fade-in-up">
      <h2>{$_('insights.webtechnologien.title')}</h2>
      <p class="teaser">
        {$_('insights.webtechnologien.subtitle')}
      </p>
      <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz1headline')}</h3>
        <p class="leading-relaxed">
          {@html $_('insights.webtechnologien.absatz1')}
        </p>
      </div>

      <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz2headline')}</h3>
        <p class="leading-relaxed">
          {@html $_('insights.webtechnologien.absatz2')}
        </p>
      </div>

      <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz3headline')}</h3>
        <p class="mb-4 leading-relaxed">
          {@html $_('insights.webtechnologien.absatz3')}
        </p>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="bg-base-100 rounded-xl p-4">
            <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.sicherheit')}</p>
          </div>
          <div class="bg-base-100 rounded-xl p-4">
            <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.performance')}</p>
          </div>
          <div class="bg-base-100 rounded-xl p-4">
            <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.skalierbarkeit')}</p>
          </div>
          <div class="bg-base-100 rounded-xl p-4">
            <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.skalierbarkeit2')}</p>
          </div>
          <div class="bg-base-100 rounded-xl p-4">
            <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.entwicklerfreundlichkeit')}</p>
          </div>
          <div class="bg-base-100 rounded-xl p-4">
            <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.kosteneffizienz')}</p>
          </div>
        </div>
      </div>

      <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz4headline')}</h3>
        <p class="leading-relaxed">
          {@html $_('insights.webtechnologien.absatz4')}
        </p>
      </div>

      <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz5headline')}</h3>
        <p class="leading-relaxed">
          {@html $_('insights.webtechnologien.absatz5')}
        </p>
      </div>
    </div>
  </Section>
{:else if activeContent === 'project'}
  <Section>
    <div class="inner-box animate-fade-in-up">
      <h2 class="mb-4 text-4xl font-bold">
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
  <Section>
    <h2>Digital Erfolge ein paar BeispieleS</h2>
  </Section>
{/if}

{#if false}
  <div class="content-area">
    <!-- Header Section (similar to about-us) -->
    <Section>
      <div class="animate-fade-in-up text-center">
        <h1 class="mb-6 text-4xl font-bold md:text-6xl">
          {$_('insights.header.title')} <span class="inner-text-special">{$_('insights.header.titleHighlight')}</span>
        </h1>
        <p class="teaser animate-fade-in-up mx-auto max-w-4xl text-center text-lg">
          {$_('insights.header.teaser')}
        </p>
      </div>
    </Section>

    <!-- Technology Showcase Section -->
    <Section>
      <TechLogoShowcase speed={0.15} />
    </Section>

    <!-- JAMstack Section with clearer structure -->
    <Section>
      <div class="animate-fade-in-up m-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <h2 class="mb-4 text-4xl font-bold">
          {$_('insights.webtechnologien.titleFirst')}
          <span class="inner-text-special">{$_('insights.webtechnologien.titleHighlight')}</span>{#if $locale === 'de'}{$_(
              'insights.webtechnologien.titleSecond'
            )}{/if}
        </h2>
        <p class="animate-fade-in-up mx-auto max-w-3xl text-xl opacity-80">
          {$_('insights.webtechnologien.subtitle')}
        </p>

        <div class="mt-8 space-y-8 text-left">
          <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz1headline')}</h3>
            <p class="leading-relaxed">
              {@html $_('insights.webtechnologien.absatz1')}
            </p>
          </div>

          <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz2headline')}</h3>
            <p class="leading-relaxed">
              {@html $_('insights.webtechnologien.absatz2')}
            </p>
          </div>

          <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz3headline')}</h3>
            <p class="mb-4 leading-relaxed">
              {@html $_('insights.webtechnologien.absatz3')}
            </p>

            <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="bg-base-100 rounded-xl p-4">
                <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.sicherheit')}</p>
              </div>
              <div class="bg-base-100 rounded-xl p-4">
                <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.performance')}</p>
              </div>
              <div class="bg-base-100 rounded-xl p-4">
                <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.skalierbarkeit')}</p>
              </div>
              <div class="bg-base-100 rounded-xl p-4">
                <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.skalierbarkeit2')}</p>
              </div>
              <div class="bg-base-100 rounded-xl p-4">
                <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.entwicklerfreundlichkeit')}</p>
              </div>
              <div class="bg-base-100 rounded-xl p-4">
                <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.kosteneffizienz')}</p>
              </div>
            </div>
          </div>

          <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz4headline')}</h3>
            <p class="leading-relaxed">
              {@html $_('insights.webtechnologien.absatz4')}
            </p>
          </div>

          <div class="bg-base-200 rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 class="text-primary mb-4 text-2xl font-bold">{$_('insights.webtechnologien.absatz5headline')}</h3>
            <p class="leading-relaxed">
              {@html $_('insights.webtechnologien.absatz5')}
            </p>
          </div>
        </div>
      </div>
    </Section>

    <!-- Additional Insights Section -->
    <Section>
      <div class="animate-fade-in-up mx-auto max-w-4xl text-center">
        <h2 class="mb-4 text-4xl font-bold">
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
    <Section>
      <div class="animate-fade-in-up mx-auto max-w-4xl text-center">
        <h2 class="mb-4 text-4xl font-bold">
          {$_('insights.kiSection.title')}
        </h2>
        <p class="animate-fade-in-up">
          {@html $_('insights.kiSection.paragraph1')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.kiSection.paragraph2')}
        </p>
        <p class="animate-fade-in-up">
          {@html $_('insights.kiSection.paragraph3')}
        </p>
      </div>
    </Section>
  </div>
{/if}

<style lang="postcss">
  @reference '../../app.css';
</style>
