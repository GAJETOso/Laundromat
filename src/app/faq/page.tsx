import { FaqAccordion } from "@/components/shared/faq-accordion";
import { CtaBanner } from "@/components/shared/cta-banner";
import { faqs } from "@/lib/data";
import { buildMetadata, JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ — Everything About Lustra Laundry",
  description:
    "Answers about pickup & delivery, machine reservations, dry cleaning, commercial laundry, payments, turnaround times, and our damage guarantee.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <div className="bg-hero-gradient pb-16 pt-28 md:pt-40">
        <div className="section text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">FAQ</p>
          <h1 className="h-display mx-auto mt-3 max-w-2xl text-4xl sm:text-5xl">
            Everything you&apos;re wondering
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Can&apos;t find it here? Lumi (the chat bubble) answers instantly, and humans reply on
            WhatsApp within minutes.
          </p>
        </div>
      </div>
      <div className="section pb-24">
        <FaqAccordion items={[...faqs]} />
      </div>
      <CtaBanner />
    </>
  );
}
