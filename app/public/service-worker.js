const CACHE_NAME = 'sensus-cache-data';

// Установка Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    "/",
                    new Request("../index.html"),
                    new Request("../src/global.scss"),
                    new Request("../src/styles/authForm.scss"),
                    new Request("../src/styles/circle.scss"),
                    new Request("../src/styles/index.scss"),
                    new Request("../src/styles/metric.scss"),
                    new Request("../src/styles/modal.scss"),
                    new Request("../src/assets/arrow.svg"),
                    new Request("../src/assets/export.svg"),
                    new Request("../src/assets/humidity.svg"),
                    new Request("../src/assets/menu.svg"),
                    new Request("../src/assets/pressure.svg"),
                    new Request("../src/assets/wind.svg"),
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
                    .catch(() => cachedResponse); // Возвращаем кэшированные данные в случае ошибки сетевого запроса

                return cachedResponse || fetchPromise;
            })
    );
});
