<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { isAuthenticated, user } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import Section from '$lib/components/ui/section.svelte';

  let firstName = $state('');
  let lastName = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');

  async function handleSubmit() {
    if (!firstName.trim() || !lastName.trim()) return;

    isLoading = true;
    errorMessage = '';

    try {
      await auth.updateMetadata({ givenName: firstName.trim(), familyName: lastName.trim() });

      user.value = { ...user.value, givenName: firstName.trim(), familyName: lastName.trim() };

      goto(localizeHref('/dashboard'));
    } catch (error) {
      console.error('Error updating metadata:', error);
      errorMessage = error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten.';
    } finally {
      isLoading = false;
    }
  }

  function handleSkip() {
    goto(localizeHref('/dashboard'));
  }
</script>

<svelte:head>
  <title>{m.welcome_meta_title()}</title>
  <meta name="description" content={m.welcome_meta_description()} />
</svelte:head>

<div class="content-area">
  <Section type={'fullCenterTeaser'}>
    <div class="welcome-card prose">
      <h1 class="mb-4 text-4xl font-bold">
        {m.welcome_title()}<span class="inner-text-special">{m.welcome_titleHighlight()}</span>
      </h1>
      <p class="teaser mb-10 text-lg">{m.welcome_teaser()}</p>

      {#if errorMessage}
        <div class="alert alert-error mb-6 shadow-lg">
          <span>{errorMessage}</span>
        </div>
      {/if}

      <form class="form-wrapper" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label class="form-field">
          <span class="label-text">{m.welcome_firstName_label()}</span>
          <input
            type="text"
            class="input input-bordered w-full"
            placeholder={m.welcome_firstName_placeholder()}
            bind:value={firstName}
            required
          />
        </label>

        <label class="form-field">
          <span class="label-text">{m.welcome_lastName_label()}</span>
          <input
            type="text"
            class="input input-bordered w-full"
            placeholder={m.welcome_lastName_placeholder()}
            bind:value={lastName}
            required
          />
        </label>

        <button class="btn-basic w-full" type="submit" disabled={isLoading || !firstName.trim() || !lastName.trim()}>
          {#if isLoading}
            <span class="loading loading-spinner loading-sm mr-2"></span>
            {m.welcome_submit_loading()}
          {:else}
            {m.welcome_submit()}
          {/if}
        </button>

        <button class="btn-ghost mt-2 w-full" type="button" onclick={handleSkip}>
          {m.welcome_skip()}
        </button>
      </form>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';

  .welcome-card {
    @apply mx-auto flex w-full max-w-md flex-col items-center;
  }

  .form-wrapper {
    @apply flex w-full flex-col gap-4;
  }

  .form-field {
    @apply flex w-full flex-col gap-1 text-left;

    .label-text {
      @apply text-base-content/70 text-sm font-medium;
    }
  }
</style>
