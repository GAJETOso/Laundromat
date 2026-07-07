export const site = {
  name: "Lustra",
  legalName: "Lustra Laundry Co.",
  tagline: "Laundry, elevated.",
  description:
    "Lustra is the modern laundry platform — smart self-service laundromats, on-demand pickup & delivery, enterprise commercial laundry, and couture-grade dry cleaning.",
  url: "https://lustra.example.com",
  phone: "+1 (555) 012-3456",
  whatsapp: "+15550123456",
  telegram: "LustraLaundryBot",
  email: "hello@lustra.example.com",
  supportEmail: "support@lustra.example.com",
  address: {
    street: "1200 Meridian Avenue",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "US",
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
