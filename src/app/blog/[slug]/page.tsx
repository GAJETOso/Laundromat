import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { posts } from "@/lib/data";
import { buildMetadata, JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CtaBanner } from "@/components/shared/cta-banner";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const index = posts.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();
  const post = posts[index];
  const next = posts[(index + 1) % posts.length];

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="bg-hero-gradient pt-28 md:pt-40">
        <div className="section max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-aqua-600 hover:underline dark:text-aqua-400">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All articles
          </Link>
          <p className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
            <span className="chip !border-aqua-500/30 !bg-aqua-500/10">{post.category}</span>
            <Clock className="h-3.5 w-3.5" aria-hidden /> {post.readMinutes} min read ·{" "}
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 className="h-display mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-sm font-semibold text-muted">By {post.author}</p>

          <div className="mt-10 space-y-6 pb-16 text-base leading-relaxed sm:text-lg [&>p:first-of-type]:font-medium [&>p:first-of-type]:text-[rgb(var(--fg))]">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-muted">{paragraph}</p>
            ))}
          </div>

          <div className="mb-16 rounded-4xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">Up next</p>
            <Link href={`/blog/${next.slug}`} className="group mt-2 block">
              <p className="h-display text-xl transition-colors group-hover:text-aqua-600 dark:group-hover:text-aqua-400">
                {next.title}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-aqua-600 dark:text-aqua-400">
                Read it <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </p>
            </Link>
          </div>
        </div>
      </article>

      <CtaBanner
        title="Enough reading about laundry."
        body="Book a pickup and stop doing it entirely. First order 20% off with FRESH20."
      />
    </>
  );
}
