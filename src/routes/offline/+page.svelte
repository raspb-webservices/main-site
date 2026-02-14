<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.offline_title()}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
  <h1 class="mb-4 text-4xl font-bold">{m.offline_heading()}</h1>
  <p class="mb-8 max-w-md text-lg opacity-70">
    {m.offline_description()}
  </p>
  <button class="btn-basic" onclick={() => window.location.reload()}>{m.offline_retry()}</button>
</div>
