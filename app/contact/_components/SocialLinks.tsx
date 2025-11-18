"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  language: "en" | "fa";
}

export default function SocialLinks({ language }: SocialLinksProps) {
  const content = {
    fa: {
      title: "شبکه‌های اجتماعی",
      subtitle: "ما را در شبکه‌های اجتماعی دنبال کنید",
      description:
        "برای دریافت آخرین اخبار، به‌روزرسانی‌های محصول و محتوای آموزشی، ما را در شبکه‌های اجتماعی دنبال کنید.",
    },
    en: {
      title: "Social Media",
      subtitle: "Follow us on social media",
      description:
        "Follow us on social media for the latest news, product updates, and educational content.",
    },
  };

  const currentContent = content[language];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/karanova",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/karanova",
      color: "from-sky-500 to-sky-600",
      hoverColor: "hover:from-sky-600 hover:to-sky-700",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/karanova",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/karanova",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@karanova",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/karanova",
      color: "from-slate-700 to-slate-800",
      hoverColor: "hover:from-slate-800 hover:to-slate-900",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          {currentContent.title}
        </h2>
        <p className="text-lg text-slate-400 mb-4">{currentContent.subtitle}</p>
        <p className="text-sm text-slate-500">{currentContent.description}</p>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group relative",
                "backdrop-blur-md bg-slate-900/30",
                "border border-slate-800/50",
                "rounded-xl p-6",
                "flex flex-col items-center justify-center gap-3",
                "transition-all duration-300",
                "hover:border-teal-500/50 hover:bg-slate-900/40",
                "cursor-pointer"
              )}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "relative",
                  "w-14 h-14 rounded-lg",
                  "flex items-center justify-center",
                  "bg-gradient-to-br",
                  social.color,
                  social.hoverColor,
                  "transition-all duration-300",
                  "shadow-lg",
                  "group-hover:shadow-xl"
                )}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Name */}
              <span className="text-sm font-semibold text-slate-300 group-hover:text-teal-400 transition-colors">
                {social.name}
              </span>

              {/* Hover Glow Effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl",
                  "bg-gradient-to-br",
                  social.color,
                  "opacity-0 group-hover:opacity-10",
                  "transition-opacity duration-300",
                  "pointer-events-none"
                )}
              />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
