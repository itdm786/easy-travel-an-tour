"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const textClass = light ? "text-white" : "text-text";
  const mutedClass = light ? "text-white/70" : "text-text-light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", alignClass, className)}
    >
      {subtitle && (
        <p className={cn("mb-3 font-sans text-sm font-medium tracking-[0.2em] uppercase text-accent", alignClass)}>
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
          textClass
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 max-w-2xl text-base leading-relaxed md:text-lg", align === "center" ? "mx-auto" : "", mutedClass)}>
          {description}
        </p>
      )}
      <div className={cn("golden-line mt-6", align === "center" ? "mx-auto" : "")} />
    </motion.div>
  );
}
