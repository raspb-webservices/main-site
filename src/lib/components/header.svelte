<script lang="ts">
  import { user, isAuthenticated, popupOpen, userroles } from '$store/sharedStates.svelte';
  import auth from '../../authService';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { locale, locales, _ } from 'svelte-i18n';

  let mobileNavOpen = $state(false);
  let logginIn = $state(false);

  // Erstelle eine reaktive Variable, die sich automatisch aktualisiert
  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get());
  let currentUserRoles = $derived(userroles.get());
  let currentTheme = $state('light');

  async function login() {
    logginIn = true;
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);

    if (currentUserRoles.includes('admin')) {
      goto('/admin-dashboard');
    }
    logginIn = false;
  }

  async function logout() {
    logginIn = true;
    const auth0Client = await auth.createClient();
    await auth.logout(auth0Client);
    logginIn = false;
  }

  function toggleLocale() {
    const newLocale = $locale === 'de' ? 'en' : 'de';
    locale.set(newLocale);
  }
  function toggleTheme() {
    if (currentTheme === 'light') {
      currentTheme = 'dark';
    } else {
      currentTheme = 'light';
    }
  }
</script>

{#if isAuth}
  <div class="logged-in-header">
    <div class="inner-box flex justify-between items-center">
      <p class="no-padding">Herzlich Willkommen, {currentUser['givenName']} {currentUser['familyName']}!</p>
      <div class="ml-auto"></div>
      <button
        class="text-link-button"
        onclick={() => {
          if(currentUserRoles.includes('customer')) {
            goto('/customer-dashboard');
          } else {
            goto('/admin-dashboard');
          }
        }}>Zum Dashboard</button
      >
      <div class="text-center w-8 opacity-70 text-base"> | </div>
      <button
        class="text-link-button"
          onclick={() => {
            logout();
          }}>Abmelden</button
      >
    </div>
  </div>
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
      <!-- <button
        class="nav-item"
        class:active={page.url.pathname === '/contact'}
        onclick={() => {
          goto('/contact');
        }}>{$_('menu.contact')}</button
      > -->
    </nav>

    <div class="cta-area">
      {#if !isAuth}
        <button
          class="nav-button-link"
          onclick={() => {
            login();
          }}
          >{#if logginIn}<span class="loading loading-ring loading-sm"></span>{:else}<span>{$_('menu.login')}</span>{/if}</button
        >
      {/if}
      <button
        class="btn-basic"
        onclick={() => {
          goto('/get-started');
        }}><span class="halfXl:block hidden">{$_('menu.configureProject')}</span><span class="halfXl:hidden">{$_('menu.start')}</span></button
      >
      <div class="controls">
        <button
          class="locale-toggle-btn"
          class:german={$locale === 'de'}
          class:english={$locale === 'en'}
          onclick={toggleLocale}
          aria-label="Switch language"
          title={$locale === 'de' ? $_('menu.switchLanguageToEnglish') : $_('menu.switchLanguageToGerman')}
        >
        </button>

        <label class="swap swap-rotate">
          <input type="checkbox" class="theme-controller" value="dark" />
          <svg class="swap-off fill-warning h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>
          <svg class="swap-on fill-warning h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>

        <!-- <button
          class="theme-toggle-btn"
          class:light={currentTheme === 'light'}
          class:dark={currentTheme === 'dark'}
          onclick={toggleTheme}
          aria-label="Switch theme"
          title={currentTheme === 'light' ? 'dark mode' : 'light mode'}
        >
        </button> -->
      </div>
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
                <!-- <button
                  class="nav-item"
                  class:active={page.url.pathname === '/contact'}
                  onclick={() => {
                    mobileNavOpen = false;
                    goto('/contact');
                  }}>{$_('menu.contact')}</button
                > -->
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

                <div class="mobile-controls">
                  <button
                    class="locale-toggle-btn"
                    class:german={$locale === 'de'}
                    class:english={$locale === 'en'}
                    onclick={toggleLocale}
                    aria-label="Switch language"
                    title={$locale === 'de' ? $_('menu.switchLanguageToEnglish') : $_('menu.switchLanguageToGerman')}
                  >
                  </button>

                  <label class="swap swap-rotate">
                    <input type="checkbox" class="theme-controller" value="dark" />
                    <svg class="swap-off fill-warning h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                      />
                    </svg>
                    <svg class="swap-on fill-warning h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                      />
                    </svg>
                  </label>

                  <!-- <button
          class="theme-toggle-btn"
          class:light={currentTheme === 'light'}
          class:dark={currentTheme === 'dark'}
          onclick={toggleTheme}
          aria-label="Switch theme"
          title={currentTheme === 'light' ? 'dark mode' : 'light mode'}
        >
        </button> -->
                </div>
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
    @apply bg-black w-full py-1.5 text-neutral-content;

    p {
      @apply text-base text-neutral-content;
    }

  }
  header {
    @apply bg-base-100 h-24 w-full py-10 shadow-lg;

    > div.inner-box {
      @apply flex items-center justify-between;

      .logo {
        @apply aspect-video h-24 cursor-pointer bg-cover bg-center bg-no-repeat;
        background-image: url(/images/logo.png);
      }

      nav.navigation {
        @apply hidden w-fit items-center justify-center lg:flex;
        > button {
          @apply text-base-content/80 relative ml-6 px-2 text-lg font-bold;

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
      nav.mobile-navigvation {
        @apply flex lg:hidden;

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

      .cta-area {
        @apply hidden items-center justify-center lg:flex;
        .controls {
          @apply m-2 flex flex-row gap-2;
          .locale-toggle-btn {
            @apply flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white bg-cover bg-center bg-no-repeat p-0 transition-all duration-300 hover:shadow-lg;
            &.german {
              background-image: url('/icons/flags/germany-flag.svg');
            }
            &.english {
              background-image: url('/icons/flags/uk-flag.svg');
            }
            &:hover {
              @apply scale-105 transform;
            }

            &:active {
              @apply scale-95 transform;
            }
          }
        }
      }

      .mobile-controls {
        @apply m-4 flex w-full flex-row items-center justify-center gap-4;
        .locale-toggle-btn {
          @apply flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white bg-cover bg-center bg-no-repeat p-0 transition-all duration-300 hover:shadow-lg;
          &.german {
            background-image: url('/icons/flags/germany-flag.svg');
          }
          &.english {
            background-image: url('/icons/flags/uk-flag.svg');
          }
          &:hover {
            @apply scale-105 transform;
          }

          &:active {
            @apply scale-95 transform;
          }
        }
      }
    }
  }
</style>
