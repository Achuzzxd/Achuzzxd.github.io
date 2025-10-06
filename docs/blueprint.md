# **App Name**: PromptForge AI

## Core Features:

- Prompt Optimization: Accepts a user-inputted prompt and a target LLM, and returns an optimized prompt tailored for that specific model, improving the prompt quality, the confidence score, including the quality score details. Uses a DeepSeek model finetuned via LoRA on prompt engineering data.
- Model Selection: Provides a dropdown menu (similar to the image provided) allowing users to select from a range of target LLMs (ChatGPT, Gemini, Claude, DeepSeek, Perplexity, Grok, LLaMA/Meta AI) for prompt optimization.
- Feedback Loop: Collects user feedback on the optimized prompts and the quality to continuously improve the DeepSeek model through further fine-tuning using tools. Also integrates new best practices for prompting. Records which input prompt works best for each prompt model
- Enhanced Output Display: Presents the optimized JSON response with clear formatting, highlighting, confidence score, and other metrics such as 'clarity' and 'specificity'.
- Prompt History: Enables users to save and manage a history of their prompts and the optimized versions.

## Style Guidelines:

- Primary color: Dark blue (#1A3A5A) evoking intelligence and depth.
- Background color: Light beige (#F5F5DC) to provide a warm and calming backdrop.
- Accent color: Medium blue (#558BBD) to highlight interactive elements and important information.
- Body and headline font: 'Inter' (sans-serif) for a clean, modern, and readable experience. 'Source Code Pro' for code display.
- Use simple, clear icons for actions like 'optimize', 'save', and 'feedback' that will match a technology style.
- Maintain a clean, intuitive layout that prioritizes usability.
- Use subtle transitions to guide the user through the optimization process. Animation: highlight improvements to user prompts and visualize changes using highlighting in the output JSON.
- Includes a dark color theme slider for user preference.