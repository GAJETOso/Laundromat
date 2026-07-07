import { MapPin, Bell, Shield, SlidersHorizontal } from "lucide-react";
import { demoUser } from "@/lib/demo-account";

export default function SettingsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="card p-7" aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="h-display text-lg">Profile</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {[
            ["Name", demoUser.name],
            ["Email", demoUser.email],
            ["Phone", demoUser.phone],
            ["Member since", demoUser.memberSince],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 rounded-2xl bg-[rgb(var(--bg))] px-4 py-3">
              <dt className="font-semibold text-muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card p-7" aria-labelledby="addresses-heading">
        <h2 id="addresses-heading" className="h-display flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-aqua-500" aria-hidden /> Saved addresses
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {demoUser.addresses.map((a) => (
            <li key={a.id} className="rounded-2xl border border-[rgb(var(--border))] p-4">
              <p className="font-bold">
                {a.label}
                {a.default && <span className="chip ml-2 !border-aqua-500/30 !bg-aqua-500/10 text-aqua-600 dark:text-aqua-400">Default</span>}
              </p>
              <p className="mt-1 text-muted">{a.line}</p>
            </li>
          ))}
        </ul>
        <button type="button" className="btn-secondary mt-4 w-full !py-2.5 text-sm">Add address</button>
      </section>

      <section className="card p-7" aria-labelledby="prefs-heading">
        <h2 id="prefs-heading" className="h-display flex items-center gap-2 text-lg">
          <SlidersHorizontal className="h-5 w-5 text-aqua-500" aria-hidden /> Laundry preferences
        </h2>
        <p className="mt-1 text-xs text-muted">Applied to every order automatically.</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {demoUser.preferences.map((p) => (
            <li key={p} className="chip !border-aqua-500/30 !bg-aqua-500/10">{p}</li>
          ))}
        </ul>
      </section>

      <section className="card p-7" aria-labelledby="notif-heading">
        <h2 id="notif-heading" className="h-display flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-aqua-500" aria-hidden /> Notifications
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            ["Order updates", "SMS + WhatsApp"],
            ["Driver arrival", "Push + SMS"],
            ["Promotions", "Email only"],
            ["Machine cycle finished", "Push + Telegram"],
          ].map(([k, v]) => (
            <li key={k} className="flex justify-between gap-4 rounded-2xl bg-[rgb(var(--bg))] px-4 py-3">
              <span className="font-semibold text-muted">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-7 lg:col-span-2" aria-labelledby="security-heading">
        <h2 id="security-heading" className="h-display flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-aqua-500" aria-hidden /> Security
        </h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
            <p className="font-bold">Two-factor auth</p>
            <p className="mt-1 text-xs text-emerald-500">✓ Enabled (authenticator app)</p>
          </div>
          <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
            <p className="font-bold">Password</p>
            <p className="mt-1 text-xs text-muted">Last changed 3 months ago</p>
          </div>
          <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
            <p className="font-bold">Active sessions</p>
            <p className="mt-1 text-xs text-muted">2 devices · manage</p>
          </div>
        </div>
      </section>
    </div>
  );
}
