"use client";

import React from "react";
import PageHero from "@/app/_components/shared/PageHero";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import CompanyTimeline from "@/app/about/_components/CompanyTimeline";
import MissionVisionValues from "@/app/about/_components/MissionVisionValues";
import CompanyStats from "@/app/about/_components/CompanyStats";
import TeamHighlights from "@/app/about/_components/TeamHighlights";

export default function AboutPageClient() {
  const { language } = useLanguage();

  // Bilingual content
  const content = {
    en: {
      hero: {
        title: "About Karanova",
        subtitle:
          "Empowering businesses with AI-driven solutions for smarter management and growth",
      },
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ],
    },
    fa: {
      hero: {
        title: "درباره کارانوا",
        subtitle:
          "توانمندسازی کسب‌وکارها با راهکارهای هوش مصنوعی برای مدیریت هوشمندتر و رشد بیشتر",
      },
      breadcrumbs: [
        { label: "خانه", href: "/" },
        { label: "درباره ما", href: "/about" },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="relative min-h-screen bg-slate-950" dir={language === "fa" ? "rtl" : "ltr"}>
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="rgba(94, 234, 212, 0.08)"
          hoverFillColor="rgba(94, 234, 212, 0.05)"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <PageHero
          title={currentContent.hero.title}
          subtitle={currentContent.hero.subtitle}
          backgroundVariant="animated"
          breadcrumbs={currentContent.breadcrumbs}
        />

        {/* Main Content Sections */}
        <main className="pb-20">
          {/* Mission, Vision, Values */}
          <MissionVisionValues language={language} />

          {/* Company Stats */}
          <CompanyStats language={language} />

          {/* Company Timeline */}
          <CompanyTimeline language={language} />

          {/* Team Highlights */}
          <TeamHighlights language={language} />
        </main>
      </div>
    </div>
  );
}
