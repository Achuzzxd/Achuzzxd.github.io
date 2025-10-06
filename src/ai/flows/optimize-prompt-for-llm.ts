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
  target_model: z.string().describe('The target model for the optimized prompt.'),
  temperature: z.number().describe('The recommended temperature for the model.'),
  max_output_tokens: z.number().describe('The recommended max output tokens for the model.'),
  optimized_prompt: z.string().describe('The optimized prompt tailored for the specified LLM.'),
  suggested_output: z.string().describe('A suggestion for what the output of the prompt should look like.'),
  notes: z.string().describe('Additional notes or instructions for using the prompt.'),
});
export type OptimizePromptForLLMOutput = z.infer<typeof OptimizePromptForLLMOutputSchema>;

export async function optimizePromptForLLM(input: OptimizePromptForLLMInput): Promise<OptimizePromptForLLMOutput> {
  return optimizePromptForLLMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePromptForLLMPrompt',
  input: {schema: OptimizePromptForLLMInputSchema},
  output: {schema: OptimizePromptForLLMOutputSchema},
  prompt: `You are an expert prompt engineer. Your goal is to optimize the given user prompt for the specified LLM to improve its quality and increase the likelihood of a desirable response. LLM to optimize for: {{{targetLLM}}}.\n\nOriginal Prompt: {{{prompt}}}\n\nOptimize the prompt and provide recommended model parameters.

Your output MUST be a JSON object structured as follows:
{
  "target_model": "{{{targetLLM}}}",
  "temperature": [Recommended temperature for the model (e.g., 0.7)],
  "max_output_tokens": [Recommended max output tokens (e.g., 1200)],
  "optimized_prompt": "[The optimized prompt]",
  "suggested_output": "[A description of the ideal output from this prompt]",
  "notes": "[Additional notes or instructions for using the prompt]"
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
