const cacheName = 'simple-text-editor-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('simple-text-editor-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/stylesheet.css',
                '/index.js',
            ]);
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(storedCacheName => {
                    if (storedCacheName !== cacheName) {
                        return caches.delete(storedCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request).catch(() => {
                if (e.request.mode === 'navigate') {
                    return caches.match('./offline.html'); // Fallback for navigation requests
                }
            });
        })
    );
});
