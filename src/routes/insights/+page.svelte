<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import TechLogoShowcase from '$lib/components/tech-logo-showcase.svelte';
  import { locale, _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$_('insights.meta.title')}</title>
  <meta name="description" content={$_('insights.meta.description')} />
</svelte:head>

<div class="content-area">
  
  <!-- Header Section (similar to about-us) -->
  <Section>
    <div class="text-center animate-fade-in-up">
      <h1 class="mb-6 text-4xl md:text-6xl font-bold">
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
        {$_('insights.webtechnologien.titleFirst')} <span class="inner-text-special">{$_('insights.webtechnologien.titleHighlight')}</span>{#if $locale === 'de'}{$_('insights.webtechnologien.titleSecond')}{/if}
      </h2>
      <p class="animate-fade-in-up mx-auto max-w-3xl text-xl opacity-80">
        {$_('insights.webtechnologien.subtitle')}
      </p>

      <div class="mt-8 space-y-8 text-left">
        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz1headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz1')}
          </p>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz2headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz2')}
          </p>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz3headline')}</h3>
          <p class="leading-relaxed mb-4">
            {@html $_('insights.webtechnologien.absatz3')}
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz4headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz4')}
          </p>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz5headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz5')}
          </p>
        </div>
      </div>
    </div>
  </Section>

  <!-- Additional Insights Section -->
  <Section>
    <div class="animate-fade-in-up text-center max-w-4xl mx-auto">
      <h2 class="mb-4 text-4xl font-bold">
        {$_('insights.projectInsights.titleFirst')} <span class="inner-text-special">{$_('insights.projectInsights.titleHighlight')}</span> {$_('insights.projectInsights.titleSecond')}?
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
    <div class="animate-fade-in-up text-center max-w-4xl mx-auto">
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

<style lang="postcss">
  @reference '../../app.css';
  h2 {
    @apply max-w-[600px] mx-auto;
  }
</style>
