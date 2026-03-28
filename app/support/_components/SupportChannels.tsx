"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportChannel {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href?: string;
  availability?: string;
  onClick?: () => void;
}

interface SupportChannelsProps {
  language: "en" | "fa";
  onOpenChat?: () => void;
}

export default function SupportChannels({
  language,
  onOpenChat,
}: SupportChannelsProps) {
  const content = {
    fa: {
      title: "راه‌های ارتباطی",
      subtitle: "ما همیشه آماده کمک به شما هستیم",
      channels: [
        {
          icon: <MessageCircle className="w-8 h-8" />,
          title: "گفتگو با هوش مصنوعی",
          description: "پاسخ فوری به سوالات شما با دستیار هوشمند",
          action: "شروع گفتگو",
          availability: "۲۴/۷ در دسترس",
          onClick: onOpenChat,
        },
        {
          icon: <Mail className="w-8 h-8" />,
          title: "پشتیبانی ایمیل",
          description: "برای سوالات تخصصی و پیچیده",
          action: "ارسال ایمیل",
          href: "mailto:support@karanova.io",
          availability: "پاسخ در ۲۴ ساعت",
        },
        {
          icon: <Phone className="w-8 h-8" />,
          title: "تماس تلفنی",
          description: "برای مسائل فوری و پشتیبانی مستقیم",
          action: "۰۲۱-۱۲۳۴۵۶۷۸",
          href: "tel:+982112345678",
          availability: "شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر",
        },
        {
          icon: <Clock className="w-8 h-8" />,
          title: "ساعات پشتیبانی",
          description: "تیم ما آماده پاسخگویی به شماست",
          action: "مشاهده جزئیات",
          availability: "شنبه تا پنجشنبه",
        },
      ] as SupportChannel[],
    },
    en: {
      title: "Contact Channels",
      subtitle: "We're always here to help you",
      channels: [
        {
          icon: <MessageCircle className="w-8 h-8" />,
          title: "AI Chat",
          description: "Instant answers with our smart assistant",
          action: "Start Chat",
          availability: "24/7 Available",
        },
        {
          icon: <Mail className="w-8 h-8" />,
          title: "Email Support",
          description: "For technical and complex questions",
          action: "Send Email",
          href: "mailto:support@karanova.io",
          availability: "Response within 24 hours",
        },
        {
          icon: <Phone className="w-8 h-8" />,
          title: "Phone Support",
          description: "For urgent matters and direct support",
          action: "021-12345678",
          href: "tel:+982112345678",
          availability: "Sat-Thu, 9 AM - 6 PM",
        },
        {
          icon: <Clock className="w-8 h-8" />,
          title: "Support Hours",
          description: "Our team is ready to help",
          action: "View Details",
          availability: "Saturday to Thursday",
        },
      ] as SupportChannel[],
    },
  };

  const currentContent = content[language];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          {currentContent.title}
        </h2>
        <p className="text-base text-slate-400">{currentContent.subtitle}</p>
      </div>

      {/* Channels Grid - Compact 4 column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentContent.channels.map((channel, index) => {
          const isClickable = channel.onClick || channel.href;
          const Component = channel.onClick ? "button" : channel.href ? "a" : "div";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn(
                "relative group",
                "backdrop-blur-md bg-slate-900/40",
                "border border-slate-800/50",
                "rounded-xl p-4",
                "hover:bg-slate-900/60 hover:border-teal-500/30",
                "transition-all duration-300",
                "shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
                "hover:shadow-[0_4px_16px_rgba(20,184,166,0.12)]",
                "hover:scale-105",
                isClickable && "cursor-pointer"
              )}
              onClick={channel.onClick}
            >
              <Component
                {...(channel.href ? { href: channel.href } : {})}
                className="block w-full text-right rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center",
                    "w-12 h-12 rounded-lg mb-3",
                    "bg-gradient-to-br from-teal-500/20 to-cyan-500/20",
                    "text-teal-400",
                    "group-hover:from-teal-500/30 group-hover:to-cyan-500/30",
                    "transition-all duration-300"
                  )}
                >
                  {channel.icon}
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-slate-100 mb-1">
                  {channel.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {channel.description}
                </p>

                {/* Action */}
                <p
                  className={cn(
                    "inline-flex items-center gap-1 text-sm",
                    "text-teal-400 font-semibold",
                    "group-hover:text-teal-300 transition-colors"
                  )}
                >
                  {channel.action}
                  <span className="text-base">←</span>
                </p>

                {/* Availability - Compact */}
                {channel.availability && (
                  <div className="mt-2 pt-2 border-t border-slate-800/50">
                    <p className="text-xs text-slate-500">
                      {channel.availability}
                    </p>
                  </div>
                )}
              </Component>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
