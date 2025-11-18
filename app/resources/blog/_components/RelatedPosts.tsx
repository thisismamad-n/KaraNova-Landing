"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogPost, mockBlogs } from "@/app/resources/blog/_data/blogs";

interface RelatedPostsProps {
  currentPost: BlogPost;
  language: "en" | "fa";
  translations: any;
}

export default function RelatedPosts({
  currentPost,
  language,
  translations,
}: RelatedPostsProps) {
  // Get related posts by category (excluding current post)
  const relatedPosts = mockBlogs
    .filter(
      (post) =>
        post.category === currentPost.category && post.id !== currentPost.id
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  const relatedArticlesLabel = translations[language].labels.relatedArticles;

  return (
    <section className="mt-16 pt-12 border-t border-slate-700/50">
      <h3 className="text-2xl font-bold text-slate-100 mb-8">
        {relatedArticlesLabel}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => {
          const title = language === "fa" ? post.title : post.titleEn;
          const excerpt = language === "fa" ? post.excerpt : post.excerptEn;

          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-lg",
                "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
                "border border-slate-700/50 hover:border-teal-500/50",
                "transition-all duration-300",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
                "p-6"
              )}
            >
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
              <h4 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors">
                {title}
              </h4>

              {/* Excerpt */}
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {excerpt}
              </p>

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
                {translations[language].labels.readMore}
                <span className={language === "fa" ? "rotate-180" : ""}>→</span>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
