import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label={siteConfig.name}>
      <span
        className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue via-brand-mint to-brand-neon shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-neon/50 transition-shadow"
        style={{ width: size, height: size }}
      >
        <span className="absolute inset-0.5 rounded-[10px] bg-brand-night flex items-center justify-center">
          <span className="text-base font-black neon-text tracking-tight">N</span>
        </span>
      </span>
      <span className="hidden sm:inline-block text-lg font-bold tracking-tight">
        <span className="neon-text">Nex</span>
        <span className="text-white">div</span>
      </span>
    </Link>
  );
}
