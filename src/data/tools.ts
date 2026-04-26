export type Tool = {
  slug: string;
  name: string;
  category: "AI Agent" | "AI Tool" | "SaaS" | "Browser Extension";
  short: string;
  description: string;
  features: string[];
  demoUrl: string;
  pricing: string;
  cover: string;
  screenshots: string[];
  video?: string;
};

export const tools: Tool[] = [
  {
    slug: "nexdiv-ai-writer",
    name: "Nexdiv AI Writer",
    category: "AI Tool",
    short: "Bangla + English AI content writer trained for local market.",
    description:
      "Generate high-converting blog posts, ad copy, product descriptions and social posts in Bangla and English. Fine-tuned on Bangladeshi market context.",
    features: [
      "100+ templates",
      "Bangla + English fluency",
      "Brand voice memory",
      "Plagiarism check built-in",
      "1-click publish to WordPress",
    ],
    demoUrl: "https://writer.nexdiv.com",
    pricing: "৳ 499 / month",
    cover:
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=1600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1675557009285-c7e0fef5b2e1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "nexdiv-support-agent",
    name: "Nexdiv Support Agent",
    category: "AI Agent",
    short: "AI customer support agent that lives on your website 24/7.",
    description:
      "Train it on your FAQs, products, and policies. It handles support, qualifies leads, and books meetings — in Bangla & English.",
    features: [
      "Multilingual (Bangla + English)",
      "Train on PDFs, URLs, docs",
      "Live human handover",
      "Messenger + WhatsApp + Web",
      "CRM integration",
    ],
    demoUrl: "https://support.nexdiv.com",
    pricing: "৳ 1,500 / month",
    cover:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "nexdiv-seo-suite",
    name: "Nexdiv SEO Suite",
    category: "SaaS",
    short: "All-in-one SEO toolkit for Bangladeshi marketers.",
    description:
      "Keyword research, rank tracking, on-page audit, backlink analyzer — everything an SEO needs in one dashboard.",
    features: [
      "Bangla keyword database",
      "Rank tracking (Google.com.bd)",
      "On-page audit",
      "Competitor analysis",
      "White-label reports",
    ],
    demoUrl: "https://seo.nexdiv.com",
    pricing: "৳ 2,500 / month",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "nexdiv-scraper-extension",
    name: "Nexdiv Scraper",
    category: "Browser Extension",
    short: "1-click web scraper for any website.",
    description:
      "Point and click to extract structured data from any website. Export to CSV, Sheets, Notion. AI-powered field detection.",
    features: [
      "Visual point-and-click",
      "AI field detection",
      "Schedule recurring scrapes",
      "Export CSV / Sheets / Notion",
      "Bypass simple anti-bot",
    ],
    demoUrl: "https://chrome.google.com/webstore",
    pricing: "Free + Pro ৳ 999/mo",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "nexdiv-sales-agent",
    name: "Nexdiv Sales Agent",
    category: "AI Agent",
    short: "AI SDR that books meetings while you sleep.",
    description:
      "Outbound AI sales agent — finds leads, personalizes outreach, follows up, books meetings. CRM-native.",
    features: [
      "LinkedIn + email outreach",
      "Personalized at scale",
      "Auto follow-ups",
      "Calendar integration",
      "Pipeline analytics",
    ],
    demoUrl: "https://sales.nexdiv.com",
    pricing: "৳ 5,000 / month",
    cover:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "nexdiv-invoice",
    name: "Nexdiv Invoice",
    category: "SaaS",
    short: "Invoicing & billing tool for freelancers and SMBs.",
    description:
      "Send beautiful invoices, accept bKash/Nagad/cards, track expenses, generate VAT reports.",
    features: [
      "Bangla + English invoices",
      "bKash + Nagad + cards",
      "Recurring billing",
      "VAT-ready",
      "Mobile app",
    ],
    demoUrl: "https://invoice.nexdiv.com",
    pricing: "Free + Pro ৳ 799/mo",
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];
