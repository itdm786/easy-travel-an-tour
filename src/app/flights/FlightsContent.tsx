"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AIRLINES } from "@/lib/data";
import { Plane, Search, ArrowRight, Star, Shield, Clock } from "lucide-react";

export function FlightsContent() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cabinClass, setCabinClass] = useState("Economy");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Fly With Ease</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Book Your Flight</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Search and book the best flight deals across 100+ airlines worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Form */}
      <section className="-mt-12 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-black/[0.03]"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">From</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Departure City"
                  className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">To</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Destination City"
                  className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Depart</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Return</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Class</label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                >
                  {["Economy", "Premium Economy", "Business", "First Class"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button variant="accent" size="xl" rightIcon={<Search className="h-5 w-5" />}>
                Search Flights
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Airlines */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            subtitle="Partner Airlines"
            title="Fly with the World's Best"
            description="We partner with leading airlines to bring you the most competitive fares and comfortable journeys."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AIRLINES.map((airline, i) => (
              <motion.div
                key={airline.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-bg p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-3xl">
                  {airline.logo}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text">{airline.name}</h4>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="text-sm text-text-light">{airline.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Secure Booking", text: "100% secure payment processing with encryption and fraud protection." },
              { icon: Clock, title: "24/7 Support", text: "Round-the-clock customer assistance before and during your journey." },
              { icon: Plane, title: "Best Price Guarantee", text: "We negotiate directly with airlines to offer the lowest fares available." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <f.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-text">{f.title}</h3>
                <p className="mt-2 text-sm text-text-light">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
