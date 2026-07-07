"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WashingMachine, Wind, RefreshCw, ArrowRight } from "lucide-react";
import { locations } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

type Summary = Record<
  string,
  { washersAvailable: number; washersTotal: number; dryersAvailable: number; dryersTotal: number }
>;

function Meter({ available, total }: { available: number; total: number }) {
  const pct = total ? Math.round((available / total) * 100) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgb(var(--border))]">
      <div
        className="h-full rounded-full bg-cta-gradient transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function MachineAvailability() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/machines?summary=1");
      const data = await res.json();
      setSummary(data.summary);
      setUpdatedAt(new Date());
    } catch {
      /* keep last known state */
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section py-24 md:py-32" aria-labelledby="availability-heading">
      <SectionHeading
        eyebrow="Live right now"
        title="Machine availability, before you leave home"
        body="Every washer and dryer streams its status live. Check availability, reserve your machine, and walk straight in."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {locations.map((loc, i) => {
          const s = summary?.[loc.id];
          return (
            <Reveal key={loc.id} delay={i * 0.08}>
              <div className="card flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <h3 className="h-display text-lg">{loc.name}</h3>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                    <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-500" aria-hidden />
                    Live
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{loc.address} · {loc.hours}</p>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <WashingMachine className="h-4 w-4 text-aqua-500" aria-hidden /> Washers
                      </span>
                      {s ? (
                        <span className="font-bold">
                          {s.washersAvailable}
                          <span className="font-normal text-muted"> / {s.washersTotal} free</span>
                        </span>
                      ) : (
                        <span className="skeleton h-4 w-14" />
                      )}
                    </div>
                    <Meter available={s?.washersAvailable ?? 0} total={s?.washersTotal ?? 1} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <Wind className="h-4 w-4 text-aqua-500" aria-hidden /> Dryers
                      </span>
                      {s ? (
                        <span className="font-bold">
                          {s.dryersAvailable}
                          <span className="font-normal text-muted"> / {s.dryersTotal} free</span>
                        </span>
                      ) : (
                        <span className="skeleton h-4 w-14" />
                      )}
                    </div>
                    <Meter available={s?.dryersAvailable ?? 0} total={s?.dryersTotal ?? 1} />
                  </div>
                </div>

                <Link
                  href={`/locations#${loc.id}`}
                  className="btn-secondary mt-7 w-full !py-2.5 text-aqua-600 dark:text-aqua-400"
                >
                  Reserve a machine <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted">
        <RefreshCw className="h-3 w-3" aria-hidden />
        {updatedAt ? `Updated ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · refreshes every minute` : "Connecting to machines…"}
      </p>
    </section>
  );
}
