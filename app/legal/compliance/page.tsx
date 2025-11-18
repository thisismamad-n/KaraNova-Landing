import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import CompliancePageClient from "./CompliancePageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "انطباق قانونی",
  description:
    "اطلاعات انطباق قانونی کارانوا - مجوزها، گواهینامه‌ها و اطلاعات ثبت شرکت",
  keywords: [
    "انطباق قانونی",
    "مجوزها",
    "گواهینامه",
    "کارانوا",
    "ثبت شرکت",
    "legal compliance",
    "certifications",
  ],
  canonical: "https://karanova.io/legal/compliance",
  language: "fa",
});

export default function CompliancePage() {
  return <CompliancePageClient />;
}
