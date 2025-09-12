<script lang="ts">
  import { _ } from 'svelte-i18n';
  let { errorDetails } = $props();
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
      <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
    </form>

    <h3 class="text-error mb-4 text-lg font-bold">{$_('wizard.modals.error.title')}</h3>

    <div class="space-y-4">
      <p>{$_('wizard.modals.error.description')}</p>

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
          <div class="font-bold">{$_('wizard.modals.error.whatHappens')}</div>
          <div class="text-sm">{$_('wizard.modals.error.whatHappensDescription')}</div>
        </div>
      </div>
    </div>

    <div class="modal-action">
      <button type="button" class="btn btn-simple" onclick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        {$_('wizard.modals.error.backToStep1')}
      </button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
<style lang="postcss">
  @reference '../../../../app.css';
</style>
