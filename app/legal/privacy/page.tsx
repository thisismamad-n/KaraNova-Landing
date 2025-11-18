import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "سیاست حفظ حریم خصوصی",
  description:
    "سیاست حفظ حریم خصوصی کارانوا - اطلاعات جامع درباره نحوه جمع‌آوری، استفاده و حفاظت از داده‌های شخصی شما",
  keywords: [
    "حریم خصوصی",
    "سیاست حفظ حریم خصوصی",
    "کارانوا",
    "حفاظت از داده",
    "امنیت اطلاعات",
    "privacy policy",
    "data protection",
  ],
  canonical: "https://karanova.io/legal/privacy",
  language: "fa",
  lastModified: new Date("2024-01-15"),
});

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
