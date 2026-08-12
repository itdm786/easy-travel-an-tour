"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TOUR_PACKAGES, UMRAH_PACKAGES } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { Star, Clock, MapPin, ArrowRight, Heart, Search } from "lucide-react";

type PackageLike = {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  featured?: boolean | null;
  rating: string | number | null;
  reviews?: number | null;
  description: string;
};

const fallbackPackages: PackageLike[] = [...TOUR_PACKAGES, ...UMRAH_PACKAGES];

export function HolidayPackagesContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [packages, setPackages] = useState<PackageLike[]>(fallbackPackages);

  useEffect(() => {
    fetch("/api/packages")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.packages) && result.packages.length > 0) {
          setPackages(result.packages);
        }
      })
      .catch(() => undefined);
  }, []);

  const filtered = packages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" ||
      p.category === category.toLowerCase() ||
      (category === "Umrah" && p.category === "umrah");
    return matchesSearch && matchesCategory;
  });

  const toggleWishlist = (id: string | number) => {
    const key = String(id);
    setWishlisted((p) => (p.includes(key) ? p.filter((x) => x !== key) : [...p, key]));
  };

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Curated Experiences</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Holiday Packages</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">Discover our collection of premium travel packages designed for unforgettable experiences.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-light" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages..." className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-accent sm:w-80" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "International", "Domestic", "Umrah", "Hajj", "Honeymoon", "Group"].map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={cn("rounded-full px-5 py-2 text-sm font-medium transition-all", category === c ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-text/60 hover:bg-gray-200")}>{c}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg, i) => {
              const wishlistKey = String(pkg.id);
              return (
                <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} layout>
                  <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${pkg.image})` }} />
                      {pkg.originalPrice && (
                        <span className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                        </span>
                      )}
                      <button onClick={() => toggleWishlist(pkg.id)} className={cn("absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all", wishlisted.includes(wishlistKey) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30")}>
                        <Heart className={cn("h-4 w-4", wishlisted.includes(wishlistKey) && "fill-white")} />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        <span className="text-xs text-text-light">{pkg.destination}</span>
                        <span className="text-text-light/30">•</span>
                        <Clock className="h-3.5 w-3.5 text-text-light" />
                        <span className="text-xs text-text-light">{pkg.duration}</span>
                      </div>
                      <Link href={`/holiday-packages/${pkg.slug}`}>
                        <h3 className="font-display text-xl font-bold text-text transition-colors group-hover:text-accent">{pkg.title}</h3>
                      </Link>
                      <p className="mt-2 line-clamp-2 text-sm text-text-light">{pkg.description}</p>
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="font-display text-2xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                            <span className="text-xs text-text-light">{pkg.rating} ({pkg.reviews || 0})</span>
                          </div>
                        </div>
                        <Link href={`/holiday-packages/${pkg.slug}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-accent hover:text-primary">
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
