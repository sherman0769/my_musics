// sw.js - 服務工作線程 (Service Worker)
// 這是使手機瀏覽器支援 PWA (可安裝成手機 App) 的核心檔案

const CACHE_NAME = 'glimmer-boundaries-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './albumData.js',
  './app.js',
  './manifest.json',
  './assets/images/singer_3.jpg',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png'
];

// 安裝事件：快取靜態資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// 啟用事件：清理舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 攔截請求事件 (PWA 要求必須有此事件以啟用可安裝提示)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // 返回快取資源，同時在背景更新快取 (Stale-While-Revalidate 策略)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => { /* 忽略離線時的背景更新錯誤 */ });
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
