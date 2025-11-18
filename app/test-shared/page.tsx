"use client";

import React from "react";
import { PageHero, ContentSection, PageCTA } from "@/app/_components/shared";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function TestSharedPage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <main>
      {/* Language Toggle */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setLanguage(language === "en" ? "fa" : "en")}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          {language === "en" ? "فارسی" : "English"}
        </button>
      </div>

      {/* Page Hero */}
      <PageHero
        title="Test Shared Components"
        subtitle="This page demonstrates the shared infrastructure components"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Test", href: "/test-shared" },
        ]}
        showCTA
        ctaText={t("common.getStarted")}
        ctaHref="/contact"
        backgroundVariant="gradient"
      />

      {/* Content Section - Default */}
      <ContentSection maxWidth="lg">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Default Content Section
        </h2>
        <p className="text-slate-300 text-lg">
          This is a default content section with standard styling and animations.
          It uses the ContentSection component with default variant.
        </p>
      </ContentSection>

      {/* Content Section - Glass */}
      <ContentSection variant="glass" maxWidth="md">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Glass Morphism Section
        </h2>
        <p className="text-slate-300 text-lg">
          This section uses the glass morphism variant with backdrop blur and
          semi-transparent background.
        </p>
      </ContentSection>

      {/* Content Section - Bordered */}
      <ContentSection variant="bordered" maxWidth="xl">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Bordered Section
        </h2>
        <p className="text-slate-300 text-lg">
          This section uses the bordered variant with a subtle border and shadow.
        </p>
      </ContentSection>

      {/* Translation Test */}
      <ContentSection maxWidth="lg">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Translation System Test
        </h2>
        <div className="space-y-2 text-slate-300">
          <p>Current Language: {language}</p>
          <p>Read More: {t("common.readMore")}</p>
          <p>Learn More: {t("common.learnMore")}</p>
          <p>Get Started: {t("common.getStarted")}</p>
          <p>Contact Us: {t("common.contactUs")}</p>
          <p>Home: {t("nav.home")}</p>
          <p>About: {t("nav.about")}</p>
          <p>Products: {t("nav.products")}</p>
        </div>
      </ContentSection>

      {/* Page CTA */}
      <PageCTA
        title="Ready to Get Started?"
        description="Experience the power of Karanova's AI-powered business management platform"
        primaryButton={{
          text: t("common.getStarted"),
          href: "/signup",
        }}
        secondaryButton={{
          text: t("common.learnMore"),
          href: "/about",
        }}
      />
    </main>
  );
}
