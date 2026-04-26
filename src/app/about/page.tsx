import type { Metadata } from "next";
import { Sparkles, Target, Heart, Zap, Globe2, ShieldCheck } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description: "About Nexdiv — a future-ready digital agency from Bangladesh.",
};

const values = [
  { icon: Sparkles, title: "Future-ready", desc: "We build with tomorrow's tech today — AI, edge, real-time." },
  { icon: Target, title: "Outcome-focused", desc: "We obsess over the metric that matters: your business growth." },
  { icon: Heart, title: "Human-first", desc: "Beautiful design, accessible UX, real human support." },
  { icon: Zap, title: "Lightning fast", desc: "We ship in days, not months. Iterate weekly." },
  { icon: Globe2, title: "Global standard", desc: "Built in Bangladesh, engineered to global benchmarks." },
  { icon: ShieldCheck, title: "Security baked-in", desc: "OWASP, encryption, audit trails by default." },
];

export default function AboutPage() {
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="About Nexdiv"
        title="Crafting the future of digital"
        subtitle="Nexdiv is a digital agency that combines design, engineering, and AI to help businesses thrive in the next era of the web."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="glass-strong rounded-3xl p-8 sm:p-10 neon-border">
          <h3 className="text-2xl font-bold neon-text">Our mission</h3>
          <p className="mt-4 text-white/75 leading-relaxed">
            To make world-class digital products and AI accessible to every business in
            Bangladesh and beyond — without the agency premium.
          </p>
          <p className="mt-3 text-white/65 leading-relaxed">
            We&apos;re a tight-knit team of engineers, designers, marketers and AI researchers,
            united by a single belief: the next generation of business will be powered by
            intelligent software, and every founder deserves a team that can build it for them.
          </p>
        </div>
        <div className="glass-strong rounded-3xl p-8 sm:p-10 neon-border">
          <h3 className="text-2xl font-bold neon-text">Our story</h3>
          <p className="mt-4 text-white/75 leading-relaxed">
            Nexdiv started as a 2-person studio building websites for local startups. Today
            we ship custom AI agents, SaaS platforms and browser extensions for clients
            across 6 countries.
          </p>
          <p className="mt-3 text-white/65 leading-relaxed">
            We&apos;ve helped 60+ brands launch, scale and modernize — from e-commerce shops to
            government-affiliated platforms.
          </p>
        </div>
      </div>

      <SectionHeader eyebrow="What we believe" title="Values that guide us" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {values.map((v) => {
          const I = v.icon;
          return (
            <div key={v.title} className="rounded-2xl glass p-6 neon-border">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue/30 to-brand-neon/20 text-brand-neon">
                <I size={20} />
              </span>
              <h4 className="mt-4 text-lg font-bold text-white">{v.title}</h4>
              <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
