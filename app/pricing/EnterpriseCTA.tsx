"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Shield, Headphones, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnterpriseCTAProps {
  language: "en" | "fa";
}

export default function EnterpriseCTA({ language }: EnterpriseCTAProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      badge: "Enterprise Solutions",
      title: "Built for Scale",
      subtitle:
        "Get a custom solution tailored to your organization's needs with dedicated support and advanced security.",
      features: [
        {
          icon: Building2,
          title: "Custom Deployment",
          description: "On-premise or private cloud options",
        },
        {
          icon: Shield,
          title: "Advanced Security",
          description: "SOC 2, GDPR, and custom compliance",
        },
        {
          icon: Headphones,
          title: "Dedicated Support",
          description: "24/7 priority support with SLA",
        },
        {
          icon: Zap,
          title: "Unlimited Scale",
          description: "No limits on users or projects",
        },
      ],
      cta: "Schedule a Demo",
      contact: "Or call us at +98 21 1234 5678",
    },
    fa: {
      badge: "راه‌حل‌های سازمانی",
      title: "طراحی شده برای مقیاس پذیری",
      subtitle:
        "یک راه‌حل سفارشی متناسب با نیازهای سازمان خود با پشتیبانی اختصاصی و امنیت پیشرفته دریافت کنید.",
      features: [
        {
          icon: Building2,
          title: "استقرار سفارشی",
          description: "گزینه‌های On-premise یا ابر خصوصی",
        },
        {
          icon: Shield,
          title: "امنیت پیشرفته",
          description: "SOC 2، GDPR و انطباق سفارشی",
        },
        {
          icon: Headphones,
          title: "پشتیبانی اختصاصی",
          description: "پشتیبانی اولویت‌دار 24/7 با SLA",
        },
        {
          icon: Zap,
          title: "مقیاس نامحدود",
          description: "بدون محدودیت کاربر یا پروژه",
        },
      ],
      cta: "درخواست دمو",
      contact: "یا با ما تماس بگیرید: 1234 5678 021",
    },
  };

  const currentContent = content[language];
  const ArrowIcon = language === "fa" ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-teal-900/30 border-2 border-teal-500/30 rounded-3xl overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 mb-6">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-semibold text-teal-300">{currentContent.badge}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 mb-10 max-w-2xl">{currentContent.subtitle}</p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {currentContent.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex flex-col items-start gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-slate-100 font-semibold mb-1">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/contact"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105 overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {currentContent.cta}
                  <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <span className="text-slate-400 text-sm">{currentContent.contact}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
