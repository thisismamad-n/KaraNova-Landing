"use client";

import { Languages } from "lucide-react";

interface LanguageToggleProps {
  language: "en" | "fa";
  setLanguage: (lang: "en" | "fa") => void;
}

export default function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <button
      onClick={() => setLanguage(language === "en" ? "fa" : "en")}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-glow transition-all duration-300 border border-landing-primary/20"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5 text-landing-primary" />
      <span className="font-medium text-sm">{language === "en" ? "فارسی" : "English"}</span>
    </button>
  );
}
