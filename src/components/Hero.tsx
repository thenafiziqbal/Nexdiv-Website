"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-medium text-white/80 mb-6"
          >
            <Sparkles size={14} className="text-brand-neon" />
            <span>Future-ready Digital Agency · Web · AI · SaaS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            We build <span className="neon-text">tomorrow&apos;s</span>
            <br className="hidden sm:block" /> digital products today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Websites, e-commerce, browser extensions, custom AI agents and SaaS products —
            crafted with futuristic design, smooth motion, and real-world results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/packages"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold shadow-lg shadow-brand-blue/30 hover:shadow-brand-neon/50 transition-shadow animate-glow"
            >
              Explore Packages
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong text-white font-semibold hover:bg-brand-blue/20 transition-colors neon-border"
            >
              <Play size={14} className="text-brand-neon" />
              Start a Project
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
          >
            {[
              { v: "120+", l: "Projects shipped" },
              { v: "60+", l: "Happy clients" },
              { v: "8+", l: "AI products" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl py-3 sm:py-4">
                <div className="text-xl sm:text-3xl font-black neon-text">{s.v}</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-white/60 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero video card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-14 relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/40 via-brand-mint/40 to-brand-neon/40 blur-2xl opacity-60 rounded-[28px] -z-0" />
          <div className="relative glass-strong rounded-3xl overflow-hidden neon-border">
            <div className="aspect-video w-full relative">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={siteConfig.heroPoster}
              >
                <source src={siteConfig.heroVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-night/80 via-brand-night/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-neon font-semibold">
                    Live preview
                  </p>
                  <p className="text-sm sm:text-base text-white/90 font-medium">
                    Nexdiv Showreel · Featured projects
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-strong text-sm font-semibold text-white hover:bg-brand-blue/20"
                >
                  See products <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
