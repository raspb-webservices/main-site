<script lang="ts">
  let { children, style = 'basic-gradient', animate = false } = $props();
</script>

<section class="{style}" class:animate={animate}>
  {@render children()}
</section>

<style lang="postcss">
  @reference '../../../app.css';
  section {
    @apply min-h-80 flex flex-col justify-start items-center bg-primary text-white;
    position: relative;
    &.basic-gradient {
      background-image: radial-gradient(100% 308.42% at 102.05% 0%, rgb(13, 116, 224) 0%, rgb(160, 61, 206) 36.98%, rgb(18, 29, 51) 100%);
    }
    &.fancy-gradient {
      background-image: radial-gradient(110% 305% at 102% 0%, var(--light-blue) 0%, var(--violet) 32%, var(--pink) 43%, var(--iconic-blue) 100%);
      &.animate {
        animation: gradientMove 120s ease-in-out infinite alternate;
      }
    }
    &.svg-gradient {
      @apply bg-no-repeat bg-cover bg-bottom;
      background-image: url("/images/home-gradient.svg");
    }
  }

  @keyframes gradientMove {
    0% {
      transform: translateX(0) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-10%);
    }
    100% {
      transform: translateX(0) translateY(0);
    }
  }
</style>
