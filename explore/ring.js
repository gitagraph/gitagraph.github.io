"use strict";
// The Graph: every chapter of the three texts on one ring. The ring never moves; the centre changes with the view:
// Questions (life questions -> the verses and stories that answer them), Ideas (each text's own ideas -> its verses),
// Stories (Upanishad stories -> the Gita and Ashtavakra verses that echo them). Tap anything: it lights, the rest fades.
// Links come only from explicit references in the data; nothing is inferred from matching words.
(() => {
const $ = id => document.getElementById(id);
const NS = "http://www.w3.org/2000/svg";
let lang = "en";
try { const l = localStorage.getItem("gg-lang") || localStorage.getItem("library-lang"); if (l === "hi" || l === "en") lang = l; } catch (e) {}
let theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const T = {
 en: { title: "The Graph", sub: "Every chapter of the Bhagavad Gita, the Ashtavakra Gita and the Upanishads on one ring. Pick a question, an idea or a story to see what connects.",
  tabs: { q: "Questions", i: "Ideas", s: "Stories" }, names: { g: "Bhagavad Gita", a: "Ashtavakra Gita", u: "Upanishads" }, short: { g: "Gita", a: "Ashtavakra", u: "Upanishad" },
  qH: "What's on your mind?", qD: "Pick one to see where the Gita, the Ashtavakra Gita and the Upanishads answer it.",
  iH: "Ideas in the three texts", iD: "Each text names its own ideas. Pick one to light up every verse or story about it.",
  sH: "Upanishad stories, echoed", sD: "Each story is linked to the Gita and Ashtavakra verses that retell or answer it.",
  hint: "Or tap a chapter on the ring to see what connects to it.", question: "Question", idea: "Idea", chapter: "Chapter", verse: "Verse", story: "Story", path: "Reading path",
  readQ: "Read the full answer", read: "Read", readCh: "Read this chapter", readS: "Read the story", readP: "Open the path",
  conn: "Connections", qs: "Questions it answers", ideas: "Ideas", echoes: "Echoed in", cites: "Upanishad stories behind it",
  linked: "Linked in this view", none: "Nothing linked to this in the current view. Try another tab.", more: n => `+${n} more`, verses: n => `${n} verses`, stories: n => `${n} stories`,
  clear: "Clear", loading: "Loading…", ch: n => `Chapter ${n}`, steps: "Steps", theme: { light: "Theme: light", dark: "Theme: dark" }, langBtn: "हि", langLabel: "हिन्दी में देखें" },
 hi: { title: "ग्राफ़", sub: "भगवद्गीता, अष्टावक्र गीता और उपनिषदों का हर अध्याय एक घेरे पर। कोई प्रश्न, विचार या कथा चुनें और देखें कि क्या किससे जुड़ा है।",
  tabs: { q: "प्रश्न", i: "विचार", s: "कथाएँ" }, names: { g: "भगवद्गीता", a: "अष्टावक्र गीता", u: "उपनिषद्" }, short: { g: "गीता", a: "अष्टावक्र", u: "उपनिषद्" },
  qH: "मन में क्या है?", qD: "कोई प्रश्न चुनें और देखें कि गीता, अष्टावक्र गीता और उपनिषद् कहाँ उसका उत्तर देते हैं।",
  iH: "तीनों ग्रंथों के विचार", iD: "हर ग्रंथ अपने विचारों को अपने नाम देता है। कोई विचार चुनें और उससे जुड़े सभी श्लोक या कथाएँ देखें।",
  sH: "उपनिषदों की कथाएँ, गूँज के साथ", sD: "हर कथा उन गीता और अष्टावक्र श्लोकों से जुड़ी है जो उसे दोहराते हैं या उसका उत्तर देते हैं।",
  hint: "या घेरे पर कोई अध्याय छुएँ और देखें कि उससे क्या जुड़ा है।", question: "प्रश्न", idea: "विचार", chapter: "अध्याय", verse: "श्लोक", story: "कथा", path: "पठन-पथ",
  readQ: "पूरा उत्तर पढ़ें", read: "पढ़ें", readCh: "यह अध्याय पढ़ें", readS: "कथा पढ़ें", readP: "पथ खोलें",
  conn: "सूत्र", qs: "जिन प्रश्नों का उत्तर देता है", ideas: "विचार", echoes: "जहाँ गूँजती है", cites: "इसके पीछे की उपनिषद् कथाएँ",
  linked: "इस दृश्य में जुड़े", none: "इस दृश्य में इससे कुछ नहीं जुड़ा। कोई दूसरा टैब आज़माएँ।", more: n => `+${n} और`, verses: n => `${n} श्लोक`, stories: n => `${n} कथाएँ`,
  clear: "हटाएँ", loading: "लोड हो रहा है…", ch: n => `अध्याय ${n}`, steps: "चरण", theme: { light: "थीम: हल्की", dark: "थीम: गहरी" }, langBtn: "EN", langLabel: "Switch to English" }
};
const t = () => T[lang];
const L = (en, hi) => lang === "hi" ? (hi || en) : en;
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const short = s => { s = String(s || ""); const m = s.match(/^(.{40,150}?[.!?।])\s/); return m ? m[1] : (s.length > 150 ? s.slice(0, 147).replace(/\s+\S*$/, "") + "…" : s); };
const base = () => lang === "hi" ? "../hi/" : "../";

// ---------- data ----------
let GV = [], AV = [], GH = new Map(), AH = new Map(), QS = [], UD = {}, UP = [], ST = [], PATHS = [];
const units = [], U = new Map(), chaps = [], C = new Map();   // ring units (verses and stories) and chapters
let TOT = 0;
const R = 330, RH = 172;          // ring radius, hub radius
const views = {};                  // q / i / s -> {hubs, links}

function layout() {
  let pos = 0;
  // one chapter at a time; a short chapter is spread out to a minimum width so its number stays readable
  const seg = (t, list, keyOf, chapOf, chapMeta, w, gapIn, minW) => {
    const groups = [];
    list.forEach(x => { const ck = chapOf(x); if (!groups.length || groups[groups.length - 1].ck !== ck) groups.push({ ck, xs: [] }); groups[groups.length - 1].xs.push(x); });
    groups.forEach((g, gi) => {
      if (gi) pos += gapIn;
      const ww = Math.max(w, minW / g.xs.length);
      const c = { key: g.ck, t, start: pos, units: [], ...chapMeta(g.xs[0]) }; chaps.push(c); C.set(g.ck, c);
      g.xs.forEach(x => { const u = { key: keyOf(x), t, pos: pos + ww / 2, w: ww, d: x, ch: c }; units.push(u); U.set(u.key, u); c.units.push(u); pos += ww; });
      c.end = pos;
    });
  };
  const gch = new Map([...GH.values()].filter(h => h.type === "chapter").map(h => [h.num, h]));
  const ach = new Map([...AH.values()].filter(h => h.type === "chapter").map(h => [h.num, h]));
  seg("g", GV, v => `g:${v.c}.${v.v}`, v => "g" + v.c, v => ({ num: v.c, name: { en: gch.get(v.c)?.label, hi: gch.get(v.c)?.hl } }), 1, 3, 16);
  pos += 34;
  seg("a", AV, v => `a:${v.c}.${v.v}`, v => "a" + v.c, v => ({ num: v.c, name: { en: ach.get(v.c)?.label, hi: ach.get(v.c)?.hl } }), 1, 3, 16);
  pos += 34;
  const order = new Map(UP.map((u, i) => [u.id, i]));
  const sts = [...ST].sort((x, y) => (order.get(x.up) ?? 99) - (order.get(y.up) ?? 99));
  const upm = new Map(UP.map(u => [u.id, u]));
  seg("u", sts, s => `s:${s.id}`, s => "U:" + s.up, s => ({ num: (order.get(s.up) ?? 0) + 1, up: upm.get(s.up), name: { en: (upm.get(s.up)?.name_en || s.up).replace(/ Upanishad$/, ""), hi: (upm.get(s.up)?.name_hi || "").replace(/\s*(उपनिषद्|उपनिषद)$/, "").replace(/ोपनिषद्?$/, "") || upm.get(s.up)?.name_en } }), 9, 5, 9);
  pos += 34;
  TOT = pos;
}
const ang = p => -Math.PI / 2 + 2 * Math.PI * p / TOT;
const at = (p, r) => { const a = ang(p); return [r * Math.cos(a), r * Math.sin(a)]; };

function addView(id, hubs, links) {
  // place hubs on the inner circle in the order of where their links land, so lines cross as little as possible
  hubs.forEach(h => {
    let sx = 0, sy = 0; h.units.forEach(k => { const a = ang(U.get(k).pos); sx += Math.cos(a); sy += Math.sin(a); });
    h.mean = Math.atan2(sy, sx);
  });
  hubs.sort((a, b) => a.mean - b.mean);
  const off = hubs.length ? hubs[0].mean : 0;
  hubs.forEach((h, i) => { h.a = off + 2 * Math.PI * i / hubs.length; h.x = RH * Math.cos(h.a); h.y = RH * Math.sin(h.a); });
  views[id] = { hubs, links, hubBy: new Map(hubs.map(h => [h.id, h])) };
}

function buildViews() {
  const ok = k => U.has(k);
  // Questions: Gita verses, Ashtavakra items and Upanishad stories each question names
  const qh = QS.map(q => ({ id: "q:" + q.slug, kind: "q", cls: "q", q, name: { en: q.q_en, hi: q.q_hi },
    units: [...new Set([...(q.verses || []).map(r => "g:" + r), ...((q.av && q.av.items) || []).map(x => "a:" + x.ref), ...(q.up || []).map(s => "s:" + (s.id || s))].filter(ok))] })).filter(h => h.units.length);
  addView("q", qh, qh.flatMap(h => h.units.map(u => ({ h: h.id, u, t: U.get(u).t }))));
  // Ideas: each text's own most-used ideas, joined only to that text
  const top = (m, n) => [...m.entries()].sort((x, y) => y[1] - x[1]).slice(0, n).map(x => x[0]);
  const tagOf = (vs, H, types) => { const m = new Map(); vs.forEach(v => [...new Set([...(v.k || []), ...(v.p || [])])].forEach(id => { const h = H.get(id); if (h && types.includes(h.type)) m.set(id, (m.get(id) || 0) + 1); })); return m; };
  const ih = [];
  const verseHub = (t, id, H, vs) => { const h = H.get(id); ih.push({ id: `i:${t}:${id}`, kind: "i", cls: t, t, hid: id, h, name: { en: h.label, hi: h.hl }, desc: { en: h.desc, hi: h.hd }, units: vs.filter(v => (v.k || []).includes(id) || (v.p || []).includes(id)).map(v => `${t}:${v.c}.${v.v}`) }); };
  top(tagOf(GV, GH, ["concept", "path", "guna"]), 12).forEach(id => verseHub("g", id, GH, GV));
  top(tagOf(AV, AH, ["concept"]), 10).forEach(id => verseHub("a", id, AH, AV));
  const IDX = new Map((UD.ideas || []).map(i => [i.id, i])), uc = new Map();
  ST.forEach(s => (s.ideas || []).forEach(id => IDX.has(id) && uc.set(id, (uc.get(id) || 0) + 1)));
  top(uc, 11).forEach(id => { const h = IDX.get(id); ih.push({ id: `i:u:${id}`, kind: "i", cls: "u", t: "u", hid: id, h, name: { en: h.label, hi: h.label_hi }, desc: { en: h.desc_en, hi: h.desc_hi }, units: ST.filter(s => (s.ideas || []).includes(id)).map(s => "s:" + s.id) }); });
  ih.forEach(h => h.units = h.units.filter(ok));
  addView("i", ih, ih.flatMap(h => h.units.map(u => ({ h: h.id, u, t: h.t }))));
  // Stories: chords from each story to the verses it is echoed in
  const sl = [];
  ST.forEach(s => { [["g", s.gita], ["a", s.ashtavakra]].forEach(([t, refs]) => (refs || []).forEach(r => ok(`${t}:${r}`) && sl.push({ h: "s:" + s.id, u: `${t}:${r}`, t }))); });
  addView("s", [], sl);
}

// ---------- drawing ----------
const svg = $("ring");
const el = (name, attrs, parent) => { const e = document.createElementNS(NS, name); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
let gLinks, gHubs, gPath, view = "q", sel = null;
const tickEl = new Map(), arcEl = new Map(), numEl = new Map(), nameEl = new Map();

const LIFT = 7;
const liftOf = c => { const a = ang((c.start + c.end) / 2); return `--dx:${(LIFT * Math.cos(a)).toFixed(2)}px;--dy:${(LIFT * Math.sin(a)).toFixed(2)}px`; };
const chapEls = new Map();   // chapter key -> its ticks, arc and labels (moved together on hover/select)
function drawRing() {
  svg.textContent = ""; chapEls.clear();
  gLinks = el("g", {}, svg);
  const gRing = el("g", {}, svg);
  units.forEach(u => {
    const r1 = R + 3, r2 = u.t === "u" ? R + 3.01 : R + 14;
    const [x1, y1] = at(u.pos, r1), [x2, y2] = at(u.pos, r2);
    const e = el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), class: `tk ${u.t}${u.t === "u" ? " st" : ""}` }, gRing);
    tickEl.set(u.key, e); e.setAttribute("style", liftOf(u.ch));
    if (!chapEls.has(u.ch.key)) chapEls.set(u.ch.key, []); chapEls.get(u.ch.key).push(e);
  });
  chaps.forEach(c => {
    const a0 = ang(c.start), a1 = ang(c.end), r = R - 4;
    const big = a1 - a0 > Math.PI ? 1 : 0;
    arcEl.set(c.key, el("path", { d: `M${(r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}A${r} ${r} 0 ${big} 1 ${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)}`, class: `ch-arc ${c.t}` }, gRing));
    const mid = (c.start + c.end) / 2;
    const [nx, ny] = at(mid, R + 30);
    numEl.set(c.key, el("text", { x: nx.toFixed(1), y: ny.toFixed(1), class: "ch-n" }, gRing));
    const a = ang(mid), deg = a * 180 / Math.PI, left = Math.cos(a) < 0;
    const [mx, my] = at(mid, R + 24);
    nameEl.set(c.key, el("text", { x: mx.toFixed(1), y: my.toFixed(1), class: "ch-nm", transform: `rotate(${(left ? deg + 180 : deg).toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)})`, "text-anchor": left ? "end" : "start" }, gRing));
    // labels sit in a wrapper so the lift (a CSS translate) never fights the rotate attribute
    [arcEl.get(c.key), numEl.get(c.key)].forEach(e => e.setAttribute("style", liftOf(c)));
    const w = el("g", { class: "nmw", style: liftOf(c) }, gRing), z = el("g", { class: "nmz", style: `transform-origin:${mx.toFixed(1)}px ${my.toFixed(1)}px` }, w); z.appendChild(nameEl.get(c.key));
    chapEls.get(c.key).push(arcEl.get(c.key), numEl.get(c.key), w);
  });
  gPath = el("g", {}, svg);
  gHubs = el("g", {}, svg);
  words();
}
const clip = s => { s = String(s || ""); return s.length > 28 ? s.slice(0, 27).replace(/\s+\S*$/, "") + "…" : s; };
function chName(c) {
  const nm = L(c.name.en, c.name.hi) || "";
  return nm.length > 30 ? nm.slice(0, 29).replace(/\s+\S*$/, "") + "…" : nm;
}
function words() {
  chaps.forEach(c => { numEl.get(c.key).textContent = c.t === "u" ? "" : c.num; nameEl.get(c.key).textContent = (c.t === "u" ? "" : c.num + "  ") + chName(c); });
  document.documentElement.lang = lang;
  $("rg-title").textContent = t().title; $("rg-sub").textContent = t().sub;
  $("tabs").innerHTML = ["q", "i", "s"].map(v => `<button role="tab" type="button" data-v="${v}" aria-selected="${v === view}">${esc(t().tabs[v])}</button>`).join("");
  $("legend").innerHTML = ["g", "a", "u"].map(k => `<span><i style="background:var(--c${k})"></i>${esc(t().names[k])}</span>`).join("");
  $("lang").textContent = t().langBtn; $("lang").setAttribute("aria-label", t().langLabel);
  const tb = $("themebtn"), lbl = t().theme[theme];
  tb.innerHTML = theme === "dark" ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/></svg>' : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  tb.setAttribute("aria-label", lbl); tb.title = lbl;
  if (views[view]) views[view].hubs.forEach(h => { if (h.te) h.te.textContent = clip(L(h.name.en, h.name.hi)); });
}

