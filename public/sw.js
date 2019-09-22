var CACHE_NAME = 'samplerv1';
var PRECACHE_URLS = [
    '/',
    'index.html',
    'cf144.png',
    'cf192.png',
    'cf512.png'
];
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js', {scope: './'})
    .then(reg => {
        reg.onupdatefound = () => {
            const installingWorker = reg.installing
            installingWorker.onstatechange = () => {
                switch(installingWorker.state){
                    case 'installed':
                        if(navigator.serviceWorker.controller) {
                            const confirmed = confirm("Update is available")
                            if(confirmed) reg.update()
                        }
                        break
                    default: return null;
                }
            }
        }
    })
    .catch(err => console.error(err))
} 
self.addEventListener('activate', event => {
    console.log(event)
})


self.addEventListener('install', event => {
    console.log("Installing SW....")
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            cache.addAll(PRECACHE_URLS)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function fetcher (event) {
    var request = event.request;
    // check if request 
    if (request.url.indexOf('assets.contentful.com') > -1) {
      // contentful asset detected
        event.respondWith(
            caches.match(event.request).then(function(response) {
            // return from cache, otherwise fetch from network
                return response || fetch(request);
            })
        );
    }
    // otherwise: ignore event
});