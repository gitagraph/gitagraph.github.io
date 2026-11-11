# Adding a text to the library

The site is one library root plus one folder per text:

| Path | Built by |
|---|---|
| `/` (home, `library.json`, `shared/`, sitemaps, redirects) | `~/Documents/granth-library/build.py` |
| `/gita/` | `~/Documents/gita-reader/build.py` |
| `/ashtavakra/` | `~/Documents/ashtavakra-reader/build.py` |

## Checklist for a new text (e.g. `sundarkand`)
1. **Source and licence first.** The original text must come from a clearly public-domain or openly
   licensed edition (Sanskrit Wikisource, GRETIL, an old printed edition on archive.org). Record the
   source and licence in the text's About page and README. Translations are written fresh, never copied.
2. **Project folder.** Copy `ashtavakra-reader` as the template (`src/app.html`, `build.py`,
   `src/sw.template.js`, `src/static/`). Give it its own icon, accent colour, localStorage prefix and
   service-worker cache prefix (e.g. `sundarkand-`), so nothing collides with the other texts.
3. **Build base path.** In its `build.py`: `SITE_URL = "https://gitagraph.github.io/sundarkand/"` and
   `DEPLOY = ~/Documents/GitHub/gitagraph.github.io/sundarkand`. Every URL then derives from that, so
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
- **Sundar Kand:** most texts online are Gita Press editions, which are copyrighted. Find a
  public-domain source (Wikisource, or a pre-1929 printed edition) before starting.
- **Shiv Purana:** about 24,000 verses across several samhitas. Plan it chapter by chapter, with the
  build and the per-verse pages split by samhita, and translations done in batches.

## Root files
`granth-library/rootfiles/` holds files that must sit at the site root unchanged, such as
`google41ee9a9fcb064592.html` (Google Search Console ownership check). The library build copies them on
every run; don't delete it, or Search Console loses verification. It is not in any sitemap.
