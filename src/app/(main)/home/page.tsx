import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BotMessageSquare, History } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center gap-12 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
          Welcome to PromptForge AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your ultimate toolkit for crafting, optimizing, and managing high-performance prompts for any Large Language Model.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        <Card className="text-left shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">Optimize Prompts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Tailor your prompts to specific LLMs like Gemini, Claude, or ChatGPT to get the best possible results. Start optimizing now!
            </CardDescription>
             <Button asChild className="mt-4">
                <Link href="/optimize">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-left shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <History className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">View History</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Browse your past prompt optimizations, review the results, and load any previous session to continue your work.
            </CardDescription>
             <Button asChild className="mt-4" variant="secondary">
                <Link href="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-left shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BotMessageSquare className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">What is This?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              PromptForge is an AI-powered tool that helps you engineer better prompts by providing model-specific optimizations and suggestions.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
