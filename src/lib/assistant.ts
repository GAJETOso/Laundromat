/**
 * Lumi — the Lustra AI laundry concierge.
 *
 * One brain, three channels: the website widget, the WhatsApp webhook, and the
 * Telegram webhook all route messages through answer(). This implementation is
 * a deterministic intent engine with real pricing/availability data behind it;
 * in production, set ANTHROPIC_API_KEY and swap answer() for the LLM path in
 * docs/BOTS.md — the intent tools below become the model's tool belt.
 */

import { washFoldPricing, dryCleaningPricing, machinePricing, locations, faqs } from "./data";
import { getAvailabilitySummary } from "./machines";
import { site } from "./site";

type Intent = {
  match: RegExp;
  reply: (text: string) => string;
};

function priceEstimate(text: string): string | null {
  const kg = text.match(/(\d+(?:\.\d+)?)\s*(?:kg|kgs|kilo|kilogram)/i);
  if (!kg) return null;
  const weight = Math.max(parseFloat(kg[1]), washFoldPricing.minimumKg);
  const total = (weight * washFoldPricing.perKg).toLocaleString("en-NG");
  return `For ${kg[1]} kg of wash & fold: about ₦${total} (at ₦${washFoldPricing.perKg.toLocaleString("en-NG")}/kg, ${washFoldPricing.minimumKg} kg minimum). Express is 1.5×, same-day 2×. Want me to start a booking? Just say "book a pickup".`;
}

