import { MapPin, Phone, Clock, Car, Sparkles } from "lucide-react";
import { locations } from "@/lib/data";
import { MachineFloor } from "@/components/locations/machine-floor";
import { Reveal } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Locations — Find a Lustra Laundromat Near You",
  description:
    "Three Lustra smart laundromats in Lagos: Lekki, Victoria Island (open 24h), and Yaba. Live machine availability, free Wi-Fi, 24/7 power backup, and parking.",
  path: "/locations",
});

function locationJsonLd() {
  return locations.map((l) => ({
    "@context": "https://schema.org",
    "@type": "LaundryOrDryCleaner",
    name: l.name,
    telephone: l.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    parentOrganization: { "@id": `${site.url}/#business` },
    amenityFeature: l.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a })),
  }));
}

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]), ...locationJsonLd()]} />

      <div className="bg-hero-gradient pb-8 pt-28 md:pt-40">
        <div className="section text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua-600 dark:text-aqua-400">Locations</p>
          <h1 className="h-display mx-auto mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Three floors of <span className="text-gradient">calm, clean machines</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted sm:text-lg">
            Every machine's live status, straight from the floor. Reserve ahead and it's waiting
            when you arrive.
          </p>
        </div>
      </div>

      <div className="section space-y-12 py-16">
        {locations.map((loc, i) => (
          <Reveal key={loc.id} delay={i * 0.05}>
            <article id={loc.id} className="card scroll-mt-24 overflow-hidden">
              <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_1.5fr]">
                <div>
                  <h2 className="h-display text-2xl md:text-3xl">{loc.name}</h2>
                  <ul className="mt-6 space-y-3.5 text-sm">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" aria-hidden />
                      <span>
                        {loc.address}, {loc.city}
                        <a
                          className="ml-2 font-semibold text-aqua-600 hover:underline dark:text-aqua-400"
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Directions →
                        </a>
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-aqua-500" aria-hidden />
                      {loc.hours}
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-aqua-500" aria-hidden />
                      <a href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`} className="hover:text-aqua-500">{loc.phone}</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Car className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" aria-hidden />
                      {loc.parking}
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-aqua-500" aria-hidden />
                      <span className="flex flex-wrap gap-1.5">
                        {loc.amenities.map((a) => (
                          <span key={a} className="chip">{a}</span>
                        ))}
                      </span>
                    </li>
                  </ul>

                  {/* Map embed placeholder — swap for Google Maps Embed API key in production */}
                  <div className="mt-6 flex h-40 items-center justify-center rounded-3xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-center text-xs text-muted">
                    <p>
                      Interactive map
                      <br />
                      <span className="text-[10px]">(Google Maps Embed — set NEXT_PUBLIC_MAPS_KEY)</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted">
                    Live floor
                    <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-500" aria-hidden />
                  </h3>
                  <MachineFloor locationId={loc.id} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <CtaBanner
        title="Reserve before you arrive."
        body="Machines hold for 15 minutes past your slot. Walk in, scan, wash — no waiting, no coins."
        primaryHref="/book"
        primaryLabel="Reserve a Machine"
        secondaryHref="/services/self-service"
        secondaryLabel="How It Works"
      />
    </>
  );
}
