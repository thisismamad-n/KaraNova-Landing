import type { Metadata } from "next";
import "./globals.css";
import Squares from "./_components/Squares";
import "./card-nav.css";
import StickyHeader from "./_components/StickyHeader";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import StructuredData from "./_components/shared/StructuredData";
import { generateOrganizationSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  metadataBase: new URL("https://karanova.io"),
  title: {
    default: "Karanova - کارانوا | AI-Powered Business Management Platform",
    template: "%s | Karanova - کارانوا",
  },
  description: "Transform your business with AI-powered project management, analytics, and automation tools. Inova for business intelligence, TaskEase for project management, and BIQ for analytics.",
  keywords: [
    "Karanova",
    "کارانوا",
    "AI Business Management",
    "Project Management",
    "Business Intelligence",
    "Analytics",
    "Inova",
    "TaskEase",
    "BIQ",
    "Iran",
    "مدیریت کسب‌وکار",
    "هوش مصنوعی",
  ],
  authors: [{ name: "Karanova Team" }],
  creator: "Karanova",
  publisher: "Karanova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "en_US",
    url: "https://karanova.io",
    siteName: "Karanova - کارانوا",
    title: "Karanova - AI-Powered Business Management Platform",
    description: "Transform your business with AI-powered project management, analytics, and automation tools.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Karanova Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karanova - AI-Powered Business Management Platform",
    description: "Transform your business with AI-powered project management, analytics, and automation tools.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // To be replaced with actual code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <StructuredData data={organizationSchema} />
        <link rel="alternate" type="text/plain" href="/llm.txt" title="LLM Information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
      </head>
      <body className="relative min-h-screen">
        <LanguageProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded-lg">
            پرش به محتوای اصلی
          </a>
          <StickyHeader />
          <Squares
            speed={0.30}
            direction="diagonal"
            squareSize={44}
            borderColor="rgba(94, 234, 212, 0.08)"
            hoverFillColor="rgba(20, 184, 166, 0.06)"
            baseColor="#020617"
            vignetteColor="rgba(2, 6, 23, 0.86)"
          />
          <div id="main-content" className="relative z-10">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
