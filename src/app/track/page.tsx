import { Suspense } from "react";
import { OrderTracker } from "@/components/tracking/order-tracker";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track My Order",
  description:
    "Live tracking for your Lustra laundry order — from pickup to cleaning to delivery, with driver ETA.",
  path: "/track",
});

export default function TrackPage() {
  return (
    <div className="bg-hero-gradient pb-24 pt-28 md:pt-36">
      <div className="section">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
            Order tracking
          </p>
          <h1 className="h-display mt-3 text-4xl sm:text-5xl">Where&apos;s my laundry?</h1>
          <p className="mt-4 text-muted">
            Every order is barcoded and tracked at each stage. Enter your order ID for live status
            and driver ETA.
          </p>
        </div>
        <Suspense>
          <OrderTracker />
        </Suspense>
      </div>
    </div>
  );
}
