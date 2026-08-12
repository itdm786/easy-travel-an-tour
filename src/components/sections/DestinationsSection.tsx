"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, MapPin, ArrowRight } from "lucide-react";

type DestinationLike = {
  id: string | number;
  name: string;
  country: string;
  image: string;
  packages: number | null;
  description: string;
  rating: string | number | null;
};

function destinationSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function DestinationsSection() {
  const [destinations, setDestinations] = useState<DestinationLike[]>(DESTINATIONS);

  useEffect(() => {
    fetch("/api/destinations")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.destinations) && result.destinations.length > 0) {
          setDestinations(result.destinations);
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          subtitle="Explore The World"
          title="Popular Destinations"
          description="Discover breathtaking destinations handpicked by our travel experts for unforgettable experiences."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 8).map((dest, index) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link href={`/destinations/${destinationSlug(dest.name)}`} className="group relative block h-[380px] overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${dest.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm text-white/70">{dest.country}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{dest.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm text-white/80">{dest.rating}</span>
                    </div>
                    <span className="text-sm text-white/60">{dest.packages || 0} packages</span>
                  </div>
                </div>
                <div className="absolute right-4 bottom-20 flex h-10 w-10 translate-y-4 items-center justify-center rounded-full bg-accent text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/destinations" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent">
            View All Destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
