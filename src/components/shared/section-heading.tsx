import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="h-display text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{body}</p> : null}
    </Reveal>
  );
}
