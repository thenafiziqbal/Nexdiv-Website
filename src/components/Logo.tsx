"use client";

import Link from "next/link";
import { useSettings } from "@/hooks/useSettings";

export function Logo({ size = 32 }: { size?: number }) {
  const settings = useSettings();
  const name = settings.siteName || "Nexdiv";
  const initial = name.charAt(0).toUpperCase();
  const rest = name.slice(1);

  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label={name}>
      <span
        className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue via-brand-mint to-brand-neon shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-neon/50 transition-shadow"
        style={{ width: size, height: size }}
      >
        {settings.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={settings.logo} alt={name} className="absolute inset-0.5 w-[calc(100%-4px)] h-[calc(100%-4px)] object-contain rounded-[10px] bg-brand-night p-1" />
        ) : (
          <span className="absolute inset-0.5 rounded-[10px] bg-brand-night flex items-center justify-center">
            <span className="text-base font-black neon-text tracking-tight">{initial}</span>
          </span>
        )}
      </span>
      <span className="hidden sm:inline-block text-lg font-bold tracking-tight">
        <span className="neon-text">{name.length > 1 ? name.slice(0, Math.ceil(name.length / 2)) : initial}</span>
        <span className="text-white">{name.length > 1 ? rest.slice(Math.ceil(name.length / 2) - 1) : ""}</span>
      </span>
    </Link>
  );
}
