<script lang="ts">
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={closeModal}>✕</button>
    </form>

    <div class="iframe-container">
      <iframe src="https://nextcloud.raspb.eu/apps/appointments/embed/QC0rcD04c8q8NbC1/form" title="Erstgespräch vereinbaren"></iframe>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
  .modal-box {
    @apply w-full p-0 rounded-none md:p-6 md:rounded-4xl;
  }
  .iframe-container {
    @apply flex w-full items-center md:items-start justify-center;
    iframe {
      @apply w-full h-full min-h-screen md:w-125 md:min-h-150 md:rounded-2xl;
    }
  }
</style>
