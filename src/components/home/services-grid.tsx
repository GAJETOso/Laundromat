import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section className="section py-24 md:py-32" aria-labelledby="services-heading">
      <SectionHeading
        eyebrow="Services"
        title="Four ways to never do laundry again"
        body="Whether you press the button yourself or never touch a machine again — every Lustra service runs on the same obsessive standard of care."
      />
      <Stagger className="grid gap-6 md:grid-cols-2">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.slug}>
              <Link
                href={s.href}
                className={cn(
                  "card group relative flex h-full flex-col overflow-hidden bg-gradient-to-br p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg md:p-10",
                  s.accent
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-6 w-6 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-aqua-500"
                    aria-hidden
                  />
                </div>
                <h3 className="h-display mt-6 text-2xl">{s.name}</h3>
                <p className="mt-1 text-sm font-semibold text-aqua-600 dark:text-aqua-400">{s.short}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.features.slice(0, 4).map((f) => (
                    <span key={f} className="chip !bg-white/50 dark:!bg-white/5">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm font-bold">
                  From <span className="text-gradient">{s.startingPrice}</span>
                </p>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
