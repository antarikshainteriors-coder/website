# Antariksha Interiors — Website Files

This is the complete, self-contained source for your website: plain HTML, CSS and
JavaScript — no build tools, no framework, no server required. You can host it
anywhere that serves static files.

## What's in this folder

```
index.html              the whole page (structure + content)
styles.css               all styling (fonts, colors, layout, animations)
script.js                 nav menu, scroll animations, project photo galleries
galleries-data.js         the list of photos in each project's gallery
images/
  logo-icon.png            your brand mark
  majestique/01.jpg…19.jpg   Majestique Tower 1 gallery photos
  keshavanagar/01.jpg…26.jpg Keshavanagar Home gallery photos
```

Everything is relative — as long as these files stay in the same folder
structure, it will work exactly as it does now: same design, same fonts,
same scroll animations, same click-to-open photo galleries, same mobile layout.

## How to host it (free)

Any of these work well. Netlify is the easiest for a non-technical person.

**Netlify (easiest)**
1. Go to https://app.netlify.com/drop
2. Drag the whole `antariksha-interiors` folder (or a zip of it) onto the page.
3. Done — you get a free `something.netlify.app` link instantly. You can
   later add your own domain (e.g. antarikshainteriors.com) for free under
   Site settings → Domain management.

**GitHub Pages**
1. Create a new GitHub repository and upload all these files to it.
2. Go to Settings → Pages → set the source to the `main` branch, root folder.
3. Your site goes live at `https://yourusername.github.io/reponame`.
4. A custom domain can be added under the same Pages settings.

**Vercel / Cloudflare Pages**
Both work the same way as Netlify — drag-and-drop or connect a GitHub repo,
no configuration needed since this is a plain static site.

**Any regular web host (Hostinger, GoDaddy, etc.)**
Upload all these files (keeping the folder structure) into your hosting's
`public_html` (or equivalent) folder via their File Manager or FTP.

## How to add / replace photos yourself

- **Project gallery photos**: drop a new photo into `images/majestique/` or
  `images/keshavanagar/` (name it the next number, e.g. `20.jpg`), then open
  `galleries-data.js` and add `"images/majestique/20.jpg",` to that project's
  list. That's it — no other file needs to change.
- **The single photo shown on the homepage card**: that's always `01.jpg` in
  each project's folder. Replace that file (keep the same name) to change it.
- **A brand-new project**: this needs a new card added in `index.html` and a
  new list added in `galleries-data.js` — send me the photos and project
  details and I can do this in a couple of minutes, or if you're comfortable
  editing HTML, copy an existing `.project-card` block in `index.html` as a
  starting point.

## Notes

- Fonts (Fraunces & Outfit) load from Google Fonts over the internet — this
  is normal and free, just make sure your host allows outbound requests to
  fonts.googleapis.com (all the hosts above do, by default).
- The Google Reviews and Instagram/YouTube/WhatsApp links are unchanged from
  the live version.
- Total size is about 4.4 MB, almost entirely the real project photos.
