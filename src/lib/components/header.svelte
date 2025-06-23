<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let mobileNavOpen = false;
</script>

<header>
  <div class="inner-box">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="logo"
      on:click={() => {
        goto('/');
      }}
    ></div>
    <nav class="navigation">
      <button
        class="text-link-button"
        class:active={$page.url.pathname === '/aktuelles'}
        on:click={() => {
          goto('/aktuelles');
        }}>Aktuelles</button
      >
      <button
      class="text-link-button"
      class:active={$page.url.pathname === '/get-started'}
      on:click={() => {
        goto('/get-started');
      }}>Get started</button
    >
      <button
        class="text-link-button"
        class:active={$page.url.pathname === '/test'}
        on:click={() => {
          goto('/test');
        }}>Test</button
      >
    </nav>

    <nav class="mobile-navigvation">
      <div class="burger-nav-button">
        <button
          aria-label="Burger Navigation - Open Mobile Navigation"
          on:click={() => {
            mobileNavOpen = !mobileNavOpen;
          }}
        ></button>
      </div>
      <div class="mobile-navigation-panel" class:closed={!mobileNavOpen}>
        <div class="close-area">
          <button
            aria-label="Mobile Navigation - Close Mobile Navigation"
            on:click={() => {
              mobileNavOpen = !mobileNavOpen;
            }}
          ></button>
        </div>
        <button
          class="text-link-button"
          class:active={$page.url.pathname === '/aktuelles'}
          on:click={() => {
            goto('/aktuelles');
          }}>Aktuelles</button
        >
        <button
        class="text-link-button"
        class:active={$page.url.pathname === '/get-started'}
        on:click={() => {
          goto('/get-started');
        }}>Get started</button
      >
        <button
          class="text-link-button"
          class:active={$page.url.pathname === '/test'}
          on:click={() => {
            goto('/test');
          }}>Test</button
        >
      </div>
    </nav>
  </div>
</header>

<style lang="postcss">
  @reference '../../app.css';
  header {
    @apply h-24 w-full py-10;
    > div.inner-box {
      @apply flex items-center justify-between;

      .logo {
        @apply aspect-video h-24 cursor-pointer bg-cover bg-center bg-no-repeat;
        background-image: url(/images/logo.png);
      }

      nav.navigation {
        @apply ml-auto hidden md:flex;
        > button {
          @apply ml-8 py-1 text-lg font-semibold;
          &:first-child {
            @apply ml-0;
          }
        }
      }
      nav.mobile-navigvation {
        @apply flex md:hidden;

        .burger-nav-button {
          @apply cursor-pointer;
          button {
            @apply h-8 w-8 bg-primary bg-contain bg-center bg-no-repeat transition-all duration-300;
            mask-image: url(/icons/burger-menu.svg);

            &:hover {
              @apply bg-secondary;
            }
          }
        }

        .mobile-navigation-panel {
          @apply fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-start bg-secondary;
          &.closed {
            @apply hidden;
          }

          .close-area {
            @apply flex w-full items-center justify-end p-4;
            button {
              @apply h-12 w-12 bg-white bg-contain bg-center bg-no-repeat transition-all duration-300;
              mask-image: url(/icons/closing-x.svg);

              &:hover {
                @apply bg-lightGrey;
              }
            }
          }

          > button {
            @apply mx-auto max-h-[125px] w-10/12 border-b-2 border-white py-4 text-2xl font-semibold text-white no-underline;
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
    }
  }
</style>
