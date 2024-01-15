// public/service-worker.js

const CACHE_NAME = 'sensus-cache-data';

const urlsToCache = [
	"/",
	"/index.html",
	"/src/global.scss",
	"/src/styles/**/*.scss", // Шаблон для всех стилей в папке styles
	"/src/assets/**/*.svg",   // Шаблон для всех SVG в папке assets
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
		return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
		return Promise.all(
			cacheNames.map((cacheName) => {
			if (cacheName !== CACHE_NAME) {
				return caches.delete(cacheName);
			}
			})
		);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
		const fetchPromise = fetch(event.request)
			.then((networkResponse) => {
			if (networkResponse.ok) {
				const clone = networkResponse.clone();
				caches.open(CACHE_NAME).then((cache) => {
				cache.put(event.request, clone);
				});
			}
			return networkResponse;
			})
			.catch(() => cachedResponse);

		return cachedResponse || fetchPromise;
		})
	);
});
