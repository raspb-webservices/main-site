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
  <div class="modal-box small-modal">
    <div class="sticky top-0 z-50 flex justify-end -mb-10 pt-2 pr-2">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    <div class="mb-6 flex items-center gap-3">
      <div class="text-5xl leading-tight">💰</div>
      <h2 class="pt-4">{m.costAsFactorModal_header_title()}</h2>
    </div>

    <div class="prose md:px-4">
      <p>
        {m.costAsFactorModal_content_paragraph1()}
      </p>

      <p>
        {m.costAsFactorModal_content_paragraph2()}
      </p>

      <p>
        {m.costAsFactorModal_content_paragraph3()}
      </p>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.modal_close()}</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
