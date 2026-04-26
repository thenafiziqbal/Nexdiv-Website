"use client";

import { ReactNode } from "react";

export function AdminSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            <span className="neon-text">{title}</span>
          </h2>
          {description && (
            <p className="mt-1 text-sm text-white/60">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl glass-strong neon-border p-5 sm:p-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}
