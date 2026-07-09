import { Gift, Copy, Users, Zap } from "lucide-react";
import { demoUser } from "@/lib/demo-account";
import { formatCurrency } from "@/lib/utils";

const tiers = [
  { name: "Fresh", threshold: "0 pts", perks: "1 pt / ₦100 · birthday wash free" },
  { name: "Silver", threshold: "1,000 pts", perks: "1.25 pts / ₦100 · free express upgrade monthly" },
  { name: "Platinum", threshold: "2,500 pts", perks: "1.5 pts / ₦100 · priority slots · surprise perks" },
];

const redemptions = [
  { label: "₦500 order credit", cost: "500 pts" },
  { label: "Free 5 kg wash & fold", cost: "1,800 pts" },
  { label: "Express upgrade", cost: "700 pts" },
  { label: "Dry cleaning: 2 garments", cost: "1,400 pts" },
];

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <div className="card bg-cta-gradient p-8 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Loyalty balance</p>
        <p className="mt-2 font-display text-5xl font-bold">{demoUser.points.toLocaleString()} pts</p>
        <p className="mt-1 text-sm text-white/80">≈ {formatCurrency(demoUser.points)} in credit · Silver tier, 50 pts from Platinum</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-[98%] rounded-full bg-white" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-7">
          <h2 className="h-display flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-aqua-500" aria-hidden /> Redeem points
          </h2>
          <ul className="mt-5 space-y-3">
            {redemptions.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-4 rounded-2xl border border-[rgb(var(--border))] p-4 text-sm">
                <span className="font-medium">{r.label}</span>
                <button type="button" className="btn-secondary !px-4 !py-1.5 text-xs">{r.cost}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="card p-7">
            <h2 className="h-display flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-aqua-500" aria-hidden /> Refer a friend
            </h2>
            <p className="mt-2 text-sm text-muted">
              They get 25% off their first order; you get 500 points when it delivers.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <code className="input flex-1 !py-2.5 font-mono text-sm font-bold tracking-wider">
                {demoUser.referralCode}
              </code>
              <button type="button" className="btn-primary !px-4 !py-2.5" aria-label="Copy referral code">
                <Copy className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <div className="card p-7">
            <h2 className="h-display flex items-center gap-2 text-lg">
              <Gift className="h-5 w-5 text-aqua-500" aria-hidden /> Tiers
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {tiers.map((t) => (
                <li key={t.name} className="rounded-2xl border border-[rgb(var(--border))] p-4">
                  <p className="font-bold">{t.name} <span className="ml-1 text-xs font-normal text-muted">{t.threshold}</span></p>
                  <p className="mt-0.5 text-xs text-muted">{t.perks}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
