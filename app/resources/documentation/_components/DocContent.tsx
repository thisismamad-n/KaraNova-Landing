"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";

interface DocContentProps {
  content: string;
  className?: string;
}

export default function DocContent({ content, className }: DocContentProps) {
  return (
    <div
      style={{
        color: '#f1f5f9', // slate-100
      }}
      className={cn(
        "prose prose-invert prose-slate max-w-none",
        // Headings
        "prose-headings:font-bold",
        "prose-h1:text-4xl prose-h1:mb-6 prose-h1:bg-gradient-to-r prose-h1:from-teal-300 prose-h1:to-cyan-300 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:drop-shadow-lg",
        "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:!text-teal-200 prose-h2:border-b prose-h2:border-teal-500/30 prose-h2:pb-2",
        "prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:!text-cyan-200",
        "prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2 prose-h4:!text-teal-100",
        // Paragraphs and text - using !important to override
        "prose-p:!text-slate-100 prose-p:leading-relaxed prose-p:mb-4",
        "prose-strong:!text-teal-100 prose-strong:font-semibold",
        "prose-em:!text-cyan-100",
        // Links
        "prose-a:!text-teal-300 prose-a:no-underline hover:prose-a:!text-teal-200 hover:prose-a:underline",
        // Lists - using !important to override
        "prose-ul:!text-slate-100 prose-ul:my-4",
        "prose-ol:!text-slate-100 prose-ol:my-4",
        "prose-li:my-2 prose-li:!text-slate-100",
        // Code
        "prose-code:!text-cyan-300 prose-code:!bg-slate-900/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-slate-700",
        "prose-pre:!bg-slate-900/90 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto",
        "prose-pre:shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
        // Blockquotes
        "prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:!text-slate-100 prose-blockquote:bg-slate-900/30 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded",
        // Tables
        "prose-table:border-collapse prose-table:w-full",
        "prose-th:bg-slate-900/60 prose-th:border prose-th:border-slate-700 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:!text-teal-200",
        "prose-td:border prose-td:border-slate-700 prose-td:p-3 prose-td:!text-slate-100",
        // Images
        "prose-img:rounded-lg prose-img:shadow-lg",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
