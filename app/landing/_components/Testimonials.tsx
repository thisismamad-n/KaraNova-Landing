"use client";

interface TestimonialsProps {
  language: "en" | "fa";
}

export default function Testimonials({ language }: TestimonialsProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 6: Social Proof & Testimonials */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "چرا کسب‌وکارها کارانوا را انتخاب می‌کنند؟" : "Why businesses choose Karanova"}
        </h2>
      </div>
    </section>
  );
}
