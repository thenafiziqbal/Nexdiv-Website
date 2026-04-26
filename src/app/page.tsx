"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FeatureSlider } from "@/components/FeatureSlider";
import { Section, SectionHeader } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ToolCard } from "@/components/ToolCard";
import { PackageCard } from "@/components/PackageCard";
import { useServices, useTools, usePackages } from "@/hooks/useContent";

export default function Home() {
  const services = useServices();
  const tools = useTools();
  const packages = usePackages();

  return (
    <>
      <Hero />
      <FeatureSlider />

      <Section id="services">
        <SectionHeader
          eyebrow="What we do"
          title="Services that drive growth"
          subtitle="From a sleek landing page to a multi-tenant SaaS — Nexdiv ships modern, scalable, futuristic products."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong text-sm font-semibold text-white hover:bg-brand-blue/20"
          >
            See all services <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      <Section id="tools">
        <SectionHeader
          eyebrow="Our products"
          title="AI tools & SaaS we built"
          subtitle="Production AI agents, SaaS platforms, and browser extensions — try them live."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.slice(0, 3).map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong text-sm font-semibold text-white hover:bg-brand-blue/20"
          >
            Explore all products <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      <Section id="packages">
        <SectionHeader
          eyebrow="Pricing"
          title="Packages built for every stage"
          subtitle="Transparent pricing. No hidden fees. Pick a package or tell us what you need — we'll customize."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.filter((p) => p.category === "Website").map((p, i) => (
            <PackageCard key={p.slug} pkg={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong text-sm font-semibold text-white hover:bg-brand-blue/20"
          >
            See all packages <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      <Section>
        <div className="relative rounded-3xl overflow-hidden glass-strong neon-border">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-brand-mint/15 to-brand-neon/20" />
          <div className="relative p-8 sm:p-14 text-center">
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to build something <span className="neon-text">extraordinary?</span>
            </h3>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Tell us about your idea, your goals, your dream — we&apos;ll come back with a plan, a price, and a deadline.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold animate-glow"
              >
                Start a project <ArrowRight size={16} />
              </Link>
              <Link
                href="/payment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong text-white font-semibold hover:bg-brand-blue/20"
              >
                Make a payment
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
