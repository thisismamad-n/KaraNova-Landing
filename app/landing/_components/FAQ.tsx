"use client";

interface FAQProps {
  language: "en" | "fa";
}

export default function FAQ({ language }: FAQProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-landing-bg-light">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 9: FAQ Accordion */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "سوالات متداول" : "Frequently Asked Questions"}
        </h2>
      </div>
    </section>
  );
}
