import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "./SocialIcons";
import { Logo } from "./Logo";
import { siteConfig, navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-neon/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={siteConfig.socials.facebook} className="p-2 rounded-lg glass hover:bg-brand-blue/20 transition-colors" aria-label="Facebook"><Facebook size={16} /></a>
              <a href={siteConfig.socials.twitter} className="p-2 rounded-lg glass hover:bg-brand-blue/20 transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
              <a href={siteConfig.socials.instagram} className="p-2 rounded-lg glass hover:bg-brand-blue/20 transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
              <a href={siteConfig.socials.linkedin} className="p-2 rounded-lg glass hover:bg-brand-blue/20 transition-colors" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href={siteConfig.socials.youtube} className="p-2 rounded-lg glass hover:bg-brand-blue/20 transition-colors" aria-label="YouTube"><Youtube size={16} /></a>
              <a href={siteConfig.socials.github} className="p-2 rounded-lg glass hover:bg-brand-blue/20 transition-colors" aria-label="GitHub"><Github size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Pages</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-brand-neon transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/payment" className="text-sm text-white/60 hover:text-brand-neon transition-colors">
                  Make Payment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Services</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services#website-development" className="text-sm text-white/60 hover:text-brand-neon">Website Development</Link></li>
              <li><Link href="/services#ecommerce-development" className="text-sm text-white/60 hover:text-brand-neon">E-commerce</Link></li>
              <li><Link href="/services#ai-agent-development" className="text-sm text-white/60 hover:text-brand-neon">Custom AI Agents</Link></li>
              <li><Link href="/services#digital-marketing" className="text-sm text-white/60 hover:text-brand-neon">Digital Marketing</Link></li>
              <li><Link href="/services#saas-development" className="text-sm text-white/60 hover:text-brand-neon">SaaS Development</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 text-brand-neon" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 text-brand-neon" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white">{siteConfig.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-brand-neon" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Built with <span className="neon-text font-semibold">Next.js</span> · Designed for the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
