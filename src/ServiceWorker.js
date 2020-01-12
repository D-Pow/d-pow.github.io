var CACHE_NAME = 'cache-v1.0.0';
var urlsToCache = []; // filenames change in each build (via appended filename hashes), so they can't be predicted here

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
                var url = event.request.url;

                if (response) {
                    // Cache hit - return response served from ServiceWorker
                    return response;
                } else {
                    // Not cached - fetch it and then store for future network requests
                    return fetch(event.request).then(function(fetchResponse) {
                        var isIndexHtml = url[url.length-1] === '/' || url.split('/').pop() === 'index.html';

                        if (!isIndexHtml) {
                            /**
                             * TODO index.html/root files should be cached in a cache-then-network fashion
                             * Since index.html is required for the page to load (obviously), it
                             * should be cached for offline usage. However, if index.html changes,
                             * only returning the cached result will never show the new version to
                             * users. Thus, this should be updated to return the cached version first
                             * and then make a network request for the new index.html and update its
                             * cache with the new version. This has the result of showing the old page
                             * version first and then, on new page refresh, showing the new version.
                             *
                             * Note that this will only be required for index.html and other root-level
                             * files (as declared in webpack.config.js -> CopyWebpackPlugin) because they
                             * aren't built by webpack so they don't have a hash inserted into their filename.
                             * Everything else will be handled correctly because if the hash is different,
                             * then it's not in the cache, so it will be requested as normal.
                             *
                             * TODO clear old cache content of hashed files when new version available
                             * So as to not take up infinite storage space on the user's device
                             */
                            cache.put(event.request, fetchResponse.clone()).catch(function(fetchError) {
                                console.log('Could not cache url:', url, 'Failed with error:', fetchError);
                            });
                        }

                        return fetchResponse;
                    }).catch(function(fetchError) {
                        console.log('Could not fetch url:', url, 'Failed with fetch error:', fetchError);
                    });
                }
            });
        })
    );
});
