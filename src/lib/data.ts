import type { LucideIcon } from "lucide-react";
import {
  WashingMachine,
  Truck,
  Building2,
  Sparkles,
  Shirt,
  Wind,
  Gem,
  Zap,
  CalendarClock,
  Crown,
} from "lucide-react";

/* ---------------------------------- Services ---------------------------------- */

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  startingPrice: string;
  accent: string;
};

export const services: Service[] = [
  {
    slug: "self-service",
    name: "Self-Service Laundromat",
    short: "Smart machines, zero waiting",
    description:
      "Reserve washers and dryers before you arrive, activate machines with a QR scan, pay contactlessly, and watch cycle timers live from your phone.",
    icon: WashingMachine,
    href: "/services/self-service",
    features: [
      "Live machine availability",
      "Washer & dryer reservations",
      "QR code machine activation",
      "Contactless payment",
      "Cycle timers on your phone",
      "Loyalty points & memberships",
      "Student discounts",
      "Family packages",
    ],
    startingPrice: "$3.50 / wash",
    accent: "from-cyan-400/20 to-blue-500/10",
  },
  {
    slug: "pickup-delivery",
    name: "Pickup & Delivery",
    short: "Laundry that comes to you",
    description:
      "Schedule a pickup in 60 seconds. We collect, clean with your saved preferences, and deliver back to your door — tracked live, mile by mile.",
    icon: Truck,
    href: "/services/pickup-delivery",
    features: [
      "60-second scheduling",
      "Recurring weekly pickups",
      "Live driver tracking",
      "SMS, email, WhatsApp & Telegram updates",
      "Saved laundry preferences",
      "Special instructions & garment photos",
      "24-hour turnaround",
      "Order history & receipts",
    ],
    startingPrice: "$1.75 / lb",
    accent: "from-violet-400/20 to-fuchsia-500/10",
  },
  {
    slug: "commercial",
    name: "Commercial Laundry",
    short: "Enterprise-grade linen programs",
    description:
      "Hotels, restaurants, clinics, gyms, salons, and Airbnb operators trust Lustra for SLA-backed volume laundry with dedicated account management.",
    icon: Building2,
    href: "/services/commercial",
    features: [
      "Volume pricing & contracts",
      "Dedicated account manager",
      "Scheduled route pickups",
      "SLA monitoring & reporting",
      "Monthly consolidated invoicing",
      "Enterprise dashboard",
      "Uniform & industrial laundry",
      "Same-day emergency capacity",
    ],
    startingPrice: "Custom quotes",
    accent: "from-amber-400/20 to-orange-500/10",
  },
  {
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    short: "Couture care for fine garments",
    description:
      "Master cleaners for suits, silk, leather, wedding dresses, designer pieces, rugs, and household fabrics — with eco-friendly solvent options and express service.",
    icon: Sparkles,
    href: "/services/dry-cleaning",
    features: [
      "Luxury & designer garments",
      "Wedding dress preservation",
      "Leather, suede & silk specialists",
      "Curtains, rugs & household fabrics",
      "Shoes & handbag care",
      "Eco-friendly wet cleaning",
      "Express 6-hour service",
      "Free minor repairs",
    ],
    startingPrice: "$7 / garment",
    accent: "from-emerald-400/20 to-teal-500/10",
  },
];

export const secondaryServices = [
  { slug: "wash-fold", name: "Wash & Fold", icon: Shirt, short: "Everyday laundry, folded to retail standard", href: "/services/wash-fold" },
  { slug: "ironing", name: "Ironing & Pressing", icon: Wind, short: "Crisp, boutique-grade finishing", href: "/services/ironing" },
  { slug: "special-garments", name: "Special Garments", icon: Gem, short: "Couture, vintage & delicate textiles", href: "/services/special-garments" },
  { slug: "traditional-attire", name: "Traditional & Cultural Attire", icon: Crown, short: "Agbada, Aso-Oke, Ankara, lace & gele", href: "/services/traditional-attire" },
  { slug: "express", name: "Express Laundry", icon: Zap, short: "Back in your closet within hours", href: "/services/express" },
  { slug: "subscriptions", name: "Subscription Plans", icon: CalendarClock, short: "Set-and-forget laundry, monthly", href: "/services/subscriptions" },
];

/* ---------------------------------- Pricing ---------------------------------- */

