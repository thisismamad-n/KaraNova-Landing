"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
} from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  language: "en" | "fa";
  translations: any;
}

export default function ShareButtons({
  title,
  url,
  language,
  translations,
}: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const shareLabel = translations[language].labels.shareArticle;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "hover:text-sky-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      color: "hover:text-orange-500",
    },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        language === "fa" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className="flex items-center gap-2 text-slate-400">
        <Share2 size={18} />
        <span className="text-sm font-medium">{shareLabel}</span>
      </div>

      <div className={cn("flex gap-3", language === "fa" ? "flex-row-reverse" : "flex-row")}>
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "p-2 rounded-lg",
                "bg-slate-800/50 text-slate-400",
                "border border-slate-700/50",
                "transition-all duration-300",
                link.color,
                "hover:bg-slate-700/50"
              )}
              title={link.name}
            >
              <Icon size={18} />
            </motion.a>
          );
        })}

        {/* Copy Link Button */}
        <motion.button
          onClick={handleCopyLink}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "p-2 rounded-lg",
            "bg-slate-800/50 text-slate-400",
            "border border-slate-700/50",
            "transition-all duration-300",
            copied ? "bg-teal-500/20 text-teal-400 border-teal-500/50" : "hover:bg-slate-700/50"
          )}
          title="Copy link"
        >
          <Copy size={18} />
        </motion.button>
      </div>
    </div>
  );
}
