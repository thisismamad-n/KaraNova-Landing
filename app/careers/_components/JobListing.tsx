"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, Briefcase, Calendar, ArrowRight } from "lucide-react";
import type { JobPosting } from "@/app/careers/_data/jobs";
import { jobTranslations } from "@/app/careers/_data/jobs";
import type { Language } from "@/lib/translations";

interface JobListingProps {
  job: JobPosting;
  language: Language;
  index: number;
}

export default function JobListing({ job, language, index }: JobListingProps) {
  const t = jobTranslations[language];

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative group",
        "backdrop-blur-md bg-slate-900/40",
        "border border-slate-800/50",
        "rounded-xl p-6",
        "hover:border-teal-500/50",
        "transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]"
      )}
    >
      {/* Job Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2 group-hover:text-teal-300 transition-colors">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {t.departments[job.department]}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {t.locations[job.location]}
            </span>
            <span className="px-2 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-medium">
              {t.types[job.type]}
            </span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-slate-300 mb-4 leading-relaxed">{job.description}</p>

      {/* Job Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>
            {t.labels.postedOn} {formatDate(job.postedDate)}
          </span>
        </div>

        <Link
          href={`/careers/${job.slug}`}
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "px-6 py-2.5 rounded-lg",
            "bg-gradient-to-r from-teal-500 to-cyan-500",
            "text-white font-semibold text-sm",
            "hover:from-teal-600 hover:to-cyan-600",
            "transition-all duration-300",
            "shadow-[0_0_15px_rgba(20,184,166,0.3)]",
            "hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]",
            "group-hover:scale-105"
          )}
        >
          {t.labels.viewDetails}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
