"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="golden-line mx-auto mb-8" />
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            Ready to Start Your
            <br />
            <span className="text-gradient">Next Adventure?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Let us turn your travel dreams into reality. Contact our expert team today for personalized recommendations, exclusive deals, and a seamless booking experience.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                variant="accent"
                size="xl"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Plan Your Trip
              </Button>
            </Link>
            <a href={`tel:${SITE.phone}`}>
              <Button
                variant="outline"
                size="xl"
                leftIcon={<Phone className="h-5 w-5" />}
                className="border-white/20 text-white hover:border-accent hover:text-accent"
              >
                {SITE.phone}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
