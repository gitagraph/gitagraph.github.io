// Library switcher shared by every text site: an "All texts" menu in the top bar and an
// "Other texts" row at the bottom of the page, both built from <root>/library.json.
// The list is fetched fresh on each visit (falling back to the last copy seen), so a new text
// appears on every site without rebuilding them.  Include with:
//   <link rel="stylesheet" href="<root>shared/library.css">  <script src="<root>shared/library.js" defer></script>
(function () {
  const script = document.currentScript;
  const ROOT = new URL("../", script.src).pathname;          // .../shared/library.js -> library root
  const KEY = "library-json";
  const T = {
    en: { all: "All texts", other: "Other texts", soon: "Coming soon", home: "All texts →", verses: n => `${n} verses` },
    hi: { all: "सभी ग्रंथ", other: "अन्य ग्रंथ", soon: "जल्द आ रहा है", home: "सभी ग्रंथ →", verses: n => `${n} श्लोक` }
  };
  const L = () => ((document.documentElement.lang || "en").startsWith("hi") ? "hi" : "en");
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isHere = t => location.pathname.startsWith(ROOT + t.path);
  const name = t => (L() === "hi" ? t.name_hi : t.name_en);
  let lib = null;
  try { lib = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}

  const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>';

  function item(t) {
    const label = `<span class="lib-nat">${esc(t.native)}</span><span class="lib-nm">${esc(name(t))}</span>`;
    const style = `style="--lib-c:${esc(t.accent)};--lib-cd:${esc(t.accent_dark || t.accent)}"`;
    if (t.status !== "live") return `<span class="lib-item lib-soon" ${style} aria-disabled="true">${label}<span class="lib-tag">${esc(T[L()].soon)}</span></span>`;
    return `<a class="lib-item" ${style} href="${ROOT + t.path}" ${isHere(t) ? 'aria-current="page"' : ""}>${label}</a>`;
  }

  function button() {
    const top = document.querySelector(".top");
    if (!top) return;
    let b = document.getElementById("libbtn");
    if (!b) {
      b = document.createElement("button");
      b.id = "libbtn"; b.type = "button"; b.className = "ibtn lib-btn";
      b.setAttribute("aria-haspopup", "true"); b.setAttribute("aria-expanded", "false");
      top.insertBefore(b, document.getElementById("langbtn") || top.lastElementChild);
      b.addEventListener("click", e => { e.stopPropagation(); toggle(); });
    }
    b.innerHTML = `${ICON}<span class="lib-lab">${esc(T[L()].all)}</span>`;
    b.setAttribute("aria-label", T[L()].all);
  }

  function toggle(force) {
    let m = document.getElementById("libmenu");
    const open = force !== undefined ? force : !m;
    if (m) m.remove();
    const b = document.getElementById("libbtn");
    if (b) b.setAttribute("aria-expanded", String(open));
    if (!open || !lib) return;
    m = document.createElement("div");
    m.id = "libmenu"; m.className = "lib-menu"; m.setAttribute("role", "menu");
    m.innerHTML = `<p class="lib-h">${esc(T[L()].all)}</p>${lib.texts.map(item).join("")}<a class="lib-home" href="${ROOT}">${esc(T[L()].home)}</a>`;
    document.body.appendChild(m);
    // line the menu up under the button, kept inside the screen on narrow phones
    const r = b.getBoundingClientRect(), w = m.offsetWidth;
    m.style.top = `${r.bottom + 6}px`;
    m.style.left = `${Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8)}px`;
  }
  document.addEventListener("click", e => { const m = document.getElementById("libmenu"); if (m && !m.contains(e.target)) toggle(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
  window.addEventListener("resize", () => toggle(false));

  function footer() {
    const host = document.querySelector(".main") || document.body;
    let f = document.getElementById("libfoot");
    if (!f) { f = document.createElement("nav"); f.id = "libfoot"; f.className = "lib-foot"; host.appendChild(f); }
    const others = lib.texts.filter(t => !isHere(t));
    f.setAttribute("aria-label", T[L()].other);
    f.innerHTML = `<p class="lib-h">${esc(T[L()].other)}</p><div class="lib-row">${others.map(item).join("")}</div><a class="lib-home" href="${ROOT}">${esc(T[L()].home)}</a>`;
  }

  function draw() {
    if (!lib || !lib.texts) return;
    button(); footer();
    if (document.getElementById("libmenu")) toggle(true);
  }
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  draw();
  fetch(ROOT + "library.json", { cache: "no-cache" })
    .then(r => (r.ok ? r.json() : Promise.reject()))
    .then(j => { lib = j; try { localStorage.setItem(KEY, JSON.stringify(j)); } catch (e) {} draw(); })
    .catch(() => {});
})();
