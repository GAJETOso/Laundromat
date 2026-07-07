import { NextRequest, NextResponse } from "next/server";
import { answer } from "@/lib/assistant";

export const dynamic = "force-dynamic";

/** Naive in-memory rate limiter — replace with Redis (Upstash) in production. */
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 30;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { reply: "You're sending messages very quickly — give me a few seconds and try again." },
      { status: 429 }
    );
  }

  let body: { message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = (body.message ?? "").slice(0, 1000);
  return NextResponse.json({ reply: answer(message) });
}
