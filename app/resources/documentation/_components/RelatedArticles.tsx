"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { type DocArticle } from "../_data/docs";

interface RelatedArticlesProps {
  articles: DocArticle[];
  className?: string;
}

export default function RelatedArticles({ articles, className }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn(
        "mt-12 p-6 rounded-xl",
        "bg-slate-900/40 backdrop-blur-md",
        "border border-slate-800/50",
        className
      )}
      dir="rtl"
    >
      <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2 flex-row-reverse">
        <FileText className="w-5 h-5 text-teal-400" />
        مقالات مرتبط
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/resources/documentation/${article.category}/${article.slug}`}
            className={cn(
              "block p-4 rounded-lg",
              "bg-slate-900/50 backdrop-blur-md",
              "border border-slate-800/30",
              "hover:border-teal-500/50",
              "hover:bg-slate-900/70",
              "transition-all duration-300",
              "group"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 text-right">
                <h3 className="text-sm font-medium text-slate-200 group-hover:text-teal-400 transition-colors mb-1">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {article.content.substring(0, 100)}...
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:-translate-x-1 transition-all flex-shrink-0 rotate-180" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
