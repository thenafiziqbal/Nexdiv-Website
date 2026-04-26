"use client";

import { useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection, AdminCard } from "@/components/admin/Section";
import { useList } from "@/hooks/useFirebase";
import { updateItem, deleteItem } from "@/lib/firebase-data";
import { CheckCircle2, XCircle, Trash2, Filter } from "lucide-react";
import { formatBDT } from "@/lib/utils";

type Order = {
  id: string;
  orderId?: string;
  type?: string;
  selected?: string;
  amount?: number;
  name?: string;
  email?: string;
  phone?: string;
  method?: string;
  trxId?: string;
  senderNumber?: string;
  notes?: string;
  status?: "pending_verification" | "verified" | "rejected";
  createdAt?: number;
};

const statusColor: Record<string, string> = {
  pending_verification: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  verified: "bg-green-500/15 text-green-300 border-green-500/30",
  rejected: "bg-red-500/15 text-red-300 border-red-500/30",
};

function Inner() {
  const { data, loading } = useList<Order>("orders");
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all"
    ? data
    : data.filter((o) => (o.status ?? "pending_verification") === filter);

  const sorted = [...filtered].sort(
    (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
  );

  const updateStatus = async (id: string, status: Order["status"]) => {
    await updateItem("orders", id, { status });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    await deleteItem("orders", id);
  };

  return (
    <AdminSection
      title="Orders"
      description="Verify payment submissions and manage order status."
      action={
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-white/60" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg bg-brand-night/60 border border-white/15 px-3 py-2 text-xs text-white"
          >
            <option value="all">All</option>
            <option value="pending_verification">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      }
    >
      {loading && <p className="text-sm text-white/55">Loading…</p>}
      {!loading && sorted.length === 0 && (
        <AdminCard><p className="text-white/60 text-sm">No orders.</p></AdminCard>
      )}

      <div className="space-y-3">
        {sorted.map((o) => {
          const status = o.status ?? "pending_verification";
          return (
            <AdminCard key={o.id}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${statusColor[status]}`}>
                      {status.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono text-brand-neon">
                      {o.orderId ?? o.id}
                    </span>
                    <span className="text-xs text-white/45 ml-auto">
                      {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
                    </span>
                  </div>
                  <h4 className="mt-2 text-lg font-bold">
                    {o.name} <span className="text-white/55 font-normal text-sm">· {o.email} · {o.phone}</span>
                  </h4>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <Field label="Type" v={o.type} />
                    <Field label="Selected" v={o.selected || "—"} />
                    <Field label="Amount" v={o.amount ? formatBDT(o.amount) : "—"} highlight />
                    <Field label="Method" v={(o.method ?? "").toUpperCase()} />
                    <Field label="TrxID" v={o.trxId} mono />
                    <Field label="Sender" v={o.senderNumber || "—"} mono />
                  </div>
                  {o.notes && (
                    <p className="mt-3 text-xs text-white/65 italic">&ldquo;{o.notes}&rdquo;</p>
                  )}
                </div>
                <div className="flex lg:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => updateStatus(o.id, "verified")}
                    disabled={status === "verified"}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/15 text-green-300 text-xs font-semibold hover:bg-green-500/25 disabled:opacity-40"
                  >
                    <CheckCircle2 size={12} /> Verify
                  </button>
                  <button
                    onClick={() => updateStatus(o.id, "rejected")}
                    disabled={status === "rejected"}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/15 text-red-300 text-xs font-semibold hover:bg-red-500/25 disabled:opacity-40"
                  >
                    <XCircle size={12} /> Reject
                  </button>
                  <button
                    onClick={() => remove(o.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-white/60 text-xs font-semibold hover:bg-white/10"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>
    </AdminSection>
  );
}

function Field({ label, v, mono, highlight }: { label: string; v?: string | number; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/45">{label}</p>
      <p className={`mt-0.5 ${mono ? "font-mono" : ""} ${highlight ? "text-brand-neon font-bold" : "text-white/85"}`}>
        {v}
      </p>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
