"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, Sparkles, Zap, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";

interface PricingTiersProps {
  language: "en" | "fa";
}

export default function PricingTiers({ language }: PricingTiersProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isAnnual, setIsAnnual] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsAnnual(checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#14b8a6", "#06b6d4", "#0891b2", "#0e7490"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  const content = {
    en: {
      badge: "14-day free trial • No credit card required",
      billingToggle: "Annual billing",
      saveBadge: "(Save 20%)",
      tiers: [
        {
          name: "Starter",
          icon: Sparkles,
          price: 0,
          yearlyPrice: 0,
          period: "forever",
          description: "Perfect for individuals and small teams getting started",
          features: [
            "Up to 3 team members",
            "5 active projects",
            "Basic AI assistance",
            "10 GB storage",
            "Email support",
            "Mobile app access",
            "Basic analytics",
          ],
          cta: "Start Free",
          highlighted: false,
        },
        {
          name: "Professional",
          icon: Zap,
          price: 499000,
          yearlyPrice: 4790400,
          period: "month",
          description: "For growing teams with advanced needs",
          features: [
            "Up to 25 team members",
            "Unlimited projects",
            "Advanced AI (4 advisors)",
            "100 GB storage",
            "Priority support",
            "Advanced analytics & dashboard",
            "API integration",
            "Custom reports",
          ],
          cta: "Start 14-day trial",
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          icon: Building2,
          price: 0,
          yearlyPrice: 0,
          period: "custom",
          description: "Enterprise solutions with unlimited capabilities",
          features: [
            "Unlimited members",
            "Unlimited projects",
            "All AI capabilities",
            "Unlimited storage",
            "Dedicated success manager",
            "99.9% SLA guarantee",
            "Custom security & compliance",
            "Training & implementation",
          ],
          cta: "Contact Sales",
          highlighted: false,
        },
      ],
    },
    fa: {
      badge: "14 روز آزمایشی رایگان • بدون نیاز به کارت اعتباری",
      billingToggle: "پرداخت سالانه",
      saveBadge: "(20٪ صرفه‌جویی)",
      tiers: [
        {
          name: "استارتر",
          icon: Sparkles,
          price: 0,
          yearlyPrice: 0,
          period: "برای همیشه",
          description: "مناسب برای افراد و تیم‌های کوچک",
          features: [
            "تا 3 عضو تیم",
            "5 پروژه فعال",
            "دستیار هوش مصنوعی پایه",
            "10 گیگابایت فضای ذخیره‌سازی",
            "پشتیبانی ایمیل",
            "دسترسی به اپلیکیشن موبایل",
            "تحلیل‌های پایه",
          ],
          cta: "شروع رایگان",
          highlighted: false,
        },
        {
          name: "حرفه‌ای",
          icon: Zap,
          price: 499000,
          yearlyPrice: 4790400,
          period: "ماهانه",
          description: "برای تیم‌های در حال رشد با نیازهای پیشرفته",
          features: [
            "تا 25 عضو تیم",
            "پروژه‌های نامحدود",
            "هوش مصنوعی پیشرفته (4 مشاور)",
            "100 گیگابایت فضای ذخیره‌سازی",
            "پشتیبانی اولویت‌دار",
            "تحلیل‌های پیشرفته و داشبورد",
            "یکپارچه‌سازی API",
            "گزارش‌های سفارشی",
          ],
          cta: "شروع آزمایشی 14 روزه",
          highlighted: true,
          badge: "محبوب‌ترین",
        },
        {
          name: "سازمانی",
          icon: Building2,
          price: 0,
          yearlyPrice: 0,
          period: "سفارشی",
          description: "راه‌حل‌های سازمانی با امکانات نامحدود",
          features: [
            "اعضای نامحدود",
            "پروژه‌های نامحدود",
            "تمام قابلیت‌های AI",
            "فضای ذخیره‌سازی نامحدود",
            "مدیر اختصاصی موفقیت",
            "SLA تضمین شده 99.9%",
            "امنیت و انطباق سفارشی",
            "آموزش و پیاده‌سازی",
          ],
          cta: "تماس با فروش",
          highlighted: false,
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section ref={ref} className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-sm text-teal-300">{currentContent.badge}</span>
          </div>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center items-center gap-3 mb-12"
        >
          <span className={cn("text-sm font-medium", !isAnnual ? "text-slate-300" : "text-slate-500")}>
            {language === "fa" ? "ماهانه" : "Monthly"}
          </span>
          <div dir="ltr">
            <Label>
              <Switch
                ref={switchRef as any}
                checked={isAnnual}
                onCheckedChange={handleToggle}
                className="relative"
              />
            </Label>
          </div>
          <span className={cn("text-sm font-semibold", isAnnual ? "text-slate-300" : "text-slate-500")}>
            {currentContent.billingToggle}{" "}
            <span className="text-teal-400">{currentContent.saveBadge}</span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
          {currentContent.tiers.map((tier, index) => {
            const Icon = tier.icon;
            const displayPrice = isAnnual ? tier.yearlyPrice : tier.price;
            const showPrice = tier.period !== "custom" && tier.period !== "سفارشی";

            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 1 }}
                whileInView={
                  isDesktop
                    ? {
                        y: tier.highlighted ? -20 : 0,
                        opacity: 1,
                        x: index === 2 ? -30 : index === 0 ? 30 : 0,
                        scale: index === 0 || index === 2 ? 0.94 : 1.0,
                      }
                    : {}
                }
                viewport={{ once: true }}
                transition={{
                  duration: 1.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                  delay: 0.4,
                  opacity: { duration: 0.5 },
                }}
                className={cn(
                  "rounded-3xl p-8 backdrop-blur-xl text-center flex flex-col relative border border-transparent overflow-hidden",
                  tier.highlighted 
                    ? "shadow-[0_0_30px_-5px_hsl(177,100%,35%,0.2)]" 
                    : "hover:shadow-[0_0_40px_-10px_hsl(177,100%,35%,0.15)]",
                  "transition-all duration-500",
                  !tier.highlighted && "mt-5",
                  index === 0 || index === 2 ? "z-0" : "z-10",
                  index === 0 && "lg:origin-right",
                  index === 2 && "lg:origin-left"
                )}
              >
                {/* Gradient background */}
                {tier.highlighted ? (
                  <div className="absolute inset-0 bg-gradient-radial from-[hsl(177,100%,35%)]/20 via-[hsl(177,100%,35%)]/10 to-transparent rounded-3xl" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-radial from-[hsl(177,100%,35%)]/10 via-[hsl(177,100%,35%)]/5 to-transparent rounded-3xl" />
                )}
                {/* Popular Badge */}
                {tier.highlighted && tier.badge && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 py-1 px-3 rounded-bl-xl rounded-tr-2xl flex items-center gap-1 z-10">
                    <Star className="text-white h-4 w-4 fill-current" />
                    <span className="text-white text-xs font-semibold">{tier.badge}</span>
                  </div>
                )}

                <div className="flex-1 flex flex-col relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                        tier.highlighted
                          ? "bg-[hsl(177,100%,35%)] text-white"
                          : "bg-white/5 text-white/70"
                      )}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Tier Name */}
                  <p className="text-lg font-bold text-white/90 mb-2">{tier.name}</p>

                  {/* Price */}
                  <div className="mt-4 mb-2">
                    {showPrice ? (
                      <div className="flex items-center justify-center gap-x-2">
                        <span
                          className={cn(
                            "text-5xl font-bold tracking-tight",
                            tier.highlighted
                              ? "text-[hsl(177,100%,45%)]"
                              : "text-white/90"
                          )}
                        >
                          {displayPrice === 0 ? (
                            language === "fa" ? "رایگان" : "Free"
                          ) : (
                            <NumberFlow
                              value={displayPrice}
                              format={{
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }}
                              transformTiming={{
                                duration: 500,
                                easing: "ease-out",
                              }}
                              willChange
                              className="tabular-nums"
                            />
                          )}
                        </span>
                        {displayPrice !== 0 && tier.period !== "forever" && tier.period !== "برای همیشه" && (
                          <span className="text-sm font-semibold text-white/50">
                            {language === "fa" ? "تومان" : "IRR"}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-white/90">
                        {language === "fa" ? "سفارشی" : "Custom"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-white/50 mb-1">
                    {showPrice && displayPrice !== 0
                      ? isAnnual
                        ? language === "fa"
                          ? "صورت‌حساب سالانه"
                          : "billed annually"
                        : language === "fa"
                        ? "صورت‌حساب ماهانه"
                        : "billed monthly"
                      : tier.period}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-white/50 mb-6 min-h-[40px]">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 text-right">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300",
                            tier.highlighted
                              ? "bg-[hsl(177,100%,35%)]/30 text-[hsl(177,100%,45%)]"
                              : "bg-white/5 text-white/50"
                          )}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-white/70 text-sm text-right flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className="w-full border-white/10 mb-6" />

                  {/* CTA Button */}
                  <a
                    href={
                      index === 0
                        ? "/contact"
                        : index === 1
                        ? "/contact"
                        : "/contact"
                    }
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group relative w-full gap-2 overflow-hidden text-base font-semibold tracking-tight py-6 rounded-xl",
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out",
                      tier.highlighted
                        ? "bg-[hsl(177,100%,35%)] text-white border-0 hover:bg-[hsl(177,100%,40%)] hover:scale-[1.02]"
                        : "bg-white/5 text-white/70 border border-transparent hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <span className="relative z-10">{tier.cta}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
