import { NextResponse } from "next/server";
import { site, whatsappLink, telegramLink } from "@/lib/site";

/**
 * Remote configuration for the iOS/Android apps.
 *
 * Apps call this on launch to gate minimum versions, toggle features without
 * a store release, and pick up support links and theme accents. Contract is
 * typed in mobile/api-client/lustra-api.ts (AppConfig).
 */
export async function GET() {
  return NextResponse.json(
    {
      minSupportedVersion: { ios: "1.0.0", android: "1.0.0" },
      latestVersion: { ios: "1.0.0", android: "1.0.0" },
      storeLinks: {
        appStore: "https://apps.apple.com/app/lustra-laundry/id0000000000",
        playStore: "https://play.google.com/store/apps/details?id=com.lustra.app",
      },
      featureFlags: {
        machineReservations: true,
        qrActivation: true,
        driverLiveTracking: true,
        loyaltyRedemption: true,
        subscriptions: true,
        commercialPortal: true,
        assistantChat: true,
        applePay: true,
        googlePay: true,
      },
      support: {
        whatsapp: whatsappLink("Hi Lustra! I need help with the app."),
        telegram: telegramLink(),
        phone: site.phone,
        email: site.supportEmail,
      },
      locale: { currency: "NGN", country: "NG", language: "en-NG", units: "metric" },
      theme: {
        accentLight: "#06b6d4",
        accentDark: "#22d3ee",
        ctaGradient: ["#06b6d4", "#4867a5"],
      },
    },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
