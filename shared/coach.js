// Language coachmark: on a reader's first visit to a landing page (the library home or a text's home),
// a small bubble points at the हि / EN toggle. It never returns once dismissed (Got it, Esc, or tapping the
// toggle) or once the language changes. The flag is shared by every text on this origin.
// Not shown inside the Android app. Loaded by the library home and, on text home pages, by library.js.
(function () {
  const KEY = "lang-coach-done";
  try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }   // no storage: don't nag every visit
  if (window.Capacitor) return;
  const toggle = () => document.getElementById("langbtn") || document.getElementById("lang");
  if (!toggle()) return;
  const startLang = document.documentElement.lang;
  let bubble = null, timer = null, observer = null;

  function done() {
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    clearTimeout(timer);
    if (observer) observer.disconnect();
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", place);
    if (bubble) bubble.remove();
    bubble = null;
  }
  function onKey(e) { if (e.key === "Escape") done(); }
  function place() {
    const t = toggle();
    if (!bubble || !t) return;
    const r = t.getBoundingClientRect(), w = bubble.offsetWidth;
    const left = Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8);
    bubble.style.top = `${r.bottom + 12}px`;
    bubble.style.left = `${left}px`;
    bubble.style.setProperty("--arrow-x", `${r.left + r.width / 2 - left}px`);
  }
  function show() {
    // a reader who already switched language in the first second needs no hint
    if (document.documentElement.lang !== startLang) { done(); return; }
    const style = document.createElement("style");
    style.textContent = `
.lang-coach{position:fixed;z-index:80;width:min(280px,calc(100vw - 16px));padding:12px 14px 12px;border-radius:14px;
  background:var(--ink,#16202c);color:var(--bg,#f4f5f1);box-shadow:0 10px 30px rgb(0 0 0 / .25);font:15px/1.45 "Mukta",system-ui,sans-serif;
  opacity:0;transform:translateY(-4px);transition:opacity .25s ease,transform .25s ease}
.lang-coach.on{opacity:1;transform:none}
.lang-coach::before{content:"";position:absolute;top:-7px;left:calc(var(--arrow-x,240px) - 7px);width:14px;height:14px;background:inherit;transform:rotate(45deg);border-radius:2px}
.lang-coach p{margin:0}
.lang-coach p + p{margin-top:2px;font-family:"Tiro Devanagari Hindi","Mukta",serif}
.lang-coach button{margin-top:10px;font:inherit;font-size:14px;font-weight:600;padding:6px 14px;min-height:36px;border-radius:999px;border:0;cursor:pointer;
  background:var(--bg,#f4f5f1);color:var(--ink,#16202c)}
@media (prefers-reduced-motion: reduce){ .lang-coach{transition:none} }`;
    document.head.appendChild(style);
    bubble = document.createElement("div");
    bubble.className = "lang-coach";
    bubble.setAttribute("role", "dialog");
    bubble.setAttribute("aria-modal", "false");
    bubble.setAttribute("aria-live", "polite");
    bubble.setAttribute("aria-label", "Language / भाषा");
    bubble.innerHTML = `<p lang="en">Read in हिन्दी or English — tap here</p><p lang="hi">हिन्दी या English में पढ़ें — यहाँ टैप करें</p>
      <button type="button">Got it / ठीक है</button>`;
    bubble.querySelector("button").addEventListener("click", done);
    document.body.appendChild(bubble);
    place();
    requestAnimationFrame(() => bubble && bubble.classList.add("on"));
    window.addEventListener("resize", place);
    document.addEventListener("keydown", onKey);
    observer = new MutationObserver(done);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  // tapping the toggle counts as "seen it", even before the bubble appears
  document.addEventListener("click", e => { const t = toggle(); if (t && t.contains(e.target)) done(); }, true);
  timer = setTimeout(show, 1000);
})();
