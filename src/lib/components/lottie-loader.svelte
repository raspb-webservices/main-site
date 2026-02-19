<script lang="ts">
  import { browser } from '$app/environment';
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
  import loadingLottie from '$lotties/loading.lottie';
</script>

<div class="w-40">
  {#if browser}<DotLottieSvelte src={loadingLottie} loop autoplay />{/if}
</div>
