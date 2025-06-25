<script lang="ts">

    import { page } from '$app/state';
  import { goto } from '$app/navigation';

    const currentYear = new Date().getFullYear();
</script>

<footer>
  <div class="inner-box">
    <h4 class="on-dark">raspb &copy; {currentYear}</h4>
    <nav class="footer-navigation">
      <button
        class="nav-item"
        class:active={page.url.pathname === '/impressum'}
        onclick={() => {
          goto('/impressum');
        }}>Impressum</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/datenschutz'}
        onclick={() => {
          goto('/datenschutz');
        }}>Datenschutz</button
      >
      <button
        class="nav-item"
        class:active={page.url.pathname === '/kontakt'}
        onclick={() => {
          goto('/kontakt');
        }}>Kontakt</button
      >
    </nav>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply bg-textBase h-12 w-full;

    > div.inner-box {
      @apply flex h-full w-full items-center justify-between;

      h4 {
        @apply p-0 font-medium whitespace-nowrap text-white;
      }

      nav.footer-navigation {
        @apply py-2 md:ml-auto;
        > button {
          @apply relative ml-6 px-1 font-medium text-white opacity-75;
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
