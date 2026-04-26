"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={42} className="mx-auto text-brand-neon mb-3" />
        <h3 className="text-xl font-bold text-white">Message received!</h3>
        <p className="mt-1 text-white/70 text-sm">
          We&apos;ll reach out within 1 business hour.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 px-4 py-2 rounded-xl glass-strong text-sm font-semibold hover:bg-brand-blue/20"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="text-2xl font-bold neon-text">Send a message</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Subject" name="subject" />
      </div>
      <Field label="Message" name="message" textarea required />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-mint text-brand-night font-semibold disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"} <Send size={14} />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const className =
    "mt-1.5 w-full rounded-xl bg-brand-night/60 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20 transition";
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}{required && <span className="text-brand-neon"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={className} />
      ) : (
        <input name={name} type={type} required={required} className={className} />
      )}
    </label>
  );
}
