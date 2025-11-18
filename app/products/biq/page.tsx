import { Metadata } from "next";
import BIQPageClient from "./BIQPageClient";

export const metadata: Metadata = {
  title: "BIQ Dashboard - Business Intelligence | Karanova",
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
  ],
  openGraph: {
    title: "BIQ Dashboard - Business Intelligence",
    description:
      "Real-time business health monitoring with interactive dashboards and KPI tracking",
    images: ["/og-biq.jpg"],
  },
};

export default function BIQPage() {
  return <BIQPageClient />;
}
