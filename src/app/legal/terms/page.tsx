import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern Lustra laundry services, bookings, memberships, and liability.",
  path: "/legal/terms",
});

const sections = [
  {
    title: "1. Services",
    body: "Lustra provides self-service laundromat facilities, pickup & delivery laundry, commercial laundry programs, and dry cleaning. Service availability varies by location and capacity shown at booking time.",
  },
  {
    title: "2. Bookings & cancellation",
    body: "Pickups may be rescheduled or cancelled free of charge up to 2 hours before the window. Machine reservations hold for 15 minutes past the slot start. Repeated no-shows may limit reservation privileges.",
  },
  {
    title: "3. Pricing & payment",
    body: "Wash & fold is billed by actual weight measured on calibrated scales at our facility; you are charged after weighing, never before. Dry cleaning is billed per item as listed. Prices shown online include all fees; taxes are added at checkout where applicable.",
  },
  {
    title: "4. Care standard & liability",
    body: "We follow garment care labels and industry best practice. Items are insured up to $1,000 per garment against loss or damage attributable to our process. Claims must be reported within 7 days of delivery; we resolve within 48 hours. We are not liable for inherent weaknesses, pre-existing damage, or items left in pockets.",
  },
  {
    title: "5. Memberships",
    body: "Subscriptions renew monthly, can be paused or cancelled anytime effective the next cycle, and unused allowance rolls over up to 50% of the plan. Fees are non-refundable for the current cycle once a pickup has occurred.",
  },
  {
    title: "6. Acceptable use",
    body: "Do not send hazardous materials, heavily soiled biohazard items (outside commercial healthcare contracts), or items of extraordinary value without prior written arrangement. We may refuse items at intake with a full refund of any associated charge.",
  },
  {
    title: "7. Disputes",
    body: `We want to fix problems, not litigate them — contact ${site.supportEmail} first. Unresolved disputes are governed by the laws of Texas and resolved in the courts of Travis County, or small-claims court where eligible.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-hero-gradient pb-24 pt-28 md:pt-40">
      <div className="section max-w-3xl">
        <h1 className="h-display text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">Last updated: July 2026 · {site.legalName}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="h-display text-xl">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
