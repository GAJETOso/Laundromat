import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  WashingMachine,
  Tag,
  FileText,
  BarChart3,
  Megaphone,
  Star,
} from "lucide-react";
import { adminKpis, adminOrders, weeklyRevenue } from "@/lib/demo-account";
import { getAvailabilitySummary } from "@/lib/machines";
import { locations } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin — Operations Dashboard",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

const modules = [
  { icon: Package, label: "Orders" },
  { icon: Users, label: "Customers" },
  { icon: Truck, label: "Drivers" },
  { icon: WashingMachine, label: "Machines" },
  { icon: Tag, label: "Pricing & Coupons" },
  { icon: FileText, label: "Invoices" },
  { icon: Star, label: "Reviews" },
  { icon: Megaphone, label: "Campaigns" },
  { icon: BarChart3, label: "Reports" },
];

export default function AdminPage() {
  const machineSummary = getAvailabilitySummary();
  const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount));

  return (
    <div className="bg-hero-gradient pb-24 pt-24 md:pt-32">
      <div className="section">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="h-display flex items-center gap-3 text-3xl">
              <LayoutDashboard className="h-7 w-7 text-aqua-500" aria-hidden /> Operations
            </h1>
            <p className="mt-1 text-sm text-muted">Lustra Admin · all locations · live</p>
          </div>
          <p className="chip !border-amber-400/40 !bg-amber-400/10 text-amber-600 dark:text-amber-400">
            Demo CMS — role-gated behind OAuth/2FA in production
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminKpis.map((kpi) => (
            <div key={kpi.label} className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{kpi.label}</p>
              <p className="mt-2 font-display text-3xl font-bold">{kpi.value}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-500">{kpi.trend}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Orders table */}
          <div className="card overflow-x-auto p-6 sm:p-8">
            <h2 className="h-display mb-5 text-xl">Live orders</h2>
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-[rgb(var(--border))] text-left text-xs uppercase tracking-wider text-muted">
                  <th className="pb-3 pr-4 font-semibold">Order</th>
                  <th className="pb-3 pr-4 font-semibold">Customer</th>
                  <th className="pb-3 pr-4 font-semibold">Service</th>
                  <th className="pb-3 pr-4 font-semibold">Driver</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((o) => (
                  <tr key={o.id} className="border-b border-[rgb(var(--border))]/60 last:border-0">
                    <td className="py-3.5 pr-4 font-mono text-xs font-semibold">{o.id}</td>
                    <td className="py-3.5 pr-4 font-medium">{o.customer}</td>
                    <td className="py-3.5 pr-4 text-muted">{o.service}</td>
                    <td className="py-3.5 pr-4 text-muted">{o.driver}</td>
                    <td className="py-3.5 pr-4">
                      <span className="chip">{o.status}</span>
                    </td>
                    <td className="py-3.5 text-right font-display font-bold">{formatCurrency(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            {/* Revenue chart (CSS bars) */}
            <div className="card p-6 sm:p-8">
              <h2 className="h-display mb-5 text-xl">Revenue · 7 days</h2>
              <div className="flex h-40 items-end gap-2" role="img" aria-label="Bar chart of weekly revenue peaking Saturday at $6,100">
                {weeklyRevenue.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold text-muted">₦{(d.amount / 1_000_000).toFixed(1)}M</span>
                    <div
                      className="w-full rounded-t-xl bg-cta-gradient transition-all hover:opacity-80"
                      style={{ height: `${(d.amount / maxRevenue) * 100}%` }}
                    />
                    <span className="text-[10px] font-semibold text-muted">{d.day}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">
                Week total {formatCurrency(weeklyRevenue.reduce((a, d) => a + d.amount, 0))} · +11% vs last week
              </p>
            </div>

            {/* Fleet status */}
            <div className="card p-6 sm:p-8">
              <h2 className="h-display mb-5 text-xl">Machine fleet</h2>
              <ul className="space-y-4 text-sm">
                {locations.map((loc) => {
                  const s = machineSummary[loc.id];
                  return (
                    <li key={loc.id}>
                      <div className="flex justify-between font-semibold">
                        <span>{loc.name}</span>
                        <span className="text-muted">
                          {s ? s.washersAvailable + s.dryersAvailable : 0} free /{" "}
                          {s ? s.washersTotal + s.dryersTotal : 0}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--border))]">
                        <div
                          className="h-full rounded-full bg-cta-gradient"
                          style={{
                            width: s
                              ? `${Math.round(((s.washersAvailable + s.dryersAvailable) / (s.washersTotal + s.dryersTotal)) * 100)}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Module launcher */}
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.label}
                type="button"
                className="card flex flex-col items-center gap-2 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-aqua-500/50 hover:shadow-card"
              >
                <Icon className="h-5 w-5 text-aqua-500" aria-hidden />
                <span className="text-[11px] font-semibold leading-tight">{m.label}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Full CMS modules (orders, customers, drivers, machines, pricing, promotions, subscriptions,
          commercial clients, invoices, payments, reviews, blog, staff, inventory, analytics, campaigns)
          are specified in <Link href="https://github.com/gajetoso/laundromat" className="underline">docs/ARCHITECTURE.md</Link> and modeled in prisma/schema.prisma.
        </p>
      </div>
    </div>
  );
}
