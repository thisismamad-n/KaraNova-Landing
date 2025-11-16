"use client";

import { useState } from "react";
import { FeatureStepsDemo } from "@/components/ui/demo";
import HeroStroke from "./_components/HeroStroke";
import SnapScrollSection from "./_components/SnapScrollSection";
import FourAdvisorsSection from "./_components/FourAdvisorsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import TestimonialsSection from "./_components/Testimonials";
import FinalCTA from "./_components/FinalCTA";


export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "fa">("en");

  return (
    <div dir={language === "fa" ? "rtl" : "ltr"} className="overflow-x-hidden">
      <HeroStroke />
      <SnapScrollSection />
      <FeatureStepsDemo language={language} />
      <FourAdvisorsSection />
      <WhyChooseUs language={language} />
      <TestimonialsSection />
      <FinalCTA language={language} />
    </div>
  );
}
