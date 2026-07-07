import { howItWorks } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function HowItWorks() {
  return (
    <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 py-24 md:py-32" aria-labelledby="how-heading">
      <div className="section">
        <SectionHeading
          eyebrow="How it works"
          title="From hamper to closet in four steps"
          body="Designed to disappear into your week. Book once, and laundry simply stops being your job."
        />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step) => (
            <StaggerItem key={step.step}>
              <div className="card relative h-full overflow-hidden p-7">
                <span
                  aria-hidden
                  className="absolute -right-3 -top-6 font-display text-[7rem] font-bold leading-none text-aqua-500/10"
                >
                  {step.step}
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
                  Step {step.step}
                </p>
                <h3 className="h-display mt-3 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
