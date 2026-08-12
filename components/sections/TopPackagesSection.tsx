"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TOUR_PACKAGES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice, cn } from "@/lib/utils";
import { Star, Clock, MapPin, ArrowRight, Heart, Eye } from "lucide-react";
import { useEffect, useState } from "react";

const categories = ["All", "International", "Umrah", "Honeymoon", "Group"];

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

export function TopPackagesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [packages, setPackages] = useState<PackageLike[]>(TOUR_PACKAGES);

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

  const filteredPackages =
    activeCategory === "All"
      ? packages.slice(0, 6)
      : packages
          .filter((p) => {
            if (activeCategory === "International") return p.category === "international";
            if (activeCategory === "Umrah") return p.category === "umrah";
            if (activeCategory === "Honeymoon") return p.category === "honeymoon";
            if (activeCategory === "Group") return p.category === "group";
            return true;
          })
          .slice(0, 6);

  const toggleWishlist = (id: string | number) => {
    const key = String(id);
    setWishlisted((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
    );
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          subtitle="Curated Packages"
          title="Top Selling Packages"
          description="Hand-picked travel packages that offer the best value, comfort, and experiences — loved by thousands of travelers."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-gray-50 text-text/60 hover:bg-gray-100 hover:text-text"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg, index) => {
            const wishlistKey = String(pkg.id);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.05]">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${pkg.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {pkg.originalPrice ? (
                        <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
                          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                        </span>
                      ) : null}
                      {pkg.featured && (
                        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary">Featured</span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleWishlist(pkg.id)}
                      className={cn(
                        "absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition-all",
                        wishlisted.includes(wishlistKey)
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", wishlisted.includes(wishlistKey) && "fill-white")} />
                    </button>
                    <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Link href={`/holiday-packages/${pkg.slug}`} className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-primary backdrop-blur-sm hover:bg-accent">
                        <Eye className="h-3.5 w-3.5" /> Quick View
                      </Link>
                    </div>
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
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-light">{pkg.description}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl font-bold text-primary">{formatPrice(pkg.price)}</span>
                          {pkg.originalPrice && <span className="text-sm text-text-light line-through">{formatPrice(pkg.originalPrice)}</span>}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          <span className="text-xs text-text-light">{pkg.rating} ({pkg.reviews || 0} reviews)</span>
                        </div>
                      </div>
                      <Link href={`/holiday-packages/${pkg.slug}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-accent hover:text-primary group-hover:shadow-lg group-hover:shadow-accent/20">
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/holiday-packages" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30">
            View All Packages <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