export const washFoldPricing = {
  perLb: 1.75,
  minimumLbs: 10,
  expressMultiplier: 1.5,
  sameDayMultiplier: 2,
  pickupFee: 0,
  addOns: [
    { id: "hypoallergenic", label: "Hypoallergenic detergent", price: 2 },
    { id: "eco", label: "Eco-friendly detergent", price: 1.5 },
    { id: "softener", label: "Premium fabric softener", price: 1 },
    { id: "hang-dry", label: "Hang dry delicates", price: 5 },
    { id: "stain", label: "Stain treatment", price: 4 },
  ],
};

export const machinePricing = [
  { machine: "Compact Washer (14 lb)", price: 3.5, duration: "28 min" },
  { machine: "Standard Washer (20 lb)", price: 4.75, duration: "32 min" },
  { machine: "Large Washer (40 lb)", price: 7.5, duration: "38 min" },
  { machine: "Mega Washer (60 lb)", price: 9.75, duration: "42 min" },
  { machine: "Dryer (30 lb)", price: 0.5, duration: "per 8 min" },
  { machine: "Dryer (50 lb)", price: 0.75, duration: "per 8 min" },
];

export const dryCleaningPricing = [
  { item: "Shirt / Blouse", price: 7 },
  { item: "Trousers / Skirt", price: 9 },
  { item: "Two-piece Suit", price: 19 },
  { item: "Dress", price: 16 },
  { item: "Evening / Designer Dress", price: 34 },
  { item: "Wedding Dress (clean + preserve)", price: 189 },
  { item: "Coat / Overcoat", price: 24 },
  { item: "Leather / Suede Jacket", price: 55 },
  { item: "Silk Garment", price: 14 },
  { item: "Curtains (per panel)", price: 22 },
  { item: "Rug (per sq ft)", price: 4.5 },
  { item: "Shoes (pair)", price: 29 },
  { item: "Handbag", price: 45 },
  { item: "Duvet / Comforter", price: 32 },
];

export type Plan = {
  id: string;
  name: string;
  price: number;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const membershipPlans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    price: 0,
    cadence: "forever",
    description: "Pay-as-you-go with member perks from day one.",
    features: [
      "Earn 1 point per $1 spent",
      "Free app & order tracking",
      "Standard 48h turnaround",
      "Email & SMS updates",
    ],
  },
  {
    id: "plus",
    name: "Lustra+",
    price: 49,
    cadence: "per month",
    description: "For busy households that never want to think about laundry.",
    features: [
      "40 lbs wash & fold included",
      "15% off machines & dry cleaning",
      "Free pickup & delivery",
      "Priority 24h turnaround",
      "2× loyalty points",
      "Rollover up to 20 lbs",
    ],
    highlighted: true,
  },
  {
    id: "family",
    name: "Family",
    price: 89,
    cadence: "per month",
    description: "Big-family capacity with concierge-level care.",
    features: [
      "90 lbs wash & fold included",
      "20% off machines & dry cleaning",
      "Unlimited free pickup & delivery",
      "Same-day service twice a month",
      "3× loyalty points",
      "Dedicated care specialist",
    ],
  },
];

/* ---------------------------------- Locations ---------------------------------- */

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  amenities: string[];
  washers: { total: number; available: number };
  dryers: { total: number; available: number };
  parking: string;
  mapQuery: string;
};

export const locations: Location[] = [
  {
    id: "downtown",
    name: "Lustra Downtown",
    address: "1200 Meridian Avenue",
    city: "Austin, TX 78701",
    hours: "6:00 AM – 11:00 PM daily",
    phone: "+1 (555) 012-3456",
    amenities: ["Free Wi-Fi", "Espresso bar", "Workspace lounge", "EV charging", "Kids corner"],
    washers: { total: 24, available: 9 },
    dryers: { total: 20, available: 7 },
    parking: "Free lot + street parking",
    mapQuery: "1200 Meridian Avenue Austin TX",
  },
  {
    id: "midtown",
    name: "Lustra Midtown",
    address: "88 Halcyon Boulevard",
    city: "Austin, TX 78745",
    hours: "Open 24 hours",
    phone: "+1 (555) 012-7788",
    amenities: ["Free Wi-Fi", "Vending café", "Study pods", "24h security", "Package lockers"],
    washers: { total: 32, available: 14 },
    dryers: { total: 28, available: 11 },
    parking: "Dedicated garage, first hour free",
    mapQuery: "88 Halcyon Boulevard Austin TX",
  },
  {
    id: "university",
    name: "Lustra University District",
    address: "410 Campus Walk",
    city: "Austin, TX 78705",
    hours: "6:00 AM – 1:00 AM daily",
    phone: "+1 (555) 012-9911",
    amenities: ["Student pricing", "Free Wi-Fi", "Gaming lounge", "Print station", "Bike racks"],
    washers: { total: 18, available: 4 },
    dryers: { total: 16, available: 6 },
    parking: "Street parking + campus shuttle stop",
    mapQuery: "410 Campus Walk Austin TX",
  },
];

