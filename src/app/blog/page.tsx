import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { posts } from "@/lib/data";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog — Fabric Care, Laundry Science & Business Laundry",
  description:
    "Expert guides from Lustra's fabric scientists and operators: stain first aid, wash schedules, dry cleaning explained, and linen economics for businesses.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />

      <div className="bg-hero-gradient pb-12 pt-28 md:pt-40">
        <div className="section">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">The Lustra Journal</p>
          <h1 className="h-display mt-3 max-w-2xl text-4xl sm:text-5xl">
            Laundry, understood.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Written by the fabric scientists, operators, and engineers who do this all day —
            no filler, no fluff (except the towels).
          </p>
        </div>
      </div>

      <div className="section pb-24">
        {/* Featured */}
        <Link
          href={`/blog/${featured.slug}`}
          className="card group mb-10 grid gap-8 overflow-hidden p-8 transition-all hover:-translate-y-1 hover:shadow-soft-lg md:grid-cols-2 md:p-12"
        >
          <div className="flex min-h-48 items-center justify-center rounded-3xl bg-cta-gradient p-8 text-white">
            <span className="font-display text-2xl font-bold leading-snug">{featured.category}</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-3 text-xs font-semibold text-muted">
              <span className="chip !border-aqua-500/30 !bg-aqua-500/10">{featured.category}</span>
              <Clock className="h-3.5 w-3.5" aria-hidden /> {featured.readMinutes} min read
            </p>
            <h2 className="h-display mt-4 text-2xl transition-colors group-hover:text-aqua-600 dark:group-hover:text-aqua-400 md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-aqua-600 dark:text-aqua-400">
              Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </p>
          </div>
        </Link>

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card group flex h-full flex-col p-7 transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <p className="flex items-center gap-3 text-xs font-semibold text-muted">
                  <span className="chip !border-aqua-500/30 !bg-aqua-500/10">{post.category}</span>
                  <Clock className="h-3.5 w-3.5" aria-hidden /> {post.readMinutes} min
                </p>
                <h2 className="h-display mt-4 flex-1 text-xl transition-colors group-hover:text-aqua-600 dark:group-hover:text-aqua-400">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <p className="mt-5 text-xs text-muted">
                  {post.author.split(",")[0]} ·{" "}
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
