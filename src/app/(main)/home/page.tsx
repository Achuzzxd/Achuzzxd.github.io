import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BotMessageSquare, History, ArrowRight, User, Cpu, FileText } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center gap-16 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
          Welcome to Prompt Engineer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
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
              Prompt Engineer is an AI-powered tool that helps you engineer better prompts by providing model-specific optimizations and suggestions.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">How It Works</h2>
            <p className="text-muted-foreground mt-2">A simple, powerful workflow to elevate your AI interactions.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2">
                 <div className="absolute top-1/2 left-0 w-1/3 h-full">
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 text-primary" />
                 </div>
                 <div className="absolute top-1/2 left-1/3 w-1/3 h-full">
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 text-primary" />
                 </div>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 text-center z-10">
                <Card className="bg-card/80 w-full">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-3 rounded-full">
                           <User className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground pt-2">Step 1</p>
                        <CardTitle className="font-headline text-lg">Submit Your Prompt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Provide your initial prompt and select the target LLM you want to optimize for.
                        </p>
                    </CardContent>
                </Card>
            </div>
             {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 text-center z-10">
                <Card className="bg-card/80 w-full">
                    <CardHeader>
                         <div className="mx-auto bg-primary/10 p-3 rounded-full">
                           <Cpu className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground pt-2">Step 2</p>
                        <CardTitle className="font-headline text-lg">AI-Powered Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Our AI analyzes your prompt, applying expert techniques to enhance its clarity, specificity, and structure.
                        </p>
                    </CardContent>
                </Card>
            </div>
             {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 text-center z-10">
                <Card className="bg-card/80 w-full">
                    <CardHeader>
                         <div className="mx-auto bg-primary/10 p-3 rounded-full">
                           <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground pt-2">Step 3</p>
                        <CardTitle className="font-headline text-lg">Get Optimized Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                           Receive a refined prompt, recommended model settings, and a clear explanation of the improvements made.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
         <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold font-headline">Why is This Important?</h3>
            <p className="text-muted-foreground mt-4">
                The quality of your prompt directly determines the quality of the AI's response. A well-engineered prompt can be the difference between a generic, unhelpful answer and a precise, insightful one. Prompt Engineer empowers you to get the most out of any language model by turning your ideas into instructions the AI can understand and execute flawlessly.
            </p>
        </div>
      </div>

    </div>
  );
}