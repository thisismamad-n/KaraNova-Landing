"use client";

interface FeatureGridProps {
  language: "en" | "fa";
}

export default function FeatureGrid({ language }: FeatureGridProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-landing-bg-light">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 5: Feature Grid with Scroll Reveals */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "ویژگی‌ها" : "Features"}
        </h2>
      </div>
    </section>
  );
}
