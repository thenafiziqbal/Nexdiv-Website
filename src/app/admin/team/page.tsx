"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminSection } from "@/components/admin/Section";
import { CrudList } from "@/components/admin/CrudList";
import { TextField } from "@/components/admin/Field";
import { useList } from "@/hooks/useFirebase";
import { TeamMember } from "@/data/team";

type M = TeamMember & { id: string };

function Inner() {
  const { data } = useList<TeamMember>("team");
  return (
    <AdminSection title="Team" description="People shown on the Team page.">
      <CrudList<M>
        items={data as M[]}
        collection="team"
        emptyMessage="No team members yet."
        newItem={() =>
          ({
            id: "",
            slug: "",
            name: "",
            role: "",
            bio: "",
            avatar: "",
            socials: [],
          }) as M
        }
        renderRow={(m) => (
          <div className="flex gap-3 items-center">
            {m.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.avatar} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate">{m.name}</h4>
              <p className="text-xs text-brand-neon">{m.role}</p>
              <p className="text-xs text-white/55 mt-1 line-clamp-2">{m.bio}</p>
            </div>
          </div>
        )}
        renderForm={(state, setState) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Slug" required value={state.slug} onChange={(e) => setState({ ...state, slug: e.target.value })} />
            <TextField label="Full name" required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
            <TextField label="Role" required value={state.role} onChange={(e) => setState({ ...state, role: e.target.value })} />
            <TextField label="Avatar URL" value={state.avatar} onChange={(e) => setState({ ...state, avatar: e.target.value })} />
            <TextField label="Bio" textarea rows={4} className="sm:col-span-2" value={state.bio} onChange={(e) => setState({ ...state, bio: e.target.value })} />

            <div className="sm:col-span-2 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Social links</span>
              {(state.socials ?? []).map((s, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <select
                    value={s.type}
                    onChange={(e) => {
                      const next = [...(state.socials ?? [])];
                      next[i] = { ...next[i], type: e.target.value as "linkedin" | "twitter" | "github" | "facebook" };
                      setState({ ...state, socials: next });
                    }}
                    className="rounded-xl bg-brand-night/60 border border-white/15 px-3 py-2 text-sm text-white"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="github">GitHub</option>
                    <option value="facebook">Facebook</option>
                  </select>
                  <input
                    value={s.url}
                    onChange={(e) => {
                      const next = [...(state.socials ?? [])];
                      next[i] = { ...next[i], url: e.target.value };
                      setState({ ...state, socials: next });
                    }}
                    placeholder="https://"
                    className="col-span-2 rounded-xl bg-brand-night/60 border border-white/15 px-3 py-2 text-sm text-white"
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setState({
                      ...state,
                      socials: [...(state.socials ?? []), { type: "linkedin", url: "" }],
                    })
                  }
                  className="text-xs font-semibold text-brand-neon"
                >
                  + Add social
                </button>
                {(state.socials ?? []).length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setState({ ...state, socials: (state.socials ?? []).slice(0, -1) })
                    }
                    className="text-xs font-semibold text-red-300"
                  >
                    − Remove last
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      />
    </AdminSection>
  );
}

export default function AdminTeamPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}
