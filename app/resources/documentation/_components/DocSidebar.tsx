"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { docCategories, getDocsByCategory } from "../_data/docs";

interface DocSidebarProps {
  className?: string;
}

export default function DocSidebar({ className }: DocSidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    docCategories.map((cat) => cat.id)
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside
      className={cn(
        "w-full lg:w-64 flex-shrink-0",
        "bg-slate-900/40 backdrop-blur-md",
        "border border-slate-800/50 rounded-xl",
        "p-4",
        className
      )}
      dir="rtl"
    >
      <nav aria-label="ناوبری مستندات">
        <div className="space-y-2">
          {docCategories.map((category) => {
            const docs = getDocsByCategory(category.slug);
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "w-full flex items-center justify-between",
                    "px-3 py-2 rounded-lg",
                    "text-sm font-medium",
                    "text-slate-300 hover:text-teal-400",
                    "hover:bg-slate-800/50",
                    "transition-all duration-200"
                  )}
                  aria-expanded={isExpanded}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Category Articles */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 space-y-1">
                        {docs.map((doc) => {
                          const href = `/resources/documentation/${category.slug}/${doc.slug}`;
                          const isActive = pathname === href;

                          return (
                            <Link
                              key={doc.id}
                              href={href}
                              className={cn(
                                "block px-3 py-2 rounded-lg",
                                "text-sm transition-all duration-200",
                                isActive
                                  ? "bg-teal-500/20 text-teal-400 font-medium"
                                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                              )}
                            >
                              {doc.title}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
