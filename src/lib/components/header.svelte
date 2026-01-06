<script lang="ts">
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { _ } from 'svelte-i18n';
  import type { User } from '$interfaces/user.interface';

  let mobileNavOpen = $state(false);
  let logginIn = $state(false);
  let logginOut = $state(false);

  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get()) as User;
  let currentUserRoles = $derived(userroles.get());

  async function login() {
    logginIn = true;
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);
    logginIn = false;
  }

  async function logout() {
    logginOut = true;
    const auth0Client = await auth.createClient();
    await auth.logout(auth0Client);
    logginOut = false;
  }
</script>

<header class:loggedin={isAuth}>
  {#if isAuth}
  <div class="logged-in-header">
    <div class="inner-box flex items-center justify-between">
      <p>Herzlich Willkommen, {currentUser.givenName} {currentUser.familyName}!</p>
      <div class="ml-auto"></div>
      <button
        class="text-link-button white-link"
        onclick={() => {
          goto('/dashboard');
        }}>Dashboard</button
      >
            <div class="w-8 text-center text-white opacity-70">|</div>
      <button
        class="text-link-button white-link"
        onclick={() => {
          goto('/profile');
        }}>Profil</button
      >
      <div class="w-8 text-center text-white opacity-70">|</div>
      <button
        class="text-link-button white-link"
        onclick={() => {
          logout();
        }}>Logout</button
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

    <nav class="navigation">
      <button
        class="nav-item"
        class:active={page.url.pathname === '/services'}
        onclick={() => {
          goto('/services');
        }}>{$_('menu.services')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/insights'}
        onclick={() => {
          goto('/insights');
        }}>{$_('menu.insights')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/about-us'}
        onclick={() => {
          goto('/about-us');
        }}>{$_('menu.aboutUs')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/faq'}
        onclick={() => {
          goto('/faq');
        }}>{$_('menu.faq')}</button
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
            {#if logginIn || logginOut}<span class="loading loading-ring loading-sm"></span>{:else}<span>{$_('menu.login')}</span>{/if}
          </div></button
        >
      {/if}
      <button
        class="btn-basic-header"
        onclick={() => {
          goto('/get-started');
        }}><span class="halfXl:block hidden">{$_('menu.configureProject')}</span><span class="halfXl:hidden">{$_('menu.start')}</span></button
      >
    </div>

    <nav class="mobile-navigvation">
      <div class="drawer drawer-end">
        <input id="mobile-navigation" type="checkbox" class="drawer-toggle" bind:checked={mobileNavOpen} />
        <div class="drawer-content">
          <label for="mobile-navigation" class="drawer-button text-text-base-content hover:text-primary block h-11 cursor-pointer rounded-full p-1">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>
        <div class="drawer-side">
          <label for="mobile-navigation" aria-label="close sidebar" class="drawer-overlay"></label>
          <div class="flex min-h-full w-80 flex-col bg-white">
            <div class="bg-base-100 w-full grow">
              <div class="flex w-full items-center justify-end px-4 pt-6 pb-4">
                <label
                  for="mobile-navigation"
                  aria-label="close sidebar"
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
                    goto('/get-started');
                  }}>{$_('menu.configureProject')}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/services'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/services');
                  }}>{$_('menu.services')}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/insights'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/insights');
                  }}>{$_('menu.insights')}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/about-us'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/about-us');
                  }}>{$_('menu.aboutUs')}</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/faq'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/faq');
                  }}>{$_('menu.faq')}</button
                >
                {#if !isAuth}
                  <button
                    class="nav-item"
                    onclick={() => {
                      login();
                    }}>{$_('menu.login')}</button
                  >
                {:else}
                  <button
                    class="nav-item"
                    onclick={() => {
                      logout();
                    }}>{$_('menu.logout')}</button
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
    @apply sticky top-0 z-20 h-20 w-full bg-base-50/75 backdrop-blur-lg shadow-lg;
    .inner-box {
      @apply m-auto flex h-full w-full max-w-7xl items-center justify-between px-4;

      .logo {
        @apply aspect-video h-[70px] cursor-pointer bg-contain bg-center bg-no-repeat;
        background-image: url("/images/logo.png");
      }
      nav.navigation {
        @apply hidden w-fit items-center justify-center md:flex;
        > button {
          @apply text-base-content/80 relative ml-4 px-2 text-lg font-bold md:ml-6;

          &::before,
          &::after {
            @apply from-pink to-purple absolute -bottom-1 left-0 block h-0.5 w-full origin-right scale-x-0 bg-gradient-to-r transition-transform duration-500;
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
              @apply via-base-content/80 scale-x-100 bg-gradient-to-r from-gray-500 to-gray-500;
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
              @apply from-pink to-purple absolute bottom-0 left-0 block h-0.5 w-full origin-left bg-gradient-to-r;
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
                @apply cursor-default bg-transparent;
                color: inherit;
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
