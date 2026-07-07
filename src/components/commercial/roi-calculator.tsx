"use client";

import { useMemo, useState } from "react";
import { TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

/**
 * In-house cost model (industry benchmarks, see blog: "The Real Cost of
 * In-House Hotel Laundry"): labor + utilities + chemistry + equipment
 * depreciation + linen wear ≈ $1.35/lb blended.  Lustra commercial blended
 * rate at volume ≈ $0.95/lb.
 */
const IN_HOUSE_PER_LB = 1.35;
const LUSTRA_PER_LB = 0.95;
const HOURS_SAVED_PER_100_LBS = 2.5;

export function RoiCalculator() {
  const [weeklyLbs, setWeeklyLbs] = useState(400);

  const model = useMemo(() => {
    const inHouse = weeklyLbs * IN_HOUSE_PER_LB * 52;
    const lustra = weeklyLbs * LUSTRA_PER_LB * 52;
    return {
      inHouse,
      lustra,
      savings: inHouse - lustra,
      hours: Math.round((weeklyLbs / 100) * HOURS_SAVED_PER_100_LBS * 52),
    };
  }, [weeklyLbs]);

  return (
    <div className="card p-8">
      <h3 className="h-display flex items-center gap-3 text-2xl">
        <TrendingDown className="h-6 w-6 text-aqua-500" aria-hidden />
        ROI calculator
      </h3>
      <p className="mt-2 text-sm text-muted">
        Modeled on industry benchmarks for fully-loaded in-house laundry cost (labor, utilities,
        chemistry, depreciation, linen wear).
      </p>

      <div className="mt-8">
        <label htmlFor="roi-volume" className="label">
          Weekly laundry volume: <strong>{weeklyLbs.toLocaleString()} lbs</strong>
        </label>
        <input
          id="roi-volume"
          type="range"
          min={100}
          max={3000}
          step={50}
          value={weeklyLbs}
          onChange={(e) => setWeeklyLbs(Number(e.target.value))}
          className="w-full accent-aqua-500"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>100 lbs</span>
          <span>3,000 lbs</span>
        </div>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-[rgb(var(--bg))] p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">In-house / yr</dt>
          <dd className="mt-2 font-display text-2xl font-bold">{formatCurrency(Math.round(model.inHouse))}</dd>
        </div>
        <div className="rounded-3xl bg-[rgb(var(--bg))] p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">With Lustra / yr</dt>
          <dd className="mt-2 font-display text-2xl font-bold">{formatCurrency(Math.round(model.lustra))}</dd>
        </div>
        <div className="rounded-3xl bg-emerald-500/10 p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">You save / yr</dt>
          <dd className="mt-2 font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(Math.round(model.savings))}
          </dd>
        </div>
      </dl>
      <p className="mt-5 text-sm text-muted">
        Plus roughly <strong className="text-[rgb(var(--fg))]">{model.hours.toLocaleString()} staff hours</strong> a
        year back for guest-facing work — and zero equipment capital at risk.
      </p>
    </div>
  );
}
