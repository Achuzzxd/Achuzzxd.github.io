"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hasHistory = isClient && (localStorage.getItem('prompt-history')?.length ?? 0) > 2;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/5 backdrop-blur-sm">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2">
          {isClient && hasHistory && <SidebarTrigger className="md:hidden" />}
          <Icons.logo className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold font-headline">PromptForge AI</h1>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}