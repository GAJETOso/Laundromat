# Lustra — Laundry, elevated. 🧺

A premium, production-grade laundry platform positioned for the Nigerian
market: smart self-service laundromats across Lagos (Lekki, Victoria Island,
Yaba), pickup & delivery, commercial/B2B linen programs, couture dry cleaning,
and a traditional & cultural attire studio — one unified Next.js application
with customer, admin, and driver dashboards and an AI assistant available on
web, WhatsApp, and Telegram. Pricing is in Naira (₦), units are metric (kg),
payments lead with Paystack & Flutterwave, and privacy follows the NDPA 2023.

![Stack](https://img.shields.io/badge/Next.js%2014-black) ![TS](https://img.shields.io/badge/TypeScript-strict-blue) ![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8) ![License](https://img.shields.io/badge/license-proprietary-lightgrey)

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables required — the demo runs fully self-contained with a
simulated machine fleet and in-memory data store. Copy `.env.example` to
`.env.local` to wire real services (database, payments, bots, maps, analytics).

```bash
npm run build      # production build
npm run typecheck  # strict TS
docker compose up  # web + postgres + redis
```

## What's inside

### Customer experience
- **Home** — animated hero, live stats, service explorer, how-it-works, live
  machine availability, membership pricing, reviews, FAQ (with FAQ schema), app section
- **Booking wizard** (`/book`) — 5 steps: service → address → schedule →
  preferences → payment, with live price estimation, promo codes, recurring
  pickups, and a confirmation that links straight into tracking
- **Order tracking** (`/track`) — flight-style stage rail with ETA; works with
  any demo ID
- **Pricing** (`/pricing`) — interactive wash & fold calculator (weight ×
  speed × add-ons), machine and dry cleaning price tables, membership plans
- **Services** — dedicated pages for self-service, pickup & delivery,
  commercial, dry cleaning, wash & fold, ironing, special garments, express,
  and subscriptions (single dynamic route, typed content map)
- **Commercial** (`/commercial`) — enterprise landing with ROI calculator,
  case studies, industry grid, and quote-request lead capture
- **Locations** (`/locations`) — live per-machine floor view for every store,
  amenities, hours, parking, directions
- **Blog** — six full articles with Article schema; **About**, **Careers**,
  **Contact** (WhatsApp/Telegram/phone/email + form), **FAQ**, legal pages
  (privacy/GDPR-CCPA, terms, accessibility statement)

### Dashboards
- **Customer** (`/dashboard`) — overview, orders, invoices, rewards/referrals,
  settings (addresses, preferences, notifications, security/2FA)
- **Admin** (`/admin`) — KPIs, live orders, weekly revenue chart, machine
  fleet health, CMS module launcher
- **Driver** (`/driver`) — optimized route with pickups/deliveries, windows,
  photo-proof and signature actions

### Platform
- **AI assistant "Lumi"** — one intent engine wired to live availability and
  real pricing, surfaced as web chat + WhatsApp + Telegram webhooks, with a
  documented Claude tool-use upgrade path ([docs/BOTS.md](docs/BOTS.md))
- **API** — machines, bookings, tracking, commercial leads, contact,
  newsletter, chat, webhooks ([docs/API.md](docs/API.md))
- **Database schema** — full Prisma/PostgreSQL model of the business:
  identity & RBAC, orders, machines & reservations, subscriptions & loyalty,
  B2B accounts & SLAs, routes & stops, payments & invoices, messaging, CMS,
  audit ([prisma/schema.prisma](prisma/schema.prisma))
- **SEO/GEO** — JSON-LD (LocalBusiness, Service, FAQPage, Article,
  BreadcrumbList) generated from the same typed data as the UI, canonical
  URLs, OG/Twitter cards, sitemap, robots, PWA manifest
- **Security** — global security headers (HSTS, frame-deny, nosniff),
  validated & clamped inputs, webhook secret verification, rate limiting
- **Accessibility** — WCAG 2.2 AA: skip link, keyboard-complete, ARIA
  labeling, visible focus, `prefers-reduced-motion` honored globally
- **Dark/light mode**, mobile bottom navigation, floating WhatsApp CTA

### Mobile-ready (iOS & Android)
The repo ships everything a native app needs to look and behave exactly like
the web experience:
- **Design tokens** (`mobile/design-tokens/`) — `tokens.json` as the single
  source of truth, with generated `LustraTokens.swift` (SwiftUI),
  `LustraTokens.kt` (Jetpack Compose), and `theme.ts` (React Native/Expo):
  full color scales, adaptive light/dark semantics, the CTA gradient,
  typography scale, radii, shadows, motion curves, and component specs
- **Typed API client** (`mobile/api-client/lustra-api.ts`) — zero-dependency,
  pinned to the stable `/api/v1/*` alias
- **Remote config** — `GET /api/app-config` for version gating, feature
  flags, store links, and theme accents
- **Deep links** — Apple Universal Links (`/.well-known/apple-app-site-association`)
  and Android App Links (`/.well-known/assetlinks.json`) served and mapped to
  every key route, including QR machine activation (`/m/<machineId>`)
- **Integration guide** ([docs/MOBILE.md](docs/MOBILE.md)) — screen map
  mirroring the web 1:1, component equivalence table, push notification plan,
  auth, offline strategy, and store go-live checklists

## Documentation

| Doc | Contents |
| --- | -------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, layers, production swap-points, security posture |
| [docs/API.md](docs/API.md) | Full endpoint reference |
| [docs/MOBILE.md](docs/MOBILE.md) | iOS/Android integration: tokens, screens, deep links, push, stores |
| [docs/BOTS.md](docs/BOTS.md) | WhatsApp/Telegram setup + LLM upgrade path |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel & Docker deploys, CI/CD, SEO go-live checklist |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Brand, color, type, motion, component inventory |

## Tech stack

Next.js 14 (App Router, RSC) · TypeScript (strict) · Tailwind CSS ·
Framer Motion · Lucide icons · Prisma schema (PostgreSQL) · Docker ·
GitHub Actions. Deploys anywhere Next.js runs; Vercel recommended.

## Demo notes

Dashboards and the machine fleet run on labeled demo data so every flow is
fully explorable without credentials. The seams to production services
(Prisma, Redis, Stripe, Twilio, Meta, Telegram) are documented at each site
and in the architecture doc.

## License

Proprietary — copyright © 2026 GAJETOso, all rights reserved (see
[LICENSE](LICENSE)). The code is viewable for evaluation but may not be
copied, modified, or redistributed without written permission. To open-source
the project instead, replace `LICENSE` with an OSI license (MIT for maximum
adoption, AGPL-3.0 to keep hosted derivatives open) and update this section.
