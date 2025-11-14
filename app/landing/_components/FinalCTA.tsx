"use client";

interface FinalCTAProps {
  language: "en" | "fa";
}

export default function FinalCTA({ language }: FinalCTAProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-landing-primary to-landing-accent">
      <div className="container mx-auto px-4 text-center text-white">
        {/* Placeholder for Section 10: Final CTA with Gradient */}
        <h2 className="text-5xl font-bold mb-8">
          {language === "fa" ? "آماده برای تحول کسب‌وکار خود؟" : "Ready to transform your business?"}
        </h2>
        <button className="px-8 py-4 bg-white text-landing-primary rounded-full font-bold text-lg hover:shadow-glow transition-all">
          {language === "fa" ? "شروع رایگان - بدون نیاز به کارت" : "Start Free - No Credit Card"}
        </button>
      </div>
    </section>
  );
}
