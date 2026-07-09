import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Assistant } from "@/components/chat/assistant";
import { JsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Laundromat, Pickup & Delivery, Dry Cleaning`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "laundromat",
    "laundry pickup and delivery",
    "wash and fold",
    "dry cleaning",
    "commercial laundry",
    "self-service laundry",
    "laundry Lagos",
    "laundromat Lekki",
    "dry cleaning Victoria Island",
    "laundry pickup Lagos",
  ],
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#060a14" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
try {
  const stored = localStorage.getItem('lustra-theme');
  const dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={localBusinessJsonLd()} />
      </head>
      <body className="min-h-dvh pb-16 sm:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-aqua-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCta />
        <Assistant />
        <BottomNav />
        {/* KOMVIA AI bubble — positioned left; the native Assistant occupies bottom-right */}
        <script
          async
          src="https://komvia-ai-os.vercel.app/js/embed.js"
          data-project="laundromat"
          data-position="left"
        />
      </body>
    </html>
  );
}
