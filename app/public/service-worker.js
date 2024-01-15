const CACHE_NAME = 'sensus-cache-data';

// Установка Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    "/",
                    "../index.html",
                    "../src/global.scss",
                    "../src/styles/authForm.scss",
                    "../src/styles/circle.scss",
                    "../src/styles/index.scss",
                    "../src/styles/metric.scss",
                    "../src/styles/modal.scss",
                    "../src/assets/arrow.svg",
                    "../src/assets/export.svg",
                    "../src/assets/humidity.svg",
                    "../src/assets/menu.svg",
                    "../src/assets/pressure.svg",
                    "../src/assets/wind.svg",
                ]);
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
            .then((cachedResponse) => {
                const fetchPromise = fetch(event.request)
                    .then((networkResponse) => {
                        // Если сетевой запрос успешен, обновляем кэш новыми данными
                        if (networkResponse.ok) {
                            const clone = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, clone);
                            });
                        }
                        return networkResponse;
                    })
                    // Возвращаем кэшированные данные в случае ошибки сетевого запроса
                    .catch(() => cachedResponse);

                return cachedResponse || fetchPromise;
            })
    );
});