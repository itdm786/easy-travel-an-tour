"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STATS } from "@/lib/constants";
import {
  BadgeCheck,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-display text-4xl font-bold text-white md:text-5xl">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make starts with our customers' needs and satisfaction. Your journey is our priority.",
  },
  {
    icon: Shield,
    title: "Integrity & Trust",
    description:
      "We operate with complete transparency, honesty, and professionalism in every interaction and transaction.",
  },
  {
    icon: Globe,
    title: "Global Excellence",
    description:
      "We maintain the highest international standards in service delivery, partnering with world-class travel brands.",
  },
  {
    icon: Award,
    title: "Continuous Improvement",
    description:
      "We constantly evolve our services, embrace innovation, and seek feedback to exceed expectations.",
  },
];

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center bg-primary py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 font-sans text-sm font-medium tracking-[0.2em] text-accent uppercase">
              Our Story
            </p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">
              About Easy Travel & Tours
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              Your trusted IATA-certified travel partner since 2008, dedicated to crafting extraordinary travel experiences with passion, integrity, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: "Who We Are",
                text: "Easy Travel & Tours is an IATA-certified premium travel agency headquartered in Islamabad, Pakistan. With over 15 years of industry expertise, we have served 50,000+ satisfied travelers across the globe. We specialize in international and domestic flight bookings, hotel reservations, visa processing, comprehensive Umrah & Hajj packages, international and domestic tour packages, corporate travel management, and travel insurance.",
              },
              {
                icon: Target,
                title: "Our Mission",
                text: "To deliver world-class travel experiences that inspire, enrich, and create lasting memories. We are committed to providing seamless, affordable, and personalized travel solutions backed by exceptional customer service, innovative technology, and a deep understanding of our clients' unique needs and aspirations.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become Pakistan's most trusted and preferred travel partner — recognized globally for excellence, innovation, and customer satisfaction. We envision a future where every Pakistani traveler has access to premium, affordable, and hassle-free international travel experiences.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-light">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            subtitle="What Drives Us"
            title="Our Core Values"
            description="The principles that guide every decision we make and every journey we plan."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-text">{v.title}</h4>
                  <p className="mt-2 text-sm text-text-light">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm font-medium text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
