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
