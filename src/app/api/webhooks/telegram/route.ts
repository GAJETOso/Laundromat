import { NextRequest, NextResponse } from "next/server";
import { answer } from "@/lib/assistant";

export const dynamic = "force-dynamic";

/**
 * Telegram Bot API webhook.
 *
 * Register with:
 *   https://api.telegram.org/bot<TOKEN>/setWebhook?url=<SITE_URL>/api/webhooks/telegram&secret_token=<TELEGRAM_WEBHOOK_SECRET>
 *
 * Setup guide: docs/BOTS.md
 */

const COMMANDS: Record<string, string> = {
  "/start":
    "Welcome to Lustra 🧺 — laundry, elevated.\n\nI can help you with:\n/book — schedule a pickup\n/track — track an order\n/prices — see pricing\n/machines — live machine availability\n/locations — find a laundromat\n/help — talk to a human",
  "/book": "Book in 60 seconds: https://lustra.example.com/book — or just tell me what you need picked up and when.",
  "/track": "Send me your order ID (looks like LST-XXXX) and I'll pull up live status, or use https://lustra.example.com/track",
  "/prices": "Wash & fold $1.75/lb · machines from $3.50 · dry cleaning from $7/garment. Full calculator: https://lustra.example.com/pricing",
  "/machines": "machines available now",
  "/locations": "where are your locations",
  "/help": "human support please",
};

export async function POST(req: NextRequest) {
  // Telegram sends the secret back in this header when configured on setWebhook.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let update: { message?: { chat?: { id: number }; text?: string } };
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const chatId = update.message?.chat?.id;
  const text = update.message?.text;

  if (chatId && text) {
    const command = COMMANDS[text.split(" ")[0]];
    const reply =
      command && !["machines available now", "where are your locations", "human support please"].includes(command)
        ? command
        : answer(command ?? text);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (token) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: reply, disable_web_page_preview: true }),
      }).catch(() => {
        /* Telegram retries failed webhook deliveries. */
      });
    }
  }

  return NextResponse.json({ ok: true });
}
