import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import APIPageClient from "./APIPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "API Documentation",
  description: "Complete API documentation for Karanova platform - Authentication, endpoints, and integration guides",
  keywords: ["API", "documentation", "REST API", "integration", "Karanova", "developer", "مستندات API"],
  ogImage: "/og-api-docs.jpg",
  canonical: "https://karanova.io/resources/api",
  language: "en",
});

export default function APIPage() {
  return <APIPageClient />;
}
