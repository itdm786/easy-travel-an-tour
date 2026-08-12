"use client";

import { motion } from "framer-motion";
import { REVIEWS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Travelers Say"
          description="Real stories from real travelers who have experienced the world with Easy Travel & Tours."
        />

        {/* Google Reviews Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center justify-center gap-8 rounded-3xl bg-primary p-8"
        >
          <div className="text-center">
            <p className="font-display text-5xl font-bold text-accent">4.9</p>
            <div className="mt-2 flex justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-2 text-sm text-white/60">Google Reviews</p>
          </div>
          <div className="hidden h-16 w-px bg-white/20 md:block" />
          <div className="text-center">
            <p className="font-display text-5xl font-bold text-accent">500+</p>
            <p className="mt-2 text-sm text-white/60">Verified Reviews</p>
          </div>
          <div className="hidden h-16 w-px bg-white/20 md:block" />
          <div className="text-center">
            <p className="font-display text-5xl font-bold text-accent">98%</p>
            <p className="mt-2 text-sm text-white/60">Customer Satisfaction</p>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 -left-4 z-10 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all hover:bg-accent hover:border-accent lg:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-all hover:bg-accent hover:border-accent lg:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-[380px] shrink-0 rounded-3xl border border-gray-100 bg-bg p-8 shadow-sm"
              >
                <Quote className="h-8 w-8 text-accent/30" />
                <p className="mt-4 line-clamp-6 text-sm leading-relaxed text-text-light">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-accent text-accent"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-text">{review.name}</p>
                  <p className="text-xs text-text-light">{review.package}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
