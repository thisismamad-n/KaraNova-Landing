"use client";

import { useState } from "react";
import { FeatureStepsDemo } from "@/components/ui/demo";
import HeroStroke from "./_components/HeroStroke";
import SnapScrollSection from "./_components/SnapScrollSection";
import FourAdvisorsSection from "./_components/FourAdvisorsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import TestimonialsSection from "./_components/Testimonials";
import FinalCTA from "./_components/FinalCTA";
import { MultiSectionPathDesigner } from "@/components/ui/multi-section-path-designer";
import { ContinuousPath } from "@/components/ui/ContinuousPath";

export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "fa">("en");

  // Toggle this to switch between designer mode and production mode
  const designerMode = false;

  return (
    <div dir={language === "fa" ? "rtl" : "ltr"} className="overflow-x-hidden">
      {/* Multi-section continuous path designer - Enable for designing */}
      <MultiSectionPathDesigner
        sectionIds={["why-choose-section", "testimonials-section", "final-cta-section"]}
        storageKey="karaNova-continuous-path"
        enabled={designerMode}
        label="طراح مسیر پیوسته (چرا کارانووا → نظرات → CTA)"
      />

      <HeroStroke />
      <SnapScrollSection />
      <FeatureStepsDemo language={language} />
      <FourAdvisorsSection />
      
      {/* Wrapper for sections with continuous path */}
      <div className="relative">
        {/* Continuous animated path - Enable for production */}
        <ContinuousPath
          sectionIds={["why-choose-section", "testimonials-section", "final-cta-section"]}
          pathData="M 1497.00 5.00 C 1503.33 24.50 1765.00 88.00 1535.00 122.00 C 1305.00 156.00 111.50 60.00 117.00 209.00 C 122.50 358.00 1550.33 825.33 1568.00 1016.00 C 1585.67 1206.67 272.50 1209.50 223.00 1353.00 C 173.50 1496.50 1100.67 1815.83 1271.00 1877.00 C 1441.33 1938.17 1294.83 1721.83 1245.00 1720.00 C 1195.17 1718.17 989.67 1877.83 972.00 1866.00 C 954.33 1854.17 1109.17 1641.50 1139.00 1649.00 C 1168.83 1656.50 1149.00 1867.33 1151.00 1911.00"
          gradientId="continuous-path-gradient"
          strokeWidth={12}
          enabled={!designerMode}
        />
        
        <WhyChooseUs language={language} />
        <TestimonialsSection />
        <FinalCTA />
      </div>
    </div>
  );
}
