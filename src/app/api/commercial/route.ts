import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const required = ["company", "industry", "contact", "email", "volume"];
  for (const field of required) {
    if (!body[field]?.trim()) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Please provide a valid work email." }, { status: 400 });
  }

  const lead = createLead({
    company: body.company.slice(0, 160),
    industry: body.industry.slice(0, 80),
    contact: body.contact.slice(0, 120),
    email: body.email.slice(0, 200),
    phone: (body.phone ?? "").slice(0, 40),
    volume: body.volume.slice(0, 80),
    message: (body.message ?? "").slice(0, 3000),
  });

  return NextResponse.json(
    {
      ok: true,
      leadId: lead.id,
      message: "Quote request received — your dedicated account manager will reply within one business day.",
    },
    { status: 201 }
  );
}
