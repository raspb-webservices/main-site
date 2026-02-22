/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { build, prerendered, version } from '$service-worker';

const CACHE_NAME = `cache-${version}`;

// Cache build assets (immutable CSS/JS) + prerendered pages
// Skip static files to avoid caching large tour images etc.
const ASSETS = [...build, ...prerendered];

// Install: cache all assets for this version, activate immediately
self.addEventListener('install', (event: ExtendableEvent) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Activate: claim clients, notify them to reload (belt & suspenders alongside
// controllerchange), then delete old caches. Notifying BEFORE deleting ensures
// that the app.html SW listener receives SW_UPDATED even if old caches are gone.
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      // Take control of all open tabs immediately
      await self.clients.claim();
      // Explicitly notify all window clients to reload (belt & suspenders
      // alongside the controllerchange event caught in app.html)
      const allClients = await self.clients.matchAll({ type: 'window' });
      for (const client of allClients) {
        client.postMessage({ type: 'SW_UPDATED' });
      }
      // Now delete old version caches — clients are already reloading
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    })()
  );
});

// Fetch handler
self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip API, Netlify, and internal routes
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/__') || url.pathname.startsWith('/.netlify/')) return;

  // Immutable build assets (/_app/immutable/*): cache-first (safe, content-hashed)
  if (ASSETS.includes(url.pathname)) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
    return;
  }

  // Stale build assets from a previous deployment: check all caches before giving up.
  // If the asset is truly gone (new deployment replaced old hashes), notify clients
  // to reload and return a 503 — a 404 for a JS chunk would crash SvelteKit hard,
  // whereas a 503 is less destructive while the reload is in flight.
  if (url.pathname.startsWith('/_app/immutable/')) {
    event.respondWith(
      (async () => {
        // Search across ALL caches (new + any remaining old ones)
        const cached = await caches.match(event.request);
        if (cached) return cached;
        // Asset is truly gone from all caches — trigger immediate client reload
        const clients = await self.clients.matchAll({ type: 'window' });
        for (const client of clients) {
          client.postMessage({ type: 'STALE_ASSETS' });
        }
        // Return 503 instead of letting a 404 propagate — the reload is already
        // in flight via the STALE_ASSETS message handled in app.html
        return new Response('Service Unavailable – reloading with updated assets', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      })()
    );
    return;
  }

  // Navigation requests (HTML): network-first with offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(event.request);
        } catch {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const offline = await caches.match('/offline');
          if (offline) return offline;
          return new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/html' }
          });
        }
      })()
    );
    return;
  }
});
