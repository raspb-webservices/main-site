<script lang="ts">
  import VisualElement from './visual-element.svelte';
  let { children, className = '' } = $props();
</script>

<section class="w-full py-32 bg-base-100 relative {className}">
  <div class="inner-container m-auto h-full w-full max-w-7xl px-4">
    <div class="flex flex-col lg:flex-row items-center gap-16">
      <div class="flex-1 space-y-8">
        <VisualElement />
      </div>
      <div class="flex-1 space-y-8 text-center lg:text-left">
        {@render children?.()}
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../../../app.css';
</style>
