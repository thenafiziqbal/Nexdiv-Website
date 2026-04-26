"use client";

import {
  ref,
  onValue,
  push,
  set,
  update,
  remove,
  serverTimestamp,
  DataSnapshot,
} from "firebase/database";
import { firebaseDb } from "./firebase";

export type FBList<T> = Record<string, T & { id: string }>;

function snapshotToList<T>(snap: DataSnapshot): (T & { id: string })[] {
  const val = snap.val() as Record<string, T> | null;
  if (!val) return [];
  return Object.entries(val).map(([id, v]) => ({ ...(v as object), id } as T & { id: string }));
}

export function subscribeList<T>(
  path: string,
  cb: (items: (T & { id: string })[]) => void,
  errorCb?: (err: Error) => void
) {
  const r = ref(firebaseDb(), path);
  const off = onValue(
    r,
    (snap) => cb(snapshotToList<T>(snap)),
    (err) => errorCb?.(err as Error)
  );
  return () => off();
}

export function subscribeValue<T>(
  path: string,
  cb: (val: T | null) => void,
  errorCb?: (err: Error) => void
) {
  const r = ref(firebaseDb(), path);
  const off = onValue(
    r,
    (snap) => cb((snap.val() as T) ?? null),
    (err) => errorCb?.(err as Error)
  );
  return () => off();
}

export async function createItem<T extends object>(path: string, data: T) {
  const r = push(ref(firebaseDb(), path));
  const payload = { ...data, createdAt: serverTimestamp() };
  await set(r, payload);
  return r.key as string;
}

export async function updateItem(path: string, id: string, data: Record<string, unknown>) {
  await update(ref(firebaseDb(), `${path}/${id}`), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItem(path: string, id: string) {
  await remove(ref(firebaseDb(), `${path}/${id}`));
}

export async function setValue(path: string, value: unknown) {
  await set(ref(firebaseDb(), path), value);
}
