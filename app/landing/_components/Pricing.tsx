"use client";

interface PricingProps {
  language: "en" | "fa";
}

export default function Pricing({ language }: PricingProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-landing-bg-light">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 7: Pricing Tiers */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "قیمت‌گذاری" : "Pricing"}
        </h2>
      </div>
    </section>
  );
}
