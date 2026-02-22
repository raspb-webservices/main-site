<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box max-w-2xl">
    <div class="sticky top-0 z-50 flex justify-end -mb-10 pt-2 pr-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    <div class="mt-10 mb-6 flex flex-col items-center text-center">
      <div class="mb-4">
        <img class="h-36 w-auto rounded-full" src="$images/markus-foto.jpg" alt={m.aboutUs_modals_aboutMe_imageAlt()} loading="lazy" />
      </div>
      <h3 class="no-padding">{m.aboutUs_modals_aboutMe_name()}</h3>
      <p class="opacity-70">{m.aboutUs_modals_aboutMe_role()}</p>
    </div>

    <div class="prose py-4">
      <h2>{m.aboutUs_modals_aboutMe_title()}</h2>
      <p>{@html m.aboutUs_modals_aboutMe_paragraph1()}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m.aboutUs_modals_closeButton()}</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
