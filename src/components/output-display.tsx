
"use client";

import { useState } from "react";
import { ThumbsUp, Send, Loader2, Copy, Check } from "lucide-react";
import type { OptimizePromptForLLMOutput } from "@/ai/flows/optimize-prompt-for-llm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

type OutputDisplayProps = {
  originalPrompt: string;
  targetLLM: string;
  result: OptimizePromptForLLMOutput;
  onFeedback: (feedback: {
    qualityScore: number;
    clarityScore: number;
    specificityScore: number;
    feedbackComments?: string;
  }) => Promise<void>;
};

export function OutputDisplay({
  originalPrompt,
  targetLLM,
  result,
  onFeedback,
}: OutputDisplayProps) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualityScore, setQualityScore] = useState(80);
  const [clarityScore, setClarityScore] = useState(80);
  const [specificityScore, setSpecificityScore] = useState(80);
  const [feedbackComments, setFeedbackComments] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const { toast } = useToast();

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    await onFeedback({
      qualityScore,
      clarityScore,
      specificityScore,
      feedbackComments,
    });
    setFeedbackSubmitted(true);
    setIsSubmitting(false);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(result.optimized_prompt);
    setCopiedPrompt(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopiedPrompt(false), 2000);
  };
  
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJson(true);
    toast({ title: "Copied JSON to clipboard!" });
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Optimized Result</CardTitle>
          <CardDescription>
            Here is the prompt optimized for {targetLLM}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-semibold">Optimized Prompt</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyPrompt}>
                    {copiedPrompt ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy
                </Button>
            </div>
            <pre className="w-full rounded-md bg-muted p-4 font-code text-sm overflow-x-auto">
              <code>{result.optimized_prompt}</code>
            </pre>
          </div>
           <div>
            <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-semibold">JSON Prompting</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyJson}>
                    {copiedJson ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy JSON
                </Button>
            </div>
            <pre className="w-full rounded-md bg-muted p-4 font-code text-sm overflow-x-auto">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label>Target Model</Label>
              <p className="mt-1 text-sm font-medium text-foreground bg-muted px-3 py-2 rounded-md">{result.target_model}</p>
            </div>
            <div>
              <Label>Temperature</Label>
              <p className="mt-1 text-sm font-medium text-foreground bg-muted px-3 py-2 rounded-md">{result.temperature}</p>
            </div>
             <div>
              <Label>Max Tokens</Label>
              <p className="mt-1 text-sm font-medium text-foreground bg-muted px-3 py-2 rounded-md">{result.max_output_tokens}</p>
            </div>
          </div>
           <div>
            <Label className="text-sm font-semibold">Suggested Output</Label>
            <p className="mt-2 text-sm text-muted-foreground p-4 bg-muted rounded-md">
              {result.suggested_output}
            </p>
          </div>
          <div>
            <Label className="text-sm font-semibold">Notes</Label>
            <p className="mt-2 text-sm text-muted-foreground p-4 bg-muted rounded-md">
              {result.notes}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
          <CardDescription>
            Help us improve by rating the original optimization.
          </CardDescription>
        </CardHeader>
        {feedbackSubmitted ? (
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
                <ThumbsUp className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-lg font-medium">Thank you for your feedback!</p>
            </div>
          </CardContent>
        ) : (
          <>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="quality">Quality Score</Label>
                <Slider
                  id="quality"
                  min={0}
                  max={100}
                  step={1}
                  value={[qualityScore]}
                  onValueChange={(v) => setQualityScore(v[0])}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="clarity">Clarity Score</Label>
                <Slider
                  id="clarity"
                  min={0}
                  max={100}
                  step={1}
                  value={[clarityScore]}
                  onValueChange={(v) => setClarityScore(v[0])}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="specificity">Specificity Score</Label>
                <Slider
                  id="specificity"
                  min={0}
                  max={100}
                  step={1}
                  value={[specificityScore]}
                  onValueChange={(v) => setSpecificityScore(v[0])}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="What did you like or dislike?"
                  value={feedbackComments}
                  onChange={(e) => setFeedbackComments(e.target.value)}
                  disabled={isSubmitting}
                  className="mt-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleFeedbackSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Submit Feedback
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
