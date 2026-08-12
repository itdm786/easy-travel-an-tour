"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Get In Touch</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">Have questions? Our travel experts are here to help plan your perfect journey.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-bold text-text">Let&apos;s Plan Your Trip</h2>
              <p className="mt-3 text-text-light">Fill out the form and our team will get back to you within 24 hours. Or reach us directly through any of the channels below.</p>
              <div className="mt-8 space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: SITE.phone, sub: "Mon-Sat: 10AM - 7PM", href: `tel:${SITE.phone}` },
                  { icon: Mail, label: "Email", value: SITE.email, sub: "We respond within 24 hours", href: `mailto:${SITE.email}` },
                  { icon: MapPin, label: "Office", value: SITE.address, sub: "I-8 Markaz, Islamabad", href: "https://maps.google.com/?q=Easy+Travel+and+Tours+Islamabad" },
                  { icon: Clock, label: "Hours", value: "Mon - Sat: 10:00 AM - 7:00 PM", sub: "Sunday: Closed", href: "#" },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:bg-bg hover:border-accent/20">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><item.icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs text-text-light">{item.label}</p>
                      <p className="font-semibold text-text">{item.value}</p>
                      <p className="text-xs text-text-light">{item.sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 h-64 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.601184037407!2d73.0855!3d33.6668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95204dbd1b9b%3A0x9ae9b3f37d52d91c!2sI-8%20Markaz%20Islamabad!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Easy Travel & Tours Office Location" />
              </div>
            </div>

            {/* Form */}
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/[0.02]">
              <h3 className="font-display text-2xl font-bold text-text">Send Us a Message</h3>
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" placeholder="you@email.com" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" placeholder="+92 XXX XXXXXXX" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Service Interested In</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent">
                      <option value="">Select service</option>
                      <option>Flight Booking</option>
                      <option>Hotel Booking</option>
                      <option>Visa Services</option>
                      <option>Umrah Package</option>
                      <option>Hajj Package</option>
                      <option>International Tour</option>
                      <option>Domestic Tour</option>
                      <option>Corporate Travel</option>
                      <option>Travel Insurance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Message *</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="w-full resize-none rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Tell us about your travel plans..." />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg">
                  <Send className="h-4 w-4" /> Send Message
                </button>
                {submitted && (
                  <p className="flex items-center justify-center gap-2 text-sm text-emerald-600">
                    <CheckCircle className="h-4 w-4" /> Message sent successfully! We&apos;ll get back to you within 24 hours.
                  </p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}
