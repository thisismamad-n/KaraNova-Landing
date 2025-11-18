"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowRight, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const popularPages = [
    { title: "صفحه اصلی", href: "/landing", icon: Home },
    { title: "محصولات", href: "/products/inova", icon: Search },
    { title: "درباره ما", href: "/about", icon: FileQuestion },
    { title: "تماس با ما", href: "/contact", icon: ArrowRight },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1
            className={cn(
              "text-[120px] sm:text-[180px] font-bold leading-none",
              "bg-gradient-to-r from-slate-100 via-teal-200 to-cyan-200",
              "bg-clip-text text-transparent",
              "drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]"
            )}
          >
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            صفحه مورد نظر یافت نشد
          </h2>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
          </p>
        </motion.div>

        {/* Navigation Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-sm text-slate-500 mb-4">صفحات پرطرفدار:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={page.href}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2",
                      "p-4 rounded-lg",
                      "bg-slate-800/50 backdrop-blur-sm",
                      "border border-slate-700/50",
                      "hover:border-teal-500/50 hover:bg-slate-800/70",
                      "transition-all duration-300",
                      "group"
                    )}
                  >
                    <Icon className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-slate-300 group-hover:text-teal-300 transition-colors">
                      {page.title}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/landing"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "px-8 py-3 rounded-lg",
              "backdrop-blur-xl bg-gradient-to-r from-teal-500/80 to-cyan-500/80",
              "border border-teal-400/30",
              "text-white font-semibold",
              "hover:from-teal-500/90 hover:to-cyan-500/90",
              "hover:border-teal-400/50",
              "transition-all duration-300",
              "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
              "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
              "hover:scale-105"
            )}
          >
            <Home className="w-5 h-5" />
            بازگشت به صفحه اصلی
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
