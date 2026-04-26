"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection } from "@/components/admin/Section";
import { CrudList } from "@/components/admin/CrudList";
import { TextField, SelectField, ListField } from "@/components/admin/Field";
import { useList } from "@/hooks/useFirebase";
import { Tool } from "@/data/tools";

type T = Tool & { id: string };

function Inner() {
  const { data } = useList<Tool>("tools");
  return (
    <AdminSection
      title="Tools & SaaS"
      description="AI agents, SaaS products, and browser extensions."
    >
      <CrudList<T>
        items={data as T[]}
        collection="tools"
        emptyMessage="No tools yet."
        newItem={() =>
          ({
            id: "",
            slug: "",
            name: "",
            category: "AI Tool",
            short: "",
            description: "",
            features: [],
            demoUrl: "",
            pricing: "",
            cover: "",
            screenshots: [],
          }) as T
        }
        renderRow={(t) => (
          <div className="flex gap-3">
            {t.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.cover} alt={t.name} className="w-20 h-20 rounded-lg object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neon px-2 py-0.5 rounded-full glass">
                {t.category}
              </span>
              <h4 className="font-bold mt-1.5 truncate">{t.name}</h4>
              <p className="text-xs text-white/60 line-clamp-2 mt-1">{t.short}</p>
              <p className="text-xs text-white/55 mt-1">{t.pricing}</p>
            </div>
          </div>
        )}
        renderForm={(state, setState) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Slug" required value={state.slug} onChange={(e) => setState({ ...state, slug: e.target.value })} />
            <TextField label="Name" required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
            <SelectField
              label="Category"
              required
              value={state.category}
              onChange={(e) => setState({ ...state, category: e.target.value as T["category"] })}
              options={[
                { value: "AI Agent", label: "AI Agent" },
                { value: "AI Tool", label: "AI Tool" },
                { value: "SaaS", label: "SaaS" },
                { value: "Browser Extension", label: "Browser Extension" },
              ]}
            />
            <TextField label="Pricing label" value={state.pricing} onChange={(e) => setState({ ...state, pricing: e.target.value })} />
            <TextField label="Short tagline" required className="sm:col-span-2" value={state.short} onChange={(e) => setState({ ...state, short: e.target.value })} />
            <TextField label="Description" textarea rows={4} required className="sm:col-span-2" value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} />
            <TextField label="Demo URL" required value={state.demoUrl} onChange={(e) => setState({ ...state, demoUrl: e.target.value })} />
            <TextField label="Cover image URL" required value={state.cover} onChange={(e) => setState({ ...state, cover: e.target.value })} />
            <TextField label="Video URL (optional)" className="sm:col-span-2" value={state.video ?? ""} onChange={(e) => setState({ ...state, video: e.target.value })} />
            <div className="sm:col-span-2">
              <ListField
                label="Features"
                values={state.features ?? []}
                onChange={(v) => setState({ ...state, features: v })}
              />
            </div>
            <div className="sm:col-span-2">
              <ListField
                label="Screenshots (image URLs)"
                values={state.screenshots ?? []}
                onChange={(v) => setState({ ...state, screenshots: v })}
                placeholder="https://..."
              />
            </div>
          </div>
        )}
        onSaveTransform={(state) => ({
          ...state,
          features: (state.features ?? []).filter((f) => f.trim()),
          screenshots: (state.screenshots ?? []).filter((s) => s.trim()),
        })}
      />
    </AdminSection>
  );
}

export default function AdminToolsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
