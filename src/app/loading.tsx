import { Skeleton } from "@/components/ui/skeleton";
import { BotMessageSquare, History } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <BotMessageSquare className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Prompt Engineer</span>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </header>
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <main className="flex flex-col gap-8">
          <div className="w-full">
            <Skeleton className="h-10 w-48 mb-4" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-10 w-full mt-4" />
            <Skeleton className="h-10 w-32 mt-4" />
          </div>
        </main>
      </div>
    </div>
  );
}
