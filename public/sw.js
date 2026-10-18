const CACHE_NAME = "bus-timer-shell-v2";
const PAGE_PATHS = ["/", "/about.html"];
const CORE_ASSETS = [
  "/manifest.webmanifest",
  "/arebyan.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/assets/bus-background.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const appAssets = new Set(CORE_ASSETS);

    for (const path of PAGE_PATHS) {
      const response = await fetch(path, { cache: "reload" });
      if (!response.ok) {
        throw new Error(`Unable to cache the app page: ${path} (${response.status}).`);
      }

      const documentText = await response.clone().text();
      await cache.put(path, response);

      const assetReferences = documentText.matchAll(
        /(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g,
      );

      for (const [, reference] of assetReferences) {
        const assetUrl = new URL(reference, self.location.origin);
        if (assetUrl.origin === self.location.origin) {
          appAssets.add(`${assetUrl.pathname}${assetUrl.search}`);
        }
      }
    }

    await cache.addAll([...appAssets]);
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((cacheName) => cacheName.startsWith("bus-timer-shell-") && cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName)),
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(requestUrl.pathname, response.clone());
        }
        return response;
      } catch {
        const cachedPage = await caches.match(requestUrl.pathname);
        if (cachedPage) {
          return cachedPage;
        }
        throw new Error(`No cached page is available for ${requestUrl.pathname}.`);
      }
    })());
    return;
  }

  const isStaticAsset = ["font", "image", "manifest", "script", "style"].includes(request.destination)
    || /\.(?:css|js|png|svg|webmanifest)$/i.test(requestUrl.pathname);
  if (!isStaticAsset) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith((async () => {
    const cachedResponse = await caches.match(requestUrl.pathname);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(requestUrl.pathname, response.clone());
    }
    return response;
  })());
});
