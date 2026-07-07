import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/store";

export const dynamic = "force-dynamic";

const REQUIRED = ["service", "name", "email", "phone", "address", "date", "window"] as const;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  for (const field of REQUIRED) {
    if (typeof body[field] !== "string" || !(body[field] as string).trim()) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const email = body.email as string;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const booking = createBooking({
    service: (body.service as string).slice(0, 60),
    name: (body.name as string).slice(0, 120),
    email: email.slice(0, 200),
    phone: (body.phone as string).slice(0, 40),
    address: (body.address as string).slice(0, 300),
    date: (body.date as string).slice(0, 40),
    window: (body.window as string).slice(0, 60),
    recurring: typeof body.recurring === "string" ? body.recurring.slice(0, 40) : "none",
    preferences: Array.isArray(body.preferences)
      ? (body.preferences as string[]).slice(0, 12).map((p) => String(p).slice(0, 80))
      : [],
    instructions: typeof body.instructions === "string" ? body.instructions.slice(0, 1000) : "",
    estimatedTotal: typeof body.estimatedTotal === "number" ? body.estimatedTotal : 0,
  });

  // In production this also fans out confirmations via SMS/email/WhatsApp/Telegram
  // through the notification service (see docs/ARCHITECTURE.md).
  return NextResponse.json({ booking }, { status: 201 });
}
