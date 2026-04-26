"use client";

import { ReactNode, useState } from "react";
import { Pencil, Trash2, Plus, X, Save } from "lucide-react";
import { setValue, deleteItem } from "@/lib/firebase-data";
import { AdminCard } from "./Section";

export type CrudItem = { id: string; slug?: string; [k: string]: unknown };

export function CrudList<T extends CrudItem>({
  items,
  collection,
  emptyMessage,
  renderRow,
  renderForm,
  newItem,
  onSaveTransform,
}: {
  items: T[];
  collection: string;
  emptyMessage: string;
  renderRow: (item: T) => ReactNode;
  renderForm: (
    state: T,
    setState: (v: T) => void
  ) => ReactNode;
  newItem: () => T;
  onSaveTransform?: (state: T) => T;
}) {
  const [editing, setEditing] = useState<T | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNew = () => {
    setEditing(newItem());
    setError(null);
  };

  const startEdit = (item: T) => {
    setEditing({ ...item });
    setError(null);
  };

  const cancel = () => setEditing(null);

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    setError(null);
    try {
      const state = onSaveTransform ? onSaveTransform(editing) : editing;
      const slug = (state.slug as string) || state.id || `item-${Date.now()}`;
      const { id: _id, ...rest } = state;
      void _id;
      await setValue(`${collection}/${slug}`, rest);
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (item: T) => {
    if (!confirm(`Delete "${(item.title as string) || (item.name as string) || item.id}"?`)) return;
    try {
      await deleteItem(collection, item.id);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm"
        >
          <Plus size={16} /> Add new
        </button>
      </div>

      {items.length === 0 ? (
        <AdminCard>
          <p className="text-white/60 text-sm">{emptyMessage}</p>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <AdminCard key={item.id} className="flex flex-col gap-3">
              <div className="flex-1">{renderRow(item)}</div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => startEdit(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs font-semibold hover:bg-brand-blue/15"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 text-xs font-semibold hover:bg-red-500/25"
                >
                  <Trash2 size={12} /> Delete
                </button>
                <span className="ml-auto text-[10px] text-white/40 font-mono">{item.id}</span>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-brand-night/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl glass-strong neon-border p-6 sm:p-8 my-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold neon-text">
                {items.find((i) => i.id === editing.id) ? "Edit" : "Add new"}
              </h3>
              <button
                onClick={cancel}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {renderForm(editing, setEditing)}
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/10">
              <button
                onClick={save}
                disabled={busy}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold text-sm disabled:opacity-60"
              >
                <Save size={14} /> {busy ? "Saving…" : "Save"}
              </button>
              <button
                onClick={cancel}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-white text-sm font-semibold hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
