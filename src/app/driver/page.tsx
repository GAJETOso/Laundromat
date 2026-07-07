import type { Metadata } from "next";
import { Truck, MapPin, Package, Camera, PenLine, Navigation } from "lucide-react";
import { driverRoute } from "@/lib/demo-account";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Driver — Route Dashboard",
  robots: { index: false },
};

export default function DriverPage() {
  const progress = Math.round((driverRoute.completed / driverRoute.total) * 100);

  return (
    <div className="bg-hero-gradient pb-24 pt-24 md:pt-32">
      <div className="section max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="h-display flex items-center gap-3 text-3xl">
              <Truck className="h-7 w-7 text-aqua-500" aria-hidden /> My route
            </h1>
            <p className="mt-1 text-sm text-muted">
              {driverRoute.driver} · {driverRoute.vehicle} · {driverRoute.shift}
            </p>
          </div>
          <p className="chip !border-amber-400/40 !bg-amber-400/10 text-amber-600 dark:text-amber-400">
            Demo — GPS & routing live in the driver app
          </p>
        </div>

        {/* Shift progress */}
        <div className="card p-6">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Today&apos;s stops</span>
            <span>
              {driverRoute.completed} of {driverRoute.total} done
            </span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[rgb(var(--border))]">
            <div className="h-full rounded-full bg-cta-gradient transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted">Route optimized 12 min ago · next reoptimization on traffic change</p>
        </div>

        {/* Stops */}
        <ol className="mt-6 space-y-4">
          {driverRoute.stops.map((stop) => (
            <li
              key={stop.id}
              className={cn(
                "card p-6",
                stop.status === "next" && "border-aqua-500/60 shadow-glow"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                      stop.type === "pickup" ? "bg-violet-500/10 text-violet-500" : "bg-aqua-500/10 text-aqua-500"
                    )}
                  >
                    {stop.type === "pickup" ? <Package className="h-5 w-5" aria-hidden /> : <Truck className="h-5 w-5" aria-hidden />}
                  </span>
                  <div>
                    <p className="font-bold">
                      {stop.customer}
                      {stop.status === "next" && (
                        <span className="chip ml-2 !border-aqua-500/40 !bg-aqua-500/10 text-aqua-600 dark:text-aqua-400">
                          Next stop
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" aria-hidden /> {stop.address}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {stop.type === "pickup" ? "Pickup" : "Delivery"} · {stop.window} · {stop.bags} bag{stop.bags > 1 ? "s" : ""} ·{" "}
                      <span className="font-mono">{stop.orderId}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary !px-3.5 !py-2 text-xs" title="Navigate">
                    <Navigation className="h-4 w-4" aria-hidden />
                  </button>
                  <button type="button" className="btn-secondary !px-3.5 !py-2 text-xs" title="Photo proof">
                    <Camera className="h-4 w-4" aria-hidden />
                  </button>
                  <button type="button" className="btn-secondary !px-3.5 !py-2 text-xs" title="Signature">
                    <PenLine className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
              {stop.status === "next" && (
                <button type="button" className="btn-primary mt-5 w-full">
                  Mark {stop.type === "pickup" ? "picked up" : "delivered"} — customer is notified instantly
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
