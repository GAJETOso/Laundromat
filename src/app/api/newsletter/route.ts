import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const fresh = addSubscriber(email);
  return NextResponse.json({
    ok: true,
    message: fresh ? "Welcome to Lustra." : "You're already subscribed.",
  });
}
