import { Metadata } from "next";
import APIPageClient from "./APIPageClient";

export const metadata: Metadata = {
  title: "API Documentation | Karanova",
  description: "Complete API documentation for Karanova platform - Authentication, endpoints, and integration guides",
  keywords: ["API", "documentation", "REST API", "integration", "Karanova", "developer", "مستندات API"],
  openGraph: {
    title: "API Documentation | Karanova",
    description: "Complete API documentation for Karanova platform",
    images: ["/og-api-docs.jpg"],
    locale: "en_US",
    alternateLocale: "fa_IR",
  },
  alternates: {
    canonical: "https://karanova.io/resources/api",
    languages: {
      en: "https://karanova.io/en/resources/api",
      fa: "https://karanova.io/fa/resources/api",
    },
  },
};

export default function APIPage() {
  return <APIPageClient />;
}
