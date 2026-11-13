// Site shell: the one navigation every page shares. Five places, the same everywhere:
//   Home · Questions · Library · Map · Saved
// Static pages (home, the map, the documents) include this file and it mounts itself:
//   <script src="<root>shared/shell.js" data-active="home" defer></script>
// The readers inline it into app.js at build time (so it works offline) and call GGShell.nav()/tabs() themselves.
(function () {
  const script = document.currentScript;
  const IC = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>',
    questions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4"/><path d="M12 17v.5"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5.5c2.8-1 5.8-1 9 1v13c-3.2-2-6.2-2-9-1z"/><path d="M21 5.5c-2.8-1-5.8-1-9 1v13c3.2-2 6.2-2 9-1z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="2.6"/><circle cx="4.5" cy="6" r="1.8"/><circle cx="19.5" cy="6" r="1.8"/><circle cx="5" cy="18.5" r="1.8"/><circle cx="19" cy="18.5" r="1.8"/><path d="M6 7l4 3.500M18 7l-4 3.500M6.5 17.500l3.5-3.500M17.5 17.500L14 14"/></svg>',
    saved: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.500h11v17l-5.5-4-5.5 4z"/></svg>'
  };
  const ITEMS = [
    ["home", "", "Home", "होम"],
    ["questions", "gita/questions/", "Questions", "प्रश्न"],
    ["library", "#scriptures", "Library", "ग्रंथालय"],
    ["map", "explore/", "Map", "नक्शा"],
    ["saved", "saved/", "Saved", "सहेजे"]
  ];
  const MARK = '<svg class="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path class="ln" fill="none" stroke-width="1.7" stroke-linecap="round" d="M6.5 12.5C8.5 7.5 12 5.5 16 5.2C20 5.5 23.5 7.5 25.5 12.5M6.5 12.5C11 12.2 15 14.8 16 19.5M25.5 12.5C21 12.2 17 14.8 16 19.5"/><circle class="nd" cx="16" cy="5.2" r="3"/><circle class="nd" cx="6.5" cy="12.5" r="3"/><circle class="nd" cx="25.5" cy="12.5" r="3"/><circle class="nd" cx="16" cy="19.5" r="2.4"/><path class="bk" d="M1 26.2C6.5 24.4 12 24.8 14.6 27.4Q16 28.9 17.4 27.4C20 24.8 25.5 24.4 31 26.2L29.6 22C24.5 20.8 19.2 21.6 16.7 23.8Q16 24.4 15.3 23.8C12.8 21.6 7.5 20.8 2.4 22Z"/></svg>';

  // lang given ("en"/"hi"): one label. No lang: both, and the page's own .l-en/.l-hi rule shows the right one.
  const label = (it, lang) => lang ? (lang === "hi" ? it[3] : it[2]) : `<span class="l-en">${it[2]}</span><span class="l-hi">${it[3]}</span>`;
  const href = (it, root) => (root + it[1]) || "./";
  const cur = (it, active) => (it[0] === active ? ' aria-current="page"' : "");

  const GGShell = {
    // links for the desktop header
    nav(o) {
      return ITEMS.filter(it => it[0] !== "home").map(it =>
        `<a href="${href(it, o.root)}" data-g="${it[0]}"${cur(it, o.active)}>${label(it, o.lang)}</a>`).join("");
    },
    // the five phone tabs
    tabs(o) {
      return ITEMS.map(it =>
        `<a href="${href(it, o.root)}" data-g="${it[0]}"${cur(it, o.active)}><span class="gi">${IC[it[0]]}</span>${label(it, o.lang)}</a>`).join("");
    },
    // the brand lockup for the readers' desktop bar
    brand(root, lang) {
      return `<a class="brand" href="${root || "./"}" aria-label="Gitagraph">${MARK}<span class="nm">${lang === "hi" ? "गीताग्राफ़" : "Gitagraph"}</span></a>`;
    }
  };
  window.GGShell = GGShell;

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
})();
