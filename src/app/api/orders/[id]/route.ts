import { NextResponse } from "next/server";
import { getBooking, getDemoTracking } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id.trim();
  if (!id || id.length > 40) {
    return NextResponse.json({ error: "Invalid order ID." }, { status: 400 });
  }

  const booking = getBooking(id);
  if (booking) {
    return NextResponse.json({
      id: booking.id,
      status: booking.status,
      timeline: booking.timeline,
      eta: null,
      service: booking.service,
    });
  }

  // Demo mode: any well-formed ID returns a deterministic simulated order so the
  // tracking experience is fully explorable without a database.
  return NextResponse.json(getDemoTracking(id));
}
