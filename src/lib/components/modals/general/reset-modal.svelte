<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { confirmReset } = $props();
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
    <div class="sticky top-0 z-50 flex justify-end -mb-10 pt-2 pr-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    <h3 class="mb-4 text-lg font-bold">{m.wizard_modals_reset_title()}</h3>
    <p class="py-4">{m.wizard_modals_reset_description()}</p>

    <div class="modal-action">
      <button type="button" class="btn btn-outline" onclick={closeModal}>{m.wizard_modals_reset_cancel()}</button>
      <button type="button" class="btn btn-error" onclick={confirmReset}>{m.wizard_modals_reset_confirm()}</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
