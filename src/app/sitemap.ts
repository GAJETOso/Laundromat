import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/data";
import { serviceContent } from "@/lib/service-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1, changeFrequency: "weekly", lastModified: now },
    ...["/services", "/pricing", "/book", "/commercial", "/locations", "/about", "/blog", "/careers", "/contact", "/faq", "/track"].map(
      (path) => ({
        url: `${site.url}${path}`,
        priority: 0.8,
        changeFrequency: "weekly" as const,
        lastModified: now,
      })
    ),
    ...["/legal/privacy", "/legal/terms", "/legal/accessibility"].map((path) => ({
      url: `${site.url}${path}`,
      priority: 0.3,
      changeFrequency: "yearly" as const,
      lastModified: now,
    })),
  ];

  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(serviceContent).map((slug) => ({
    url: `${site.url}/services/${slug}`,
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
