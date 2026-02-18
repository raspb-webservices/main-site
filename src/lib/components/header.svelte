<script lang="ts">
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { User } from '$interfaces/user.interface';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, localizeHref, setLocale } from '$lib/paraglide/runtime';

  let mobileNavOpen = $state(false);
  let logginIn = $state(false);
  let logginOut = $state(false);
  let isAuth = $derived(isAuthenticated.value);
  let currentUser = $derived(user.value) as User;
  let currentUserRoles = $derived(userroles.value);

  async function login() {
    logginIn = true;
    const popup = openAuth0Popup(450, 650);
    try {
      if (!popup) throw new Error('Popup konnte nicht geöffnet werden (Popup-Blocker?).');
      const auth0Client = await auth.getClient();
      await auth.loginWithPopup(auth0Client, { authorizationParams: {} }, popup);
    } finally {
      logginIn = false;
    }
  }

  async function logout() {
    logginOut = true;
    const auth0Client = await auth.getClient();
    await auth.logout(auth0Client);
    logginOut = false;
  }
</script>

<header class:loggedin={isAuth}>
  {#if isAuth}
    <div class="logged-in-header">
      <div class="inner-box flex items-center justify-between">
        <p>{m.header_welcome()} {currentUser.givenName} {currentUser.familyName}!</p>
        <div class="ml-auto"></div>
        <button
          class="text-link-button white-link"
          onclick={() => {
            goto(localizeHref('/dashboard'));
          }}>{m.header_dashboard()}</button
        >
        <div class="w-8 text-center text-white opacity-70">|</div>
        <button
          class="text-link-button white-link"
          onclick={() => {
            goto(localizeHref('/profile'));
          }}>{m.header_profile()}</button
        >
        <div class="w-8 text-center text-white opacity-70">|</div>
        <button
          class="text-link-button white-link"
          onclick={() => {
            logout();
          }}>{m.menu_logout()}</button
        >
      </div>
    </div>
  {/if}
  <div class="inner-box">
    <button
      aria-label="raspb Logo"
      class="logo"
      onclick={() => {
        goto('/');
      }}
    ></button>

    <nav class="navigation" aria-label="Main navigation">
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/services')}
        onclick={() => {
          goto(localizeHref('/services'));
        }}>{m.menu_services()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/insights')}
        onclick={() => {
          goto(localizeHref('/insights'));
        }}>{m.menu_insights()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/about-us')}
        onclick={() => {
          goto(localizeHref('/about-us'));
        }}>{m.menu_aboutUs()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/faq')}
        onclick={() => {
          goto(localizeHref('/faq'));
        }}>{m.menu_faq()}</button
      >
    </nav>

    <div class="cta-area">
      {#if !isAuth}
        <button
          class="btn-outline-header"
          onclick={() => {
            login();
          }}
          ><div class="button-inner">
            {#if logginIn || logginOut}<span class="loading loading-ring loading-sm"></span>{:else}<span>{m.menu_login()}</span>{/if}
          </div></button
        >
      {/if}
      <button
        class="btn-basic-header"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}><span class="halfXl:block hidden">{m.menu_configureProject()}</span><span class="halfXl:hidden">{m.menu_start()}</span></button
      >
    </div>

    <nav class="mobile-navigvation" aria-label="Mobile navigation">
      <div class="drawer drawer-end">
        <input id="mobile-navigation" type="checkbox" class="drawer-toggle" bind:checked={mobileNavOpen} />
        <div class="drawer-content">
          <label
            for="mobile-navigation"
            aria-label={m.header_open_menu()}
            class="drawer-button text-text-base-content hover:text-primary block h-11 cursor-pointer rounded-full p-1"
          >
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512" aria-hidden="true">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>
        <div class="drawer-side">
          <label for="mobile-navigation" aria-label={m.header_close_sidebar()} class="drawer-overlay"></label>
          <div class="flex min-h-full w-80 flex-col bg-white">
            <div class="bg-base-100 w-full grow">
              <div class="flex w-full items-center justify-end px-4 pt-6 pb-4">
                <label
                  for="mobile-navigation"
                  aria-label={m.header_close_sidebar()}
                  class="text-base-content hover:text-primary block h-11 cursor-pointer rounded-full p-1"
                >
                  <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512">
                    <polygon
                      points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
                    />
                  </svg>
                </label>
              </div>

              <div class="navigation-area">
                <button
                  class="btn-basic mx-0 mt-1.5 mb-4 w-full"
                  onclick={() => {
                    mobileNavOpen = false;
                    goto(localizeHref('/wizard'));
                  }}>{m.menu_configureProject()}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname == localizeHref('services')}
                  onclick={() => {
                    goto(localizeHref('services'));
                  }}>{m.menu_services()}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname == localizeHref('insights')}
                  onclick={() => {
                    goto(localizeHref('insights'));
                  }}>{m.menu_insights()}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname == localizeHref('about-us')}
                  onclick={() => {
                    goto(localizeHref('about-us'));
                  }}>{m.menu_aboutUs()}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname == localizeHref('faq')}
                  onclick={() => {
                    goto(localizeHref('faq'));
                  }}>{m.menu_faq()}</button
                >
                {#if !isAuth}
                  <button
                    class="nav-item"
                    onclick={() => {
                      login();
                    }}>{m.menu_login()}</button
                  >
                {:else}
                  <button
                    class="nav-item"
                    onclick={() => {
                      logout();
                    }}>{m.menu_logout()}</button
                  >
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</header>

<style lang="postcss">
  @reference '../../app.css';
  .logged-in-header {
    @apply bg-iconic-blue w-full py-1.5;
    .inner-box {
      @apply m-auto flex h-full w-full max-w-7xl items-center justify-between px-4;
      p {
        @apply text-neutral-content text-base;
      }
    }
  }

  header {
    &.loggedin {
      @apply h-28;
      .inner-box {
        @apply h-auto;
      }
    }
    @apply bg-base-50/75 sticky top-0 z-20 h-20 w-full shadow-lg backdrop-blur-lg;
    .inner-box {
      @apply m-auto flex h-full w-full max-w-7xl items-center justify-between px-4;

      .logo {
        @apply aspect-video h-17.5 cursor-pointer bg-contain bg-center bg-no-repeat;
        background-image: url('$images/logo.webp');
      }
      nav.navigation {
        @apply hidden w-fit items-center justify-center md:flex;
        > button {
          @apply text-base-content/80 relative ml-4 px-2 text-lg font-bold md:ml-6;

          &::before,
          &::after {
            @apply from-pink to-purple absolute -bottom-1 left-0 block h-0.5 w-full origin-right scale-x-0 bg-linear-to-r transition-transform duration-500;
            content: '';
          }
          &::before {
            @apply -top-1 origin-left;
          }
          &:hover {
            @apply text-base-content cursor-pointer;
            &::before,
            &::after {
              @apply scale-x-100;
            }
          }
          &:first-child {
            @apply ml-0;
          }
          &.active {
            @apply text-base-content;
            &::after {
              @apply via-base-content/80 scale-x-100 bg-linear-to-r from-gray-500 to-gray-500;
            }
            &:hover {
              @apply cursor-default;
              &::before {
                @apply scale-x-0;
              }
            }
          }
        }
      }

      div.cta-area {
        @apply hidden items-center justify-center md:flex;
      }

      nav.mobile-navigvation {
        @apply flex md:hidden;

        .navigation-area {
          @apply flex flex-wrap p-4 pt-0;
          .nav-item {
            @apply text-base-content relative flex w-full cursor-pointer items-center justify-center p-3 pb-4 text-2xl transition-all duration-300;

            &::after {
              @apply from-pink to-purple absolute bottom-0 left-0 block h-0.5 w-full origin-left bg-linear-to-r;
              content: '';
            }

            &:last-child {
              &::after {
                @apply hidden;
              }
            }

            &.active {
              @apply font-bold;
              &:hover {
                @apply cursor-default bg-transparent text-inherit;
              }
            }
            &:hover {
              @apply text-primary;
            }
          }
        }
      }
    }
  }
</style>
