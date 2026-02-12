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
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
    </form>

    <div class="mb-6 flex items-center gap-3">
      <div class="text-5xl leading-tight">🏆</div>
      <h2 class="pt-4">{m.qualityAsFactorModal_header_title()}</h2>
    </div>

    <div class="prose md:px-4">
      <p>
        {m.qualityAsFactorModal_content_paragraph1()}
      </p>

      <p>
        {m.qualityAsFactorModal_content_paragraph2()}
      </p>

      <p>
        {m.qualityAsFactorModal_content_paragraph3()}
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
