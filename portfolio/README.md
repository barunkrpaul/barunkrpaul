# Portfolio site: Ujjal Kumar Das × Barun Kr Paul

*Two minds. One build.*

A fast, static site built with [Astro](https://astro.build). All the
interactions are plain TypeScript, about 31 KB of JavaScript in total.

## Run it on your computer

```
cd portfolio
npm install
npm run dev        # http://localhost:4321, updates as you edit
npm run build      # production site in dist/
npm run preview    # serve the production build
```

Node.js 18.20 or newer is needed.

## Where to change things

| To change… | Edit |
|---|---|
| Names under consideration, tagline, intro, bios, services, process, toolkit, numbers, contact email | `src/data/site.ts` |
| Projects and case studies (order, text, numbers, links, colours) | `src/data/projects.ts` |
| Colours, fonts, spacing | `src/styles/global.css` (tokens at the top) |
| The particle hero | `src/scripts/particles.ts` |
| Command menu (⌘K or `/`) | `src/components/CommandPalette.astro`, `src/scripts/palette.ts` |

### Choosing the name

All four names stay in `brands` in `src/data/site.ts`. The floating
**Name preview** switcher (bottom left) shows the whole site with each one.
When you decide:

1. Move the chosen name to the top of `brands`.
2. Set `showBrandSwitcher = false`.

### Adding a project

Add an entry to `projects` in `src/data/projects.ts`. The home page card
and the `/work/<slug>` case-study page are created from it automatically.
Covers are drawn in code (`cover: 'pulse' | 'phone' | 'dashboard' |
'papers'`).

## Pages

- `/`: hero, numbers, selected work, the duo, services, process, toolkit,
  contact brief builder
- `/work/gymlive-2026`, `/work/ipo-one`, `/work/avk`,
  `/work/question-paper-portal`: case studies
- `/404`: page not found

## Hosting

Not decided yet. The site is plain static files in `dist/`, so it works on
Vercel, Netlify, Cloudflare Pages, Firebase Hosting or GitHub Pages. After
you pick a domain, set `site` in `astro.config.mjs`.
