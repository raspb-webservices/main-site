<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { projectData } = $props();
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }

  function confirm() {
    closeModal();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={closeModal}>✕</button>
    </form>

    <h3 class="mb-4 text-lg font-bold">{m.wizard_modals_contact_title()}</h3>
    <p class="py-4">{m.wizard_modals_contact_description()}</p>

    <div class="modal-action">
      <button type="button" class="btn btn-outline" onclick={closeModal}>{m.wizard_modals_contact_cancel()}</button>
      <button type="button" class="btn btn-error" onclick={confirm}>{m.wizard_modals_contact_confirm()}</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
