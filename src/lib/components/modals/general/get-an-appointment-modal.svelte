<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let modal: HTMLDialogElement;
  let isOpen = $state(false);

  export function openModal() {
    isOpen = true;
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
    isOpen = false;
  }
</script>

<dialog bind:this={modal} class="modal" onclose={() => (isOpen = false)}>
  <div class="modal-box">
    <div class="sticky top-0 z-50 flex justify-end -mb-10 pt-2 pr-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    <div class="iframe-container">
      {#if isOpen}
        <iframe src="https://nextcloud.raspb.eu/apps/appointments/embed/QC0rcD04c8q8NbC1/form" title={m.appointment_iframe_title()}></iframe>
      {/if}
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
  .modal-box {
    @apply w-full max-w-120 rounded-none p-0 md:rounded-4xl md:p-6;
  }
  .iframe-container {
    @apply flex w-full items-center justify-center md:items-start;
    iframe {
      @apply h-full min-h-screen w-full md:min-h-157 md:w-125 md:rounded-2xl;
    }
  }
</style>
