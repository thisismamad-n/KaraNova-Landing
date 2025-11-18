import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "شرایط استفاده",
  description:
    "شرایط و ضوابط استفاده از خدمات کارانوا - اطلاعات کامل درباره حقوق و تعهدات کاربران",
  keywords: [
    "شرایط استفاده",
    "قوانین",
    "کارانوا",
    "ضوابط",
    "قرارداد کاربری",
    "terms of service",
    "terms of use",
  ],
  canonical: "https://karanova.io/legal/terms",
  language: "fa",
  lastModified: new Date("2024-01-15"),
});

export default function TermsPage() {
  return <TermsPageClient />;
}
