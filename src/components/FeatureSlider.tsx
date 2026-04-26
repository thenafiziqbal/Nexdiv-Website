"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code, ShoppingBag, Bot, Search, Layers, MessageCircle, Puzzle, TrendingUp } from "lucide-react";

const items = [
  { icon: Code, label: "Web Dev" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Bot, label: "AI Agents" },
  { icon: MessageCircle, label: "AI Chatbots" },
  { icon: Search, label: "SEO" },
  { icon: TrendingUp, label: "Marketing" },
  { icon: Puzzle, label: "Extensions" },
  { icon: Layers, label: "SaaS" },
];

export function FeatureSlider() {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="relative -mt-20 sm:-mt-28 z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full glass-strong hover:bg-brand-blue/30"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <div
            ref={ref}
            className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth py-2"
          >
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="snap-center shrink-0 w-44 sm:w-52 rounded-2xl glass-strong p-5 neon-border"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue/30 to-brand-neon/20 text-brand-neon">
                    <Icon size={18} />
                  </span>
                  <p className="mt-3 text-sm font-bold text-white">{it.label}</p>
                  <p className="mt-1 text-xs text-white/55">Production-grade</p>
                </motion.div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full glass-strong hover:bg-brand-blue/30"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
