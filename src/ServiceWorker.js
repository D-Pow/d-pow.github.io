// Purpose: Open cache, cache desired files, and confirm success
var CACHE_NAME = 'cache-v1.0.0';
var urlsToCache = [];

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            }).then(self.skipWaiting()) // needed to force new service workers to overwrite old ones
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                // Cache hit - return response
                if (response) {
                    console.log(`Fetched ${response.url}`)
                    return response;
                } else {
                    console.log(`Could not fetch ${event.request.url}`);
                    return fetch(event.request);
                }
            });
        })
    );
});
