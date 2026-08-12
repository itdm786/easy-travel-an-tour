"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="text-center">
            <motion.div
              className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border-2 border-accent/50 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              <span className="relative text-4xl">✦</span>
            </motion.div>
            <motion.h1
              className="font-display text-3xl font-bold tracking-wider text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Easy Travel<span className="text-accent"> & </span>Tours
            </motion.h1>
            <motion.p
              className="mt-2 font-sans text-sm tracking-[0.3em] text-white/50 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Your Journey, Our Passion
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
