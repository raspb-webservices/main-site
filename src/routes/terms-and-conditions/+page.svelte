<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$_('terms.meta.title')}</title>
  <meta name="description" content={$_('terms.meta.description')} />
</svelte:head>

<Section>
  <div class="terms-and-conditions-content prose">
    <h1>{$_('terms.title')}</h1>

    <div class="spacer"></div>
    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}>{$_('terms.backToHomepage')}</button
    >
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
</style>
