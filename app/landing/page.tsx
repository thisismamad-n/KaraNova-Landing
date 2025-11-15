"use client";

import { useState } from "react";
import { FeatureStepsDemo } from "@/components/ui/demo";
import HeroStroke from "./_components/HeroStroke";
import SnapScrollSection from "./_components/SnapScrollSection";
import AIAgents from "./_components/AIAgents";
import FeatureGrid from "./_components/FeatureGrid";
import Testimonials from "./_components/Testimonials";
import Pricing from "./_components/Pricing";
import InteractiveDemo from "./_components/InteractiveDemo";
import FAQ from "./_components/FAQ";
import FinalCTA from "./_components/FinalCTA";

export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "fa">("en");

  return (
    <div dir={language === "fa" ? "rtl" : "ltr"} className="overflow-x-hidden">
      <HeroStroke />
      <SnapScrollSection />
      <FeatureStepsDemo language={language} />
      <AIAgents language={language} />
      <FeatureGrid language={language} />
      <Testimonials language={language} />
      <Pricing language={language} />
      <InteractiveDemo language={language} />
      <FAQ language={language} />
      <FinalCTA language={language} />
    </div>
  );
}
