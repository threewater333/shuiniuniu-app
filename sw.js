var CACHE_NAME = 'shuinium-workbench-v1';
var ASSETS = [
  './reading-writing-workbench.html',
  './assets/app.js',
  './assets/icon-192.svg',
  './manifest.json',
  './_shared/fonts/InstrumentSans-Regular.ttf',
  './_shared/fonts/InstrumentSans-Bold.ttf',
  './_shared/fonts/GeistMono-Regular.ttf',
  './_shared/css/leaflet.min.css',
  './_shared/js/leaflet.min.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (n) { return n !== CACHE_NAME; })
          .map(function (n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function () {
        // Offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./reading-writing-workbench.html');
        }
      });
    })
  );
});
