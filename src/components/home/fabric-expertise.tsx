import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const fabricsRow1 = [
  "Silk", "Cotton", "Cashmere", "Tweed", "Linen", "Wool", "Velvet", "Chiffon",
  "Denim", "Organza", "Satin", "Modal",
];

const fabricsRow2 = [
  "Ankara", "Aso-Oke", "Lace", "Brocade", "Leather", "Suede", "Polyester",
  "Sequins & Beading", "Tulle", "Corduroy", "Bamboo", "Hemp",
];

function MarqueeRow({ fabrics, reverse = false }: { fabrics: string[]; reverse?: boolean }) {
  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden
    >
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {[...fabrics, ...fabrics].map((fabric, i) => (
          <span
            key={`${fabric}-${i}`}
            className="chip shrink-0 !px-5 !py-2.5 !text-sm font-semibold transition-colors hover:!border-aqua-500/60 hover:text-aqua-600 dark:hover:text-aqua-400"
          >
            {fabric}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FabricExpertise() {
  return (
    <section className="py-4 pb-24 md:pb-32" aria-labelledby="fabrics-heading">
      <div className="section">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
            Fabric mastery
          </p>
          <h2 id="fabrics-heading" className="h-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            The standard of excellence
            <br />
            <span className="text-gradient">for your wardrobe</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Every thread is an investment. Our specialists command{" "}
            <strong className="text-[rgb(var(--fg))]">20+ specialized fabrics</strong> — from the
            intricate weaves of traditional attire to the most delicate silk and organza — with
            eco-friendly chemistry that lifts impurities while protecting fiber integrity.
          </p>
        </Reveal>

        {/* Accessible fabric list for screen readers; visual marquee is decorative. */}
        <p className="sr-only">
          Fabrics we handle: {[...fabricsRow1, ...fabricsRow2].join(", ")}.
        </p>

        <div className="space-y-3">
          <MarqueeRow fabrics={fabricsRow1} />
          <MarqueeRow fabrics={fabricsRow2} reverse />
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="card flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
              <Gem className="h-7 w-7" aria-hidden />
            </span>
            <div className="flex-1">
              <h3 className="h-display text-lg">Traditional &amp; cultural attire specialists</h3>
              <p className="mt-1 text-sm text-muted">
                Agbada, Aso-Oke, Ankara, kaftans, lace, and gele — hand-finished by artisans who
                understand what these garments mean, returned in pristine, like-new condition.
              </p>
            </div>
            <Link
              href="/services/traditional-attire"
              className="btn-secondary shrink-0 !px-5 !py-2.5 text-aqua-600 dark:text-aqua-400"
            >
              Learn more <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