let linkEls = [], byEnd = new Map();
function drawView() {
  gLinks.textContent = ""; gHubs.textContent = ""; linkEls = []; byEnd = new Map(); hov = null;
  const V = views[view];
  V.links.forEach((l, i) => [l.h, l.u].forEach(k => { if (!byEnd.has(k)) byEnd.set(k, []); byEnd.get(k).push(i); }));
  V.links.forEach(l => {
    const u = U.get(l.u); const [ux, uy] = at(u.pos, R - 2);
    let d;
    if (view === "s") { const s = U.get(l.h); const [sx, sy] = at(s.pos, R - 2); d = `M${sx.toFixed(1)} ${sy.toFixed(1)}Q${((sx + ux) * 0.12).toFixed(1)} ${((sy + uy) * 0.12).toFixed(1)} ${ux.toFixed(1)} ${uy.toFixed(1)}`; }
    else { const h = V.hubBy.get(l.h); d = `M${h.x.toFixed(1)} ${h.y.toFixed(1)}Q${((h.x + ux) * 0.42).toFixed(1)} ${((h.y + uy) * 0.42).toFixed(1)} ${ux.toFixed(1)} ${uy.toFixed(1)}`; }
    linkEls.push(el("path", { d, class: `lk ${l.t}` }, gLinks));
  });
  V.hubs.forEach(h => {
    const g = el("g", { class: "hub" }, gHubs);
    el("circle", { cx: h.x.toFixed(1), cy: h.y.toFixed(1), r: 6.5, class: h.cls }, g);
    const right = Math.cos(h.a) >= 0;
    h.te = el("text", { x: (h.x + (right ? 12 : -12)).toFixed(1), y: h.y.toFixed(1), "text-anchor": right ? "start" : "end" }, g);
    h.te.textContent = clip(L(h.name.en, h.name.hi)); h.g = g;
    g.setAttribute("tabindex", "0"); g.setAttribute("role", "button"); g.setAttribute("aria-label", L(h.name.en, h.name.hi));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); popNext = h.id; go(hashOf({ type: "hub", id: h.id })); } });
    g.addEventListener("focus", () => hover({ type: "hub", id: h.id })); g.addEventListener("blur", () => hover(null));
  });
}

