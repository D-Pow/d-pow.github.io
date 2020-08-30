var CACHE_NAME="cache-1.0.0",urlsToCache=["./static/assets/anime_atsume-0ba784fb.jpg","./static/assets/atoms_of_confusion-e8687e83.jpg","./static/assets/automatic_investing-184b6ab9.jpg","./static/assets/blue_horizon-bbe8cc7a.svg","./static/assets/blue_mountains-d932326b.svg","./static/assets/edge_panel_widget-779182c5.png","./static/assets/etrade_icon-749099b8.png","./favicon-144.png","./favicon-192.png","./favicon.ico","./favicon.png","./static/assets/github_logo-09d4601d.svg","./static/assets/linkedin_logo-4e1d56fc.svg","./static/assets/mock_requests-b7618045.png","./static/assets/night_forest-66a3adf9.svg","./static/assets/peptide_nmr-abaed7b3.jpg","./static/assets/prebuilt_portfolios-42397bac.jpg","./static/assets/premarket_modal-93bc1cbf.png","./static/assets/profile_pic-1c0508dd.jpg","./static/assets/react_logo-5d5d9eef.svg","./static/assets/tardigrade-813e2df1.jpg","./static/js/vendor.529aa43e.chunk.js","./static/css/styles.6b12ce10.css","./static/js/styles.529aa43e.chunk.js","./static/js/About.529aa43e.chunk.js","./static/js/Footer.529aa43e.chunk.js","./static/js/Header.529aa43e.chunk.js","./static/js/Home.529aa43e.chunk.js","./static/js/client.529aa43e.bundle.js","./static/js/7.529aa43e.chunk.js","./static/js/8.529aa43e.chunk.js","./static/js/9.529aa43e.chunk.js","./static/js/10.529aa43e.chunk.js","./static/js/11.529aa43e.chunk.js","./static/js/12.529aa43e.chunk.js","./static/js/13.529aa43e.chunk.js","./static/js/14.529aa43e.chunk.js","./static/js/15.529aa43e.chunk.js","./static/js/16.529aa43e.chunk.js","./static/js/17.529aa43e.chunk.js","./static/js/18.529aa43e.chunk.js","./static/js/19.529aa43e.chunk.js","./static/js/20.529aa43e.chunk.js","./static/js/21.529aa43e.chunk.js","./static/js/22.529aa43e.chunk.js","./static/js/23.529aa43e.chunk.js","./static/js/24.529aa43e.chunk.js","./static/js/25.529aa43e.chunk.js","./static/js/26.529aa43e.chunk.js","./static/js/27.529aa43e.chunk.js","./static/js/28.529aa43e.chunk.js","./static/js/29.529aa43e.chunk.js","./static/js/30.529aa43e.chunk.js","./manifest.json","./static/js/vendor.529aa43e.chunk.js.LICENSE.txt","./index.html","./"],BROADCAST_CHANNEL="d-pow.github.io",UPDATE_BROADCAST="UPDATE";function removeOldCaches(){return caches.keys().then((function(e){return Promise.all(e.filter((function(e){return e!==CACHE_NAME})).map((function(e){return console.log("Outdated cache",e,"will be removed"),caches.delete(e)})))}))}function clearCache(e,t){function n(e){return e.keys().then((function(n){return Promise.all(n.filter((function(e){return!t.includes(e.url)})).map((function(t){return e.delete(t)})))}))}return"string"==typeof t?t=[t]:null==t&&(t=[]),null==e?caches.open(CACHE_NAME).then(n):n(e)}function fetchAndCache(e,t){return fetch(e.request).then((function(n){return t.put(e.request,n.clone()).catch((function(t){console.log("Could not cache url:",e.request.url,"Failed with error:",t)})),n})).catch((function(t){console.log("Could not fetch url:",e.request.url,"Failed with fetch error:",t)}))}function postMessageToClient(e){try{new BroadcastChannel(BROADCAST_CHANNEL).postMessage(e)}catch(e){}}self.addEventListener("install",(function(e){e.waitUntil(caches.open(CACHE_NAME).then((function(e){return console.log("Opened cache"),e.addAll(urlsToCache)})).then(removeOldCaches).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){e.waitUntil(removeOldCaches())})),self.addEventListener("fetch",e=>{e.respondWith(caches.open(CACHE_NAME).then((function(t){return t.match(e.request).then((function(n){var c=e.request.url,r="/"===c[c.length-1]||"index.html"===c.split("/").pop();if(n){if(r){const r=fetchAndCache(e,t).then((function(e){return e.text()})),o=n.clone().text();Promise.all([r,o]).then((function(e){e[0]!==e[1]&&setTimeout((function(){postMessageToClient(UPDATE_BROADCAST),clearCache(t,c),console.log("New website version is available, deleting old cache content")}),5e3)}))}return n}return fetchAndCache(e,t)}))})))});