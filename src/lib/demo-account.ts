/** Demo account data rendered in the customer/admin/driver dashboards. */

export const demoUser = {
  name: "Jordan Ellis",
  email: "jordan@example.com",
  phone: "+1 (555) 204-8811",
  memberSince: "March 2024",
  plan: "Lustra+",
  points: 2450,
  referralCode: "JORDAN-FRESH",
  addresses: [
    { id: "home", label: "Home", line: "1844 Cedar Hollow Dr, Austin, TX 78745", default: true },
    { id: "office", label: "Office", line: "500 Congress Ave, Floor 12, Austin, TX 78701", default: false },
  ],
  preferences: ["Hypoallergenic detergent", "Hang dry delicates", "Fold only (no hangers)"],
};

export type DemoOrder = {
  id: string;
  service: string;
  date: string;
  status: "delivered" | "out_for_delivery" | "processing" | "scheduled";
  weightLbs?: number;
  total: number;
  points: number;
};

export const demoOrders: DemoOrder[] = [
  { id: "LST-9K3M-A1", service: "Wash & Fold", date: "2026-07-06", status: "out_for_delivery", weightLbs: 18, total: 31.5, points: 63 },
  { id: "LST-8F2K-Q7", service: "Dry Cleaning", date: "2026-07-02", status: "processing", total: 47.0, points: 94 },
  { id: "LST-7T1P-Z3", service: "Wash & Fold", date: "2026-06-29", status: "delivered", weightLbs: 22, total: 38.5, points: 77 },
  { id: "LST-6R8N-B2", service: "Wash & Fold", date: "2026-06-22", status: "delivered", weightLbs: 17, total: 29.75, points: 60 },
  { id: "LST-5W4H-K9", service: "Express Laundry", date: "2026-06-15", status: "delivered", weightLbs: 12, total: 42.0, points: 84 },
  { id: "LST-4Q9C-D5", service: "Dry Cleaning", date: "2026-06-08", status: "delivered", total: 63.0, points: 126 },
];

export const demoInvoices = [
  { id: "INV-2026-0107", period: "June 2026", amount: 122.25, status: "Paid" },
  { id: "INV-2026-0093", period: "May 2026", amount: 98.0, status: "Paid" },
  { id: "INV-2026-0081", period: "April 2026", amount: 141.5, status: "Paid" },
];

/* ---- Admin demo data ---- */

export const adminKpis = [
  { label: "Orders today", value: "148", trend: "+12%" },
  { label: "Revenue today", value: "$4,820", trend: "+8%" },
  { label: "Active drivers", value: "9", trend: "on route" },
  { label: "Machines online", value: "132 / 138", trend: "95.6%" },
];

export const adminOrders = [
  { id: "LST-9K3M-A1", customer: "Jordan Ellis", service: "Wash & Fold", driver: "Sam K.", status: "Out for delivery", total: 31.5 },
  { id: "LST-2X7V-M4", customer: "The Meridian Hotel", service: "Commercial", driver: "Route 2", status: "Processing", total: 412.0 },
  { id: "LST-3B5J-P8", customer: "Priya Natarajan", service: "Dry Cleaning", driver: "—", status: "Quality check", total: 58.0 },
  { id: "LST-1D6G-R2", customer: "Marcus Chen", service: "Wash & Fold", driver: "Ava R.", status: "Picked up", total: 24.5 },
  { id: "LST-0H4F-S6", customer: "Solstice Group", service: "Commercial", driver: "Route 1", status: "Scheduled", total: 267.0 },
  { id: "LST-9P2L-T9", customer: "Elena Volkov", service: "Wedding Dress", driver: "—", status: "In studio", total: 189.0 },
];

export const weeklyRevenue = [
  { day: "Mon", amount: 3900 },
  { day: "Tue", amount: 4200 },
  { day: "Wed", amount: 3600 },
  { day: "Thu", amount: 4700 },
  { day: "Fri", amount: 5300 },
  { day: "Sat", amount: 6100 },
  { day: "Sun", amount: 4820 },
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
  driver: "Sam Kowalski",
  vehicle: "Van 3 · TX-4821L",
  shift: "12:00 PM – 8:00 PM",
  stops: [
    { id: 1, type: "delivery", customer: "Jordan Ellis", address: "1844 Cedar Hollow Dr", window: "3–5 PM", status: "next", bags: 2, orderId: "LST-9K3M-A1" },
    { id: 2, type: "pickup", customer: "Dana Whitmore", address: "212 Barton Springs Rd, #504", window: "3–5 PM", status: "pending", bags: 1, orderId: "LST-NEW-0148" },
    { id: 3, type: "delivery", customer: "Marcus Chen", address: "2400 Nueces St, Apt 118", window: "5–7 PM", status: "pending", bags: 1, orderId: "LST-1D6G-R2" },
    { id: 4, type: "pickup", customer: "Hill Country Stays #7", address: "98 Rainey St", window: "5–7 PM", status: "pending", bags: 4, orderId: "LST-NEW-0152" },
    { id: 5, type: "delivery", customer: "Aisha Bello", address: "701 W 5th St", window: "5–7 PM", status: "pending", bags: 2, orderId: "LST-2M8Q-V1" },
  ],
  completed: 7,
  total: 12,
};
