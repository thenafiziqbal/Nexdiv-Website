"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "max-w-3xl mb-10 sm:mb-14",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-neon px-3 py-1 rounded-full glass mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
        <span className="neon-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-white/65 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
