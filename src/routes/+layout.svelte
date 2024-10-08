<script>
  import HEADER from "$lib/components/header.svelte";
  import FOOTER from "$lib/components/footer.svelte";
	import '../app.css';
</script>

<div class="wrapper">
  <HEADER />
  <slot />
  <FOOTER />
</div>

