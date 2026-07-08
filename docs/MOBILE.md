# Lustra — iOS & Android Integration Guide

The repo is structured so native apps are a *consumer* of the platform, not a
fork of it. Everything an app needs already exists here:

| Need                | Where it lives                                            |
| ------------------- | --------------------------------------------------------- |
| Design language     | `mobile/design-tokens/` — `tokens.json` (source of truth) + generated `LustraTokens.swift`, `LustraTokens.kt`, `theme.ts` (React Native) |
| API contract        | `docs/API.md`, typed client in `mobile/api-client/lustra-api.ts`, stable alias `/api/v1/*` |
| Remote config       | `GET /api/app-config` — version gates, feature flags, store & support links |
| Deep links          | `/.well-known/apple-app-site-association` + `/.well-known/assetlinks.json` (served by route handlers) |
| Data model          | `prisma/schema.prisma` — the same entities the apps render |
| Assistant           | `POST /api/chat` — same Lumi brain as web/WhatsApp/Telegram |

## Recommended stack

**React Native (Expo)** for a single codebase that ships to both stores —
`theme.ts` and `lustra-api.ts` drop in unchanged, and the web team can
contribute. Choose **native Swift/Kotlin** instead if you need deep IoT/BLE
work for machine pairing; `LustraTokens.swift` / `LustraTokens.kt` give you
the identical visual system in SwiftUI and Jetpack Compose, including the CTA
gradient, adaptive light/dark semantic colors, capsule buttons with press
scaling, and the standard easing curve.

Either way: **system fonts only** (SF Pro on iOS, Roboto on Android) — this
matches the web exactly and is deliberate brand policy (docs/DESIGN-SYSTEM.md).

## Screen map (mirrors the web 1:1)

Bottom tab bar = the web's mobile `BottomNav`, same five items, same raised
gradient center button:

```
Tab: Home      → web /            hero, live availability, services, offers
Tab: Stores    → web /locations   store list → live machine floor (grid of
                                   machine tiles w/ status colors + timers)
Tab: Book  ●   → web /book        the same 5-step wizard: service → address →
                                   schedule → preferences → payment
Tab: Track     → web /track       stage rail with ETA + driver map
Tab: Account   → web /dashboard   orders, invoices, rewards, settings
```

Secondary screens: service detail (from `/services/*` content), pricing
calculator, commercial lead form, blog reader, Lumi chat (floating button on
every tab, exactly like the web widget), QR scanner (see below), notification
center, referral share sheet.

Component equivalences (all specified in `tokens.json → components`):

| Web class        | iOS                        | Android/Compose            | RN |
| ---------------- | -------------------------- | -------------------------- | -- |
| `.btn-primary`   | `LustraPrimaryButtonStyle` | `LustraPrimaryButton`      | capsule + `ctaGradient` + `shadow.glow` |
| `.card`          | `LustraCard`               | Surface, radius 24, border | `radius.card` + `shadow.card` |
| `.chip`          | Capsule 30pt               | AssistChip restyled        | `radius.pill`, `type.caption` |
| `.glass` nav     | `.ultraThinMaterial`       | Haze/blur modifier         | expo-blur |
| Status colors    | `Lustra.Color.success/…`   | `LustraPalette.Success/…`  | `statusColor` map |

## Mobile-only flows

**QR machine activation** — machines carry QR codes encoding
`https://<domain>/m/<machineId>`. The app intercepts these via deep links
(camera or in-app scanner), calls the activation endpoint (modeled as
`MachineActivation` in the schema), takes Apple Pay / Google Pay, and starts
the live cycle-timer notification. The web falls back to a mobile web payment
page for users without the app — same URL, graceful either way.

**Push notifications** — APNs + FCM, fanned out by the same notification
service that sends SMS/WhatsApp/Telegram (see ARCHITECTURE.md). Event types
map 1:1 to `NotificationPreference.event`: order updates, driver arrival
(with live-activity/ongoing-notification treatment), cycle finished,
promotions. iOS should implement a **Live Activity** for `out_for_delivery`
mirroring the web's tracking rail.

**Offline** — cache last availability summary, order history, and prices;
queue booking submissions with idempotency keys when connectivity drops.

## Auth

Apps authenticate against the same user store (`User`/`Session` models):
email + OTP or OAuth (Apple/Google sign-in required by store policy if any
social login is offered), returning a JWT the client sends as
`Authorization: Bearer`. `lustra-api.ts` already threads the token. Enable
password-manager/passkey association via the `webcredentials` (iOS) and
`get_login_creds` (Android) entries already present in the well-known files.

## Deep links — go-live checklist

1. iOS: replace `TEAMID` in `src/app/.well-known/apple-app-site-association/route.ts`
   with your Apple Team ID; add the Associated Domains entitlement
   (`applinks:<domain>`, `webcredentials:<domain>`).
2. Android: replace the `sha256_cert_fingerprints` placeholder in
   `src/app/.well-known/assetlinks.json/route.ts` with the Play App Signing
   fingerprint; add the intent filter with `android:autoVerify="true"`.
3. Test: `https://<domain>/track?id=LST-TEST` must open the app's tracking
   screen when installed, the web page when not.

## Versioning contract

Mobile clients pin `/api/v1/*` (rewritten server-side to `/api/*`). Breaking
API changes ship as `/api/v2` while v1 keeps serving old app versions;
`GET /api/app-config` gates `minSupportedVersion` for forced upgrades.
Additive changes (new fields) are always allowed on v1 — clients must ignore
unknown fields.

## App Store / Play checklist

- App icons: derive from `public/icon.svg` (gradient tile + drop mark).
- Splash: ink-950 background, centered logo tile, no text.
- Store screenshots: reuse the web's section compositions (hero card stack,
  machine floor, tracking rail) — the design system is the marketing.
- Privacy labels: data mapped in `docs/ARCHITECTURE.md` § Security and the
  privacy policy at `/legal/privacy`.
