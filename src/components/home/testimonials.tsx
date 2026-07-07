import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function Testimonials() {
  return (
    <section className="section py-24 md:py-32" aria-labelledby="reviews-heading">
      <SectionHeading
        eyebrow="Reviews"
        title="Loved by households. Trusted by enterprises."
        body="From graduate students to hotel general managers — 4.9 stars across 2,300+ verified reviews."
      />
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="card flex h-full flex-col p-7 transition-shadow hover:shadow-soft-lg">
              <div className="flex gap-1 text-amber-400" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 border-t border-[rgb(var(--border))] pt-4">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
