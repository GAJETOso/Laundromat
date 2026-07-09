"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Loader2,
  MapPin,
  CalendarDays,
  SlidersHorizontal,
  Sparkles,
  Truck,
  WashingMachine,
  Building2,
  PartyPopper,
} from "lucide-react";
import { washFoldPricing } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const serviceOptions = [
  { id: "Wash & Fold Pickup", icon: Truck, blurb: "We collect, clean & deliver — ₦1,200/kg", badge: "Most popular" },
  { id: "Dry Cleaning Pickup", icon: Sparkles, blurb: "Suits, agbada, delicates — from ₦2,500/garment" },
  { id: "Self-Service Reservation", icon: WashingMachine, blurb: "Reserve a washer or dryer at any location" },
  { id: "Commercial Consultation", icon: Building2, blurb: "Volume laundry for your business" },
];

const windows = ["7–9 AM", "9–11 AM", "11 AM–1 PM", "1–3 PM", "3–5 PM", "5–7 PM", "7–9 PM"];
const recurringOptions = ["One-time", "Weekly", "Every 2 weeks", "Monthly"];

const preferenceOptions = [
  "Hypoallergenic detergent",
  "Eco-friendly detergent",
  "Premium fabric softener",
  "Hang dry delicates",
  "Stain treatment",
  "Fold only (no hangers)",
  "Scent-free",
];

const paymentMethods = ["Paystack (Card)", "Flutterwave", "Bank Transfer", "USSD", "Lustra Wallet"];

const steps = [
  { label: "Service", icon: Sparkles },
  { label: "Address", icon: MapPin },
  { label: "Schedule", icon: CalendarDays },
  { label: "Preferences", icon: SlidersHorizontal },
  { label: "Payment", icon: CreditCard },
];

