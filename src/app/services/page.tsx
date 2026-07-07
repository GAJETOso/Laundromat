import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServicesGrid } from "@/components/home/services-grid";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { secondaryServices } from "@/lib/data";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — Laundromat, Pickup & Delivery, Commercial, Dry Cleaning",
  description:
    "Every Lustra laundry service: smart self-service laundromats, pickup & delivery wash & fold, enterprise commercial laundry, couture dry cleaning, pressing, express, and subscriptions.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />

      <div className="bg-hero-gradient pb-4 pt-28 md:pt-40">
        <div className="section text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">Services</p>
          <h1 className="h-display mx-auto mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            One platform for <span className="text-gradient">every thread</span> you own
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted sm:text-lg">
            Do it yourself in a space you&apos;ll actually enjoy, or never touch a machine again.
            Either way, the standard of care is identical.
          </p>
        </div>
      </div>

      <ServicesGrid />

      <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 py-24">
        <div className="section">
          <SectionHeading
            eyebrow="Specialty services"
            title="And everything in between"
            body="Finishing touches and specialty care that complete the wardrobe."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryServices.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    href={s.href}
                    className="card group flex h-full items-center gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold">{s.name}</h3>
                      <p className="mt-0.5 text-sm text-muted">{s.short}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-aqua-500" aria-hidden />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <div className="pt-24">
        <CtaBanner />
      </div>
    </>
  );
}
