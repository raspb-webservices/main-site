<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { onMount } from 'svelte';

  let countdown = $state(30);

  onMount(() => {
    const timer = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <title>{m.offline_title()}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="shell">
  <div class="atmosphere" aria-hidden="true"></div>

  <div class="content">
    <div class="status-pill" aria-hidden="true">
      <span class="status-dot"></span>
      <span class="status-text">OFFLINE</span>
    </div>

    <figure class="illustration" aria-hidden="true">
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Searching rings — rotating/pulsing via CSS -->
        <circle
          class="ring r3"
          cx="80" cy="80" r="68"
          stroke="#f33199" stroke-width="1.5"
          stroke-dasharray="52 90" opacity="0.18"
        />
        <circle
          class="ring r2"
          cx="80" cy="80" r="50"
          stroke="#f33199" stroke-width="2"
          stroke-dasharray="88 66" opacity="0.4"
        />
        <circle
          class="ring r1"
          cx="80" cy="80" r="32"
          stroke="#f33199" stroke-width="2.5"
          stroke-dasharray="120 82" opacity="0.75"
        />

        <!-- Center pulse ring -->
        <circle class="pulse-ring" cx="80" cy="80" r="12" stroke="#f33199" stroke-width="1.5" fill="none" opacity="0.6"/>
        <!-- Center dot -->
        <circle cx="80" cy="80" r="5.5" fill="#f33199"/>

        <!-- Disconnection badge -->
        <circle cx="116" cy="42" r="13" fill="rgba(20,0,10,0.6)" stroke="rgba(239,68,68,0.25)" stroke-width="1.5"/>
        <line x1="109" y1="35" x2="123" y2="49" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="123" y1="35" x2="109" y2="49" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </figure>

    <div class="copy">
      <h1>{m.offline_heading()}</h1>
      <p>{m.offline_description()}</p>
    </div>

    <button class="retry" onclick={() => window.location.reload()}>
      <svg class="icon-refresh" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
      </svg>
      {m.offline_retry()}
      <span class="badge" aria-live="polite" aria-label="{countdown}s">{countdown}</span>
    </button>
  </div>
</section>

<style lang="postcss">
  @reference '../../app.css';

  .shell {
    min-height: 60dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    position: relative;
    overflow: hidden;
  }

  /* Radial glow — purely decorative, matches brand color */
  .atmosphere {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 55% 65% at 50% 45%,
      rgba(243, 49, 153, 0.06) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.75rem;
    max-width: 420px;
  }

  /* ── Status pill ── */
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.85rem;
    border-radius: 9999px;
    border: 1px solid color-mix(in srgb, var(--color-base-content) 10%, transparent);
    background: color-mix(in srgb, var(--color-base-content) 4%, transparent);
    backdrop-filter: blur(6px);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ef4444;
    animation: pulse-dot 2.2s ease-out infinite;
  }

  @keyframes pulse-dot {
    0%   { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
    70%  { box-shadow: 0 0 0 7px rgba(239, 68, 68, 0); }
    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }

  .status-text {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: color-mix(in srgb, var(--color-base-content) 45%, transparent);
    font-family: ui-monospace, 'SFMono-Regular', monospace;
  }

  /* ── Radar SVG ── */
  .illustration {
    margin: 0;
    width: 160px;
    height: 160px;
    animation: float 5s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-7px); }
  }

  /* Spinning rings at different speeds */
  .ring { transform-origin: 80px 80px; }

  .r3 { animation: spin 18s linear infinite reverse; }
  .r2 { animation: spin 12s linear infinite; }
  .r1 { animation: spin 8s linear infinite reverse; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Center pulse ring breathes outward */
  .pulse-ring {
    transform-origin: 80px 80px;
    animation: breathe 2.8s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1);    opacity: 0.6; }
    50%       { transform: scale(1.4); opacity: 0;   }
  }

  /* ── Copy ── */
  .copy {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .copy h1 {
    font-size: clamp(1.6rem, 3.5vw, 2.25rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.025em;
    margin: 0;
  }

  .copy p {
    font-size: 0.975rem;
    line-height: 1.65;
    opacity: 0.55;
    margin: 0;
    max-width: 34ch;
  }

  /* ── Retry button ── */
  .retry {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    border: none;
    background: var(--color-primary, #f33199);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    box-shadow: 0 4px 20px rgba(243, 49, 153, 0.28);
  }

  .retry:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(243, 49, 153, 0.4);
    background: color-mix(in srgb, var(--color-primary, #f33199) 88%, #000);
  }

  .retry:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(243, 49, 153, 0.25);
  }

  .icon-refresh {
    flex-shrink: 0;
    opacity: 0.9;
  }

  .retry:hover .icon-refresh {
    animation: spin-once 0.5s ease;
  }

  @keyframes spin-once {
    to { transform: rotate(360deg); }
  }

  /* Countdown badge inside the button */
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.75rem;
    height: 1.4rem;
    padding: 0 0.3rem;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.22);
    font-size: 0.72rem;
    font-weight: 700;
    font-family: ui-monospace, 'SFMono-Regular', monospace;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0;
  }
</style>
