import { Apple, Play, Bell, QrCode, MapPin } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function AppDownload() {
  return (
    <section className="section py-24 md:py-32" aria-labelledby="app-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-5xl bg-ink-900 p-10 text-white md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_85%_20%,rgba(34,211,238,.25),transparent_60%)]"
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-400">Lustra App</p>
              <h2 id="app-heading" className="h-display mt-3 text-3xl sm:text-4xl md:text-5xl">
                Your laundry room,
                <br />
                in your pocket.
              </h2>
              <p className="mt-4 max-w-md text-ink-200/80">
                Reserve machines, scan to start a wash, track your driver, and get a nudge the
                second your dryer finishes. iOS and Android.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#" className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-ink-900 transition-transform hover:-translate-y-0.5">
                  <Apple className="h-6 w-6" aria-hidden />
                  <span className="text-left text-xs leading-tight">
                    Download on the
                    <span className="block text-base font-bold">App Store</span>
                  </span>
                </a>
                <a href="#" className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur transition-transform hover:-translate-y-0.5">
                  <Play className="h-6 w-6" aria-hidden />
                  <span className="text-left text-xs leading-tight">
                    Get it on
                    <span className="block text-base font-bold">Google Play</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
              {[
                { icon: QrCode, title: "Scan & wash", body: "QR activation — no coins, no cards." },
                { icon: Bell, title: "Cycle alerts", body: "Pinged the moment your dryer stops." },
                { icon: MapPin, title: "Driver tracking", body: "Watch your delivery move on the map." },
                { icon: Play, title: "One-tap rebook", body: "Repeat last order in a single tap." },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="glass rounded-3xl !border-white/10 !bg-white/[0.06] p-6">
                    <Icon className="h-6 w-6 text-aqua-400" aria-hidden />
                    <p className="mt-3 font-display font-semibold">{f.title}</p>
                    <p className="mt-1 text-sm text-ink-200/70">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