// ---------- selection ----------
function litFor(s) {
  const V = views[view], lit = { units: new Set(), links: new Set(), hubs: new Set(), chaps: new Set() };
  if (!s) return null;
  const addLinks = pred => V.links.forEach((l, i) => { if (pred(l)) { lit.links.add(i); lit.units.add(l.u); if (view === "s") lit.units.add(l.h); else lit.hubs.add(l.h); } });
  if (s.type === "hub") { const h = V.hubBy.get(s.id); if (h) { lit.hubs.add(h.id); h.units.forEach(u => lit.units.add(u)); addLinks(l => l.h === h.id); } }
  else if (s.type === "tag") s.units.forEach(u => lit.units.add(u));
  else if (s.type === "unit") { lit.units.add(s.key); addLinks(l => l.u === s.key || l.h === s.key); }
  else if (s.type === "chap") { const c = C.get(s.key); lit.chaps.add(s.key); c.units.forEach(u => lit.units.add(u.key)); const ks = new Set(c.units.map(u => u.key)); addLinks(l => ks.has(l.u) || ks.has(l.h)); }
  else if (s.type === "path") s.units.forEach(u => lit.units.add(u));
  lit.units.forEach(k => { const u = U.get(k); if (u) lit.chaps.add(u.ch.key); });
  return lit;
}
function paint() {
  const lit = litFor(sel);
  svg.classList.toggle("dim", !!lit);
  tickEl.forEach((e, k) => e.classList.toggle("on", !!lit && lit.units.has(k)));
  arcEl.forEach((e, k) => e.classList.toggle("on", !!lit && (lit.chaps.has(k))));
  numEl.forEach((e, k) => e.classList.toggle("on", !!lit && lit.chaps.has(k)));
  nameEl.forEach((e, k) => e.classList.toggle("on", !!lit && lit.chaps.has(k)));
  linkEls.forEach((e, i) => e.classList.toggle("on", !!lit && lit.links.has(i)));
  views[view].hubs.forEach(h => h.g.classList.toggle("on", !!lit && lit.hubs.has(h.id)));
  chapEls.forEach((list, k) => list.forEach(e => e.classList.toggle("lift", !!sel && sel.type === "chap" && sel.key === k)));
  if (popNext) { const h = views[view].hubBy.get(popNext); if (h) { h.g.classList.remove("pop"); void h.g.getBBox(); h.g.classList.add("pop"); } popNext = null; }
  gPath.textContent = "";
  if (sel && sel.type === "path") {
    const pts = sel.units.map(k => at(U.get(k).pos, R - 14));
    if (pts.length > 1) { let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; d += `Q${((x0 + x1) * 0.3).toFixed(1)} ${((y0 + y1) * 0.3).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`; } el("path", { d, class: "pathline" }, gPath); }
    pts.forEach(([x, y], i) => { const g = el("g", { class: "pnum" }, gPath); el("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 10 }, g); el("text", { x: x.toFixed(1), y: y.toFixed(1) }, g).textContent = i + 1; });
  }
  panel(lit);
}

// ---------- panel ----------
const colVar = k => `var(--c${k === "q" ? "g" : k})`;
const hrefUnit = u => u.t === "u" ? `${base()}upanishads/story/${encodeURIComponent(u.d.id)}/` : `${base()}${u.t === "g" ? "gita" : "ashtavakra"}/chapter/${u.d.c}/verse/${u.d.v}/`;
const hrefChap = c => c.t === "u" ? `${base()}upanishads/upanishad/${encodeURIComponent(c.up.id)}/` : `${base()}${c.t === "g" ? "gita" : "ashtavakra"}/chapter/${c.num}/`;
const unitTitle = u => u.t === "u" ? L(u.d.title_en, u.d.title_hi) : `${t().short[u.t]} ${u.d.c}.${u.d.v}`;
const unitHash = u => u.t === "u" ? `#/u/story/${encodeURIComponent(u.d.id)}` : `#/${u.t}/${u.d.c}/${u.d.v}`;
const chapHash = c => c.t === "u" ? `#/u/text/${encodeURIComponent(c.up.id)}` : `#/${c.t}/${c.num}`;
function rows(keys, cap = 12) {
  const out = [], by = { g: [], a: [], u: [] };
  [...keys].map(k => U.get(k)).filter(Boolean).sort((x, y) => x.pos - y.pos).forEach(u => by[u.t].push(u));
  ["g", "a", "u"].forEach(k => {
    const list = by[k]; if (!list.length) return;
    out.push(`<h3 style="--c:${colVar(k)}"><i></i>${esc(t().names[k])} · ${list.length}</h3>`);
    list.slice(0, cap).forEach(u => out.push(`<a class="row" style="--c:${colVar(k)}" href="${unitHash(u)}"><b>${esc(u.t === "u" ? t().story : `${u.d.c}.${u.d.v}`)}</b><span>${esc(u.t === "u" ? L(u.d.title_en, u.d.title_hi) : short(L(u.d.en, u.d.hi)))}</span>${u.t === "u" ? `<small>${esc(L(u.d.hook_en, u.d.hook_hi))}</small>` : ""}</a>`));
    if (list.length > cap) out.push(`<p class="more">${esc(t().more(list.length - cap))}</p>`);
  });
  return out.join("");
}
const hubChip = h => `<a class="chip" style="--c:${colVar(h.cls)}" href="${h.kind === "q" ? `#/q/${encodeURIComponent(h.q.slug)}` : `#/i/${h.t}/${encodeURIComponent(h.hid)}`}">${h.kind === "i" ? "<i></i>" : ""}${esc(L(h.name.en, h.name.hi))}</a>`;
const head = (eb, c, title, closable = true) => `${closable ? `<button class="x" type="button" data-clear aria-label="${esc(t().clear)}">×</button>` : ""}<div class="eb" style="--c:${c}"><i></i>${esc(eb)}</div><h2>${esc(title)}</h2>`;
function panel(lit) {
  const P = $("panel"), V = views[view];
  if (!sel) {
    let h;
    if (view === "q") h = head(t().tabs.q, "var(--ink)", t().qH, false) + `<p class="d">${esc(t().qD)}</p><div class="chips" style="margin-top:14px">${V.hubs.slice().sort((a, b) => QS.indexOf(a.q) - QS.indexOf(b.q)).map(hubChip).join("")}</div>`;
    else if (view === "i") h = head(t().tabs.i, "var(--ink)", t().iH, false) + `<p class="d">${esc(t().iD)}</p>` + ["g", "a", "u"].map(k => `<h3 style="--c:${colVar(k)}"><i></i>${esc(t().names[k])}</h3><div class="chips">${V.hubs.filter(x => x.t === k).map(hubChip).join("")}</div>`).join("");
    else h = head(t().tabs.s, "var(--ink)", t().sH, false) + `<p class="d">${esc(t().sD)}</p>` + chaps.filter(c => c.t === "u").map(c => `<h3 style="--c:var(--cu)"><i></i>${esc(L(c.up?.name_en, c.up?.name_hi))}</h3><div class="chips">${c.units.map(u => `<a class="chip" href="${unitHash(u)}">${esc(L(u.d.title_en, u.d.title_hi))}</a>`).join("")}</div>`).join("");
    P.innerHTML = h + `<p class="more" style="margin-top:18px">${esc(t().hint)}</p>`; return;
  }
  let h = "";
  if (sel.type === "hub") {
    const x = V.hubBy.get(sel.id);
    if (x.kind === "q") h = head(t().question, "var(--ink)", L(x.q.q_en, x.q.q_hi)) + `<p class="d">${esc(L(x.q.intro_en, x.q.intro_hi))}</p><a class="btn" href="${base()}gita/questions/${encodeURIComponent(x.q.slug)}/">${esc(t().readQ)}</a>` + rows(x.units);
    else h = head(`${t().idea} · ${t().names[x.t]}`, colVar(x.t), L(x.name.en, x.name.hi)) + (x.desc && L(x.desc.en, x.desc.hi) ? `<p class="d">${esc(L(x.desc.en, x.desc.hi))}</p>` : "") + rows(x.units);
  } else if (sel.type === "tag") {
    h = head(`${t().idea} · ${t().names[sel.t]}`, colVar(sel.t), sel.name) + (sel.desc ? `<p class="d">${esc(sel.desc)}</p>` : "") + rows(sel.units);
  } else if (sel.type === "chap") {
    const c = C.get(sel.key);
    const title = c.t === "u" ? L(c.up?.name_en, c.up?.name_hi) : `${t().ch(c.num)} · ${L(c.name.en, c.name.hi)}`;
    h = head(t().names[c.t], colVar(c.t), title) + `<p class="d">${esc(c.t === "u" ? t().stories(c.units.length) : t().verses(c.units.length))}</p><a class="btn" href="${hrefChap(c)}">${esc(t().readCh)}</a>`;
    const ks = new Set(c.units.map(u => u.key));
    if (view === "s") { const other = new Set([...lit.units].filter(k => !ks.has(k))); h += other.size ? `<h3>${esc(t().linked)}</h3>` + rows(other) : `<p class="more">${esc(t().none)}</p>`; }
    else { const hs = V.hubs.filter(x => lit.hubs.has(x.id)); h += hs.length ? `<h3>${esc(t().linked)}</h3><div class="chips">${hs.map(hubChip).join("")}</div>` : `<p class="more">${esc(t().none)}</p>`; }
    if (c.t !== "u") h += `<h3>${esc(t().verse)}</h3>` + c.units.slice(0, 60).map(u => `<a class="row" style="--c:${colVar(c.t)}" href="${unitHash(u)}"><b>${u.d.c}.${u.d.v}</b><span>${esc(short(L(u.d.en, u.d.hi)))}</span></a>`).join("") + (c.units.length > 60 ? `<p class="more">${esc(t().more(c.units.length - 60))}</p>` : "");
    else h += c.units.map(u => `<a class="row" style="--c:var(--cu)" href="${unitHash(u)}"><b>${esc(t().story)}</b><span>${esc(L(u.d.title_en, u.d.title_hi))}</span></a>`).join("");
  } else if (sel.type === "unit") {
    const u = U.get(sel.key);
    h = head(u.t === "u" ? `${t().story} · ${L(u.ch.up?.name_en, u.ch.up?.name_hi)}` : `${t().names[u.t]} · ${t().verse}`, colVar(u.t), unitTitle(u));
    h += `<p class="d">${esc(u.t === "u" ? L(u.d.hook_en, u.d.hook_hi) : L(u.d.en, u.d.hi))}</p><a class="btn" href="${hrefUnit(u)}">${esc(u.t === "u" ? t().readS : t().read)}</a>`;
    h += `<h3>${esc(t().conn)}</h3>`;
    const qs = views.q.hubs.filter(x => x.units.includes(u.key));
    if (qs.length) h += `<h3>${esc(t().qs)}</h3><div class="chips">${qs.map(hubChip).join("")}</div>`;
    const ids = views.i.hubs.filter(x => x.units.includes(u.key));
    if (ids.length) h += `<h3>${esc(t().ideas)}</h3><div class="chips">${ids.map(hubChip).join("")}</div>`;
    if (u.t === "u") { const ec = views.s.links.filter(l => l.h === u.key).map(l => l.u); if (ec.length) h += `<h3>${esc(t().echoes)}</h3>` + rows(ec); }
    else { const cs = views.s.links.filter(l => l.u === u.key).map(l => l.h); if (cs.length) h += `<h3>${esc(t().cites)}</h3>` + rows(cs); }
    if (!qs.length && !ids.length && !views.s.links.some(l => l.u === u.key || l.h === u.key)) h += `<p class="more">${esc(t().none)}</p>`;
  } else if (sel.type === "path") {
    const p = sel.p;
    h = head(t().path, "var(--ink)", L(p.title_en, p.title_hi)) + `<p class="d">${esc(L(p.frame_en || p.note_en, p.frame_hi || p.note_hi))}</p><a class="btn" href="${base()}paths/${encodeURIComponent(p.slug)}/">${esc(t().readP)}</a><h3>${esc(t().steps)}</h3>` +
      sel.units.map((k, i) => { const u = U.get(k); return `<a class="row" style="--c:${colVar(u.t)}" href="${unitHash(u)}"><b>${i + 1}</b><span>${esc(unitTitle(u))}</span></a>`; }).join("");
  }
  P.innerHTML = h;
}

// ---------- routing ----------
function parse(hash) {
  const p = (hash || "").replace(/^#\/?/, "").split("/").filter(Boolean).map(s => { try { return decodeURIComponent(s); } catch (e) { return s; } });
  const keep = v => ({ v: v || view, s: null });
  if (!p.length) return keep();
  if (p[0] === "view" && views[p[1]]) return { v: p[1], s: null };
  if (p[0] === "q") { const h = views.q.hubBy.get("q:" + p[1]); return h ? { v: "q", s: { type: "hub", id: h.id } } : keep("q"); }
  if (p[0] === "i" && p[2]) {
    const h = views.i.hubBy.get(`i:${p[1]}:${p[2]}`); if (h) return { v: "i", s: { type: "hub", id: h.id } };
    // any other idea or person: light every verse tagged with it
    const vs = p[1] === "g" ? GV : p[1] === "a" ? AV : null, H = p[1] === "g" ? GH : AH;
    if (vs) { const hb = H.get(p[2]); const us = vs.filter(v => (v.k || []).includes(p[2]) || (v.p || []).includes(p[2])).map(v => `${p[1]}:${v.c}.${v.v}`); if (us.length) return { v: "i", s: { type: "tag", t: p[1], units: us, name: hb ? L(hb.label, hb.hl) : p[2], desc: hb ? L(hb.desc, hb.hd) : "" } }; }
    if (p[1] === "u") { const id = (UD.ideas || []).find(x => x.id === p[2]); const us = ST.filter(s => (s.ideas || []).includes(p[2])).map(s => "s:" + s.id); if (us.length) return { v: "i", s: { type: "tag", t: "u", units: us, name: id ? L(id.label, id.label_hi) : p[2], desc: id ? L(id.desc_en, id.desc_hi) : "" } }; }
    return keep("i");
  }
  if (p[0] === "u") {
    if (p[1] === "text" && C.has("U:" + p[2])) return { v: view, s: { type: "chap", key: "U:" + p[2] } };
    const id = (p[1] === "story" || p[1] === "passage") ? p[2] : p[1];
    if (U.has("s:" + id)) return { v: p[1] === "story" || p[1] === "passage" ? "s" : view, s: { type: "unit", key: "s:" + id } };
    return keep();
  }
  if ((p[0] === "g" || p[0] === "a") && p[1]) {
    if (p[2] && U.has(`${p[0]}:${p[1]}.${p[2]}`)) return { v: view, s: { type: "unit", key: `${p[0]}:${p[1]}.${p[2]}` } };
    if (C.has(p[0] + p[1])) return { v: view, s: { type: "chap", key: p[0] + p[1] } };
  }
  if (p[0] === "p") {
    const P = PATHS.find(x => x.slug === p[1]);
    if (P) { const us = []; (P.steps || []).forEach(st => { const k = st.t === "u" ? "s:" + (st.story || st.ref) : `${st.t}:${st.ref}`; if (U.has(k) && us[us.length - 1] !== k) us.push(k); }); if (us.length) return { v: view, s: { type: "path", p: P, units: us } }; }
  }
  return keep();
}
function hashOf(s) {
  if (!s) return `#/view/${view}`;
  if (s.type === "hub") { const h = views[view].hubBy.get(s.id); return h.kind === "q" ? `#/q/${encodeURIComponent(h.q.slug)}` : `#/i/${h.t}/${encodeURIComponent(h.hid)}`; }
  if (s.type === "unit") return unitHash(U.get(s.key));
  if (s.type === "chap") return chapHash(C.get(s.key));
  return location.hash;
}
function go(hash) { if (location.hash === hash) apply(); else location.hash = hash; }
function apply() {
  const r = parse(location.hash);
  const changed = r.v !== view; view = r.v; sel = r.s;
  if (changed || !linkEls.length) { drawView(); }
  [...$("tabs").children].forEach(b => b.setAttribute("aria-selected", String(b.dataset.v === view)));
  paint();
  // on a phone the panel sits under the ring: after a pick from the panel, bring the lit ring back into view
  if (fromPanel && innerWidth <= 900) { fromPanel = false; document.querySelector(".rg-stage").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); }
  fromPanel = false;
}

// ---------- pointer ----------
let lastNarrow = false;
function toSvg(e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
function hit(e) {
  const { x, y } = toSvg(e), r = Math.hypot(x, y), narrow = svg.getBoundingClientRect().width < 600;
  lastNarrow = narrow;
  if (r > R - 30 && r < R + 260) {
    let a = Math.atan2(y, x) + Math.PI / 2; if (a < 0) a += 2 * Math.PI;
    const p = a / (2 * Math.PI) * TOT;
    let best = null, bd = 1e9; for (const u of units) { let d = Math.abs(u.pos - p); d = Math.min(d, TOT - d); if (d < bd) { bd = d; best = u; } }
    if (!best || bd > best.w / 2 + 3) return null;
    if (narrow || r > R + 24) return { type: "chap", key: best.ch.key };
    if (best.t === "u" || bd <= 2) return { type: "unit", key: best.key };
    return { type: "chap", key: best.ch.key };
  }
  if (r <= R - 30) {
    const tol = narrow ? 46 : 22; let best = null, bd = tol;
    for (const h of views[view].hubs) { const d = Math.hypot(h.x - x, h.y - y); if (d < bd) { bd = d; best = h; } }
    if (best) return { type: "hub", id: best.id };
  }
  return null;
}
let down = null;
svg.addEventListener("pointerdown", e => { down = { x: e.clientX, y: e.clientY }; });
svg.addEventListener("pointerup", e => {
  if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8) { down = null; return; }
  down = null;
  const h = hit(e);
  const same = h && sel && h.type === sel.type && (h.key || h.id) === (sel.key || sel.id);
  if (h && !same && h.type === "hub") popNext = h.id;
  go(h && !same ? hashOf(h) : `#/view/${view}`);
});
let hov = null, popNext = null;
function hover(h) {
  const key = h ? h.type + ":" + (h.key || h.id) : null;
  if (key === (hov && hov.k)) return;
  if (hov) { hov.els.forEach(([e, c]) => e.classList.remove(c)); hov.undo.forEach(f => f()); }
  hov = null; if (!h) return;
  const els = [], undo = [], add = (e, c) => { if (e) { e.classList.add(c); els.push([e, c]); if (e.classList.contains("nmw")) e.parentNode.appendChild(e); } };   // a growing label is drawn on top of its neighbours
  const pv = k => (byEnd.get(k) || []).forEach(i => add(linkEls[i], "pv"));
  if (h.type === "hub") { const x = views[view].hubBy.get(h.id); add(x.g, "hov"); pv(h.id); }
  else if (h.type === "chap") { (chapEls.get(h.key) || []).forEach(e => add(e, "hov")); C.get(h.key).units.forEach(u => pv(u.key)); }
  else {
    const u = U.get(h.key), c = u.ch; add(tickEl.get(h.key), "hov"); pv(h.key);
    [arcEl.get(c.key), numEl.get(c.key), nameEl.get(c.key).parentNode.parentNode].forEach(e => add(e, "hov"));
    const ne = nameEl.get(c.key), was = ne.textContent;
    ne.textContent = u.t === "u" ? clip(L(u.d.title_en, u.d.title_hi)) : `${u.d.c}.${u.d.v}  ${chName(c)}`;
    undo.push(() => { ne.textContent = was; });
  }
  hov = { k: key, els, undo };
}
const tip = $("tip");
svg.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse") return;
  const h = hit(e);
  hover(h); return;
  if (!h || h.type === "hub") { tip.hidden = true; return; }
  let txt;
  if (h.type === "hub") { const x = views[view].hubBy.get(h.id); txt = `<b>${esc(L(x.name.en, x.name.hi))}</b>`; }
  else if (h.type === "chap") { const c = C.get(h.key); txt = `<b>${esc(t().names[c.t])}</b> · ${esc(c.t === "u" ? L(c.up?.name_en, c.up?.name_hi) : t().ch(c.num) + " · " + L(c.name.en, c.name.hi))}`; }
  else { const u = U.get(h.key); txt = `<b>${esc(unitTitle(u))}</b>${u.t !== "u" ? ` · ${esc(L(u.ch.name.en, u.ch.name.hi))}` : ""}`; }
  const box = $("ring").parentElement.getBoundingClientRect();
  tip.innerHTML = txt; tip.hidden = false; tip.style.left = (e.clientX - box.left) + "px"; tip.style.top = (e.clientY - box.top) + "px";
});
svg.addEventListener("pointerleave", () => { tip.hidden = true; hover(null); });
let fromPanel = false;
document.addEventListener("click", e => {
  const a = e.target.closest("#panel a[href^='#']");
  if (a) { fromPanel = true; const m = a.getAttribute("href").match(/^#\/(q)\/(.+)$|^#\/i\/(\w)\/(.+)$/); if (m) popNext = m[1] ? "q:" + decodeURIComponent(m[2]) : `i:${m[3]}:${decodeURIComponent(m[4])}`; }
  if (e.target.closest("[data-clear]")) { go(`#/view/${view}`); return; }
  const b = e.target.closest("#tabs button"); if (b) go(`#/view/${b.dataset.v}`);
});
addEventListener("hashchange", apply);
$("lang").onclick = () => { lang = lang === "hi" ? "en" : "hi"; try { localStorage.setItem("gg-lang", lang); localStorage.setItem("library-lang", lang); } catch (e) {} words(); paint(); };
$("themebtn").onclick = () => { theme = theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = theme; try { localStorage.setItem("gg-theme", theme); } catch (e) {} words(); };

function fit() { const narrow = svg.parentElement.getBoundingClientRect().width < 600; svg.setAttribute("viewBox", narrow ? "-392 -392 784 784" : "-560 -560 1120 1120"); }
addEventListener("resize", fit);
// ---------- load ----------
const J = u => fetch(u).then(r => { if (!r.ok) throw new Error(u); return r.json(); });
$("loading").textContent = t().loading;
Promise.all([J("../gita/verses.json"), J("../gita/hubs.json"), J("../gita/questions.json"), J("../ashtavakra/verses.json"), J("../ashtavakra/hubs.json"), J("../upanishads/data.json"), fetch("../paths/paths.json").then(r => r.ok ? r.json() : []).catch(() => [])])
 .then(([gv, gh, qs, av, ah, ud, pp]) => {
   GV = gv; AV = av; QS = qs; UD = ud; UP = ud.upanishads || []; ST = ud.stories || []; PATHS = Array.isArray(pp) ? pp : [];
   GH = new Map(gh.map(h => [h.id, h])); AH = new Map(ah.map(h => [h.id, h]));
   layout(); buildViews(); fit(); drawRing(); $("loading").remove(); apply();
 })
 .catch(err => { $("loading").textContent = "Could not load the Graph. Please refresh."; console.error(err); });
})();
