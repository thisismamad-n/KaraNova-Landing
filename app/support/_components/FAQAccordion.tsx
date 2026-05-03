"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  language: "en" | "fa";
}

export default function FAQAccordion({ items, language }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={cn(
            "backdrop-blur-md bg-slate-900/40",
            "border border-slate-800/50",
            "rounded-xl overflow-hidden",
            "hover:border-teal-500/30 transition-all duration-300"
          )}
        >
          {/* Question Button */}
          <button
            type="button"
            onClick={() => toggleItem(item.id)}
            className={cn(
              "w-full flex items-center justify-between gap-4",
              "p-4 sm:p-6 text-right rounded-xl",
              "focus-visible:outline-none focus-visible:bg-slate-900/60 focus-visible:ring-2 focus-visible:ring-teal-500",
              "hover:bg-slate-900/60 transition-colors"
            )}
            aria-expanded={openId === item.id}
            aria-controls={`faq-answer-${item.id}`}
            id={`faq-question-${item.id}`}
          >
            <span className="text-lg font-semibold text-slate-100 flex-1">
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <ChevronDown className="w-5 h-5 text-teal-400" />
            </motion.div>
          </button>

          {/* Answer */}
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                  <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
