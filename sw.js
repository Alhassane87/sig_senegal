const CACHE_NAME = 'sig-senegal-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/leaflet.css',
  '/css/qgis2web.css',
  '/js/leaflet.js',
  '/images/search-icon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((res) => {
        // Clone and store in cache for offline
        return caches.open(CACHE_NAME).then((cache) => {
          try {
            cache.put(event.request, res.clone());
          } catch (e) {
            // Some requests can't be cached
          }
          return res;
        });
      }).catch(() => {
        // If request fails (offline), try to return the cached index.html for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});