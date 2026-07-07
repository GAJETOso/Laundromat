export type ServiceContent = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  heroBullets: string[];
  sections: { title: string; body: string }[];
  features: { title: string; body: string }[];
  pricingNote: string;
  cta: { title: string; body: string };
  faqs: { q: string; a: string }[];
};

export const serviceContent: Record<string, ServiceContent> = {
  "self-service": {
    slug: "self-service",
    name: "Self-Service Laundromat",
    eyebrow: "Self-service",
    headline: "The laundromat, reinvented",
    intro:
      "Espresso in hand, washer reserved from your couch, machine started with a QR scan. Our floors feel more like a boutique hotel lobby than a laundry room — and the machines think like software.",
    heroBullets: ["74 smart machines across 3 locations", "Reserve ahead, walk straight in", "From $3.50 per wash"],
    sections: [
      {
        title: "Reserve before you leave home",
        body: "Live availability for every washer and dryer streams to the website and app. Reserve up to 2 hours ahead — your machine is held for 15 minutes past your slot, then auto-released so floors never sit idle.",
      },
      {
        title: "Scan. Tap. Wash.",
        body: "Every machine wakes with a QR scan. Pay with Apple Pay, Google Pay, card, or wallet balance — no coins, no cards to load, no change machine queue. Your cycle timer follows you to your phone and watch.",
      },
      {
        title: "Spaces worth staying in",
        body: "Free fast Wi-Fi, espresso bars, study pods, kids corners, and 24-hour access at Midtown. Wash day becomes the quietest, most productive hour of your week.",
      },
    ],
    features: [
      { title: "Live occupancy", body: "See exactly how many machines are free before you leave." },
      { title: "Machine reservations", body: "Hold any washer or dryer up to 2 hours ahead." },
      { title: "QR activation", body: "Start machines from your phone — completely contactless." },
      { title: "Cycle timers", body: "Live countdowns plus a ping the second your cycle ends." },
      { title: "Loyalty points", body: "Every dollar earns points; off-peak visits earn double." },
      { title: "Student & family pricing", body: "15% student discount and family bundle packages." },
    ],
    pricingNote: "Washes from $3.50 · dryers from $0.50 per 8 minutes · members save 15–20%",
    cta: { title: "See what's free right now", body: "Live machine availability for all three locations, updated every minute." },
    faqs: [
      { q: "What happens if I'm late for my reservation?", a: "Your machine is held for 15 minutes past your slot. After that, it's released back to the floor and your reservation fee (if any) is refunded as points." },
      { q: "Do I need the app to use the machines?", a: "No — the QR code works from any phone browser. The app just makes it faster, adds notifications, and keeps your payment methods and points in one place." },
      { q: "How do student discounts work?", a: "Verify your student ID once in the app (or at any front desk) and 15% comes off self-service pricing automatically at University District, always." },
    ],
  },
  "pickup-delivery": {
    slug: "pickup-delivery",
    name: "Pickup & Delivery",
    eyebrow: "Pickup & delivery",
    headline: "Laundry that does itself",
    intro:
      "Schedule in 60 seconds. A sealed, barcoded bag leaves your doorstep and returns folded to retail standard — tracked live at every stage, delivered back within 24 hours.",
    heroBullets: ["Free pickup & delivery", "24-hour standard turnaround", "Live driver tracking"],
    sections: [
      {
        title: "Your preferences, remembered forever",
        body: "Detergent choice, water temperature, hang-dry list, folding style, starch level — saved once, applied to every order. Add garment photos and special instructions per order for anything unusual.",
      },
      {
        title: "Tracked like a flight",
        body: "Scheduled, picked up, cleaning, quality check, out for delivery, delivered — you see every stage with timestamps, plus your driver's live position and ETA on delivery day. Updates arrive by SMS, email, WhatsApp, or Telegram; you choose the channel.",
      },
      {
        title: "Set it and forget it",
        body: "Weekly or bi-weekly recurring pickups save 10% automatically. Pause, skip, or reschedule any pickup from your dashboard or bot up to 2 hours before the window.",
      },
    ],
    features: [
      { title: "60-second booking", body: "Web, app, WhatsApp, or Telegram — your call." },
      { title: "Recurring schedules", body: "Weekly or bi-weekly, with automatic 10% savings." },
      { title: "Sealed & barcoded", body: "Chain of custody from your door to ours and back." },
      { title: "Driver tracking", body: "Live map, ETA, and delivery photo confirmation." },
      { title: "Multichannel updates", body: "SMS, email, WhatsApp, and Telegram notifications." },
      { title: "Order history", body: "Every order, receipt, and preference in your dashboard." },
    ],
    pricingNote: "Wash & fold $1.75/lb (10 lb minimum) · dry cleaning from $7 · pickup always free",
    cta: { title: "Your first pickup is 20% off", body: "Use code FRESH20 at checkout. Book now, cancel free up to 2 hours before." },
    faqs: [
      { q: "Do I need to be home for pickup or delivery?", a: "No. Leave your bag at the door, with a doorman, or in a designated spot — add instructions like gate codes to your order. We photograph every pickup and delivery for your records." },
      { q: "How is my laundry kept separate?", a: "Your items travel in sealed, barcoded bags and are processed as a single order in dedicated machines. Nothing is ever mixed with other customers' laundry." },
      { q: "What if I miss my pickup window?", a: "We'll ping you when the driver is 15 minutes out. If we miss you, rescheduling is free — same-day when capacity allows." },
    ],
  },
  commercial: {
    slug: "commercial",
    name: "Commercial Laundry",
    eyebrow: "Commercial & B2B",
    headline: "Linen programs that run themselves",
    intro:
      "Hotels, restaurants, med spas, gyms, salons, schools, and short-stay operators — Lustra runs SLA-backed linen and uniform programs with route pickups, live dashboards, and one clean monthly invoice.",
    heroBullets: ["98.7% on-time SLA performance", "Volume pricing 30–45% below retail", "Dedicated account manager"],
    sections: [
      {
        title: "Built around your operation",
        body: "Nightly, daily, or weekly route pickups scheduled around your service hours. Emergency same-day capacity is reserved for contract clients — because a wedding party doesn't wait for linen.",
      },
      {
        title: "Visibility your ops team will love",
        body: "The enterprise dashboard shows every order, turnaround time, SLA compliance, and spend by location. Export reports, download invoices, and set alerts — no more chasing vendors by phone.",
      },
      {
        title: "Hygiene you can certify",
        body: "Thermal disinfection cycles, segregated processing lines, and documented chain of custody. Healthcare-grade protocols available for clinics and med spas, with certificates for your inspections.",
      },
    ],
    features: [
      { title: "Volume pricing", body: "Per-pound or per-piece rates that drop with scale." },
      { title: "Contract SLAs", body: "Guaranteed turnaround with monitored compliance." },
      { title: "Route pickups", body: "Scheduled collection that never misses a shift." },
      { title: "Monthly invoicing", body: "Consolidated billing with cost-center breakdowns." },
      { title: "Enterprise dashboard", body: "Orders, SLAs, spend, and reports in real time." },
      { title: "Account manager", body: "One human who knows your operation by name." },
    ],
    pricingNote: "Custom quotes within one business day · typical contracts from $500/month",
    cta: { title: "Get a quote in one business day", body: "Tell us your volume and industry — we'll model your program and price, free." },
    faqs: [
      { q: "What industries do you serve?", a: "Hotels, restaurants, healthcare clinics, gyms, salons and spas, schools, corporate offices, and Airbnb/short-stay operators. Uniform programs and industrial laundry are quoted separately." },
      { q: "Is there a minimum volume?", a: "Commercial rates start around 100 lbs per week. Below that, our standard pickup & delivery service with a recurring schedule is usually the better deal — we'll tell you honestly which fits." },
      { q: "How fast can we onboard?", a: "Most accounts go live within a week of signing: route setup, linen count baseline, dashboard access, and your account manager's direct line." },
    ],
  },
  "dry-cleaning": {
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    eyebrow: "Dry cleaning",
    headline: "Couture care, scientific precision",
    intro:
      "Suits, silk, leather, wedding dresses, designer pieces, rugs, and the curtains you keep meaning to deal with. Master cleaners, item-level insurance, and an eco-friendly process option on everything.",
    heroBullets: ["From $7 per garment", "Express 6-hour service", "Insured up to $1,000 per item"],
    sections: [
      {
        title: "Every garment gets a diagnosis",
        body: "Hand inspection, fiber identification, colorfastness testing, and UV stain mapping before anything touches a machine. Beading, sequins, and mixed-material pieces are routed to the couture studio.",
      },
      {
        title: "The wedding dress studio",
        body: "Clean-and-preserve service with museum-grade materials: acid-free tissue, breathable preservation boxing, and photographic documentation at every stage. Heirloom restoration for vintage gowns is our quiet specialty.",
      },
      {
        title: "Eco-friendly by default",
        body: "Our sensitive-care wet cleaning process handles most 'dry clean only' garments with zero perc and biodegradable chemistry. Ask for it on any order — same price, kinder to fabric and planet.",
      },
    ],
    features: [
      { title: "Luxury garments", body: "Designer, couture, and vintage handled in a dedicated studio." },
      { title: "Leather & suede", body: "Specialist cleaning, conditioning, and color restoration." },
      { title: "Household textiles", body: "Curtains, rugs, duvets, and upholstery-grade fabrics." },
      { title: "Shoes & bags", body: "Deep cleaning and detailing for footwear and handbags." },
      { title: "Express service", body: "In by 9 AM, ready by 3 PM — when you need it now." },
      { title: "Free minor repairs", body: "Loose buttons and small seams fixed without asking." },
    ],
    pricingNote: "Shirts $7 · suits $19 · wedding dress preservation $189 · full list on the pricing page",
    cta: { title: "Book a garment pickup", body: "Free collection and delivery on dry cleaning orders over $25." },
    faqs: [
      { q: "Can you clean a dress with heavy beading?", a: "Yes — beaded and sequined pieces go to the couture studio, where they're cleaned face-down on padded mesh by hand. We test adhesives and threads first and photograph before/after." },
      { q: "What is eco-friendly dry cleaning?", a: "Professional wet cleaning: computer-controlled water-based cycles with biodegradable detergents, plus specialized finishing. It handles most 'dry clean only' labels beautifully with zero solvent residue." },
      { q: "How does express work?", a: "Drop off (or have us collect) by 9 AM and garments are ready by 3 PM the same day, +50% on the item price. Capacity is limited — reserve in the app first." },
    ],
  },
  "wash-fold": {
    slug: "wash-fold",
    name: "Wash & Fold",
    eyebrow: "Wash & fold",
    headline: "Folded like the store shelf",
    intro:
      "Everyday laundry sorted, washed with premium chemistry, dried to fabric spec, and folded to retail standard. By the pound, honestly weighed, delivered back in 24 hours.",
    heroBullets: ["$1.75 per pound", "24h standard turnaround", "Retail-standard folding"],
    sections: [
      {
        title: "Sorted like we own it",
        body: "Colors, whites, delicates, and heavy items separated automatically. Temperature and cycle chosen per pile, not per order — your gym kit and your linen shirt do not want the same wash.",
      },
      {
        title: "Chemistry that respects skin and fabric",
        body: "Premium detergent by default; hypoallergenic, eco, and scent-free options one tap away. Softener, hang-dry lists, and low-heat preferences saved to your profile forever.",
      },
      {
        title: "The fold that made us famous",
        body: "Every order finished on folding tables to a consistent retail standard, grouped by category, and packed in sealed recyclable bags. Opening a Lustra bag feels like shopping in your own closet.",
      },
    ],
    features: [
      { title: "By the pound", body: "Weighed at the facility, charged after — never before." },
      { title: "Preference profiles", body: "Detergent, temperature, and folding saved per customer." },
      { title: "Hang-dry lists", body: "Flag delicates once; we hang-dry them on every order." },
      { title: "Stain pre-treatment", body: "Point out stains at pickup and we treat them free." },
      { title: "Sealed packaging", body: "Recyclable, tamper-evident bags with order barcodes." },
      { title: "24h turnaround", body: "Standard next-day; express and same-day available." },
    ],
    pricingNote: "$1.75/lb with a 10 lb minimum · recurring orders save 10% · Lustra+ includes 40 lbs monthly",
    cta: { title: "Try wash & fold for 20% off", body: "First order code FRESH20 — feel the fold difference once and you're done doing laundry." },
    faqs: [
      { q: "How do you handle delicates mixed into a wash & fold bag?", a: "Intake teams flag anything with a delicate care label and route it to gentle cycles or hang-dry automatically. For guaranteed handling, add items to your hang-dry list in preferences." },
      { q: "What's the average turnaround?", a: "Standard orders return within 24 hours of pickup. Express (same evening) and same-day options appear at checkout when capacity allows." },
    ],
  },
  ironing: {
    slug: "ironing",
    name: "Ironing & Pressing",
    eyebrow: "Ironing & pressing",
    headline: "Crisp is a feeling",
    intro:
      "Professional pressing for shirts, trousers, dresses, and linens — steam-finished on commercial equipment, returned on hangers or folded flat. Starch level saved to your profile.",
    heroBullets: ["From $3.50 per shirt", "Steam finishing, never scorched", "On hangers or boxed flat"],
    sections: [
      {
        title: "Pressed by people, finished by steam",
        body: "Commercial steam presses and hand-finishing for collars, plackets, and pleats. Cotton, linen, and blends each get their own temperature and moisture spec — the difference between crisp and cardboard.",
      },
      {
        title: "Your starch, your way",
        body: "None, light, medium, or crisp — set once, applied always. Business shirts return on recyclable hangers, grouped and ready for the closet rail.",
      },
    ],
    features: [
      { title: "Shirt service", body: "Wash and press from $3.50 per shirt in volume." },
      { title: "Linens & table settings", body: "Tablecloths and napkins pressed for events." },
      { title: "Hanger or flat-pack", body: "Closet-ready or suitcase-ready, your choice." },
      { title: "Same-day option", body: "Morning drop, evening wear." },
    ],
    pricingNote: "Shirts from $3.50 · trousers $6 · dresses from $9 · bundles of 10+ save 15%",
    cta: { title: "Never iron again", body: "Add pressing to any pickup order in one tap." },
    faqs: [
      { q: "Do you press only, without cleaning?", a: "Yes — press-only service is available for garments that are clean but crumpled, at roughly 60% of the clean-and-press price." },
    ],
  },
  "special-garments": {
    slug: "special-garments",
    name: "Special Garments",
    eyebrow: "Specialty care",
    headline: "For the pieces that matter",
    intro:
      "Vintage, couture, heirloom textiles, costumes, and anything the care label gave up on. Our specialty studio treats one garment at a time, with documentation at every step.",
    heroBullets: ["Item-level insurance to $1,000", "One-garment-at-a-time processing", "Photographic documentation"],
    sections: [
      {
        title: "Assessment before commitment",
        body: "Every specialty piece starts with a written condition assessment and treatment proposal — you approve the plan and price before any work begins. Museum-adjacent standards, human explanations.",
      },
      {
        title: "The hard cases are our favorites",
        body: "Christening gowns yellowed in an attic, a leather jacket with two decades of patina worth keeping, beaded flapper dresses, silk kimonos, theatrical costumes. If it's textile and it matters to you, bring it in.",
      },
    ],
    features: [
      { title: "Vintage & heirloom", body: "Age-appropriate chemistry and gentle restoration." },
      { title: "Couture handling", body: "Hand cleaning for structured and embellished pieces." },
      { title: "Written assessments", body: "Approve the plan and price before work begins." },
      { title: "Preservation boxing", body: "Acid-free, breathable storage for the decades." },
    ],
    pricingNote: "Assessed per item after inspection · assessments always free",
    cta: { title: "Book a free assessment", body: "Bring the piece in, or send photos on WhatsApp for a preliminary read." },
    faqs: [
      { q: "Can you fix yellowing on old fabric?", a: "Often, yes — oxidation staining on cotton and linen responds well to controlled reduction bleaching. Silk is harder and we're honest when the risk outweighs the reward. Assessment first, always." },
    ],
  },
  express: {
    slug: "express",
    name: "Express Laundry",
    eyebrow: "Express",
    headline: "Clean by this evening",
    intro:
      "The interview is tomorrow. The suitcase smells like vacation. The team jerseys are needed tonight. Express puts your order at the front of every queue.",
    heroBullets: ["Same-day turnaround", "Priority queue at every stage", "Live capacity — book ahead"],
    sections: [
      {
        title: "How same-day works",
        body: "Book an express slot before 10 AM, pickup by 11 AM, and your laundry is back at your door between 6 and 9 PM the same day. Dry cleaning express runs 9 AM to 3 PM at any location.",
      },
      {
        title: "Honest capacity",
        body: "Express capacity is real and finite — we show live slot availability at checkout instead of overpromising. When we say tonight, we mean tonight.",
      },
    ],
    features: [
      { title: "Same-day wash & fold", body: "2× rate, back the same evening." },
      { title: "6-hour dry cleaning", body: "In by 9 AM, ready by 3 PM, +50%." },
      { title: "Priority machines", body: "Express reservations jump the reservation queue." },
      { title: "Emergency capacity", body: "Commercial clients get reserved surge slots." },
    ],
    pricingNote: "Same-day wash & fold at 2× standard rate · express dry cleaning +50%",
    cta: { title: "Check today's express slots", body: "Live availability at checkout — if you can book it, we'll deliver it." },
    faqs: [
      { q: "What's the cutoff for same-day?", a: "Express bookings close at 10 AM for same-evening delivery. After that, the app shows next-day express (guaranteed by noon) automatically." },
    ],
  },
  subscriptions: {
    slug: "subscriptions",
    name: "Subscription Plans",
    eyebrow: "Subscriptions",
    headline: "Laundry on autopilot",
    intro:
      "A flat monthly price, a recurring pickup, and a life where clean laundry simply appears. Pause anytime, roll over what you don't use, and save on everything else.",
    heroBullets: ["From $49/month", "Rollover unused pounds", "Pause or cancel anytime"],
    sections: [
      {
        title: "Pick a plan, forget the chore",
        body: "Lustra+ covers a typical one-to-two-person household (40 lbs/month); Family covers big households (90 lbs). Both include free pickup & delivery, member discounts on machines and dry cleaning, and multiplied loyalty points.",
      },
      {
        title: "Fair by design",
        body: "Unused pounds roll over (up to half your plan), extra pounds bill at member rates, and pausing for travel takes one tap. Subscriptions that respect you are the only kind worth selling.",
      },
    ],
    features: [
      { title: "Included pounds", body: "40 or 90 lbs of wash & fold every month." },
      { title: "Member discounts", body: "15–20% off machines and dry cleaning." },
      { title: "Rollover", body: "Keep up to half your unused pounds each month." },
      { title: "Priority turnaround", body: "24h standard, same-day credits on Family." },
    ],
    pricingNote: "Lustra+ $49/mo · Family $89/mo · commercial subscriptions quoted separately",
    cta: { title: "Start with a free month of Essential", body: "Earn points from your first order and upgrade whenever the math makes sense." },
    faqs: [
      { q: "What happens to unused pounds?", a: "Up to 50% of your monthly allowance rolls into the next month automatically. Beyond that, we'd rather you downgrade than pay for laundry that doesn't exist — the app will suggest it." },
      { q: "Can I share a plan?", a: "Family plans cover one household at one address, with up to two pickup addresses (great for students). Additional addresses can be added for $10/month." },
    ],
  },
};
