"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogCategory } from "@/app/resources/blog/_data/blogs";

interface BlogFilterProps {
  categories: BlogCategory[];
  selectedCategory: BlogCategory | "all";
  onCategoryChange: (category: BlogCategory | "all") => void;
  language: "en" | "fa";
  translations: any;
}

export default function BlogFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  language,
  translations,
}: BlogFilterProps) {
  const filterByLabel = translations[language].labels.filterBy;
  const categoryLabel = translations[language].labels.category;
  const allCategoriesLabel = translations[language].labels.allCategories;

  const uniqueCategories = Array.from(new Set(categories));

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col gap-4",
        language === "fa" ? "items-end" : "items-start"
      )}
    >
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-3 block">
          {filterByLabel} {categoryLabel}
        </label>

        <div
          className={cn(
            "flex flex-wrap gap-2",
            language === "fa" ? "justify-end" : "justify-start"
          )}
        >
          {/* All Categories Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange("all")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
              selectedCategory === "all"
                ? "bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
            )}
          >
            {allCategoriesLabel}
          </motion.button>

          {/* Category Buttons */}
          {uniqueCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                selectedCategory === category
                  ? "bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
