"use client";

import { useEffect, useState } from "react";
import { WashingMachine, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Machine, MachineStatus } from "@/lib/machines";

const statusStyles: Record<MachineStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  running: { label: "Running", className: "border-aqua-500/40 bg-aqua-500/10 text-aqua-600 dark:text-aqua-400" },
  reserved: { label: "Reserved", className: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  finishing: { label: "Finishing", className: "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  maintenance: { label: "Service", className: "border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-muted" },
};

export function MachineFloor({ locationId }: { locationId: string }) {
  const [machines, setMachines] = useState<Machine[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/machines?location=${locationId}`);
        const data = await res.json();
        if (!cancelled) setMachines(data.machines);
      } catch {
        /* retry on next interval */
      }
    }
    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [locationId]);

  if (!machines) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="skeleton h-20" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 text-xs">
        {Object.entries(statusStyles).map(([key, s]) => (
          <span key={key} className={cn("chip", s.className)}>{s.label}</span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8" role="list" aria-label="Machines at this location">
        {machines.map((m) => {
          const style = statusStyles[m.status];
          const Icon = m.type === "washer" ? WashingMachine : Wind;
          return (
            <div
              key={m.id}
              role="listitem"
              title={`${m.id} — ${style.label}${m.minutesRemaining ? `, ${m.minutesRemaining} min left` : ""}`}
              className={cn(
                "flex h-20 flex-col items-center justify-center gap-1 rounded-2xl border text-center transition-transform hover:scale-105",
                style.className
              )}
            >
              <Icon className={cn("h-5 w-5", m.status === "running" && "animate-drum")} aria-hidden />
              <span className="text-[10px] font-bold">{m.id.split("-")[1]}</span>
              <span className="text-[9px] leading-none">
                {m.minutesRemaining ? `${m.minutesRemaining}m` : `${m.capacityKg} kg`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
