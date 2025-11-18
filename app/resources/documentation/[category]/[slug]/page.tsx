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

  return {
    title: `${doc.title} | مستندات کارانوا`,
    description: doc.content.substring(0, 160),
    keywords: doc.searchKeywords,
    openGraph: {
      title: doc.title,
      description: doc.content.substring(0, 160),
      type: "article",
      publishedTime: doc.lastUpdated.toISOString(),
      locale: "fa_IR",
    },
  };
}

export default async function DocArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const doc = getDocBySlug(category, slug);

  if (!doc) {
    notFound();
  }

  return <DocArticleClient doc={doc} />;
}
