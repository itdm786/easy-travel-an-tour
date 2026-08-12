"use client";

import { PARTNERS } from "@/lib/constants";
import { Star } from "lucide-react";

export function PartnersSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-10 text-center text-sm font-medium tracking-[0.2em] text-text-light uppercase">
          Trusted Partners & Airlines
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PARTNERS.map((partner, i) => (
            <div
              key={partner}
              className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all hover:bg-bg"
            >
              <Star className="h-4 w-4 text-accent/50" />
              <span className="font-display text-lg font-semibold text-text/60 transition-colors hover:text-text">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
