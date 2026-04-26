"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Service } from "@/data/services";
import { formatBDT } from "@/lib/utils";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[
    service.icon
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
  ] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl glass overflow-hidden neon-border"
    >
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-night/60 to-brand-night/95" />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/30 to-brand-neon/20 text-brand-neon">
            <Icon size={22} />
          </span>
          <span className="text-xs font-semibold text-brand-neon">
            from {formatBDT(service.startingPrice)}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold tracking-tight text-white">{service.title}</h3>
        <p className="mt-2 text-sm text-white/65 leading-relaxed">{service.short}</p>

        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="text-xs text-white/70 flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-neon shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Link
          href={`/services#${service.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 group-hover:text-brand-neon transition-colors"
        >
          Learn more
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
