const CACHE_NAME = 'sea-battle-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/src/js/app.js',
  '/src/js/game.js',
  '/src/js/bot.js',
  '/src/js/player.js',
  '/src/js/board.js',
  '/src/js/ship.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Установка сервис-воркера и кэширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Активация сервис-воркера и очистка старого кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов и возврат данных из кэша
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});