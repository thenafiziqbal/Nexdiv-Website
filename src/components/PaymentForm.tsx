"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { formatBDT } from "@/lib/utils";

type Item = { slug: string; name?: string; title?: string; price: number };

export function PaymentForm({
  packages,
  services,
}: {
  packages: Item[];
  services: Item[];
}) {
  const params = useSearchParams();
  const [type, setType] = useState<"package" | "service" | "custom">("package");
  const [selected, setSelected] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const pkg = params.get("package");
    const svc = params.get("service");
    if (pkg) {
      setType("package");
      setSelected(pkg);
      const p = packages.find((x) => x.slug === pkg);
      if (p) setAmount(p.price);
    } else if (svc) {
      setType("service");
      setSelected(svc);
      const s = services.find((x) => x.slug === svc);
      if (s) setAmount(s.price);
    }
  }, [params, packages, services]);

  const onSelectChange = (val: string) => {
    setSelected(val);
    if (type === "package") {
      const p = packages.find((x) => x.slug === val);
      if (p) setAmount(p.price);
    } else if (type === "service") {
      const s = services.find((x) => x.slug === val);
      if (s) setAmount(s.price);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const newId = `NXD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const data = {
      ...Object.fromEntries(fd.entries()),
      type,
      selected,
      amount,
      orderId: newId,
      status: "pending_verification" as const,
      createdAt: Date.now(),
    };
    try {
      const { createItem } = await import("@/lib/firebase-data");
      await createItem("orders", data);
      setOrderId(newId);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={42} className="mx-auto text-brand-neon mb-3" />
        <h3 className="text-xl font-bold text-white">Payment submitted!</h3>
        <p className="mt-1 text-white/70 text-sm">
          Order ID: <span className="font-mono text-brand-neon">{orderId}</span>
        </p>
        <p className="mt-2 text-sm text-white/65 max-w-md mx-auto">
          We&apos;re verifying your transaction. You&apos;ll receive a confirmation email/SMS within 1-2 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="text-2xl font-bold neon-text flex items-center gap-2">
        <CreditCard size={22} /> Submit your payment
      </h3>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">What are you paying for?</span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["package", "service", "custom"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => {
                setType(t);
                setSelected("");
                if (t === "custom") setAmount(0);
              }}
              className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                type === t
                  ? "bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night"
                  : "glass-strong text-white hover:bg-brand-blue/20"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {type !== "custom" && (
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Choose {type}
          </span>
          <select
            required
            value={selected}
            onChange={(e) => onSelectChange(e.target.value)}
            className="mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
          >
            <option value="">— Select —</option>
            {(type === "package" ? packages : services).map((it) => (
              <option key={it.slug} value={it.slug}>
                {it.name ?? it.title} — {formatBDT(it.price)}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Amount (BDT) <span className="text-brand-neon">*</span>
        </span>
        <input
          required
          type="number"
          min={1}
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Your name" name="name" required />
        <Input label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Phone" name="phone" type="tel" required />
        <Select
          label="Payment method"
          name="method"
          required
          options={[
            { value: "bkash", label: "bKash" },
            { value: "nagad", label: "Nagad" },
            { value: "rocket", label: "Rocket" },
            { value: "bank", label: "Bank Transfer" },
          ]}
        />
      </div>
      <Input
        label="Sender (bKash/Nagad/Rocket) number"
        name="senderNumber"
        placeholder="01XXXXXXXXX"
      />
      <Input
        label="Transaction ID (TrxID)"
        name="trxId"
        required
        placeholder="e.g. 8N7K9XYZAB"
      />
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Notes (optional)
        </span>
        <textarea
          name="notes"
          rows={3}
          className="mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold disabled:opacity-60 animate-glow"
      >
        {status === "loading" ? "Submitting…" : "Submit payment for verification"}
      </button>
      <p className="text-xs text-white/50 text-center">
        We verify the transaction ID with the operator. You&apos;ll be notified within 1-2 hours.
      </p>
    </form>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
        {rest.required && <span className="text-brand-neon"> *</span>}
      </span>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-neon"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
        {required && <span className="text-brand-neon"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        className="mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-neon"
        defaultValue=""
      >
        <option value="" disabled>— Select —</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
