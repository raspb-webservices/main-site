<script lang="ts">
  let { children, fullWidth = false, customColor = 'white', type = 'default' } = $props();
</script>

{#if type === 'default'}
  <section class="base-section" class:full={fullWidth} style="--backgroundColor:{customColor}">
    <div class="inner-container">
      {@render children()}
    </div>
  </section>
{:else if type === 'centerTeaser'}
  <section class="base-section center-teaser">
    <div class="inner-container">
      {@render children()}
    </div>
  </section>
{/if}

<style lang="postcss">
  @reference '../../app.css';
  section.base-section {
    @apply w-full py-10 bg-base-100;
    /* background-color: var(--backgroundColor); */

    &:not(.full) {
      .inner-container {
        @apply m-auto h-full w-full max-w-7xl px-4;
      }
    }
    &.center-teaser {
      @apply from-secondary/30 via-primary/10 to-secondary/20 bg-gradient-to-br py-36;
    }
  }
</style>
