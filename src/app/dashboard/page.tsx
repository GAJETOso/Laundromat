import Link from "next/link";
import { ArrowRight, Package, Gift, Truck, CalendarClock } from "lucide-react";
import { demoOrders, demoUser } from "@/lib/demo-account";
import { formatCurrency, cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  delivered: "!border-emerald-500/30 !bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  out_for_delivery: "!border-aqua-500/30 !bg-aqua-500/10 text-aqua-600 dark:text-aqua-400",
  processing: "!border-violet-500/30 !bg-violet-500/10 text-violet-600 dark:text-violet-400",
  scheduled: "!border-amber-500/30 !bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const statusLabels: Record<string, string> = {
  delivered: "Delivered",
  out_for_delivery: "Out for delivery",
  processing: "Cleaning",
  scheduled: "Scheduled",
};

export default function DashboardOverview() {
  const active = demoOrders.filter((o) => o.status !== "delivered");
  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Truck className="h-4 w-4 text-aqua-500" aria-hidden /> Active orders
          </p>
          <p className="mt-2 font-display text-3xl font-bold">{active.length}</p>
        </div>
        <div className="card p-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Gift className="h-4 w-4 text-aqua-500" aria-hidden /> Points
          </p>
          <p className="mt-2 font-display text-3xl font-bold">{demoUser.points.toLocaleString()}</p>
          <p className="text-xs font-semibold text-emerald-500">≈ {formatCurrency(demoUser.points / 100)} credit</p>
        </div>
        <div className="card p-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <CalendarClock className="h-4 w-4 text-aqua-500" aria-hidden /> Next pickup
          </p>
          <p className="mt-2 font-display text-3xl font-bold">Thu</p>
          <p className="text-xs text-muted">Weekly · 9–11 AM · Home</p>
        </div>
      </div>

      {/* Subscription card */}
      <div className="card flex flex-wrap items-center justify-between gap-6 bg-cta-gradient p-8 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Your plan</p>
          <p className="mt-1 font-display text-2xl font-bold">{demoUser.plan}</p>
          <p className="mt-1 text-sm text-white/80">28 of 40 lbs used this month · 12 lbs roll over</p>
        </div>
        <div className="w-full max-w-xs">
          <div className="h-2 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-[70%] rounded-full bg-white" />
          </div>
          <p className="mt-2 text-xs text-white/70">Renews July 14 · manage in Settings</p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="h-display text-xl">Recent orders</h2>
          <Link href="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-aqua-600 hover:underline dark:text-aqua-400">
            All orders <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="divide-y divide-[rgb(var(--border))]">
          {demoOrders.slice(0, 4).map((o) => (
            <li key={o.id} className="flex flex-wrap items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-aqua-500/10">
                <Package className="h-5 w-5 text-aqua-500" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{o.service}</p>
                <p className="text-xs text-muted">
                  {o.id} · {new Date(o.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {o.weightLbs ? ` · ${o.weightLbs} lbs` : ""}
                </p>
              </div>
              <span className={cn("chip", statusStyles[o.status])}>{statusLabels[o.status]}</span>
              <span className="w-20 text-right font-display font-bold">{formatCurrency(o.total)}</span>
              <Link
                href={`/track?id=${o.id}`}
                className="text-sm font-semibold text-aqua-600 hover:underline dark:text-aqua-400"
              >
                Track
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/book" className="btn-primary">Book a pickup</Link>
        <Link href="/dashboard/rewards" className="btn-secondary">Redeem points</Link>
      </div>
    </div>
  );
}
