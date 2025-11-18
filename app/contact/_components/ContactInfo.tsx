"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  language: "en" | "fa";
}

export default function ContactInfo({ language }: ContactInfoProps) {
  const content = {
    fa: {
      title: "اطلاعات تماس",
      subtitle: "راه‌های مختلف برای ارتباط با تیم کارانوا",
      email: {
        label: "ایمیل",
        value: "info@karanova.io",
        description: "برای سوالات عمومی و پشتیبانی",
      },
      phone: {
        label: "تلفن",
        value: "+98 21 1234 5678",
        description: "شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر",
      },
      address: {
        label: "آدرس دفتر مرکزی",
        value: "تهران، خیابان ولیعصر، پلاک ۱۲۳۴",
        description: "طبقه ۵، واحد ۱۰",
      },
      hours: {
        label: "ساعات کاری",
        value: "شنبه تا پنجشنبه",
        description: "۹:۰۰ صبح تا ۶:۰۰ عصر",
      },
    },
    en: {
      title: "Contact Information",
      subtitle: "Various ways to reach the Karanova team",
      email: {
        label: "Email",
        value: "info@karanova.io",
        description: "For general inquiries and support",
      },
      phone: {
        label: "Phone",
        value: "+98 21 1234 5678",
        description: "Saturday to Thursday, 9 AM to 6 PM",
      },
      address: {
        label: "Head Office Address",
        value: "Tehran, Valiasr Street, No. 1234",
        description: "5th Floor, Unit 10",
      },
      hours: {
        label: "Business Hours",
        value: "Saturday to Thursday",
        description: "9:00 AM to 6:00 PM",
      },
    },
  };

  const currentContent = content[language];

  const contactItems = [
    {
      icon: Mail,
      label: currentContent.email.label,
      value: currentContent.email.value,
      description: currentContent.email.description,
      href: `mailto:${currentContent.email.value}`,
    },
    {
      icon: Phone,
      label: currentContent.phone.label,
      value: currentContent.phone.value,
      description: currentContent.phone.description,
      href: `tel:${currentContent.phone.value.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: currentContent.address.label,
      value: currentContent.address.value,
      description: currentContent.address.description,
      href: null,
    },
    {
      icon: Clock,
      label: currentContent.hours.label,
      value: currentContent.hours.value,
      description: currentContent.hours.description,
      href: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          {currentContent.title}
        </h2>
        <p className="text-lg text-slate-400">{currentContent.subtitle}</p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const CardWrapper = item.href ? "a" : "div";
          const cardProps = item.href
            ? { href: item.href, target: item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? undefined : "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardWrapper
                {...cardProps}
                className={cn(
                  "block h-full",
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50",
                  "rounded-xl p-6",
                  "transition-all duration-300",
                  item.href && "hover:border-teal-500/50 hover:bg-slate-900/40 cursor-pointer",
                  "group"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center",
                    "w-12 h-12 rounded-lg mb-4",
                    "bg-gradient-to-br from-teal-500/20 to-cyan-500/20",
                    "border border-teal-500/30",
                    "group-hover:border-teal-400/50",
                    "transition-all duration-300"
                  )}
                >
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    {item.label}
                  </h3>
                  <p
                    className={cn(
                      "text-lg font-semibold text-slate-100",
                      item.href && "group-hover:text-teal-400 transition-colors"
                    )}
                  >
                    {item.value}
                  </p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
