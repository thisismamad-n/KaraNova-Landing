import { Metadata } from "next";
import DocumentationPageClient from "./DocumentationPageClient";

export const metadata: Metadata = {
  title: "مستندات | کارانوا",
  description: "راهنماها و مستندات جامع برای پلتفرم کارانوا - اینووا AI، تسک‌ایز و داشبورد BIQ",
  keywords: ["مستندات", "راهنما", "آموزش", "کمک", "کارانوا", "اینووا", "تسک‌ایز", "بی‌آی‌کیو", "documentation", "karanova"],
  openGraph: {
    title: "مستندات | کارانوا",
    description: "راهنماها و مستندات جامع برای پلتفرم کارانوا",
    images: ["/og-documentation.jpg"],
    locale: "fa_IR",
  },
};

export default function DocumentationPage() {
  return <DocumentationPageClient />;
}
