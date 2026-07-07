"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle, Star, Truck, WashingMachine, Clock } from "lucide-react";

const bubbles = [
  { size: 120, left: "8%", top: "18%", delay: 0 },
  { size: 60, left: "16%", top: "62%", delay: 1.4 },
  { size: 90, left: "78%", top: "12%", delay: 0.6 },
  { size: 45, left: "88%", top: "48%", delay: 2 },
  { size: 70, left: "70%", top: "70%", delay: 1 },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-32 md:pb-28 md:pt-44">
      {/* Ambient floating bubbles — a nod to water without a literal video file. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full border border-aqua-400/20 bg-gradient-to-br from-aqua-400/10 to-transparent backdrop-blur-sm animate-float"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              animationDelay: `${b.delay}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="section relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="chip mb-6 !border-aqua-500/30 !bg-aqua-500/10 text-aqua-700 dark:text-aqua-300"
          >
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
            Rated 4.9 by 35,000+ customers
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="h-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Laundry,
            <br />
            <span className="text-gradient">elevated.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Smart laundromats you can reserve from your phone. Pickup &amp; delivery tracked to the
            minute. Couture-grade dry cleaning. One beautiful platform for every thread you own.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/book" className="btn-primary !px-8 !py-4 !text-base">
              Schedule Pickup
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/locations" className="btn-secondary !px-8 !py-4 !text-base">
              <PlayCircle className="h-5 w-5 text-aqua-500" aria-hidden />
              Find a Machine
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-aqua-500" aria-hidden /> 24h turnaround
            </span>
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-aqua-500" aria-hidden /> Free pickup &amp; delivery
            </span>
            <span className="flex items-center gap-2">
              <WashingMachine className="h-4 w-4 text-aqua-500" aria-hidden /> 74 smart machines
            </span>
          </motion.div>
        </div>

        {/* Hero visual: glass order card stack */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
          aria-hidden
        >
          <div className="glass rounded-4xl p-6 shadow-soft-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">Order LST-8F2K</p>
                <p className="mt-1 font-display text-lg font-bold">Out for delivery</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
                <Truck className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgb(var(--border))]">
              <motion.div
                className="h-full rounded-full bg-cta-gradient"
                initial={{ width: "12%" }}
                animate={{ width: "82%" }}
                transition={{ duration: 2.4, delay: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted">
              <span>Picked up 9:15 AM</span>
              <span className="font-semibold text-aqua-600 dark:text-aqua-400">ETA 14 min</span>
            </div>
          </div>

          <div className="glass absolute -left-6 -top-8 hidden rounded-3xl px-5 py-4 shadow-card sm:block animate-float">
            <p className="text-xs text-muted">Washer M-07</p>
            <p className="font-display text-2xl font-bold text-aqua-600 dark:text-aqua-400">08:24</p>
            <p className="text-xs text-muted">remaining</p>
          </div>

          <div
            className="glass absolute -bottom-8 -right-4 hidden rounded-3xl px-5 py-4 shadow-card sm:block animate-float"
            style={{ animationDelay: "1.8s" }}
          >
            <p className="text-xs text-muted">Loyalty balance</p>
            <p className="font-display text-2xl font-bold">2,450 pts</p>
            <p className="text-xs font-semibold text-emerald-500">≈ $24.50 credit</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
