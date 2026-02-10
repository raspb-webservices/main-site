<svelte:head>
	<title>Offline | raspb Webservices</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
	<h1 class="mb-4 text-4xl font-bold">Du bist offline</h1>
	<p class="mb-2 max-w-md text-lg opacity-70">
		Es besteht aktuell keine Internetverbindung. Bitte prüfe deine Verbindung und versuche es
		erneut.
	</p>
	<p class="mb-8 max-w-md text-sm opacity-50">
		You appear to be offline. Please check your connection and try again.
	</p>
	<button class="btn-basic" onclick={() => window.location.reload()}>Erneut versuchen / Retry</button
	>
</div>
