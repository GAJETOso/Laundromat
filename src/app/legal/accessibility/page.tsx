import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description: "Lustra's commitment to WCAG 2.2 AA accessibility across web, app, and physical locations.",
  path: "/legal/accessibility",
});

export default function AccessibilityPage() {
  return (
    <div className="bg-hero-gradient pb-24 pt-28 md:pt-40">
      <div className="section max-w-3xl">
        <h1 className="h-display text-4xl">Accessibility Statement</h1>
        <p className="mt-3 text-sm text-muted">Last updated: July 2026 · {site.legalName}</p>
        <div className="mt-10 space-y-8 leading-relaxed text-muted">
          <p>
            Lustra is committed to an experience that works for everyone. This website targets{" "}
            <strong className="text-[rgb(var(--fg))]">WCAG 2.2 Level AA</strong>: semantic HTML and
            landmarks, full keyboard operability with visible focus states, a skip-to-content link,
            ARIA where native semantics fall short, form labels and error announcements, color
            contrast at or above 4.5:1, and full support for <code>prefers-reduced-motion</code>.
          </p>
          <p>
            Our physical locations offer step-free entrances, front-loading accessible machines at
            reachable heights, and staff assistance during all staffed hours. The mobile apps follow
            the same standard with VoiceOver and TalkBack testing in every release.
          </p>
          <p>
            Found something we missed? Tell us at{" "}
            <a className="font-semibold text-aqua-600 underline dark:text-aqua-400" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>{" "}
            — accessibility reports go to the front of the engineering queue, and we aim to resolve
            them within 10 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
