"use client";

import type { ReactNode } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const { toast } = useToast();

  const getCodeFromChildren = (node: ReactNode): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map(getCodeFromChildren).join('');
    }
    if (node && typeof node === 'object' && 'props' in node) {
      return getCodeFromChildren(node.props.children);
    }
    return '';
  };

  const handleCopy = () => {
    const code = getCodeFromChildren(children);
    if (code) {
      navigator.clipboard.writeText(code);
      toast({
        title: "已复制到剪贴板！",
        description: "代码已成功复制。",
      });
    }
  };

  return (
    <div className="relative group my-4">
      <pre className={cn("bg-muted text-muted-foreground p-4 rounded-lg overflow-x-auto font-code text-[14px] leading-6 border")}>
        <code>{children}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        aria-label="复制"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
