"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import DocSidebar from "./_components/DocSidebar";
import DocSearch from "./_components/DocSearch";
import { docCategories, getDocsByCategory } from "./_data/docs";

export default function DocumentationPageClient() {
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
        {/* Hero Section */}
        <PageHero
          title="مستندات"
          subtitle="همه چیزهایی که برای استفاده از پلتفرم کارانوا نیاز دارید"
          backgroundVariant="animated"
          breadcrumbs={[
            { label: "خانه", href: "/" },
            { label: "منابع", href: "/resources" },
            { label: "مستندات", href: "/resources/documentation" },
          ]}
        />

        {/* Main Content */}
        <ContentSection maxWidth="xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <DocSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Search Bar */}
              <div className="mb-8">
                <DocSearch />
              </div>

              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "mb-12 p-8 rounded-xl",
                  "bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent",
                  "border border-teal-500/20",
                  "backdrop-blur-sm"
                )}
              >
                <div className="flex items-start gap-4">
                  <BookOpen className="w-8 h-8 text-teal-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">
                      به مستندات کارانوا خوش آمدید
                    </h2>
                    <p className="text-slate-300 mb-4">
                      راهنماها، آموزش‌ها و مراجع جامعی را برای استفاده بهینه از پلتفرم کارانوا پیدا کنید.
                      چه تازه شروع کرده باشید و چه به دنبال ویژگی‌های پیشرفته باشید، ما شما را پوشش می‌دهیم.
                    </p>
                    <Link
                      href="/resources/documentation/getting-started/introduction"
                      className={cn(
                        "inline-flex items-center gap-2 flex-row-reverse",
                        "text-teal-400 hover:text-teal-300",
                        "font-medium transition-colors"
                      )}
                    >
                      شروع با معرفی
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Documentation Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {docCategories.map((category, index) => {
                  const docs = getDocsByCategory(category.slug);
                  const firstDoc = docs[0];

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link
                        href={
                          firstDoc
                            ? `/resources/documentation/${category.slug}/${firstDoc.slug}`
                            : `/resources/documentation/${category.slug}`
                        }
                        className={cn(
                          "block h-full p-6 rounded-xl",
                          "bg-slate-900/40 backdrop-blur-md",
                          "border border-slate-800/50",
                          "hover:border-teal-500/50",
                          "hover:bg-slate-900/60",
                          "transition-all duration-300",
                          "group"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-4xl">{category.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-teal-400 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                              {category.description}
                            </p>
                            <div className="flex items-center gap-2 text-teal-400 text-sm font-medium flex-row-reverse">
                              <span>{docs.length} مقاله</span>
                              <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Popular Articles Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold text-slate-100 mb-6">
                  مقالات محبوب
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "معرفی کارانوا",
                      category: "getting-started",
                      slug: "introduction",
                    },
                    {
                      title: "راهنمای شروع سریع",
                      category: "getting-started",
                      slug: "quick-start",
                    },
                    {
                      title: "نمای کلی اینووا AI",
                      category: "inova",
                      slug: "overview",
                    },
                  ].map((article) => (
                    <Link
                      key={article.slug}
                      href={`/resources/documentation/${article.category}/${article.slug}`}
                      className={cn(
                        "block p-4 rounded-lg",
                        "bg-slate-900/40 backdrop-blur-md",
                        "border border-slate-800/50",
                        "hover:border-teal-500/50",
                        "hover:bg-slate-900/60",
                        "transition-all duration-300",
                        "group"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 group-hover:text-teal-400 transition-colors">
                          {article.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:-translate-x-1 transition-all rotate-180" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </ContentSection>
      </div>
    </div>
  );
}
