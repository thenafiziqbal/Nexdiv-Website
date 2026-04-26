export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice: number;
  currency: string;
  image: string;
  video?: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    short: "Modern, blazing-fast, SEO-ready websites.",
    description:
      "From landing pages to complex web platforms — Next.js, React, headless CMS, fully responsive, optimized for speed and SEO.",
    icon: "code",
    features: [
      "Next.js / React stack",
      "Fully responsive & mobile-first",
      "SEO + Core Web Vitals optimized",
      "CMS (Sanity / Strapi / WordPress)",
      "Lifetime support",
    ],
    startingPrice: 15000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    short: "High-converting online stores with payment gateway.",
    description:
      "Custom Shopify, WooCommerce or fully custom-built e-commerce platforms with bKash/Nagad/SSLCommerz integration, inventory, dashboard.",
    icon: "shopping-bag",
    features: [
      "Shopify / WooCommerce / custom",
      "bKash / Nagad / SSLCommerz",
      "Inventory + order management",
      "Multi-vendor support",
      "Marketing automation built-in",
    ],
    startingPrice: 35000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Grow your brand on Facebook, Instagram, TikTok.",
    description:
      "Strategy + content + paid ads. We manage your social presence end-to-end and deliver measurable ROI.",
    icon: "trending-up",
    features: [
      "Content calendar + design",
      "Paid ads (Meta, TikTok, Google)",
      "Analytics + monthly reports",
      "Influencer outreach",
      "Community management",
    ],
    startingPrice: 12000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & SEO",
    short: "Rank higher, get more traffic, more leads.",
    description:
      "Full-funnel digital marketing — SEO, content marketing, email automation, and conversion optimization.",
    icon: "search",
    features: [
      "On-page + off-page SEO",
      "Google Ads management",
      "Email marketing + automation",
      "CRO + landing pages",
      "Monthly KPI dashboard",
    ],
    startingPrice: 18000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ai-agent-development",
    title: "Custom AI Agent Development",
    short: "Tailored AI agents that automate your business.",
    description:
      "We design, build and deploy custom AI agents — sales bots, support bots, internal copilots — using OpenAI, Anthropic, and open-source LLMs.",
    icon: "bot",
    features: [
      "OpenAI / Anthropic / Llama",
      "Custom knowledge base (RAG)",
      "Voice + text + multilingual",
      "Bangla & English support",
      "Deploy on web, WhatsApp, Messenger",
    ],
    startingPrice: 50000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot Integration",
    short: "Intelligent chatbots for your website & messengers.",
    description:
      "Drop-in AI chatbots trained on your business — answer FAQs, qualify leads, book appointments, take orders.",
    icon: "message-circle",
    features: [
      "24/7 instant replies",
      "Lead capture + CRM sync",
      "Bangla + English",
      "Messenger / WhatsApp / Web",
      "Admin dashboard",
    ],
    startingPrice: 25000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "browser-extension",
    title: "Browser Extension Development",
    short: "Custom Chrome / Edge / Firefox extensions.",
    description:
      "We build powerful productivity, scraping, automation, and AI-powered browser extensions.",
    icon: "puzzle",
    features: [
      "Chrome / Edge / Firefox",
      "Content scripts + background workers",
      "AI integration",
      "Chrome Web Store publishing",
      "Update + maintenance",
    ],
    startingPrice: 30000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "saas-development",
    title: "SaaS Product Development",
    short: "End-to-end SaaS — from idea to launch.",
    description:
      "Multi-tenant SaaS platforms with subscription billing, admin panel, analytics, and scalable infrastructure.",
    icon: "layers",
    features: [
      "Multi-tenant architecture",
      "Stripe / SSLCommerz billing",
      "Admin + tenant dashboards",
      "API + webhook system",
      "DevOps + monitoring",
    ],
    startingPrice: 80000,
    currency: "BDT",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
  },
];
