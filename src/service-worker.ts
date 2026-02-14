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

// Activate: claim clients first, then clean up old caches.
// This ensures the controllerchange → reload fires before old assets are gone.
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    self.clients
      .claim()
      .then(() => caches.keys())
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
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

  // Stale build assets from a previous deployment: check all caches before 404
  if (url.pathname.startsWith('/_app/immutable/')) {
    event.respondWith(
      (async () => {
        // Try to find the asset in any cache (including old ones not yet cleaned up)
        const cached = await caches.match(event.request);
        if (cached) return cached;
        // Asset is truly gone — notify client to reload with fresh assets
        const clients = await self.clients.matchAll({ type: 'window' });
        for (const client of clients) {
          client.postMessage({ type: 'STALE_ASSETS' });
        }
        return fetch(event.request);
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
