"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Tool } from "@/data/tools";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden glass-strong neon-border flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.cover}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-night via-brand-night/40 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-neon/20 text-brand-neon border border-brand-neon/40">
          {tool.category}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-blue/30 text-white border border-brand-blue/50">
          {tool.pricing}
        </span>
      </div>

      <div className="relative p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white">{tool.name}</h3>
        <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{tool.short}</p>

        <ul className="mt-4 space-y-1.5 flex-1">
          {tool.features.slice(0, 3).map((f) => (
            <li key={f} className="text-xs text-white/70 flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-neon shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
          <a
            href={tool.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-neon hover:text-brand-mint transition-colors"
          >
            Live demo <ExternalLink size={13} />
          </a>
          <a
            href={`/tools#${tool.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white"
          >
            Details <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
