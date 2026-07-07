import type { Metadata } from "next";
import { site } from "./site";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@lustralaundry",
    },
  };
}

/* JSON-LD builders (schema.org) */

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LaundryOrDryCleaner",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    slogan: site.tagline,
    description: site.description,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "06:00",
      closes: "23:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2384",
    },
    sameAs: Object.values(site.social),
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Self-Service Laundromat" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laundry Pickup and Delivery" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Laundry Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dry Cleaning" } },
    ],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: "Austin" },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
