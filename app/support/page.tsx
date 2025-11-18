import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import dynamic from "next/dynamic";

const SupportPageClient = dynamic(() => import("./SupportPageClient"), {
  ssr: true,
});

export const metadata: Metadata = generatePageMetadata({
  title: "پشتیبانی کارانوا",
  description:
    "دسترسی به منابع پشتیبانی، سوالات متداول و راه‌های ارتباطی برای دریافت کمک از تیم کارانوا.",
  keywords: [
    "پشتیبانی",
    "کارانوا",
    "کمک",
    "سوالات متداول",
    "Support",
    "Help",
    "FAQ",
  ],
  canonical: "https://karanova.io/support",
  language: "fa",
});

export default function SupportPage() {
  return <SupportPageClient />;
}
