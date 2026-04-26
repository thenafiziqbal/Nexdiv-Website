"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection } from "@/components/admin/Section";
import { CrudList } from "@/components/admin/CrudList";
import { TextField, NumberField, ListField } from "@/components/admin/Field";
import { useList } from "@/hooks/useFirebase";
import { Service } from "@/data/services";
import { formatBDT } from "@/lib/utils";

type S = Service & { id: string };

function Inner() {
  const { data } = useList<Service>("services");
  return (
    <AdminSection title="Services" description="Manage everything you offer.">
      <CrudList<S>
        items={data as S[]}
        collection="services"
        emptyMessage="No services yet."
        newItem={() =>
          ({
            id: "",
            slug: "",
            title: "",
            short: "",
            description: "",
            icon: "sparkles",
            features: [],
            startingPrice: 0,
            currency: "BDT",
            image: "",
          }) as S
        }
        renderRow={(s) => (
          <div className="flex gap-3">
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.image} alt={s.title} className="w-20 h-20 rounded-lg object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate">{s.title}</h4>
              <p className="text-xs text-white/60 line-clamp-2 mt-1">{s.short}</p>
              <p className="text-xs text-brand-neon font-semibold mt-1">
                {formatBDT(s.startingPrice)}
              </p>
            </div>
          </div>
        )}
        renderForm={(state, setState) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Slug (URL ID)"
              required
              value={state.slug}
              onChange={(e) => setState({ ...state, slug: e.target.value })}
              placeholder="ai-agent-development"
            />
            <TextField
              label="Title"
              required
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
            <TextField
              label="Short tagline"
              required
              className="sm:col-span-2"
              value={state.short}
              onChange={(e) => setState({ ...state, short: e.target.value })}
            />
            <TextField
              label="Description"
              textarea
              rows={4}
              required
              className="sm:col-span-2"
              value={state.description}
              onChange={(e) => setState({ ...state, description: e.target.value })}
            />
            <TextField
              label="Icon name (lucide-react, e.g. bot, code, search)"
              value={state.icon}
              onChange={(e) => setState({ ...state, icon: e.target.value })}
            />
            <NumberField
              label="Starting price (BDT)"
              required
              value={state.startingPrice}
              onChange={(e) =>
                setState({ ...state, startingPrice: Number(e.target.value) })
              }
            />
            <TextField
              label="Image URL"
              required
              className="sm:col-span-2"
              value={state.image}
              onChange={(e) => setState({ ...state, image: e.target.value })}
              placeholder="https://..."
            />
            <TextField
              label="Video URL (optional)"
              className="sm:col-span-2"
              value={state.video ?? ""}
              onChange={(e) => setState({ ...state, video: e.target.value })}
            />
            <div className="sm:col-span-2">
              <ListField
                label="Features"
                values={state.features ?? []}
                onChange={(v) => setState({ ...state, features: v })}
                placeholder="Mobile responsive"
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

export default function AdminServicesPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
