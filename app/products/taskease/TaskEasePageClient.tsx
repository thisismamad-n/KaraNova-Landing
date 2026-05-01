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
  Calendar,
  Users,
  Clock,
  Target,
  Zap,
  GitBranch,
  BarChart2,
  MessageSquare,
} from "lucide-react";

export default function TaskEasePageClient() {
  const [language] = useState<"en" | "fa">("fa");

  const content = {
    en: {
      hero: {
        subtitle: "AI Project Management",
        title: "TaskEase: Intelligent Project Management",
        description:
          "Transform your project management with AI-powered automation. Automated sprints, intelligent resource allocation, and accurate delivery predictions reduce management time by 60%.",
        ctaText: "Start Free Trial",
      },
      features: {
        title: "Powerful Project Management Features",
        description:
          "Everything you need to manage projects efficiently with AI assistance",
        items: [
          {
            icon: Calendar,
            title: "Automated Sprint Planning",
            description:
              "AI automatically creates and optimizes sprint plans based on team capacity, priorities, and historical data.",
            color: "rgb(6, 182, 212)",
          },
          {
            icon: Users,
            title: "Intelligent Resource Allocation",
            description:
              "Smart assignment of tasks based on team member skills, availability, and workload balance.",
            color: "rgb(59, 130, 246)",
          },
          {
            icon: Clock,
            title: "Accurate Time Predictions",
            description:
              "Machine learning models predict task completion times with 90% accuracy based on historical patterns.",
            color: "rgb(168, 85, 247)",
          },
          {
            icon: Target,
            title: "Goal Tracking",
            description:
              "Set and track project goals with real-time progress monitoring and automated status updates.",
            color: "rgb(236, 72, 153)",
          },
          {
            icon: Zap,
            title: "Workflow Automation",
            description:
              "Automate repetitive tasks and workflows to save time and reduce manual errors.",
            color: "rgb(251, 146, 60)",
          },
          {
            icon: GitBranch,
            title: "Dependency Management",
            description:
              "Automatically track and manage task dependencies to prevent bottlenecks and delays.",
            color: "rgb(34, 197, 94)",
          },
        ],
      },
      useCases: {
        title: "Built for Modern Teams",
        description:
          "See how teams use TaskEase to streamline their project management",
        items: [
          {
            icon: <BarChart2 className="w-7 h-7 text-cyan-400" />,
            title: "Software Development Teams",
            description:
              "Manage agile sprints, track development progress, and coordinate releases with AI-powered insights.",
            benefits: [
              "Automated sprint planning and backlog prioritization",
              "Code review and deployment tracking",
              "Integration with Git and CI/CD pipelines",
              "Velocity tracking and burndown charts",
            ],
          },
          {
            icon: <MessageSquare className="w-7 h-7 text-blue-400" />,
            title: "Marketing Campaigns",
            description:
              "Plan and execute marketing campaigns with coordinated timelines and resource management.",
            benefits: [
              "Campaign timeline visualization",
              "Content calendar management",
              "Budget tracking and allocation",
              "Performance metrics dashboard",
            ],
          },
          {
            icon: <Target className="w-7 h-7 text-purple-400" />,
            title: "Product Launches",
            description:
              "Coordinate complex product launches across multiple teams with automated task dependencies.",
            benefits: [
              "Multi-team coordination and communication",
              "Milestone tracking and alerts",
              "Risk identification and mitigation",
              "Launch checklist automation",
            ],
          },
          {
            icon: <Users className="w-7 h-7 text-pink-400" />,
            title: "Remote Team Collaboration",
            description:
              "Enable seamless collaboration for distributed teams with real-time updates and communication.",
            benefits: [
              "Timezone-aware scheduling",
              "Asynchronous communication tools",
              "Team availability tracking",
              "Virtual standup automation",
            ],
          },
        ],
      },
      cta: {
        title: "Ready to Streamline Your Project Management?",
        description:
          "Join thousands of teams using TaskEase to deliver projects faster and more efficiently.",
        primaryButton: "Start Free Trial",
        secondaryButton: "Watch Demo",
      },
    },
    fa: {
      hero: {
        subtitle: "مدیریت پروژه با هوش مصنوعی",
        title: "تسک‌ایز: مدیریت هوشمند پروژه",
        description:
          "مدیریت پروژه خود را با اتوماسیون مبتنی بر هوش مصنوعی متحول کنید. اسپرینت‌های خودکار، تخصیص هوشمند منابع و پیش‌بینی دقیق زمان تحویل، زمان مدیریت را ۶۰٪ کاهش می‌دهد.",
        ctaText: "شروع آزمایش رایگان",
      },
      features: {
        title: "ویژگی‌های قدرتمند مدیریت پروژه",
        description:
          "همه چیزهایی که برای مدیریت کارآمد پروژه‌ها با کمک هوش مصنوعی نیاز دارید",
        items: [
          {
            icon: Calendar,
            title: "برنامه‌ریزی خودکار اسپرینت",
            description:
              "هوش مصنوعی به طور خودکار برنامه‌های اسپرینت را بر اساس ظرفیت تیم، اولویت‌ها و داده‌های تاریخی ایجاد و بهینه می‌کند.",
            color: "rgb(6, 182, 212)",
          },
          {
            icon: Users,
            title: "تخصیص هوشمند منابع",
            description:
              "تخصیص هوشمند وظایف بر اساس مهارت‌های اعضای تیم، در دسترس بودن و تعادل بار کاری.",
            color: "rgb(59, 130, 246)",
          },
          {
            icon: Clock,
            title: "پیش‌بینی دقیق زمان",
            description:
              "مدل‌های یادگیری ماشین زمان تکمیل وظایف را با دقت ۹۰٪ بر اساس الگوهای تاریخی پیش‌بینی می‌کنند.",
            color: "rgb(168, 85, 247)",
          },
          {
            icon: Target,
            title: "ردیابی اهداف",
            description:
              "اهداف پروژه را تعیین و با نظارت بر پیشرفت در زمان واقعی و به‌روزرسانی‌های خودکار وضعیت دنبال کنید.",
            color: "rgb(236, 72, 153)",
          },
          {
            icon: Zap,
            title: "اتوماسیون گردش کار",
            description:
              "وظایف و گردش‌های کاری تکراری را خودکار کنید تا در زمان صرفه‌جویی کنید و خطاهای دستی را کاهش دهید.",
            color: "rgb(251, 146, 60)",
          },
          {
            icon: GitBranch,
            title: "مدیریت وابستگی‌ها",
            description:
              "وابستگی‌های وظایف را به طور خودکار ردیابی و مدیریت کنید تا از گلوگاه‌ها و تاخیرها جلوگیری کنید.",
            color: "rgb(34, 197, 94)",
          },
        ],
      },
      useCases: {
        title: "ساخته شده برای تیم‌های مدرن",
        description:
          "ببینید تیم‌ها چگونه از تسک‌ایز برای ساده‌سازی مدیریت پروژه خود استفاده می‌کنند",
        items: [
          {
            icon: <BarChart2 className="w-7 h-7 text-cyan-400" />,
            title: "تیم‌های توسعه نرم‌افزار",
            description:
              "اسپرینت‌های چابک را مدیریت کنید، پیشرفت توسعه را دنبال کنید و انتشارها را با بینش‌های مبتنی بر هوش مصنوعی هماهنگ کنید.",
            benefits: [
              "برنامه‌ریزی خودکار اسپرینت و اولویت‌بندی بک‌لاگ",
              "ردیابی بررسی کد و استقرار",
              "یکپارچگی با Git و خطوط لوله CI/CD",
              "ردیابی سرعت و نمودارهای سوختن",
            ],
          },
          {
            icon: <MessageSquare className="w-7 h-7 text-blue-400" />,
            title: "کمپین‌های بازاریابی",
            description:
              "کمپین‌های بازاریابی را با جدول زمانی هماهنگ و مدیریت منابع برنامه‌ریزی و اجرا کنید.",
            benefits: [
              "تجسم جدول زمانی کمپین",
              "مدیریت تقویم محتوا",
              "ردیابی و تخصیص بودجه",
              "داشبورد معیارهای عملکرد",
            ],
          },
          {
            icon: <Target className="w-7 h-7 text-purple-400" />,
            title: "راه‌اندازی محصول",
            description:
              "راه‌اندازی‌های پیچیده محصول را در چندین تیم با وابستگی‌های خودکار وظایف هماهنگ کنید.",
            benefits: [
              "هماهنگی و ارتباط چند تیمی",
              "ردیابی نقاط عطف و هشدارها",
              "شناسایی و کاهش ریسک",
              "اتوماسیون چک‌لیست راه‌اندازی",
            ],
          },
          {
            icon: <Users className="w-7 h-7 text-pink-400" />,
            title: "همکاری تیم از راه دور",
            description:
              "همکاری یکپارچه برای تیم‌های توزیع شده با به‌روزرسانی‌ها و ارتباطات در زمان واقعی را فعال کنید.",
            benefits: [
              "زمان‌بندی آگاه از منطقه زمانی",
              "ابزارهای ارتباط ناهمزمان",
              "ردیابی در دسترس بودن تیم",
              "اتوماسیون استندآپ مجازی",
            ],
          },
        ],
      },
      cta: {
        title: "آماده ساده‌سازی مدیریت پروژه خود هستید؟",
        description:
          "به هزاران تیمی بپیوندید که از تسک‌ایز برای تحویل سریع‌تر و کارآمدتر پروژه‌ها استفاده می‌کنند.",
        primaryButton: "شروع آزمایش رایگان",
        secondaryButton: "مشاهده دمو",
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
        gradientFrom="rgb(6, 182, 212)"
        gradientTo="rgb(8, 145, 178)"
        ctaText={t.hero.ctaText}
        onCtaClick={() => window.location.href = "https://app.karanovaa.com"}
      />

      {/* Features Section */}
      <FeatureShowcase
        title={t.features.title}
        description={t.features.description}
        features={t.features.items}
        accentColor="rgb(6, 182, 212)"
      />

      {/* Use Cases Section */}
      <UseCaseCards
        title={t.useCases.title}
        description={t.useCases.description}
        useCases={t.useCases.items}
        accentColor="rgb(6, 182, 212)"
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
