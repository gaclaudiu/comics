# Flex vs Blob

A weekly  webcomic about the internal fight between muscle (Flex) and fat (Blob) inside Dan, a guy trying to get fit.

## Folder layout

```
index.html              Home page: latest episode + archive (builds itself from episodes.js)
episodes.js             The list of episodes. Add one line per new episode.
episodes/
  001-protein.html      Episode 1
  _template.html        Starting point for new episodes (not published)
images/og/              Link-preview images (1200×630) shown when an episode is shared
tools/build.py          Regenerates preview tags, sitemap.xml, feed.xml, robots.txt
sitemap.xml, feed.xml   For Google Search Console and RSS readers (generated)
shared/
  style.css             Comic look, fonts, animations
  characters.js         Flex, Blob, Dan and props, drawn once
  site.js               Prev/next buttons, archive, Replay button
```

## Publishing a new episode

1. Copy `episodes/_template.html` to `episodes/002-your-title.html`.
2. In the new file, set `data-episode="2"`, the `<title>`, and the episode line in the header.
3. Write the panels and dialogue.
4. Add a line to `episodes.js`:
   ```js
   { num: 2, title: "Your Title", file: "002-your-title.html", date: "2026-10-05", teaser: "One-line hook." },
   ```
5. Run `python tools/build.py` to refresh the link-preview tags, `sitemap.xml`, `feed.xml` and `robots.txt`.
6. Add a preview image at `images/og/<number>.png` (1200×630), e.g. `images/og/008.png`. Claude can render it for you.
7. Commit and push. GitHub Pages updates in about a minute.

The home page, archive and Previous/Next buttons update on their own.

## Hosting on GitHub Pages

Repository → Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)`.
The site appears at `https://<your-username>.github.io/<repo-name>/`.

## Preview locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and visit http://localhost:8000.

© 2026 Flex vs Blob. All rights reserved.
