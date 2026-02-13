/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

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
// NetworkFirst: try server, fall back to cache, then offline page
const navigationHandler = new NetworkFirst({
	cacheName: 'pages',
	networkTimeoutSeconds: 3,
	plugins: [
		new ExpirationPlugin({
			maxEntries: 50,
			maxAgeSeconds: 24 * 60 * 60
		})
	]
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

// --- Static images ---
registerRoute(
	({ url }) =>
		url.pathname.startsWith('/images/') ||
		url.pathname.startsWith('/tour/') ||
		url.pathname.startsWith('/screenshots/'),
	new CacheFirst({
		cacheName: 'static-images',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60
			})
		]
	})
);

// --- Lottie animations ---
registerRoute(
	({ url }) => url.pathname.startsWith('/lotties/'),
	new CacheFirst({
		cacheName: 'lotties',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 20,
				maxAgeSeconds: 30 * 24 * 60 * 60
			})
		]
	})
);

// --- Google Fonts ---
registerRoute(
	({ url }) =>
		url.origin === 'https://fonts.gstatic.com' || url.origin === 'https://fonts.googleapis.com',
	new CacheFirst({
		cacheName: 'google-fonts',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 10,
				maxAgeSeconds: 365 * 24 * 60 * 60
			})
		]
	})
);
