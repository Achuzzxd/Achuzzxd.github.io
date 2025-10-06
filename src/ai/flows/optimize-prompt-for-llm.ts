'use server';
/**
 * @fileOverview A prompt optimization AI agent that tailors prompts to specific LLMs.
 *
 * - optimizePromptForLLM - A function that handles the prompt optimization process.
 * - OptimizePromptForLLMInput - The input type for the optimizePromptForLLM function.
 * - OptimizePromptForLLMOutput - The return type for the optimizePromptForLLM function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizePromptForLLMInputSchema = z.object({
  prompt: z.string().describe('The user-provided prompt to be optimized.'),
  targetLLM: z.string().describe('The target LLM for which the prompt should be optimized (e.g., ChatGPT, Gemini, Claude).'),
});
export type OptimizePromptForLLMInput = z.infer<typeof OptimizePromptForLLMInputSchema>;

const OptimizePromptForLLMOutputSchema = z.object({
  optimizedPrompt: z.string().describe('The optimized prompt tailored for the specified LLM.'),
  qualityScore: z.number().describe('A score indicating the quality of the optimized prompt.'),
  qualityScoreDetails: z.string().describe('Details explaining the quality score.'),
  confidenceScore: z.number().describe('A score indicating the confidence level in the optimized prompt.'),
});
export type OptimizePromptForLLMOutput = z.infer<typeof OptimizePromptForLLMOutputSchema>;

export async function optimizePromptForLLM(input: OptimizePromptForLLMInput): Promise<OptimizePromptForLLMOutput> {
  return optimizePromptForLLMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePromptForLLMPrompt',
  input: {schema: OptimizePromptForLLMInputSchema},
  output: {schema: OptimizePromptForLLMOutputSchema},
  prompt: `You are an expert prompt engineer. Your goal is to optimize the given user prompt for the specified LLM to improve its quality and increase the likelihood of a desirable response. LLM to optimize for: {{{targetLLM}}}.\n\nOriginal Prompt: {{{prompt}}}\n\nOptimize the prompt, then provide a quality score (0-100), quality score details and a confidence score (0-100) for the optimized prompt.\n\nYour output MUST be a JSON object structured as follows:\n{
  "optimizedPrompt": "[The optimized prompt]",
  "qualityScore": [Quality score for the optimized prompt (0-100)],
  "qualityScoreDetails": "[Details explaining the quality score]",
  "confidenceScore": [Your confidence score that prompt is optimized for the target LLM (0-100)]
}`,
});

const optimizePromptForLLMFlow = ai.defineFlow(
  {
    name: 'optimizePromptForLLMFlow',
    inputSchema: OptimizePromptForLLMInputSchema,
    outputSchema: OptimizePromptForLLMOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
