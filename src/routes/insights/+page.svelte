<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import { locale, _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$_('insights.meta.title')}</title>
  <meta name="description" content={$_('insights.meta.description')} />
</svelte:head>

<div class="content-area">
  
  <Section>
    <h1>{$_('insights.header.title')}</h1>
    <p class="teaser no-padding">
      {$_('insights.header.teaser')}
    </p>
  </Section>

  <Section>
    <div class="animate-fade-in-up m-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <h1>{$_('insights.webtechnologien.titleFirst')} <span class="inner-text-special">{$_('insights.webtechnologien.titleHighlight')}</span>{#if $locale === 'de'}{$_('insights.webtechnologien.titleSecond')}{/if}</h1>
      <h3>
        {$_('insights.webtechnologien.subtitle')}
      </h3>

      <div class="mt-8 space-y-6 text-left">
        <p>
          {@html $_('insights.webtechnologien.absatz1')}
        </p>

        <p>
          {@html $_('insights.webtechnologien.absatz2')}
        </p>

        <p>
          {@html $_('insights.webtechnologien.absatz3')}
        </p>

        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>{@html $_('insights.webtechnologien.vorteile.sicherheit')}</li>
          <li>{@html $_('insights.webtechnologien.vorteile.performance')}</li>
          <li>{@html $_('insights.webtechnologien.vorteile.skalierbarkeit')}</li>
          <li>{@html $_('insights.webtechnologien.vorteile.entwicklerfreundlichkeit')}</li>
          <li>{@html $_('insights.webtechnologien.vorteile.kosteneffizienz')}</li>
        </ul>

        <p>
          {@html $_('insights.webtechnologien.absatz4')}
        </p>

        <p>
          {@html $_('insights.webtechnologien.absatz5')}
        </p>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>
