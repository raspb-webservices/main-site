<script lang="ts">
  import { DotLottie } from '@lottiefiles/dotlottie-web';
  import { onMount } from 'svelte';

  interface Props {
    src: string;
    loop?: boolean;
    autoplay?: boolean;
  }

  let { src, loop = false, autoplay = false }: Props = $props();

  let canvas: HTMLCanvasElement;
  let dotLottie: DotLottie | undefined;
  let ready = $state(false);

  onMount(() => {
    console.log('[LottiePlayer] onMount', { src, loop, autoplay });

    if (!src) {
      console.warn('[LottiePlayer] src is empty or undefined – animation will not load');
      return;
    }

    try {
      dotLottie = new DotLottie({ canvas, src, loop, autoplay });

      dotLottie.addEventListener('load', () => {
        console.log('[LottiePlayer] ✓ loaded:', src);
      });

      dotLottie.addEventListener('ready', () => {
        console.log('[LottiePlayer] ready – first frame rendered:', src);
        ready = true;
      });

      dotLottie.addEventListener('loadError', (e) => {
        console.error('[LottiePlayer] ✗ loadError:', src, e);
      });

      dotLottie.addEventListener('renderError', (e) => {
        console.error('[LottiePlayer] ✗ renderError:', src, e);
      });
    } catch (err) {
      console.error('[LottiePlayer] constructor threw:', src, err);
    }

    return () => {
      dotLottie?.destroy();
    };
  });
</script>

<div>
  <canvas bind:this={canvas} class:ready></canvas>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  canvas.ready {
    opacity: 1;
  }
</style>
