# Lustra — Deployment Guide

## Option A: Vercel (recommended)

1. Import the repo in Vercel — Next.js is auto-detected, zero config needed.
2. Add environment variables from `.env.example` (all optional for demo mode).
3. Deploy. Edge network, image optimization, and ISR come free.

Suggested production wiring order:
1. `DATABASE_URL` (Supabase Postgres) → run `npx prisma migrate deploy`
2. `REDIS_URL` (Upstash) → rate limiting & live machine state
3. Stripe keys → payments
4. WhatsApp/Telegram tokens → bots (see BOTS.md)
5. `NEXT_PUBLIC_MAPS_KEY` → location map embeds & address autocomplete
6. Analytics IDs (GA4, GTM, Clarity, Meta/TikTok pixels) — load them via a
   consent-gated GTM container to stay GDPR-clean.

## Option B: Docker

```bash
docker compose up --build
# web on :3000, postgres on :5432, redis on :6379
```

The Dockerfile is multi-stage against `node:22-alpine`, builds the Next.js
standalone output, and runs as a non-root user.

## CI/CD

`.github/workflows/ci.yml` runs typecheck + production build on every push and
PR, and verifies the Docker image builds on PRs. Extend with:

- `npx prisma migrate diff` gate once a database is attached
- Lighthouse CI (`lhci autorun`) against preview deployments with a 95+ budget
- Playwright smoke tests of the booking wizard and tracking flow

## Domains & SEO go-live checklist

- Set `NEXT_PUBLIC_SITE_URL` and update `site.url` in `src/lib/site.ts`
- Verify `https://<domain>/sitemap.xml` and `/robots.txt`
- Submit the sitemap in Google Search Console & Bing Webmaster Tools
- Create the Google Business Profile per location and link the `/locations`
  page (Local SEO); keep NAP identical to the site footer
- Validate structured data with the Rich Results test (LocalBusiness,
  FAQPage, Service, Article, BreadcrumbList are all emitted)

## Observability

- Vercel Analytics / Speed Insights for Core Web Vitals
- Runtime errors → Sentry (add `@sentry/nextjs`)
- Uptime: monitor `/api/machines?summary=1` — it exercises the data path
