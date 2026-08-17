const CACHE_NAME = 'aquaway-v5';
const ASSETS = [
  './',
  'index.html',
  'assets/css/styles.css?v=3',
  'assets/css/ai-agent.css?v=3',
  'assets/js/main.js?v=3',
  'assets/js/translations.js?v=3',
  'assets/js/trips-data.js',
  'assets/js/explorer-map.js?v=3',
  'assets/js/ai-agent.js?v=3',
  'assets/js/effects.js?v=3',
  'assets/js/audio.js?v=3',
  'assets/js/social-proof.js?v=3',
  'assets/js/cinematic-intro.js?v=1',
  'assets/images/logo.webp',
  'assets/images/gallery-1.webp',
  'manifest.json?v=3'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => {}))
      );
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }
  e.respondWith(
    fetch(e.request).then(response => {
      if (response && response.status === 200 && response.type === 'basic') {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, responseToCache);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(e.request);
    })
  );
});
