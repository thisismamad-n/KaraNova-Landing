"use client";

import React from "react";
import PageHero from "@/app/_components/shared/PageHero";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import PricingTiers from "./PricingTiers";
import PricingFAQ from "./PricingFAQ";
import PricingComparison from "./PricingComparison";
import EnterpriseCTA from "./EnterpriseCTA";

export default function PricingPageClient() {
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: "Simple, Transparent Pricing",
        subtitle:
          "Choose the perfect plan for your business. Start free, scale as you grow. No hidden fees, cancel anytime.",
      },
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    fa: {
      hero: {
        title: "قیمت‌گذاری ساده و شفاف",
        subtitle:
          "پلن مناسب کسب‌وکار خود را انتخاب کنید. رایگان شروع کنید، با رشد خود مقیاس دهید. بدون هزینه پنهان، هر زمان لغو کنید.",
      },
      breadcrumbs: [
        { label: "خانه", href: "/" },
        { label: "قیمت‌گذاری", href: "/pricing" },
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

        {/* Main Content */}
        <main className="pb-20">
          {/* Pricing Tiers */}
          <PricingTiers language={language} />

          {/* Feature Comparison Table */}
          <PricingComparison language={language} />

          {/* Enterprise CTA */}
          <EnterpriseCTA language={language} />

          {/* FAQ Section */}
          <PricingFAQ language={language} />
        </main>
      </div>
    </div>
  );
}
