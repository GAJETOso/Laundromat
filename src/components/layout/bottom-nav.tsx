"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, MapPin, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/locations", label: "Stores", icon: MapPin },
  { href: "/book", label: "Book", icon: CalendarPlus, primary: true },
  { href: "/track", label: "Track", icon: Package },
  { href: "/dashboard", label: "Account", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/driver")) return null;

  return (
    <nav
      aria-label="Mobile"
      className="glass fixed inset-x-0 bottom-0 z-50 border-t border-[rgb(var(--border))] pb-[env(safe-area-inset-bottom)] sm:hidden"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold",
                active ? "text-aqua-600 dark:text-aqua-400" : "text-muted"
              )}
            >
              {item.primary ? (
                <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-cta-gradient text-white shadow-glow">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              ) : (
                <Icon className="h-5 w-5" aria-hidden />
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
