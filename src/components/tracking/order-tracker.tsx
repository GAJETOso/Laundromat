"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Loader2, Package, Search, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  { key: "scheduled", label: "Scheduled" },
  { key: "picked_up", label: "Picked up" },
  { key: "processing", label: "Cleaning" },
  { key: "quality_check", label: "Quality check" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
] as const;

type Tracking = {
  id: string;
  status: string;
  timeline: { status: string; at: string; note: string }[];
  eta: string | null;
};

export function OrderTracker() {
  const params = useSearchParams();
  const [orderId, setOrderId] = useState(params.get("id") ?? "");
  const [tracking, setTracking] = useState<Tracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = useCallback(async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order not found.");
      setTracking(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setTracking(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initial = params.get("id");
    if (initial) lookup(initial);
  }, [params, lookup]);

  const stageIndex = tracking ? STAGES.findIndex((s) => s.key === tracking.status) : -1;

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(orderId);
        }}
        className="card flex gap-2 p-3"
      >
        <label htmlFor="track-id" className="sr-only">Order ID</label>
        <input
          id="track-id"
          className="input flex-1 !border-0 uppercase"
          placeholder="Enter order ID — e.g. LST-8F2K"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button type="submit" className="btn-primary !px-6" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
          Track
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      {tracking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mt-8 p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Order</p>
              <p className="font-display text-2xl font-bold">{tracking.id}</p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
              {tracking.status === "delivered" ? <Package className="h-6 w-6" aria-hidden /> : <Truck className="h-6 w-6" aria-hidden />}
            </span>
          </div>

          {tracking.eta && (
            <p className="mt-3 text-sm font-semibold text-aqua-600 dark:text-aqua-400">
              Estimated delivery:{" "}
              {new Date(tracking.eta).toLocaleString([], {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}

          {/* Stage rail */}
          <ol className="mt-8 space-y-0" aria-label="Order progress">
            {STAGES.map((stage, i) => {
              const done = i <= stageIndex;
              const event = tracking.timeline.find((t) => t.status === stage.key);
              const isLast = i === STAGES.length - 1;
              return (
                <li key={stage.key} className="relative flex gap-4 pb-8 last:pb-0">
                  {!isLast && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5",
                        i < stageIndex ? "bg-aqua-500" : "bg-[rgb(var(--border))]"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-[rgb(var(--card))]",
                      done ? "border-aqua-500 bg-aqua-500 text-white" : "border-[rgb(var(--border))] text-muted"
                    )}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden /> : <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
                  </span>
                  <div className="pt-1">
                    <p className={cn("text-sm font-bold", !done && "text-muted")}>{stage.label}</p>
                    {event && (
                      <>
                        <p className="mt-0.5 text-xs text-muted">{event.note}</p>
                        <p className="mt-0.5 text-xs text-muted/70">
                          {new Date(event.at).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>
      )}
    </div>
  );
}
