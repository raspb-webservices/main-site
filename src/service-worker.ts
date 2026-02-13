/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

// Precache all build assets (/_app/immutable/**, prerendered pages, etc.)
// __WB_MANIFEST is replaced at build time by @vite-pwa/sveltekit
precacheAndRoute(self.__WB_MANIFEST);

// Remove old precache entries from previous SW versions
cleanupOutdatedCaches();

// Activate new SW immediately, take control of all tabs
self.skipWaiting();
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

// --- Navigation requests (HTML pages) ---
// NetworkFirst: always try server for fresh HTML, fall back to cache, then offline page
const navigationHandler = new NetworkFirst({
	cacheName: 'pages',
	networkTimeoutSeconds: 3
});

registerRoute(
	new NavigationRoute(
		{
			handle: async (params) => {
				try {
					return await navigationHandler.handle(params);
				} catch {
					const offlineResponse = await caches.match('/offline');
					if (offlineResponse) return offlineResponse;
					return new Response('Offline', {
						status: 503,
						headers: { 'Content-Type': 'text/html' }
					});
				}
			}
		},
		{
			denylist: [/^\/api\//, /^\/__/, /^\/\.netlify\//]
		}
	)
);
