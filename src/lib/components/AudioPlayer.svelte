<script lang="ts">
	/**
	 * AudioPlayer – Minimaler Audio-Player-Button im raspb-Stil.
	 *
	 * Verwendung:
	 * <AudioPlayer src="/audio/demo.mp3" />
	 * <AudioPlayer src="/audio/intro.mp3" size={44} />
	 */

	type Props = {
		/** Pfad zur Audio-Datei (z.B. aus $lib/assets oder /static) */
		src: string;
		/** Durchmesser des Buttons in Pixel. Standard: 38 */
		size?: number;
		/** Optionaler zusätzlicher CSS-Klassenname */
		class?: string;
	};

	let { src, size = 38, class: className = '' }: Props = $props();

	// Zustände
	let audioEl = $state<HTMLAudioElement | null>(null);
	let isPlaying = $state(false);
	let hasError = $state(false);

	// Abgeleitete Werte
	const ariaLabel = $derived(isPlaying ? 'Audio stoppen' : 'Audio abspielen');
	const isDisabled = $derived(!src || hasError);

	// Native Audio-Events synchronisieren
	$effect(() => {
		if (!audioEl) return;

		const onPlay  = () => { isPlaying = true; };
		const onPause = () => { isPlaying = false; };
		const onEnded = () => { isPlaying = false; };
		const onError = () => { hasError = true; isPlaying = false; };

		audioEl.addEventListener('play',   onPlay);
		audioEl.addEventListener('pause',  onPause);
		audioEl.addEventListener('ended',  onEnded);
		audioEl.addEventListener('error',  onError);

		return () => {
			audioEl?.removeEventListener('play',   onPlay);
			audioEl?.removeEventListener('pause',  onPause);
			audioEl?.removeEventListener('ended',  onEnded);
			audioEl?.removeEventListener('error',  onError);
		};
	});

	// Bei src-Wechsel sauber zurücksetzen
	$effect(() => {
		if (!audioEl || !src) return;
		audioEl.pause();
		audioEl.currentTime = 0;
		audioEl.src = src;
		audioEl.load();
		isPlaying = false;
		hasError = false;
	});

	// Play / Stop toggle
	async function togglePlayback() {
		if (!audioEl || isDisabled) return;
		if (isPlaying) {
			audioEl.pause();
			audioEl.currentTime = 0;
		} else {
			try {
				await audioEl.play();
			} catch {
				hasError = true;
			}
		}
	}
</script>

<!-- Verstecktes Audio-Element -->
<audio bind:this={audioEl} preload="metadata" />

<button
	type="button"
	aria-label={ariaLabel}
	title={ariaLabel}
	disabled={isDisabled}
	onclick={togglePlayback}
	class="audio-player-btn relative grid place-items-center rounded-full
	       border border-white/20 text-white
	       transition-all duration-200 ease-out
	       hover:-translate-y-px active:scale-95
	       disabled:opacity-50 disabled:cursor-not-allowed
	       {className}"
	style="width:{size}px; height:{size}px;"
>
	<!-- Glassmorphism + Gradient-Layer -->
	<span
		class="absolute inset-0 rounded-full
		       bg-gradient-to-br from-violet-600/80 via-pink-500/85 to-purple-500/80
		       backdrop-blur-md"
		aria-hidden="true"
	/>

	{#if isPlaying}
		<!-- Rhythmische Wellen-Animation (Wiedergabe läuft) -->
		<span class="relative z-10 flex items-end gap-[2px] h-[14px]" aria-hidden="true">
			{#each [0, 120, 240, 360] as delay}
				<span class="wave-bar" style="animation-delay: {delay}ms;" />
			{/each}
		</span>
	{:else}
		<!-- Play-Icon -->
		<svg
			viewBox="0 0 24 24"
			fill="none"
			class="relative z-10 drop-shadow"
			width="14"
			height="14"
			aria-hidden="true"
		>
			<path d="M8 6.5v11l9-5.5L8 6.5Z" fill="currentColor" />
		</svg>
	{/if}
</button>

<style>
	/* Glowing box-shadow mit raspb Primärfarbe (color-mix wird von Tailwind nicht nativ unterstützt) */
	.audio-player-btn {
		box-shadow:
			0 4px 16px color-mix(in oklab, #f84b8a 28%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.audio-player-btn:hover:not(:disabled) {
		box-shadow:
			0 6px 22px color-mix(in oklab, #f84b8a 45%, transparent),
			0 0 0 1px color-mix(in oklab, #a855f7 30%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	/* Wellen-Balken: Tailwind via @apply, Animation via CSS */
	.wave-bar {
		@apply w-[3px] rounded-full bg-gradient-to-t from-[#f84b8a] to-[#a855f7];
		height: 4px;
		transform-origin: bottom center;
		animation: wave 0.9s ease-in-out infinite;
	}

	@keyframes wave {
		0%,
		100% {
			transform: scaleY(0.4);
			opacity: 0.6;
		}
		50% {
			transform: scaleY(1.5);
			opacity: 1;
		}
	}
</style>
