"use client";

import { useState } from "react";
import { PageHero, ContentSection } from "@/app/_components/shared";
import Squares from "@/app/_components/Squares";
import { Lock, Key, Code, BookOpen, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { APIEndpointDetail } from "./_components";
import { apiEndpoints } from "./_data/apiEndpoints";

// Get unique categories
const categories = Array.from(new Set(apiEndpoints.map((e) => e.category)));

export default function APIPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const content = {
    hero: {
      title: "مستندات API",
      subtitle: "مرجع کامل REST API برای یکپارچه‌سازی پلتفرم کارانوا در برنامه‌های شما",
    },
    auth: {
      title: "احراز هویت",
      description: "API کارانوا از احراز هویت توکن Bearer استفاده می‌کند. توکن دسترسی خود را در هدر Authorization هر درخواست قرار دهید.",
      tokenTitle: "دریافت توکن API",
      tokenSteps: [
        "به حساب کارانوا خود وارد شوید",
        "به تنظیمات > کلیدهای API بروید",
        "یک کلید API جدید ایجاد کنید",
        "توکن خود را کپی کرده و به صورت ایمن ذخیره کنید",
      ],
      headerExample: "مثال هدر Authorization",
    },
    endpoints: {
      title: "API Endpoints",
      description: "مرور تمام نقاط پایانی API موجود سازماندهی شده بر اساس دسته‌بندی",
      filterAll: "همه نقاط پایانی",
      method: "متد",
      endpoint: "نقطه پایانی",
      descriptionLabel: "توضیحات",
      authRequired: "نیاز به احراز هویت",
    },
    playground: {
      title: "امتحان کنید",
      description: "نقاط پایانی API را به صورت تعاملی با playground API ما تست کنید",
      button: "باز کردن API Playground",
      comingSoon: "به زودی",
    },
  };

  const t = content;

  const filteredEndpoints =
    selectedCategory === "all"
      ? apiEndpoints
      : apiEndpoints.filter((e) => e.category === selectedCategory);

  const methodColors = {
    GET: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    POST: "bg-green-500/20 text-green-400 border-green-500/30",
    PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    PATCH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Animated Background */}
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
          title={t.hero.title}
          subtitle={t.hero.subtitle}
          backgroundVariant="gradient"
          breadcrumbs={[
            { label: "خانه", href: "/" },
            { label: "منابع", href: "/resources" },
            { label: "API", href: "/resources/api" },
          ]}
        />

        {/* Authentication Section */}
        <ContentSection variant="glass" maxWidth="xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <Lock className="w-6 h-6 text-teal-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 text-slate-100">
                {t.auth.title}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {t.auth.description}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Getting Token Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-200">
                <Key className="w-5 h-5 text-teal-400" />
                {t.auth.tokenTitle}
              </h3>
              <ol className="space-y-3">
                {t.auth.tokenSteps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-sm font-semibold text-teal-400">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Authorization Header Example */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-200">
                {t.auth.headerExample}
              </h3>
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-lg p-4 font-mono text-sm">
                <code className="text-cyan-400">
                  Authorization: Bearer your_access_token_here
                </code>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* API Endpoints Section */}
        <ContentSection variant="glass" maxWidth="xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Code className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 text-slate-100">
                {t.endpoints.title}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {t.endpoints.description}
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                selectedCategory === "all"
                  ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                  : "bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:border-teal-500/30 hover:text-teal-400"
              )}
            >
              {t.endpoints.filterAll}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                    : "bg-slate-800/30 text-slate-400 border border-slate-700/30 hover:border-teal-500/30 hover:text-teal-400"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Endpoints List */}
          <div className="space-y-3">
            {filteredEndpoints.map((endpoint) => {
              const isExpanded = expandedEndpoint === endpoint.id;
              const hasDetails = endpoint.parameters || endpoint.requestBody || endpoint.responseExample || endpoint.codeExamples;

              return (
                <div
                  key={endpoint.id}
                  className={cn(
                    "rounded-lg overflow-hidden",
                    "bg-slate-900/30 border border-slate-800/50",
                    "hover:border-teal-500/30",
                    "transition-all duration-300"
                  )}
                >
                  <div
                    className={cn(
                      "p-4 cursor-pointer",
                      isExpanded && "bg-slate-900/50"
                    )}
                    onClick={() =>
                      setExpandedEndpoint(isExpanded ? null : endpoint.id)
                    }
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-md text-xs font-bold border",
                          "flex-shrink-0",
                          methodColors[endpoint.method]
                        )}
                      >
                        {endpoint.method}
                      </span>
                      <div className="flex-1 min-w-0">
                        <code className="text-cyan-400 font-mono text-sm block mb-2">
                          {endpoint.path}
                        </code>
                        <p className="text-slate-300 text-sm">
                          {endpoint.description}
                        </p>
                        {endpoint.requiresAuth && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-amber-400">
                            <Lock className="w-3 h-3" />
                            <span>{t.endpoints.authRequired}</span>
                          </div>
                        )}
                      </div>
                      {hasDetails && (
                        <button className="flex-shrink-0 p-1 text-slate-400 hover:text-teal-400 transition-colors">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && hasDetails && (
                    <div className="border-t border-slate-800/50 p-4 bg-slate-950/30">
                      <APIEndpointDetail
                        endpoint={{
                          method: endpoint.method,
                          endpoint: endpoint.path,
                          description: endpoint.description,
                          parameters: endpoint.parameters,
                          requestBody: endpoint.requestBody,
                          responseExample: endpoint.responseExample,
                        }}
                        codeExamples={endpoint.codeExamples}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ContentSection>

        {/* API Playground Section */}
        <ContentSection variant="glass" maxWidth="xl">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-100">
              {t.playground.title}
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              {t.playground.description}
            </p>
            <div className="relative inline-block">
              <button
                disabled
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-8 py-3 rounded-lg",
                  "bg-gradient-to-r from-teal-500 to-cyan-500",
                  "text-white font-semibold",
                  "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
                  "opacity-50 cursor-not-allowed",
                  "blur-sm"
                )}
              >
                {t.playground.button}
                <ExternalLink className="w-4 h-4" />
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-300 bg-slate-950/80 px-3 py-1 rounded-md">
                  {t.playground.comingSoon}
                </span>
              </div>
            </div>
          </div>
        </ContentSection>
      </div>
    </div>
  );
}
