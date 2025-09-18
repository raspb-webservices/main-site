<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
</script>

<Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
    <h1 class="text-center"><span class="inner-text-special">{$_('thankYouHighlight')}</span> {$_('thankYouMessageSecond')}</h1>
    <p class="teaser text-center">{$_('thankYouTeaser')}</p>

    <div class="spacer"></div>
    <div class="flex w-full justify-center">
      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>{$_('backToHomepage')}</button
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
