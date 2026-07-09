"use client";

import { useMemo, useState } from "react";
import { TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

/**
 * In-house cost model (industry benchmarks, see blog: "The Real Cost of
 * In-House Hotel Laundry"): labor + utilities + chemistry + equipment
 * depreciation + generator fuel + linen wear ≈ ₦900/kg blended. Lustra
 * commercial blended rate at volume ≈ ₦650/kg.
 */
const IN_HOUSE_PER_KG = 900;
const LUSTRA_PER_KG = 650;
const HOURS_SAVED_PER_50_KG = 2.5;

export function RoiCalculator() {
  const [weeklyKg, setWeeklyKg] = useState(200);

  const model = useMemo(() => {
    const inHouse = weeklyKg * IN_HOUSE_PER_KG * 52;
    const lustra = weeklyKg * LUSTRA_PER_KG * 52;
    return {
      inHouse,
      lustra,
      savings: inHouse - lustra,
      hours: Math.round((weeklyKg / 50) * HOURS_SAVED_PER_50_KG * 52),
    };
  }, [weeklyKg]);

  return (
    <div className="card p-8">
      <h3 className="h-display flex items-center gap-3 text-2xl">
        <TrendingDown className="h-6 w-6 text-aqua-500" aria-hidden />
        ROI calculator
      </h3>
      <p className="mt-2 text-sm text-muted">
        Modeled on industry benchmarks for fully-loaded in-house laundry cost (labour, utilities, chemistry,
        depreciation, generator fuel, linen wear).
      </p>

      <div className="mt-8">
        <label htmlFor="roi-volume" className="label">
          Weekly laundry volume: <strong>{weeklyKg.toLocaleString()} kg</strong>
        </label>
        <input
          id="roi-volume"
          type="range"
          min={50}
          max={1500}
          step={25}
          value={weeklyKg}
          onChange={(e) => setWeeklyKg(Number(e.target.value))}
          className="w-full accent-aqua-500"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>50 kg</span>
          <span>1,500 kg</span>
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
