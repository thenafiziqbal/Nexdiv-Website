"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection, AdminCard } from "@/components/admin/Section";
import { useList } from "@/hooks/useFirebase";
import { deleteItem, updateItem } from "@/lib/firebase-data";
import { Trash2, CheckCircle2 } from "lucide-react";

type Message = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  read?: boolean;
  createdAt?: number;
};

function Inner() {
  const { data, loading } = useList<Message>("messages");
  const sorted = [...data].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  return (
    <AdminSection title="Messages" description="Inbox of contact form submissions.">
      {loading && <p className="text-sm text-white/55">Loading…</p>}
      {!loading && sorted.length === 0 && (
        <AdminCard><p className="text-white/60 text-sm">No messages yet.</p></AdminCard>
      )}

      <div className="space-y-3">
        {sorted.map((m) => (
          <AdminCard key={m.id}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {!m.read && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-night bg-brand-neon px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                  <span className="text-xs text-white/45 ml-auto">
                    {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                  </span>
                </div>
                <h4 className="mt-2 text-lg font-bold">
                  {m.name}{" "}
                  <span className="text-white/55 font-normal text-sm">
                    · <a href={`mailto:${m.email}`} className="hover:text-brand-neon">{m.email}</a>
                    {m.phone && <> · {m.phone}</>}
                  </span>
                </h4>
                {m.subject && (
                  <p className="text-sm text-white/75 font-medium mt-1">Subject: {m.subject}</p>
                )}
                <p className="mt-2 text-sm text-white/80 whitespace-pre-wrap">{m.message}</p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                {!m.read && (
                  <button
                    onClick={() => updateItem("messages", m.id, { read: true })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/15 text-green-300 text-xs font-semibold"
                  >
                    <CheckCircle2 size={12} /> Mark read
                  </button>
                )}
                <button
                  onClick={() => confirm("Delete?") && deleteItem("messages", m.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/15 text-red-300 text-xs font-semibold"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminSection>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
