<script lang="ts">
  import { _ } from 'svelte-i18n';

  let modal: HTMLDialogElement;
  
  export function openModal() {
    modal?.showModal();
  }

  export function closeModal() {
    modal?.close();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box max-w-6xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
    </form>
    <div class="flex flex-row justify-center items-center">
      <iframe src="https://calendly.com/raspb-webservices/erstgespraech?hide_gdpr_banner=1" title="Termin vereinbaren" width="100%" height="800"></iframe>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
