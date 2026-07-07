"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
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
        <h3 className="h-display mt-5 text-2xl">Message received</h3>
        <p className="mt-3 text-sm text-muted">We reply within one business hour, 7 AM – 10 PM daily.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-8" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="label">Name</label>
          <input id="c-name" required className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Jordan Ellis" />
        </div>
        <div>
          <label htmlFor="c-email" className="label">Email</label>
          <input id="c-email" type="email" required className="input" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="label">Message</label>
        <textarea id="c-message" required rows={5} className="input resize-none" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="How can we help?" />
      </div>
      {error && <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">{error}</p>}
      <button type="submit" className="btn-primary !py-4" disabled={state === "loading"}>
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        Send message
      </button>
    </form>
  );
}
