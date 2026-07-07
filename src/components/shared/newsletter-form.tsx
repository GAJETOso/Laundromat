"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-400">
        <Check className="h-4 w-4" aria-hidden /> You&apos;re on the list — welcome to Lustra.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md gap-2" aria-label="Newsletter signup">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="input flex-1 !rounded-full !border-white/15 !bg-white/10 text-white placeholder:text-white/40"
      />
      <button type="submit" className="btn-primary !px-5" disabled={state === "loading"} aria-label="Subscribe">
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <ArrowRight className="h-4 w-4" aria-hidden />
        )}
      </button>
      {state === "error" && (
        <p role="alert" className="sr-only">
          Something went wrong, please try again.
        </p>
      )}
    </form>
  );
}
