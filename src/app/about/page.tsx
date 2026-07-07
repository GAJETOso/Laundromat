import { Leaf, Cpu, HeartHandshake, Award, Users, Recycle } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About — The Team Reinventing Laundry",
  description:
    "Lustra's mission: give people their time back, one load at a time. Meet the team, our technology, sustainability commitments, and the story since 2019.",
  path: "/about",
});

const values = [
  { icon: HeartHandshake, title: "Care is the product", body: "Machines wash clothes; people care for them. Every process ends with a human quality check and a name on the order." },
  { icon: Cpu, title: "Technology that disappears", body: "The best tech is the tap you didn't have to make. We automate the friction and keep the humanity." },
  { icon: Leaf, title: "Clean shouldn't cost the planet", body: "Water reclamation, biodegradable chemistry, and zero-perc cleaning as the default, not the upsell." },
  { icon: Award, title: "Standards over shortcuts", body: "Retail-standard folds, 12-point quality checks, and SLAs we publish instead of hiding." },
];

const team = [
  { name: "Maya Lindqvist", role: "Co-founder & CEO", bio: "Former hospitality operator who got tired of laundry being the worst vendor relationship in the building." },
  { name: "Ade Balogun", role: "Co-founder & CTO", bio: "Built logistics platforms before pointing route optimization at laundry vans and IoT at washing machines." },
  { name: "Dr. Lena Whitfield", role: "Head of Fabric Science", bio: "Textile chemistry PhD. Believes every stain has a story and most of them are solvable." },
  { name: "Marcus Hale", role: "VP Commercial", bio: "Fifteen years in hotel operations, now on the other side of the linen program he always wanted." },
  { name: "Sofia Marchetti", role: "Couture Studio Lead", bio: "Trained in garment conservation in Milan. Wedding dresses arrive nervous and leave photographed." },
  { name: "Jordan Park", role: "Head of Experience", bio: "Designs the floors, the app, and the moment your dryer finishes and your phone knows first." },
];

const milestones = [
  { year: "2019", event: "First location opens in Downtown Austin — 24 machines and a stubborn belief that laundromats could be beautiful." },
  { year: "2020", event: "Pickup & delivery launches with two vans and a route algorithm written over a weekend." },
  { year: "2022", event: "Commercial division signs its first hotel. Midtown 24-hour flagship opens with 60 machines." },
  { year: "2023", event: "QR machine activation and live availability ship. Coin machines retired, unmourned." },
  { year: "2024", event: "Couture studio opens. University District location brings student pricing to campus." },
  { year: "2025", event: "WhatsApp & Telegram assistants launch. 1 millionth garment cleaned." },
  { year: "2026", event: "180+ commercial clients, 35,000 customers, and a platform ready for new cities." },
];

const sustainability = [
  { icon: Recycle, stat: "42%", label: "less water than home washing, via high-efficiency machines and reclamation" },
  { icon: Leaf, stat: "100%", label: "biodegradable default detergents; zero-perc dry cleaning fleet" },
  { icon: Users, stat: "3,100+", label: "garments donated through our community repair & rehome program" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <div className="bg-hero-gradient pb-20 pt-28 md:pt-40">
        <div className="section max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">About Lustra</p>
          <h1 className="h-display mt-3 text-4xl sm:text-5xl md:text-6xl">
            We give people their <span className="text-gradient">time back</span>, one load at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            The average household spends 8 hours a month on laundry — folding, waiting, ferrying,
            re-washing the load that sat too long. Since 2019 we&apos;ve been building the company
            that takes that entire category of chore off your plate, with technology where it helps
            and craftspeople where it matters.
          </p>
        </div>
      </div>

      <section className="section py-24">
        <SectionHeading eyebrow="Values" title="What we refuse to compromise" />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <StaggerItem key={v.title}>
                <div className="card h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="h-display mt-4 text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 py-24">
        <div className="section">
          <SectionHeading eyebrow="History" title="Seven years, one obsession" />
          <ol className="relative mx-auto max-w-2xl space-y-8 border-l-2 border-aqua-500/30 pl-8">
            {milestones.map((m) => (
              <Reveal key={m.year}>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-aqua-500 bg-[rgb(var(--bg))]" aria-hidden />
                  <p className="font-display text-lg font-bold text-aqua-600 dark:text-aqua-400">{m.year}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{m.event}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section py-24">
        <SectionHeading
          eyebrow="Team"
          title="The people behind the fold"
          body="Operators, engineers, and fabric scientists who take laundry more seriously than anyone reasonably should."
        />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person) => (
            <StaggerItem key={person.name}>
              <div className="card h-full p-7">
                <div
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cta-gradient font-display text-xl font-bold text-white shadow-glow"
                >
                  {person.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="h-display mt-4 text-lg">{person.name}</h3>
                <p className="text-sm font-semibold text-aqua-600 dark:text-aqua-400">{person.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{person.bio}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-[rgb(var(--border))] bg-ink-900 py-24 text-white">
        <div className="section">
          <SectionHeading
            eyebrow="Sustainability"
            title="Clean clothes, cleaner conscience"
            body="Commercial-scale laundry is dramatically more efficient than home washing — and we push it further."
            className="[&_p]:text-ink-200/70"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {sustainability.map((s) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label}>
                  <div className="glass h-full rounded-4xl !border-white/10 !bg-white/[0.05] p-8 text-center">
                    <Icon className="mx-auto h-8 w-8 text-aqua-400" aria-hidden />
                    <p className="mt-4 font-display text-4xl font-bold">{s.stat}</p>
                    <p className="mt-2 text-sm text-ink-200/70">{s.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CtaBanner
          title="Come see for yourself."
          body="Visit a location, meet the team, or just book a pickup and feel the difference at your door."
        />
      </div>
    </>
  );
}
