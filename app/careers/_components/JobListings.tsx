"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import JobFilter from "@/app/careers/_components/JobFilter";
import JobListing from "@/app/careers/_components/JobListing";
import { mockJobs, jobTranslations } from "@/app/careers/_data/jobs";
import type { JobDepartment, JobLocation, JobType } from "@/app/careers/_data/jobs";
import type { Language } from "@/lib/translations";

interface JobListingsProps {
  language: Language;
}

export default function JobListings({ language }: JobListingsProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<JobDepartment | "all">("all");
  const [selectedLocation, setSelectedLocation] = useState<JobLocation | "all">("all");
  const [selectedType, setSelectedType] = useState<JobType | "all">("all");

  const t = jobTranslations[language];

  // Filter jobs based on selected criteria
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesDepartment =
        selectedDepartment === "all" || job.department === selectedDepartment;
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
      const matchesType = selectedType === "all" || job.type === selectedType;

      return matchesDepartment && matchesLocation && matchesType;
    });
  }, [selectedDepartment, selectedLocation, selectedType]);

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2
          className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
            "bg-gradient-to-r from-slate-100 via-teal-200 to-cyan-200",
            "bg-clip-text text-transparent"
          )}
        >
          {t.labels.openPositions}
        </h2>
        <p className="text-lg text-slate-300">
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1
            ? language === "fa"
              ? "موقعیت شغلی"
              : "position"
            : language === "fa"
            ? "موقعیت شغلی"
            : "positions"}{" "}
          {language === "fa" ? "موجود" : "available"}
        </p>
      </div>

      {/* Job Filter */}
      <JobFilter
        language={language}
        selectedDepartment={selectedDepartment}
        selectedLocation={selectedLocation}
        selectedType={selectedType}
        onDepartmentChange={setSelectedDepartment}
        onLocationChange={setSelectedLocation}
        onTypeChange={setSelectedType}
      />

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <JobListing key={job.id} job={job} language={language} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="backdrop-blur-md bg-slate-900/40 border border-slate-800/50 rounded-xl p-12">
            <p className="text-xl text-slate-300 mb-2">{t.labels.noJobs}</p>
            <p className="text-slate-400">{t.labels.checkBackSoon}</p>
          </div>
        </div>
      )}
    </div>
  );
}
