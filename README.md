# Discover Peru Travel

Private, well-paced Peru journeys. **Peru, done right.**

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · MDX stories · react-pdf itineraries.

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


## Cloudflare Workers (OpenNext)

The site also runs on Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare). This sits alongside Vercel: `npm run build` / `next build` and the Vercel deployment are unchanged.

```
npm run cf-build   # opennextjs-cloudflare build: runs `npm run build` (with its prebuild hook), then bundles .open-next/
npm run preview    # build, then serve the Worker locally in workerd (http://localhost:8787)
npm run deploy     # build, then deploy to Cloudflare (needs a Cloudflare account / `wrangler login`)
```

- `wrangler.jsonc`: Worker name `peru`, `nodejs_compat`, static assets from `.open-next/assets`.
- `open-next.config.ts`: every page is prerendered and nothing revalidates, so prerendered pages are served read-only from Workers static assets (no R2 or KV to create). If ISR / `revalidate` is added later, switch to the R2 incremental cache.
- `public/_headers`: cache headers for static files (Workers serves them before Next's `headers()` would run). Redirects in `next.config.ts` are handled by the Worker.
- Use `npm run preview` (not bare `wrangler dev`) to test locally: it copies the prerendered pages into the assets before starting.
- `npm run cf-build` runs `npm run build`, so the `prebuild` image step (`scripts/build-images.mjs`, which generates `public/img`) runs on Cloudflare too.
- Set `ITINERARY_TOKEN_SECRET` as a Worker secret (`wrangler secret put ITINERARY_TOKEN_SECRET`) before going live.
- **Not working on Workers yet: the itinerary PDF (`/api/itinerary/[slug]`) returns 500.** The Worker bundle uses pdfkit's Node build, which loads its standard fonts (`#standard-fonts/Helvetica`) with a runtime `require` that cannot resolve inside a bundled Worker. Fix options: generate the PDFs at build time as static files, or bundle pdfkit's browser build for the Worker. Everything else (pages, `/api/enquiry`, `/api/leads`, `/api/newsletter`) works.
- The Worker is about 3.5 MiB gzipped (mostly `@react-pdf/renderer`). That is over the Workers Free limit of 3 MiB, so it needs the Workers Paid plan (10 MiB).

## Where things live

| What | Where |
| --- | --- |
| Brand settings: contact, hours, company and licence placeholders | `config/site.ts` |
| "From US$[X] per person per day", currencies and rates | `config/pricing.ts` |
| Machu Picchu and Inca Trail rules (each with `verifiedAsOf` and official links), routes, booking lead times | `config/machuPicchu.ts` |
| Landscapes film source, press and awards | `config/media.ts` |
| Zones, destinations (elevations), journeys (daily altitude), experiences, stays, foods, team, testimonials, FAQs | `data/*.ts` (typed in `data/types.ts`) |
| Stories | `content/stories/*.mdx` |
| Altitude bands, tips and route warnings | `lib/altitude.ts` |
| Photos (free Unsplash License; credited on `/credits`) | `data/photo-sources.json` → `public/photos/*.jpg` via `node scripts/fetch-photos.mjs`; use them in data with `photo("slot")` from `data/photos.ts` |
| Team placeholder portraits | `scripts/gen-placeholders.mjs` (`npm run placeholders`) |

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL override (defaults to https://discoverperutravel.tourground.com on Vercel) |
| `ITINERARY_TOKEN_SECRET` | Signs the gated itinerary PDF links. **Set this in production.** |

## Forms and leads

`/api/enquiry`, `/api/leads` (itinerary download) and `/api/newsletter` validate input with zod and `console.log` the payload. Each has a `TODO: CRM integration`.

## Before launch: placeholders to replace

Everything below is visibly flagged on the site:

- Company name, address, MINCETUR registration and the licensed Inca Trail operator partner (`config/site.ts`)
- Phone, WhatsApp and email (`config/site.ts`)
- Per-day "from" price and exchange rates (`config/pricing.ts`)
- Journey prices (`data/journeys.ts`)
- Stays: every hotel name (`data/stays.ts`)
- Team, testimonials, press and awards, and Travel that gives back partners
- Legal pages (`app/legal/[slug]/page.tsx`), including deposit and cancellation terms
- Team portraits: illustrated placeholders in `public/images/team` until real team photos exist
- Landscapes film: set `media.filmSrc`
- **Verify** every elevation, season, Machu Picchu rule (update `verifiedAsOf`), entry requirement and health note against official sources.

Altitude content is general guidance, not medical advice. The site says so wherever altitude advice appears.
