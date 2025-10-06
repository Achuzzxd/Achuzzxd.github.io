import { PromptForge } from "@/components/prompt-forge";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <PromptForge />
    </SidebarProvider>
  );
}
