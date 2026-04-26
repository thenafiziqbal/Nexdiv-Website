"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Wrench,
  Users,
  ShoppingCart,
  Mail,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Home,
  Briefcase,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/tools", label: "Tools & SaaS", icon: Wrench },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky inset-y-0 left-0 z-40 w-64 bg-brand-night/95 backdrop-blur-xl border-r border-white/10 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Logo />
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-white/70"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="px-3 py-4">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Manage
          </p>
          <ul className="space-y-1">
            {links.map((l) => {
              const Icon = l.icon;
              const active = pathname === l.href || (l.href !== "/admin" && pathname?.startsWith(l.href));
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-gradient-to-r from-brand-blue/30 to-brand-mint/20 text-white border border-brand-neon/40"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon size={16} />
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5"
            >
              <Home size={16} /> View live site
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </nav>

        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-brand-night/80">
            <div className="text-xs text-white/50">Signed in as</div>
            <div className="text-sm font-medium text-white truncate">{user.email}</div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 bg-brand-night/80 backdrop-blur-xl border-b border-white/10">
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-white/80"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold neon-text">Admin Panel</h1>
          <div />
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
