import { NextResponse } from "next/server";

/**
 * Android App Links (deep linking + credential sharing).
 *
 * Replace the sha256 fingerprint with your release signing key's fingerprint
 * (Play Console → App integrity) once the Android app exists.
 * See docs/MOBILE.md § Deep links.
 */
export async function GET() {
  return NextResponse.json(
    [
      {
        relation: [
          "delegate_permission/common.handle_all_urls",
          "delegate_permission/common.get_login_creds",
        ],
        target: {
          namespace: "android_app",
          package_name: "com.lustra.app",
          sha256_cert_fingerprints: [
            "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00",
          ],
        },
      },
    ],
    { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" } }
  );
}
