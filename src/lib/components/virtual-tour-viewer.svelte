<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import '@photo-sphere-viewer/core/index.css';
  import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
  import type { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin';

  export let nodes: VirtualTourNode[] = [];
  export let startNodeId: string | undefined = undefined;

  let container: HTMLDivElement;
  let viewer: any;

  onMount(async () => {
    if (!browser) return;

    const [{ Viewer }, { VirtualTourPlugin }] = await Promise.all([
      import('@photo-sphere-viewer/core'),
      import('@photo-sphere-viewer/virtual-tour-plugin'),
    ]);

    viewer = new Viewer({
      container,
      defaultZoomLvl: 1,
      plugins: [
        VirtualTourPlugin.withConfig({
          nodes,
          startNodeId: startNodeId ?? nodes?.[0]?.id,
        }),
      ],
    });
  });

  onDestroy(() => {
    viewer?.destroy?.();
    viewer = null;
  });
</script>

<div class="psv-container" bind:this={container}></div>

<style lang="postcss">
  @reference '../../app.css';
  .psv-container {
    @apply w-full h-[calc(100vh-200px)] overflow-hidden rounded-2xl;
  }
</style>
