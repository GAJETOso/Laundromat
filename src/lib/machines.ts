/**
 * Simulated live machine telemetry.
 *
 * In production this reads from the machine IoT gateway (see docs/ARCHITECTURE.md).
 * Here we derive a deterministic-but-time-varying fleet state so the live
 * availability UI behaves realistically without hardware.
 */

export type MachineType = "washer" | "dryer";
export type MachineStatus = "available" | "running" | "reserved" | "finishing" | "maintenance";

export type Machine = {
  id: string;
  locationId: string;
  type: MachineType;
  capacityLbs: number;
  status: MachineStatus;
  minutesRemaining: number | null;
  pricePerCycle: number;
};

const FLEET: Array<{ locationId: string; washers: number; dryers: number }> = [
  { locationId: "downtown", washers: 24, dryers: 20 },
  { locationId: "midtown", washers: 32, dryers: 28 },
  { locationId: "university", washers: 18, dryers: 16 },
];

const WASHER_CAPACITIES = [14, 20, 20, 40, 60];
const WASHER_PRICES: Record<number, number> = { 14: 3.5, 20: 4.75, 40: 7.5, 60: 9.75 };

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getMachines(locationId?: string): Machine[] {
  // Time bucket shifts every 5 minutes so "live" state evolves between polls.
  const bucket = Math.floor(Date.now() / (5 * 60 * 1000));
  const machines: Machine[] = [];

  for (const site of FLEET) {
    if (locationId && site.locationId !== locationId) continue;

    for (let i = 0; i < site.washers; i++) {
      const seed = bucket + i * 7.13 + site.locationId.length * 3.7;
      const r = pseudoRandom(seed);
      const capacity = WASHER_CAPACITIES[i % WASHER_CAPACITIES.length];
      const status: MachineStatus =
        r < 0.38 ? "available" : r < 0.72 ? "running" : r < 0.82 ? "reserved" : r < 0.95 ? "finishing" : "maintenance";
      machines.push({
        id: `${site.locationId.toUpperCase().slice(0, 3)}-W${String(i + 1).padStart(2, "0")}`,
        locationId: site.locationId,
        type: "washer",
        capacityLbs: capacity,
        status,
        minutesRemaining:
          status === "running" ? Math.ceil(pseudoRandom(seed * 1.3) * 32) + 3 : status === "finishing" ? 2 : null,
        pricePerCycle: WASHER_PRICES[capacity],
      });
    }

    for (let i = 0; i < site.dryers; i++) {
      const seed = bucket + i * 11.31 + site.locationId.length * 5.1;
      const r = pseudoRandom(seed);
      const status: MachineStatus =
        r < 0.42 ? "available" : r < 0.78 ? "running" : r < 0.86 ? "reserved" : r < 0.96 ? "finishing" : "maintenance";
      const capacity = i % 3 === 0 ? 50 : 30;
      machines.push({
        id: `${site.locationId.toUpperCase().slice(0, 3)}-D${String(i + 1).padStart(2, "0")}`,
        locationId: site.locationId,
        type: "dryer",
        capacityLbs: capacity,
        status,
        minutesRemaining:
          status === "running" ? Math.ceil(pseudoRandom(seed * 1.7) * 40) + 4 : status === "finishing" ? 3 : null,
        pricePerCycle: capacity === 50 ? 0.75 : 0.5,
      });
    }
  }

  return machines;
}

export function getAvailabilitySummary() {
  const machines = getMachines();
  const byLocation: Record<
    string,
    { washersAvailable: number; washersTotal: number; dryersAvailable: number; dryersTotal: number }
  > = {};

  for (const m of machines) {
    byLocation[m.locationId] ??= {
      washersAvailable: 0,
      washersTotal: 0,
      dryersAvailable: 0,
      dryersTotal: 0,
    };
    const loc = byLocation[m.locationId];
    if (m.type === "washer") {
      loc.washersTotal++;
      if (m.status === "available") loc.washersAvailable++;
    } else {
      loc.dryersTotal++;
      if (m.status === "available") loc.dryersAvailable++;
    }
  }

  return byLocation;
}
