"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const serviceLinks = [
  { href: "/services/self-service", label: "Self-Service Laundromat" },
  { href: "/services/pickup-delivery", label: "Pickup & Delivery" },
  { href: "/services/commercial", label: "Commercial Laundry" },
  { href: "/services/dry-cleaning", label: "Dry Cleaning" },
  { href: "/services/wash-fold", label: "Wash & Fold" },
  { href: "/services/express", label: "Express Laundry" },
  { href: "/services/subscriptions", label: "Subscription Plans" },
];

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/commercial", label: "For Business" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-card" : "bg-transparent"
      )}
    >
      <nav className="section flex h-16 items-center justify-between gap-4 md:h-[72px]" aria-label="Main">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-aqua-600 dark:hover:text-aqua-400",
                pathname.startsWith("/services") && "text-aqua-600 dark:text-aqua-400"
              )}
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} aria-hidden />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="glass absolute left-0 top-full w-72 rounded-3xl p-2 shadow-soft-lg"
                >
                  {serviceLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-aqua-500/10 hover:text-aqua-600 dark:hover:text-aqua-400"
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-aqua-600 dark:hover:text-aqua-400",
                pathname === l.href && "text-aqua-600 dark:text-aqua-400"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-colors hover:border-aqua-500/50"
            aria-label="My account"
          >
            <User className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/book" className="btn-primary !px-5 !py-2.5">
            Book Now
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))]"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden border-t border-[rgb(var(--border))] lg:hidden"
          >
            <div className="section grid gap-1 py-4">
              <p className="label !mb-1 px-4 pt-2">Services</p>
              {serviceLinks.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-2xl px-4 py-2.5 text-sm font-medium hover:bg-aqua-500/10">
                  {l.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-[rgb(var(--border))]" />
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-2xl px-4 py-2.5 text-sm font-medium hover:bg-aqua-500/10">
                  {l.label}
                </Link>
              ))}
              <Link href="/dashboard" className="rounded-2xl px-4 py-2.5 text-sm font-medium hover:bg-aqua-500/10">
                My Account
              </Link>
              <Link href="/book" className="btn-primary mt-3">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
