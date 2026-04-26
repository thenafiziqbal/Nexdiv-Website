"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/admin");
  }, [user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size={44} />
        </div>
        <div className="rounded-2xl glass-strong p-7 sm:p-9 neon-border">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-center">
            <span className="neon-text">Admin Login</span>
          </h1>
          <p className="mt-2 text-sm text-white/60 text-center">
            Sign in to manage your Nexdiv site.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Email</span>
              <div className="mt-1.5 relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-brand-night/60 border border-white/15 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
                  placeholder="admin@nexdiv.com"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Password</span>
              <div className="mt-1.5 relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-brand-night/60 border border-white/15 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
                  placeholder="••••••••"
                />
              </div>
            </label>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold disabled:opacity-60 animate-glow"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-xs text-white/45 text-center leading-relaxed">
            Create the admin user in Firebase Console first → Authentication → Users → Add user.
          </p>
        </div>
      </div>
    </div>
  );
}
