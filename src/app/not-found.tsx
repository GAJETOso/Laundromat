import Link from "next/link";
import { WashingMachine } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-hero-gradient px-6 pt-24">
      <div className="text-center">
        <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-4xl bg-cta-gradient text-white shadow-glow">
          <WashingMachine className="h-12 w-12 animate-drum" aria-hidden />
        </span>
        <h1 className="h-display mt-8 text-5xl">404</h1>
        <p className="mt-3 text-lg font-semibold">This page went missing in the wash.</p>
        <p className="mt-2 text-sm text-muted">
          It happens to the best socks. Let&apos;s get you back to something clean.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/book" className="btn-secondary">Book a pickup</Link>
        </div>
      </div>
    </div>
  );
}
