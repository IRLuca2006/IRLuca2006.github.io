'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "f537ce9ebdd95fc48e5c11916a3f8626",
"assets/assets/images/argentina.png": "b76ebfdfe3fe59de55efa94ba653f027",
"assets/assets/images/australia.png": "9da49885261ee7a54937a82adfee702b",
"assets/assets/images/belgium.png": "8cfc4badfca38328eafeb0e37d2b1bb8",
"assets/assets/images/brazil.png": "626d43d4daa7dd9a2512450ebd6eecf5",
"assets/assets/images/cameroon.png": "54f0c18d0330ad6364df4acce3e953a5",
"assets/assets/images/canada.png": "074e405fbc28a3d308cb4e076b1cdc8f",
"assets/assets/images/costarica.png": "f99e7659803bfe038f248df6006bf3c8",
"assets/assets/images/croatia.png": "224d3119cb87e2f48a28cbfcb631965f",
"assets/assets/images/denmark.png": "c33eccf2f92686e6e042cde95bd0cd75",
"assets/assets/images/ecuador.png": "d6bc96b567423d7ee9ba1885749fc60e",
"assets/assets/images/england.png": "030f94e0fc3f21ed2811faf9a24b8bfa",
"assets/assets/images/france.png": "55775f8ab4ea924369c5b9f6a8161508",
"assets/assets/images/germany.png": "8f239dbab7c479e495cf1500dbeb8891",
"assets/assets/images/ghana.png": "247ad7572a58b27e6e302757f6bb3786",
"assets/assets/images/iran.png": "1b763b08a67f62a1ecaa0ca9b30d6d1b",
"assets/assets/images/japan.png": "9218968e5e4566deacc034c7b7e678de",
"assets/assets/images/mexico.png": "756bb1161e8afcd3e60f338f8e5c83e5",
"assets/assets/images/morroco.png": "289a2e7b0dcd5bd6871558acd8db4c87",
"assets/assets/images/netherlands.png": "89cc845141e5c8888fc467c07f0dcbc8",
"assets/assets/images/poland.png": "a4c9497b05fe3b4ce44b8b4227ce606b",
"assets/assets/images/portugal.png": "f465cc047300452e306e1111b7954b53",
"assets/assets/images/qatar.png": "f1e4a31df74872ee622d199616188a7e",
"assets/assets/images/saudiarabia.png": "0e05b9e9f95b5620a3bc54e8e4c73ce0",
"assets/assets/images/senegal.png": "02f6a0e7acb0386b7d7652e129187d34",
"assets/assets/images/serbia.png": "fcdeb7810ab092887386ded905969df6",
"assets/assets/images/southkorea.png": "4a6a0096475938487eeefb856048ab65",
"assets/assets/images/spain.png": "239f3cf590884068f547b1ac400c768e",
"assets/assets/images/switzerland.png": "ee309dc388bf8f083164ba62f479c639",
"assets/assets/images/TBD.png": "2003b9265de59cf0f3d03e9f3720792c",
"assets/assets/images/tunisia.png": "bc314a966f2d57f75f39ba718f69faf5",
"assets/assets/images/uruguay.png": "d14eb0da1a5a4eb4264a122b761726b6",
"assets/assets/images/usa.png": "16f9b85a1b3683398e408d91148276d2",
"assets/assets/images/wales.png": "ed39d6e303ab1a931de378b8f9815f69",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "c4307c70556c03d4db01d4d24717d6f7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "0ff5c2d72578756a2d288596d5a621dc",
"canvaskit/canvaskit.js": "687636ce014616f8b829c44074231939",
"canvaskit/canvaskit.wasm": "d4972dbefe733345d4eabb87d17fcb5f",
"canvaskit/profiling/canvaskit.js": "ba8aac0ba37d0bfa3c9a5f77c761b88b",
"canvaskit/profiling/canvaskit.wasm": "05ad694fda6cfca3f9bbac4b18358f93",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "49722542164557e77a9e049e12748476",
"/": "49722542164557e77a9e049e12748476",
"main.dart.js": "2f1891910d3f708a59745e65e5a68789",
"manifest.json": "a00e4e29297606e1ac47222411ee7121",
"version.json": "8e49d3a81d7dace0939204770efb3d8d"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
