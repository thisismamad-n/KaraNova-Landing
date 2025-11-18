import { Metadata } from "next";
import InovaPageClient from "./InovaPageClient";

export const metadata: Metadata = {
  title: "Inova - AI Business Intelligence | Karanova",
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
  ],
  openGraph: {
    title: "Inova - AI Business Intelligence",
    description:
      "Four specialized AI advisors for comprehensive business intelligence",
    images: ["/og-inova.jpg"],
  },
};

export default function InovaPage() {
  return <InovaPageClient />;
}
