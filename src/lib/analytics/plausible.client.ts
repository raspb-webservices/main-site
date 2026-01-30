import { PUBLIC_PLAUSIBLE_API_HOST, PUBLIC_PLAUSIBLE_DOMAIN } from '$env/static/public';

// NOTE:
// `@plausible-analytics/tracker@0.4.4` ships `plausible.js` but doesn't define a Node-resolvable
// entrypoint (no `main`/`exports`). Importing `@plausible-analytics/tracker` therefore fails in SSR.
// We import the actual module file directly to keep SvelteKit builds stable.
import type { PlausibleConfig } from '@plausible-analytics/tracker/plausible.js';

type PlausibleModule = typeof import('@plausible-analytics/tracker/plausible.js');

let plausible: PlausibleModule | null = null;
let isInitialized = false;

function buildEndpoint(apiHost: string | undefined): string | undefined {
  if (!apiHost) return undefined;
  // Plausible expects the full event endpoint URL
  return `${apiHost.replace(/\/$/, '')}/api/event`;
}

async function loadPlausible(): Promise<PlausibleModule> {
  if (plausible) return plausible;
  // Important: only works in the browser. This file is meant to be imported client-side only.
  plausible = await import('@plausible-analytics/tracker/plausible.js');
  return plausible;
}

/**
 * Enables or disables Plausible tracking based on consent.
 *
 * We implement opt-in via Plausible's recommended `localStorage.plausible_ignore` flag,
 * which is checked by the tracker on every event.
 */
export async function setPlausibleConsent(allowed: boolean): Promise<void> {
  try {
    if (allowed) {
      window.localStorage.removeItem('plausible_ignore');
      await initPlausibleOnce();
    } else {
      window.localStorage.setItem('plausible_ignore', 'true');
    }
  } catch {
    // localStorage can fail in some privacy modes; in that case we still try to init
    // only when allowed.
    if (allowed) await initPlausibleOnce();
  }
}

export async function initPlausibleOnce(): Promise<void> {
  if (isInitialized) return;

  const domain = PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) {
    if (import.meta.env.DEV) {
      console.warn(
        '[plausible] PUBLIC_PLAUSIBLE_DOMAIN is not set - skipping initialization.'
      );
    }
    return;
  }

  const { init } = await loadPlausible();

  const config: PlausibleConfig = {
    domain,
    endpoint: buildEndpoint(PUBLIC_PLAUSIBLE_API_HOST),

    // Plausible Tracker can auto-track SPA navigation (history.pushState/popstate).
    // This is what we want for SvelteKit.
    autoCapturePageviews: true,

    // Useful defaults
    outboundLinks: true,
    fileDownloads: true,
    formSubmissions: true,

    // In dev we usually want to see requests locally
    captureOnLocalhost: import.meta.env.DEV,
    logging: import.meta.env.DEV
  };

  init(config);
  isInitialized = true;
}
