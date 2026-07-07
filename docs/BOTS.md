# Lustra — WhatsApp, Telegram & AI Assistant Guide

One assistant brain (`src/lib/assistant.ts`, "Lumi") powers three channels:

- the website chat widget (`/api/chat`)
- WhatsApp Business (`/api/webhooks/whatsapp`)
- Telegram (`/api/webhooks/telegram`)

Out of the box Lumi is a deterministic intent engine wired to **real platform
data** — live machine availability, the pricing tables, locations, FAQs — so
it gives correct, current answers with zero external dependencies.

---

## WhatsApp Business Cloud API setup

1. Create a Meta app → add the **WhatsApp** product → note the
   **Phone Number ID** and generate a **permanent access token**.
2. Set env vars:
   ```
   WHATSAPP_VERIFY_TOKEN=<any string you choose>
   WHATSAPP_ACCESS_TOKEN=<permanent token>
   WHATSAPP_PHONE_NUMBER_ID=<phone number id>
   ```
3. In Meta's webhook config, set the callback URL to
   `https://<your-domain>/api/webhooks/whatsapp` and the verify token to the
   same `WHATSAPP_VERIFY_TOKEN`. Subscribe to the `messages` field.
4. Send a WhatsApp message to your business number — Lumi replies.

Production hardening checklist:
- Verify `X-Hub-Signature-256` request signatures with your app secret.
- Store `ConversationMessage` rows (schema provided) keyed on the WA message
  id for idempotent processing of Meta's redeliveries.
- Register message templates for proactive notifications (order confirmed,
  driver 15 min away, payment reminder) — templates are required for
  business-initiated messages outside the 24h session window.
- Use interactive button/list messages for booking flows and quick replies.

## Telegram bot setup

1. Create a bot with **@BotFather** → get the token.
2. Set env vars:
   ```
   TELEGRAM_BOT_TOKEN=<token>
   TELEGRAM_WEBHOOK_SECRET=<any string>
   ```
3. Register the webhook:
   ```
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-domain>/api/webhooks/telegram&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
   ```
4. Commands supported out of the box:
   `/start /book /track /prices /machines /locations /help` — everything else
   routes through the assistant engine.

## Upgrading Lumi to an LLM (Claude)

Set `ANTHROPIC_API_KEY` and replace the body of `answer()` with a Claude call
using **tool use**, where each existing intent becomes a tool:

| Tool                | Backed by                            |
| ------------------- | ------------------------------------ |
| `get_pricing`       | `src/lib/data.ts` pricing tables     |
| `estimate_price`    | `washFoldPricing` math               |
| `get_availability`  | `getAvailabilitySummary()` (live)    |
| `create_booking`    | `createBooking()` store call         |
| `track_order`       | `getBooking()` / `getDemoTracking()` |
| `find_locations`    | `locations` data                     |
| `escalate_to_human` | support ticket + WhatsApp handoff    |

Recommended model: `claude-sonnet-5` for the conversational layer with
`claude-haiku-4-5-20251001` for high-volume intent classification. Keep the
deterministic engine as the zero-cost fallback when the API is unavailable —
the interface is already shaped for it.

Voice notes and images (receipts, garment damage photos) arrive as media IDs
in the WhatsApp webhook; fetch via the Graph API and pass to Claude as audio
transcription/vision inputs before routing through the same tool belt.

## Human handoff

The `human|support|complaint` intent already routes users to WhatsApp/phone.
In production, also flip `ConversationMessage.handedOff = true` and page the
care team (see `SupportTicket` model) so a human continues in-channel — the
bot must go quiet on a handed-off conversation until an agent closes it.
