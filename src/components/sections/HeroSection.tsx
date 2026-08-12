"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Plane,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const popularSearches = [
  "Dubai", "Istanbul", "Bangkok", "Kuala Lumpur", "Baku", "Makkah",
];

export function HeroSection() {
  const [from, setFrom] = useState("Islamabad");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [travelers, setTravelers] = useState("1 Adult");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 hidden h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/3 hidden h-16 w-16 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-xl lg:block"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute right-20 top-1/3 hidden h-12 w-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl lg:block"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                IATA Certified Travel Agency
              </div>
              <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Discover the World
                <br />
                <span className="text-gradient">In Luxury</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                From breathtaking destinations to seamless travel experiences — let Easy Travel & Tours craft your perfect journey with premium service and unbeatable prices.
              </p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-accent text-xs font-bold text-primary"
                      >
                        ★
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-xs text-white/60">50,000+ Happy Travelers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:ml-auto lg:w-full lg:max-w-md"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl shadow-2xl shadow-black/20">
              <h3 className="mb-5 font-display text-xl font-semibold text-white">
                Find Your Perfect Trip
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50 uppercase tracking-wider">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-accent focus:bg-white/10"
                      placeholder="Departure city"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50 uppercase tracking-wider">
                    To
                  </label>
                  <div className="relative">
                    <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-accent focus:bg-white/10"
                      placeholder="Where would you like to go?"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50 uppercase tracking-wider">
                      Depart
                    </label>
                    <div className="relative">
                      <Calendar className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-2 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-accent focus:bg-white/10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50 uppercase tracking-wider">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-8 text-sm text-white outline-none transition-all focus:border-accent focus:bg-white/10"
                      >
                        {["1 Adult", "2 Adults", "3 Adults", "4+ Adults", "Group (10+)"].map(
                          (opt) => (
                            <option key={opt} value={opt} className="bg-primary text-white">
                              {opt}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <Link href={`/flights?from=${from}&to=${to}&date=${departDate}&travelers=${travelers}`}>
                  <Button
                    variant="accent"
                    size="xl"
                    className="mt-3 w-full"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Search & Explore
                  </Button>
                </Link>

                {/* Popular searches */}
                <div className="pt-2">
                  <p className="mb-2 text-xs text-white/40">Popular Destinations:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((city) => (
                      <button
                        key={city}
                        onClick={() => setTo(city)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 transition-all hover:border-accent hover:text-accent"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-white/40">Scroll to explore</span>
        <div className="h-8 w-[2px] rounded-full bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
