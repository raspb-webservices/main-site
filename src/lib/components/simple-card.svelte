<script lang="ts">
  import { goto } from '$app/navigation';

  export let customImageURL;
  export let headline = 'no headline';
  export let subheadline = 'no sub-headline';
  export let target = '/kontakt';

  let customImageStyle = 'url(' + customImageURL + ')';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="simple-card" on:click={() => goto(target)}>
  <div class="image-area" style="--cardImage:{customImageStyle};"></div>
  <div class="container">
    <h3>{headline}</h3>
    <p>{subheadline}</p>
  </div>
</div>

<style lang="postcss">
  div.simple-card {
    @apply cursor-pointer overflow-hidden rounded-md shadow-md;

    &:hover {
      @apply bg-lightGrey shadow-none;
    }

    .image-area {
      @apply relative aspect-21/9 w-full bg-cover bg-center bg-no-repeat;
      background-image: var(--cardImage);
    }
    .container {
      @apply p-4;
    }
  }
</style>
