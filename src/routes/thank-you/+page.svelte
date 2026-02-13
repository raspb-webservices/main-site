<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.thankYou_meta_title()}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
    <h1 class="text-center"><span class="inner-text-special">{m.thankYouHighlight()}</span> {m.thankYouMessageSecond()}</h1>
    <p class="teaser text-center">{m.thankYouTeaser()}</p>

    <div class="spacer"></div>
    <div class="flex w-full justify-center">
      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>{m.backToHomepage()}</button
      >
    </div>
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .inner-content-wrapper {
    @apply flex flex-col items-center justify-center;
  }
</style>
