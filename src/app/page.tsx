import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { ServicesGrid } from "@/components/home/services-grid";
import { MachineAvailability } from "@/components/home/machine-availability";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { PricingPreview } from "@/components/home/pricing-preview";
import { AppDownload } from "@/components/home/app-download";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { faqs } from "@/lib/data";
import { JsonLd, faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <Stats />
      <ServicesGrid />
      <HowItWorks />
      <MachineAvailability />
      <PricingPreview />
      <Testimonials />
      <AppDownload />

      <section className="section pb-24 md:pb-32" aria-labelledby="faq-heading">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          body="Everything you're wondering, from turnaround times to what happens if a sock goes missing."
        />
        <FaqAccordion items={faqs.slice(0, 6)} />
        <p className="mt-8 text-center">
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-aqua-600 hover:underline dark:text-aqua-400">
            See all FAQs <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </section>

      <CtaBanner />
    </>
  );
}
