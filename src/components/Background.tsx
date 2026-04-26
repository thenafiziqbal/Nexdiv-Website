"use client";

import { motion } from "framer-motion";

export function Background({ video }: { video?: string }) {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* video bg */}
      {video && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {/* dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-night/70 via-brand-night/85 to-brand-night" />
      {/* grid */}
      <div className="absolute inset-0 grid-bg" />
      {/* orbs */}
      <motion.div
        className="orb"
        style={{
          width: 520,
          height: 520,
          left: "-10%",
          top: "-10%",
          background: "radial-gradient(circle, #0a84ff 0%, transparent 70%)",
        }}
        animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 480,
          height: 480,
          right: "-10%",
          top: "30%",
          background: "radial-gradient(circle, #00ffa3 0%, transparent 70%)",
          opacity: 0.35,
        }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 420,
          height: 420,
          left: "30%",
          bottom: "-10%",
          background: "radial-gradient(circle, #39ff14 0%, transparent 70%)",
          opacity: 0.18,
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
