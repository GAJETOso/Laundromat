/**
 * In-memory data store powering the API routes in this reference deployment.
 *
 * The interface mirrors the Prisma schema in /prisma/schema.prisma — swap the
 * implementations here for Prisma client calls to move to PostgreSQL without
 * touching any route handler. (See docs/ARCHITECTURE.md.)
 */

import { generateOrderId } from "./utils";

export type OrderStatus =
  | "scheduled"
  | "picked_up"
  | "processing"
  | "quality_check"
  | "out_for_delivery"
  | "delivered";

export type Booking = {
  id: string;
  service: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  window: string;
  recurring: string;
  preferences: string[];
  instructions: string;
  estimatedTotal: number;
  status: OrderStatus;
  createdAt: string;
  timeline: { status: OrderStatus; at: string; note: string }[];
};

export type CommercialLead = {
  id: string;
  company: string;
  industry: string;
  contact: string;
  email: string;
  phone: string;
  volume: string;
  message: string;
  createdAt: string;
};

type Store = {
  bookings: Map<string, Booking>;
  leads: CommercialLead[];
  subscribers: Set<string>;
  messages: { name: string; email: string; message: string; at: string }[];
};

const globalStore = globalThis as unknown as { __lustraStore?: Store };

const store: Store =
  globalStore.__lustraStore ??
  (globalStore.__lustraStore = {
    bookings: new Map(),
    leads: [],
    subscribers: new Set(),
    messages: [],
  });

/* ------------------------------- Bookings ------------------------------- */

export function createBooking(
  input: Omit<Booking, "id" | "status" | "createdAt" | "timeline">
): Booking {
  const id = generateOrderId();
  const now = new Date().toISOString();
  const booking: Booking = {
    ...input,
    id,
    status: "scheduled",
    createdAt: now,
    timeline: [
      {
        status: "scheduled",
        at: now,
        note: `Pickup scheduled for ${input.date}, ${input.window}.`,
      },
    ],
  };
  store.bookings.set(id, booking);
  return booking;
}

export function getBooking(id: string) {
  return store.bookings.get(id.toUpperCase()) ?? null;
}

const DEMO_TIMELINE: { status: OrderStatus; note: string }[] = [
  { status: "scheduled", note: "Pickup scheduled." },
  { status: "picked_up", note: "Driver collected 3 sealed bags (est. 8 kg)." },
  { status: "processing", note: "Sorted and washing — hypoallergenic cycle." },
  { status: "quality_check", note: "Folded and passed 12-point quality check." },
  { status: "out_for_delivery", note: "Out for delivery — ETA 25 minutes." },
  { status: "delivered", note: "Delivered. Photo confirmation available." },
];

/** Deterministic demo tracking for unknown IDs so the tracking UI is explorable. */
export function getDemoTracking(id: string) {
  const seed = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const stage = seed % DEMO_TIMELINE.length;
  const now = Date.now();
  return {
    id: id.toUpperCase(),
    status: DEMO_TIMELINE[stage].status,
    timeline: DEMO_TIMELINE.slice(0, stage + 1).map((t, i) => ({
      ...t,
      at: new Date(now - (stage - i) * 3 * 60 * 60 * 1000).toISOString(),
    })),
    eta: stage < 5 ? new Date(now + (5 - stage) * 3 * 60 * 60 * 1000).toISOString() : null,
  };
}

/* --------------------------- Leads / subscribers --------------------------- */

export function createLead(input: Omit<CommercialLead, "id" | "createdAt">) {
  const lead: CommercialLead = {
    ...input,
    id: `LEAD-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  store.leads.push(lead);
  return lead;
}

export function addSubscriber(email: string) {
  const fresh = !store.subscribers.has(email);
  store.subscribers.add(email);
  return fresh;
}

export function addMessage(input: { name: string; email: string; message: string }) {
  store.messages.push({ ...input, at: new Date().toISOString() });
}
