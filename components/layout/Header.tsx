"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE, NAVIGATION } from "@/lib/constants";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Search,
  Compass,
} from "lucide-react";

type BrandingSettings = {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  headerLogoWidth: number;
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [branding, setBranding] = useState<BrandingSettings | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        setBranding(result.settings);
        if (result.settings?.faviconUrl) {
          let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }
          link.href = result.settings.faviconUrl;
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6 text-xs text-white/70">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-accent">
              <Phone className="h-3.5 w-3.5" />
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 transition-colors hover:text-accent">
              <Mail className="h-3.5 w-3.5" />
              {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              IATA Certified Agency
            </span>
            <span className="text-white/30">|</span>
            <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.03] lg:top-0"
            : "bg-transparent lg:top-8"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            {branding?.logoUrl ? (
              <img
                src={branding.logoUrl}
                alt={branding.siteName || "Easy Travel & Tours"}
                style={{ width: branding.headerLogoWidth || 190 }}
                className="max-h-14 rounded-xl object-contain"
              />
            ) : (
              <>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-shadow group-hover:shadow-lg group-hover:shadow-accent/30">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className={cn(
                    "font-display text-xl font-bold leading-tight transition-colors",
                    isScrolled ? "text-primary" : "text-white"
                  )}>
                    Easy Travel<span className="text-accent">&amp;</span>Tours
                  </h1>
                  <p className={cn(
                    "font-sans text-[10px] tracking-[0.15em] uppercase transition-colors",
                    isScrolled ? "text-primary/50" : "text-white/50"
                  )}>
                    Your Journey, Our Passion
                  </p>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center lg:flex lg:gap-1">
            {NAVIGATION.main.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                      isScrolled
                        ? isActive(item.href)
                          ? "bg-primary/5 text-primary"
                          : "text-text/70 hover:bg-primary/5 hover:text-primary"
                        : isActive(item.href)
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                      isScrolled
                        ? "text-text/70 hover:bg-primary/5 hover:text-primary"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </button>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl shadow-black/[0.05]"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-sm text-text/70 transition-all hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className={cn(
                "hidden rounded-xl p-2.5 transition-all lg:block",
                isScrolled
                  ? "bg-primary/5 text-primary hover:bg-primary/10"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              <Search className="h-4 w-4" />
            </button>
            <Link
              href="/contact"
              className="hidden rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 lg:block"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "rounded-xl p-2.5 transition-all lg:hidden",
                isScrolled
                  ? "bg-primary/5 text-primary"
                  : "bg-white/10 text-white"
              )}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-0 right-0 h-full w-80 bg-white p-6 pt-24 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1">
                {NAVIGATION.main.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all",
                          isActive(item.href!)
                            ? "bg-primary/5 text-primary"
                            : "text-text/70 hover:bg-primary/5 hover:text-primary"
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.label ? null : item.label
                            )
                          }
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-text/70 transition-all hover:bg-primary/5 hover:text-primary"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              activeDropdown === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.label && item.children && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-4 overflow-hidden border-l-2 border-accent/20 pl-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="block rounded-lg px-4 py-2 text-sm text-text/60 transition-all hover:text-primary"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-primary"
                >
                  Book Your Journey
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
