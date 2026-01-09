<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{page.status} - {page.status === 404 ? m['errorPage.notFoundShort']() : m['errorPage.unknownErrorShort']()}</title>
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
    <h1>{page.status === 404 ? m['errorPage.notFound']() : m['errorPage.unknownError']()}</h1>
    <p class="teaser">{page.status === 404 ? m['errorPage.notFoundSubtext']() : m['errorPage.unknownErrorSubtext']()}</p>
    <div class="spacer"></div>
    <div class="flex gap-6">
      <button
        class="btn-basic text-base"
        onclick={() => {
          goto('/');
        }}>{m['errorPage.backToHomepage']()}</button
      >
      <button
        class="btn-basic"
        onclick={() => {
          goto('/get-started');
        }}>{m['errorPage.configureProject']()}</button
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
