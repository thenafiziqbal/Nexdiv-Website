"use client";

import { useList } from "./useFirebase";
import { Service, services as defaultServices } from "@/data/services";
import { Tool, tools as defaultTools } from "@/data/tools";
import { Package as Pkg, packages as defaultPkgs } from "@/data/packages";
import { TeamMember, team as defaultTeam } from "@/data/team";

export function useServices(): Service[] {
  const { data } = useList<Service>("services", defaultServices.map((s) => ({ ...s, id: s.slug })));
  return data as Service[];
}

export function useTools(): Tool[] {
  const { data } = useList<Tool>("tools", defaultTools.map((t) => ({ ...t, id: t.slug })));
  return data as Tool[];
}

export function usePackages(): Pkg[] {
  const { data } = useList<Pkg>("packages", defaultPkgs.map((p) => ({ ...p, id: p.slug })));
  return data as Pkg[];
}

export function useTeam(): TeamMember[] {
  const { data } = useList<TeamMember>("team", defaultTeam.map((m) => ({ ...m, id: m.slug })));
  return data as TeamMember[];
}
