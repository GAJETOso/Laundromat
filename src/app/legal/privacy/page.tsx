import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Lustra collects, uses, and protects your personal data — NDPA (Nigeria) and GDPR aligned.",
  path: "/legal/privacy",
});

const sections = [
  {
    title: "1. What we collect",
    body: "Account details (name, email, phone), addresses for pickup and delivery, order history and laundry preferences, payment tokens (never raw card numbers — payments are processed by Stripe and PayPal), device and usage data for site analytics, and messages you send us on any channel including WhatsApp and Telegram.",
  },
  {
    title: "2. How we use it",
    body: "To operate your orders end-to-end, remember your preferences, send transactional notifications on the channels you choose, improve the service through aggregated analytics, and — only with your consent — send promotional offers. We never sell personal data.",
  },
  {
    title: "3. Sharing",
    body: "Data is shared only with processors necessary to run the service: payment providers (Paystack, Flutterwave, Stripe, PayPal), messaging providers (Twilio, Meta WhatsApp Business, Telegram), mapping (Google Maps), and cloud infrastructure (Vercel, Supabase, Cloudinary). Each is bound by a data processing agreement.",
  },
  {
    title: "4. Your rights (NDPA & GDPR)",
    body: `You may access, correct, export, or delete your data at any time from Dashboard → Settings → Security, or by emailing ${site.supportEmail}. We respond to verified requests within 30 days, as required by the Nigeria Data Protection Act 2023 (NDPA), and we honour equivalent rights under the GDPR for customers abroad. Complaints may also be directed to the Nigeria Data Protection Commission.`,
  },
  {
    title: "5. Retention & security",
    body: "Order records are kept for 7 years for tax compliance; marketing data until you withdraw consent; everything else for the life of your account plus 90 days. Data is encrypted in transit (TLS 1.3) and at rest (AES-256), access is role-gated with 2FA, and all administrative actions are audit-logged.",
  },
  {
    title: "6. Cookies",
    body: "Strictly necessary cookies keep you signed in and remember your theme. Analytics and marketing cookies (GA4, Meta Pixel, TikTok Pixel, Microsoft Clarity) load only after you opt in via the consent banner and can be withdrawn at any time.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-hero-gradient pb-24 pt-28 md:pt-40">
      <div className="section max-w-3xl">
        <h1 className="h-display text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: July 2026 · {site.legalName}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="h-display text-xl">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