/* ---------------------------------- Social proof ---------------------------------- */

export const stats = [
  { value: "1.2M+", label: "Garments cleaned" },
  { value: "35k+", label: "Happy customers" },
  { value: "180+", label: "Business clients" },
  { value: "4.9★", label: "Average rating" },
];

export const testimonials = [
  {
    name: "Amara Osei",
    role: "Airbnb Superhost · 12 units",
    quote:
      "Lustra turned linen chaos into a same-day system. Their SLA dashboard means I never think about turnover laundry again — my cleaners just find fresh linens waiting.",
    rating: 5,
  },
  {
    name: "Daniel Reyes",
    role: "Executive Chef, Solstice Group",
    quote:
      "Three restaurants, nightly pickups, spotless chef whites every morning. The monthly invoice replaced a stack of receipts and two hours of admin a week.",
    rating: 5,
  },
  {
    name: "Priya Natarajan",
    role: "Product Designer & mom of three",
    quote:
      "The app tells me which washers are free before I leave the house, and the QR activation means my kids think the laundromat is a spaceship. Genuinely delightful.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Graduate student, UT Austin",
    quote:
      "Student discount, 24h location, and I get a Telegram ping the second my dryer finishes. I study in their lounge while my laundry does itself.",
    rating: 5,
  },
  {
    name: "Elena Volkov",
    role: "Bride, June 2026",
    quote:
      "They cleaned and preserved my wedding dress like museum conservators. The before/after photos they sent nearly made me cry. Worth every cent.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "GM, The Meridian Hotel",
    quote:
      "98.7% SLA compliance last quarter, and I can see it live in the enterprise dashboard. Lustra is the only vendor I never have to chase.",
    rating: 5,
  },
];

/* ---------------------------------- FAQ ---------------------------------- */

export const faqs = [
  {
    q: "How does pickup & delivery work?",
    a: "Book online, on WhatsApp, or on Telegram in under a minute. A Lustra driver collects your laundry in a sealed, barcoded bag at your chosen window, we clean it to your saved preferences, and deliver it back — typically within 24 hours. You can track your driver live the whole way.",
  },
  {
    q: "Can I reserve a washing machine before I arrive?",
    a: "Yes. Live machine availability for every location is on the website and app. Reserve a washer or dryer up to 2 hours ahead, and it's held for 15 minutes past your slot. Activate it on arrival with a QR scan — no coins, no cards, no waiting.",
  },
  {
    q: "What's included in wash & fold?",
    a: "Sorting by color and fabric, premium detergent (hypoallergenic and eco options available), precise temperature control, tumble or hang dry per your preferences, and retail-standard folding. Everything returns in a sealed recyclable bag.",
  },
  {
    q: "How does commercial pricing work?",
    a: "Commercial accounts get volume-based per-pound or per-piece pricing, scheduled route pickups, a dedicated account manager, and consolidated monthly invoicing. Request a quote and we'll respond within one business day with a tailored proposal.",
  },
  {
    q: "Is dry cleaning safe for delicate and designer garments?",
    a: "Our master cleaners hand-inspect every piece, test for colorfastness, and choose between traditional solvent, sensitive-care, or eco wet-cleaning processes. Couture, beading, leather, and silk are handled in our specialty studio with item-level insurance.",
  },
  {
    q: "What if something is damaged or missing?",
    a: "Every order is photographed and barcoded at intake. In the rare event of an issue, report it in-app, on WhatsApp, or to any team member within 7 days — we resolve claims within 48 hours and insure garments up to $1,000 per item.",
  },
  {
    q: "Do you offer recurring pickups?",
    a: "Yes — set a weekly or bi-weekly schedule and we'll arrive automatically. Pause, skip, or reschedule any pickup from your dashboard, WhatsApp, or Telegram up to 2 hours before the window.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Cards via Stripe, PayPal, Apple Pay, Google Pay, Paystack and Flutterwave, bank transfer for commercial accounts, and your Lustra wallet balance. Gift cards and promo codes apply at checkout.",
  },
];

