import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import LandingPage from "./landing/page";

export const metadata: Metadata = generatePageMetadata({
  title: "کارانوا - پلتفرم مدیریت کسب‌وکار با هوش مصنوعی",
  description:
    "پلتفرم جامع مدیریت کسب‌وکار با هوش مصنوعی - اینووا برای هوش تجاری، تسک‌ایز برای مدیریت پروژه، و BIQ برای تحلیل داده. کاهش 60% زمان مدیریت پروژه با کمک AI.",
  keywords: [
    "کارانوا",
    "مدیریت کسب‌وکار",
    "هوش مصنوعی",
    "اینووا",
    "تسک‌ایز",
    "بی‌آی‌کیو",
    "مدیریت پروژه",
    "هوش تجاری",
    "داشبورد تحلیلی",
    "Karanova",
    "AI Business Management",
    "Project Management",
  ],
  canonical: "https://karanova.io",
  language: "fa",
});

export default function Home() {
  return <LandingPage />;
}
