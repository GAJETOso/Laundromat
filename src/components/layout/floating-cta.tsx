"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function FloatingCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/book") || pathname.startsWith("/admin") || pathname.startsWith("/driver")) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-soft-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </a>
      <Link href="/book" className="btn-primary hidden shadow-soft-lg sm:inline-flex">
        Schedule Pickup
      </Link>
    </div>
  );
}
