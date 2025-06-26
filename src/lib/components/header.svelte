<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  let mobileNavOpen = $state(false);
</script>

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
      <button
        class="btn-basic"
        onclick={() => {
          goto('/get-started');
        }}><span class="hidden lg:block">Projekt konfigurieren</span><span class="lg:hidden">Starten</span></button
      >
    </div>

    <nav class="mobile-navigvation">
      <div class="burger-nav-button">
        <button
          aria-label="Open Mobile Navigation"
          onclick={() => {
            mobileNavOpen = true;
          }}
        ></button>
      </div>
      <div class="mobile-navigation-panel" class:closed={!mobileNavOpen}>
        <div class="close-area">
          <button
            aria-label="Close Mobile Navigation"
            onclick={() => {
              mobileNavOpen = false;
            }}
          ></button>
        </div>

        <button
          class="btn-basic mb-4 w-10/12"
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

        .burger-nav-button {
          @apply cursor-pointer;
          button {
            @apply bg-primary h-8 w-8 bg-contain bg-center bg-no-repeat transition-all duration-300;
            mask-image: url(/icons/burger-menu.svg);

            &:hover {
              @apply bg-secondary;
            }
          }
        }

        .mobile-navigation-panel {
          @apply bg-secondary fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-start;
          &.closed {
            @apply hidden;
          }

          .close-area {
            @apply flex w-full items-center justify-end p-4 pb-1;
            button {
              @apply h-12 w-12 bg-white bg-contain bg-center bg-no-repeat transition-all duration-300 cursor-pointer;
              mask-image: url(/icons/closing-x.svg);

              &:hover {
                @apply bg-lightGrey;
              }
            }
          }

          > button.nav-item {
            @apply mx-auto max-h-[125px] w-10/12 border-b-2 border-white py-4 text-2xl font-semibold text-white no-underline cursor-pointer;
            &.active {
              @apply underline;
            }
            &:hover {
              @apply bg-primary;
            }
            &:last-child {
              @apply border-b-0;
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
