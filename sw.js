// Offline cache. CACHE is stamped by build.py on every build, so a new upload replaces the old copy.
const CACHE = "gita-20261111155751";
const CORE = ["./", "./index.html", "./verses.json", "./hubs.json", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon.svg"];
const CDN = ["fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // pages: try the network first so updates arrive, fall back to the saved copy offline
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return res;
    }).catch(() => caches.match("./index.html")));
    return;
  }

  // own files: answer from the cache at once, refresh it in the background
  if (url.origin === self.location.origin) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }

  // fonts and the d3 library: keep the first copy fetched
  if (CDN.includes(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res;
    }))));
  }
});
