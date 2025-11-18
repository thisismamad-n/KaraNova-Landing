"use client";

import React from "react";
import dynamic from "next/dynamic";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import LoadingSkeleton from "@/app/_components/shared/LoadingSkeleton";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import ContactInfo from "./_components/ContactInfo";
import OfficeMap from "./_components/OfficeMap";
import SocialLinks from "./_components/SocialLinks";

// Dynamically import heavy form component
const ContactForm = dynamic(() => import("./_components/ContactForm"), {
  loading: () => <LoadingSkeleton variant="form" />,
});

export default function ContactPageClient() {
  const { language } = useLanguage();

  // Bilingual content
  const content = {
    fa: {
      hero: {
        title: "تماس با ما",
        subtitle:
          "ما مشتاق شنیدن نظرات شما هستیم. از طریق فرم زیر، تلفن یا ایمیل با ما در ارتباط باشید.",
      },
      breadcrumbs: [
        { label: "خانه", href: "/" },
        { label: "تماس با ما", href: "/contact" },
      ],
    },
    en: {
      hero: {
        title: "Contact Us",
        subtitle:
          "We'd love to hear from you. Get in touch via the form below, phone, or email.",
      },
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Contact", href: "/contact" },
      ],
    },
  };

  const currentContent = content[language];

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
          {/* Contact Information */}
          <ContentSection maxWidth="xl" variant="default">
            <ContactInfo language={language} />
          </ContentSection>

          {/* Contact Form */}
          <ContentSection maxWidth="xl" variant="default">
            <ContactForm language={language} />
          </ContentSection>

          {/* Office Map */}
          <ContentSection maxWidth="xl" variant="default">
            <OfficeMap language={language} />
          </ContentSection>

          {/* Social Links */}
          <ContentSection maxWidth="xl" variant="default">
            <SocialLinks language={language} />
          </ContentSection>
        </main>
      </div>
    </div>
  );
}
