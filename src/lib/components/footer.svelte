<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { locale, _ } from 'svelte-i18n';

  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function toggleLocale() {
    const newLocale = $locale === 'de' ? 'en' : 'de';
    locale.set(newLocale);
  }
</script>

<footer>
  <div class="inner-box">
    <h3 class="text-iconic-blue no-padding">raspb &copy; {currentYear}</h3>

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
    </div>

    <nav class="footer-navigation">
      <button
        class="nav-item"
        class:active={page.url.pathname === '/imprint'}
        onclick={() => {
          goto('/imprint');
        }}>{$_('footer.imprint')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/privacy-notice'}
        onclick={() => {
          goto('/privacy-notice');
        }}>{$_('footer.privacyPolicy')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/contact'}
        onclick={() => {
          goto('/contact');
        }}>{$_('footer.contact')}</button
      >
      <button class="nav-item flex items-center justify-center" onclick={scrollToTop} title={$_('footer.scrollToTop')} aria-label={$_('footer.scrollToTop')}>
        <svg
          class="chevron-up"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
      </button>
    </nav>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply min-h-96 bg-base-100 py-28;
    .inner-box {
      @apply m-auto flex h-full w-full max-w-7xl items-center justify-between px-4;
    }

    .controls {
      @apply flex ml-auto mr-4;
      .locale-toggle-btn {
        @apply flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white bg-cover bg-center bg-no-repeat p-0 transition-all duration-300 hover:shadow-lg mx-2;
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
    nav.footer-navigation {
      @apply flex md:py-2;
      > button {
        @apply relative mr-2.5 ml-2.5 min-h-6 px-1 font-medium text-iconic-blue opacity-75 md:mr-0 md:ml-6;
        &::after {
          @apply absolute -bottom-1 left-0 block h-0.5 w-full origin-left scale-x-0 bg-iconic-blue transition-transform duration-500;
          content: '';
        }
        &:hover {
          @apply cursor-pointer opacity-100;
          &::after {
            @apply scale-x-100;
          }
        }

        &.active {
          @apply opacity-100;
          &::after {
            @apply scale-x-100;
          }
          &:hover {
            @apply cursor-default;
          }
        }

        &:first-child {
          @apply ml-0;
        }
      }
    }
  }
</style>
