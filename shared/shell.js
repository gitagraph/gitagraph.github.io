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
    saved: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.500h11v17l-5.5-4-5.5 4z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>'
  };
  const ITEMS = [
    ["home", "", "Home", "होम"],
    ["questions", "gita/questions/", "Questions", "प्रश्न"],
    ["library", "#scriptures", "Library", "ग्रंथालय"],
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
      const sr = ["search", "search/", "Search verses, ideas, people", "श्लोक, विचार, पात्र खोजें"], lb = o.lang ? (o.lang === "hi" ? "खोजें" : "Search") : "Search";
      return `<a class="gsearch${o.icon ? " gs-m" : ""}" href="${o.root}search/" data-g="search" aria-label="${lb}"${cur(sr, o.active)}>${IC.search}<span>${label(sr, o.lang)}</span></a>`;
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
        n.insertAdjacentHTML("afterend", GGShell.search({ root, active, icon: true }));
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