/* ---------------------------------- Blog ---------------------------------- */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
  author: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "how-often-should-you-wash-everything",
    title: "How Often Should You Actually Wash Everything? The Definitive Guide",
    excerpt:
      "Jeans after 10 wears, sheets every week, that wool coat once a season — a fabric scientist's schedule for every item in your home.",
    category: "Fabric Care",
    readMinutes: 7,
    date: "2026-06-18",
    author: "Dr. Lena Whitfield, Head of Fabric Science",
    content: [
      "Overwashing is the fastest way to age your wardrobe, and underwashing is the fastest way to age your sheets. The right cadence depends on fiber, contact with skin, and how the item is stored between uses.",
      "Bed linens should be washed weekly at 60°C — they collect roughly 500 million skin cells a night. Towels earn a wash every three uses; hang them fully spread so they dry within a few hours, or bacteria will beat you to the laundry day.",
      "Denim is the opposite story. Modern indigo dyes and elastane blends keep their shape best when washed every 8–10 wears, inside out, cold. Between washes, a 30-minute hang outdoors resets most odors.",
      "Wool and cashmere want the least intervention of all: once or twice per season, always with a dedicated wool cycle or professional cleaning. Wool fibers are naturally antimicrobial — brushing and airing does 90% of the work.",
      "When in doubt, trust the care label's fiber content over its symbols. Or send us a photo on WhatsApp — our fabric care team answers within minutes.",
    ],
  },
  {
    slug: "the-real-cost-of-in-house-hotel-laundry",
    title: "The Real Cost of In-House Hotel Laundry (A CFO's Breakdown)",
    excerpt:
      "Equipment depreciation, labor, water, chemistry, and the hidden cost of a failed inspection — why 68% of boutique hotels are outsourcing linen programs.",
    category: "Business Laundry",
    readMinutes: 9,
    date: "2026-05-30",
    author: "Marcus Hale, VP Commercial",
    content: [
      "A 120-room hotel processes around 400,000 pounds of linen a year. Run in-house, the true cost lands between $1.10 and $1.60 per pound once you count what most P&Ls hide.",
      "The visible line items — labor, water, energy, chemistry — are only about 60% of it. The rest is equipment depreciation on machines that live hard lives, maintenance contracts, linen replacement accelerated by aggressive in-house chemistry, and the square footage a laundry room steals from revenue-generating space.",
      "Outsourced linen programs at volume run $0.85–$1.20 per pound with SLA-backed turnaround, and convert a fixed cost into a variable one that scales with occupancy.",
      "The tipping point is usually a failed health inspection or a peak-season equipment failure. Our advice: model your true per-pound cost this quarter, before the decision is made for you at the worst possible moment.",
      "Lustra's commercial team will run that model with you, free — book a consultation and bring your utility bills.",
    ],
  },
  {
    slug: "wedding-dress-preservation-guide",
    title: "Wedding Dress Preservation: What Happens in the 40 Days After 'I Do'",
    excerpt:
      "Invisible champagne stains turn brown in six weeks. A conservator explains the race against oxidation — and how museum-grade preservation works.",
    category: "Dry Cleaning",
    readMinutes: 6,
    date: "2026-05-12",
    author: "Sofia Marchetti, Couture Studio Lead",
    content: [
      "The most dangerous stains on a wedding dress are the ones you can't see. Champagne, white wine, and sugar residues dry clear, then oxidize into stubborn brown blooms over 4–8 weeks.",
      "That's why the preservation clock starts the morning after the wedding. Our couture studio begins with UV inspection to map invisible staining, then fiber-tests every component — the shell, lining, beading threads, and appliqué adhesives often need four different treatments.",
      "Cleaning happens by hand or in a dedicated single-garment cycle, never batched. Beaded bodices are cleaned face-down on padded mesh; silk-satin is finished with steam, never contact pressing.",
      "Preservation proper means acid-free tissue, a museum-grade breathable box, and an anoxic seal option for long-term storage. We photograph every stage and send you the record.",
      "One more thing brides rarely hear: preserve the veil and any heirloom pieces together with the dress. Matching aging across fabrics is nearly impossible to fix later.",
    ],
  },
  {
    slug: "laundromat-technology-2026",
    title: "Your Laundromat Has an API Now: The Technology Behind Modern Wash Days",
    excerpt:
      "QR activation, live machine telemetry, dynamic pricing and loyalty math — a tour of the tech stack running under Lustra's stainless steel.",
    category: "Laundry Tips",
    readMinutes: 5,
    date: "2026-04-22",
    author: "Ade Balogun, CTO",
    content: [
      "Every machine on a Lustra floor streams telemetry — cycle stage, minutes remaining, door state, out-of-order flags — to the same API that powers the website's live availability view.",
      "Reservations are a small distributed-systems problem: a held washer is inventory, and inventory needs leases. Your reservation is a 15-minute lease that auto-releases if you don't scan in, so machines never sit idle on a no-show.",
      "QR activation replaced coins for a simple reason: the queue at the change machine was the worst 4 minutes of the visit. Scan, tap, done — the machine unlocks and your cycle timer appears on your phone and smartwatch.",
      "Loyalty is computed as an event stream, not a punch card: every dollar, referral, and off-peak visit emits points, and off-peak multipliers quietly shift demand away from Sunday-evening rush.",
      "The result: 22% higher machine utilization and a wash day that fits inside a coffee break.",
    ],
  },
  {
    slug: "stain-first-aid",
    title: "Stain First Aid: The First 5 Minutes Decide Everything",
    excerpt:
      "Blot, never rub. Cold before hot. And the one household chemical that ruins more garments than red wine — your emergency reference card.",
    category: "Fabric Care",
    readMinutes: 4,
    date: "2026-03-28",
    author: "Dr. Lena Whitfield, Head of Fabric Science",
    content: [
      "Stain removal is triage: what you do in the first five minutes matters more than anything a professional can do a week later.",
      "Rule one — blot, never rub. Rubbing drives the stain into the fiber core and abrades the surface, leaving a halo even after cleaning. Press a white cloth, lift, repeat.",
      "Rule two — cold water first, always. Heat sets protein stains (blood, egg, dairy) permanently. A hot-water instinct on a blood stain is how a rescue becomes a write-off.",
      "Rule three — skip the chlorine bleach. It destroys spandex, yellows wool and silk, and reacts with protein stains to create permanent yellow scars. More garments die from bleach enthusiasm than from the original stain.",
      "Oil-based stains want dish soap; tannins (wine, coffee, tea) want cool water and patience; ink wants isopropyl alcohol dabbed from behind. And anything you love enough to Google about, you love enough to bring to us — mention the stain at drop-off and our team pre-treats it free.",
    ],
  },
  {
    slug: "caring-for-aso-oke-ankara-and-lace",
    title: "Caring for Aso-Oke, Ankara & Lace: A Specialist's Guide to Traditional Attire",
    excerpt:
      "Why wax prints fade, how hand-woven Aso-Oke loses its body, and the storage mistake that ruins lace — a traditional-attire artisan explains.",
    category: "Fabric Care",
    readMinutes: 6,
    date: "2026-06-25",
    author: "Sofia Marchetti, Couture Studio Lead",
    content: [
      "Traditional attire is where fabric care matters most, because these garments are rarely just clothes — they mark weddings, naming ceremonies, and family milestones, and many are meant to be worn for decades.",
      "Ankara first: those saturated colors come from wax-resist dyeing, and conventional dry-cleaning solvents dissolve exactly what makes the print glow. The right process is a pH-balanced wet clean after a colorfastness test on an inside seam. At home, wash cold, inside out, with a dye-safe detergent — and never wring; roll in a towel instead.",
      "Aso-Oke is a structure problem, not a stain problem. The hand-woven strips hold a deliberate body that flat pressing destroys and steam can relax too far. Professionals clean it with minimal agitation and reshape it by hand while it dries. Between events, fold along the weave with acid-free tissue in the folds — never hang it, and never store it in plastic.",
      "Lace — cord, Swiss, or French — usually fails at the embellishments before the fabric. Stones and beadwork are glued or tacked, and both give way in a machine. Have embellished pieces cleaned face-down by hand, and inspect the stonework every time it comes back; re-securing a loose stone costs pennies compared to replacing a panel.",
      "Gele deserves its own note: the sheen on damask and sego comes from a finish that water spotting ruins. Spot-clean only, press on low with a cloth barrier, and store rolled rather than folded to avoid permanent creases.",
      "And the storage mistake we see most: plastic. Wax prints, metallic threads, and starched cottons all need to breathe, or trapped humidity yellows them and tarnishes the metallics. Breathable cotton garment bags — or a proper preservation box for heirloom pieces — are the difference between attire that ages and attire that endures.",
    ],
  },
  {
    slug: "airbnb-linen-program",
    title: "The Airbnb Host's Linen Playbook: Never Fail a Turnover Again",
    excerpt:
      "Triple par stock, sealed turnover kits, and same-day SLAs — the linen operations system used by Austin's top-rated hosts.",
    category: "Business Laundry",
    readMinutes: 8,
    date: "2026-03-02",
    author: "Marcus Hale, VP Commercial",
    content: [
      "Every five-star review has clean linen underneath it. And every host horror story starts with a washer breaking at 1 PM on a same-day turnover.",
      "The professional standard is a triple par stock: one set on beds, one set in transit or being cleaned, one set sealed and shelved as buffer. It feels like over-buying until the first time it saves a booking.",
      "Top hosts stop thinking in 'loads' and start thinking in turnover kits: a sealed bag per bed size containing everything one changeover needs. Cleaners grab a kit, strip, reset, and bag the used set for pickup — no counting, no sorting, no missing pillowcase at 3:55 PM.",
      "With a Lustra host account, used kits are collected on a route schedule (or same-day on demand), processed to hotel standard, and returned as sealed kits. Your dashboard shows kit inventory across all your units.",
      "Hosts running 3+ units save an average of 11 hours a month — usually the difference between managing the business and being managed by it.",
    ],
  },
];

