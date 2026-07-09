"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

const industries = [
  "Hotel / Hospitality",
  "Restaurant / Food Service",
  "Healthcare / Clinic",
  "Airbnb / Short-stay",
  "Gym / Fitness",
  "Salon / Spa",
  "School / University",
  "Corporate Office",
  "Other",
];

const volumes = ["Under 50 kg / week", "50–150 kg / week", "150–500 kg / week", "500+ kg / week"];

export function QuoteForm() {
  const [form, setForm] = useState({
    company: "",
    industry: industries[0],
    contact: "",
    email: "",
    phone: "",
    volume: volumes[1],
    message: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      const res = await fetch("/api/commercial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="card p-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <Check className="h-8 w-8 text-emerald-500" aria-hidden />
        </span>
        <h3 className="h-display mt-5 text-2xl">Quote request received</h3>
        <p className="mt-3 text-sm text-muted">
          Your dedicated account manager will reply within one business day with a tailored
          proposal. Urgent? Call us at +1 (555) 012-3456 and mention your company name.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-8" aria-label="Commercial quote request">
      <h3 className="h-display text-2xl">Request a quote</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-company" className="label">Company</label>
          <input id="q-company" required className="input" value={form.company} onChange={set("company")} placeholder="The Meridian Hotel" />
        </div>
        <div>
          <label htmlFor="q-industry" className="label">Industry</label>
          <select id="q-industry" className="input" value={form.industry} onChange={set("industry")}>
            {industries.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-contact" className="label">Your name</label>
          <input id="q-contact" required className="input" value={form.contact} onChange={set("contact")} placeholder="Jordan Ellis" />
        </div>
        <div>
          <label htmlFor="q-phone" className="label">Phone</label>
          <input id="q-phone" type="tel" className="input" value={form.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      <div>
        <label htmlFor="q-email" className="label">Work email</label>
        <input id="q-email" type="email" required className="input" value={form.email} onChange={set("email")} placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="q-volume" className="label">Estimated weekly volume</label>
        <select id="q-volume" className="input" value={form.volume} onChange={set("volume")}>
          {volumes.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="q-message" className="label">Tell us about your operation</label>
        <textarea id="q-message" rows={4} className="input resize-none" value={form.message} onChange={set("message")} placeholder="Linen types, current setup, pain points, timelines…" />
      </div>
      {error && (
        <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">{error}</p>
      )}
      <button type="submit" className="btn-primary !py-4" disabled={state === "loading"}>
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        Get my quote
      </button>
      <p className="text-center text-xs text-muted">Response within one business day. No spam, no obligation.</p>
    </form>
  );
}
