# Adding a text to the library

The site is one library root plus one folder per text:

| Path | Built by |
|---|---|
| `/` (home, `library.json`, `shared/`, sitemaps, redirects) | `~/Documents/gitagraph/granth-library/build.py` |
| `/gita/` | `~/Documents/gitagraph/gita-reader/build.py` |
| `/ashtavakra/` | `~/Documents/gitagraph/ashtavakra-reader/build.py` |

## Checklist for a new text (e.g. `upanishads`)
1. **Source and licence first.** The original text must come from a clearly public-domain or openly
   licensed edition (Sanskrit Wikisource, GRETIL, an old printed edition on archive.org). Record the
   source and licence in the text's About page and README. Translations are written fresh, never copied.
2. **Project folder.** Copy `ashtavakra-reader` as the template (`src/app.html`, `build.py`,
   `src/sw.template.js`, `src/static/`). Give it its own icon, accent colour, localStorage prefix and
   service-worker cache prefix (e.g. `upanishads-`), so nothing collides with the other texts.
3. **Build base path.** In its `build.py`: `SITE_URL = "https://gitagraph.com/upanishads/"` and
   `DEPLOY = ~/Documents/gitagraph/gitagraph.github.io/upanishads`. Every URL then derives from that, so
   the whole library can move domains by changing `SITE_URL` here and `SITE` in `granth-library/build.py`.
4. **Switcher include.** Its page head must load the shared switcher (the template already does):
   `<link rel="stylesheet" href="{ROOT}shared/library.css?v={stamp}">` and
   `<script src="{ROOT}shared/library.js?v={stamp}" defer></script>`, where `ROOT` is the library root ("/").
5. **library.json entry.** Add one entry in `granth-library/library.json` (id, path, names EN/HI, native
   title, one-line descriptions EN/HI, verse count, `"status": "live"`, accent colours). Other sites pick
   it up on their next visit; no need to rebuild them. Leave out `"featured"`: only the Gita carries
   `"featured": true`, which puts it first, full width, on the home page and at the top of the switcher,
   with every other text listed under "More texts / और ग्रंथ".
6. **Build and publish.** Run the text's `build.py`, then `granth-library/build.py` (which adds the
   text's sitemap to the root sitemap index), then commit and push from GitHub Desktop.

## Notes on texts already planned
- **Upanishads (next):** check for a public-domain source first, Sanskrit Wikisource and GRETIL before
  anything else, and record the licence. Decide which Upanishads count as "principal" (the usual list
  is the ten or so commented on by Shankara: Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya,
  Aitareya, Chandogya, Brihadaranyaka, sometimes with Shvetashvatara) and whether they form one site
  with a chapter per Upanishad. The two long ones (Chandogya, Brihadaranyaka) are mostly prose, so plan
  how a "verse" is numbered for them.

## Root files
`granth-library/rootfiles/` holds files that must sit at the site root unchanged: `CNAME` (the custom
domain gitagraph.com; deleting it takes the site back to gitagraph.github.io) and
`google41ee9a9fcb064592.html` (Google Search Console ownership check). The library build copies them on
every run; don't delete it, or Search Console loses verification. It is not in any sitemap.
