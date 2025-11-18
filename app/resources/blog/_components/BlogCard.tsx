"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/app/resources/blog/_data/blogs";

interface BlogCardProps {
  post: BlogPost;
  language: "en" | "fa";
  translations: any;
}

export default function BlogCard({
  post,
  language,
  translations,
}: BlogCardProps) {
  const title = language === "fa" ? post.title : post.titleEn;
  const excerpt = language === "fa" ? post.excerpt : post.excerptEn;
  const authorName = language === "fa" ? post.author.name : post.author.nameEn;
  const readTimeLabel = translations[language].labels.readTime;
  const publishedOnLabel = translations[language].labels.publishedOn;
  const readMoreLabel = translations[language].labels.readMore;

  const formattedDate = new Intl.DateTimeFormat(
    language === "fa" ? "fa-IR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(post.publishedDate);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-lg",
        "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
        "border border-slate-700/50 hover:border-teal-500/50",
        "transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
      )}
    >


      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-semibold",
              "bg-teal-500/20 text-teal-300",
              "border border-teal-500/30"
            )}
          >
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{excerpt}</p>

        {/* Meta Information */}
        <div
          className={cn(
            "flex items-center justify-between text-xs text-slate-500 mb-4",
            language === "fa" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className={cn("flex items-center gap-2", language === "fa" ? "flex-row-reverse" : "flex-row")}>
            <span>{authorName}</span>
            <span>•</span>
            <span>{post.readTime} {readTimeLabel}</span>
          </div>
          <span>{formattedDate}</span>
        </div>

        {/* Read More Link */}
        <Link
          href={`/resources/blog/${post.slug}`}
          className={cn(
            "inline-flex items-center gap-2",
            "text-teal-400 hover:text-teal-300",
            "font-semibold text-sm",
            "transition-colors",
            language === "fa" ? "flex-row-reverse" : "flex-row"
          )}
        >
          {readMoreLabel}
          <span className={language === "fa" ? "rotate-180" : ""}>→</span>
        </Link>
      </div>
    </motion.article>
  );
}
