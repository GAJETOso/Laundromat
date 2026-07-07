import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  addMessage({ name: name.slice(0, 120), email: email.slice(0, 200), message: message.slice(0, 3000) });
  return NextResponse.json({ ok: true, message: "Thanks — we reply within one business hour." });
}
