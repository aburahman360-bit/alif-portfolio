# Muhammad Alif Izzuddin — Portfolio

A static, dependency-free portfolio site built from my CV.

```
index.html    markup and all content
styles.css    design tokens, layout, light/dark themes, print styles
script.js     theme toggle, mobile nav, scroll spy, reveal animations, counters
```

No build step, no frameworks. Open `index.html` in a browser to view it locally.

## Editing

All content lives in `index.html` — update the text there. Colours, spacing and
typography are controlled by the CSS custom properties at the top of `styles.css`
(`:root` for light, `[data-theme="dark"]` for dark).

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
