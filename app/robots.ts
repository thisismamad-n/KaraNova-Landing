import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://karanova.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llm.txt", "/llms.txt"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llm.txt", "/llms.txt"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/llm.txt", "/llms.txt"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/llm.txt", "/llms.txt"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llm.txt", "/llms.txt"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
