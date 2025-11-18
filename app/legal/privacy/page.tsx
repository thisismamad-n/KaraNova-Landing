import { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "سیاست حفظ حریم خصوصی | کارانوا",
  description:
    "سیاست حفظ حریم خصوصی کارانوا - اطلاعات جامع درباره نحوه جمع‌آوری، استفاده و حفاظت از داده‌های شخصی شما",
  keywords: [
    "حریم خصوصی",
    "سیاست حفظ حریم خصوصی",
    "کارانوا",
    "حفاظت از داده",
    "امنیت اطلاعات",
  ],
  openGraph: {
    title: "سیاست حفظ حریم خصوصی | کارانوا",
    description:
      "اطلاعات جامع درباره نحوه جمع‌آوری، استفاده و حفاظت از داده‌های شخصی شما در کارانوا",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
