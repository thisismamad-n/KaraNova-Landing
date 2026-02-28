"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFAQProps {
  onSearch: (query: string) => void;
  language: "en" | "fa";
}

export default function SearchFAQ({ onSearch, language }: SearchFAQProps) {
  const [query, setQuery] = useState("");

  const content = {
    fa: {
      placeholder: "جستجو در سوالات متداول...",
      clear: "پاک کردن",
    },
    en: {
      placeholder: "Search FAQs...",
      clear: "Clear",
    },
  };

  const currentContent = content[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex items-center",
          "backdrop-blur-md bg-slate-900/40",
          "border border-slate-800/50",
          "rounded-xl overflow-hidden",
          "focus-within:border-teal-500/50 transition-all duration-300",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        )}
      >
        {/* Search Icon */}
        <div className="absolute right-4 pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" aria-hidden="true" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={currentContent.placeholder}
          className={cn(
            "w-full px-4 py-4 pr-12",
            language === "fa" ? "pl-12" : "pr-12",
            "bg-transparent text-slate-100 placeholder-slate-500",
            "focus:outline-none"
          )}
          aria-label={currentContent.placeholder}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute left-4 p-1 rounded-md",
              "text-slate-400 hover:text-slate-300",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            )}
            aria-label={currentContent.clear}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
