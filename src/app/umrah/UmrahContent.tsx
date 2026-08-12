"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UMRAH_PACKAGES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice, cn } from "@/lib/utils";
import { Star, Clock, MapPin, ArrowRight, CheckCircle, Users } from "lucide-react";

export function UmrahContent() {
  return (
    <>
      <section className="relative flex min-h-[55vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-primary/90" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Spiritual Journey</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Umrah Packages</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Embark on a blessed journey to the holy cities of Makkah and Madinah. Premium hotels, direct flights, and complete spiritual guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {UMRAH_PACKAGES.map((pkg, i) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className={cn("group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500", pkg.featured ? "border-accent/40 bg-gradient-to-b from-accent/5 to-white shadow-xl shadow-accent/5" : "border-gray-100 bg-white shadow-sm hover:shadow-xl")}>
                {pkg.featured && <div className="absolute top-0 right-0 rounded-bl-2xl bg-accent px-5 py-2 text-xs font-bold text-primary">MOST POPULAR</div>}
                <div className="mb-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /><span className="text-xs text-text-light">{pkg.destination}</span></div>
                <h3 className="font-display text-2xl font-bold text-text">{pkg.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-sm text-text-light"><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pkg.duration}</span><span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{pkg.rating} ({pkg.reviews})</span></div>
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                  {pkg.highlights.slice(0, 5).map((h, j) => (
                    <div key={j} className="flex items-start gap-2.5"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span className="text-sm text-text-light">{h}</span></div>
                  ))}
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div><p className="text-xs text-text-light">Starting from</p><p className="font-display text-3xl font-bold text-primary">{formatPrice(pkg.price)}</p></div>
                  <Link href="/contact" className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-accent hover:text-primary"><ArrowRight className="h-5 w-5" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading subtitle="The Journey" title="What's Included" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🛂", title: "Visa Processing", text: "Complete Umrah visa processing with all documentation handled by our expert team." },
              { icon: "✈️", title: "Return Flights", text: "Direct flights with Saudi Airlines and other premium carriers from major Pakistani cities." },
              { icon: "🏨", title: "Premium Hotels", text: "5-star and 4-star hotels within walking distance of Haram in Makkah and Madinah." },
              { icon: "🚌", title: "Transportation", text: "All ground transportation including airport transfers and inter-city travel in luxury coaches." },
              { icon: "📋", title: "Ziyarat Tours", text: "Guided tours to historical Islamic sites in Makkah, Madinah, and surrounding areas." },
              { icon: "🎓", title: "Spiritual Guidance", text: "Experienced religious scholars accompany the group throughout the pilgrimage." },
              { icon: "👕", title: "Ihram Kit", text: "Complimentary Ihram kit provided to every pilgrim before departure." },
              { icon: "📞", title: "24/7 Support", text: "Round-the-clock ground support team available in Saudi Arabia for any assistance." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="mt-3 font-display text-lg font-bold text-text">{item.title}</h4>
                <p className="mt-2 text-sm text-text-light">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
