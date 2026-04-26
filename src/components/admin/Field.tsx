"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const inputCls =
  "mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20 transition";

export function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
      {children}
      {required && <span className="text-brand-neon"> *</span>}
    </span>
  );
}

export function TextField({
  label,
  required,
  textarea,
  rows = 3,
  className,
  ...props
}: {
  label: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>) {
  return (
    <label className={cn("block", className)}>
      <Label required={required}>{label}</Label>
      {textarea ? (
        <textarea {...props} required={required} rows={rows} className={inputCls} />
      ) : (
        <input {...props} required={required} className={inputCls} />
      )}
    </label>
  );
}

export function NumberField({
  label,
  required,
  className,
  ...props
}: {
  label: string;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("block", className)}>
      <Label required={required}>{label}</Label>
      <input {...props} type="number" required={required} className={inputCls} />
    </label>
  );
}

export function SelectField({
  label,
  required,
  options,
  className,
  ...props
}: {
  label: string;
  required?: boolean;
  options: { value: string; label: string }[];
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className={cn("block", className)}>
      <Label required={required}>{label}</Label>
      <select {...props} required={required} className={inputCls}>
        <option value="" disabled>— Select —</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

export function ListField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
              placeholder={placeholder}
              className={inputCls + " mt-0"}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="px-3 rounded-xl bg-red-500/15 text-red-300 text-xs font-semibold hover:bg-red-500/25"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="text-xs font-semibold text-brand-neon hover:underline"
        >
          + Add item
        </button>
      </div>
    </div>
  );
}

export const inputClassName = inputCls;
