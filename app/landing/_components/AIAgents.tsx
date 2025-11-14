"use client";

interface AIAgentsProps {
  language: "en" | "fa";
}

export default function AIAgents({ language }: AIAgentsProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        {/* Placeholder for Section 4: AI Agents Showcase */}
        <h2 className="text-4xl font-bold text-center">
          {language === "fa" ? "چهار مشاور هوشمند، یک پلتفرم" : "Four AI Advisors, One Platform"}
        </h2>
      </div>
    </section>
  );
}
