import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import AboutPageClient from "@/app/about/AboutPageClient";

// Generate metadata for the About page
export const metadata: Metadata = generatePageMetadata({
  title: "درباره کارانوا",
  description:
    "درباره ماموریت کارانوا برای تحول مدیریت کسب‌وکار با راهکارهای مبتنی بر هوش مصنوعی بیاموزید. داستان، ارزش‌ها و تیم پشت پلتفرم را کشف کنید.",
  keywords: [
    "کارانوا",
    "درباره ما",
    "شرکت",
    "مدیریت کسب‌وکار هوش مصنوعی",
    "ماموریت",
    "چشم‌انداز",
    "ارزش‌ها",
    "تیم",
    "ایران",
    "فناوری",
    "Karanova",
    "About",
    "AI Business Management",
  ],
  canonical: "https://karanova.io/about",
  language: "fa",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
