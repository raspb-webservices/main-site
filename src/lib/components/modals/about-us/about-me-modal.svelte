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
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
    </form>

    <div class="mt-10 mb-6 flex flex-col items-center text-center">
      <div class="mb-4">
        <img class="h-36 w-auto rounded-full" src="$images/test.jpg" alt="Markus Härtig" />
      </div>
      <h3 class="no-padding">Markus Härtig</h3>
      <p class="opacity-70">Gesellschafter-Geschäftsführer</p>
    </div>

    <div class="prose py-4">
      <h2>{m['aboutUs_modals_aboutMe_title']()}</h2>
      <p>{@html m['aboutUs_modals_aboutMe_paragraph1']()}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['aboutUs_modals_closeButton']()}</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
