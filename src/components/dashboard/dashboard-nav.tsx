"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Gift, Settings, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/rewards", label: "Rewards", icon: Gift },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-1.5">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-cta-gradient text-white shadow-glow"
                : "text-muted hover:bg-aqua-500/10 hover:text-aqua-600 dark:hover:text-aqua-400"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
