import { stats } from "@/lib/data";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

export function Stats() {
  return (
    <section className="section -mt-4 md:-mt-10" aria-label="Company statistics">
      <Stagger className="glass grid grid-cols-2 gap-6 rounded-4xl p-8 shadow-card md:grid-cols-4 md:p-10">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="text-center">
            <p className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