/* ---------------------------------- Careers ---------------------------------- */

export const jobs = [
  {
    id: "route-driver",
    title: "Route Driver — Pickup & Delivery",
    type: "Full-time",
    location: "Austin, TX",
    salary: "$42k–$52k + tips",
    blurb: "Own a delivery route with a company vehicle, smart routing app, and customers who are genuinely happy to see you.",
  },
  {
    id: "fabric-care-specialist",
    title: "Fabric Care Specialist",
    type: "Full-time",
    location: "Austin, TX",
    salary: "$38k–$48k",
    blurb: "Master wash chemistry, stain science, and finishing on premium equipment. We train from apprentice to specialist.",
  },
  {
    id: "couture-cleaner",
    title: "Couture & Dry Cleaning Artisan",
    type: "Full-time",
    location: "Austin, TX",
    salary: "$52k–$68k",
    blurb: "Wedding dresses, designer garments, leather and silk. The most skilled hands in the building work in our couture studio.",
  },
  {
    id: "store-experience-lead",
    title: "Store Experience Lead",
    type: "Full-time",
    location: "Austin, TX (Midtown)",
    salary: "$45k–$55k",
    blurb: "Run the floor of our flagship 24h laundromat like a boutique hotel lobby — people, machines, and moments.",
  },
  {
    id: "senior-fullstack",
    title: "Senior Full-Stack Engineer",
    type: "Full-time · Hybrid",
    location: "Austin, TX / Remote",
    salary: "$150k–$190k + equity",
    blurb: "Build the platform behind live machine telemetry, routing, and the booking engine. Next.js, NestJS, PostgreSQL.",
  },
  {
    id: "account-manager",
    title: "Commercial Account Manager",
    type: "Full-time",
    location: "Austin, TX",
    salary: "$60k–$80k + commission",
    blurb: "Own a portfolio of hotels, restaurants, and clinics. Be the person our biggest clients never have to chase.",
  },
];

/* ---------------------------------- How it works ---------------------------------- */

export const howItWorks = [
  {
    step: "01",
    title: "Book in 60 seconds",
    body: "Choose a service on the web, app, WhatsApp, or Telegram. Pick a pickup window or reserve a machine — your preferences are already saved.",
  },
  {
    step: "02",
    title: "We collect & care",
    body: "Your driver arrives in the window with sealed, barcoded bags. Every garment is photographed, sorted by fabric, and cleaned to your exact preferences.",
  },
  {
    step: "03",
    title: "Track every step",
    body: "Live status from pickup to press to delivery. Watch your driver on the map and get updates on the channel you prefer.",
  },
  {
    step: "04",
    title: "Delivered, folded, done",
    body: "Retail-standard folding, recyclable packaging, and a delivery photo for your records. Rate the order and earn loyalty points instantly.",
  },
];
