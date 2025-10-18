"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LlmModel, llmModels } from "@/lib/types";

const formSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: "Prompt must be at least 10 characters." })
    .max(2000, { message: "Prompt cannot exceed 2000 characters." }),
  targetLLM: z.enum(llmModels, {
    required_error: "Please select a target LLM.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type PromptFormProps = {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
  initialData?: Partial<FormValues>;
};

export function PromptForm({ onSubmit, isLoading, initialData }: PromptFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: initialData?.prompt || "",
      targetLLM: initialData?.targetLLM || undefined,
    },
  });

  return (
    <Card className="w-full shadow-2xl bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Optimize Your Prompt</CardTitle>
        <CardDescription>
          Enter your prompt and select a target LLM to get an optimized version.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Write a short story about a robot who discovers music."
                      className="resize-none h-32 bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetLLM"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target LLM</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-transparent">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {llmModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto shadow-lg shadow-primary/20">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Optimize
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}