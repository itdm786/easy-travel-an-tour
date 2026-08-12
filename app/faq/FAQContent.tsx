"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Help Center</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">FAQ</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">Everything you need to know about our travel services.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-bg/50"
                >
                  <span className="pr-4 font-display text-lg font-semibold text-text">{faq.question}</span>
                  <span className="shrink-0 text-accent">
                    {openIndex === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                        <p className="text-sm leading-relaxed text-text-light">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
