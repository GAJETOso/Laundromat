import { NextRequest, NextResponse } from "next/server";
import { getMachines, getAvailabilitySummary } from "@/lib/machines";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("summary")) {
    return NextResponse.json(
      { summary: getAvailabilitySummary(), updatedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
    );
  }

  const locationId = searchParams.get("location") ?? undefined;
  return NextResponse.json(
    { machines: getMachines(locationId), updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}
