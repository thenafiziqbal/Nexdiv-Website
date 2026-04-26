"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Facebook } from "./SocialIcons";
import { TeamMember } from "@/data/team";

const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, facebook: Facebook };

export function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl glass overflow-hidden neon-border"
    >
      <div className="aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-night via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{member.name}</h3>
        <p className="text-sm text-brand-neon font-medium">{member.role}</p>
        <p className="mt-2 text-xs text-white/65 leading-relaxed line-clamp-3">{member.bio}</p>
        <div className="mt-4 flex items-center gap-2">
          {member.socials.map((s) => {
            const I = iconMap[s.type];
            return (
              <a
                key={s.type}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md glass-strong hover:bg-brand-blue/20 transition-colors"
                aria-label={s.type}
              >
                <I size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
