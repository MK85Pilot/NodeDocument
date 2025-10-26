"use client";

import React, { useMemo } from 'react';
import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc';
import config, { components } from '@/lib/markdoc-config';

interface MarkdocRendererProps {
  doc: string;
  variables?: Record<string, any>;
}

export function MarkdocRenderer({ doc, variables = {} }: MarkdocRendererProps) {
  const content = useMemo((): RenderableTreeNode | null => {
    try {
      const ast = Markdoc.parse(doc);
      return Markdoc.transform(ast, { ...config, variables });
    } catch (error) {
      // 在实际应用中，您会希望将此错误记录到错误报告服务中
      // 在此演示中，我们只将其记录到控制台。
      console.error(error);
      return null;
    }
  }, [doc, variables]);

  if (!content) {
    return (
      <div className="p-4 text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">
        <p className="font-bold">渲染文档时出错</p>
        <p className="text-sm">您的 Markdoc 内容中似乎存在语法错误。请检查浏览器控制台以获取更多详细信息。</p>
      </div>
    );
  }

  return Markdoc.renderers.react(content, React, { components });
}
