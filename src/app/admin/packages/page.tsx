"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection } from "@/components/admin/Section";
import { CrudList } from "@/components/admin/CrudList";
import { TextField, NumberField, SelectField, ListField } from "@/components/admin/Field";
import { useList } from "@/hooks/useFirebase";
import { Package as Pkg } from "@/data/packages";
import { formatBDT } from "@/lib/utils";

type P = Pkg & { id: string; pages: number | "unlimited" };

function Inner() {
  const { data } = useList<Pkg>("packages");
  return (
    <AdminSection
      title="Packages"
      description="Pricing tiers users see on the Packages page."
    >
      <CrudList<P>
        items={data as P[]}
        collection="packages"
        emptyMessage="No packages yet."
        newItem={() =>
          ({
            id: "",
            slug: "",
            name: "",
            category: "Website",
            pages: 5,
            price: 0,
            currency: "BDT",
            features: [],
            delivery: "7 days",
          }) as P
        }
        renderRow={(p) => (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neon px-2 py-0.5 rounded-full glass">
                {p.category}
              </span>
              {p.popular && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-night bg-brand-neon px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <h4 className="font-bold mt-2">{p.name}</h4>
            <p className="text-sm text-brand-neon font-bold mt-1">{formatBDT(p.price)}</p>
            <p className="text-xs text-white/50 mt-1">
              {p.pages === "unlimited" ? "Unlimited pages" : p.pages > 0 ? `${p.pages} pages` : ""}
              {p.delivery ? ` · ${p.delivery}` : ""}
            </p>
          </div>
        )}
        renderForm={(state, setState) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Slug"
              required
              value={state.slug}
              onChange={(e) => setState({ ...state, slug: e.target.value })}
            />
            <TextField
              label="Name"
              required
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
            <SelectField
              label="Category"
              required
              value={state.category}
              onChange={(e) =>
                setState({ ...state, category: e.target.value as P["category"] })
              }
              options={[
                { value: "Website", label: "Website" },
                { value: "E-commerce", label: "E-commerce" },
                { value: "Marketing", label: "Marketing" },
                { value: "AI", label: "AI" },
              ]}
            />
            <TextField
              label="Pages (number or 'unlimited')"
              value={String(state.pages)}
              onChange={(e) => {
                const v = e.target.value;
                setState({
                  ...state,
                  pages: v === "unlimited" ? "unlimited" : Number(v) || 0,
                });
              }}
            />
            <NumberField
              label="Price (BDT)"
              required
              value={state.price}
              onChange={(e) => setState({ ...state, price: Number(e.target.value) })}
            />
            <TextField
              label="Delivery time"
              value={state.delivery}
              onChange={(e) => setState({ ...state, delivery: e.target.value })}
            />
            <label className="flex items-center gap-2 sm:col-span-2 mt-1">
              <input
                type="checkbox"
                checked={state.popular ?? false}
                onChange={(e) => setState({ ...state, popular: e.target.checked })}
                className="w-4 h-4 accent-brand-neon"
              />
              <span className="text-sm text-white/80">Mark as Popular</span>
            </label>
            <div className="sm:col-span-2">
              <ListField
                label="Features"
                values={state.features ?? []}
                onChange={(v) => setState({ ...state, features: v })}
              />
            </div>
          </div>
        )}
        onSaveTransform={(state) => ({
          ...state,
          features: (state.features ?? []).filter((f) => f.trim()),
        })}
      />
    </AdminSection>
  );
}

export default function AdminPackagesPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
