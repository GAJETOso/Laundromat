import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { membershipPlans } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { formatCurrency, cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 py-24 md:py-32" aria-labelledby="pricing-heading">
      <div className="section">
        <SectionHeading
          eyebrow="Membership"
          title="Simple pricing. Serious perks."
          body="Pay as you go, or let a membership quietly handle everything. Every plan earns loyalty points."
        />
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={cn(
                  "card relative flex h-full flex-col p-8",
                  plan.highlighted && "border-aqua-500/50 shadow-glow"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-cta-gradient px-4 py-1.5 text-xs font-bold text-white shadow-glow">
                    Most popular
                  </span>
                )}
                <h3 className="h-display text-xl">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>
                <p className="mt-6">
                  <span className="font-display text-5xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="ml-1 text-sm text-muted">/ {plan.cadence}</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={cn("mt-8 w-full", plan.highlighted ? "btn-primary" : "btn-secondary")}
                >
                  {plan.price === 0 ? "Start free" : `Choose ${plan.name}`}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
