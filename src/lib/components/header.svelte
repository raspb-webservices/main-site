<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
</script>

<header>
  <div class="container">
    <div class="inner-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="logo" on:click={() => {goto("/");}}></div>
    <nav class="navigation">
      <button
        class="text-link-button"
        class:active={$page.url.pathname === "/aktuelles"}
        on:click={() => {
          goto("/aktuelles");
        }}>Aktuelles</button>
    </nav>
  </div>  
  </div>

</header>

<style lang="postcss">
  header {
    @apply w-full py-10;
    .inner-container {
      @apply flex items-center justify-between;

      .logo {
        @apply cursor-pointer bg-center bg-no-repeat bg-cover h-16 w-28 block;
        background-image: url(/images/logo.png);
      }

      nav.navigation {
        @apply ml-auto;
        > button {
          @apply ml-8 text-lg font-semibold;
          &:first-child {
            @apply ml-0;
          }
        }
      }
    }
  }
</style>
