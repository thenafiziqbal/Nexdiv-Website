"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Background } from "./Background";
import { NoticeBar } from "./NoticeBar";
import { useSettings } from "@/hooks/useSettings";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const settings = useSettings();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Background video={settings.hero.video} />
      {settings.notice.enabled && <NoticeBar message={settings.notice.message} />}
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </>
  );
}
