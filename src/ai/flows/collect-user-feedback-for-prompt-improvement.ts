'use server';

/**
 * @fileOverview This flow collects user feedback on optimized prompts and uses it to improve the prompt optimization model.
 *
 * - collectUserFeedbackForPromptImprovement - A function that handles the collection of user feedback.
 * - CollectUserFeedbackForPromptImprovementInput - The input type for the collectUserFeedbackForPromptImprovement function.
 * - CollectUserFeedbackForPromptImprovementOutput - The return type for the collectUserFeedbackForPromptImprovement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CollectUserFeedbackForPromptImprovementInputSchema = z.object({
  optimizedPrompt: z.string().describe('The optimized prompt that the user is providing feedback on.'),
  originalPrompt: z.string().describe('The original user inputted prompt.'),
  targetLlm: z.string().describe('The target LLM that the prompt was optimized for.'),
  qualityScore: z.number().describe('The quality score of the optimized prompt, as determined by the user.'),
  clarityScore: z.number().describe('The clarity score of the optimized prompt, as determined by the user.'),
  specificityScore: z.number().describe('The specificity score of the optimized prompt, as determined by the user.'),
  feedbackComments: z.string().optional().describe('Any additional comments or feedback that the user wants to provide.'),
});
export type CollectUserFeedbackForPromptImprovementInput = z.infer<typeof CollectUserFeedbackForPromptImprovementInputSchema>;

const CollectUserFeedbackForPromptImprovementOutputSchema = z.object({
  success: z.boolean().describe('Whether the feedback was successfully recorded.'),
  message: z.string().describe('A message indicating the status of the feedback submission.'),
});
export type CollectUserFeedbackForPromptImprovementOutput = z.infer<typeof CollectUserFeedbackForPromptImprovementOutputSchema>;

export async function collectUserFeedbackForPromptImprovement(input: CollectUserFeedbackForPromptImprovementInput): Promise<CollectUserFeedbackForPromptImprovementOutput> {
  return collectUserFeedbackForPromptImprovementFlow(input);
}

const collectUserFeedbackForPromptImprovementFlow = ai.defineFlow(
  {
    name: 'collectUserFeedbackForPromptImprovementFlow',
    inputSchema: CollectUserFeedbackForPromptImprovementInputSchema,
    outputSchema: CollectUserFeedbackForPromptImprovementOutputSchema,
  },
  async input => {
    // TODO: Implement the logic to record the user feedback and use it to improve the prompt optimization model.
    // This could involve saving the feedback to a database, triggering a fine-tuning process, etc.
    // For now, we'll just return a success message.
    console.log('User feedback:', input);

    return {
      success: true,
      message: 'Feedback successfully recorded (but not yet used to improve the model).',
    };
  }
);
