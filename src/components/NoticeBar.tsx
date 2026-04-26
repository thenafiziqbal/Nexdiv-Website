import { Megaphone } from "lucide-react";

export function NoticeBar({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="relative bg-gradient-to-r from-brand-blue/30 via-brand-mint/20 to-brand-neon/30 border-b border-brand-neon/30 text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex items-center justify-center gap-2">
        <Megaphone size={14} className="text-brand-neon shrink-0" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
