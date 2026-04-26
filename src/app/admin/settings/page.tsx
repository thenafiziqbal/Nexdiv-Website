"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection, AdminCard } from "@/components/admin/Section";
import { TextField } from "@/components/admin/Field";
import { useValue } from "@/hooks/useFirebase";
import { setValue } from "@/lib/firebase-data";
import { defaultSettings, Settings } from "@/lib/defaults";
import { Save } from "lucide-react";

function Inner() {
  const { data: remote, loading } = useValue<Settings>("settings", defaultSettings);
  const [s, setS] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (remote) setS({ ...defaultSettings, ...remote });
  }, [remote]);

  const save = async () => {
    setSaving(true);
    setMsg(null);
    setError(null);
    try {
      await setValue("settings", s);
      setMsg("Saved! Changes are live on the user site.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-white/55">Loading settings…</p>;

  return (
    <AdminSection
      title="Site Settings"
      description="Everything users see can be edited here. Changes apply immediately."
      action={
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm disabled:opacity-60 animate-glow"
        >
          <Save size={14} /> {saving ? "Saving…" : "Save changes"}
        </button>
      }
    >
      {msg && <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-sm text-green-300">{msg}</div>}
      {error && <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">{error}</div>}

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Brand</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Site name" value={s.siteName} onChange={(e) => setS({ ...s, siteName: e.target.value })} />
          <TextField label="Tagline" value={s.tagline} onChange={(e) => setS({ ...s, tagline: e.target.value })} />
          <TextField label="Description" textarea rows={3} className="sm:col-span-2" value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} />
          <TextField label="Logo URL (optional)" className="sm:col-span-2" value={s.logo} onChange={(e) => setS({ ...s, logo: e.target.value })} placeholder="https://..." />
        </div>
      </AdminCard>

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Color theme</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorField label="Primary" value={s.colors.primary} onChange={(v) => setS({ ...s, colors: { ...s.colors, primary: v } })} />
          <ColorField label="Accent" value={s.colors.accent} onChange={(v) => setS({ ...s, colors: { ...s.colors, accent: v } })} />
          <ColorField label="Neon" value={s.colors.neon} onChange={(v) => setS({ ...s, colors: { ...s.colors, neon: v } })} />
        </div>
      </AdminCard>

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Notice bar (top of site)</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={s.notice.enabled}
              onChange={(e) => setS({ ...s, notice: { ...s.notice, enabled: e.target.checked } })}
              className="w-4 h-4 accent-brand-neon"
            />
            <span className="text-sm">Show notice bar</span>
          </label>
          <TextField
            label="Notice message"
            value={s.notice.message}
            onChange={(e) => setS({ ...s, notice: { ...s.notice, message: e.target.value } })}
          />
        </div>
      </AdminCard>

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Hero (homepage)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Hero video URL" className="sm:col-span-2" value={s.hero.video} onChange={(e) => setS({ ...s, hero: { ...s.hero, video: e.target.value } })} />
          <TextField label="Hero poster image URL" className="sm:col-span-2" value={s.hero.poster} onChange={(e) => setS({ ...s, hero: { ...s.hero, poster: e.target.value } })} />
        </div>
      </AdminCard>

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Contact info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Email" type="email" value={s.contact.email} onChange={(e) => setS({ ...s, contact: { ...s.contact, email: e.target.value } })} />
          <TextField label="Phone" value={s.contact.phone} onChange={(e) => setS({ ...s, contact: { ...s.contact, phone: e.target.value } })} />
          <TextField label="WhatsApp" value={s.contact.whatsapp} onChange={(e) => setS({ ...s, contact: { ...s.contact, whatsapp: e.target.value } })} />
          <TextField label="Address" value={s.contact.address} onChange={(e) => setS({ ...s, contact: { ...s.contact, address: e.target.value } })} />
        </div>
      </AdminCard>

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Social links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Facebook" value={s.socials.facebook} onChange={(e) => setS({ ...s, socials: { ...s.socials, facebook: e.target.value } })} />
          <TextField label="Twitter" value={s.socials.twitter} onChange={(e) => setS({ ...s, socials: { ...s.socials, twitter: e.target.value } })} />
          <TextField label="Instagram" value={s.socials.instagram} onChange={(e) => setS({ ...s, socials: { ...s.socials, instagram: e.target.value } })} />
          <TextField label="LinkedIn" value={s.socials.linkedin} onChange={(e) => setS({ ...s, socials: { ...s.socials, linkedin: e.target.value } })} />
          <TextField label="YouTube" value={s.socials.youtube} onChange={(e) => setS({ ...s, socials: { ...s.socials, youtube: e.target.value } })} />
          <TextField label="GitHub" value={s.socials.github} onChange={(e) => setS({ ...s, socials: { ...s.socials, github: e.target.value } })} />
        </div>
      </AdminCard>

      <AdminCard>
        <h3 className="text-lg font-bold mb-4">Payment numbers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="bKash number" value={s.payment.bkash} onChange={(e) => setS({ ...s, payment: { ...s.payment, bkash: e.target.value } })} />
          <TextField label="Nagad number" value={s.payment.nagad} onChange={(e) => setS({ ...s, payment: { ...s.payment, nagad: e.target.value } })} />
          <TextField label="Rocket number" value={s.payment.rocket} onChange={(e) => setS({ ...s, payment: { ...s.payment, rocket: e.target.value } })} />
          <TextField label="Bank name" value={s.payment.bankName} onChange={(e) => setS({ ...s, payment: { ...s.payment, bankName: e.target.value } })} />
          <TextField label="Bank account #" value={s.payment.bankAccount} onChange={(e) => setS({ ...s, payment: { ...s.payment, bankAccount: e.target.value } })} />
          <TextField label="Bank branch" value={s.payment.bankBranch} onChange={(e) => setS({ ...s, payment: { ...s.payment, bankBranch: e.target.value } })} />
        </div>
      </AdminCard>

      <div className="flex justify-end pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm disabled:opacity-60"
        >
          <Save size={14} /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </AdminSection>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{label}</span>
      <div className="mt-1.5 flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 rounded-lg cursor-pointer border border-white/15 bg-transparent"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-xl bg-brand-night/60 border border-white/15 px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-brand-neon"
        />
      </div>
    </label>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
