<script lang="ts">
  let { children, customColor = 'white', class: className } = $props();
</script>

<section class="w-full py-24 bg-base-50 relative {className || ''}" style="--backgroundColor:{customColor}">
  <div class="inner-container m-auto h-full w-full max-w-4xl px-4 text-center">
    <div class="space-y-8">
      {@render children?.()}
    </div>
  </div>
</section>

<style lang="postcss">
  @reference '../../../app.css';
</style>
