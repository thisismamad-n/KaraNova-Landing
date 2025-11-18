"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchDocs, type DocArticle } from "../_data/docs";

interface DocSearchProps {
  className?: string;
}

export default function DocSearch({ className }: DocSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocArticle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search functionality - debounced to avoid cascading renders
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length > 0) {
        const searchResults = searchDocs(query);
        setResults(searchResults);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در مستندات..."
          className={cn(
            "w-full pr-10 pl-10 py-3 rounded-lg text-right",
            "bg-slate-900/50 backdrop-blur-md",
            "border border-slate-800/50",
            "text-slate-200 placeholder:text-slate-500",
            "focus:outline-none focus:ring-2 focus:ring-teal-500/50",
            "transition-all duration-200"
          )}
          aria-label="جستجو در مستندات"
          dir="rtl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            aria-label="پاک کردن جستجو"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2 z-50",
              "bg-slate-900/95 backdrop-blur-xl",
              "border border-slate-800/50 rounded-lg",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
              "max-h-96 overflow-y-auto"
            )}
          >
            <div className="p-2">
              {results.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/resources/documentation/${doc.category}/${doc.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg",
                    "hover:bg-slate-800/50 transition-colors duration-200",
                    "group"
                  )}
                  dir="rtl"
                >
                  <FileText className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 text-right">
                    <h4 className="text-sm font-medium text-slate-200 group-hover:text-teal-400 transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {doc.content.substring(0, 150)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results Message */}
      <AnimatePresence>
        {isOpen && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2 z-50",
              "bg-slate-900/95 backdrop-blur-xl",
              "border border-slate-800/50 rounded-lg",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
              "p-4 text-center"
            )}
          >
            <p className="text-sm text-slate-400">
              نتیجه‌ای برای &quot;{query}&quot; یافت نشد
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
