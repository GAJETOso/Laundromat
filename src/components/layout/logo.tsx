import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Lustra — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-cta-gradient shadow-glow transition-transform duration-300 group-hover:rotate-6">
        {/* Stylized porthole / drop mark */}
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.8" />
          <path
            d="M12 7.5c1.8 2.2 3 3.7 3 5.4a3 3 0 1 1-6 0c0-1.7 1.2-3.2 3-5.4Z"
            fill="white"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Lustra
        <span className="text-aqua-500">.</span>
      </span>
    </Link>
  );
}
