<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<section class="danke-content-wrapper">
  <div class="container">
    <div class="inner-container">
      <div class="px-20 pt-10">
        <h1 class="text-center">Vielen Dank für Ihre Nachricht</h1>
        <p>Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen zurückmelden...</p>

        <div class="spacer"></div>
        <div class="flex w-full justify-center">
          <button
            class="btn-basic"
            on:click={() => {
              goto('/');
            }}>Zurück zur Startseite</button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="big-spacer"></div>
</section>