import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

export function CtaBanner({
  title = "Reclaim your weekends.",
  body = "Book your first pickup today and get 20% off with code FRESH20. Cancel anytime, love it always.",
  primaryHref = "/book",
  primaryLabel = "Schedule Pickup",
  secondaryHref = "/pricing",
  secondaryLabel = "See Pricing",
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="section pb-24 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-5xl bg-cta-gradient p-10 text-center text-white md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_-20%,rgba(255,255,255,.25),transparent_70%)]"
          />
          <h2 className="h-display relative text-3xl sm:text-4xl md:text-5xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">{body}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-ink-900 shadow-soft-lg transition-transform hover:-translate-y-0.5"
            >
              {primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
