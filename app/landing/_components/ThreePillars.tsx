"use client";

interface ThreePillarsProps {
  language: "en" | "fa";
}

export default function ThreePillars({ language }: ThreePillarsProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-landing-bg-light">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 3: The Three Pillars */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "سه ستون اصلی" : "Three Pillars"}
        </h2>
      </div>
    </section>
  );
}
