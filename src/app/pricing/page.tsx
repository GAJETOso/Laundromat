import { PriceCalculator } from "@/components/pricing/calculator";
import { PricingPreview } from "@/components/home/pricing-preview";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { machinePricing, dryCleaningPricing } from "@/lib/data";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing — Wash & Fold from $1.75/lb, Machines from $3.50",
  description:
    "Transparent laundry pricing: interactive wash & fold calculator, self-service machine rates, dry cleaning price list, and membership plans. No hidden fees, free pickup & delivery.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />

      <div className="bg-hero-gradient pb-16 pt-28 md:pt-40">
        <div className="section text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">Pricing</p>
          <h1 className="h-display mx-auto mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Honest prices. <span className="text-gradient">Zero surprises.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted sm:text-lg">
            Estimate your exact cost before you book. You&apos;re only ever charged for the actual
            weight we clean — never before, never more.
          </p>
        </div>
      </div>

      <section className="section pb-24" aria-labelledby="calculator-heading">
        <Reveal>
          <PriceCalculator />
        </Reveal>
      </section>

      <section className="section grid gap-8 pb-24 lg:grid-cols-2" aria-label="Price lists">
        <Reveal>
          <div className="card h-full p-8">
            <h2 className="h-display text-2xl">Self-service machines</h2>
            <p className="mt-2 text-sm text-muted">
              Pay per cycle with QR activation. Members save 15–20%.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgb(var(--border))] text-left text-xs uppercase tracking-wider text-muted">
                    <th className="pb-3 pr-4 font-semibold">Machine</th>
                    <th className="pb-3 pr-4 font-semibold">Price</th>
                    <th className="pb-3 font-semibold">Cycle</th>
                  </tr>
                </thead>
                <tbody>
                  {machinePricing.map((m) => (
                    <tr key={m.machine} className="border-b border-[rgb(var(--border))]/60 last:border-0">
                      <td className="py-3 pr-4 font-medium">{m.machine}</td>
                      <td className="py-3 pr-4 font-bold text-aqua-600 dark:text-aqua-400">{formatCurrency(m.price)}</td>
                      <td className="py-3 text-muted">{m.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card h-full p-8">
            <h2 className="h-display text-2xl">Dry cleaning</h2>
            <p className="mt-2 text-sm text-muted">
              Includes inspection, pressing, and free minor repairs. Express +50%.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgb(var(--border))] text-left text-xs uppercase tracking-wider text-muted">
                    <th className="pb-3 pr-4 font-semibold">Garment</th>
                    <th className="pb-3 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {dryCleaningPricing.map((d) => (
                    <tr key={d.item} className="border-b border-[rgb(var(--border))]/60 last:border-0">
                      <td className="py-3 pr-4 font-medium">{d.item}</td>
                      <td className="py-3 font-bold text-aqua-600 dark:text-aqua-400">{formatCurrency(d.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-label="Membership plans">
        <SectionHeading
          eyebrow="Commercial"
          title="Running a business?"
          body="Hotels, restaurants, clinics, gyms, and hosts get volume pricing that drops with scale — typically 30–45% below retail rates, with SLA-backed turnaround."
          className="section !mb-8"
        />
        <p className="section mb-20 text-center">
          <a href="/commercial" className="btn-secondary">Request a commercial quote</a>
        </p>
        <PricingPreview />
      </section>

      <div className="pt-24">
        <CtaBanner />
      </div>
    </>
  );
}
