"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UMRAH_PACKAGES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/utils";
import { Star, Clock, MapPin, ArrowRight, CheckCircle } from "lucide-react";

export function UmrahSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg to-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          subtitle="Spiritual Journey"
          title="Premium Umrah Packages"
          description="Embark on a blessed journey with our comprehensive Umrah packages — luxury accommodation, direct flights, and spiritual guidance throughout."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {UMRAH_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500",
                pkg.featured
                  ? "border-accent/40 bg-gradient-to-b from-accent/5 to-transparent shadow-xl shadow-accent/5"
                  : "border-gray-100 bg-white shadow-sm hover:shadow-xl"
              )}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-accent px-5 py-2 text-xs font-bold text-primary">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-xs text-text-light">{pkg.destination}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-text">{pkg.title}</h3>

              <div className="mt-2 flex items-center gap-3 text-sm text-text-light">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  {pkg.rating} ({pkg.reviews})
                </span>
              </div>

              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                {pkg.highlights.slice(0, 4).map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-text-light">{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs text-text-light">Starting from</p>
                  <p className="font-display text-3xl font-bold text-primary">
                    {formatPrice(pkg.price)}
                  </p>
                </div>
                <Link
                  href="/umrah"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-accent hover:text-primary"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/umrah"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30"
          >
            Explore All Umrah Packages
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}
