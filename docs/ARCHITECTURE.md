# Lustra — Architecture

## Overview

Lustra is a Next.js 14 (App Router) application designed as a single platform
serving four surfaces: the public marketing/booking site, the customer
dashboard, the operations (admin) dashboard, and the driver dashboard — plus
conversational access via WhatsApp, Telegram, and the embedded web assistant.

```
                        ┌────────────────────────────┐
  Web / PWA  ──────────►│                            │
  WhatsApp  ──webhook──►│   Next.js (Vercel Edge)    │──► PostgreSQL (Supabase / RDS)
  Telegram  ──webhook──►│   • RSC pages              │──► Redis (rate limit, queues, live state)
  Driver app ─────────► │   • /api route handlers    │──► Cloudinary (media)
                        │   • Lumi assistant engine  │──► Stripe / PayPal / Paystack / Flutterwave
                        └────────────┬───────────────┘
                                     │ events
                        ┌────────────▼───────────────┐
                        │ Notification fan-out       │──► Twilio SMS · Resend email
                        │ (queue worker)             │──► WhatsApp Cloud API · Telegram Bot API
                        └────────────────────────────┘
  Machine IoT gateway ──MQTT──► telemetry ingester ──► Redis (live) + Postgres (history)
```

## Layers

| Layer          | This repo (reference deployment)        | Production target                        |
| -------------- | --------------------------------------- | ---------------------------------------- |
| UI             | Next.js App Router, Tailwind, Framer Motion | same                                  |
| API            | Next.js route handlers under `/api`     | same (or NestJS service if extracted)    |
| Data           | In-memory store (`src/lib/store.ts`)    | PostgreSQL via Prisma (`prisma/schema.prisma`) |
| Machine state  | Deterministic simulator (`src/lib/machines.ts`) | MQTT ingest → Redis live view      |
| Assistant      | Intent engine (`src/lib/assistant.ts`)  | Claude with tool-use over the same intents (see BOTS.md) |
| Auth           | Demo dashboards, `robots: noindex`      | NextAuth/JWT + 2FA, RBAC per `Role` enum |
| Rate limiting  | In-memory map on `/api/chat`            | Redis (Upstash) sliding window on all POST routes |
| Payments       | Method selection UI, charge-after-weigh copy | Stripe PaymentIntents + provider webhooks |

The seam is deliberate: every route handler calls a function in `src/lib/*`
whose signature mirrors a Prisma query. Swapping the in-memory store for the
database touches zero route/UI code.

## Key design decisions

1. **Server Components by default.** Marketing pages are fully static or
   streamed RSC; client components are leaf-level islands (wizard, calculators,
   live availability, chat). This is what keeps Lighthouse in the high 90s.

2. **Machine availability is a lease system.** A reservation is a 15-minute
   lease keyed on `(machine, slot)`; expiry auto-releases inventory. The demo
   simulator produces time-bucketed pseudo-random fleet state so the UI
   behaves live without hardware.

3. **One assistant brain, three channels.** Web chat, WhatsApp, and Telegram
   webhooks all call `answer()` in `src/lib/assistant.ts`. Upgrading to an LLM
   (Claude tool-use) happens in exactly one place; the deterministic intents
   become the model's tools.

4. **Demo mode is explicit.** Dashboards are labeled as demo, unknown tracking
   IDs return deterministic simulated timelines, and every "production wiring"
   note points at the doc that specifies it. Nothing silently pretends.

5. **SEO/GEO as data.** All JSON-LD (LocalBusiness, Service, FAQPage,
   BreadcrumbList, Article) is generated from the same typed data files that
   render the UI, so structured data can never drift from visible content.

## Security posture

- Security headers (HSTS, X-Frame-Options DENY, nosniff, referrer & permissions
  policy) applied globally in `next.config.mjs`.
- All POST bodies validated and length-clamped server-side.
- Telegram webhook authenticates via secret token header; WhatsApp via Meta's
  verify-token handshake (add payload signature verification `X-Hub-Signature-256`
  when the app secret is configured).
- No card data ever touches the server — provider tokens only (`PaymentMethod.token`).
- Production additions specified in the schema: 2FA secrets, session table,
  audit log with before/after JSON, soft-delete for GDPR erasure.

## Performance budget

- Static/ISR marketing pages, `s-maxage` caching on machine reads.
- No web-font downloads (system font stack), SVG icon tree-shaking via
  lucide-react, AVIF/WebP image pipeline configured.
- Framer Motion used only in leaf client components; respects
  `prefers-reduced-motion` everywhere via `useReducedMotion` and a global CSS
  fallback.

## Scaling path

Single deployment → extract the notification worker (queue) → extract the
IoT ingester → shard machine live-state by location in Redis. The Prisma
schema already carries the multi-location and franchise seams (`Location`,
`BusinessAccount`, per-location routes).
