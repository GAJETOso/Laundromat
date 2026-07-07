import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { demoUser } from "@/lib/demo-account";

export const metadata: Metadata = {
  title: "My Dashboard",
  robots: { index: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-hero-gradient pb-24 pt-24 md:pt-32">
      <div className="section">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cta-gradient font-display text-lg font-bold text-white shadow-glow"
            >
              {demoUser.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <div>
              <h1 className="h-display text-2xl">Hey, {demoUser.name.split(" ")[0]} 👋</h1>
              <p className="text-sm text-muted">
                {demoUser.plan} member · {demoUser.points.toLocaleString()} points
              </p>
            </div>
          </div>
          <p className="chip !border-amber-400/40 !bg-amber-400/10 text-amber-600 dark:text-amber-400">
            Demo account — connect auth (see docs/ARCHITECTURE.md) for live data
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <DashboardNav />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
