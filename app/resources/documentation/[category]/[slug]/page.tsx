import { Metadata } from "next";
import { notFound } from "next/navigation";
import { docArticles, getDocBySlug } from "../../_data/docs";
import DocArticleClient from "./DocArticleClient";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Generate static params for all documentation articles
export async function generateStaticParams() {
  return docArticles.map((doc) => ({
    category: doc.category,
    slug: doc.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const doc = getDocBySlug(category, slug);

  if (!doc) {
    return {
      title: "مقاله یافت نشد | مستندات کارانوا",
    };
  }

  const { generatePageMetadata } = await import("@/lib/seo/metadata");
  
  return generatePageMetadata({
    title: `${doc.title} - مستندات کارانوا`,
    description: doc.content.substring(0, 160),
    keywords: doc.searchKeywords,
    canonical: `https://karanova.io/resources/documentation/${category}/${slug}`,
    language: "fa",
    lastModified: doc.lastUpdated,
  });
}

export default async function DocArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const doc = getDocBySlug(category, slug);

  if (!doc) {
    notFound();
  }

  return <DocArticleClient doc={doc} />;
}
