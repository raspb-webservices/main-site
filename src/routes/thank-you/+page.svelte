<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { _ } from 'svelte-i18n';
</script>

<Section type={'fullCenterTeaser'}>
    <div class="inner-content-wrapper prose">
    <h1 class="text-center">Vielen <span class="inner-text-special">Dank</span> für Ihre Nachricht</h1>
    <p class="teaser text-center">Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen zurückmelden...</p>

    <div class="spacer"></div>
    <div class="flex w-full justify-center">
      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>Zurück zur Startseite</button
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
