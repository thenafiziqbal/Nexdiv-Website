import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { PaymentForm } from "@/components/PaymentForm";
import { siteConfig } from "@/lib/site";
import { packages } from "@/data/packages";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Payment",
  description: "Pay for your Nexdiv package or service.",
};

export default function PaymentPage() {
  return (
    <Section className="pt-32">
      <SectionHeader
        eyebrow="Payment"
        title="Complete your order"
        subtitle="Pay via bKash, Nagad, Rocket or bank transfer. Send the transaction ID below — we verify within 1-2 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <Method
            label="bKash"
            number={siteConfig.payment.bkash}
            instruction="Send Money → use our bKash number → copy TrxID below"
            color="from-pink-500/30 to-rose-500/20"
          />
          <Method
            label="Nagad"
            number={siteConfig.payment.nagad}
            instruction="Send Money → use our Nagad number → copy TrxID below"
            color="from-orange-500/30 to-yellow-500/20"
          />
          <Method
            label="Rocket"
            number={siteConfig.payment.rocket}
            instruction="Send Money → use our Rocket number → copy TrxID below"
            color="from-purple-500/30 to-violet-500/20"
          />
          <div className="rounded-2xl glass-strong p-6 neon-border">
            <h4 className="font-bold text-white">Bank Transfer</h4>
            <p className="mt-2 text-sm text-white/70">
              <span className="block">{siteConfig.payment.bank.name}</span>
              <span className="block">A/C: {siteConfig.payment.bank.account}</span>
              <span className="block">Branch: {siteConfig.payment.bank.branch}</span>
            </p>
          </div>
        </aside>

        <div className="lg:col-span-2">
          <div className="rounded-2xl glass-strong p-6 sm:p-8 neon-border">
            <Suspense fallback={<div className="text-white/60 text-sm">Loading payment form…</div>}>
              <PaymentForm
                packages={packages.map((p) => ({ slug: p.slug, name: p.name, price: p.price }))}
                services={services.map((s) => ({ slug: s.slug, title: s.title, price: s.startingPrice }))}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Method({
  label,
  number,
  instruction,
  color,
}: {
  label: string;
  number: string;
  instruction: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl glass-strong p-6 neon-border relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-50 -z-0`} />
      <div className="relative">
        <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
        <p className="mt-1 text-xl font-black neon-text">{number}</p>
        <p className="mt-2 text-xs text-white/70 leading-relaxed">{instruction}</p>
      </div>
    </div>
  );
}
