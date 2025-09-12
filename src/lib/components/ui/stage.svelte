<script lang="ts">
  let { children, style = 'basic-gradient' } = $props();
</script>

<section class="{style}">
  {@render children?.()}
</section>

<style lang="postcss">
  @reference '../../../app.css';
  section {
    @apply relative flex flex-col justify-start items-center min-h-80 bg-paleBlue text-white;

    &.basic-gradient {
      background-image: radial-gradient(100% 308.42% at 102.05% 0%, rgb(13, 116, 224) 0%, rgb(160, 61, 206) 36.98%, rgb(18, 29, 51) 100%);
    }
    &.fancy-gradient {
      background-image: radial-gradient(110% 305% at 102% 0%, var(--light-blue) 0%, var(--violet) 32%, var(--pink) 43%, var(--iconic-blue) 100%);
    }
    &.svg-gradient {
      @apply bg-no-repeat bg-cover bg-bottom;
      background-image: url("/images/home-gradient.svg");
    }
  }
</style>
