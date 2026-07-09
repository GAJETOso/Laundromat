import { Building2, Hotel, Utensils, Stethoscope, Dumbbell, Scissors, GraduationCap, Home } from "lucide-react";
import { QuoteForm } from "@/components/commercial/quote-form";
import { RoiCalculator } from "@/components/commercial/roi-calculator";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Commercial Laundry for Hotels, Restaurants, Clinics & Hosts",
  description:
    "SLA-backed commercial laundry in Lagos with volume pricing, route pickups, dedicated account management, and a live enterprise dashboard. Serving hotels, restaurants, healthcare, gyms, salons, schools, and shortlet operators.",
  path: "/commercial",
});

const industries = [
  { icon: Hotel, name: "Hotels", blurb: "Linen programs with nightly routes and peak-season surge capacity." },
  { icon: Utensils, name: "Restaurants", blurb: "Chef whites, aprons, and table linens back before every service." },
  { icon: Stethoscope, name: "Healthcare", blurb: "Thermal disinfection with documented, inspection-ready protocols." },
  { icon: Home, name: "Shortlet & Airbnb Hosts", blurb: "Sealed turnover kits and same-day SLAs across all your units." },
  { icon: Dumbbell, name: "Gyms & Fitness", blurb: "High-volume towel programs with odor-elimination chemistry." },
  { icon: Scissors, name: "Salons & Spas", blurb: "Soft, bright towels and robes that match your brand." },
  { icon: GraduationCap, name: "Schools", blurb: "Athletics, dorm programs, and uniform cleaning at scale." },
  { icon: Building2, name: "Corporate & Industrial", blurb: "Uniform rental-free programs and industrial textile care." },
];

const caseStudies = [
  {
    client: "The Meridian Hotel, Victoria Island — 120 rooms",
    metric: "31%",
    metricLabel: "linen cost reduction",
    body: "Replaced an ageing in-house laundry — and its diesel bill — with nightly Lustra routes. 98.7% on-time SLA over the last quarter, and the old laundry room is now a revenue-generating gym.",
  },
  {
    client: "Solstice Restaurant Group — 3 venues",
    metric: "2 hrs",
    metricLabel: "admin saved weekly",
    body: "Nightly pickup after close, chef whites and linens delivered before morning prep. One consolidated invoice replaced three vendors and a drawer of receipts.",
  },
  {
    client: "Eko Shortlets — 27 apartments across Lekki & VI",
    metric: "0",
    metricLabel: "missed turnovers in 12 months",
    body: "Sealed turnover kits per bed size, kit inventory visible in the dashboard, and same-day emergency service used exactly four times — all four saved a five-star review.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Commercial", path: "/commercial" }])} />

      <div className="bg-hero-gradient pb-20 pt-28 md:pt-40">
        <div className="section grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
              Commercial & B2B
            </p>
            <h1 className="h-display mt-3 text-4xl sm:text-5xl md:text-6xl">
              The linen program your ops team <span className="text-gradient">stops thinking about</span>
            </h1>
            <p className="mt-5 max-w-xl text-muted sm:text-lg">
              SLA-backed turnaround, route pickups scheduled around your service hours, a live
              dashboard, and one clean monthly invoice. 180+ businesses run on Lustra.
            </p>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["98.7%", "on-time SLA"],
                ["30–45%", "below retail"],
                ["1 day", "quote turnaround"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-bold text-gradient">{v}</dd>
                  <dd className="mt-1 text-xs text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal delay={0.15}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>

      <section className="section py-24">
        <SectionHeading
          eyebrow="Industries"
          title="Built for your operation"
          body="Every industry gets its own protocols, chemistry, and turnaround windows — not a one-size-fits-all route."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <StaggerItem key={ind.name}>
                <div className="card h-full p-6 transition-shadow hover:shadow-soft-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="h-display mt-4 text-lg">{ind.name}</h3>
                  <p className="mt-2 text-sm text-muted">{ind.blurb}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 py-24">
        <div className="section grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The math"
              title="Model your savings in 10 seconds"
              body="Drag the slider to your weekly volume. The model uses fully-loaded in-house costs — the ones that hide in five different budget lines."
              className="!mb-8"
            />
            <RoiCalculator />
          </div>
          <div className="space-y-6 lg:pt-24">
            {caseStudies.map((cs) => (
              <Reveal key={cs.client}>
                <div className="card p-8">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-bold text-gradient">{cs.metric}</span>
                    <span className="text-sm font-semibold text-muted">{cs.metricLabel}</span>
                  </div>
                  <h3 className="h-display mt-3 text-lg">{cs.client}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cs.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-24">
        <SectionHeading
          eyebrow="Onboarding"
          title="Live within a week"
          body="Site visit → linen baseline → route setup → dashboard access → your account manager's direct line. Most accounts run their first route within 7 days of signing."
        />
        <p className="text-center">
          <a href="#top" className="btn-primary !px-8 !py-4">Request your quote above</a>
        </p>
      </section>
    </>
  );
}
