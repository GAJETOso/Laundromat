/**
 * Lustra API client — a zero-dependency, fully typed client for the platform
 * API, usable as-is in React Native/Expo and adaptable line-for-line to
 * Swift (URLSession/Codable) and Kotlin (Retrofit/kotlinx.serialization).
 *
 * Endpoints are served under both /api/* and the stable alias /api/v1/*;
 * mobile apps should pin /api/v1. Full contract: docs/API.md.
 */

export type MachineStatus = "available" | "running" | "reserved" | "finishing" | "maintenance";

export type Machine = {
  id: string;
  locationId: string;
  type: "washer" | "dryer";
  capacityLbs: number;
  status: MachineStatus;
  minutesRemaining: number | null;
  pricePerCycle: number;
};

export type AvailabilitySummary = Record<
  string,
  { washersAvailable: number; washersTotal: number; dryersAvailable: number; dryersTotal: number }
>;

export type OrderStatus =
  | "scheduled"
  | "picked_up"
  | "processing"
  | "quality_check"
  | "out_for_delivery"
  | "delivered";

export type OrderTracking = {
  id: string;
  status: OrderStatus;
  timeline: { status: OrderStatus; at: string; note: string }[];
  eta: string | null;
};

export type BookingRequest = {
  service: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string; // YYYY-MM-DD
  window: string; // e.g. "9–11 AM"
  recurring?: string;
  preferences?: string[];
  instructions?: string;
  estimatedTotal?: number;
};

export type Booking = BookingRequest & {
  id: string;
  status: OrderStatus;
  createdAt: string;
  timeline: OrderTracking["timeline"];
};

export type AppConfig = {
  minSupportedVersion: { ios: string; android: string };
  latestVersion: { ios: string; android: string };
  storeLinks: { appStore: string; playStore: string };
  featureFlags: Record<string, boolean>;
  support: { whatsapp: string; telegram: string; phone: string; email: string };
  theme: { accentLight: string; accentDark: string; ctaGradient: [string, string] };
};

export class LustraApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "LustraApiError";
  }
}

export class LustraApi {
  constructor(
    private baseUrl: string,
    private getAuthToken?: () => Promise<string | null>
  ) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = await this.getAuthToken?.();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}/api/v1${path}`, { ...init, headers });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new LustraApiError(res.status, (body as { error?: string }).error ?? `Request failed (${res.status})`);
    }
    return body as T;
  }

  /** Per-location availability counts — poll every 60 s on visible screens. */
  getAvailability() {
    return this.request<{ summary: AvailabilitySummary; updatedAt: string }>("/machines?summary=1");
  }

  /** Full machine list for one location's live floor view. */
  getMachines(locationId: string) {
    return this.request<{ machines: Machine[]; updatedAt: string }>(
      `/machines?location=${encodeURIComponent(locationId)}`
    );
  }

  /** Create a pickup booking (wizard final step). */
  createBooking(booking: BookingRequest) {
    return this.request<{ booking: Booking }>("/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
    });
  }

  /** Live order tracking by order ID (LST-…). */
  trackOrder(orderId: string) {
    return this.request<OrderTracking>(`/orders/${encodeURIComponent(orderId.trim())}`);
  }

  /** Lumi — the AI laundry assistant. Same brain as web/WhatsApp/Telegram. */
  chat(message: string) {
    return this.request<{ reply: string }>("/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  /** Commercial quote request. */
  createCommercialLead(lead: {
    company: string;
    industry: string;
    contact: string;
    email: string;
    volume: string;
    phone?: string;
    message?: string;
  }) {
    return this.request<{ ok: true; leadId: string; message: string }>("/commercial", {
      method: "POST",
      body: JSON.stringify(lead),
    });
  }

  /** Remote config: version gates, feature flags, store links, theme. Call on app launch. */
  getAppConfig() {
    return this.request<AppConfig>("/app-config");
  }
}

/*
Example (React Native):

  const api = new LustraApi("https://lustra.example.com", async () => SecureStore.getItemAsync("token"));
  const { summary } = await api.getAvailability();
*/
