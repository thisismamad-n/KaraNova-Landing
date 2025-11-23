"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingComparisonProps {
  language: "en" | "fa";
}

export default function PricingComparison({ language }: PricingComparisonProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    en: {
      title: "Compare All Features",
      subtitle: "Everything you need to know about our plans",
      plans: ["Starter", "Professional", "Enterprise"],
      categories: [
        {
          name: "Core Features",
          features: [
            { name: "Team Members", values: ["3", "25", "Unlimited"] },
            { name: "Active Projects", values: ["5", "Unlimited", "Unlimited"] },
            { name: "Storage", values: ["10 GB", "100 GB", "Unlimited"] },
            { name: "Mobile App", values: [true, true, true] },
          ],
        },
        {
          name: "AI Capabilities",
          features: [
            { name: "Vision AI", values: [false, true, true] },
            { name: "Govern AI", values: [false, true, true] },
            { name: "Supply AI", values: [false, true, true] },
            { name: "Creative AI", values: [false, true, true] },
            { name: "Custom AI Training", values: [false, false, true] },
          ],
        },
        {
          name: "Analytics & Reporting",
          features: [
            { name: "Basic Analytics", values: [true, true, true] },
            { name: "Advanced Dashboard", values: [false, true, true] },
            { name: "Custom Reports", values: [false, true, true] },
            { name: "Real-time Insights", values: [false, true, true] },
            { name: "Predictive Analytics", values: [false, false, true] },
          ],
        },
        {
          name: "Support & Security",
          features: [
            { name: "Email Support", values: [true, true, true] },
            { name: "Priority Support", values: [false, true, true] },
            { name: "Dedicated Success Manager", values: [false, false, true] },
            { name: "99.9% SLA", values: [false, false, true] },
            { name: "Custom Security", values: [false, false, true] },
            { name: "SSO & SAML", values: [false, false, true] },
          ],
        },
      ],
    },
    fa: {
      title: "مقایسه تمام امکانات",
      subtitle: "همه چیزهایی که باید درباره پلن‌های ما بدانید",
      plans: ["استارتر", "حرفه‌ای", "سازمانی"],
      categories: [
        {
          name: "امکانات اصلی",
          features: [
            { name: "اعضای تیم", values: ["3", "25", "نامحدود"] },
            { name: "پروژه‌های فعال", values: ["5", "نامحدود", "نامحدود"] },
            { name: "فضای ذخیره‌سازی", values: ["10 گیگابایت", "100 گیگابایت", "نامحدود"] },
            { name: "اپلیکیشن موبایل", values: [true, true, true] },
          ],
        },
        {
          name: "قابلیت‌های هوش مصنوعی",
          features: [
            { name: "Vision AI", values: [false, true, true] },
            { name: "Govern AI", values: [false, true, true] },
            { name: "Supply AI", values: [false, true, true] },
            { name: "Creative AI", values: [false, true, true] },
            { name: "آموزش AI سفارشی", values: [false, false, true] },
          ],
        },
        {
          name: "تحلیل و گزارش‌گیری",
          features: [
            { name: "تحلیل‌های پایه", values: [true, true, true] },
            { name: "داشبورد پیشرفته", values: [false, true, true] },
            { name: "گزارش‌های سفارشی", values: [false, true, true] },
            { name: "بینش‌های لحظه‌ای", values: [false, true, true] },
            { name: "تحلیل پیش‌بینی", values: [false, false, true] },
          ],
        },
        {
          name: "پشتیبانی و امنیت",
          features: [
            { name: "پشتیبانی ایمیل", values: [true, true, true] },
            { name: "پشتیبانی اولویت‌دار", values: [false, true, true] },
            { name: "مدیر موفقیت اختصاصی", values: [false, false, true] },
            { name: "SLA تضمین شده 99.9%", values: [false, false, true] },
            { name: "امنیت سفارشی", values: [false, false, true] },
            { name: "SSO و SAML", values: [false, false, true] },
          ],
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section ref={ref} className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {currentContent.title}
            </span>
          </h2>
          <p className="text-lg text-slate-400">{currentContent.subtitle}</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-slate-900/40 border border-slate-800/50 rounded-3xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-800/50 bg-slate-900/60">
            <div className="text-slate-400 font-semibold text-sm">امکانات</div>
            {currentContent.plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "text-center font-bold text-base",
                  index === 1
                    ? "text-teal-400"
                    : "text-slate-300"
                )}
              >
                {plan}
              </div>
            ))}
          </div>

          {/* Categories */}
          {currentContent.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border-b border-slate-800/30 last:border-b-0">
              {/* Category Header */}
              <div className="px-6 py-4 bg-slate-900/30">
                <h3 className="text-slate-200 font-semibold text-sm">{category.name}</h3>
              </div>

              {/* Features */}
              {category.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className={cn(
                    "grid grid-cols-4 gap-4 px-6 py-4",
                    "hover:bg-slate-800/20 transition-colors duration-200",
                    featureIndex % 2 === 0 ? "bg-slate-900/10" : ""
                  )}
                >
                  <div className="text-slate-300 text-sm">{feature.name}</div>
                  {feature.values.map((value, valueIndex) => (
                    <div key={valueIndex} className="flex items-center justify-center">
                      {typeof value === "boolean" ? (
                        value ? (
                          <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-teal-400" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-800/30 border border-slate-700/30 flex items-center justify-center">
                            <X className="w-4 h-4 text-slate-600" />
                          </div>
                        )
                      ) : (
                        <span
                          className={cn(
                            "text-sm font-medium",
                            valueIndex === 1 ? "text-teal-400" : "text-slate-300"
                          )}
                        >
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
