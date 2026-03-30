<script lang="ts">
  type Props = {
    imageSrc: string;
    videoSrc: string;
    class?: string;
  };

  let { imageSrc, videoSrc, class: className = 'h-36 w-36' }: Props = $props();

  // Eindeutige ID damit mehrere Instanzen sich nicht den path-Anchor teilen
  const uid = Math.random().toString(36).slice(2, 8);

  let videoEl = $state<HTMLVideoElement | null>(null);
  let isPlaying = $state(false);
  let hasError = $state(false);

  const isDisabled = $derived(!videoSrc || hasError);

  $effect(() => {
    if (!videoEl) return;

    const onEnded = () => { isPlaying = false; };
    const onError = () => { hasError = true; isPlaying = false; };

    videoEl.addEventListener('ended', onEnded);
    videoEl.addEventListener('error', onError);

    return () => {
      videoEl?.removeEventListener('ended', onEnded);
      videoEl?.removeEventListener('error', onError);
    };
  });

  async function toggle() {
    if (!videoEl || isDisabled) return;
    if (isPlaying) {
      videoEl.pause();
      videoEl.currentTime = 0;
      isPlaying = false;
    } else {
      try {
        await videoEl.play();
        isPlaying = true;
      } catch {
        hasError = true;
      }
    }
  }
</script>

<!--
  Wrapper ist relativ + inline-block, damit der SVG-Text (außerhalb des Buttons)
  korrekt positioniert werden kann ohne vom overflow-hidden des Buttons geclipt zu werden.
-->
<div class="video-player-wrapper relative inline-block {className}">
  <button
    type="button"
    onclick={toggle}
    disabled={isDisabled}
    aria-label={isPlaying ? 'Video stoppen' : 'Video abspielen'}
    title={isPlaying ? 'Video stoppen' : 'Video abspielen'}
    class="block h-full w-full cursor-pointer overflow-hidden rounded-[inherit]
           border-0 bg-transparent p-0 disabled:cursor-not-allowed"
  >
    <!-- Avatar / Poster -->
    <img
      src={imageSrc}
      alt=""
      aria-hidden="true"
      class="block h-full w-full object-cover transition-opacity duration-500
             {isPlaying ? 'opacity-0' : 'opacity-100'}"
    />
    <!-- Video (immer im DOM für Preload) -->
    <video
      bind:this={videoEl}
      src={videoSrc}
      playsinline
      preload="metadata"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500
             {isPlaying ? 'opacity-100' : 'opacity-0'}"
    >
      <track kind="captions" label="German captions" default />
    </video>

    <!-- Großes Play-Icon on Hover -->
    {#if !isPlaying}
      <span
        class="play-icon pointer-events-none absolute inset-0 flex items-center justify-center
               opacity-0 transition-opacity duration-200"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" width="73" height="73">
          <defs>
            <filter id="play-shadow-{uid}" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,0.30)" />
            </filter>
          </defs>
          <path
            d="M8 6.5v11l9-5.5L8 6.5Z"
            fill="white"
            stroke="white"
            stroke-width="2.5"
            stroke-linejoin="round"
            filter="url(#play-shadow-{uid})"
          />
        </svg>
      </span>
    {/if}
  </button>

  <!-- Gebogener "klick mich!"-Text – CCW ab 5-Uhr-Position -->
  {#if !isPlaying && !isDisabled}
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full"
      style="overflow: visible;"
      viewBox="0 0 100 100"
      aria-hidden="true"
      pointer-events="none"
    >
      <defs>
        <!--
          CCW-Bogen: Start 5 Uhr (81,104) → 1 Uhr (81,−4), r=62
          sweep-flag=0 = gegen den Uhrzeigersinn
          side="right" auf textPath → Text erscheint außen am Bogen
        -->
        <path id="arc-{uid}" d="M 81,104 A 62,62 0 0,0 81,-4" />
      </defs>
      <text
        fill="#121d33"
        font-size="8.5"
        font-weight="700"
        letter-spacing="1.1"
        stroke="white"
        stroke-width="2.75"
        paint-order="stroke fill"
        pointer-events="all"
        role="button"
        tabindex="0"
        onclick={toggle}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
        class="curved-hint cursor-pointer"
      >
        <textPath href="#arc-{uid}" startOffset="10%">klick mich!</textPath>
      </text>
    </svg>
  {/if}
</div>

<style lang="postcss">
  @reference '../../app.css';

  .video-player-wrapper:not(:has(button:disabled)):hover .play-icon {
    opacity: 1;
  }

  .curved-hint {
    transform-box: fill-box;
    transform-origin: center;
    animation: hint-pulse 2.5s ease-in-out infinite;
  }

  @keyframes hint-pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.07); }
  }
</style>
