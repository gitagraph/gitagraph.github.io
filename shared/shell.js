// Site shell: the one navigation every page shares.
//   Phone tab bar (four places):  Home · Explore · Paths · Library
//   Desktop header:               Explore · Paths · Library · Graph · Saved   (the brand is Home)
// Explore is the questions page (search, the questions, ideas and people, the way into the Graph). Library is its own
// page: the three texts, what the reader saved and read last, and the settings. On phones Saved lives inside it.
// The Graph has no phone tab: on a small screen it is reached from the pages where it answers something (the home
// page, "See connections" on a passage, the end of a question or a path). The desktop header has room for it.
// Static pages (home, the map, the documents) include this file and it mounts itself:
//   <script src="<root>shared/shell.js" data-active="home" defer></script>
// The readers inline it into app.js at build time (so it works offline) and call GGShell.nav()/tabs() themselves.
(function () {
  const script = document.currentScript;
  const IC = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>',
    paths: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="5" r="2.2"/><path d="M8.200 19H15a3.500 3.500 0 000-7H9a3.500 3.500 0 010-7h6.800"/></svg>',
    questions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4"/><path d="M12 17v.5"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5.5c2.8-1 5.8-1 9 1v13c-3.2-2-6.2-2-9-1z"/><path d="M21 5.5c-2.8-1-5.8-1-9 1v13c3.2-2 6.2-2 9-1z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="2.6"/><circle cx="4.5" cy="6" r="1.8"/><circle cx="19.5" cy="6" r="1.8"/><circle cx="5" cy="18.5" r="1.8"/><circle cx="19" cy="18.5" r="1.8"/><path d="M6 7l4 3.500M18 7l-4 3.500M6.5 17.500l3.5-3.500M17.5 17.500L14 14"/></svg>',
    saved: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.500h11v17l-5.5-4-5.5 4z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>'
  };
  const ITEMS = [
    ["home", "", "Home", "होम"],
    ["questions", "gita/questions/", "Explore", "एक्सप्लोर"],
    ["paths", "paths/", "Paths", "पथ"],
    ["library", "library/", "Library", "ग्रंथालय"],
    ["map", "explore/", "Graph", "ग्राफ़"],
    ["saved", "saved/", "Saved", "सहेजे"]
  ];
  const MARK = '<svg class="mark" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><rect class="bk" x="6" y="6" width="108" height="108" rx="26"/><path class="ct" d="M87.49 38.1H74.86L75.07 98H73.99L65.47 92.5L65.9 38.1H45.82L46.04 75.87Q46.04 78.57 43.56 78.57Q41.83 78.57 39.08 76.84Q36.32 75.12 33.63 72.47Q30.93 69.83 29.09 66.97Q27.26 64.11 27.26 61.95Q27.26 60.98 27.9 60.22Q28.55 59.47 29.96 59.47H36.86L36.97 38.1H22.18L18.51 31.08V30H83.82L87.49 37.02Z"/><circle class="nd" cx="88.5" cy="33.6" r="11.5"/></svg>';   // the Ga mark: written by tools/make_mark.py, kept here for the readers

  // lang given ("en"/"hi"): one label. No lang: both, and the page's own .l-en/.l-hi rule shows the right one.
  const label = (it, lang) => lang ? (lang === "hi" ? it[3] : it[2]) : `<span class="l-en">${it[2]}</span><span class="l-hi">${it[3]}</span>`;
  const href = (it, root) => (root + it[1]) || "./";
  const cur = (it, active) => (it[0] === active ? ' aria-current="page"' : "");

  const GGShell = {
    // links for the desktop header, then the site-wide search
    nav(o) {
      return ITEMS.filter(it => it[0] !== "home").map(it =>
        `<a href="${href(it, o.root)}" data-g="${it[0]}"${cur(it, o.active)}>${label(it, o.lang)}</a>`).join("") + GGShell.search(o);
    },
    // the link to /search/: a pill with a hint on wide screens, an icon elsewhere (o.icon: icon only, for phone bars)
    search(o) {
      GGShell.root = o.root;
      const sr = ["search", "search/", "Search verses, ideas, people", "श्लोक, विचार, पात्र खोजें"], lb = o.lang ? (o.lang === "hi" ? "खोजें" : "Search") : "Search";
      return `<a class="gsearch${o.icon ? " gs-m" : ""}" href="${o.root}search/" data-g="search" aria-label="${lb}"${cur(sr, o.active)}>${IC.search}<span>${label(sr, o.lang)}</span></a>`;
    },
    // the four phone tabs (the Graph is reached from Explore, Saved from the Library)
    tabs(o) {
      const act = o.active === "saved" ? "library" : o.active;
      return ITEMS.filter(it => it[0] !== "map" && it[0] !== "saved").map(it =>
        `<a href="${href(it, o.root)}" data-g="${it[0]}"${cur(it, act)}><span class="gi">${IC[it[0] === "questions" ? "search" : it[0]]}</span>${label(it, o.lang)}</a>`).join("");
    },
    // the brand lockup for the readers' desktop bar
    brand(root, lang) {
      return `<a class="brand" href="${root || "./"}" aria-label="Gitagraph">${MARK}<span class="nm">${lang === "hi" ? "गीताग्राफ़" : "Gitagraph"}</span></a>`;
    }
  };
  window.GGShell = GGShell;

  // Reading trail. A question page lists its passages in order. Opening one from that page starts a trail, and each
  // passage page then offers the next passage and the way back to the question. A reader who reaches the same verse
  // by ordinary reading sees none of this: only pages opened along the trail are marked. Kept for this tab only.
  //   trail = {slug, en, hi, next: {slug, en, hi} | null, items: [{k: "gita/chapter/2/verse/14/", en, hi, wen?, whi?}], seen: [k]}
  // The list is a question page by default (gita/questions/<slug>/). A reading path gives its own address as `home`
  // (and `kind: "path"` on its `next`), so the same trail serves both.
  const TK = "gg-trail";
  const tget = () => { try { return JSON.parse(sessionStorage.getItem(TK) || "null"); } catch (e) { return null; } };
  const tput = t => { try { sessionStorage.setItem(TK, JSON.stringify(t)); } catch (e) {} };
  const thome = x => x.home || ("gita/questions/" + x.slug + "/");
  const tesc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  GGShell.trailSet = function (t) { const old = tget(); t.seen = old && old.slug === t.slug && Array.isArray(old.seen) ? old.seen : []; tput(t); };
  GGShell.trailSeen = function (k) { const t = tget(); if (t && t.items.some(i => i.k === k) && !t.seen.includes(k)) { t.seen.push(k); tput(t); } };
  // where the page with this key sits on the trail: null when it was not opened along one
  GGShell.trailAt = function (key) {
    const t = tget(); if (!t || !Array.isArray(t.items)) return null;
    const i = t.items.findIndex(x => x.k === key); if (i < 0 || !(t.seen || []).includes(key)) return null;
    return { t, i, n: t.items.length, prev: t.items[i - 1] || null, next: t.items[i + 1] || null };
  };
  // one step along the trail from this page (dir 1 = on, -1 = back): {href, k} for a passage, {href} for the next
  // question after the last passage, {} when there is nothing that way, null when the page is not on a trail
  GGShell.trailStep = function (key, dir, root) {
    const a = GGShell.trailAt(key); if (!a) return null;
    const it = dir > 0 ? a.next : a.prev;
    if (it) return { href: root + it.k, k: it.k, en: it.en, hi: it.hi };
    if (dir > 0 && a.t.next) return { href: root + thome(a.t.next), en: a.t.next.en, hi: a.t.next.hi, question: true };
    return {};
  };
  // The line that says why this passage comes next on its path, for the top of the passage's own page. On the path
  // page that line sits above the passage and is easy to pass over; without it the passage arrives with no context.
  GGShell.trailNote = function (key, lang) {
    const a = GGShell.trailAt(key); if (!a) return "";
    const it = a.t.items[a.i], hi = lang === "hi", w = hi ? it.whi : it.wen; if (!w) return "";
    const pos = hi ? `${a.n} में से ${a.i + 1}` : `${a.i + 1} of ${a.n}`;
    return `<aside class="gtnote" lang="${hi ? "hi" : "en"}"><small>${tesc(hi ? a.t.hi : a.t.en)} · ${pos}</small><p>${tesc(w)}</p></aside>`;
  };
  // What a passage page shows when it was opened from a question: where the reader is in that question's list, the
  // passage before and the passage after in the same order as the list, and after the last one the next question.
  // "" when the page was not opened along a trail. Moving along it replaces the page in the browser's history
  // (data-replace), so one Back always returns to the question.
  GGShell.trailBar = function (key, lang, root) {
    const a = GGShell.trailAt(key); if (!a) return "";
    const t = a.t, hi = lang === "hi", L = x => tesc(hi ? x.hi : x.en);
    const nl = t.next && t.next.kind === "path" ? (hi ? "अगला पथ" : "Next path") : (hi ? "अगला प्रश्न" : "Next question");
    const pos = hi ? `${a.n} में से ${a.i + 1}` : `${a.i + 1} of ${a.n}`;
    const prev = a.prev ? `<a class="gt-pv" href="${root + a.prev.k}" data-trail="${tesc(a.prev.k)}" data-replace><small>← ${hi ? "पिछला" : "Previous"}</small><b>${L(a.prev)}</b></a>` : "<span></span>";
    const next = a.next ? `<a class="gt-nx" href="${root + a.next.k}" data-trail="${tesc(a.next.k)}" data-replace><small>${hi ? "अगला" : "Next"} →</small><b>${L(a.next)}</b></a>`
      : t.next ? `<a class="gt-nx" href="${root + thome(t.next)}" data-replace><small>${nl} →</small><b>${L(t.next)}</b></a>` : "<span></span>";
    return `<nav class="gtrail" lang="${hi ? "hi" : "en"}" aria-label="${L(t)}"><p class="gt-k"><a href="${root + thome(t)}" data-back>← <b>${L(t)}</b></a> · ${pos}</p><div class="gt-row">${prev}${next}</div></nav>`;
  };
  // Last place. Every reading page (a verse, a story, a question, a path) records itself here, and the home page's
  // "Continue reading" returns to whichever was most recent. A passage opened along a trail keeps that trail with it,
  // so continuing lands back in the same question or path, in the same order. Kept on this device (localStorage).
  //   last = {k: "gita/chapter/2/verse/47/", en, hi, sen?, shi?, trail?: <the trail above>, at}
  GGShell.lastSet = function (o) {
    try { const t = tget(), on = !!(t && Array.isArray(t.items) && t.items.some(i => i.k === o.k) && (t.seen || []).includes(o.k));
      localStorage.setItem("gg-last", JSON.stringify({ k: o.k, en: o.en, hi: o.hi, sen: on ? t.en : "", shi: on ? t.hi : "",
        i: on ? t.items.findIndex(i => i.k === o.k) + 1 : 0, n: on ? t.items.length : 0, trail: on ? t : null, at: Date.now() })); } catch (e) {}
  };
  // Swipe that follows the finger. On a verse or a story a sideways drag moves the page with it; let go past a short
  // distance and the page slides away and the next one slides in from the other side, otherwise it settles back.
  // step(dir) is the reader's own rule for what lies that way (dir 1 = on, -1 = back): it returns a function that
  // makes the move, or null when there is nothing there, in which case the page only gives a little and returns.
  // Vertical scrolling is untouched, and with reduced motion the move happens without any sliding.
  GGShell.swipe = function (el, step) {
    if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches, EASE = "cubic-bezier(.2,.7,.2,1)";
    try { const [d, at] = (sessionStorage.getItem("gg-enter") || "").split("|").map(Number); sessionStorage.removeItem("gg-enter");
      if (d && !still && Date.now() - at < 1500) {          // arriving from a swipe: come in from the side it went towards
        el.style.transition = "none"; el.style.transform = `translateX(${d * 36}px)`; el.style.opacity = "0";
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = `transform .24s ${EASE}, opacity .24s ease`; el.style.transform = ""; el.style.opacity = ""; }));
        setTimeout(() => { el.style.transition = ""; }, 320);
      } } catch (e) {}
    el.style.touchAction = "pan-y";
    let sx = 0, sy = 0, st = 0, lock = 0, dx = 0, w = 320, moves = {};
    const move = dir => (dir in moves ? moves[dir] : (moves[dir] = step(dir) || null));
    const settle = () => { el.style.transition = `transform .2s ${EASE}, opacity .2s ease`; el.style.transform = ""; el.style.opacity = ""; setTimeout(() => { el.style.transition = ""; }, 220); };
    // a drag that starts inside something that scrolls sideways by itself belongs to that thing
    const own = t => { for (let n = t; n && n !== el; n = n.parentElement) if (n.scrollWidth > n.clientWidth + 4 && /auto|scroll/.test(getComputedStyle(n).overflowX)) return true; return false; };
    el.addEventListener("touchstart", e => { lock = e.touches.length === 1 && !own(e.target) ? 0 : -1; const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); dx = 0; moves = {}; w = el.offsetWidth || 320; }, { passive: true });
    el.addEventListener("touchmove", e => {
      if (lock < 0) return; const t = e.touches[0]; dx = t.clientX - sx; const dy = t.clientY - sy;
      if (!lock) { if (Math.abs(dx) > 10 && Math.abs(dx) > 1.4 * Math.abs(dy)) lock = 1; else if (Math.abs(dy) > 10) lock = -1; }
      if (lock !== 1 || still) return;
      const x = move(dx < 0 ? 1 : -1) ? dx : dx * .25;
      el.style.transition = "none"; el.style.transform = `translateX(${x}px)`; el.style.opacity = String(1 - Math.min(.5, Math.abs(x) / w * .9));
    }, { passive: true });
    el.addEventListener("touchend", () => {
      if (lock !== 1) return; lock = 0;
      const dir = dx < 0 ? 1 : -1, fn = move(dir), dt = Date.now() - st;
      if (!(fn && (Math.abs(dx) > 70 || (Math.abs(dx) > 35 && dt < 250)))) { if (!still) settle(); return; }
      if (still) { fn(); return; }
      el.style.transition = "transform .14s ease-in, opacity .14s ease-in"; el.style.transform = `translateX(${-dir * w * .35}px)`; el.style.opacity = "0";
      setTimeout(() => { try { sessionStorage.setItem("gg-enter", dir + "|" + Date.now()); } catch (e) {}
        window.__ggSwipe = Date.now(); fn(); setTimeout(() => { if (el.isConnected) settle(); }, 60); }, 140);      // if the move turned out to go nowhere, the page comes back
    }, { passive: true });
    el.addEventListener("touchcancel", () => { if (lock === 1 && !still) settle(); lock = 0; }, { passive: true });
  };

  // Reading mode, on phones, on a verse or a story only: the bars step aside while the reader scrolls down and come
  // back on the way up or at the end of the page, and the screen stays on while they read (it is let go after ten
  // minutes without a touch, when the page is left, or when the app goes to the background).
  if (!window.__ggR) { window.__ggR = 1;
    const root = document.documentElement, reading = () => !!(document.getElementById("verse") || document.querySelector("article.story"));
    let y0 = window.scrollY, touched = Date.now(), lockObj = null, awake = false;
    const native = () => window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.KeepAwake;
    const keep = on => { if (on === awake) return; awake = on;
      const k = native();
      if (k) { (on ? k.keepAwake() : k.allowSleep()).catch(() => {}); return; }
      if (!navigator.wakeLock) return;
      if (on) navigator.wakeLock.request("screen").then(l => { lockObj = l; if (!awake) { l.release().catch(() => {}); lockObj = null; } }).catch(() => { awake = false; });
      else if (lockObj) { lockObj.release().catch(() => {}); lockObj = null; } };
    const sync = () => keep(reading() && !document.hidden && Date.now() - touched < 6e5);
    window.addEventListener("scroll", () => {
      const y = window.scrollY, d = y - y0; touched = Date.now();
      if (!reading() || y < 120 || y + innerHeight > document.documentElement.scrollHeight - 96) root.classList.remove("gg-imm");
      else if (d > 8) root.classList.add("gg-imm"); else if (d < -8) root.classList.remove("gg-imm");
      if (Math.abs(d) > 8) y0 = y; sync();
    }, { passive: true });
    window.addEventListener("touchstart", () => { touched = Date.now(); sync(); }, { passive: true });
    document.addEventListener("visibilitychange", () => { awake = awake && !document.hidden && !!native(); sync(); });   // the browser drops its own lock when hidden
    setInterval(() => { if (!reading()) root.classList.remove("gg-imm"); sync(); }, 4000); setTimeout(sync, 600);
  }

  if (!window.__ggT) { window.__ggT = 1; document.addEventListener("click", e => {
    if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[data-trail], a[data-replace], a[data-back]"); if (!a) return;
    if (a.dataset.trail) GGShell.trailSeen(a.dataset.trail);
    // back to the list the reader came from: the page before this one in the history is that list
    if (a.dataset.back !== undefined && history.length > 1) { e.preventDefault(); e.stopPropagation(); history.back(); return; }
    // a step to a passage in another text is a new page load: replace this page instead of adding to the history
    if (a.dataset.replace !== undefined) { const u = new URL(a.getAttribute("href"), location.href);
      if (u.origin === location.origin && u.pathname.split("/")[1] !== location.pathname.split("/")[1]) { e.preventDefault(); e.stopPropagation(); location.replace(u.href); } }
  }, true); }

  // static pages: mount into the page's own header and add the tab bar
  if (script && script.dataset.active !== undefined) {
    const root = new URL("../", script.src).pathname;
    const active = script.dataset.active;
    const mount = () => {
      const top = document.querySelector("header.top");
      const brand = top && top.querySelector(".brand");
      if (brand && !top.querySelector(".gnav")) {
        const n = document.createElement("nav");
        n.className = "gnav"; n.setAttribute("aria-label", "Site");
        n.innerHTML = GGShell.nav({ root, active });
        brand.after(n);
        n.insertAdjacentHTML("afterend", GGShell.search({ root, active, icon: true }));
      }
      // Pages that carry only the language switch (reading paths, Saved, Search, the documents, the Hindi pages) get a
      // Display button beside it, with the same choices as the readers: language, Sanskrit on or off, text size, theme.
      // Theme is one preference for the whole site ("gg-theme"). Text size and Sanskrit are kept site-wide here
      // ("gg-size", "gg-sa") and written into each reader's own settings too, so a choice made on a path page holds
      // when a passage is opened; the readers write the same two keys when the choice is changed there.
      const lg = top && top.querySelector("#lang");
      if (lg && !document.getElementById("themebtn")) {
        const html = document.documentElement, SIZES = [0.9, 1, 1.12, 1.25];
        const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
        const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
        const obj = k => { try { return JSON.parse(localStorage.getItem(k) || "{}") || {}; } catch (e) { return {}; } };
        const gp = obj("gita-prefs");
        let size = +(get("gg-size") || gp.size || 1); if (!SIZES.includes(size)) size = 1;
        let sa = get("gg-sa") != null ? get("gg-sa") === "1" : gp.sa !== false;
        let theme = get("gg-theme") || "system"; if (!["system", "light", "dark"].includes(theme)) theme = "system";
        const apply = () => { html.style.setProperty("--scale", size); if (sa) html.removeAttribute("data-sa"); else html.setAttribute("data-sa", "off");
          if (theme === "system") html.removeAttribute("data-theme"); else html.setAttribute("data-theme", theme); };
        const save = () => { put("gg-size", String(size)); put("gg-sa", sa ? "1" : "0"); put("gg-theme", theme);
          ["gita-prefs", "avg-prefs", "upa-prefs2"].forEach(k => { const o = obj(k); o.size = size; o.sa = sa; o.theme = theme; put(k, JSON.stringify(o)); }); };
        html.style.setProperty("--scale", size); if (!sa) html.setAttribute("data-sa", "off");
        const T = { en: { t: "Display", lang: "Language", sa: "Sanskrit", size: "Text size", theme: "Theme", system: "System", light: "Light", dark: "Dark", done: "Done" },
          hi: { t: "प्रदर्शन", lang: "भाषा", sa: "संस्कृत", size: "अक्षर का आकार", theme: "थीम", system: "सिस्टम", light: "हल्की", dark: "गहरी", done: "ठीक है" } };
        const cur = () => (html.lang === "hi" ? "hi" : "en");
        const tb = document.createElement("button"); tb.type = "button"; tb.id = "themebtn"; tb.className = "langpill themebtn";
        tb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></svg>';
        const label = () => { tb.setAttribute("aria-label", T[cur()].t); tb.title = T[cur()].t; };
        label(); new MutationObserver(label).observe(html, { attributes: true, attributeFilter: ["lang"] });
        function open() {
          const t = T[cur()], seg = (name, opts, val) => `<div class="gs-seg" role="group">${opts.map(([v, l]) => `<button type="button" data-${name}="${v}" aria-pressed="${String(v) === String(val)}">${l}</button>`).join("")}</div>`;
          const d = document.createElement("div"); d.className = "gs-scrim"; d.lang = cur();
          d.innerHTML = `<div class="gs-sheet" role="dialog" aria-modal="true" aria-label="${t.t}"><h2>${t.t}</h2>
            <div class="gs-row"><span class="gs-lbl">${t.lang}</span><div class="gs-seg" role="group"><button type="button" data-lg="en" aria-pressed="${cur() === "en"}">English</button><button type="button" data-lg="hi" lang="hi" aria-pressed="${cur() === "hi"}">हिन्दी</button></div></div>
            <div class="gs-row"><span class="gs-lbl">${t.sa}</span><button type="button" class="gs-switch" role="switch" aria-checked="${sa}" aria-label="${t.sa}"></button></div>
            <div class="gs-row"><span class="gs-lbl">${t.size}</span>${seg("size", [[0.9, "A−"], [1, "A"], [1.12, "A+"], [1.25, "A++"]], size)}</div>
            <div class="gs-row"><span class="gs-lbl">${t.theme}</span>${seg("theme", [["system", t.system], ["light", t.light], ["dark", t.dark]], theme)}</div>
            <div class="gs-row"><span></span><button type="button" class="gs-done" data-close>${t.done}</button></div></div>`;
          const close = () => { d.remove(); document.removeEventListener("keydown", onKey); tb.focus(); };
          const onKey = e => { if (e.key === "Escape") close(); };
          const press = (sel, b) => d.querySelectorAll(sel).forEach(x => x.setAttribute("aria-pressed", x === b));
          d.addEventListener("click", e => {
            const b = e.target.closest("button");
            if (e.target === d || (b && b.dataset.close !== undefined)) { close(); return; }
            if (!b) return;
            if (b.dataset.size) { size = +b.dataset.size; press("[data-size]", b); }
            else if (b.dataset.theme) { theme = b.dataset.theme; press("[data-theme]", b); }
            else if (b.classList.contains("gs-switch")) { sa = !sa; b.setAttribute("aria-checked", sa); }
            else if (b.dataset.lg) { if (b.dataset.lg !== cur()) { close(); const l = document.getElementById("lang"); if (l) l.click(); if (cur() === b.dataset.lg) open(); } return; }
            apply(); save();
          });
          document.addEventListener("keydown", onKey); document.body.appendChild(d); d.querySelector("[data-close]").focus();
        }
        tb.onclick = open; lg.before(tb);
      }
      if (!document.querySelector(".gtabs")) {
        const t = document.createElement("nav");
        t.className = "gtabs"; t.setAttribute("aria-label", "Site");
        t.innerHTML = GGShell.tabs({ root, active });
        document.body.appendChild(t);
        document.body.classList.add("gg-tabs");
      }
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  }
  // Cmd/Ctrl+K opens the site-wide search from any page
  if (!window.__ggK) { window.__ggK = 1; document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && (e.key === "k" || e.key === "K") && GGShell.root != null) { e.preventDefault(); location.href = GGShell.root + "search/"; }
  }); }
})();
