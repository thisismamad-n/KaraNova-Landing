"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

export interface CodeExampleProps {
  examples: {
    language: string;
    label: string;
    code: string;
  }[];
  title?: string;
  className?: string;
}

export default function CodeExample({
  examples,
  title,
  className,
}: CodeExampleProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(examples[0]?.language || "");
  const [copied, setCopied] = useState(false);

  const currentExample = examples.find((ex) => ex.language === selectedLanguage) || examples[0];

  const handleCopy = async () => {
    if (currentExample) {
      await navigator.clipboard.writeText(currentExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      {/* Header with title and language tabs */}
      <div className="bg-slate-900/50 border-b border-slate-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {title && (
              <h4 className="text-sm font-semibold text-slate-300">{title}</h4>
            )}
            <div className="flex gap-1">
              {examples.map((example) => (
                <button
                  type="button"
                  key={example.language}
                  onClick={() => setSelectedLanguage(example.language)}
                  aria-pressed={selectedLanguage === example.language}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                    selectedLanguage === example.language
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                  )}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "p-2 rounded-md transition-all duration-200",
              "hover:bg-slate-800/50 text-slate-400 hover:text-slate-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            )}
            title="کپی کد"
            aria-label={copied ? "کپی شد" : "کپی کد"}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Code block */}
      <div className="bg-slate-950/50 border border-slate-800/50 rounded-b-lg">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-slate-300 leading-relaxed">
            {currentExample?.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
