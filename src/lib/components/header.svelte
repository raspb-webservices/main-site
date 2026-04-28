<script lang="ts">
  import { user, isAuthenticated } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { User } from '$interfaces/user.interface';
  import { openAuth0Popup } from '$helper/loginOpener';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, localizeHref, setLocale } from '$lib/paraglide/runtime';
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let mobileNavOpen = $state(false);
  let logginIn = $state(false);
  let logginOut = $state(false);
  let isAuth = $derived(isAuthenticated.value);
  let currentUser = $derived(user.value) as User;
  let darkActive = $state(false);

  onMount(() => {
    const saved = localStorage.getItem('raspb-theme');
    darkActive = (saved ?? document.documentElement.getAttribute('data-theme')) === 'dark';
  });

  $effect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    }
  });

  function toggleTheme() {
    const next = darkActive ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.colorScheme = next;
    localStorage.setItem('raspb-theme', next);
    darkActive = !darkActive;
  }

  function toggleLocale() {
    setLocale(getLocale() === 'de' ? 'en' : 'de');
  }

  function closeMobileNav() {
    mobileNavOpen = false;
  }

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

<header class:loggedin={isAuth} class:menu-open={mobileNavOpen}>
  {#if isAuth}
    <div class="logged-in-header">
      <div class="inner-box flex items-center justify-between">
        <p>{m.header_welcome()} {currentUser.givenName} {currentUser.familyName}!</p>
        <div class="ml-auto"></div>
        <button
          class="text-link-button white-link"
          onclick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/dashboard') as any));
          }}>{m.header_dashboard()}</button
        >
        <div class="w-8 text-center text-white opacity-70">|</div>
        <button
          class="text-link-button white-link"
          onclick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/profile') as any));
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
        goto(resolve('/'));
      }}
    ></button>

    <nav class="navigation" aria-label="Main navigation">
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/services')}
        onclick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          goto(resolve(localizeHref('/services') as any));
        }}>{m.menu_services()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname.startsWith('/blog')}
        onclick={() => {
          goto(resolve('/blog'));
        }}>{m.menu_blog()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/insights')}
        onclick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          goto(resolve(localizeHref('/insights') as any));
        }}>{m.menu_insights()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/blog')}
        onclick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          goto(resolve(localizeHref('/blog') as any));
        }}>{m.menu_blog()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/about-us')}
        onclick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          goto(resolve(localizeHref('/about-us') as any));
        }}>{m.menu_aboutUs()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname == localizeHref('/faq')}
        onclick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          goto(resolve(localizeHref('/faq') as any));
        }}>{m.menu_faq()}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname.startsWith('/blog')}
        onclick={() => {
          goto(resolve('/blog'));
        }}>Blog</button
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          goto(resolve(localizeHref('/wizard') as any));
        }}><span class="halfXl:block hidden">{m.menu_configureProject()}</span><span class="halfXl:hidden">{m.menu_start()}</span></button
      >
    </div>

    <button
      class="mobile-menu-btn"
      aria-label={m.header_open_menu()}
      onclick={() => (mobileNavOpen = true)}
    >
      <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
    </button>
  </div>

  {#if mobileNavOpen}
    <div
      class="mobile-backdrop"
      transition:fade={{ duration: 250 }}
      onclick={closeMobileNav}
      onkeydown={(e) => e.key === 'Escape' && closeMobileNav()}
      role="button"
      tabindex="-1"
      aria-label={m.header_close_sidebar()}
    ></div>

    <nav
      class="mobile-panel"
      transition:fly={{ x: 320, duration: 300, easing: cubicOut }}
      aria-label="Mobile navigation"
    >
      <div class="panel-header">
        <button class="close-btn" aria-label={m.header_close_sidebar()} onclick={closeMobileNav}>
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512">
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </button>
      </div>

      <div class="navigation-area">
        <button
          class="btn-basic mx-0 mt-1.5 mb-4 w-full"
          onclick={() => {
            closeMobileNav();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/wizard') as any));
          }}>{m.menu_configureProject()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname == localizeHref('/services')}
          onclick={() => {
            closeMobileNav();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/services') as any));
          }}>{m.menu_services()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname.startsWith('/blog')}
          onclick={() => {
            closeMobileNav();
            goto(resolve('/blog'));
          }}>{m.menu_blog()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname == localizeHref('/insights')}
          onclick={() => {
            closeMobileNav();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/insights') as any));
          }}>{m.menu_insights()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname == localizeHref('/blog')}
          onclick={() => {
            closeMobileNav();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/blog') as any));
          }}>{m.menu_blog()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname == localizeHref('/about-us')}
          onclick={() => {
            closeMobileNav();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/about-us') as any));
          }}>{m.menu_aboutUs()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname == localizeHref('/faq')}
          onclick={() => {
            closeMobileNav();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            goto(resolve(localizeHref('/faq') as any));
          }}>{m.menu_faq()}</button
        >
        <button
          class="nav-item"
          class:active={page.url.pathname.startsWith('/blog')}
          onclick={() => {
            closeMobileNav();
            goto(resolve('/blog'));
          }}>Blog</button
        >
        {#if !isAuth}
          <button class="nav-item" onclick={() => login()}>{m.menu_login()}</button>
        {:else}
          <button class="nav-item" onclick={() => logout()}>{m.menu_logout()}</button>
        {/if}
      </div>

      <div class="secondary-area">
        <div class="controls-row">
          <button
            class="locale-btn"
            class:german={getLocale() === 'de'}
            class:english={getLocale() === 'en'}
            onclick={toggleLocale}
            aria-label={getLocale() === 'de' ? m.menu_switchLanguageToEnglish() : m.menu_switchLanguageToGerman()}
            title={getLocale() === 'de' ? m.menu_switchLanguageToEnglish() : m.menu_switchLanguageToGerman()}
          ></button>
          <button
            class="theme-btn"
            onclick={toggleTheme}
            aria-label={m.footer_toggle_dark_mode()}
            title={m.footer_toggle_dark_mode()}
          >
            {#if darkActive}
              <svg class="fill-warning h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            {:else}
              <svg class="fill-warning h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            {/if}
          </button>
        </div>

        <div class="legal-row">
          <button
            class="legal-link"
            onclick={() => {
              closeMobileNav();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              goto(resolve(localizeHref('/imprint') as any));
            }}>{m.footer_nav_legal_imprint()}</button
          >
          <span class="legal-sep">|</span>
          <button
            class="legal-link"
            onclick={() => {
              closeMobileNav();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              goto(resolve(localizeHref('/privacy') as any));
            }}>{m.footer_nav_legal_privacy()}</button
          >
          <span class="legal-sep">|</span>
          <button
            class="legal-link"
            onclick={() => {
              closeMobileNav();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              goto(resolve(localizeHref('/contact') as any));
            }}>{m.footer_nav_legal_contact()}</button
          >
        </div>
      </div>
    </nav>
  {/if}
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
    &.menu-open {
      backdrop-filter: none;
    }
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

      .mobile-menu-btn {
        @apply text-base-content hover:text-primary flex md:hidden h-11 cursor-pointer items-center justify-center rounded-full p-1 transition-colors duration-200;
      }
    }
  }

  /* Backdrop */
  .mobile-backdrop {
    @apply fixed inset-0 bg-black/50 md:hidden;
    z-index: 30;
  }

  /* Flyout panel */
  .mobile-panel {
    @apply bg-base-100 fixed top-0 right-0 flex w-80 flex-col md:hidden;
    height: 100dvh;
    z-index: 40;

    .panel-header {
      @apply flex w-full items-center justify-end px-4 pt-6 pb-4;

      .close-btn {
        @apply text-base-content hover:text-primary block h-11 cursor-pointer rounded-full p-1 transition-colors duration-200;
      }
    }

    .navigation-area {
      @apply flex flex-1 flex-col px-4 pt-0 overflow-y-auto;

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

    .secondary-area {
      @apply border-base-content/10 mt-auto flex flex-col gap-3 border-t px-4 py-5;

      .controls-row {
        @apply flex items-center gap-3;

        .locale-btn {
          @apply bg-base-50 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-cover bg-center bg-no-repeat p-0 transition-all duration-300;
          &.german {
            background-image: url('$icons/flags/germany.svg');
          }
          &.english {
            background-image: url('$icons/flags/uk.svg');
          }
          &:hover {
            @apply scale-105 shadow-lg;
          }
          &:active {
            @apply scale-95;
          }
        }

        .theme-btn {
          @apply flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95;
        }
      }

      .legal-row {
        @apply text-base-content/50 flex items-center gap-2 text-sm;

        .legal-link {
          @apply hover:text-base-content cursor-pointer transition-colors duration-200;
        }

        .legal-sep {
          @apply select-none opacity-40;
        }
      }
    }
  }
</style>
