<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';

  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<footer>
  <div class="inner-box">
    <h4>raspb &copy; {currentYear}</h4>
    <nav class="footer-navigation">
      <button
        class="nav-item"
        class:active={page.url.pathname === '/impressum'}
        onclick={() => {
          goto('/impressum');
        }}>{$_('footer.imprint')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/datenschutz'}
        onclick={() => {
          goto('/datenschutz');
        }}>{$_('footer.privacyPolicy')}</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/kontakt'}
        onclick={() => {
          goto('/kontakt');
        }}>{$_('footer.contact')}</button
      >
      <button
        class="nav-item flex justify-center items-center"
        onclick={scrollToTop}
        title={$_('footer.scrollToTop')}
        aria-label={$_('footer.scrollToTop')}
      >
        <svg class="chevron-up" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
      </button>
    </nav>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply bg-black h-20 w-full md:h-12;

    > div.inner-box {
      @apply flex h-full w-full flex-col items-center md:flex-row md:justify-between;

      h4 {
        @apply pt-2 pb-1 font-medium whitespace-nowrap text-white md:p-0;
      }

      nav.footer-navigation {
        @apply md:ml-auto md:py-2 flex;
        > button {
          @apply relative mr-2.5 ml-2.5 px-1 font-medium text-white opacity-75 md:mr-0 md:ml-6 min-h-6;
          &::after {
            @apply absolute -bottom-1 left-0 block h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-500;
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
  }
</style>
