import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import dynamic from "next/dynamic";

const ContactPageClient = dynamic(() => import("./ContactPageClient"), {
  ssr: true,
});

export const metadata: Metadata = generatePageMetadata({
  title: "تماس با کارانوا",
  description:
    "با تیم کارانوا در ارتباط باشید. اطلاعات تماس، آدرس دفاتر و فرم تماس برای ارتباط سریع.",
  keywords: [
    "تماس",
    "کارانوا",
    "ارتباط",
    "آدرس",
    "Contact",
    "Address",
    "Phone",
  ],
  canonical: "https://karanova.io/contact",
  language: "fa",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
