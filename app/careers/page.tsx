import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import CareersPageClient from "@/app/careers/CareersPageClient";

// Generate metadata for the Careers page
export const metadata: Metadata = generatePageMetadata({
  title: "فرصت‌های شغلی کارانوا",
  description:
    "به تیم کارانوا بپیوندید و در یک محیط کاری نوآورانه با فرهنگ قوی و مزایای عالی کار کنید. موقعیت‌های شغلی باز را مشاهده کنید.",
  keywords: [
    "کارانوا",
    "فرصت‌های شغلی",
    "استخدام",
    "کار",
    "شغل",
    "تیم",
    "فرهنگ شرکت",
    "مزایا",
    "Karanova",
    "Careers",
    "Jobs",
    "Hiring",
    "Team",
  ],
  canonical: "https://karanova.io/careers",
  language: "fa",
});

export default function CareersPage() {
  return <CareersPageClient />;
}
