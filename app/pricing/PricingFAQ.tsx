"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingFAQProps {
  language: "en" | "fa";
}

export default function PricingFAQ({ language }: PricingFAQProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const content = {
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about pricing and plans",
      faqs: [
        {
          question: "Can I switch plans at any time?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits to your account.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, bank transfers, and cryptocurrency payments. For Enterprise plans, we also offer custom invoicing and payment terms.",
        },
        {
          question: "Is there a free trial?",
          answer:
            "Yes! All paid plans come with a 14-day free trial. No credit card required to start. You can explore all features before committing.",
        },
        {
          question: "What happens when I reach my plan limits?",
          answer:
            "We'll notify you when you're approaching your limits. You can either upgrade to a higher plan or purchase additional resources as add-ons.",
        },
        {
          question: "Do you offer discounts for annual billing?",
          answer:
            "Yes! Save 20% when you choose annual billing. We also offer special discounts for non-profits, educational institutions, and startups.",
        },
        {
          question: "Can I cancel my subscription?",
          answer:
            "Yes, you can cancel anytime. Your account will remain active until the end of your billing period, and you'll retain access to all your data.",
        },
      ],
    },
    fa: {
      title: "سوالات متداول",
      subtitle: "همه چیزهایی که باید درباره قیمت‌گذاری و پلن‌ها بدانید",
      faqs: [
        {
          question: "آیا می‌توانم هر زمان پلن خود را تغییر دهم؟",
          answer:
            "بله، می‌توانید هر زمان پلن خود را ارتقا یا کاهش دهید. تغییرات بلافاصله اعمال می‌شوند و ما هزینه‌ها یا اعتبارات را به صورت تناسبی به حساب شما اضافه می‌کنیم.",
        },
        {
          question: "چه روش‌های پرداختی را قبول می‌کنید؟",
          answer:
            "ما تمام کارت‌های اعتباری اصلی، انتقال بانکی و پرداخت‌های ارز دیجیتال را قبول می‌کنیم. برای پلن‌های سازمانی، صورت‌حساب و شرایط پرداخت سفارشی نیز ارائه می‌دهیم.",
        },
        {
          question: "آیا دوره آزمایشی رایگان دارید؟",
          answer:
            "بله! تمام پلن‌های پولی با 14 روز آزمایشی رایگان ارائه می‌شوند. برای شروع نیازی به کارت اعتباری نیست. می‌توانید قبل از تعهد، تمام امکانات را کشف کنید.",
        },
        {
          question: "وقتی به محدودیت‌های پلن خود می‌رسم چه اتفاقی می‌افتد؟",
          answer:
            "وقتی به محدودیت‌های خود نزدیک می‌شوید، به شما اطلاع می‌دهیم. می‌توانید به پلن بالاتر ارتقا دهید یا منابع اضافی را به صورت افزونه خریداری کنید.",
        },
        {
          question: "آیا برای پرداخت سالانه تخفیف ارائه می‌دهید؟",
          answer:
            "بله! با انتخاب پرداخت سالانه 20٪ صرفه‌جویی کنید. همچنین تخفیف‌های ویژه برای سازمان‌های غیرانتفاعی، موسسات آموزشی و استارتاپ‌ها ارائه می‌دهیم.",
        },
        {
          question: "آیا می‌توانم اشتراک خود را لغو کنم؟",
          answer:
            "بله، می‌توانید هر زمان لغو کنید. حساب شما تا پایان دوره صورت‌حساب فعال می‌ماند و به تمام داده‌های خود دسترسی خواهید داشت.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section ref={ref} className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
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

        {/* FAQ Items */}
        <div className="space-y-4">
          {currentContent.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-xl bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-colors duration-300"
            >
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  "w-full px-6 py-5 flex items-center justify-between gap-4 text-right rounded-2xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                )}
              >
                <span className="text-slate-100 font-semibold text-lg flex-1 text-right">
                  {faq.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "w-5 h-5 text-teal-400 flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-4" />
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">
            {language === "fa"
              ? "سوال دیگری دارید؟ ما اینجا هستیم تا کمک کنیم."
              : "Have another question? We're here to help."}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border-2 border-teal-500/30 text-teal-400 font-semibold hover:bg-slate-800/70 hover:border-teal-500/50 transition-all duration-300"
          >
            {language === "fa" ? "تماس با پشتیبانی" : "Contact Support"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
