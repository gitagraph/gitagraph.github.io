// Offline cache. CACHE is stamped by build.py on every build, so a new upload replaces the old copy.
// The Gita reader lives at the root of the same origin, so this touches only its own
// pages, files and caches.
const PREFIX = "upanishads-";
const CACHE = PREFIX + "20261112143309";
const BASE = new URL(self.registration.scope).pathname;
// versioned with the same stamp the pages use (app.js?v=…), so the precache holds exactly what new pages ask for
const V = "?v=20261112143309";
const CORE = ["", "app.css" + V, "app.js" + V, "data.json" + V, "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon.svg"].map(p => BASE + p);
const MINE = new Set(["", "app.css", "app.js", "data.json", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon.svg"].map(p => BASE + p));
const ROUTES = ["story/", "theme/", "themes/", "upanishad/", "texts/", "topic/", "people-and-ideas/", "search/", "saved/", "about/"].map(p => BASE + p);
const isPage = p => p === BASE || p === BASE + "index.html" || ROUTES.some(r => p.startsWith(r));
const CDN = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // pages: network first so updates arrive; offline, the saved page or else the app shell,
  // which renders any story from the cached data
  if (req.mode === "navigate") {
    if (url.origin !== self.location.origin || !isPage(url.pathname)) return;
    e.respondWith(caches.open(CACHE).then(c => fetch(req).then(res => {
      if (res.ok) c.put(req, res.clone()); return res;
    }).catch(() => c.match(req).then(hit => hit || c.match(BASE)))));
    return;
  }

  // own files: answer from the cache at once, refresh it in the background
  if (url.origin === self.location.origin) {
    if (!MINE.has(url.pathname)) return;
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }

  // fonts: keep the first copy fetched
  if (CDN.includes(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res;
    }))));
  }
});
