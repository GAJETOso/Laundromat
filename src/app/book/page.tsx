import { BookingWizard } from "@/components/booking/booking-wizard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Online — Pickup in 60 Seconds",
  description:
    "Schedule laundry pickup & delivery, dry cleaning, or reserve a machine at any Lustra laundromat. Free pickup, 24-hour turnaround, live tracking.",
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="bg-hero-gradient pb-24 pt-28 md:pt-36">
      <div className="section">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
            Book online
          </p>
          <h1 className="h-display mt-3 text-4xl sm:text-5xl">Sixty seconds to freedom</h1>
          <p className="mt-4 text-muted">
            Five quick steps. No payment until your laundry is weighed. Cancel free up to 2 hours
            before pickup.
          </p>
        </div>
        <BookingWizard />
      </div>
    </div>
  );
}
