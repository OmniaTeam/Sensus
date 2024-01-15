const CACHE_NAME = 'sensus-cache-data';

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
					"/",
					"../index.html",
					"../src/global.scss",
					"../src/styles/**/*.scss",
					"../src/assets/**/*.svg",
                ]);
            })
            .catch(error => {
                console.error('Failed to cache resources:', error);
            })
    );
});

// Активация Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
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

// Получение запросов и возврат кэшированных данных, если такие есть, иначе выполнение сетевого запроса
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});