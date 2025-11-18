import type { Metadata } from "next";
import "./globals.css";
import Squares from "./_components/Squares";
import "./card-nav.css";
import StickyHeader from "./_components/StickyHeader";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Karanova - کارانوا | Business Management Platform",
  description: "Transform your business with AI-powered project management, analytics, and automation tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <LanguageProvider>
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
          <div className="relative z-10">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
