<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';

  let errReasonShort = $state();
  let errReason = $state();
  let errReasonSubtext = $state();

  if (page.status === 404) {
    errReasonShort = 'Seite nicht gefunden';
    errReason = 'Ooops! Diese Seite gibt es leider nicht (mehr).';
    errReasonSubtext = 'Aber keine Sorge, wir bringen dich an dein Ziel! Wo möchtest du hin?';
  } else {
    errReasonShort = 'Unbekannter Fehler';
    errReason = 'Ein unerwarteter Fehler ist aufgetreten.';
    errReasonSubtext = 'Bitte versuche es später erneut.';
  }
</script>

<svelte:head>
  <title>{page.status} - {errReasonShort}</title>
</svelte:head>

<Section type={'fullCenterTeaser'}>
  <h1 class="text-center">{errReason}</h1>
  <h3>{errReasonSubtext}</h3>
  <div class="spacer"></div>
  <button
    class="btn-basic"
    onclick={() => {
      goto('/');
    }}>Zurück zur Startseite</button
  >
</Section>

<style lang="postcss">
  @reference '../app.css';
</style>
