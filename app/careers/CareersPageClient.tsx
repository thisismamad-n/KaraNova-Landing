"use client";

import React from "react";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import CultureShowcase from "@/app/careers/_components/CultureShowcase";
import BenefitsGrid from "@/app/careers/_components/BenefitsGrid";
import JobListings from "@/app/careers/_components/JobListings";

export default function CareersPageClient() {
  const { language } = useLanguage();

  // Bilingual content
  const content = {
    en: {
      hero: {
        title: "Join Our Team",
        subtitle:
          "Build the future of AI-powered business management with talented people who share your passion for innovation",
      },
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Careers", href: "/careers" },
      ],
    },
    fa: {
      hero: {
        title: "به تیم ما بپیوندید",
        subtitle:
          "آینده مدیریت کسب‌وکار مبتنی بر هوش مصنوعی را با افراد با استعدادی که اشتیاق شما را برای نوآوری به اشتراک می‌گذارند، بسازید",
      },
      breadcrumbs: [
        { label: "خانه", href: "/" },
        { label: "فرصت‌های شغلی", href: "/careers" },
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
          {/* Culture Showcase */}
          <CultureShowcase language={language} />

          {/* Benefits Grid */}
          <BenefitsGrid language={language} />

          {/* Job Listings */}
          <ContentSection maxWidth="xl">
            <JobListings language={language} />
          </ContentSection>
        </main>
      </div>
    </div>
  );
}