type Confirmation = { id: string; date: string; window: string };

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const [form, setForm] = useState({
    service: serviceOptions[0].id,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Lagos",
    zip: "",
    date: "",
    window: windows[1],
    recurring: recurringOptions[0],
    weightKg: 8,
    preferences: [] as string[],
    instructions: "",
    payment: paymentMethods[0],
    promo: "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const estimate = useMemo(() => {
    if (!form.service.includes("Wash & Fold")) return null;
    const kg = Math.max(form.weightKg, washFoldPricing.minimumKg);
    let total = kg * washFoldPricing.perKg;
    for (const addon of washFoldPricing.addOns) {
      if (form.preferences.includes(addon.label)) total += addon.price;
    }
    if (form.promo.trim().toUpperCase() === "FRESH20") total *= 0.8;
    return total;
  }, [form.service, form.weightKg, form.preferences, form.promo]);

  function validStep(): string {
    switch (step) {
      case 1:
        if (!form.name.trim()) return "Please tell us your name.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
        if (form.phone.trim().length < 7) return "Please enter a valid phone number.";
        if (!form.address.trim()) return "Please enter your pickup address.";
        return "";
      case 2:
        if (!form.date) return "Please choose a pickup date.";
        return "";
      default:
        return "";
    }
  }

  function next() {
    const problem = validStep();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: form.service,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: `${form.address}, ${form.city} ${form.zip}`.trim(),
          date: form.date,
          window: form.window,
          recurring: form.recurring,
          preferences: form.preferences,
          instructions: form.instructions,
          estimatedTotal: estimate ?? 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setConfirmation({ id: data.booking.id, date: form.date, window: form.window });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card mx-auto max-w-xl p-10 text-center"
      >
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
          <PartyPopper className="h-10 w-10 text-emerald-500" aria-hidden />
        </span>
        <h2 className="h-display mt-6 text-3xl">You&apos;re booked!</h2>
        <p className="mt-3 text-muted">
          Pickup confirmed for <strong className="text-[rgb(var(--fg))]">{confirmation.date}</strong>,{" "}
          <strong className="text-[rgb(var(--fg))]">{confirmation.window}</strong>. A confirmation is on
          its way by email — and WhatsApp or Telegram if you&apos;ve connected them.
        </p>
        <div className="mt-6 rounded-2xl bg-[rgb(var(--bg))] p-4">
          <p className="text-xs uppercase tracking-widest text-muted">Order ID</p>
          <p className="font-display text-2xl font-bold tracking-wide text-gradient">{confirmation.id}</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/track?id=${confirmation.id}`} className="btn-primary">
            Track this order
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Go to dashboard
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <ol className="mb-10 flex items-center justify-between gap-1" aria-label="Booking progress">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.label} className="flex flex-1 flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300",
                  done && "border-aqua-500 bg-aqua-500 text-white",
                  active && "border-aqua-500 text-aqua-500 shadow-glow",
                  !done && !active && "border-[rgb(var(--border))] text-muted"
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check className="h-5 w-5" aria-hidden /> : <Icon className="h-5 w-5" aria-hidden />}
              </span>
              <span className={cn("hidden text-xs font-semibold sm:block", active ? "text-aqua-600 dark:text-aqua-400" : "text-muted")}>
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="card overflow-hidden p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="h-display text-2xl">What can we take off your hands?</legend>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {serviceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const selected = form.service === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => set("service", opt.id)}
                        aria-pressed={selected}
                        className={cn(
                          "relative rounded-3xl border-2 p-6 text-left transition-all duration-200 hover:-translate-y-0.5",
                          selected
                            ? "border-aqua-500 bg-aqua-500/5 shadow-glow"
                            : "border-[rgb(var(--border))] hover:border-aqua-500/40"
                        )}
                      >
                        {opt.badge && (
                          <span className="absolute -top-2.5 right-4 rounded-full bg-cta-gradient px-3 py-0.5 text-[10px] font-bold text-white">
                            {opt.badge}
                          </span>
                        )}
                        <Icon className={cn("h-7 w-7", selected ? "text-aqua-500" : "text-muted")} aria-hidden />
                        <p className="mt-3 font-display font-semibold">{opt.id}</p>
                        <p className="mt-1 text-xs text-muted">{opt.blurb}</p>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="grid gap-4">
                <legend className="h-display mb-2 text-2xl">Where should we come?</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-name" className="label">Full name</label>
                    <input id="bk-name" className="input" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jordan Ellis" />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="label">Phone</label>
                    <input id="bk-phone" className="input" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234 800 000 0000" />
                  </div>
                </div>
                <div>
                  <label htmlFor="bk-email" className="label">Email</label>
                  <input id="bk-email" className="input" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="bk-address" className="label">Street address</label>
                  <input id="bk-address" className="input" autoComplete="street-address" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="14 Admiralty Way, Lekki Phase 1" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-city" className="label">City</label>
                    <input id="bk-city" className="input" value={form.city} onChange={(e) => set("city", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="bk-zip" className="label">Area / Estate</label>
                    <input id="bk-zip" className="input" value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="Lekki Phase 1" />
                  </div>
                </div>
                <p className="text-xs text-muted">
                  📍 In production, this field autocompletes with Google Maps Places and validates the
                  service area automatically.
                </p>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="h-display text-2xl">When works for you?</legend>
                <div className="mt-6 grid gap-5">
                  <div>
                    <label htmlFor="bk-date" className="label">Pickup date</label>
                    <input id="bk-date" type="date" min={minDate} className="input" value={form.date} onChange={(e) => set("date", e.target.value)} />
                  </div>
                  <div>
                    <span className="label">Pickup window</span>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Pickup window">
                      {windows.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => set("window", w)}
                          aria-pressed={form.window === w}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                            form.window === w
                              ? "border-aqua-500 bg-aqua-500 text-white"
                              : "border-[rgb(var(--border))] hover:border-aqua-500/50"
                          )}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="label">Repeat this pickup?</span>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Recurring schedule">
                      {recurringOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => set("recurring", r)}
                          aria-pressed={form.recurring === r}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                            form.recurring === r
                              ? "border-aqua-500 bg-aqua-500 text-white"
                              : "border-[rgb(var(--border))] hover:border-aqua-500/50"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    {form.recurring !== "One-time" && (
                      <p className="mt-2 text-xs font-medium text-emerald-500">
                        ✓ Recurring orders save 10% automatically.
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <legend className="h-display text-2xl">How do you like it done?</legend>
                {form.service.includes("Wash & Fold") && (
                  <div className="mt-6">
                    <label htmlFor="bk-weight" className="label">
                      Estimated weight: <strong>{form.weightKg} kg</strong>
                      <span className="ml-2 font-normal normal-case text-muted">(a full laundry basket ≈ 5–7 kg)</span>
                    </label>
                    <input
                      id="bk-weight"
                      type="range"
                      min={washFoldPricing.minimumKg}
                      max={40}
                      value={form.weightKg}
                      onChange={(e) => set("weightKg", Number(e.target.value))}
                      className="w-full accent-aqua-500"
                    />
                  </div>
                )}
                <div className="mt-6">
                  <span className="label">Preferences</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {preferenceOptions.map((p) => {
                      const checked = form.preferences.includes(p);
                      const addon = washFoldPricing.addOns.find((a) => a.label === p);
                      return (
                        <label
                          key={p}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-sm transition-colors",
                            checked ? "border-aqua-500 bg-aqua-500/5" : "border-[rgb(var(--border))] hover:border-aqua-500/40"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              set(
                                "preferences",
                                checked ? form.preferences.filter((x) => x !== p) : [...form.preferences, p]
                              )
                            }
                            className="h-4 w-4 accent-aqua-500"
                          />
                          <span className="flex-1">{p}</span>
                          {addon && <span className="text-xs font-semibold text-muted">+{formatCurrency(addon.price)}</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="bk-notes" className="label">Special instructions</label>
                  <textarea
                    id="bk-notes"
                    rows={3}
                    className="input resize-none"
                    placeholder="Gate code, doorman, 'the red silk blouse needs gentle care'…"
                    value={form.instructions}
                    onChange={(e) => set("instructions", e.target.value)}
                  />
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset>
                <legend className="h-display text-2xl">Review &amp; payment</legend>
                <dl className="mt-6 space-y-3 rounded-3xl bg-[rgb(var(--bg))] p-6 text-sm">
                  {[
                    ["Service", form.service],
                    ["Pickup", `${form.date || "—"}, ${form.window}`],
                    ["Frequency", form.recurring],
                    ["Address", `${form.address}, ${form.city} ${form.zip}`],
                    ["Preferences", form.preferences.length ? form.preferences.join(", ") : "Standard care"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6">
                      <dt className="shrink-0 font-semibold text-muted">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                  {estimate !== null && (
                    <div className="flex justify-between border-t border-[rgb(var(--border))] pt-3 text-base">
                      <dt className="font-bold">Estimated total</dt>
                      <dd className="font-display font-bold text-gradient">{formatCurrency(estimate)}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6">
                  <span className="label">Payment method</span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Payment method">
                    {paymentMethods.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => set("payment", p)}
                        aria-pressed={form.payment === p}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          form.payment === p
                            ? "border-aqua-500 bg-aqua-500 text-white"
                            : "border-[rgb(var(--border))] hover:border-aqua-500/50"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="bk-promo" className="label">Promo code</label>
                  <input
                    id="bk-promo"
                    className="input uppercase"
                    placeholder="FRESH20"
                    value={form.promo}
                    onChange={(e) => set("promo", e.target.value)}
                  />
                  {form.promo.trim().toUpperCase() === "FRESH20" && (
                    <p className="mt-1.5 text-xs font-semibold text-emerald-500">✓ 20% first-order discount applied</p>
                  )}
                </div>

                <p className="mt-5 text-xs text-muted">
                  🔒 You&apos;re charged after your laundry is weighed at the facility — never before.
                  Payments are processed by Paystack and Flutterwave; card details never touch our servers.
                </p>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p role="alert" className="mt-5 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            className={cn("btn-secondary", step === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary !px-8">
              Continue <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={submitting} className="btn-primary !px-8">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
              Confirm booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
