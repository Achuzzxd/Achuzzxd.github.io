import { config } from 'dotenv';
config();

import '@/ai/flows/collect-user-feedback-for-prompt-improvement.ts';
import '@/ai/flows/optimize-prompt-for-llm.ts';