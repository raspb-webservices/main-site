<script lang="ts">
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
</script>

<section class="thank-you-content-wrapper">
  <div class="px-20 pt-10 flex flex-col justify-center items-center">
    <h1>{$_('thankYou.title')}</h1>
    <h1 class="text-center">Vielen Dank für Ihre Nachricht</h1>
    <p>Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen zurückmelden...</p>

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
  <div class="big-spacer"></div>
</section>

<style lang="postcss">
  @reference '../../app.css';
  section.thank-you-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
  }
</style>
