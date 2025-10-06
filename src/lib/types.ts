import type { OptimizePromptForLLMOutput } from "@/ai/flows/optimize-prompt-for-llm";

export type PromptHistoryItem = {
  id: string;
  originalPrompt: string;
  targetLLM: string;
  optimizationResult: OptimizePromptForLLMOutput;
  timestamp: number;
};

export const llmModels = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "DeepSeek",
  "Perplexity",
  "Grok",
  "LLaMA/Meta AI",
] as const;

export type LlmModel = (typeof llmModels)[number];
