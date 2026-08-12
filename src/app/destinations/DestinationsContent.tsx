"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data";
import { Star, MapPin } from "lucide-react";

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

export function DestinationsContent() {
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
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Explore The World</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Destinations</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">Discover breathtaking destinations handpicked by our experts.</p>
        </section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <Link key={dest.id} href={`/destinations/${destinationSlug(dest.name)}`} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="h-56 overflow-hidden">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${dest.image})` }} />
              </div>
              <div className="p-6">
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-xs text-text-light">{dest.country}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-text">{dest.name}</h3>
                <p className="mt-2 text-sm text-text-light">{dest.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{dest.rating}</span>
                  </div>
                  <span className="text-sm text-text-light">{dest.packages || 0} packages</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
