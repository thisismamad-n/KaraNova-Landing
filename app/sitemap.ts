import { MetadataRoute } from "next";
import { mockJobs } from "@/app/careers/_data/jobs";
import { mockBlogs } from "@/app/resources/blog/_data/blogs";
import { docArticles } from "@/app/resources/documentation/_data/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://karanova.io";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/inova`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/taskease`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/biq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/documentation`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/api`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/compliance`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dynamic job pages
  const jobPages = mockJobs.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: job.postedDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic blog pages
  const blogPages = mockBlogs.map((blog) => ({
    url: `${baseUrl}/resources/blog/${blog.slug}`,
    lastModified: blog.updatedDate || blog.publishedDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic documentation pages
  const docPages = docArticles.map((doc) => ({
    url: `${baseUrl}/resources/documentation/${doc.category}/${doc.slug}`,
    lastModified: doc.lastUpdated,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...jobPages, ...blogPages, ...docPages];
}
