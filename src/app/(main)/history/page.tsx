'use client';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import type { PromptHistoryItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useLocalStorage<PromptHistoryItem[]>('prompt-history', []);

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Prompt History</h1>
            <p className="text-muted-foreground">Review your past prompt optimizations.</p>
        </div>
        {history.length > 0 && (
            <Button variant="outline" onClick={handleClearHistory}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
            </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">You have no saved prompts yet.</p>
           <Button asChild className="mt-4">
            <Link href="/optimize">Start Optimizing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <Card key={item.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="truncate">{item.originalPrompt}</CardTitle>
                <CardDescription>
                  Optimized for <strong>{item.targetLLM}</strong> on{" "}
                  {new Date(item.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                 <Button asChild variant="ghost">
                   <Link href={`/optimize?prompt=${encodeURIComponent(item.originalPrompt)}&llm=${item.targetLLM}`}>
                      View & Re-run <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
