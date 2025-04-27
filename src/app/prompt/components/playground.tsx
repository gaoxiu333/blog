'use client';

import { useCompletion } from '@ai-sdk/react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function Playground() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { completion, complete } = useCompletion({
    api: '/api/completion',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入提示词');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await complete(prompt);
    } catch (err) {
      setError('生成失败，请稍后重试');
      console.error('生成错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* 输入区域 */}
      <div className="space-y-2">
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-foreground"
        >
          输入提示词
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
          placeholder="请输入提示词..."
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end">
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? '生成中...' : '生成'}
        </Button>
      </div>

      {/* 错误提示 */}
      {error && <div className="text-sm text-destructive">{error}</div>}

      {/* 输出区域 */}
      {completion && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">生成结果</h3>
          <div className="p-4 rounded-md bg-muted/50 whitespace-pre-wrap">
            {completion}
          </div>
        </div>
      )}
    </div>
  );
}
