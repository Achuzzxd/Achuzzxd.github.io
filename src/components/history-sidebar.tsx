
"use client";

import { useEffect, useState } from "react";
import type { PromptHistoryItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, X } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

type HistorySidebarProps = {
  history: PromptHistoryItem[];
  onSelect: (item: PromptHistoryItem) => void;
  onClear: () => void;
};

export function HistorySidebar({
  history,
  onSelect,
  onClear,
}: HistorySidebarProps) {
  const { setOpenMobile } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || history.length === 0) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <SidebarGroupLabel className="flex items-center gap-2">
            <History className="size-4" />
            Prompt History
          </SidebarGroupLabel>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-7 w-7"
            onClick={() => setOpenMobile(false)}
          >
            <X className="size-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarMenu>
            {history.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => {
                    onSelect(item);
                    setOpenMobile(false);
                  }}
                  className="h-auto py-2 flex-col items-start"
                >
                  <span className="truncate text-sm font-medium w-full">
                    {item.originalPrompt}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.targetLLM} -{" "}
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" size="sm" onClick={onClear}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
