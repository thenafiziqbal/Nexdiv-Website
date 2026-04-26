export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: { type: "linkedin" | "twitter" | "github" | "facebook"; url: string }[];
};

export const team: TeamMember[] = [
  {
    slug: "nafiz-iqbal",
    name: "Nafiz Iqbal",
    role: "Founder & CEO",
    bio: "Serial entrepreneur. Building Nexdiv to make world-class digital and AI services accessible to Bangladeshi businesses.",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=600&q=80",
    socials: [
      { type: "linkedin", url: "https://linkedin.com/" },
      { type: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    slug: "rahim-ahmed",
    name: "Rahim Ahmed",
    role: "CTO & Lead Engineer",
    bio: "Full-stack engineer with 8+ years of experience. Loves React, Next.js, distributed systems, and shipping fast.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    socials: [
      { type: "github", url: "https://github.com/" },
      { type: "linkedin", url: "https://linkedin.com/" },
    ],
  },
  {
    slug: "nadia-hasan",
    name: "Nadia Hasan",
    role: "Head of Design",
    bio: "Award-winning UI/UX designer focused on futuristic, accessible product experiences.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    socials: [{ type: "linkedin", url: "https://linkedin.com/" }],
  },
  {
    slug: "tanvir-khan",
    name: "Tanvir Khan",
    role: "AI Lead",
    bio: "ML engineer specializing in LLMs, RAG, and agentic systems. Bangla NLP enthusiast.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    socials: [{ type: "github", url: "https://github.com/" }],
  },
  {
    slug: "sumaiya-rahman",
    name: "Sumaiya Rahman",
    role: "Marketing Director",
    bio: "Performance marketing expert. Has driven 7-figure ad campaigns for global brands.",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    socials: [{ type: "linkedin", url: "https://linkedin.com/" }],
  },
  {
    slug: "shakib-hossain",
    name: "Shakib Hossain",
    role: "Project Manager",
    bio: "Delivery-focused PM ensuring every project ships on time, on budget, beyond expectations.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    socials: [{ type: "linkedin", url: "https://linkedin.com/" }],
  },
];
