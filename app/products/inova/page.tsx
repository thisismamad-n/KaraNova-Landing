import { Metadata } from "next";
import { generatePageMetadata, generateProductSchema } from "@/lib/seo/metadata";
import StructuredData from "@/app/_components/shared/StructuredData";
import InovaPageClient from "./InovaPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Inova - AI Business Intelligence",
  description:
    "Four specialized AI advisors for comprehensive business intelligence: Vision AI for market analysis, Govern AI for risk management, Supply AI for supply chain optimization, and Creative AI for content generation.",
  keywords: [
    "Inova",
    "AI Business Intelligence",
    "Vision AI",
    "Govern AI",
    "Supply AI",
    "Creative AI",
    "Market Analysis",
    "Risk Management",
    "Karanova",
    "اینووا",
    "هوش تجاری",
  ],
  ogImage: "/og-inova.jpg",
  canonical: "https://karanova.io/products/inova",
  language: "en",
});

export default function InovaPage() {
  const productSchema = generateProductSchema({
    name: "Inova - AI Business Intelligence",
    description:
      "Four specialized AI advisors for comprehensive business intelligence: Vision AI, Govern AI, Supply AI, and Creative AI",
    url: "https://karanova.io/products/inova",
    image: "https://karanova.io/og-inova.jpg",
    category: "BusinessApplication",
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <InovaPageClient />
    </>
  );
}
