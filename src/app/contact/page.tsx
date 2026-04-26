"use client";

import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { useSettings } from "@/hooks/useSettings";

export default function ContactPage() {
  const settings = useSettings();
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Get in touch"
        title="Let's build something great"
        subtitle="Tell us about your project. We typically reply within 1 business hour."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl glass-strong p-6 neon-border">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-brand-blue/20 text-brand-neon mb-3">
              <Mail size={18} />
            </span>
            <h4 className="font-bold text-white">Email</h4>
            <a href={`mailto:${settings.contact.email}`} className="text-sm text-white/70 hover:text-brand-neon">
              {settings.contact.email}
            </a>
          </div>
          <div className="rounded-2xl glass-strong p-6 neon-border">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-brand-blue/20 text-brand-neon mb-3">
              <Phone size={18} />
            </span>
            <h4 className="font-bold text-white">Phone</h4>
            <a href={`tel:${settings.contact.phone}`} className="text-sm text-white/70 hover:text-brand-neon">
              {settings.contact.phone}
            </a>
          </div>
          <div className="rounded-2xl glass-strong p-6 neon-border">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-brand-blue/20 text-brand-neon mb-3">
              <MessageSquare size={18} />
            </span>
            <h4 className="font-bold text-white">WhatsApp</h4>
            <a
              href={`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-brand-neon"
            >
              {settings.contact.whatsapp}
            </a>
          </div>
          <div className="rounded-2xl glass-strong p-6 neon-border">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-brand-blue/20 text-brand-neon mb-3">
              <MapPin size={18} />
            </span>
            <h4 className="font-bold text-white">Office</h4>
            <p className="text-sm text-white/70">{settings.contact.address}</p>
          </div>
        </aside>

        <div className="lg:col-span-2">
          <div className="rounded-2xl glass-strong p-6 sm:p-8 neon-border">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
