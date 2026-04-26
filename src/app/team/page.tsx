"use client";

import { Section, SectionHeader } from "@/components/Section";
import { TeamCard } from "@/components/TeamCard";
import { useTeam } from "@/hooks/useContent";

export default function TeamPage() {
  const team = useTeam();
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Our people"
        title="Meet the team"
        subtitle="A multidisciplinary crew of engineers, designers, marketers and AI researchers."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m, i) => (
          <TeamCard key={m.slug} member={m} index={i} />
        ))}
      </div>
    </Section>
  );
}
