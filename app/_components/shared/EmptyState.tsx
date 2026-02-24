"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Inbox, Search, FileQuestion, Briefcase, BookOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: "default" | "search" | "error";
  className?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  const iconColor = variant === "error" ? "text-red-400" : "text-slate-400";
  const glowColor = variant === "error" ? "bg-red-500/20" : "bg-slate-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "py-16 px-4",
        className
      )}
    >
      {/* Icon */}
      <div className="relative mb-6" aria-hidden="true">
        <div className={cn("absolute inset-0 rounded-full blur-xl", glowColor)} />
        <Icon className={cn("relative w-16 h-16", iconColor)} />
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 max-w-md mb-6">
        {description}
      </p>

      {/* Action Button */}
      {action && (
        <div>
          {action.href ? (
            <Link
              href={action.href}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "px-6 py-3 rounded-lg",
                "backdrop-blur-xl bg-gradient-to-r from-teal-500/80 to-cyan-500/80",
                "border border-teal-400/30",
                "text-white font-semibold",
                "hover:from-teal-500/90 hover:to-cyan-500/90",
                "hover:border-teal-400/50",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
                "hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              )}
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "px-6 py-3 rounded-lg",
                "backdrop-blur-xl bg-gradient-to-r from-teal-500/80 to-cyan-500/80",
                "border border-teal-400/30",
                "text-white font-semibold",
                "hover:from-teal-500/90 hover:to-cyan-500/90",
                "hover:border-teal-400/50",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
                "hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              )}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Preset empty states for common scenarios
export function NoSearchResults({ query, onClear }: { query: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="نتیجه‌ای یافت نشد"
      description={`متأسفانه نتیجه‌ای برای "${query}" پیدا نکردیم. لطفاً با کلمات دیگری جستجو کنید.`}
      action={onClear ? { label: "پاک کردن جستجو", onClick: onClear } : undefined}
      variant="search"
    />
  );
}

export function NoJobs() {
  return (
    <EmptyState
      icon={Briefcase}
      title="موقعیت شغلی فعالی وجود ندارد"
      description="در حال حاضر موقعیت شغلی باز نداریم، اما به زودی فرصت‌های جدیدی اضافه خواهد شد."
      action={{
        label: "بازگشت به صفحه اصلی",
        href: "/landing",
      }}
    />
  );
}

export function NoBlogPosts() {
  return (
    <EmptyState
      icon={BookOpen}
      title="مقاله‌ای یافت نشد"
      description="در حال حاضر مقاله‌ای در این دسته‌بندی وجود ندارد."
      action={{
        label: "مشاهده همه مقالات",
        href: "/resources/blog",
      }}
    />
  );
}

export function NoDocumentation() {
  return (
    <EmptyState
      icon={FileQuestion}
      title="مستندی یافت نشد"
      description="متأسفانه مستند مورد نظر شما یافت نشد."
      action={{
        label: "بازگشت به مستندات",
        href: "/resources/documentation",
      }}
    />
  );
}

export function NoFAQResults({ onClear }: { onClear?: () => void }) {
  return (
    <EmptyState
      icon={MessageSquare}
      title="سوالی یافت نشد"
      description="متأسفانه سوالی مطابق با جستجوی شما پیدا نکردیم."
      action={onClear ? { label: "مشاهده همه سوالات", onClick: onClear } : undefined}
      variant="search"
    />
  );
}
