import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Play, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Tools & SaaS",
  description: "AI agents, AI tools, SaaS products, and browser extensions built by Nexdiv.",
};

export default function ToolsPage() {
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Our products"
        title="AI agents · SaaS · Browser extensions"
        subtitle="Production-ready tools built by Nexdiv. Try the live demos and see what's possible."
      />

      <div className="space-y-10">
        {tools.map((t, i) => (
          <article
            key={t.slug}
            id={t.slug}
            className="relative rounded-3xl overflow-hidden glass-strong neon-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="relative aspect-video lg:aspect-auto lg:col-span-2 min-h-[260px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.cover} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-night via-brand-night/50 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-neon/20 text-brand-neon border border-brand-neon/40">
                  {t.category}
                </span>
              </div>

              <div className="lg:col-span-3 p-7 sm:p-10">
                <p className="text-xs text-white/55 uppercase tracking-widest">{`Product ${String(i + 1).padStart(2, "0")}`}</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">
                  <span className="neon-text">{t.name}</span>
                </h2>
                <p className="mt-3 text-white/75 leading-relaxed">{t.description}</p>

                <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                  {t.features.map((f) => (
                    <li key={f} className="text-sm text-white/80 flex items-start gap-2">
                      <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-neon/20 text-brand-neon shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {t.screenshots.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-widest text-white/55 mb-3">Screenshots</p>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                      {t.screenshots.map((src, idx) => (
                        <div
                          key={idx}
                          className="snap-start shrink-0 w-64 aspect-video rounded-xl overflow-hidden glass-strong neon-border"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`${t.name} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href={t.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm"
                  >
                    <Play size={14} /> Live demo
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong text-white font-semibold text-sm hover:bg-brand-blue/20"
                  >
                    <ExternalLink size={14} /> Get pricing
                  </Link>
                  <span className="ml-auto text-sm font-bold text-white/85">{t.pricing}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
