"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Package } from "@/data/packages";
import { formatBDT } from "@/lib/utils";

export function PackageCard({ pkg, index = 0 }: { pkg: Package; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`relative rounded-2xl p-6 sm:p-7 flex flex-col ${
        pkg.popular
          ? "bg-gradient-to-br from-brand-blue/20 via-brand-mint/10 to-brand-neon/10 neon-border animate-glow"
          : "glass"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-neon text-brand-night shadow-lg shadow-brand-neon/40">
          <Star size={11} fill="currentColor" /> Most popular
        </span>
      )}

      <div className="text-xs font-semibold uppercase tracking-wider text-brand-neon">
        {pkg.category}
      </div>
      <h3 className="mt-2 text-2xl font-bold text-white">{pkg.name}</h3>

      <div className="mt-4">
        <span className="text-4xl sm:text-5xl font-black neon-text">
          {formatBDT(pkg.price)}
        </span>
      </div>
      <p className="mt-1 text-xs text-white/60">
        {pkg.pages === 0
          ? `Delivery: ${pkg.delivery}`
          : pkg.pages === "unlimited"
          ? `Unlimited pages · ${pkg.delivery}`
          : `Up to ${pkg.pages} pages · ${pkg.delivery}`}
      </p>

      <ul className="mt-5 space-y-2 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="text-sm text-white/80 flex items-start gap-2">
            <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-neon/20 text-brand-neon shrink-0">
              <Check size={10} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={`/payment?package=${pkg.slug}`}
        className={`mt-6 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
          pkg.popular
            ? "bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night shadow-lg hover:shadow-brand-neon/50"
            : "glass-strong text-white hover:bg-brand-blue/20"
        }`}
      >
        Order this package
      </Link>
    </motion.div>
  );
}
