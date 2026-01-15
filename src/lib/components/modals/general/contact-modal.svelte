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
    console.log("Confirm triggered..."),
    closeModal();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={closeModal}>✕</button>
    </form>

    <h3 class="mb-4 text-lg font-bold">{m['wizard.modals.contact.title']()}</h3>
    <p class="py-4">{m['wizard.modals.contact.description']()}</p>

    <div class="modal-action">
      <button type="button" class="btn btn-outline" onclick={closeModal}>{m['wizard.modals.contact.cancel']()}</button>
      <button type="button" class="btn btn-error" onclick={confirm}>{m['wizard.modals.contact.confirm']()}</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
