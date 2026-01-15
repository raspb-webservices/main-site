<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
</script>

<svelte:head>
  <title>{page.status} - {page.status === 404 ? m['errorPage_notFoundShort']() : m['errorPage_unknownErrorShort']()}</title>
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
    <h1>{page.status === 404 ? m['errorPage_notFound']() : m['errorPage_unknownError']()}</h1>
    <p class="teaser">{page.status === 404 ? m['errorPage_notFoundSubtext']() : m['errorPage_unknownErrorSubtext']()}</p>
    <div class="spacer"></div>
    <div class="flex gap-6">
      <button
        class="btn-basic text-base"
        onclick={() => {
          goto('/');
        }}>{m['errorPage_backToHomepage']()}</button
      >
      <button
        class="btn-basic"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}>{m['errorPage_configureProject']()}</button
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
