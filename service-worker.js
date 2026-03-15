// Service Worker for PWA
const CACHE_NAME = 'mahjong-v1';
const urlsToCache = [
  './mobile-firebase.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// インストール時
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// アクティベーション時
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// リクエスト処理
self.addEventListener('fetch', (event) => {
  // Firebaseへのリクエストは常にネットワーク経由
  if (event.request.url.includes('firebase')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // その他はキャッシュファースト
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});
