<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{page.status} - {page.status === 404 ? $_('errorPage.notFoundShort') : $_('errorPage.unknownErrorShort')}</title>
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
    <h1>{page.status === 404 ? $_('errorPage.notFound') : $_('errorPage.unknownError')}</h1>
    <p class="teaser">{page.status === 404 ? $_('errorPage.notFoundSubtext') : $_('errorPage.unknownErrorSubtext')}</p>
    <div class="spacer"></div>
    <div class="flex gap-6">
      <button
        class="btn-basic text-base"
        onclick={() => {
          goto('/');
        }}>{$_('errorPage.backToHomepage')}</button
      >
      <button
        class="btn-basic"
        onclick={() => {
          goto('/get-started');
        }}>{$_('errorPage.configureProject')}</button
      >
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../app.css';
  .inner-content-wrapper {
    @apply flex flex-col items-center justify-center text-center;
  }
</style>
