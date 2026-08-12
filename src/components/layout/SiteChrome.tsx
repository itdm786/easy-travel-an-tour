"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <LoadingScreen />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChatWidget />
      <FloatingButtons />
    </>
  );
}
