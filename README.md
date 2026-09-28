# Flex vs Blob

A weekly webcomic about the internal fight between muscle (Flex) and fat (Blob) inside Dan, a guy trying to get fit.

## Folder layout

```
index.html              Home page: latest episode + archive (builds itself from episodes.js)
episodes.js             The list of episodes. Add one line per new episode.
episodes/
  001-protein.html      Episode 1
  _template.html        Starting point for new episodes (not published)
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
5. Commit and push. GitHub Pages updates in about a minute.

The home page, archive and Previous/Next buttons update on their own.

## Hosting on GitHub Pages

Repository → Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)`.
The site appears at `https://<your-username>.github.io/<repo-name>/`.

## Preview locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and visit http://localhost:8000.

© 2026 Flex vs Blob. All rights reserved.
