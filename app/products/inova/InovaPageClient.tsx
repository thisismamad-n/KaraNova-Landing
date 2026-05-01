"use client";

import React, { useState } from "react";
import Squares from "@/app/_components/Squares";
import StickyHeader from "@/app/_components/StickyHeader";
import {
  ProductHero,
  FeatureShowcase,
  UseCaseCards,
  PageCTA,
} from "@/app/_components/shared";
import {
  Eye,
  Shield,
  TrendingUp,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Package,
  Lightbulb,
} from "lucide-react";

export default function InovaPageClient() {
  const [language] = useState<"en" | "fa">("fa");

  const content = {
    en: {
      hero: {
        subtitle: "AI Business Intelligence",
        title: "Inova: Four AI Advisors, One Ecosystem",
        description:
          "Comprehensive business intelligence powered by four specialized AI agents. From market analysis to creative content generation, Inova provides 24/7 intelligent insights for your business.",
        ctaText: "Request Demo",
      },
      features: {
        title: "Four Specialized AI Modules",
        description:
          "Each AI advisor is trained for specific business functions, working together to provide comprehensive intelligence",
        items: [
          {
            icon: Eye,
            title: "Vision AI",
            description:
              "Advanced market analysis and competitive intelligence. Track trends, analyze competitors, and identify opportunities with AI-powered insights.",
            color: "rgb(16, 185, 129)",
          },
          {
            icon: Shield,
            title: "Govern AI",
            description:
              "Intelligent risk management and compliance monitoring. Identify potential risks, ensure regulatory compliance, and protect your business.",
            color: "rgb(59, 130, 246)",
          },
          {
            icon: Package,
            title: "Supply AI",
            description:
              "Supply chain optimization and inventory management. Predict demand, optimize logistics, and reduce costs with AI-driven recommendations.",
            color: "rgb(168, 85, 247)",
          },
          {
            icon: Sparkles,
            title: "Creative AI",
            description:
              "Automated content generation and creative assistance. Generate marketing copy, social media content, and creative materials at scale.",
            color: "rgb(236, 72, 153)",
          },
        ],
      },
      useCases: {
        title: "Real-World Applications",
        description:
          "See how businesses leverage Inova's AI advisors to transform their operations",
        items: [
          {
            icon: <BarChart3 className="w-7 h-7 text-emerald-400" />,
            title: "Market Intelligence",
            description:
              "Stay ahead of market trends and competitor movements with Vision AI's continuous monitoring and analysis.",
            benefits: [
              "Real-time competitor tracking and analysis",
              "Market trend prediction with 85% accuracy",
              "Automated opportunity identification",
              "Custom market reports generated daily",
            ],
          },
          {
            icon: <AlertTriangle className="w-7 h-7 text-blue-400" />,
            title: "Risk Management",
            description:
              "Proactively identify and mitigate business risks with Govern AI's intelligent monitoring systems.",
            benefits: [
              "Automated compliance checking across regulations",
              "Early warning system for potential risks",
              "Risk scoring and prioritization",
              "Regulatory change notifications",
            ],
          },
          {
            icon: <TrendingUp className="w-7 h-7 text-purple-400" />,
            title: "Supply Chain Optimization",
            description:
              "Optimize your supply chain operations with Supply AI's predictive analytics and recommendations.",
            benefits: [
              "Demand forecasting with 90% accuracy",
              "Inventory optimization to reduce costs by 30%",
              "Supplier performance analysis",
              "Logistics route optimization",
            ],
          },
          {
            icon: <Lightbulb className="w-7 h-7 text-pink-400" />,
            title: "Content Creation",
            description:
              "Scale your content production with Creative AI's intelligent generation capabilities.",
            benefits: [
              "Generate marketing copy in seconds",
              "Multi-language content support",
              "Brand voice consistency across all content",
              "SEO-optimized content generation",
            ],
          },
        ],
      },
      cta: {
        title: "Ready to Transform Your Business Intelligence?",
        description:
          "Join leading businesses using Inova's AI advisors to gain competitive advantage and drive growth.",
        primaryButton: "Start Free Trial",
        secondaryButton: "Schedule Demo",
      },
    },
    fa: {
      hero: {
        subtitle: "هوش تجاری مبتنی بر AI",
        title: "اینووا: چهار مشاور هوشمند، یک اکوسیستم",
        description:
          "هوش تجاری جامع با قدرت چهار عامل هوش مصنوعی تخصصی. از تحلیل بازار تا تولید محتوای خلاقانه، اینووا بینش‌های هوشمند ۲۴/۷ برای کسب‌وکار شما فراهم می‌کند.",
        ctaText: "درخواست دمو",
      },
      features: {
        title: "چهار ماژول هوش مصنوعی تخصصی",
        description:
          "هر مشاور هوشمند برای عملکردهای تجاری خاص آموزش دیده و با هم برای ارائه هوش جامع کار می‌کنند",
        items: [
          {
            icon: Eye,
            title: "Vision AI",
            description:
              "تحلیل پیشرفته بازار و هوش رقابتی. روندها را دنبال کنید، رقبا را تحلیل کنید و فرصت‌ها را با بینش‌های مبتنی بر هوش مصنوعی شناسایی کنید.",
            color: "rgb(16, 185, 129)",
          },
          {
            icon: Shield,
            title: "Govern AI",
            description:
              "مدیریت هوشمند ریسک و نظارت بر انطباق. ریسک‌های بالقوه را شناسایی کنید، انطباق با مقررات را تضمین کنید و از کسب‌وکار خود محافظت کنید.",
            color: "rgb(59, 130, 246)",
          },
          {
            icon: Package,
            title: "Supply AI",
            description:
              "بهینه‌سازی زنجیره تامین و مدیریت موجودی. تقاضا را پیش‌بینی کنید، لجستیک را بهینه کنید و هزینه‌ها را با توصیه‌های مبتنی بر هوش مصنوعی کاهش دهید.",
            color: "rgb(168, 85, 247)",
          },
          {
            icon: Sparkles,
            title: "Creative AI",
            description:
              "تولید خودکار محتوا و کمک خلاقانه. متن بازاریابی، محتوای رسانه‌های اجتماعی و مواد خلاقانه را در مقیاس تولید کنید.",
            color: "rgb(236, 72, 153)",
          },
        ],
      },
      useCases: {
        title: "کاربردهای واقعی",
        description:
          "ببینید کسب‌وکارها چگونه از مشاوران هوشمند اینووا برای تحول عملیات خود استفاده می‌کنند",
        items: [
          {
            icon: <BarChart3 className="w-7 h-7 text-emerald-400" />,
            title: "هوش بازار",
            description:
              "با نظارت و تحلیل مستمر Vision AI از روندهای بازار و حرکات رقبا جلوتر باشید.",
            benefits: [
              "ردیابی و تحلیل رقبا در زمان واقعی",
              "پیش‌بینی روند بازار با دقت ۸۵٪",
              "شناسایی خودکار فرصت‌ها",
              "گزارش‌های بازار سفارشی تولید شده روزانه",
            ],
          },
          {
            icon: <AlertTriangle className="w-7 h-7 text-blue-400" />,
            title: "مدیریت ریسک",
            description:
              "ریسک‌های تجاری را با سیستم‌های نظارت هوشمند Govern AI به صورت پیشگیرانه شناسایی و کاهش دهید.",
            benefits: [
              "بررسی خودکار انطباق در تمام مقررات",
              "سیستم هشدار زودهنگام برای ریسک‌های بالقوه",
              "امتیازدهی و اولویت‌بندی ریسک",
              "اعلان‌های تغییرات مقرراتی",
            ],
          },
          {
            icon: <TrendingUp className="w-7 h-7 text-purple-400" />,
            title: "بهینه‌سازی زنجیره تامین",
            description:
              "عملیات زنجیره تامین خود را با تحلیل‌های پیش‌بینی و توصیه‌های Supply AI بهینه کنید.",
            benefits: [
              "پیش‌بینی تقاضا با دقت ۹۰٪",
              "بهینه‌سازی موجودی برای کاهش ۳۰٪ هزینه‌ها",
              "تحلیل عملکرد تامین‌کنندگان",
              "بهینه‌سازی مسیر لجستیک",
            ],
          },
          {
            icon: <Lightbulb className="w-7 h-7 text-pink-400" />,
            title: "تولید محتوا",
            description:
              "تولید محتوای خود را با قابلیت‌های تولید هوشمند Creative AI مقیاس‌پذیر کنید.",
            benefits: [
              "تولید متن بازاریابی در چند ثانیه",
              "پشتیبانی از محتوای چند زبانه",
              "ثبات صدای برند در تمام محتوا",
              "تولید محتوای بهینه‌شده برای SEO",
            ],
          },
        ],
      },
      cta: {
        title: "آماده تحول هوش تجاری خود هستید؟",
        description:
          "به کسب‌وکارهای پیشرو بپیوندید که از مشاوران هوشمند اینووا برای کسب مزیت رقابتی و رشد استفاده می‌کنند.",
        primaryButton: "شروع آزمایش رایگان",
        secondaryButton: "زمان‌بندی دمو",
      },
    },
  };

  const t = content[language];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white" dir={language === "fa" ? "rtl" : "ltr"}>
      {/* Animated Background */}
      <Squares />

      {/* Header */}
      <StickyHeader />

      {/* Hero Section */}
      <ProductHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        description={t.hero.description}
        gradientFrom="rgb(16, 185, 129)"
        gradientTo="rgb(5, 150, 105)"
        ctaText={t.hero.ctaText}
        onCtaClick={() => window.location.href = "https://app.karanovaa.com"}
      />

      {/* Features Section */}
      <FeatureShowcase
        title={t.features.title}
        description={t.features.description}
        features={t.features.items}
        accentColor="rgb(16, 185, 129)"
      />

      {/* Use Cases Section */}
      <UseCaseCards
        title={t.useCases.title}
        description={t.useCases.description}
        useCases={t.useCases.items}
        accentColor="rgb(16, 185, 129)"
      />

      {/* CTA Section */}
      <PageCTA
        title={t.cta.title}
        description={t.cta.description}
        primaryButton={{
          text: t.cta.primaryButton,
          href: "/contact",
        }}
        secondaryButton={{
          text: t.cta.secondaryButton,
          href: "/contact",
        }}
      />
    </div>
  );
}
