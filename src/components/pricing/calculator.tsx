"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { washFoldPricing } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const speeds = [
  { id: "standard", label: "Standard · 48h", multiplier: 1 },
  { id: "express", label: "Express · 24h", multiplier: washFoldPricing.expressMultiplier },
  { id: "same-day", label: "Same day", multiplier: washFoldPricing.sameDayMultiplier },
];

export function PriceCalculator() {
  const [lbs, setLbs] = useState(15);
  const [speed, setSpeed] = useState(speeds[0]);
  const [addOns, setAddOns] = useState<string[]>([]);

  const breakdown = useMemo(() => {
    const effectiveLbs = Math.max(lbs, washFoldPricing.minimumLbs);
    const base = effectiveLbs * washFoldPricing.perLb;
    const addOnTotal = washFoldPricing.addOns
      .filter((a) => addOns.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    const subtotal = base * speed.multiplier + addOnTotal;
    return { base, addOnTotal, total: subtotal, effectiveLbs };
  }, [lbs, speed, addOns]);

  return (
    <div className="card grid gap-0 overflow-hidden lg:grid-cols-[1.4fr_1fr]">
      <div className="p-8 md:p-10">
        <h3 className="h-display flex items-center gap-3 text-2xl">
          <Calculator className="h-6 w-6 text-aqua-500" aria-hidden />
          Wash &amp; fold estimator
        </h3>

        <div className="mt-8">
          <label htmlFor="calc-weight" className="label">
            Load weight: <strong>{lbs} lbs</strong>
            <span className="ml-2 font-normal normal-case text-muted">(a full kitchen trash bag ≈ 12–15 lbs)</span>
          </label>
          <input
            id="calc-weight"
            type="range"
            min={5}
            max={100}
            value={lbs}
            onChange={(e) => setLbs(Number(e.target.value))}
            className="w-full accent-aqua-500"
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>5 lbs</span>
            <span>100 lbs</span>
          </div>
        </div>

        <div className="mt-8">
          <span className="label">Turnaround</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Turnaround speed">
            {speeds.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSpeed(s)}
                aria-pressed={speed.id === s.id}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  speed.id === s.id
                    ? "border-aqua-500 bg-aqua-500 text-white"
                    : "border-[rgb(var(--border))] hover:border-aqua-500/50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <span className="label">Add-ons</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {washFoldPricing.addOns.map((a) => {
              const checked = addOns.includes(a.id);
              return (
                <label
                  key={a.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-sm transition-colors",
                    checked ? "border-aqua-500 bg-aqua-500/5" : "border-[rgb(var(--border))] hover:border-aqua-500/40"
                  )}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-aqua-500"
                    checked={checked}
                    onChange={() =>
                      setAddOns((prev) => (checked ? prev.filter((x) => x !== a.id) : [...prev, a.id]))
                    }
                  />
                  <span className="flex-1">{a.label}</span>
                  <span className="text-xs font-semibold text-muted">+{formatCurrency(a.price)}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between bg-ink-900 p-8 text-white md:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-400">Your estimate</p>
          <p className="mt-4 font-display text-6xl font-bold">{formatCurrency(breakdown.total)}</p>
          <dl className="mt-8 space-y-3 text-sm text-ink-200/80">
            <div className="flex justify-between">
              <dt>{breakdown.effectiveLbs} lbs × {formatCurrency(washFoldPricing.perLb)}</dt>
              <dd>{formatCurrency(breakdown.base)}</dd>
            </div>
            {speed.multiplier > 1 && (
              <div className="flex justify-between">
                <dt>{speed.label} ({speed.multiplier}×)</dt>
                <dd>+{formatCurrency(breakdown.base * (speed.multiplier - 1))}</dd>
              </div>
            )}
            {breakdown.addOnTotal > 0 && (
              <div className="flex justify-between">
                <dt>Add-ons</dt>
                <dd>+{formatCurrency(breakdown.addOnTotal)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-3 font-semibold text-white">
              <dt>Pickup &amp; delivery</dt>
              <dd className="text-emerald-400">Free</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-ink-200/60">
            Final price is set when your laundry is weighed at the facility. {washFoldPricing.minimumLbs} lb minimum
            applies. Lustra+ members save 15%.
          </p>
        </div>
        <Link href="/book" className="btn-primary mt-8 w-full !py-4">
          Book this pickup <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
