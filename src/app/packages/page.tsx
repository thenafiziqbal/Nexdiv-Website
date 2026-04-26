import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/Section";
import { PackageCard } from "@/components/PackageCard";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Packages",
  description: "Transparent packages for websites, e-commerce, marketing, and AI services.",
};

const categories = ["Website", "E-commerce", "Marketing", "AI"] as const;

export default function PackagesPage() {
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Packages"
        title="Plans for every business"
        subtitle="Pick a plan, customize, or talk to us about a fully tailored solution."
      />

      {categories.map((cat) => {
        const catPkgs = packages.filter((p) => p.category === cat);
        if (catPkgs.length === 0) return null;
        return (
          <div key={cat} className="mb-14">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">
              <span className="neon-text">{cat}</span>{" "}
              <span className="text-white/60 font-medium text-sm">
                · {catPkgs.length} package{catPkgs.length > 1 ? "s" : ""}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catPkgs.map((p, i) => (
                <PackageCard key={p.slug} pkg={p} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </Section>
  );
}
