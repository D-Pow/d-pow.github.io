var CACHE_NAME="cache-1.0.34",urlsToCache=["./static/assets/fonts/BrushScript.eot","./static/assets/fonts/BrushScript.woff","./static/assets/fonts/BrushScript.ttf","./static/assets/pdf-icon.a3187e88.svg","./static/assets/anime_atsume.ad7057af.jpg","./static/assets/atoms_of_confusion.77b9db51.jpg","./static/assets/automatic_investing.bd799aa7.jpg","./static/assets/blue_horizon.08a3abd3.svg","./static/assets/blue_mountains.949bbfea.svg","./static/assets/edge_panel_widget.42a86bb7.png","./static/assets/etrade_icon.0669c052.png","./favicon-144.png","./favicon-192.png","./favicon.ico","./favicon.png","./static/assets/github_logo.07c94e10.svg","./static/assets/home_depot.5e3e61a5.svg","./static/assets/home_depot_pos.60f3db62.png","./static/assets/linkedin_logo.4ed775be.svg","./static/assets/mock_requests.4891af63.png","./static/assets/nextdoor_feed_sample.f0e636db.png","./static/assets/nextdoor_icon.26ce71fb.svg","./static/assets/night_forest.61beb17b.svg","./static/assets/peptide_nmr.6446f86e.jpg","./static/assets/prebuilt_portfolios.9fd433e2.jpg","./static/assets/premarket_modal.0138e147.png","./static/assets/profile_pic.e1dd2c7f.jpg","./static/assets/react_logo.103b5fa1.svg","./static/assets/tardigrade.3f66523a.jpg","./package.json","./manifest.json","./index.html","./static/js/client.0d7ba70b.bundle.js","./static/js/common.4dd04b26.bundle.js","./static/js/runtime.6b281f72.bundle.js","./static/js/Home.936913bf.chunk.js","./static/js/About.49c4e94d.chunk.js","./static/js/Header.c422538b.chunk.js","./static/js/Footer.ab28479d.chunk.js","./static/js/23.ad7c6e52.chunk.js","./static/js/78.5b41d00f.chunk.js","./static/js/624.698885d9.chunk.js","./static/js/878.53f0009a.chunk.js","./static/js/99.3a18a688.chunk.js","./static/js/778.a30ac124.chunk.js","./static/js/842.d5a62525.chunk.js","./static/js/267.38291b71.chunk.js","./static/js/954.b112c3e8.chunk.js","./static/js/235.3930b316.chunk.js","./static/js/657.87ea5374.chunk.js","./static/js/206.21a4bcce.chunk.js","./static/js/560.39212d40.chunk.js","./static/js/736.f527dbb6.chunk.js","./static/js/767.67d30011.chunk.js","./static/js/768.9c4f4b9b.chunk.js","./static/js/436.5c9610aa.chunk.js","./static/js/686.d1df0041.chunk.js","./static/js/306.f4f69624.chunk.js","./static/js/246.1a2cfe62.chunk.js","./static/js/323.f43a4acd.chunk.js","./static/js/36.32e79c86.chunk.js","./static/js/717.6f9229cd.chunk.js","./static/js/284.fa54e4c7.chunk.js","./static/js/786.244e3197.chunk.js","./static/js/300.07440d70.chunk.js","./static/js/823.601363e3.chunk.js","./static/js/411.633d8599.chunk.js","./static/js/588.27f576a0.chunk.js","./static/css/styles.3a8250b7.css","./static/js/vendor-d2eb5610.25ae3848.bundle.js","./static/js/vendor-27545368.550c595e.bundle.js","./static/js/vendor-2594363e.fcf617e5.bundle.js","./static/js/vendor-e5bca7e4.88b59313.bundle.js","./static/js/vendor-002458cc.955d2f5a.bundle.js","./"],urlsNotToCache=[],BROADCAST_CHANNEL="d-pow.github.io",UPDATE_BROADCAST="UPDATE";function removeOldCaches(){return caches.keys().then((function(e){return Promise.all(e.filter((function(e){return e!==CACHE_NAME})).map((function(e){return console.log("Outdated cache",e,"will be removed"),caches.delete(e)})))}))}function clearCache(e,t){function n(e){return e.keys().then((function(n){return Promise.all(n.filter((function(e){return!t.includes(e.url)})).map((function(t){return e.delete(t)})))}))}return"string"==typeof t?t=[t]:null==t&&(t=[]),null==e?caches.open(CACHE_NAME).then(n):n(e)}function fetchAndCache(e,t){return fetch(e.request).then((function(n){return t.put(e.request,n.clone()).catch((function(t){console.log("Could not cache url:",e.request.url,"Failed with error:",t)})),n})).catch((function(t){console.log("Could not fetch url:",e.request.url,"Failed with fetch error:",t)}))}function postMessageToClient(e){try{new BroadcastChannel(BROADCAST_CHANNEL).postMessage(e)}catch(e){}}self.addEventListener("install",(function(e){e.waitUntil(caches.open(CACHE_NAME).then((function(e){return console.log("Opened cache"),e.addAll(urlsToCache)})).then(removeOldCaches).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){e.waitUntil(removeOldCaches())})),self.addEventListener("fetch",(e=>{e.respondWith(caches.open(CACHE_NAME).then((function(t){return t.match(e.request).then((function(n){var c=e.request.url,o=c.split("/").pop(),r=("/"===c[c.length-1]||"index.html"===o||new URL(location.href).origin===c)&&new URL(c).pathname.split("/").length<=2;Boolean(o.match(/\.\w{2,6}$/))&&e.request.method,urlsNotToCache.some((function(e){return e===c||e&&e.test&&e.test(c)}));if(n){if(r){var l=fetchAndCache(e,t),u=l.then((function(e){return e.text()})),i=n.clone().text();Promise.all([u,i]).then((function(n){n[0]!==n[1]&&clearCache(t,c).then((function(){return t.put(e.request,l.clone()).catch((function(t){console.log("Could not cache url:",e.request.url,"Failed with error:",t)}))})).then((function(){setTimeout((function(){postMessageToClient(UPDATE_BROADCAST)}),5e3),console.log("New website version is available, deleting old cache content")}))}))}return n}return r?fetchAndCache(e,t):fetch(e.request)}))})))}));