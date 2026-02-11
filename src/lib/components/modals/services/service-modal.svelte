<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { ServiceModalConfig } from '$lib/configs/service-modal-config';

	let { config }: { config: ServiceModalConfig } = $props();
</script>

<dialog id={config.modalId} class="modal">
	<div class="modal-box">
		<h3 class="mb-4 text-lg font-bold">{(m as unknown as Record<string, () => string>)[config.titleKey]()}</h3>
		<div class="space-y-4">
			<p><strong>{(m as unknown as Record<string, () => string>)[config.perfectForKey]()}</strong> {(m as unknown as Record<string, () => string>)[config.perfectForDescriptionKey]()}</p>

			{#if config.paragraphKeys}
				{#each config.paragraphKeys as key}
					<p>{(m as unknown as Record<string, () => string>)[key]()}</p>
				{/each}
			{/if}

			{#each config.sections as section}
				<div>
					<h4 class="mb-2 font-semibold">{(m as unknown as Record<string, () => string>)[section.titleKey]()}</h4>
					<ul class="list-inside list-disc space-y-1">
						{#each section.itemKeys as itemKey}
							<li>{(m as unknown as Record<string, () => string>)[itemKey]()}</li>
						{/each}
					</ul>
				</div>
			{/each}

			<div class="bg-base-200 rounded-lg p-4">
				{#each config.infoBox as entry}
					<p class="text-sm"><strong>{(m as unknown as Record<string, () => string>)[entry.labelKey]()}</strong> {(m as unknown as Record<string, () => string>)[entry.valueKey]()}</p>
				{/each}
			</div>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">{(m as unknown as Record<string, () => string>)[config.closeButtonKey]()}</button>
			</form>
		</div>
	</div>
</dialog>

<style lang="postcss">
	@reference '../../../../app.css';
	.modal-box {
		@apply max-w-2xl;
	}
</style>
