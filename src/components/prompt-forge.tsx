"use client";

import { useState, useEffect } from "react";
import type { OptimizePromptForLLMOutput } from "@/ai/flows/optimize-prompt-for-llm";
import type { PromptHistoryItem, LlmModel } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { optimizePromptAction, collectFeedbackAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { PromptForm } from "@/components/prompt-form";
import { OutputDisplay } from "@/components/output-display";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptForge({ initialPrompt, initialLlm }: { initialPrompt?: string; initialLlm?: LlmModel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizePromptForLLMOutput | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<{ prompt: string; targetLLM: LlmModel } | null>(
    initialPrompt && initialLlm ? { prompt: initialPrompt, targetLLM: initialLlm } : null
  );
  
  const [history, setHistory] = useLocalStorage<PromptHistoryItem[]>("prompt-history", []);
  const { toast } = useToast();

  const handleOptimize = async (values: { prompt: string; targetLLM: LlmModel }) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await optimizePromptAction(values);

    if (response.success && response.data) {
      setResult(response.data);
      setCurrentPrompt(values);

      const newHistoryItem: PromptHistoryItem = {
        id: new Date().toISOString(),
        originalPrompt: values.prompt,
        targetLLM: values.targetLLM,
        optimizationResult: response.data,
        timestamp: Date.now(),
      };
      setHistory([newHistoryItem, ...history]);
    } else {
      setError(response.error || "Failed to optimize prompt.");
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: response.error || "An unknown error occurred.",
      });
    }

    setIsLoading(false);
  };

  const handleFeedback = async (feedback: {
    qualityScore: number;
    clarityScore: number;
    specificityScore: number;
    feedbackComments?: string;
  }) => {
    if (!result || !currentPrompt) return;

    const response = await collectFeedbackAction({
      ...feedback,
      originalPrompt: currentPrompt.prompt,
      optimizedPrompt: result.optimized_prompt,
      targetLlm: currentPrompt.targetLLM,
    });

    if (response.success) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping us improve!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Feedback Failed",
        description: response.error || "Could not submit feedback.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        <PromptForm
          onSubmit={handleOptimize}
          isLoading={isLoading}
          initialData={currentPrompt || undefined}
        />
        {isLoading && <LoadingSkeleton />}
        {error && <p className="text-destructive">{error}</p>}
        {result && currentPrompt && (
          <OutputDisplay
            originalPrompt={currentPrompt.prompt}
            targetLLM={currentPrompt.targetLLM}
            result={result}
            onFeedback={handleFeedback}
          />
        )}
      </div>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-6 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);
