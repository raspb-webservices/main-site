<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
  import { _ } from 'svelte-i18n';
  import { locale, locales } from 'svelte-i18n'

</script>

<svelte:head>
  <title>{$_('einblicke.meta.title')}</title>
  <meta name="description" content={$_('einblicke.meta.description')} />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>{$_('einblicke.header.title')}</h1>
    <p class="teaser no-padding">
      {$_('einblicke.header.teaser')}
    </p>
  </Section>

  <Section>
    <div class="animate-fade-in-up m-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <h1>{$_('einblicke.webtechnologien.titleFirst')} <span class="inner-text-special">{$_('einblicke.webtechnologien.titleHighlight')}</span>{#if $locale === 'de'}{$_('einblicke.webtechnologien.titleSecond')}{/if}</h1>
      <h3>
        {$_('einblicke.webtechnologien.subtitle')}
      </h3>

      <div class="mt-8 space-y-6 text-left">
        <p>
          {@html $_('einblicke.webtechnologien.absatz1')}
        </p>

        <p>
          {@html $_('einblicke.webtechnologien.absatz2')}
        </p>

        <p>
          {@html $_('einblicke.webtechnologien.absatz3')}
        </p>

        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>{@html $_('einblicke.webtechnologien.vorteile.sicherheit')}</li>
          <li>{@html $_('einblicke.webtechnologien.vorteile.performance')}</li>
          <li>{@html $_('einblicke.webtechnologien.vorteile.skalierbarkeit')}</li>
          <li>{@html $_('einblicke.webtechnologien.vorteile.entwicklerfreundlichkeit')}</li>
          <li>{@html $_('einblicke.webtechnologien.vorteile.kosteneffizienz')}</li>
        </ul>

        <p>
          {@html $_('einblicke.webtechnologien.absatz4')}
        </p>

        <p>
          {@html $_('einblicke.webtechnologien.absatz5')}
        </p>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>
