import { ArrowRight, HeartPulse, GraduationCap, Coins, Clock } from "lucide-react";
import { jobs } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Careers — Join the Team Reinventing Laundry",
  description:
    "Open roles at Lustra: drivers, fabric care specialists, couture artisans, engineers, and account managers. Real benefits, real training, real career paths.",
  path: "/careers",
});

const benefits = [
  { icon: HeartPulse, title: "Full health coverage", body: "Medical, dental, and vision from day one — including part-time floor staff." },
  { icon: GraduationCap, title: "Craft training", body: "Paid apprenticeships from floor to fabric specialist to couture studio." },
  { icon: Coins, title: "Profit sharing", body: "Quarterly profit share for every employee after one year." },
  { icon: Clock, title: "Predictable schedules", body: "Shifts published three weeks out. Your time is yours to plan." },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />

      <div className="bg-hero-gradient pb-16 pt-28 md:pt-40">
        <div className="section max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">Careers</p>
          <h1 className="h-display mt-3 text-4xl sm:text-5xl md:text-6xl">
            Do the best work of your life. <span className="text-gradient">In a laundromat.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted sm:text-lg">
            Seriously. We pay well, train deeply, share profits, and run the calmest, most
            beautiful shops in the industry. 92% of our leads were promoted from within.
          </p>
        </div>
      </div>

      <section className="section py-16">
        <SectionHeading eyebrow="Benefits" title="How we take care of our people" />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={b.title}>
                <div className="card h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="h-display mt-4 text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted">{b.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="section pb-24">
        <SectionHeading eyebrow="Open roles" title="Current openings" />
        <Stagger className="mx-auto max-w-3xl space-y-4">
          {jobs.map((job) => (
            <StaggerItem key={job.id}>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                className="card group flex items-center gap-6 p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft-lg"
              >
                <div className="flex-1">
                  <h3 className="h-display text-lg transition-colors group-hover:text-aqua-600 dark:group-hover:text-aqua-400">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{job.blurb}</p>
                  <p className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="chip">{job.type}</span>
                    <span className="chip">{job.location}</span>
                    <span className="chip !border-emerald-500/30 !bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{job.salary}</span>
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-aqua-500" aria-hidden />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-10 text-center text-sm text-muted">
          Don&apos;t see your role?{" "}
          <a className="font-semibold text-aqua-600 hover:underline dark:text-aqua-400" href={whatsappLink("Hi! I'd like to ask about careers at Lustra.")}>
            Message us anyway
          </a>
          {" "}— we hire great people first and find the seat second.
        </p>
      </section>
    </>
  );
}
