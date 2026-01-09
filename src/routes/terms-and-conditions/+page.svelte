<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m['terms.meta.title']()}</title>
  <meta name="description" content={m['terms.meta.description']()} />
</svelte:head>

<Section>
  <div class="terms-and-conditions-content prose">
    <h1>{m['terms.title']()}</h1>

    <div class="spacer"></div>
    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}>{m['terms.backToHomepage']()}</button
    >
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
</style>
