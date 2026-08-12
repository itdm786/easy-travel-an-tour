"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { VISA_SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/utils";
import { Clock, ArrowRight, CheckCircle, FileText } from "lucide-react";

export function VisaServicesSection() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          subtitle="Hassle-Free Processing"
          title="Visa Services"
          description="Expert visa processing for 30+ countries with a 98% approval rate. We handle the paperwork so you can focus on packing."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VISA_SERVICES.map((visa, index) => (
            <motion.div
              key={visa.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-5xl">{visa.flag}</span>
                <span className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
                  {visa.type} Visa
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-text">{visa.country}</h3>

              <div className="mt-4 flex items-center gap-2 text-sm text-text-light">
                <Clock className="h-4 w-4 text-accent" />
                <span>{visa.processingTime}</span>
              </div>

              <div className="mt-4 text-2xl font-bold text-primary">
                {formatPrice(visa.price)}
                <span className="ml-1 text-sm font-normal text-text-light">/ person</span>
              </div>

              <div className="mt-5 border-t border-gray-50 pt-5">
                <div className="flex items-center gap-2 text-sm font-medium text-text">
                  <FileText className="h-4 w-4 text-accent" />
                  Requirements:
                </div>
                <ul className="mt-2 space-y-1.5">
                  {visa.requirements.slice(0, 3).map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-light">
                      <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                      {req}
                    </li>
                  ))}
                  {visa.requirements.length > 3 && (
                    <li className="text-xs text-accent">+{visa.requirements.length - 3} more</li>
                  )}
                </ul>
              </div>

              <Link
                href="/visa-services"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary/5 py-3 text-sm font-semibold text-primary transition-all group-hover:bg-accent group-hover:text-primary"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/visa-services"
            className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent"
          >
            View All Visa Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
