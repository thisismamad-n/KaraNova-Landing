"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, MapPin, Briefcase, Calendar, CheckCircle } from "lucide-react";
import PageHero from "@/app/_components/shared/PageHero";
import ContentSection from "@/app/_components/shared/ContentSection";
import Squares from "@/app/_components/Squares";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import ApplicationForm from "@/app/careers/[slug]/_components/ApplicationForm";
import type { JobPosting } from "@/app/careers/_data/jobs";
import { jobTranslations } from "@/app/careers/_data/jobs";

interface JobDetailClientProps {
  job: JobPosting;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const { language } = useLanguage();
  const t = jobTranslations[language];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const breadcrumbs = [
    { label: language === "fa" ? "خانه" : "Home", href: "/" },
    { label: language === "fa" ? "فرصت‌های شغلی" : "Careers", href: "/careers" },
    { label: job.title, href: `/careers/${job.slug}` },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950" dir={language === "fa" ? "rtl" : "ltr"}>
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="rgba(94, 234, 212, 0.08)"
          hoverFillColor="rgba(94, 234, 212, 0.05)"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <PageHero
          title={job.title}
          subtitle={job.description}
          backgroundVariant="gradient"
          breadcrumbs={breadcrumbs}
        />

        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8 mb-8">
          <Link
            href="/careers"
            className={cn(
              "inline-flex items-center gap-2",
              "text-teal-400 hover:text-teal-300",
              "transition-colors duration-200"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "fa" ? "بازگشت به فرصت‌های شغلی" : "Back to Careers"}
          </Link>
        </div>

        {/* Main Content */}
        <main className="pb-20">
          <ContentSection maxWidth="xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Job Details - Left Column */}
              <div className="lg:col-span-2 space-y-8" ref={ref}>
                {/* Job Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap items-center gap-4 text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-teal-400" />
                    {t.departments[job.department]}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-400" />
                    {t.locations[job.location]}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-400" />
                    {formatDate(job.postedDate)}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-medium">
                    {t.types[job.type]}
                  </span>
                </motion.div>

                {/* Requirements Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">
                    {t.labels.requirements}
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Responsibilities Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">
                    {t.labels.responsibilities}
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">
                    {t.labels.benefits}
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Application Form - Right Column */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-24"
                >
                  <ApplicationForm job={job} language={language} />
                </motion.div>
              </div>
            </div>
          </ContentSection>
        </main>
      </div>
    </div>
  );
}
