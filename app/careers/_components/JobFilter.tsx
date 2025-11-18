"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import type { JobDepartment, JobLocation, JobType } from "@/app/careers/_data/jobs";
import { jobTranslations } from "@/app/careers/_data/jobs";
import type { Language } from "@/lib/translations";

interface JobFilterProps {
  language: Language;
  selectedDepartment: JobDepartment | "all";
  selectedLocation: JobLocation | "all";
  selectedType: JobType | "all";
  onDepartmentChange: (department: JobDepartment | "all") => void;
  onLocationChange: (location: JobLocation | "all") => void;
  onTypeChange: (type: JobType | "all") => void;
}

export default function JobFilter({
  language,
  selectedDepartment,
  selectedLocation,
  selectedType,
  onDepartmentChange,
  onLocationChange,
  onTypeChange,
}: JobFilterProps) {
  const t = jobTranslations[language];

  const departments: (JobDepartment | "all")[] = [
    "all",
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Operations",
    "Product",
  ];

  const locations: (JobLocation | "all")[] = ["all", "Tehran", "Remote", "Hybrid"];

  const types: (JobType | "all")[] = ["all", "full-time", "part-time", "contract", "remote"];

  return (
    <div className="backdrop-blur-md bg-slate-900/40 border border-slate-800/50 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-teal-400" />
        <h3 className="text-lg font-semibold text-slate-100">{t.labels.filterBy}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.labels.department}
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value as JobDepartment | "all")}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "bg-slate-900/60 border border-slate-700/50",
              "text-slate-200",
              "focus:outline-none focus:ring-2 focus:ring-teal-500/50",
              "transition-all duration-200",
              "cursor-pointer"
            )}
          >
            <option value="all">{t.labels.allDepartments}</option>
            {departments.slice(1).map((dept) => (
              <option key={dept} value={dept}>
                {t.departments[dept as JobDepartment]}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.labels.location}
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value as JobLocation | "all")}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "bg-slate-900/60 border border-slate-700/50",
              "text-slate-200",
              "focus:outline-none focus:ring-2 focus:ring-teal-500/50",
              "transition-all duration-200",
              "cursor-pointer"
            )}
          >
            <option value="all">{t.labels.allLocations}</option>
            {locations.slice(1).map((loc) => (
              <option key={loc} value={loc}>
                {t.locations[loc as JobLocation]}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.labels.type}
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as JobType | "all")}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "bg-slate-900/60 border border-slate-700/50",
              "text-slate-200",
              "focus:outline-none focus:ring-2 focus:ring-teal-500/50",
              "transition-all duration-200",
              "cursor-pointer"
            )}
          >
            <option value="all">{t.labels.allTypes}</option>
            {types.slice(1).map((type) => (
              <option key={type} value={type}>
                {t.types[type as JobType]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
