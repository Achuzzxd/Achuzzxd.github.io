"use server";

import { collectUserFeedbackForPromptImprovement, type CollectUserFeedbackForPromptImprovementInput } from "@/ai/flows/collect-user-feedback-for-prompt-improvement";
import { optimizePromptForLLM, type OptimizePromptForLLMInput } from "@/ai/flows/optimize-prompt-for-llm";

export async function optimizePromptAction(input: OptimizePromptForLLMInput) {
  try {
    const result = await optimizePromptForLLM(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error optimizing prompt:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}

export async function collectFeedbackAction(input: CollectUserFeedbackForPromptImprovementInput) {
  try {
    const result = await collectUserFeedbackForPromptImprovement(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error collecting feedback:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}
