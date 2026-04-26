import { services } from "@/data/services";
import { tools } from "@/data/tools";
import { packages } from "@/data/packages";
import { team } from "@/data/team";

export type Settings = {
  siteName: string;
  tagline: string;
  description: string;
  logo: string;
  colors: { primary: string; accent: string; neon: string };
  notice: { enabled: boolean; message: string };
  hero: { video: string; poster: string };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    github: string;
  };
  payment: {
    bkash: string;
    nagad: string;
    rocket: string;
    bankName: string;
    bankAccount: string;
    bankBranch: string;
  };
};

export const defaultSettings: Settings = {
  siteName: "Nexdiv",
  tagline: "Future-ready Digital Agency",
  description:
    "Nexdiv is a full-service digital agency building websites, e-commerce, AI agents, SaaS products, browser extensions and custom AI tools.",
  logo: "",
  colors: { primary: "#0a84ff", accent: "#00ffa3", neon: "#39ff14" },
  notice: {
    enabled: true,
    message: "🚀 Launch offer: 20% off on all website packages — limited time!",
  },
  hero: {
    video: "https://cdn.coverr.co/videos/coverr-data-network-9866/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80",
  },
  contact: {
    email: "hello@nexdiv.com",
    phone: "+880 1XXX-XXXXXX",
    whatsapp: "+8801XXXXXXXXX",
    address: "Dhaka, Bangladesh",
  },
  socials: {
    facebook: "https://facebook.com/nexdiv",
    twitter: "https://twitter.com/nexdiv",
    instagram: "https://instagram.com/nexdiv",
    linkedin: "https://linkedin.com/company/nexdiv",
    youtube: "https://youtube.com/@nexdiv",
    github: "https://github.com/nexdiv",
  },
  payment: {
    bkash: "01XXXXXXXXX",
    nagad: "01XXXXXXXXX",
    rocket: "01XXXXXXXXX",
    bankName: "City Bank",
    bankAccount: "XXXXXXXXXXXX",
    bankBranch: "Gulshan",
  },
};

export const defaultServices = services.map((s) => ({ ...s }));
export const defaultTools = tools.map((t) => ({ ...t }));
export const defaultPackages = packages.map((p) => ({ ...p }));
export const defaultTeam = team.map((t) => ({ ...t }));
