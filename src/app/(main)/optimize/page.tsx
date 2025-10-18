"use client"

import { PromptForge } from "@/components/prompt-forge";
import { useSearchParams } from "next/navigation";
import { LlmModel } from "@/lib/types";

export default function OptimizePage() {
    const searchParams = useSearchParams();
    const prompt = searchParams.get('prompt') || undefined;
    const llm = searchParams.get('llm') as LlmModel || undefined;

    return (
        <div className="flex justify-center w-full">
            <PromptForge key={`${prompt}-${llm}`} initialPrompt={prompt} initialLlm={llm} />
        </div>
    )
}
