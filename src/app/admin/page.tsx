"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  Package as PackageIcon,
  Wrench,
  Users,
  ShoppingCart,
  Mail,
  Database,
  AlertCircle,
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminCard, AdminSection } from "@/components/admin/Section";
import { useList, useValue } from "@/hooks/useFirebase";
import { setValue } from "@/lib/firebase-data";
import {
  defaultServices,
  defaultPackages,
  defaultTools,
  defaultTeam,
  defaultSettings,
  Settings,
} from "@/lib/defaults";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatTile({ icon: Icon, label, value, href }: { icon: any; label: string; value: string | number; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl glass-strong neon-border p-5 hover:bg-brand-blue/10 transition-colors group"
    >
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue/30 to-brand-neon/20 text-brand-neon mb-4 group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </span>
      <div className="text-3xl font-black neon-text">{value}</div>
      <div className="text-xs uppercase tracking-wider text-white/55 mt-1">{label}</div>
    </Link>
  );
}

function DashboardInner() {
  const services = useList("services");
  const packages = useList("packages");
  const tools = useList("tools");
  const team = useList("team");
  const orders = useList<{ status?: string }>("orders");
  const messages = useList("messages");
  const settings = useValue<Settings>("settings");

  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);

  const noData =
    !services.hasFirebaseData &&
    !packages.hasFirebaseData &&
    !tools.hasFirebaseData &&
    !team.hasFirebaseData;

  const seed = async () => {
    setSeeding(true);
    setSeedError(null);
    setSeedMsg(null);
    try {
      const seedObj = (arr: { slug: string }[]) =>
        Object.fromEntries(arr.map((it) => [it.slug, it]));

      await Promise.all([
        setValue("services", seedObj(defaultServices)),
        setValue("packages", seedObj(defaultPackages)),
        setValue("tools", seedObj(defaultTools)),
        setValue("team", seedObj(defaultTeam)),
        setValue("settings", settings.raw ?? defaultSettings),
      ]);
      setSeedMsg("Default data seeded successfully!");
    } catch (e) {
      setSeedError(e instanceof Error ? e.message : "Seed failed — check Firebase rules.");
    } finally {
      setSeeding(false);
    }
  };

  const pendingOrders = orders.data.filter((o) => (o.status ?? "pending_verification") === "pending_verification").length;

  return (
    <AdminSection title="Dashboard" description="Overview of your Nexdiv site">
      {noData && (
        <AdminCard>
          <div className="flex items-start gap-3">
            <AlertCircle className="text-brand-neon shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-bold">Database is empty</h3>
              <p className="text-sm text-white/65 mt-1">
                Click the button below to seed the database with the default services,
                packages, tools, team and site settings. After this, you can edit everything from the admin panel.
              </p>
              <button
                onClick={seed}
                disabled={seeding}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm disabled:opacity-60"
              >
                <Database size={16} />
                {seeding ? "Seeding…" : "Seed default data"}
              </button>
              {seedMsg && <p className="mt-3 text-sm text-brand-neon">{seedMsg}</p>}
              {seedError && (
                <p className="mt-3 text-sm text-red-400">
                  {seedError}
                  <br />
                  <span className="text-white/60">
                    Make sure: (1) you signed in, (2) Realtime Database rules allow auth writes.
                  </span>
                </p>
              )}
            </div>
          </div>
        </AdminCard>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatTile icon={Briefcase} label="Services" value={services.data.length} href="/admin/services" />
        <StatTile icon={PackageIcon} label="Packages" value={packages.data.length} href="/admin/packages" />
        <StatTile icon={Wrench} label="Tools" value={tools.data.length} href="/admin/tools" />
        <StatTile icon={Users} label="Team" value={team.data.length} href="/admin/team" />
        <StatTile icon={ShoppingCart} label={`Orders${pendingOrders > 0 ? ` (${pendingOrders} pending)` : ""}`} value={orders.data.length} href="/admin/orders" />
        <StatTile icon={Mail} label="Messages" value={messages.data.length} href="/admin/messages" />
      </div>

      <AdminCard>
        <h3 className="text-lg font-bold">Quick actions</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/admin/services" className="px-4 py-2 rounded-xl glass text-sm font-semibold hover:bg-brand-blue/15">+ Add service</Link>
          <Link href="/admin/packages" className="px-4 py-2 rounded-xl glass text-sm font-semibold hover:bg-brand-blue/15">+ Add package</Link>
          <Link href="/admin/tools" className="px-4 py-2 rounded-xl glass text-sm font-semibold hover:bg-brand-blue/15">+ Add tool</Link>
          <Link href="/admin/team" className="px-4 py-2 rounded-xl glass text-sm font-semibold hover:bg-brand-blue/15">+ Add team member</Link>
          <Link href="/admin/settings" className="px-4 py-2 rounded-xl glass text-sm font-semibold hover:bg-brand-blue/15">Edit site settings</Link>
        </div>
      </AdminCard>
    </AdminSection>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminLayout>
        <DashboardInner />
      </AdminLayout>
    </AdminGuard>
  );
}
