import { NextResponse } from "next/server";

/**
 * Apple Universal Links (iOS deep linking).
 *
 * Replace TEAMID with your Apple Developer Team ID once the app identifier
 * exists. Paths mirror the web routes so any shared Lustra URL opens the
 * matching native screen (see docs/MOBILE.md § Deep links).
 */
export async function GET() {
  return NextResponse.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appIDs: ["TEAMID.com.lustra.app"],
            components: [
              { "/": "/book", comment: "Booking wizard" },
              { "/": "/track", comment: "Order tracking" },
              { "/": "/track?id=*", comment: "Order tracking with ID" },
              { "/": "/locations", comment: "Store finder" },
              { "/": "/locations/*", comment: "Specific location" },
              { "/": "/pricing", comment: "Pricing & calculator" },
              { "/": "/services/*", comment: "Service pages" },
              { "/": "/dashboard*", comment: "Customer account" },
              { "/": "/m/*", comment: "QR machine activation (m/<machineId>)" },
            ],
          },
        ],
      },
      webcredentials: { apps: ["TEAMID.com.lustra.app"] },
    },
    { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" } }
  );
}
