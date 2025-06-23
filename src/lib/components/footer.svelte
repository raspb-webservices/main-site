<script lang="ts">
  const currentYear = new Date().getFullYear();
  import { goto } from '$app/navigation';
</script>

<footer>
  <div class="inner-box">
    <h4 class="on-dark">raspb &copy; {currentYear}</h4>
    <nav class="footer-navigation">
      <button
        class="text-link-button on-dark"
        on:click={() => {
          goto('/impressum');
        }}>Impressum</button
      >
      <button
        class="text-link-button on-dark"
        on:click={() => {
          goto('/datenschutz');
        }}>Datenschutz</button
      >
      <button
        class="text-link-button on-dark"
        on:click={() => {
          goto('/kontakt');
        }}>Kontakt</button
      >
    </nav>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply h-24 w-full bg-primary py-2 md:h-20;

    > div.inner-box {
      @apply flex h-full w-full flex-col flex-wrap items-center justify-center md:flex-row md:justify-between;

      h4 {
        @apply whitespace-nowrap pt-2 text-white md:p-0;
      }

      nav.footer-navigation {
        @apply py-2 md:ml-auto;
        > button {
          @apply ml-8 font-semibold;
          &:first-child {
            @apply ml-0;
          }
        }
      }
    }
  }
</style>