const intents: Intent[] = [
  {
    match: /(price|cost|how much|rate|charge)/i,
    reply: (text) => {
      const estimate = priceEstimate(text);
      if (estimate) return estimate;
      if (/dry\s*clean|suit|dress|coat|leather|silk/i.test(text)) {
        const items = dryCleaningPricing.slice(0, 6).map((i) => `• ${i.item}: ₦${i.price.toLocaleString("en-NG")}`).join("\n");
        return `Dry cleaning starts at ₦2,500 per garment:\n${items}\n\nFull list at ${site.url}/pricing. Express 6-hour service is +50%.`;
      }
      if (/machine|washer|dryer|self.?service/i.test(text)) {
        const rows = machinePricing.slice(0, 4).map((m) => `• ${m.machine}: ₦${m.price.toLocaleString("en-NG")}`).join("\n");
        return `Self-service machine pricing:\n${rows}\n\nMembers save 15–20%. Try the calculator at ${site.url}/pricing.`;
      }
      return `Wash & fold is ₦${washFoldPricing.perKg.toLocaleString("en-NG")}/kg (${washFoldPricing.minimumKg} kg minimum) with free pickup & delivery. Tell me roughly how many kilograms — e.g. "price for 8 kg" — and I'll estimate your total. Machines from ₦2,500/wash, dry cleaning from ₦2,500/garment.`;
    },
  },
  {
    match: /(book|pickup|schedule|collect|order)/i,
    reply: () =>
      `Let's get you booked. Fastest ways:\n1. Online in 60 seconds: ${site.url}/book\n2. WhatsApp us: wa.me/${site.whatsapp.replace(/\D/g, "")}\n3. Telegram: t.me/${site.telegram}\n\nPickups run 7 AM – 9 PM daily, and first-time customers get 20% off with code FRESH20.`,
  },
  {
    match: /(machine|washer|dryer).*(free|available|availab|open|now)|availab.*(machine|washer|dryer)/i,
    reply: () => {
      const summary = getAvailabilitySummary();
      const lines = locations.map((l) => {
        const s = summary[l.id];
        return `• ${l.name}: ${s?.washersAvailable ?? 0} washers, ${s?.dryersAvailable ?? 0} dryers free`;
      });
      return `Live availability right now:\n${lines.join("\n")}\n\nReserve up to 2 hours ahead at ${site.url}/locations — reservations hold for 15 minutes.`;
    },
  },
  {
    match: /(track|where.*order|status.*order|order.*status)/i,
    reply: () =>
      `Track any order live at ${site.url}/track — enter your order ID (looks like LST-XXXX). You'll see every stage from pickup to delivery, plus your driver's live ETA. If you booked with this number, I can also look it up here: just send the order ID.`,
  },
  {
    match: /(wedding|bridal|gown)/i,
    reply: () =>
      `Wedding dresses are handled in our couture studio: UV stain mapping, hand cleaning, and museum-grade preservation boxing for ₦85,000. Turnaround is 10–14 days, and we photograph every stage. Book at ${site.url}/services/dry-cleaning or reply "book" and we'll arrange collection.`,
  },
  {
    match: /(location|address|where|near|find.*(store|laundromat))/i,
    reply: () => {
      const lines = locations.map((l) => `• ${l.name} — ${l.address}, ${l.city} (${l.hours})`);
      return `We have ${locations.length} Lagos locations:\n${lines.join("\n")}\n\nDetails, parking, and live machine counts: ${site.url}/locations`;
    },
  },
  {
    match: /(hour|open|close|when)/i,
    reply: () =>
      `Lekki: 6 AM – 11 PM. Yaba: 6 AM – 1 AM. Victoria Island never closes — it's open 24 hours. Pickup & delivery windows run 7 AM – 9 PM daily.`,
  },
  {
    match: /(member|subscription|plan|loyalty|point|reward)/i,
    reply: () =>
      `Membership tiers:\n• Essential — free, 1 pt per ₦100\n• Lustra+ — ₦35,000/mo: 25 kg included, 15% off everything, priority 24h turnaround, 2× points\n• Family — ₦60,000/mo: 55 kg, 20% off, same-day twice a month, 3× points\n\n1 point = ₦1 credit, redeemable on anything. Details: ${site.url}/pricing`,
  },
  {
    match: /(commercial|business|hotel|restaurant|airbnb|b2b|bulk|volume|enterprise)/i,
    reply: () =>
      `Our commercial program covers hotels, restaurants, clinics, gyms, salons, schools, and shortlet operators — SLA-backed turnaround, route pickups, dedicated account manager, and monthly invoicing. Request a quote at ${site.url}/commercial and we'll respond within one business day.`,
  },
  {
    match: /(stain|spill|wine|blood|ink|coffee)/i,
    reply: () =>
      `Quick stain first aid: blot (never rub), use cold water first, and skip chlorine bleach entirely. Heat sets protein stains permanently. Mention the stain at drop-off and we pre-treat free of charge — our removal rate is above 94%. Full guide: ${site.url}/blog/stain-first-aid`,
  },
  {
    match: /(cancel|reschedul|change.*(pickup|booking|order))/i,
    reply: () =>
      `You can reschedule or cancel any pickup free up to 2 hours before the window — from your dashboard (${site.url}/dashboard), or just tell me the order ID here and I'll take care of it.`,
  },
  {
    match: /(human|agent|person|support|help|complain|problem|refund|damage)/i,
    reply: () =>
      `I'll connect you with the care team right away. Fastest options:\n• WhatsApp: wa.me/${site.whatsapp.replace(/\D/g, "")}\n• Phone: ${site.phone} (7 AM – 10 PM)\n• Email: ${site.supportEmail}\n\nFor damage or missing-item claims: report within 7 days and we resolve within 48 hours — garments are insured up to ₦500,000 per item.`,
  },
  {
    match: /(student|discount|promo|coupon|code|offer)/i,
    reply: () =>
      `Current offers:\n• FRESH20 — 20% off your first pickup & delivery order\n• Student discount — 15% off self-service with a valid student ID (Lustra Yaba)\n• Off-peak points — 2× loyalty points on weekday mornings\n\nPromo codes apply at checkout on ${site.url}/book.`,
  },
  {
    match: /(hi|hello|hey|good\s*(morning|afternoon|evening)|start)/i,
    reply: () =>
      `Hello! I'm Lumi, Lustra's laundry assistant. I can help you:\n• Get a price estimate ("price for 8 kg")\n• Book or reschedule a pickup\n• Check live machine availability\n• Track an order\n• Answer fabric-care questions\n\nWhat would you like to do?`,
  },
];

export function answer(text: string): string {
  const clean = text.trim();
  if (!clean) return "Tell me what you need — pricing, booking, tracking, or fabric-care advice.";

  for (const intent of intents) {
    if (intent.match.test(clean)) return intent.reply(clean);
  }

  // FAQ fallback: keyword overlap scoring.
  const words = clean.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  let best: { score: number; a: string } | null = null;
  for (const f of faqs) {
    const hay = (f.q + " " + f.a).toLowerCase();
    const score = words.filter((w) => hay.includes(w)).length;
    if (score >= 2 && (!best || score > best.score)) best = { score, a: f.a };
  }
  if (best) return best.a;

  return `I want to make sure you get the right answer. I can help with pricing, bookings, order tracking, machine availability, memberships, and fabric care — or connect you to a human on WhatsApp (wa.me/${site.whatsapp.replace(/\D/g, "")}) or ${site.phone}. What do you need?`;
}
