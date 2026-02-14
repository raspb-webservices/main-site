<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import auth from '$services/auth-service';
  import { isAuthenticated } from '$store/sharedStates.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';

  let isLoading = $state(false);
  let errorMessage = $state('');
  let isAuth = $derived(isAuthenticated.value);

  // Nach Login zum Dashboard weiterleiten
  $effect(() => {
    if (isAuth) {
      goto(localizeHref('/dashboard'));
    }
  });

  async function handleSignup() {
    isLoading = true;
    errorMessage = '';

    try {
      const popup = openAuth0Popup(450, 650);
      if (!popup) throw new Error('Popup konnte nicht geoeffnet werden (Popup-Blocker?).');

      const auth0Client = await auth.createClient();
      await auth.loginWithPopup(auth0Client, { authorizationParams: { screen_hint: 'signup' } }, popup);
    } catch (error: unknown) {
      console.error('Registration error:', error);
      errorMessage = error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten.';
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>{m.registration_meta_title()}</title>
  <meta name="description" content={m.registration_meta_description()} />
</svelte:head>

<div class="content-area">
  <Section noSpacing={true}>
    <div class="inner-box reduced prose pt-24 pb-12">
      <h1 class="animate-fade-in mb-8 max-w-212.5 text-center text-4xl font-bold">
        {m.registration_intro_titleFirst()}
        <span class="inner-text-special">{m.registration_intro_titleHighlight()}</span>
      </h1>
      <p class="teaser animate-fade-in-up boxed text-center">{m.registration_intro_teaser()}</p>
    </div>
  </Section>

  <Section noSpacing={true}>
    <div class="md:inner-box pb-24">
      <div class="animate-fade-in-up bg-base-200 text-base-content mx-auto flex max-w-2xl justify-center rounded-3xl p-8 text-center">
        {#if errorMessage}
          <div class="alert alert-error mb-6 shadow-lg">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        {/if}

        <p class="mb-8 text-lg">{m.registration_intro_teaser()}</p>

        <button class="btn-basic w-full max-w-md" onclick={handleSignup} disabled={isLoading}>
          {#if isLoading}
            <span class="loading loading-spinner loading-sm mr-2"></span>
            {m.registration_form_button_loading()}
          {:else}
            {m.registration_form_button_createAccount()}
          {/if}
        </button>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>
