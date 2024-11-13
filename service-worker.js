const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './app.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
];

// Evento de instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Abriendo caché');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de activación
self.addEventListener('activate', event => {
    console.log('Service Worker activado');
});

// Evento de fetch para interceptar solicitudes y servir desde caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
