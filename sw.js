// Clean-up worker. The Bhagavad Gita used to live at the root with a root-scoped service worker;
// it now lives at /gita/ with its own. When an old visitor's browser checks for an update it gets this
// file, which deletes the old caches, unregisters itself and reloads open pages from the network.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (/^gita-\d{14}$/.test(k)) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
})()));
