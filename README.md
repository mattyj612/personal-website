# Matthew Jordan — personal website

A small, no-build static site. Content lives in Markdown files, styling in one
CSS file, and the whole thing is configured from one JavaScript file. There is
**no build step and no framework** — just open the files or serve the folder.

## How it's organized

```
index.html            Homepage (title, intro, tile grid, socials)
page.html             Generic template that renders ANY sub-page
.nojekyll             Tells GitHub Pages to serve .md files as-is
css/
  style.css           All styling (+ where to enable Williams Caslon Text)
js/
  site.js             ← EDIT THIS: pages, tiles, bio, social links
  icons.js            Social icon SVGs
  home.js             Builds the homepage (rarely edited)
  page.js             Renders a markdown page (rarely edited)
content/
  about-me.md         ← EDIT THESE: one markdown file per sub-page
  walking-tours.md
  ...
assets/
  fonts/              Put Williams Caslon Text files here (see its README)
  photos/             Photos used inside pages
  tiles/              Square homepage tile images (named by slug)
```

## Everyday editing

- **Change page text:** edit the matching file in `content/`, e.g.
  `content/about-me.md`. Standard Markdown: `**bold**`, `*italics*`,
  `[links](https://…)`, lists, `## headings`, images.
- **Add an image to a page:** drop the file in `assets/photos/` and write
  `![Caption](assets/photos/name.jpg)`. The alt text becomes the caption.
  (Paths in markdown are relative to the site root, so no `../` is needed.)
- **Homepage intro / photo / social links / page list:** edit `js/site.js`.
- **Add a new page:** add an entry to `pages` in `js/site.js`, then create
  `content/<slug>.md`. (Optional square tile image: `assets/tiles/<slug>.jpg`.)
- **Point a tile to an external site:** add `url: "https://…"` to its entry in
  `js/site.js`.

## Preview locally

Because pages load Markdown with `fetch()`, opening `index.html` directly with
`file://` won't work in most browsers. Run a tiny local server instead:

```bash
cd personal_website
python3 -m http.server 8000
```

Then visit http://localhost:8000 . (Any static server works; the Python one
ships with macOS.)

## Deploy to GitHub Pages

1. Create a GitHub repo and push this folder to it.
2. Repo **Settings → Pages** → Source: *Deploy from a branch* → branch `main`,
   folder `/ (root)` → Save.
3. Your site appears at `https://<username>.github.io/<repo>/` shortly after.

All paths are relative and a `.nojekyll` file is included, so it works whether
the site is at a domain root or in a `/<repo>/` subpath.

## The typeface

The site ships using **Libre Caslon Text** (free) as a stand-in. To switch to
the real **Williams Caslon Text**, follow `assets/fonts/README.txt`.
