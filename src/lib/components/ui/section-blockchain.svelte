<script lang="ts">
  import Pattern from './pattern.svelte';
  let { children, class: className } = $props();
</script>

<section class="w-full py-32 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 relative overflow-hidden {className || ''}">
  <Pattern />
  <div class="inner-container m-auto h-full w-full max-w-6xl px-4 relative z-10">
    <div class="space-y-12">
      {@render children?.()}
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../../../app.css';
</style>
