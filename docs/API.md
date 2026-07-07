# Lustra Platform — API Reference

All endpoints are JSON over HTTPS, rooted at `/api`. In this reference
deployment they are backed by an in-memory store (`src/lib/store.ts`) and a
simulated machine fleet (`src/lib/machines.ts`); the interfaces are stable and
map 1:1 onto the Prisma models in `prisma/schema.prisma`.

Errors always return `{ "error": string }` with an appropriate 4xx/5xx status.

---

## Machines

### `GET /api/machines`

Live machine telemetry.

Query params:

| Param      | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `location` | string | Filter to one location id (`downtown`, `midtown`, `university`) |
| `summary`  | `1`    | Return per-location availability counts only  |

`200` response (`summary=1`):

```json
{
  "summary": {
    "downtown": { "washersAvailable": 9, "washersTotal": 24, "dryersAvailable": 7, "dryersTotal": 20 }
  },
  "updatedAt": "2026-07-07T15:04:05.000Z"
}
```

`200` response (full): `{ "machines": Machine[] }` where `Machine` is:

```json
{
  "id": "DOW-W07",
  "locationId": "downtown",
  "type": "washer",
  "capacityLbs": 20,
  "status": "running",
  "minutesRemaining": 18,
  "pricePerCycle": 4.75
}
```

`status` ∈ `available | running | reserved | finishing | maintenance`.
Responses are cacheable for 30 s (`s-maxage=30, stale-while-revalidate=60`).

---

## Bookings

### `POST /api/bookings`

Create a pickup/booking. Body:

| Field            | Type     | Required | Notes                        |
| ---------------- | -------- | -------- | ---------------------------- |
| `service`        | string   | ✓        | e.g. `"Wash & Fold Pickup"`  |
| `name`           | string   | ✓        |                              |
| `email`          | string   | ✓        | validated                    |
| `phone`          | string   | ✓        |                              |
| `address`        | string   | ✓        |                              |
| `date`           | string   | ✓        | `YYYY-MM-DD`                 |
| `window`         | string   | ✓        | e.g. `"9–11 AM"`             |
| `recurring`      | string   |          | `One-time` \| `Weekly` \| …  |
| `preferences`    | string[] |          | max 12                       |
| `instructions`   | string   |          | max 1000 chars               |
| `estimatedTotal` | number   |          |                              |

`201` → `{ "booking": { "id": "LST-…", "status": "scheduled", "timeline": [...] } }`
`400` → validation error.

---

## Orders

### `GET /api/orders/:id`

Order tracking. Known IDs return the stored booking; unknown well-formed IDs
return a deterministic simulated order (demo mode) so the tracking UX is
explorable.

`200`:

```json
{
  "id": "LST-8F2K",
  "status": "out_for_delivery",
  "timeline": [{ "status": "picked_up", "at": "…", "note": "…" }],
  "eta": "2026-07-07T18:00:00.000Z"
}
```

`status` ∈ `scheduled | picked_up | processing | quality_check | out_for_delivery | delivered`.

---

## Commercial

### `POST /api/commercial`

Create a B2B lead / quote request.
Required: `company`, `industry`, `contact`, `email`, `volume`. Optional:
`phone`, `message`.
`201` → `{ "ok": true, "leadId": "LEAD-…", "message": "…" }`

---

## Contact & newsletter

- `POST /api/contact` — `{ name, email, message }` → `200 { ok: true }`
- `POST /api/newsletter` — `{ email }` → `200 { ok: true, message }` (idempotent)

---

## AI assistant

### `POST /api/chat`

Body `{ "message": string }` (≤ 1000 chars). Returns `{ "reply": string }`.

Rate limited to 30 requests/minute/IP (in-memory here; Redis in production).
The same engine (`src/lib/assistant.ts`) answers the WhatsApp and Telegram
webhooks. Intents implemented: pricing (with per-lb estimation), booking,
machine availability (live), order tracking, locations, hours, memberships,
commercial, stain advice, cancellation, human handoff, promotions, plus an
FAQ-similarity fallback.

---

## Webhooks

### `GET /api/webhooks/whatsapp`

Meta verification handshake — echoes `hub.challenge` when
`hub.verify_token` matches `WHATSAPP_VERIFY_TOKEN`.

### `POST /api/webhooks/whatsapp`

Receives WhatsApp Business Cloud API events. Text messages are answered via
the assistant engine and sent back through the Graph API when
`WHATSAPP_ACCESS_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` are configured. Always
returns `200` to avoid webhook disablement.

### `POST /api/webhooks/telegram`

Receives Telegram updates; validates
`X-Telegram-Bot-Api-Secret-Token` against `TELEGRAM_WEBHOOK_SECRET` when set.
Supports `/start /book /track /prices /machines /locations /help` plus free
text via the assistant engine. Replies are sent when `TELEGRAM_BOT_TOKEN` is
configured. Setup guide: [BOTS.md](./BOTS.md).
