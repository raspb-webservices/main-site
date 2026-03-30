<script lang="ts">
  /**
   * AudioPlayer – Minimaler Audio-Player-Button im raspb-Stil.
   *
   * Verwendung:
   * <AudioPlayer src="/audio/demo.mp3" />
   * <AudioPlayer src="/audio/intro.mp3" class="w-12 h-12" />
   */

  type Props = {
    /** Pfad zur Audio-Datei (z.B. aus $lib/assets oder /static) */
    src: string;
    /** Optionaler zusätzlicher CSS-Klassenname. Standard: w-10 h-10 */
    class?: string;
  };

  let { src, class: className = 'w-10 h-10' }: Props = $props();

  let audioEl = $state<HTMLAudioElement | null>(null);
  let isPlaying = $state(false);
  let hasError = $state(false);

  const ariaLabel = $derived(isPlaying ? 'Audio stoppen' : 'Audio abspielen');
  const isDisabled = $derived(!src || hasError);

  $effect(() => {
    if (!audioEl) return;

    const onPlay = () => { isPlaying = true; };
    const onPause = () => { isPlaying = false; };
    const onEnded = () => { isPlaying = false; };
    const onError = () => { hasError = true; isPlaying = false; };

    audioEl.addEventListener('play', onPlay);
    audioEl.addEventListener('pause', onPause);
    audioEl.addEventListener('ended', onEnded);
    audioEl.addEventListener('error', onError);

    return () => {
      audioEl?.removeEventListener('play', onPlay);
      audioEl?.removeEventListener('pause', onPause);
      audioEl?.removeEventListener('ended', onEnded);
      audioEl?.removeEventListener('error', onError);
    };
  });

  $effect(() => {
    if (!audioEl || !src) return;
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.src = src;
    audioEl.load();
    isPlaying = false;
    hasError = false;
  });

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

<audio bind:this={audioEl} preload="metadata"></audio>

<button
  type="button"
  aria-label={ariaLabel}
  title={ariaLabel}
  disabled={isDisabled}
  onclick={togglePlayback}
  class="audio-player-btn cursor-pointer relative grid place-items-center rounded-full
         border border-white/20 text-white
         transition-all duration-200 ease-out
         hover:-translate-y-px active:scale-95
         disabled:cursor-not-allowed disabled:opacity-50
         {className}"
>
  <!-- Gradient-Layer – bei Wiedergabe leicht abgedunkelt -->
  <span
    class="absolute inset-0 rounded-full backdrop-blur-md transition-opacity duration-300
           bg-linear-to-br from-[#c9204f]/90 to-[#ffacc8]/75
           {isPlaying ? 'opacity-70' : 'opacity-100'}"
    aria-hidden="true"
  ></span>

  {#if isPlaying}
    <!-- Zufällig wirkende Balken-Animation -->
    <span class="relative z-10 flex h-4 items-end gap-0.5" aria-hidden="true">
      {#each [
        { delay: 0,   dur: 0.55 },
        { delay: 210, dur: 0.80 },
        { delay: 80,  dur: 0.60 },
        { delay: 330, dur: 1.00 },
        { delay: 150, dur: 0.70 },
        { delay: 440, dur: 0.85 },
      ] as bar (bar.delay)}
        <span class="wave-bar" style="animation-delay:{bar.delay}ms; animation-duration:{bar.dur}s;"></span>
      {/each}
    </span>
  {:else}
    <svg viewBox="0 0 24 24" fill="none" class="relative z-10 drop-shadow" width="24" height="24" aria-hidden="true">
      <path d="M8 6.5v11l9-5.5L8 6.5Z" fill="currentColor" />
    </svg>
  {/if}
</button>

<style lang="postcss">
  @reference '../../app.css';

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

  .wave-bar {
    @apply w-0.5 h-2 rounded-full bg-white;
    transform-origin: bottom center;
    animation: wave 0.9s ease-in-out infinite;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.95));
  }

  @keyframes wave {
    0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
    50%       { transform: scaleY(1.5); opacity: 1; }
  }
</style>
