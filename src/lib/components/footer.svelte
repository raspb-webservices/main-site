<script lang="ts">
  const currentYear = new Date().getFullYear();
  import { goto } from "$app/navigation";
</script>

<footer>
  <div class="container">
    <div class="inner-container">
      <h4 class="on-dark">raspb &copy; {currentYear}</h4>
      <nav class="footer-navigation">
        <button
          class="text-link-button on-dark"
          on:click={() => {
            goto("/impressum");
          }}>Impressum</button>
        <button
          class="text-link-button on-dark"
          on:click={() => {
            goto("/datenschutz");
          }}>Datenschutz</button>
        <button
          class="text-link-button on-dark "
          on:click={() => {
            goto("/kontakt");
          }}>Kontakt</button>
      </nav>
    </div>
  </div>
</footer>

<style lang="postcss">
  footer {
    @apply w-full bg-primary py-6;
    .inner-container {
      @apply flex items-center justify-between;

      nav.footer-navigation {
        @apply ml-auto;
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
