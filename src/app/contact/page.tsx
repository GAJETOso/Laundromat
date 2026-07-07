import { MessageCircle, Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site, whatsappLink, telegramLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact — WhatsApp, Telegram, Phone & Live Chat",
  description:
    "Reach Lustra on WhatsApp, Telegram, phone, email, or live chat. Humans reply within minutes, 7 AM – 10 PM daily.",
  path: "/contact",
});

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    body: "Fastest for bookings and order questions — Lumi answers instantly, humans within minutes.",
    href: whatsappLink("Hi Lustra! I have a question."),
    label: site.phone,
    accent: "hover:border-emerald-500/50",
  },
  {
    icon: Send,
    title: "Telegram",
    body: "Full booking, tracking, and support bot — plus a human /help command.",
    href: telegramLink(),
    label: `@${site.telegram}`,
    accent: "hover:border-sky-500/50",
  },
  {
    icon: Phone,
    title: "Phone",
    body: "Talk to a person 7 AM – 10 PM, every day of the week.",
    href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
    label: site.phone,
    accent: "hover:border-aqua-500/50",
  },
  {
    icon: Mail,
    title: "Email",
    body: "For anything detailed — commercial inquiries, feedback, press.",
    href: `mailto:${site.email}`,
    label: site.email,
    accent: "hover:border-violet-500/50",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />

      <div className="bg-hero-gradient pb-16 pt-28 md:pt-40">
        <div className="section text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">Contact</p>
          <h1 className="h-display mx-auto mt-3 max-w-2xl text-4xl sm:text-5xl">
            Talk to a human. <span className="text-gradient">Or a very good bot.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Pick your channel — we&apos;re equally fast on all of them.
          </p>
        </div>
      </div>

      <div className="section grid gap-10 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-4">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`card flex items-start gap-5 p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft-lg ${c.accent}`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h2 className="h-display text-lg">{c.title}</h2>
                    <p className="mt-1 text-sm text-muted">{c.body}</p>
                    <p className="mt-2 text-sm font-bold text-aqua-600 dark:text-aqua-400">{c.label}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}

          <Reveal delay={0.3}>
            <div className="card p-6 text-sm text-muted">
              <p className="flex items-center gap-3 font-semibold text-[rgb(var(--fg))]">
                <MapPin className="h-4 w-4 text-aqua-500" aria-hidden /> Headquarters
              </p>
              <p className="mt-1 pl-7">
                {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p className="mt-3 flex items-center gap-3 font-semibold text-[rgb(var(--fg))]">
                <Clock className="h-4 w-4 text-aqua-500" aria-hidden /> Support hours
              </p>
              <p className="mt-1 pl-7">7 AM – 10 PM, every day</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}
