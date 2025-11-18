import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import BlogPostClient from "@/app/resources/blog/[slug]/BlogPostClient";
import { mockBlogs } from "@/app/resources/blog/_data/blogs";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return mockBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogs.find((blog) => blog.slug === slug);

  if (!post) {
    return {
      title: "مقاله یافت نشد",
      description: "مقاله درخواستی یافت نشد.",
    };
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category],
    canonical: `https://karanova.io/resources/blog/${post.slug}`,
    language: "fa",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
