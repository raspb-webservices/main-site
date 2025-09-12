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
  <div class="modal-box small-modal">

    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" onclick={closeModal}>✕</button>
    </form>
    
    <div class="flex items-center gap-3 mb-6">
      <div class="text-5xl leading-tight">💰</div>
      <h2 class="pt-4">{$_('costAsFactorModal.header.title')}</h2>
    </div>
    
    <div class="prose md:px-4">
      <p>
        {$_('costAsFactorModal.content.paragraph1')}
      </p>
      
      <p>
        {$_('costAsFactorModal.content.paragraph2')}
      </p>
      
      <p>
        {$_('costAsFactorModal.content.paragraph3')}
      </p>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
