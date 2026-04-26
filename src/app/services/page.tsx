"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { useServices } from "@/hooks/useContent";
import { formatBDT } from "@/lib/utils";

export default function ServicesPage() {
  const services = useServices();
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Services"
        title="Everything you need to win online"
        subtitle="From the first pixel to the final deploy — we build, ship, and grow your digital presence."
      />

      <div className="space-y-6">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden glass-strong neon-border"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto min-h-[260px] order-1 lg:order-none">
              {s.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-night via-brand-night/60 to-transparent" />
            </div>
            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-brand-neon px-2.5 py-1 rounded-full glass">
                {`Service ${String(i + 1).padStart(2, "0")}`}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight">
                <span className="neon-text">{s.title}</span>
              </h2>
              <p className="mt-3 text-white/75 leading-relaxed">{s.description}</p>

              <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                {(s.features ?? []).map((f) => (
                  <li key={f} className="text-sm text-white/80 flex items-start gap-2">
                    <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-neon/20 text-brand-neon shrink-0">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-white/55 uppercase tracking-widest">Starting at</p>
                  <p className="text-2xl font-black neon-text">{formatBDT(s.startingPrice)}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/payment?service=${s.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm"
                  >
                    Order now <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong text-white font-semibold text-sm hover:bg-brand-blue/20"
                  >
                    Discuss
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
