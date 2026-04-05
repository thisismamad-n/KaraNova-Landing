"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface LegalContentProps {
  children: React.ReactNode;
  lastUpdated?: Date;
  version?: string;
  className?: string;
}

export default function LegalContent({
  children,
  lastUpdated,
  version,
  className,
}: LegalContentProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Extract headings from content for TOC
    const headings = document.querySelectorAll(
      ".legal-content h2, .legal-content h3"
    );
    const items: TOCItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      title: heading.textContent || "",
      level: heading.tagName === "H2" ? 2 : 3,
    }));
    
    // Use requestAnimationFrame to defer state update
    requestAnimationFrame(() => {
      setTocItems(items);
    });

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [children]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={cn("relative", className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents - Sticky Sidebar */}
        {tocItems.length > 0 && (
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24">
              <div
                className={cn(
                  "backdrop-blur-md bg-slate-900/30",
                  "border border-slate-800/50 rounded-xl",
                  "p-6"
                )}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">
                  فهرست مطالب
                </h3>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full text-right flex items-center gap-2",
                        "py-2 px-3 rounded-lg transition-all duration-200",
                        "text-sm",
                        item.level === 3 && "pr-6",
                        activeSection === item.id
                          ? "bg-teal-500/20 text-teal-300 font-medium"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      )}
                    >
                      <ChevronRight aria-hidden="true"
                        className={cn(
                          "w-4 h-4 transition-transform",
                          activeSection === item.id && "text-teal-400"
                        )}
                      />
                      <span className="flex-1 text-right">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className={cn("lg:col-span-9", !tocItems.length && "lg:col-span-12")}>
          {/* Version Info */}
          {(lastUpdated || version) && (
            <div
              className={cn(
                "backdrop-blur-md bg-slate-900/30",
                "border border-slate-800/50 rounded-xl",
                "p-4 mb-6",
                "flex flex-wrap items-center justify-between gap-4"
              )}
            >
              {lastUpdated && (
                <div className="text-sm text-slate-400">
                  <span className="text-slate-500">آخرین بروزرسانی: </span>
                  <span className="text-slate-300 font-medium">
                    {new Date(lastUpdated).toLocaleDateString("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {version && (
                <div className="text-sm text-slate-400">
                  <span className="text-slate-500">نسخه: </span>
                  <span className="text-teal-400 font-medium">{version}</span>
                </div>
              )}
            </div>
          )}

          {/* Legal Content */}
          <div
            className={cn(
              "legal-content",
              "backdrop-blur-md bg-slate-900/30",
              "border border-slate-800/50 rounded-xl",
              "p-6 sm:p-8 lg:p-12",
              "prose prose-invert prose-slate max-w-none",
              "prose-headings:text-slate-100",
              "prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8",
              "prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6",
              "prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4",
              "prose-ul:text-slate-300 prose-ul:space-y-2",
              "prose-li:text-slate-300",
              "prose-strong:text-slate-200 prose-strong:font-semibold",
              "prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300"
            )}
            dir="rtl"
          >
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
