import Link from "next/link";
import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react";
import { site, whatsappLink, telegramLink } from "@/lib/site";
import { Logo } from "./logo";
import { NewsletterForm } from "@/components/shared/newsletter-form";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services/self-service", label: "Self-Service Laundromat" },
      { href: "/services/pickup-delivery", label: "Pickup & Delivery" },
      { href: "/services/commercial", label: "Commercial Laundry" },
      { href: "/services/dry-cleaning", label: "Dry Cleaning" },
      { href: "/services/wash-fold", label: "Wash & Fold" },
      { href: "/services/traditional-attire", label: "Traditional Attire" },
      { href: "/services/express", label: "Express Laundry" },
      { href: "/services/subscriptions", label: "Subscriptions" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/locations", label: "Locations" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/commercial", label: "For Business" },
    ],
  },
  {
    title: "Customers",
    links: [
      { href: "/book", label: "Book Online" },
      { href: "/pricing", label: "Pricing" },
      { href: "/track", label: "Track My Order" },
      { href: "/dashboard", label: "My Account" },
      { href: "/dashboard/rewards", label: "Rewards" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[rgb(var(--border))] bg-ink-900 text-ink-100">
      <div className="section grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-200/80">
            {site.description}
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-ink-200/80">
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-aqua-400" aria-hidden />
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-aqua-400" aria-hidden />
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {site.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-aqua-400" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-emerald-500"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={telegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-sky-500"
              aria-label="Message us on Telegram"
            >
              <Send className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-aqua-400">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-ink-200/80 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="section border-t border-white/10 py-8">
        <div className="glass flex flex-col items-start justify-between gap-4 rounded-3xl !border-white/10 !bg-white/[0.04] p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-white">Fresh tips, exclusive offers</p>
            <p className="text-sm text-ink-200/70">Fabric care wisdom and member deals, twice a month. No spam, ever.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="section flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-ink-200/60 sm:flex-row">
        <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/legal/terms" className="hover:text-white">Terms of Service</Link>
          <Link href="/legal/accessibility" className="hover:text-white">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
