import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import DocumentationPageClient from "./DocumentationPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "مستندات کارانوا",
  description: "راهنماها و مستندات جامع برای پلتفرم کارانوا - اینووا AI، تسک‌ایز و داشبورد BIQ",
  keywords: ["مستندات", "راهنما", "آموزش", "کمک", "کارانوا", "اینووا", "تسک‌ایز", "بی‌آی‌کیو", "documentation", "karanova"],
  ogImage: "/og-documentation.jpg",
  canonical: "https://karanova.io/resources/documentation",
  language: "fa",
});

export default function DocumentationPage() {
  return <DocumentationPageClient />;
}
