import { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "شرایط استفاده | کارانوا",
  description:
    "شرایط و ضوابط استفاده از خدمات کارانوا - اطلاعات کامل درباره حقوق و تعهدات کاربران",
  keywords: [
    "شرایط استفاده",
    "قوانین",
    "کارانوا",
    "ضوابط",
    "قرارداد کاربری",
  ],
  openGraph: {
    title: "شرایط استفاده | کارانوا",
    description:
      "شرایط و ضوابط استفاده از خدمات کارانوا - اطلاعات کامل درباره حقوق و تعهدات کاربران",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
