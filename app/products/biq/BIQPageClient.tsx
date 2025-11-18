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
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  LineChart,
  Gauge,
  Filter,
  Download,
} from "lucide-react";

export default function BIQPageClient() {
  const [language] = useState<"en" | "fa">("fa");

  const content = {
    en: {
      hero: {
        subtitle: "Business Intelligence Dashboard",
        title: "BIQ: Smart Data Analysis, Informed Decisions",
        description:
          "Real-time business health monitoring with interactive dashboards, instant reports, and deep insights. Make data-driven decisions with 92% analysis accuracy.",
        ctaText: "Explore Dashboard",
      },
      features: {
        title: "Comprehensive Analytics Features",
        description:
          "Everything you need to monitor and analyze your business performance",
        items: [
          {
            icon: BarChart3,
            title: "Interactive Dashboards",
            description:
              "Customizable dashboards with drag-and-drop widgets, real-time data updates, and responsive design.",
            color: "rgb(99, 102, 241)",
          },
          {
            icon: TrendingUp,
            title: "Real-Time KPI Tracking",
            description:
              "Monitor key performance indicators in real-time with automated alerts and threshold notifications.",
            color: "rgb(139, 92, 246)",
          },
          {
            icon: PieChart,
            title: "Advanced Data Visualization",
            description:
              "Multiple chart types including bar, line, pie, scatter, and heatmaps for comprehensive data representation.",
            color: "rgb(168, 85, 247)",
          },
          {
            icon: Activity,
            title: "Performance Metrics",
            description:
              "Track revenue, growth, customer acquisition, retention, and other critical business metrics.",
            color: "rgb(217, 70, 239)",
          },
          {
            icon: LineChart,
            title: "Trend Analysis",
            description:
              "Identify patterns and trends with AI-powered predictive analytics and forecasting.",
            color: "rgb(236, 72, 153)",
          },
          {
            icon: Gauge,
            title: "Health Scoring",
            description:
              "Overall business health score calculated from multiple metrics with actionable recommendations.",
            color: "rgb(244, 63, 94)",
          },
        ],
      },
      useCases: {
        title: "Data-Driven Decision Making",
        description:
          "See how businesses use BIQ to gain insights and drive growth",
        items: [
          {
            icon: <TrendingUp className="w-7 h-7 text-indigo-400" />,
            title: "Executive Dashboards",
            description:
              "High-level overview of business performance for executives and stakeholders with key metrics at a glance.",
            benefits: [
              "Revenue and profit tracking",
              "Growth rate visualization",
              "Department performance comparison",
              "Strategic goal progress monitoring",
            ],
          },
          {
            icon: <BarChart3 className="w-7 h-7 text-purple-400" />,
            title: "Sales Analytics",
            description:
              "Comprehensive sales performance tracking with pipeline analysis and conversion metrics.",
            benefits: [
              "Sales funnel visualization",
              "Conversion rate tracking",
              "Sales team performance metrics",
              "Revenue forecasting",
            ],
          },
          {
            icon: <PieChart className="w-7 h-7 text-violet-400" />,
            title: "Financial Reporting",
            description:
              "Automated financial reports with profit/loss statements, cash flow analysis, and budget tracking.",
            benefits: [
              "Automated P&L statements",
              "Cash flow monitoring",
              "Budget vs actual comparison",
              "Expense category breakdown",
            ],
          },
          {
            icon: <Activity className="w-7 h-7 text-pink-400" />,
            title: "Customer Analytics",
            description:
              "Deep insights into customer behavior, satisfaction, and lifetime value with segmentation analysis.",
            benefits: [
              "Customer acquisition cost tracking",
              "Lifetime value calculation",
              "Churn rate analysis",
              "Customer segmentation insights",
            ],
          },
        ],
      },
      cta: {
        title: "Ready to Unlock Your Business Insights?",
        description:
          "Join businesses making smarter decisions with BIQ's powerful analytics and real-time dashboards.",
        primaryButton: "Start Free Trial",
        secondaryButton: "View Demo Dashboard",
      },
    },
    fa: {
      hero: {
        subtitle: "داشبورد هوش تجاری",
        title: "بی‌آی‌کیو: تحلیل هوشمند داده‌ها، تصمیم‌گیری آگاهانه",
        description:
          "نظارت بر سلامت کسب‌وکار در زمان واقعی با داشبوردهای تعاملی، گزارش‌های لحظه‌ای و بینش‌های عمیق. با دقت ۹۲٪ تحلیل، تصمیمات مبتنی بر داده بگیرید.",
        ctaText: "کاوش داشبورد",
      },
      features: {
        title: "ویژگی‌های جامع تحلیلی",
        description:
          "همه چیزهایی که برای نظارت و تحلیل عملکرد کسب‌وکار خود نیاز دارید",
        items: [
          {
            icon: BarChart3,
            title: "داشبوردهای تعاملی",
            description:
              "داشبوردهای قابل سفارشی‌سازی با ویجت‌های کشیدنی، به‌روزرسانی داده‌های زمان واقعی و طراحی واکنش‌گرا.",
            color: "rgb(99, 102, 241)",
          },
          {
            icon: TrendingUp,
            title: "ردیابی KPI در زمان واقعی",
            description:
              "شاخص‌های کلیدی عملکرد را در زمان واقعی با هشدارهای خودکار و اعلان‌های آستانه نظارت کنید.",
            color: "rgb(139, 92, 246)",
          },
          {
            icon: PieChart,
            title: "تجسم پیشرفته داده",
            description:
              "انواع متعدد نمودار شامل میله‌ای، خطی، دایره‌ای، پراکندگی و نقشه حرارتی برای نمایش جامع داده‌ها.",
            color: "rgb(168, 85, 247)",
          },
          {
            icon: Activity,
            title: "معیارهای عملکرد",
            description:
              "درآمد، رشد، جذب مشتری، حفظ و سایر معیارهای حیاتی کسب‌وکار را دنبال کنید.",
            color: "rgb(217, 70, 239)",
          },
          {
            icon: LineChart,
            title: "تحلیل روند",
            description:
              "الگوها و روندها را با تحلیل‌های پیش‌بینی مبتنی بر هوش مصنوعی و پیش‌بینی شناسایی کنید.",
            color: "rgb(236, 72, 153)",
          },
          {
            icon: Gauge,
            title: "امتیازدهی سلامت",
            description:
              "امتیاز کلی سلامت کسب‌وکار محاسبه شده از معیارهای متعدد با توصیه‌های قابل اجرا.",
            color: "rgb(244, 63, 94)",
          },
        ],
      },
      useCases: {
        title: "تصمیم‌گیری مبتنی بر داده",
        description:
          "ببینید کسب‌وکارها چگونه از بی‌آی‌کیو برای کسب بینش و رشد استفاده می‌کنند",
        items: [
          {
            icon: <TrendingUp className="w-7 h-7 text-indigo-400" />,
            title: "داشبوردهای اجرایی",
            description:
              "نمای کلی سطح بالا از عملکرد کسب‌وکار برای مدیران و ذینفعان با معیارهای کلیدی در یک نگاه.",
            benefits: [
              "ردیابی درآمد و سود",
              "تجسم نرخ رشد",
              "مقایسه عملکرد بخش‌ها",
              "نظارت بر پیشرفت اهداف استراتژیک",
            ],
          },
          {
            icon: <BarChart3 className="w-7 h-7 text-purple-400" />,
            title: "تحلیل فروش",
            description:
              "ردیابی جامع عملکرد فروش با تحلیل خط لوله و معیارهای تبدیل.",
            benefits: [
              "تجسم قیف فروش",
              "ردیابی نرخ تبدیل",
              "معیارهای عملکرد تیم فروش",
              "پیش‌بینی درآمد",
            ],
          },
          {
            icon: <PieChart className="w-7 h-7 text-violet-400" />,
            title: "گزارش‌دهی مالی",
            description:
              "گزارش‌های مالی خودکار با صورت‌های سود و زیان، تحلیل جریان نقدی و ردیابی بودجه.",
            benefits: [
              "صورت‌های سود و زیان خودکار",
              "نظارت بر جریان نقدی",
              "مقایسه بودجه در مقابل واقعی",
              "تفکیک دسته‌بندی هزینه‌ها",
            ],
          },
          {
            icon: <Activity className="w-7 h-7 text-pink-400" />,
            title: "تحلیل مشتری",
            description:
              "بینش‌های عمیق در مورد رفتار مشتری، رضایت و ارزش طول عمر با تحلیل بخش‌بندی.",
            benefits: [
              "ردیابی هزینه جذب مشتری",
              "محاسبه ارزش طول عمر",
              "تحلیل نرخ ریزش",
              "بینش‌های بخش‌بندی مشتری",
            ],
          },
        ],
      },
      cta: {
        title: "آماده باز کردن قفل بینش‌های کسب‌وکار خود هستید؟",
        description:
          "به کسب‌وکارهایی بپیوندید که با تحلیل‌های قدرتمند و داشبوردهای زمان واقعی بی‌آی‌کیو تصمیمات هوشمندانه‌تری می‌گیرند.",
        primaryButton: "شروع آزمایش رایگان",
        secondaryButton: "مشاهده داشبورد دمو",
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
        gradientFrom="rgb(99, 102, 241)"
        gradientTo="rgb(139, 92, 246)"
        ctaText={t.hero.ctaText}
        onCtaClick={() => console.log("Explore dashboard clicked")}
      />

      {/* Features Section */}
      <FeatureShowcase
        title={t.features.title}
        description={t.features.description}
        features={t.features.items}
        accentColor="rgb(99, 102, 241)"
      />

      {/* Use Cases Section */}
      <UseCaseCards
        title={t.useCases.title}
        description={t.useCases.description}
        useCases={t.useCases.items}
        accentColor="rgb(99, 102, 241)"
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
