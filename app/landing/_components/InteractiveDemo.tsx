"use client";

interface InteractiveDemoProps {
  language: "en" | "fa";
}

export default function InteractiveDemo({ language }: InteractiveDemoProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 8: Interactive Demo */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "تجربه کنید، نه فقط بخوانید" : "Experience it, don't just read"}
        </h2>
      </div>
    </section>
  );
}
