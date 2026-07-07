import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { serviceContent } from "@/lib/service-content";
import { buildMetadata, JsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { CtaBanner } from "@/components/shared/cta-banner";

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug];
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} — ${service.headline}`,
    description: service.intro,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug];
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service.name, service.intro, `/services/${service.slug}`),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <div className="bg-hero-gradient pb-20 pt-28 md:pt-40">
        <div className="section">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <Link href="/" className="hover:text-aqua-500">Home</Link>
            <span className="mx-2" aria-hidden>/</span>
            <Link href="/services" className="hover:text-aqua-500">Services</Link>
            <span className="mx-2" aria-hidden>/</span>
            <span aria-current="page">{service.name}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
            {service.eyebrow}
          </p>
          <h1 className="h-display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{service.headline}</h1>
          <p className="mt-5 max-w-2xl text-muted sm:text-lg">{service.intro}</p>
          <ul className="mt-7 flex flex-wrap gap-3">
            {service.heroBullets.map((b) => (
              <li key={b} className="chip !border-aqua-500/30 !bg-aqua-500/10 !px-4 !py-2 text-sm">
                <Check className="h-4 w-4 text-aqua-500" aria-hidden /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/book" className="btn-primary !px-8 !py-4">
              Book now <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/pricing" className="btn-secondary !px-8 !py-4">
              See pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Narrative sections */}
      <section className="section grid gap-6 py-24 lg:grid-cols-3">
        {service.sections.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="card h-full p-8">
              <span className="font-display text-4xl font-bold text-aqua-500/30">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h-display mt-4 text-xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Feature grid */}
      <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 py-24">
        <div className="section">
          <SectionHeading eyebrow="What's included" title="Every detail, handled" />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="card flex h-full gap-4 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-aqua-500/10">
                    <Check className="h-5 w-5 text-aqua-500" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 text-center">
            <p className="text-sm font-semibold text-muted">{service.pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section py-24">
        <SectionHeading eyebrow="FAQ" title={`${service.name}, answered`} />
        <FaqAccordion items={service.faqs} />
      </section>

      <CtaBanner title={service.cta.title} body={service.cta.body} />
    </>
  );
}
