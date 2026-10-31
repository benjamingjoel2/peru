# Discover Peru Travel

Private, well-paced Peru journeys. **Peru, done right.**

Next.js (App Router) · TypeScript · Tailwind CSS v4 · MDX stories · react-pdf itineraries.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Checks (run against a running server; `BASE` defaults to http://localhost:3000):

```bash
npm run lint && npm run typecheck
npm run lint:voice   # fails on "lost city", "mystical", "exotic", "once in a lifetime", "hidden gem"
npm run test:smoke   # every sitemap route, mobile + desktop: status, console errors, overflow, axe (serious/critical)
npm run test:e2e     # mega-menu, mobile drawer, enquire modal, gated PDF, altitude chart, route builder, food map, currency…
```

## Where things live

| What | Where |
| --- | --- |
| Brand settings: email, hours, business address | `config/site.ts` |
| "From US$[X] per person per day", currencies and rates | `config/pricing.ts` |
| Machu Picchu and Inca Trail rules (each with `verifiedAsOf` and official links), routes, booking lead times | `config/machuPicchu.ts` |
| Landscapes film source, press and awards | `config/media.ts` |
| Zones, destinations (elevations), journeys (daily altitude), experiences, stays, foods, FAQs | `data/*.ts` (typed in `data/types.ts`) |
| Stories | `content/stories/*.mdx` |
| Altitude bands, tips and route warnings | `lib/altitude.ts` |
| Photos (free Unsplash License, no credit lines) | `data/photo-sources.json` → `public/photos/*.jpg` via `node scripts/fetch-photos.mjs`; use them in data with `photo("slot")` from `data/photos.ts` |

## Languages

English (default, at the root), French, German and Spanish (`/fr`, `/de`, `/es`), all pre-rendered from `app/[locale]` (`lib/i18n/config.ts`). There is no translation library in the browser.

- Copy is written in English in the code and data, through `t("…")` and `L(data)` (`lib/i18n`). Translations live in `i18n/{fr,de,es}.json`, keyed by a hash of the English text. Place names and dish names that stay the same are left out, so they fall back to English.
- `node scripts/i18n-extract.cjs` rewrites `i18n/source.json` and `i18n/client-keys.json` and lists any missing translations. Run it after you change copy, then translate the new keys.
- Client components only receive the strings they need: `clientDict` in the root layout, or `<ClientStrings data={…}>` around a section.
- Stories have one MDX file per language: `slug.mdx`, `slug.fr.mdx`, `slug.de.mdx`, `slug.es.mdx`.
- The language selector (EN · FR · DE · ES) is in the top bar and the mobile menu. Every page has its canonical and its hreflang alternates (x-default is English), and the sitemap lists all four languages.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL override (defaults to https://discoverperutravel.tourground.com on Vercel) |
| `ITINERARY_TOKEN_SECRET` | Signs the gated itinerary PDF links. **Set this in production.** |

## Forms and leads

`/api/enquiry`, `/api/leads` (itinerary download) and `/api/newsletter` validate input with zod and `console.log` the payload. Each has a `TODO: CRM integration`.

## Before launch

- Business address: WeWork Basadre, Av. Jorge Basadre 349, San Isidro, Lima (`config/site.ts`). Confirm the arrangement with WeWork.
- Per-day "from" price and exchange rates (`config/pricing.ts`), and journey "from" prices (`data/journeys.ts`).
- Stays describe the kind of place. Choose the actual properties, and get permitted photos for any hotel the site names.
- Legal pages (`data/legal.ts`, in all four languages): a lawyer should review them before launch.
- Translations (FR/DE/ES): have a native speaker read them through, especially the legal pages.
- Landscapes film: set `media.filmSrc`.
- **Verify** every elevation, season, Machu Picchu rule (update `verifiedAsOf`), entry requirement and health note against official sources.

Altitude content is general guidance, not medical advice. The site says so wherever altitude advice appears.
