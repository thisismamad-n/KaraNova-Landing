import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import BlogListingClient from "@/app/resources/blog/BlogListingClient";

// Generate metadata for the Blog page
export const metadata: Metadata = generatePageMetadata({
  title: "وبلاگ کارانوا",
  description:
    "بینش‌ها، آموزش‌ها و بروزرسانی‌های محصول درباره مدیریت کسب‌وکار مبتنی بر هوش مصنوعی و روندهای صنعتی.",
  keywords: [
    "وبلاگ",
    "کارانوا",
    "هوش مصنوعی",
    "مدیریت پروژه",
    "تجارت",
    "Blog",
    "Karanova",
    "AI",
    "Business",
  ],
  canonical: "https://karanova.io/resources/blog",
  language: "fa",
});

export default function BlogPage() {
  return <BlogListingClient />;
}
