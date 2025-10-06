"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";
import { SidebarTrigger } from "@/components/ui/sidebar";

type AppHeaderProps = {
  hasHistory: boolean;
};

export function AppHeader({ hasHistory }: AppHeaderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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