<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { errorDetails, onClose } = $props();
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
    onClose?.();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box max-w-2xl">
    <div class="sticky top-0 z-50 flex justify-end -mb-10 pt-2 pr-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    <h3 class="text-error mb-4 text-lg font-bold">{m.wizard_modals_error_title()}</h3>

    <div class="space-y-4">
      <p>{m.wizard_modals_error_description()}</p>

      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <ul class="space-y-1">
            {#each errorDetails as error}
              <li class="text-sm">{error}</li>
            {/each}
          </ul>
        </div>
      </div>

      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class="font-bold">{m.wizard_modals_error_whatHappens()}</div>
          <div class="text-sm">{m.wizard_modals_error_whatHappensDescription()}</div>
        </div>
      </div>
    </div>

    <div class="modal-action">
      <button type="button" class="btn btn-simple" onclick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        {m.wizard_modals_error_backToStep1()}
      </button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
