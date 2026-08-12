"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { VISA_SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Clock, ArrowRight, CheckCircle, FileText, Headphones } from "lucide-react";

export function VisaServicesContent() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Hassle-Free Processing</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Visa Services</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Expert visa processing for 30+ countries with a 98% approval rate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {VISA_SERVICES.map((visa, i) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-5xl">{visa.flag}</span>
                  <span className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">{visa.type} Visa</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-text">{visa.country}</h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-text-light">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{visa.processingTime}</span>
                </div>
                <div className="mt-4 text-3xl font-bold text-primary">
                  {formatPrice(visa.price)}
                  <span className="ml-1 text-sm font-normal text-text-light">/ person</span>
                </div>
                <div className="mt-5 border-t border-gray-50 pt-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-text">
                    <FileText className="h-4 w-4 text-accent" />
                    Requirements:
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {visa.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-text-light">
                        <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading subtitle="Why Choose Us" title="Visa Processing Made Simple" />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: CheckCircle, title: "98% Approval Rate", text: "Our expert team ensures your visa application meets all requirements." },
              { icon: Clock, title: "Fast Processing", text: "Most visas processed within 3-7 working days with express options." },
              { icon: Headphones, title: "Dedicated Support", text: "Personal visa consultant assigned to guide you through the entire process." },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent"><f.icon className="h-8 w-8" /></div>
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
