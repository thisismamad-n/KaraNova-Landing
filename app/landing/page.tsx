"use client";

import { useState, lazy, Suspense } from "react";
import HeroStroke from "./_components/HeroStroke";
import SnapScrollSection from "./_components/SnapScrollSection";
import FourAdvisorsSection from "./_components/FourAdvisorsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import TestimonialsSection from "./_components/Testimonials";
import FinalCTA from "./_components/FinalCTA";
import { ContinuousPath } from "@/components/ui/ContinuousPath";
import Squares from "@/app/_components/Squares";
import { useMediaQuery } from "@/hooks/use-media-query";

// Lazy load heavy components
const FeatureStepsDemo = lazy(() => import("@/components/ui/demo").then(mod => ({ default: mod.FeatureStepsDemo })));

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function LandingPage() {
  const [language] = useState<"en" | "fa">("fa");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPathComplete, setIsPathComplete] = useState(false);

  return (
    <div dir={language === "fa" ? "rtl" : "ltr"} className="overflow-x-hidden">
      {/* Global animated background - fixed position, covers all slides */}
      <Squares
        speed={0.3}
        direction="diagonal"
        squareSize={44}
        borderColor="rgba(94, 234, 212, 0.05)"
        hoverFillColor="rgba(20, 184, 166, 0.04)"
        baseColor="#010409"
        vignetteColor="rgba(1, 4, 9, 0.92)"
      />

      <HeroStroke />
      <SnapScrollSection />

      <Suspense fallback={<LoadingFallback />}>
        <FeatureStepsDemo language={language} />
      </Suspense>

      <FourAdvisorsSection />

      {/* Wrapper for sections with continuous path */}
      <div className="relative">
        {/* Continuous animated path */}
        {/* Continuous animated path */}
        <ContinuousPath
          sectionIds={["why-choose-section", "testimonials-section", "final-cta-section"]}
          pathData="M 1497.00 5.00 C 1503.33 24.50 1765.00 88.00 1535.00 122.00 C 1305.00 156.00 111.50 60.00 117.00 209.00 C 122.50 358.00 1550.33 825.33 1568.00 1016.00 C 1585.67 1206.67 272.50 1209.50 223.00 1353.00 C 173.50 1496.50 1100.67 1815.83 1271.00 1877.00 C 1441.33 1938.17 1294.83 1721.83 1245.00 1720.00 C 1195.17 1718.17 989.67 1877.83 972.00 1866.00 C 954.33 1854.17 1109.17 1641.50 1139.00 1649.00 C 1168.83 1656.50 1149.00 1867.33 1151.00 1918.00"
          gradientId="continuous-path-gradient"
          strokeWidth={12}
          enabled={true}
          onComplete={setIsPathComplete}
        />

        {/* Intense glow at the end point of continuous path - positioned at last coordinate (1151, 1918) */}
        {/* Using percentage-based positioning for responsiveness */}
        {!isMobile && (
          <div
            className={`absolute pointer-events-none z-50 transition-opacity duration-1000 ${isPathComplete ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: 'calc(1151 / 1920 * 100%)', // Responsive positioning based on design width
              top: '1918px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Core bright spot - very intense */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
              style={{
                background: 'radial-gradient(circle, rgba(94, 234, 212, 1) 0%, rgba(94, 234, 212, 0.9) 20%, rgba(20, 184, 166, 0.6) 50%, transparent 100%)',
                filter: 'blur(8px)',
              }}
            />
            {/* Inner glow layer */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
              style={{
                background: 'radial-gradient(circle, rgba(94, 234, 212, 0.8) 0%, rgba(20, 184, 166, 0.5) 40%, transparent 100%)',
                filter: 'blur(20px)',
              }}
            />
            {/* Outer atmospheric glow - smaller */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80"
              style={{
                background: 'radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, rgba(20, 184, 166, 0.2) 50%, transparent 100%)',
                filter: 'blur(40px)',
              }}
            />
          </div>
        )}

        <WhyChooseUs language={language} />
        <TestimonialsSection />
        <FinalCTA showContent={isMobile || isPathComplete} />
      </div>
    </div>
  );
}
