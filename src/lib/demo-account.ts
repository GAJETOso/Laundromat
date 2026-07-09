/** Demo account data rendered in the customer/admin/driver dashboards. */

export const demoUser = {
  name: "Jordan Ellis",
  email: "jordan@example.com",
  phone: "+234 802 244 8811",
  memberSince: "March 2024",
  plan: "Lustra+",
  points: 2450,
  referralCode: "JORDAN-FRESH",
  addresses: [
    { id: "home", label: "Home", line: "24B Fola Osibo Road, Lekki Phase 1, Lagos", default: true },
    { id: "office", label: "Office", line: "12th Floor, Churchgate Tower, Victoria Island, Lagos", default: false },
  ],
  preferences: ["Hypoallergenic detergent", "Hang dry delicates", "Fold only (no hangers)"],
};

export type DemoOrder = {
  id: string;
  service: string;
  date: string;
  status: "delivered" | "out_for_delivery" | "processing" | "scheduled";
  weightKg?: number;
  total: number;
  points: number;
};

export const demoOrders: DemoOrder[] = [
  { id: "LST-9K3M-A1", service: "Wash & Fold", date: "2026-07-06", status: "out_for_delivery", weightKg: 8, total: 9600, points: 96 },
  { id: "LST-8F2K-Q7", service: "Dry Cleaning", date: "2026-07-02", status: "processing", total: 14500, points: 145 },
  { id: "LST-7T1P-Z3", service: "Wash & Fold", date: "2026-06-29", status: "delivered", weightKg: 10, total: 12000, points: 120 },
  { id: "LST-6R8N-B2", service: "Wash & Fold", date: "2026-06-22", status: "delivered", weightKg: 7, total: 8400, points: 84 },
  { id: "LST-5W4H-K9", service: "Express Laundry", date: "2026-06-15", status: "delivered", weightKg: 5, total: 12000, points: 120 },
  { id: "LST-4Q9C-D5", service: "Traditional Attire", date: "2026-06-08", status: "delivered", total: 19000, points: 190 },
];

export const demoInvoices = [
  { id: "INV-2026-0107", period: "June 2026", amount: 48200, status: "Paid" },
  { id: "INV-2026-0093", period: "May 2026", amount: 39500, status: "Paid" },
  { id: "INV-2026-0081", period: "April 2026", amount: 56700, status: "Paid" },
];

/* ---- Admin demo data ---- */

export const adminKpis = [
  { label: "Orders today", value: "148", trend: "+12%" },
  { label: "Revenue today", value: "₦1.86M", trend: "+8%" },
  { label: "Active drivers", value: "9", trend: "on route" },
  { label: "Machines online", value: "132 / 138", trend: "95.6%" },
];

export const adminOrders = [
  { id: "LST-9K3M-A1", customer: "Jordan Ellis", service: "Wash & Fold", driver: "Seun K.", status: "Out for delivery", total: 9600 },
  { id: "LST-2X7V-M4", customer: "The Meridian Hotel", service: "Commercial", driver: "Route 2", status: "Processing", total: 148000 },
  { id: "LST-3B5J-P8", customer: "Priya Natarajan", service: "Dry Cleaning", driver: "—", status: "Quality check", total: 17500 },
  { id: "LST-1D6G-R2", customer: "Tunde Adeyemi", service: "Wash & Fold", driver: "Amaka R.", status: "Picked up", total: 8200 },
  { id: "LST-0H4F-S6", customer: "Solstice Group", service: "Commercial", driver: "Route 1", status: "Scheduled", total: 96500 },
  { id: "LST-9P2L-T9", customer: "Zainab Bello", service: "Wedding Dress", driver: "—", status: "In studio", total: 85000 },
];

export const weeklyRevenue = [
  { day: "Mon", amount: 1450000 },
  { day: "Tue", amount: 1580000 },
  { day: "Wed", amount: 1320000 },
  { day: "Thu", amount: 1740000 },
  { day: "Fri", amount: 1980000 },
  { day: "Sat", amount: 2260000 },
  { day: "Sun", amount: 1860000 },
];

/* ---- Driver demo data ---- */

export type RouteStop = {
  id: number;
  type: "pickup" | "delivery";
  customer: string;
  address: string;
  window: string;
  status: "next" | "pending" | "done";
  bags: number;
  orderId: string;
};

export const driverRoute: {
  driver: string;
  vehicle: string;
  shift: string;
  stops: RouteStop[];
  completed: number;
  total: number;
} = {
  driver: "Seun Kolawole",
  vehicle: "Van 3 · KJA-482-LD",
  shift: "12:00 PM – 8:00 PM",
  stops: [
    { id: 1, type: "delivery", customer: "Jordan Ellis", address: "24B Fola Osibo Rd, Lekki Phase 1", window: "3–5 PM", status: "next", bags: 2, orderId: "LST-9K3M-A1" },
    { id: 2, type: "pickup", customer: "Dana Whitmore", address: "3 Ozumba Mbadiwe Ave, Victoria Island", window: "3–5 PM", status: "pending", bags: 1, orderId: "LST-NEW-0148" },
    { id: 3, type: "delivery", customer: "Tunde Adeyemi", address: "18 Herbert Macaulay Way, Yaba", window: "5–7 PM", status: "pending", bags: 1, orderId: "LST-1D6G-R2" },
    { id: 4, type: "pickup", customer: "Eko Shortlets #7", address: "9 Admiralty Road, Lekki Phase 1", window: "5–7 PM", status: "pending", bags: 4, orderId: "LST-NEW-0152" },
    { id: 5, type: "delivery", customer: "Aisha Bello", address: "1 Idejo Street, Victoria Island", window: "5–7 PM", status: "pending", bags: 2, orderId: "LST-2M8Q-V1" },
  ],
  completed: 7,
  total: 12,
};
