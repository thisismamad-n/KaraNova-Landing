"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import ShareButtons from "@/app/resources/blog/_components/ShareButtons";
import RelatedPosts from "@/app/resources/blog/_components/RelatedPosts";
import { mockBlogs, blogTranslations } from "@/app/resources/blog/_data/blogs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const { language } = useLanguage();

  // Find the blog post and its index
  const currentIndex = React.useMemo(
    () => mockBlogs.findIndex((blog) => blog.slug === slug),
    [slug]
  );

  const post = currentIndex !== -1 ? mockBlogs[currentIndex] : undefined;

  if (!post) {
    return (
      <div
        className="relative min-h-screen bg-slate-950"
        dir={language === "fa" ? "rtl" : "ltr"}
      >
        <div className="fixed inset-0 z-0">
          <Squares
            direction="diagonal"
            speed={0.5}
            squareSize={40}
            borderColor="rgba(94, 234, 212, 0.08)"
            hoverFillColor="rgba(94, 234, 212, 0.05)"
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              {language === "fa" ? "مقاله یافت نشد" : "Post not found"}
            </h1>
            <Link
              href="/resources/blog"
              className={cn(
                "inline-flex items-center gap-2",
                "px-6 py-3 rounded-lg",
                "bg-teal-500 text-white font-semibold",
                "hover:bg-teal-600 transition-colors",
                language === "fa" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {language === "fa" ? "بازگشت به وبلاگ" : "Back to Blog"}
              <ChevronLeft size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = language === "fa" ? post.title : post.titleEn;
  const content = language === "fa" ? post.content : post.contentEn;
  const authorName = language === "fa" ? post.author.name : post.author.nameEn;
  const authorBio = language === "fa" ? post.author.bio : post.author.bioEn;
  const publishedOnLabel = blogTranslations[language].labels.publishedOn;
  const readTimeLabel = blogTranslations[language].labels.readTime;
  const backToBlogLabel = blogTranslations[language].labels.backToBlog;

  const formattedDate = new Intl.DateTimeFormat(
    language === "fa" ? "fa-IR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(post.publishedDate);

  // Get previous and next posts
  const previousPost = currentIndex > 0 ? mockBlogs[currentIndex - 1] : null;
  const nextPost =
    currentIndex !== -1 && currentIndex < mockBlogs.length - 1 ? mockBlogs[currentIndex + 1] : null;

  const previousPostTitle =
    language === "fa" ? previousPost?.title : previousPost?.titleEn;
  const nextPostTitle =
    language === "fa" ? nextPost?.title : nextPost?.titleEn;

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
          title={title}
          backgroundVariant="animated"
          breadcrumbs={[
            { label: language === "fa" ? "خانه" : "Home", href: "/" },
            {
              label: language === "fa" ? "وبلاگ" : "Blog",
              href: "/resources/blog",
            },
            { label: title, href: `/resources/blog/${slug}` },
          ]}
        />

        {/* Main Content */}
        <main className="pb-20">
          <ContentSection maxWidth="lg">
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className={cn(
                    "inline-block px-4 py-2 rounded-full text-sm font-semibold",
                    "bg-teal-500/20 text-teal-300",
                    "border border-teal-500/30"
                  )}
                >
                  {post.category}
                </span>
              </div>

              {/* Meta Information */}
              <div
                className={cn(
                  "flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-6",
                  language === "fa" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <span>{authorName}</span>
                <span>•</span>
                <span>
                  {publishedOnLabel} {formattedDate}
                </span>
                <span>•</span>
                <span>
                  {post.readTime} {readTimeLabel}
                </span>
              </div>


            </motion.div>

            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "prose prose-invert max-w-none mb-12",
                "text-slate-300 leading-relaxed"
              )}
            >
              {content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-slate-300">
                  {paragraph}
                </p>
              ))}
            </motion.article>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="py-8 border-t border-b border-slate-700/50"
            >
              <ShareButtons
                title={title}
                url={`https://karanova.io/resources/blog/${slug}`}
                language={language}
                translations={blogTranslations}
              />
            </motion.div>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "flex items-center gap-4 py-8 px-6 rounded-lg",
                "bg-gradient-to-r from-slate-800/50 to-slate-900/50",
                "border border-slate-700/50",
                language === "fa" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={authorName}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <div className={language === "fa" ? "text-right" : "text-left"}>
                <h4 className="font-bold text-slate-100 mb-1">{authorName}</h4>
                {authorBio && (
                  <p className="text-slate-400 text-sm">{authorBio}</p>
                )}
              </div>
            </motion.div>

            {/* Related Posts */}
            <RelatedPosts
              currentPost={post}
              language={language}
              translations={blogTranslations}
            />

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-6 mt-12",
                language === "fa" ? "grid-flow-dense" : ""
              )}
            >
              {previousPost ? (
                <Link
                  href={`/resources/blog/${previousPost.slug}`}
                  className={cn(
                    "group p-6 rounded-lg",
                    "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
                    "border border-slate-700/50 hover:border-teal-500/50",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
                    language === "fa" ? "md:col-start-2" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-3 mb-2",
                      language === "fa" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <ChevronLeft
                      size={20}
                      className={cn(
                        "text-teal-400 group-hover:text-teal-300 transition-colors",
                        language === "fa" ? "rotate-180" : ""
                      )}
                    />
                    <span className="text-sm text-slate-400">
                      {language === "fa"
                        ? blogTranslations.fa.labels.previousPost
                        : blogTranslations.en.labels.previousPost}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-100 group-hover:text-teal-300 transition-colors line-clamp-2">
                    {previousPostTitle}
                  </h5>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/resources/blog/${nextPost.slug}`}
                  className={cn(
                    "group p-6 rounded-lg",
                    "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
                    "border border-slate-700/50 hover:border-teal-500/50",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]",
                    language === "fa" ? "md:col-start-1" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-3 mb-2",
                      language === "fa" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <span className="text-sm text-slate-400">
                      {language === "fa"
                        ? blogTranslations.fa.labels.nextPost
                        : blogTranslations.en.labels.nextPost}
                    </span>
                    <ChevronRight
                      size={20}
                      className={cn(
                        "text-teal-400 group-hover:text-teal-300 transition-colors",
                        language === "fa" ? "rotate-180" : ""
                      )}
                    />
                  </div>
                  <h5 className="font-bold text-slate-100 group-hover:text-teal-300 transition-colors line-clamp-2">
                    {nextPostTitle}
                  </h5>
                </Link>
              ) : (
                <div />
              )}
            </motion.div>

            {/* Back to Blog Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link
                href="/resources/blog"
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-6 py-3 rounded-lg",
                  "bg-teal-500/20 text-teal-300",
                  "border border-teal-500/30",
                  "hover:bg-teal-500/30 transition-colors",
                  "font-semibold",
                  language === "fa" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <ChevronLeft
                  size={20}
                  className={language === "fa" ? "rotate-180" : ""}
                />
                {backToBlogLabel}
              </Link>
            </motion.div>
          </ContentSection>
        </main>
      </div>
    </div>
  );
}
