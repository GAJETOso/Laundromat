export const site = {
  name: "Lustra",
  legalName: "Lustra Laundry Ltd.",
  tagline: "Laundry, elevated.",
  description:
    "Lustra is Nigeria's premier tech-driven laundry platform — smart self-service laundromats across Lagos, on-demand pickup & delivery, enterprise commercial laundry, and couture-grade dry cleaning.",
  url: "https://lustra.example.com",
  phone: "+234 812 345 0000",
  whatsapp: "+2348123450000",
  telegram: "LustraLaundryBot",
  email: "hello@lustra.example.com",
  supportEmail: "support@lustra.example.com",
  address: {
    street: "14 Admiralty Way, Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    zip: "106104",
    country: "NG",
  },
  social: {
    instagram: "https://instagram.com/lustralaundry",
    twitter: "https://twitter.com/lustralaundry",
    facebook: "https://facebook.com/lustralaundry",
    linkedin: "https://linkedin.com/company/lustralaundry",
    tiktok: "https://tiktok.com/@lustralaundry",
  },
  hours: "Open daily · 6:00 AM – 11:00 PM",
  founded: 2019,
} as const;

export const whatsappLink = (message = "Hi Lustra! I'd like to book a laundry pickup.") =>
  `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const telegramLink = () => `https://t.me/${site.telegram}`;
