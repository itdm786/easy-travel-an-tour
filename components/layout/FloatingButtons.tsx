"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function FloatingButtons() {
  return (
    <div className="fixed right-5 bottom-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Easy%20Travel%20%26%20Tours%2C%20I%20need%20help%20with%20booking`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat on WhatsApp</span>
      </motion.a>

      {/* Call */}
      <motion.a
        href={`tel:${SITE.phone}`}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.1 }}
      >
        <Phone className="h-6 w-6" />
        <span className="sr-only">Call us</span>
      </motion.a>
    </div>
  );
}
