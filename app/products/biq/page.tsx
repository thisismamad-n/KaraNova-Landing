import { Metadata } from "next";
import { generatePageMetadata, generateProductSchema } from "@/lib/seo/metadata";
import StructuredData from "@/app/_components/shared/StructuredData";
import BIQPageClient from "./BIQPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "BIQ Dashboard - Business Intelligence",
  description:
    "Real-time business health monitoring with interactive dashboards, KPI tracking, and deep insights. Make data-driven decisions with 92% analysis accuracy.",
  keywords: [
    "BIQ",
    "Business Intelligence",
    "Dashboard",
    "Analytics",
    "KPI Tracking",
    "Data Visualization",
    "Business Metrics",
    "Karanova",
    "بی‌آی‌کیو",
    "داشبورد",
  ],
  ogImage: "/og-biq.jpg",
  canonical: "https://karanova.io/products/biq",
  language: "en",
});

export default function BIQPage() {
  const productSchema = generateProductSchema({
    name: "BIQ Dashboard - Business Intelligence",
    description:
      "Real-time business health monitoring with interactive dashboards, KPI tracking, and deep insights",
    url: "https://karanova.io/products/biq",
    image: "https://karanova.io/og-biq.jpg",
    category: "BusinessApplication",
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <BIQPageClient />
    </>
  );
}
