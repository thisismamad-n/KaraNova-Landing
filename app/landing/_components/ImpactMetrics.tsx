"use client";

interface ImpactMetricsProps {
  language: "en" | "fa";
}

export default function ImpactMetrics({ language }: ImpactMetricsProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 2: Number Flow - Impact Metrics */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "تاثیر واقعی" : "Real Impact"}
        </h2>
      </div>
    </section>
  );
}
