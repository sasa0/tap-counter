const CACHE = 'counter-pwa-v3'; // bump this
const ASSETS = ['./','./index.html','./manifest.webmanifest','./sw.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  if(new URL(e.request.url).origin===location.origin){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
