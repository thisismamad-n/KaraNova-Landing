"use client";

import React, { useState, useMemo } from "react";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import BlogCard from "@/app/resources/blog/_components/BlogCard";
import BlogFilter from "@/app/resources/blog/_components/BlogFilter";
import { mockBlogs, blogTranslations, BlogCategory } from "@/app/resources/blog/_data/blogs";

export default function BlogListingClient() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");

  // Bilingual content
  const content = {
    en: {
      hero: {
        title: "Blog",
        subtitle:
          "Insights, tutorials, and updates about AI-powered business management and industry trends",
      },
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources" },
        { label: "Blog", href: "/resources/blog" },
      ],
    },
    fa: {
      hero: {
        title: "وبلاگ",
        subtitle:
          "بینش‌ها، آموزش‌ها و بروزرسانی‌ها درباره مدیریت کسب‌وکار مبتنی بر هوش مصنوعی و روندهای صنعتی",
      },
      breadcrumbs: [
        { label: "خانه", href: "/" },
        { label: "منابع", href: "/resources" },
        { label: "وبلاگ", href: "/resources/blog" },
      ],
    },
  };

  const currentContent = content[language];

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "all") {
      return mockBlogs;
    }
    return mockBlogs.filter((blog) => blog.category === selectedCategory);
  }, [selectedCategory]);

  // Get unique categories
  const categories = Array.from(new Set(mockBlogs.map((blog) => blog.category))) as BlogCategory[];

  return (
    <div
      className="relative min-h-screen bg-slate-950"
      dir={language === "fa" ? "rtl" : "ltr"}
    >
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
          title={currentContent.hero.title}
          subtitle={currentContent.hero.subtitle}
          backgroundVariant="animated"
          breadcrumbs={currentContent.breadcrumbs}
        />

        {/* Main Content */}
        <main className="pb-20">
          <ContentSection maxWidth="xl">
            {/* Filter Section */}
            <div className="mb-12">
              <BlogFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                language={language}
                translations={blogTranslations}
              />
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    post={blog}
                    language={language}
                    translations={blogTranslations}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg mb-2">
                  {blogTranslations[language].labels.noBlog}
                </p>
                <p className="text-slate-500 text-sm">
                  {blogTranslations[language].labels.checkBackSoon}
                </p>
              </div>
            )}
          </ContentSection>
        </main>
      </div>
    </div>
  );
}
