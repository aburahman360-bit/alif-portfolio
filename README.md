# Muhammad Alif Izzuddin — Portfolio

A static, dependency-free portfolio site built from my CV. No build step, no
frameworks — open `index.html` in a browser to view it.

```
index.html                      markup, metadata and JSON-LD
styles.css                      cascade layers, themes, layout, print styles
script.js                       progressive-enhancement behaviour
favicon.svg                     monogram icon
site.webmanifest                installable-app metadata
Muhammad-Alif-Izzuddin-CV.pdf   linked by the "Download CV" button
```

## HTML

Semantic, valid HTML5 throughout: `<header>`/`<main>`/`<section>`/`<article>`/
`<address>`, `<time datetime>` on every date, `<dl>` for the stat and contact
pairs, `<data value>` for the animated counters, and `<abbr title>` on acronyms
(SDLC, UAT, MSSQL, ERP …) so the expansion is one hover or tap away.

The `<head>` carries a description, Open Graph and Twitter card tags, per-scheme
`theme-color`, a web app manifest and a `schema.org/Person` JSON-LD block, so
search engines and link previews get structured data rather than guesses.

## CSS

Written against modern CSS rather than workarounds:

| Feature | Used for |
| --- | --- |
| `@layer` | Cascade order: reset → tokens → base → layout → components → utilities |
| Native nesting | Grouping state and descendant rules with their component |
| `:has()` | The project filter and the open-menu header state — no JavaScript |
| Container queries | Project cards adapt to their own width, not the viewport |
| `subgrid` | Card headers, descriptions and tags line up across a row |
| `@property` | Typed custom property so the hero glow can animate smoothly |
| Scroll-driven animations | `animation-timeline: view()` / `scroll()` drive reveals and the progress bar |
| `clamp()` / `color-mix()` | Fluid type scale and palette derived from a single accent |
| Logical properties | `inline-size`, `margin-block`, `inset-inline` throughout |
| `text-wrap: balance` | Headings break evenly instead of leaving orphans |

Preference queries are respected: `prefers-color-scheme`,
`prefers-reduced-motion`, `prefers-contrast` and `prefers-reduced-transparency`.
A print stylesheet lays the page out for paper and spells out link targets.

### Theming

Colours live as custom properties on `:root` (light) and
`:root[data-theme="dark"]`. A tiny inline script in `<head>` applies the stored
or system theme before first paint, so there is no flash of the wrong palette.

## JavaScript

Every behaviour is progressive enhancement — with JS disabled a `<noscript>`
rule switches the reveal animations off and the page reads normally. Where the
browser supports scroll-driven CSS animations, the reveal and progress-bar work
is handed to CSS and the script does less.

## Editing

Content lives in `index.html`. To add a project, copy an `<article class="project">`
block and set `data-focus` to any of `government`, `integration`, `maintenance` —
the CSS filter picks it up automatically.

## Deploying to GitHub Pages

1. Create a new **public** repository on GitHub.
   - Name it `<your-username>.github.io` to serve at `https://<your-username>.github.io`
   - Or any name (e.g. `portfolio`) to serve at `https://<your-username>.github.io/portfolio/`

2. From this folder, push the files:

   ```bash
   git init -b main
   git add .
   git commit -m "Add portfolio site"
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → **Save**

4. Wait ~1 minute, then reload the Pages settings page for the live URL.

To update later: edit the files, then `git add . && git commit -m "Update" && git push`.

## Custom domain (optional)

Add a file named `CNAME` in this folder containing just your domain
(e.g. `alifizzuddin.com`), push it, then point a `CNAME` DNS record at
`<your-username>.github.io`.
