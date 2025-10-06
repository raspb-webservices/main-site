<script lang="ts">
  import { _ } from 'svelte-i18n';
  import auth from '$services/auth-service';
  import Section from '$lib/components/ui/section.svelte';
  import Loader from '$lib/components/loader.svelte';

  // Form state
  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  // UI state
  let isLoading = false;
  let isSuccess = false;
  let errorMessage = '';
  let isPasswordMatch = true;

  // Password visibility
  let showPassword = false;
  let showConfirmPassword = false;

  // Validation
  function validateForm() {
    if (!email || !password || !confirmPassword) {
      errorMessage = 'registration.form.validation.requiredFields'
      return false;
    }

    if (password !== confirmPassword) {
      errorMessage = 'registration.form.validation.passwordMismatch';
      isPasswordMatch = false;
      return false;
    }

    isPasswordMatch = true;
    errorMessage = '';
    return true;
  }

  // Handle form submission
  async function handleSubmit() {
    if (!validateForm()) return;

    isLoading = true;
    errorMessage = '';
    isSuccess = false;

    try {
      // Create user with Auth0
      const userData = {
        email,
        password,
        givenName: firstName || '',
        familyName: lastName || '',
        user_metadata: {
          familyName: lastName || '',
          givenName: firstName || ''
        }
      };

      const auth0Response = await auth.createAuth0User(userData);
      const userId = auth0Response.user_id;

      // Assign role to the new user
      await auth.assignRole(userId, ['rol_eqqXJZxCRsW8zLRt']);

      // Show success message
      isSuccess = true;

      // Reset form
      firstName = '';
      lastName = '';
      email = '';
      password = '';
      confirmPassword = '';
    } catch (error) {
      console.error('Registration error:', error);
      errorMessage = error.message || 'registration.form.validation.registrationError';
    } finally {
      isLoading = false;
    }
  }

  // Check password match on input
  function checkPasswordMatch() {
    if (confirmPassword) {
      isPasswordMatch = password === confirmPassword;
    } else {
      isPasswordMatch = true;
    }
  }
</script>

<svelte:head>
  <title>{$_('registration.meta.title')}</title>
  <meta name="description" content="{$_('registration.meta.description')}"/>
</svelte:head>


<div class="content-area">
  <Section noSpacing={true}>
    <div class="inner-box reduced pt-24 pb-12 prose">
      <h1 class="animate-fade-in mb-8 text-center text-4xl font-bold max-w-[850px]">
        {$_('registration.intro.titleFirst')}
        <span class="inner-text-special">{$_('registration.intro.titleHighlight')}</span>
      </h1>
      <p class="teaser animate-fade-in-up boxed text-center">{$_('registration.intro.teaser')}</p>
    </div>
  </Section>

  <Section noSpacing={true}>
    <div class="md:inner-box pb-24">
      <div class="animate-fade-in-up bg-base-200 text-base-content mx-auto max-w-2xl rounded-3xl p-8">
        {#if isSuccess}
          <div class="py-12 text-center prose">
            <div class="mb-6">
              <svg
                class="text-success mx-auto h-24 w-24 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="mb-4 text-2xl font-bold">{$_('registration.success.title')}</h2>
            <p class="mb-6">{$_('registration.success.message')}</p>
            <button class="btn-basic mx-auto" onclick={() => (isSuccess = false)}> {$_('registration.success.backToForm')} </button>
          </div>
        {:else}
          <form
            onsubmit={() => {
              event.preventDefault();
              handleSubmit();
            }}
            class="space-y-6"
          >
            {#if errorMessage}
              <div class="alert alert-error shadow-lg">
                <div>
                  <span>{$_(errorMessage)}</span>
                </div>
              </div>
            {/if}

            <div class="grid grid-cols-1 md:gap-6 md:grid-cols-2">
              <div class="form-control">
                <label for="firstName" class="label">
                  <span class="label-text">{$_('registration.form.firstName.label')}</span>
                </label>
                <input type="text" id="firstName" class="input input-bordered w-full" bind:value={firstName} placeholder="{$_('registration.form.firstName.placeholder')}" />
              </div>

              <div class="form-control">
                <label for="lastName" class="label">
                  <span class="label-text">{$_('registration.form.lastName.label')}</span>
                </label>
                <input type="text" id="lastName" class="input input-bordered w-full" bind:value={lastName} placeholder="{$_('registration.form.lastName.placeholder')}" />
              </div>
            </div>

            <div class="form-control">
              <label for="email" class="label">
                <span class="label-text">{$_('registration.form.email.label')}</span>
              </label>
              <input type="email" id="email" class="input input-bordered w-full" bind:value={email} placeholder="{$_('registration.form.email.placeholder')}" required />
            </div>

            <div class="form-control">
              <label for="password" class="label">
                <span class="label-text">{$_('registration.form.password.label')}</span>
              </label>
              <div class="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  class="input input-bordered relative z-0 w-full pr-12"
                  bind:value={password}
                  placeholder="{$_('registration.form.password.placeholder')}"
                  required
                  minlength="8"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 z-10 flex items-center pr-3"
                  onclick={() => (showPassword = !showPassword)}
                  aria-label={showPassword ? $_('registration.form.password.hide') : $_('registration.form.password.show')}
                >
                  {#if showPassword}
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  {/if}
                </button>
              </div>
              <div class="label-text mt-1 text-sm opacity-70">{$_('registration.form.password.minLength')}</div>
            </div>

            <div class="form-control">
              <label for="confirmPassword" class="label">
                <span class="label-text">{$_('registration.form.confirmPassword.label')}</span>
              </label>
              <div class="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  class={`input input-bordered relative z-0 w-full pr-12 ${!isPasswordMatch ? 'input-error' : ''}`}
                  bind:value={confirmPassword}
                  oninput={checkPasswordMatch}
                  placeholder="{$_('registration.form.confirmPassword.placeholder')}"
                  required
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 z-10 flex items-center pr-3"
                  onclick={() => (showConfirmPassword = !showConfirmPassword)}
                  aria-label={showConfirmPassword ? $_('registration.form.password.hide') : $_('registration.form.password.show')}
                >
                  {#if showConfirmPassword}
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-base-content/50 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  {/if}
                </button>
              </div>
              {#if !isPasswordMatch && confirmPassword}
                <div class="label-text text-error mt-1 text-sm">{$_('registration.form.confirmPassword.mismatch')}</div>
              {/if}
            </div>

            <div class="form-control">
              <label class="cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" required />
                <span class="text-black/60 ml-1">
                  {$_('registration.form.privacy.prefix')}<a href="/privacy-notice" class="link link-primary">{$_('registration.form.privacy.link')}</a>{$_('registration.form.privacy.suffix')}
                </span>
              </label>
            </div>

            <div class="pt-4">
              <button type="submit" class="btn-basic w-full" disabled={isLoading}>
                {#if isLoading}
                  <span class="loading loading-spinner loading-sm mr-2"></span>
                  {$_('registration.form.button.loading')}
                {:else}
                  {$_('registration.form.button.createAccount')}
                {/if}
              </button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>
