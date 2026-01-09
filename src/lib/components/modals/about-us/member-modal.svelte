<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { selectedMember } = $props();
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box w-11/12 max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute top-3 right-3" onclick={closeModal}>✕</button>
    </form>

    <div class="mt-10 mb-6 flex flex-col items-center text-center">
      <div class="mb-4">
        <img class="h-36 w-auto" src={selectedMember?.avatar} alt={selectedMember?.name} />
      </div>
      <h3 class="no-padding">{selectedMember?.name}</h3>
      <p class="opacity-70">{selectedMember?.role}</p>
    </div>

    <div class="space-y-6">
      <div>
        <h4 class="no-padding mb-2">{m['aboutUs.modals.member.about']({ name: selectedMember?.name })}</h4>
        <p class="leading-relaxed">{m[`aboutUs.teamMembers.${selectedMember?.id || 'alex'}.description`]()}</p>
      </div>

      <div>
        <h4 class="no-padding mb-2">{m['aboutUs.modals.member.personality']()}</h4>
        <p class="leading-relaxed">{m[`aboutUs.teamMembers.${selectedMember?.id || 'alex'}.personality`]()}</p>
      </div>

      <div>
        <h4 class="no-padding mb-2">{m['aboutUs.modals.member.experience']()}</h4>
        <p class="leading-relaxed">{m[`aboutUs.teamMembers.${selectedMember?.id || 'alex'}.experience`]()}</p>
      </div>

      <div class="pt-2 pb-8">
        {#if selectedMember?.skills && selectedMember?.skills.length > 0}
          <h4>{m['aboutUs.modals.member.coreCompetencies']()}</h4>
          <div class="flex flex-wrap gap-2 mt-3">
            {#each selectedMember?.skills as skill}
              <span class="badge badge-primary badge-lg">{skill}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['aboutUs.modals.closeButton']()}</button>
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
