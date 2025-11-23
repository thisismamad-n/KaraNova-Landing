import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "قیمت‌گذاری کارانوا - پلن‌های مناسب برای هر کسب‌وکار",
  description:
    "پلن‌های قیمت‌گذاری منعطف کارانوا را کشف کنید. از استارتاپ‌ها تا سازمان‌های بزرگ، راه‌حلی برای هر نیازی داریم. 14 روز رایگان امتحان کنید.",
  keywords: [
    "قیمت‌گذاری کارانوا",
    "پلن‌های کارانوا",
    "قیمت",
    "اشتراک",
    "نسخه رایگان",
    "Karanova Pricing",
    "Plans",
    "Subscription",
    "Free Trial",
  ],
  canonical: "https://karanova.io/pricing",
  language: "fa",
});

export default function PricingPage() {
  return <PricingPageClient />;
}
