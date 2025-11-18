"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import DocSidebar from "../../_components/DocSidebar";
import DocContent from "../../_components/DocContent";
import TableOfContents from "../../_components/TableOfContents";
import RelatedArticles from "../../_components/RelatedArticles";
import { type DocArticle, docCategories, getDocsByCategory, getRelatedDocs } from "../../_data/docs";

interface DocArticleClientProps {
  doc: DocArticle;
}

export default function DocArticleClient({ doc }: DocArticleClientProps) {
  const category = docCategories.find((cat) => cat.id === doc.category);
  const relatedArticles = getRelatedDocs(doc.id);
  const categoryDocs = getDocsByCategory(doc.category);
  
  // Find previous and next articles in the same category
  const currentIndex = categoryDocs.findIndex((d) => d.id === doc.id);
  const prevDoc = currentIndex > 0 ? categoryDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < categoryDocs.length - 1 ? categoryDocs[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen bg-slate-950" dir="rtl">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="rgba(94, 234, 212, 0.08)"
          hoverFillColor="rgba(94, 234, 212, 0.05)"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-slate-800/50 bg-slate-900/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-slate-400 flex-row-reverse" aria-label="مسیر صفحه">
              <Link href="/" className="hover:text-teal-400 transition-colors">
                خانه
              </Link>
              <span>/</span>
              <Link href="/resources/documentation" className="hover:text-teal-400 transition-colors">
                مستندات
              </Link>
              <span>/</span>
              <Link
                href={`/resources/documentation#${doc.category}`}
                className="hover:text-teal-400 transition-colors"
              >
                {category?.name}
              </Link>
              <span>/</span>
              <span className="text-slate-300">{doc.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <ContentSection maxWidth="xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
              <DocSidebar />
            </div>

            {/* Article Content */}
            <div className="flex-1 min-w-0">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "p-8 rounded-xl",
                  "bg-slate-900/40 backdrop-blur-md",
                  "border border-slate-800/50"
                )}
              >
                {/* Article Header */}
                <header className="mb-8 pb-6 border-b border-slate-800/50">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4 flex-row-reverse">
                    <span className="text-lg">{category?.icon}</span>
                    <span>{category?.name}</span>
                  </div>
                  <h1 className="text-4xl font-bold text-slate-100 mb-4 bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
                    {doc.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-slate-400 flex-row-reverse">
                    <Calendar className="w-4 h-4" />
                    <span>آخرین بروزرسانی: {doc.lastUpdated.toLocaleDateString('fa-IR')}</span>
                  </div>
                </header>

              {/* Article Content */}
              <DocContent content={doc.content} />

                {/* Article Footer - Navigation */}
                <footer className="mt-12 pt-6 border-t border-slate-800/50">
                  <div className="flex items-center justify-between gap-4">
                    {nextDoc ? (
                      <Link
                        href={`/resources/documentation/${doc.category}/${nextDoc.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-4 py-3 rounded-lg",
                          "bg-slate-900/50 backdrop-blur-md",
                          "border border-slate-800/50",
                          "hover:border-teal-500/50",
                          "hover:bg-slate-900/70",
                          "transition-all duration-300",
                          "group"
                        )}
                      >
                        <div className="text-right">
                          <div className="text-xs text-slate-500 mb-1">بعدی</div>
                          <div className="text-sm text-slate-300 group-hover:text-teal-400 transition-colors">
                            {nextDoc.title}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:-translate-x-1 transition-all rotate-180" />
                      </Link>
                    ) : (
                      <div />
                    )}

                    {prevDoc ? (
                      <Link
                        href={`/resources/documentation/${doc.category}/${prevDoc.slug}`}
                        className={cn(
                          "flex items-center gap-2 px-4 py-3 rounded-lg",
                          "bg-slate-900/50 backdrop-blur-md",
                          "border border-slate-800/50",
                          "hover:border-teal-500/50",
                          "hover:bg-slate-900/70",
                          "transition-all duration-300",
                          "group"
                        )}
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all rotate-180" />
                        <div className="text-left">
                          <div className="text-xs text-slate-500 mb-1">قبلی</div>
                          <div className="text-sm text-slate-300 group-hover:text-teal-400 transition-colors">
                            {prevDoc.title}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                </footer>
              </motion.article>

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} />
            </div>

            {/* Table of Contents - Hidden on mobile */}
            <div className="hidden xl:block w-64 flex-shrink-0">
              <TableOfContents content={doc.content} />
            </div>
          </div>
        </ContentSection>
      </div>
    </div>
  );
}
