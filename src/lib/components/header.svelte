<script lang="ts">
  import { user, isAuthenticated, popupOpen, userroles } from '$store/sharedStates.svelte';
  import auth from '../../authService';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  let mobileNavOpen = $state(false);
  let logginIn = $state(false);

  // Erstelle eine reaktive Variable, die sich automatisch aktualisiert
  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get());
  let currentUserRoles = $derived(userroles.get());

  async function login() {
    logginIn = true;
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);

    if(currentUserRoles.includes('admin')) {
      goto("/dashboard")
    }
    logginIn = false;
  }

  async function logout() {
    logginIn = true;
    const auth0Client = await auth.createClient();
    await auth.logout(auth0Client);
    logginIn = false;
  }
</script>

{#if isAuth}
  <p class="no-padding text-center">Hallo {currentUser['name']} - Rollen: {JSON.stringify(currentUserRoles)}</p>
{/if}
<header>
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
        }}>Services</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/einblicke'}
        onclick={() => {
          goto('/einblicke');
        }}>Einblicke</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/ueber-uns'}
        onclick={() => {
          goto('/ueber-uns');
        }}>Über uns</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/faq'}
        onclick={() => {
          goto('/faq');
        }}>FAQ</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/kontakt'}
        onclick={() => {
          goto('/kontakt');
        }}>Kontakt</button
      >
    </nav>

    <div class="cta-area">
      {#if !isAuth}
        <button
          class="btn btn-ghost"
          onclick={() => {
            login();
          }}>{#if logginIn}<span class="loading loading-ring loading-sm"></span>{:else}<span>Login</span>{/if}</button
        >
      {:else}
        <button
          class="btn btn-ghost"
          onclick={() => {
            logout();
          }}>{#if logginIn}<span class="loading loading-ring loading-sm"></span>{:else}<span>Logout</span>{/if}</button
        >
      {/if}
      <button
        class="btn-basic"
        onclick={() => {
          goto('/get-started');
        }}><span class="hidden lg:block">Projekt konfigurieren</span><span class="lg:hidden">Starten</span></button
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
            <div class="bg-secondary/30 w-full grow">
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
                  }}>Projekt konfigurieren</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/services'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/services');
                  }}>Services</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/einblicke'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/einblicke');
                  }}>Einblicke</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/ueber-uns'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/ueber-uns');
                  }}>Über uns</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/faq'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/faq');
                  }}>FAQ</button
                >
                <button
                  class="nav-item"
                  class:active={page.url.pathname === '/kontakt'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/kontakt');
                  }}>Kontakt</button
                >
                {#if !isAuth}
                  <button
                    class="nav-item"
                    onclick={() => {
                      login();
                    }}>Login</button
                  >
                {:else}
                  <button
                    class="nav-item"
                    onclick={() => {
                      logout();
                    }}>Logout</button
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
  header {
    @apply h-24 w-full py-10 shadow-lg;

    > div.inner-box {
      @apply flex items-center justify-between;

      .logo {
        @apply aspect-video h-24 cursor-pointer bg-cover bg-center bg-no-repeat;
        background-image: url(/images/logo.jpg);
      }

      nav.navigation {
        @apply navOne:flex hidden w-fit items-center justify-center;
        > button {
          @apply text-textBase/80 relative ml-6 px-2 text-lg font-bold;

          &::before,
          &::after {
            @apply from-pink to-purple absolute -bottom-1 left-0 block h-0.5 w-full origin-right scale-x-0 bg-gradient-to-r transition-transform duration-500;
            content: '';
          }
          &::before {
            @apply -top-1 origin-left;
          }
          &:hover {
            @apply cursor-pointer text-black;
            &::before,
            &::after {
              @apply scale-x-100;
            }
          }
          &:first-child {
            @apply ml-0;
          }
          &.active {
            @apply text-black;
            &::after {
              @apply via-textBase/80 scale-x-100 bg-gradient-to-r from-gray-500 to-gray-500;
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
      nav.mobile-navigvation {
        @apply navOne:hidden flex;

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
              @apply font-bold text-black;
              &:hover {
                @apply cursor-default bg-transparent text-black;
              }
            }
            &:hover {
              @apply text-primary bg-white/30;
            }
          }
        }
      }

      .cta-area {
        @apply navOne:flex hidden items-center justify-center;
      }
    }
  }
</style>
