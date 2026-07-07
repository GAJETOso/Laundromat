"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "How much is wash & fold?",
  "Book a pickup for tomorrow",
  "Which washers are free right now?",
  "Do you clean wedding dresses?",
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Lumi — your Lustra laundry assistant. I can estimate prices, check machine availability, help you book a pickup, or answer fabric-care questions. What can I do for you?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I hit a connection issue — please try again, or reach the team on WhatsApp for an instant answer.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Lumi, the AI laundry assistant"
        className={cn(
          "fixed bottom-36 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-white shadow-soft-lg transition-transform hover:scale-110 dark:bg-white dark:text-ink-900 sm:bottom-[8.5rem] sm:right-6",
          open && "pointer-events-none opacity-0"
        )}
      >
        <Sparkles className="h-6 w-6" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-label="Lumi AI assistant chat"
            className="fixed bottom-0 right-0 z-50 flex h-[36rem] max-h-[85dvh] w-full flex-col overflow-hidden bg-[rgb(var(--card))] shadow-soft-lg sm:bottom-6 sm:right-6 sm:w-[24rem] sm:rounded-4xl sm:border sm:border-[rgb(var(--border))]"
          >
            <div className="flex items-center justify-between bg-cta-gradient px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold">Lumi</p>
                  <p className="text-xs text-white/80">AI laundry assistant · online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-3xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto rounded-br-lg bg-cta-gradient text-white"
                      : "rounded-bl-lg bg-[rgb(var(--bg))]"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="flex w-16 items-center justify-center gap-1 rounded-3xl rounded-bl-lg bg-[rgb(var(--bg))] px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-[rgb(var(--muted))]"
                      style={{ animationDelay: `${d * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="chip transition-colors hover:border-aqua-500/60 hover:text-aqua-600 dark:hover:text-aqua-400"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-[rgb(var(--border))] p-3"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Message Lumi
              </label>
              <input
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, booking, fabric care…"
                className="input flex-1 !rounded-full"
              />
              <button type="submit" className="btn-primary !px-4" aria-label="Send message" disabled={busy}>
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
