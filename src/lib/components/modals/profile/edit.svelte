<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import auth from '$services/auth-service';
  import { user } from '$store/sharedStates.svelte';
  import type { User } from '$interfaces/user.interface';

  let modal: HTMLDialogElement;
  let currentUser = $derived(user.value) as User;

  let formData = $state<Partial<User>>({});

  $effect(() => {
    if (currentUser) {
      formData = {
        givenName: currentUser.givenName,
        familyName: currentUser.familyName,
        city: currentUser.city,
        company: currentUser.company,
        country: currentUser.country,
        phone: currentUser.phone,
        postCode: currentUser.postCode,
        salutation: currentUser.salutation,
        companyAddress: currentUser.companyAddress
      };
    }
  });

  export function openModal() {
    modal?.showModal();
  }

  export function closeModal() {
    modal?.close();
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!currentUser?.sub) {
      console.error('User ID (sub) not available for updating metadata.');
      return;
    }

    try {
      await auth.updateMetadata(formData);
      
      // Optimistic update of local store
      user.value = { ...currentUser, ...formData };
      
      closeModal();
    } catch (error) {
      console.error('Error updating Auth0 metadata: ', error);
      alert('Fehler beim Aktualisieren des Profils. Bitte versuchen Sie es später erneut.');
    }
  }
</script>

<dialog id="modal-profile-edit" bind:this={modal} class="modal">
  <div class="modal-box">
    <form onsubmit={handleSubmit}>
      <button type="button" class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
      <h3 class="mb-4 text-lg font-bold">{m.profile_editTitle()}</h3>

      <div class="form-edit-container space-y-4">
        <div class="form-control">
          <label for="salutation" class="label">
            <span class="label-text">{m.profile_salutation()}</span>
          </label>
          <select id="salutation" class="select select-bordered w-full" bind:value={formData.salutation}>
            <option value="">{m.profile_salutationPlaceholder()}</option>
            <option value="Herr">{m.profile_salutationOptions_mr()}</option>
            <option value="Frau">{m.profile_salutationOptions_mrs()}</option>
            <option value="Divers">{m.profile_salutationOptions_diverse()}</option>
          </select>
        </div>
        <div class="form-control">
          <label for="givenName" class="label">
            <span class="label-text">{m.profile_givenName()}</span>
          </label>
          <input type="text" id="givenName" class="input input-bordered w-full" bind:value={formData.givenName} />
        </div>
        <div class="form-control">
          <label for="familyName" class="label">
            <span class="label-text">{m.profile_familyName()}</span>
          </label>
          <input type="text" id="familyName" class="input input-bordered w-full" bind:value={formData.familyName} />
        </div>
        <div class="form-control">
          <label for="company" class="label">
            <span class="label-text">{m.profile_company()}</span>
          </label>
          <input type="text" id="company" class="input input-bordered w-full" bind:value={formData.company} />
        </div>
        <div class="form-control">
          <label for="phone" class="label">
            <span class="label-text">{m.profile_phone()}</span>
          </label>
          <input type="text" id="phone" class="input input-bordered w-full" bind:value={formData.phone} />
        </div>
        <div class="form-control">
          <label for="address" class="label">
            <span class="label-text">{m.profile_address()}</span>
          </label>
          <input type="text" id="address" class="input input-bordered w-full" bind:value={formData.companyAddress} />
        </div>
        <div class="form-control">
          <label for="postCode" class="label">
            <span class="label-text">{m.profile_postCode()}</span>
          </label>
          <input type="text" id="postCode" class="input input-bordered w-full" bind:value={formData.postCode} />
        </div>
        <div class="form-control">
          <label for="city" class="label">
            <span class="label-text">{m.profile_city()}</span>
          </label>
          <input type="text" id="city" class="input input-bordered w-full" bind:value={formData.city} />
        </div>

        <div class="form-control">
          <label for="country" class="label">
            <span class="label-text">{m.profile_country()}</span>
          </label>
          <input type="text" id="country" class="input input-bordered w-full" bind:value={formData.country} />
        </div>
      </div>

      <div class="modal-action">
        <button type="button" class="btn btn-outline" onclick={closeModal}>{m.profile_cancelButton()}</button>
        <button type="submit" class="btn btn-primary">{m.profile_saveButton()}</button>
      </div>
    </form>
  </div>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
