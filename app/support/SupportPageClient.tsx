"use client";

import React, { useState, useMemo, useRef } from "react";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import SupportChannels from "./_components/SupportChannels";
import FAQAccordion from "./_components/FAQAccordion";
import SearchFAQ from "./_components/SearchFAQ";
import AIChatSupport from "./_components/AIChatSupport";
import SupportForm from "./_components/SupportForm";
import { mockFAQs } from "./_data/faqs";

export default function SupportPageClient() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Bilingual content
  const content = {
    fa: {
      hero: {
        title: "پشتیبانی کارانوا",
        subtitle:
          "ما اینجا هستیم تا به شما کمک کنیم. سوالات خود را بپرسید یا با تیم پشتیبانی ما در ارتباط باشید.",
      },
      breadcrumbs: [
        { label: "خانه", href: "/" },
        { label: "پشتیبانی", href: "/support" },
      ],
      faqTitle: "سوالات متداول",
      faqSubtitle: "پاسخ سوالات رایج کاربران",
    },
    en: {
      hero: {
        title: "Karanova Support",
        subtitle:
          "We're here to help. Ask your questions or get in touch with our support team.",
      },
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Support", href: "/support" },
      ],
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Answers to common user questions",
    },
  };

  const currentContent = content[language];

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockFAQs;
    }
    const query = searchQuery.toLowerCase();
    return mockFAQs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle opening chat and scrolling to it
  const handleOpenChat = () => {
    setIsChatOpen(true);
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <div
      className="relative min-h-screen bg-slate-950"
      dir={language === "fa" ? "rtl" : "ltr"}
    >
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
          {/* Support Channels */}
          <ContentSection maxWidth="xl" variant="default">
            <SupportChannels language={language} onOpenChat={handleOpenChat} />
          </ContentSection>

          {/* AI Chat Support - Only show when opened */}
          {isChatOpen && (
            <ContentSection maxWidth="xl" variant="default">
              <div ref={chatRef}>
                <AIChatSupport language={language} />
              </div>
            </ContentSection>
          )}

          {/* FAQ Section */}
          <ContentSection maxWidth="xl" variant="default">
            <div className="space-y-8">
              {/* FAQ Header */}
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
                  {currentContent.faqTitle}
                </h2>
                <p className="text-lg text-slate-400">
                  {currentContent.faqSubtitle}
                </p>
              </div>

              {/* Search */}
              <SearchFAQ onSearch={setSearchQuery} language={language} />

              {/* FAQ List */}
              {filteredFAQs.length > 0 ? (
                <FAQAccordion items={filteredFAQs} language={language} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">
                    نتیجه‌ای یافت نشد. لطفاً عبارت دیگری جستجو کنید.
                  </p>
                </div>
              )}
            </div>
          </ContentSection>

          {/* Support Form */}
          <ContentSection maxWidth="xl" variant="default">
            <SupportForm language={language} />
          </ContentSection>
        </main>
      </div>
    </div>
  );
}
