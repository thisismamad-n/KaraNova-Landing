"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from markdown content
  useEffect(() => {
    // Use setTimeout to defer state update and avoid synchronous setState
    const timeoutId = setTimeout(() => {
      const headingRegex = /^(#{1,3})\s+(.+)$/gm;
      const headings: TocItem[] = [];
      let match;
      let index = 0;

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        let id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        
        // Ensure unique IDs by appending index if duplicate
        const existingIds = headings.map(h => h.id);
        if (existingIds.includes(id)) {
          id = `${id}-${index}`;
        }

        headings.push({ id, text, level });
        index++;
      }

      setToc(headings);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "sticky top-24",
        "bg-slate-900/40 backdrop-blur-md",
        "border border-slate-800/50 rounded-xl",
        "p-4",
        className
      )}
      aria-label="فهرست مطالب"
      dir="rtl"
    >
      <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide text-right">
        در این صفحه
      </h3>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingRight: `${(item.level - 1) * 12}px` }}
          >
            <button
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                "text-right text-sm transition-colors duration-200 hover:text-teal-400 w-full",
                activeId === item.id
                  ? "text-teal-400 font-medium"
                  : "text-slate-400"
              )}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
