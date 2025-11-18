"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, ChevronDown, FileText } from "lucide-react";

export interface Version {
  version: string;
  date: Date;
  changes: string[];
  downloadUrl?: string;
}

export interface VersionHistoryProps {
  versions: Version[];
  className?: string;
}

export default function VersionHistory({
  versions,
  className,
}: VersionHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const currentVersion = versions[0];
  const previousVersions = versions.slice(1);

  return (
    <div
      className={cn(
        "backdrop-blur-md bg-slate-900/30",
        "border border-slate-800/50 rounded-xl",
        "p-6",
        className
      )}
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-400" />
          تاریخچه نسخه‌ها
        </h3>
        {previousVersions.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "text-sm text-teal-400 hover:text-teal-300",
              "flex items-center gap-1 transition-colors"
            )}
          >
            {isExpanded ? "بستن" : `نمایش ${previousVersions.length} نسخه قبلی`}
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      {/* Current Version */}
      <div
        className={cn(
          "border border-teal-500/30 rounded-lg p-4 mb-4",
          "bg-teal-500/5"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-teal-400">
              نسخه فعلی
            </span>
            <span className="text-lg font-bold text-slate-100">
              {currentVersion.version}
            </span>
          </div>
          <span className="text-sm text-slate-400">
            {new Date(currentVersion.date).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {currentVersion.changes.length > 0 && (
          <ul className="space-y-1 text-sm text-slate-300">
            {currentVersion.changes.map((change, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>{change}</span>
              </li>
            ))}
          </ul>
        )}
        {currentVersion.downloadUrl && (
          <a
            href={currentVersion.downloadUrl}
            download
            className={cn(
              "inline-flex items-center gap-2 mt-3",
              "text-sm text-teal-400 hover:text-teal-300",
              "transition-colors"
            )}
          >
            <FileText className="w-4 h-4" />
            دانلود نسخه PDF
          </a>
        )}
      </div>

      {/* Previous Versions */}
      <AnimatePresence>
        {isExpanded && previousVersions.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {previousVersions.map((version) => (
              <div
                key={version.version}
                className={cn(
                  "border border-slate-800/50 rounded-lg p-4",
                  "hover:border-slate-700/50 transition-colors"
                )}
              >
                <button
                  onClick={() =>
                    setSelectedVersion(
                      selectedVersion === version.version
                        ? null
                        : version.version
                    )
                  }
                  className="w-full flex items-center justify-between text-right"
                >
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-400 transition-transform duration-300",
                      selectedVersion === version.version && "rotate-180"
                    )}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">
                      نسخه {version.version}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(version.date).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {selectedVersion === version.version && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-slate-800/50"
                    >
                      {version.changes.length > 0 && (
                        <ul className="space-y-1 text-sm text-slate-400 mb-3">
                          {version.changes.map((change, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-slate-600 mt-1">•</span>
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {version.downloadUrl && (
                        <a
                          href={version.downloadUrl}
                          download
                          className={cn(
                            "inline-flex items-center gap-2",
                            "text-sm text-teal-400 hover:text-teal-300",
                            "transition-colors"
                          )}
                        >
                          <FileText className="w-4 h-4" />
                          دانلود نسخه PDF
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
