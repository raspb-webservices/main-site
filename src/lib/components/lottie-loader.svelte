<script lang="ts">
  import { browser } from '$app/environment';
  import LottiePlayer from '$lib/components/lottie-player.svelte';
  import loadingLottie from '$lotties/loading.lottie';
</script>

<div class="w-40">
  {#if browser}<LottiePlayer src={loadingLottie} loop autoplay />{/if}
</div>
