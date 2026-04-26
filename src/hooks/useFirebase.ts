"use client";

import { useEffect, useState } from "react";
import { subscribeList, subscribeValue } from "@/lib/firebase-data";

export function useList<T>(path: string, fallback?: (T & { id: string })[]) {
  const [data, setData] = useState<(T & { id: string })[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const off = subscribeList<T>(
      path,
      (items) => {
        setData(items);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return () => off();
  }, [path]);

  const value = data && data.length > 0 ? data : fallback ?? [];
  return { data: value, raw: data, loading, error, hasFirebaseData: !!(data && data.length > 0) };
}

export function useValue<T>(path: string, fallback?: T) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const off = subscribeValue<T>(
      path,
      (v) => {
        setData(v);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return () => off();
  }, [path]);

  return { data: data ?? fallback ?? null, raw: data, loading, error };
}
