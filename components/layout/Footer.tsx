"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  Compass,
  Globe,
  Camera,
  MessageCircle,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

type BrandingSettings = {
  siteName: string;
  tagline: string;
  logoUrl: string;
  footerLogoWidth: number;
};

const footerLinks = {
  tours: {
    title: "Tour Packages",
    links: [
      { label: "International Tours", href: "/international-tours" },
      { label: "Domestic Tours", href: "/domestic-tours" },
      { label: "Holiday Packages", href: "/holiday-packages" },
      { label: "Honeymoon Packages", href: "/holiday-packages?type=honeymoon" },
      { label: "Group Tours", href: "/holiday-packages?type=group" },
    ],
  },
  services: {
    title: "Our Services",
    links: [
      { label: "Flight Booking", href: "/flights" },
      { label: "Hotel Booking", href: "/hotels" },
      { label: "Visa Services", href: "/visa-services" },
      { label: "Umrah Packages", href: "/umrah" },
      { label: "Hajj Packages", href: "/hajj" },
      { label: "Corporate Travel", href: "/corporate-travel" },
      { label: "Travel Insurance", href: "/travel-insurance" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Reviews", href: "/reviews" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [branding, setBranding] = useState<BrandingSettings | null>(null);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((response) => response.json())
      .then((result) => setBranding(result.settings))
      .catch(() => undefined);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-primary">
      {/* Newsletter */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl font-bold text-white">
                Get Exclusive Travel Deals
              </h3>
              <p className="mt-2 text-white/60">
                Subscribe to our newsletter and be the first to know about special offers, new packages, and travel inspiration.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-accent focus:bg-white/10"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-4 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
            {subscribed && (
              <p className="col-span-full text-sm text-accent">
                ✦ Thank you for subscribing! Welcome to Easy Travel & Tours.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2">
              {branding?.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt={branding.siteName || "Easy Travel & Tours"}
                  style={{ width: branding.footerLogoWidth || 220 }}
                  className="max-h-16 rounded-xl object-contain"
                />
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    <Compass className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-bold text-white">
                      Easy Travel<span className="text-accent">&amp;</span>Tours
                    </span>
                  </div>
                </>
              )}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Your trusted IATA-certified travel partner since 2008. We specialize in worldwide flights, premium hotel bookings, hassle-free visa services, international and domestic tours, and comprehensive Umrah & Hajj packages. Experience travel excellence with Easy Travel & Tours.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Globe, href: SITE.social.facebook, label: "Facebook" },
                { icon: Camera, href: SITE.social.instagram, label: "Instagram" },
                { icon: MessageCircle, href: SITE.social.twitter, label: "Twitter" },
                { icon: Video, href: SITE.social.youtube, label: "Youtube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-accent hover:bg-accent hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-5 font-display text-lg font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-accent"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, label: "Call Us", value: SITE.phone, href: `tel:${SITE.phone}` },
              { icon: Mail, label: "Email Us", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: MapPin, label: "Visit Us", value: "I-8 Markaz, Islamabad", href: "#" },
              { icon: Clock, label: "Working Hours", value: "Mon-Sat: 10AM - 7PM", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-xl p-3 text-white/60 transition-all hover:bg-white/5 hover:text-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/40">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm text-white/40 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Easy Travel & Tours. All rights reserved. IATA Certified Agency.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="transition-colors hover:text-accent">
              Terms & Conditions
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-accent">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
