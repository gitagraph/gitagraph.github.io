// Language coachmark: on a reader's first visit to a landing page (the library home or a text's home),
// a small note offers the हि / EN switch, in the page's current language. It is shown once only: the flag is
// set as soon as it appears, and it closes on Got it, Esc, a tap outside it, or a language change.
// It sits under the toggle when that leaves the headline, brand and buttons clear; otherwise (phones) it sits
// at the bottom of the screen. The flag is shared by every text on this origin.
// Not shown inside the Android app. Loaded by the library home and, on text home pages, by library.js.
(function () {
  const KEY = "lang-coach-done";
  try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }   // no storage: don't nag every visit
  if (window.Capacitor) return;
  const toggle = () => document.getElementById("langbtn") || document.getElementById("lang");
  if (!toggle()) return;
  const startLang = document.documentElement.lang;
  const COPY = {
    en: ["Read in English or हिन्दी — ", "switch here", ".", "Got it"],
    hi: ["हिन्दी या English में पढ़ें — ", "यहाँ बदलें", "।", "ठीक है"],
  };
  let bubble = null, timer = null, observer = null;

  function done() {
    clearTimeout(timer);
    if (observer) observer.disconnect();
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("click", onOutside, true);
    window.removeEventListener("resize", place);
    if (bubble) bubble.remove();
    bubble = null;
  }
  function onKey(e) { if (e.key === "Escape") done(); }
  function onOutside(e) { if (bubble && !bubble.contains(e.target)) done(); }
  const hits = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  function place() {
    const t = toggle();
    if (!bubble || !t) return;
    // try under the toggle first
    bubble.classList.remove("dock");
    const r = t.getBoundingClientRect(), w = bubble.offsetWidth;
    const left = Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8);
    bubble.style.top = `${r.bottom + 10}px`;
    bubble.style.left = `${left}px`;
    bubble.style.bottom = "";
    bubble.style.setProperty("--arrow-x", `${r.left + r.width / 2 - left}px`);
    // headings, titles, the brand and the main buttons must stay visible; if any would be covered, dock at the bottom,
    // above a bottom tab bar if the page has one
    const b = bubble.getBoundingClientRect();
    // measured by their actual text and buttons (a Range), not their full-width boxes
    const keep = document.querySelectorAll("h1, h2, .hero > *, .ctas, .brand, .tagline, [lang=sa]");
    const box = el => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
    if ([...keep].some(el => !bubble.contains(el) && hits(b, box(el)))) {
      bubble.classList.add("dock");
      const bar = [...document.querySelectorAll("nav, footer, .tabs")].map(el => [el, el.getBoundingClientRect()])
        .filter(([el, r]) => /fixed|sticky/.test(getComputedStyle(el).position) && r.height && r.bottom >= window.innerHeight - 2)
        .reduce((m, [, r]) => Math.max(m, window.innerHeight - r.top), 0);
      bubble.style.top = "";
      bubble.style.bottom = bar ? `${bar + 10}px` : "calc(16px + env(safe-area-inset-bottom, 0px))";
      bubble.style.left = `${(window.innerWidth - bubble.offsetWidth) / 2}px`;
      // never on a button or link either: slide up to the nearest free band in the lower half of the screen
      const taps = [...document.querySelectorAll("a, button")].filter(el => !bubble.contains(el) && el.getClientRects().length).map(el => el.getBoundingClientRect());
      const blocked = rect => taps.some(t => hits(rect, t)) || [...keep].some(el => !bubble.contains(el) && hits(rect, box(el)));
      const base = bubble.getBoundingClientRect();
      for (let up = 0; base.top - up > window.innerHeight / 2; up += 4) {
        const rect = { left: base.left, right: base.right, top: base.top - up, bottom: base.bottom - up };
        if (!blocked(rect)) { if (up) bubble.style.bottom = `${window.innerHeight - base.bottom + up}px`; break; }
      }
    }
  }
  function show() {
    // a reader who already switched language in the first second needs no hint
    if (document.documentElement.lang !== startLang) { done(); return; }
    try { localStorage.setItem(KEY, "1"); } catch (e) {}   // shown once, whether or not it is dismissed
    const style = document.createElement("style");
    style.textContent = `
.lang-coach{position:fixed;z-index:80;display:flex;align-items:center;gap:10px;max-width:min(240px,calc(100vw - 16px));padding:6px 6px 6px 12px;border-radius:12px;
  background:var(--ink,#1b1838);color:var(--bg,#f6f5f0);box-shadow:0 6px 18px rgb(0 0 0 / .18);font:14px/1.4 "Mukta",system-ui,sans-serif;
  opacity:0;transition:opacity .2s ease}
.lang-coach.on{opacity:1}
.lang-coach::before{content:"";position:absolute;top:-5px;left:calc(var(--arrow-x,200px) - 5px);width:10px;height:10px;background:inherit;transform:rotate(45deg);border-radius:2px}
.lang-coach.dock::before{display:none}
.lang-coach p{margin:0;flex:1;min-width:0}
.lang-coach .sw{font:inherit;font-weight:600;color:inherit;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
.lang-coach .ok{flex:none;font:inherit;font-size:13.5px;font-weight:600;min-height:44px;min-width:44px;padding:0 12px;border-radius:9px;border:0;cursor:pointer;
  background:var(--bg,#f6f5f0);color:var(--ink,#1b1838)}
.lang-coach :focus-visible{outline:2px solid var(--bg,#f6f5f0);outline-offset:2px}
@media (prefers-reduced-motion: reduce){ .lang-coach{transition:none} }`;
    document.head.appendChild(style);
    const l = startLang === "hi" ? "hi" : "en", [a, sw, end, ok] = COPY[l];
    bubble = document.createElement("div");
    bubble.className = "lang-coach";
    bubble.setAttribute("role", "status");
    bubble.lang = l;
    bubble.innerHTML = `<p>${a}<button type="button" class="sw">${sw}</button>${end}</p><button type="button" class="ok">${ok}</button>`;
    bubble.querySelector(".ok").addEventListener("click", done);
    bubble.querySelector(".sw").addEventListener("click", () => { const t = toggle(); done(); if (t) t.click(); });
    document.body.appendChild(bubble);
    place();
    requestAnimationFrame(() => bubble && bubble.classList.add("on"));
    window.addEventListener("resize", place);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onOutside, true);
    observer = new MutationObserver(done);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  // tapping the toggle counts as "seen it", even before the note appears
  document.addEventListener("click", e => { const t = toggle(); if (t && t.contains(e.target)) { try { localStorage.setItem(KEY, "1"); } catch (x) {} done(); } }, true);
  timer = setTimeout(show, 1000);
})();
