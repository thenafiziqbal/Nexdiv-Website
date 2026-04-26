"use client";

import { useValue } from "./useFirebase";
import { defaultSettings, Settings } from "@/lib/defaults";

export function useSettings(): Settings {
  const { data } = useValue<Partial<Settings>>("settings", defaultSettings);
  return { ...defaultSettings, ...(data ?? {}) } as Settings;
}
