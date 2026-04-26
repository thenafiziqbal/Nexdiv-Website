"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all",
            scrolled ? "glass-strong" : "glass"
          )}
        >
          <Logo />

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors relative",
                      active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-blue/30 to-brand-neon/20 border border-brand-neon/40"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/payment"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night hover:shadow-lg hover:shadow-brand-neon/40 transition-shadow animate-glow"
            >
              Make Payment
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl p-3"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          active
                            ? "bg-brand-blue/20 text-white border border-brand-neon/40"
                            : "text-white/80 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-1">
                  <Link
                    href="/payment"
                    className="block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night"
                  >
                    Make Payment
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
