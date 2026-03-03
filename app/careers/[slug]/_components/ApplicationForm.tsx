"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Send, Upload, CheckCircle, AlertCircle } from "lucide-react";
import type { JobPosting } from "@/app/careers/_data/jobs";
import type { Language } from "@/lib/translations";
import { formContent } from "../_data/formContent";

interface ApplicationFormProps {
  job: JobPosting;
  language: Language;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  coverLetter: string;
  resume: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  coverLetter?: string;
  resume?: string;
}

export default function ApplicationForm({ job, language }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = formContent[language];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = t.errors.required;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = t.errors.minLength.replace("{min}", "2");
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = t.errors.maxLength.replace("{max}", "100");
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errors.invalidEmail;
    } else if (formData.email.trim().length > 100) {
      newErrors.email = t.errors.maxLength.replace("{max}", "100");
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t.errors.required;
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = t.errors.invalidPhone;
    } else if (formData.phone.trim().length > 20) {
      newErrors.phone = t.errors.maxLength.replace("{max}", "20");
    }

    // LinkedIn validation (Optional but bounded)
    if (formData.linkedIn.trim() && formData.linkedIn.trim().length > 150) {
      newErrors.linkedIn = t.errors.maxLength.replace("{max}", "150");
    }

    // Portfolio validation (Optional but bounded)
    if (formData.portfolio.trim() && formData.portfolio.trim().length > 150) {
      newErrors.portfolio = t.errors.maxLength.replace("{max}", "150");
    }

    // Cover letter validation
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = t.errors.required;
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = t.errors.minLength.replace("{min}", "50");
    } else if (formData.coverLetter.trim().length > 2000) {
      newErrors.coverLetter = t.errors.maxLength.replace("{max}", "2000");
    }

    // Resume validation
    if (!formData.resume) {
      newErrors.resume = t.errors.fileRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        linkedIn: "",
        portfolio: "",
        coverLetter: "",
        resume: null,
      });
    }, 5000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: undefined });
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "backdrop-blur-md bg-slate-900/40",
          "border border-teal-500/50",
          "rounded-xl p-8",
          "text-center"
        )}
      >
        <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-100 mb-2">{t.successTitle}</h3>
        <p className="text-slate-300">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "backdrop-blur-md bg-slate-900/40",
        "border border-slate-800/50",
        "rounded-xl p-6"
      )}
    >
      <h3 className="text-xl font-bold text-slate-100 mb-6">{t.title}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.fullName} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              setErrors({ ...errors, fullName: undefined });
            }}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
              "bg-slate-900/60 border",
              errors.fullName ? "border-red-500/50" : "border-slate-700/50",
              "text-slate-200 placeholder-slate-500",
              "focus:outline-none focus:ring-2",
              errors.fullName ? "focus:ring-red-500/50" : "focus:ring-teal-500/50",
              "transition-all duration-200"
            )}
            placeholder={t.placeholders.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.email} <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: undefined });
            }}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
              "bg-slate-900/60 border",
              errors.email ? "border-red-500/50" : "border-slate-700/50",
              "text-slate-200 placeholder-slate-500",
              "focus:outline-none focus:ring-2",
              errors.email ? "focus:ring-red-500/50" : "focus:ring-teal-500/50",
              "transition-all duration-200"
            )}
            placeholder={t.placeholders.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.phone} <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              setErrors({ ...errors, phone: undefined });
            }}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
              "bg-slate-900/60 border",
              errors.phone ? "border-red-500/50" : "border-slate-700/50",
              "text-slate-200 placeholder-slate-500",
              "focus:outline-none focus:ring-2",
              errors.phone ? "focus:ring-red-500/50" : "focus:ring-teal-500/50",
              "transition-all duration-200"
            )}
            placeholder={t.placeholders.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* LinkedIn (Optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.linkedIn}
          </label>
          <input
            type="url"
            value={formData.linkedIn}
            onChange={(e) => {
              setFormData({ ...formData, linkedIn: e.target.value });
              setErrors({ ...errors, linkedIn: undefined });
            }}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
              "bg-slate-900/60 border",
              errors.linkedIn ? "border-red-500/50" : "border-slate-700/50",
              "text-slate-200 placeholder-slate-500",
              "focus:outline-none focus:ring-2",
              errors.linkedIn ? "focus:ring-red-500/50" : "focus:ring-teal-500/50",
              "transition-all duration-200"
            )}
            placeholder="https://linkedin.com/in/..."
          />
          {errors.linkedIn && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.linkedIn}
            </p>
          )}
        </div>

        {/* Portfolio (Optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.portfolio}
          </label>
          <input
            type="url"
            value={formData.portfolio}
            onChange={(e) => {
              setFormData({ ...formData, portfolio: e.target.value });
              setErrors({ ...errors, portfolio: undefined });
            }}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
              "bg-slate-900/60 border",
              errors.portfolio ? "border-red-500/50" : "border-slate-700/50",
              "text-slate-200 placeholder-slate-500",
              "focus:outline-none focus:ring-2",
              errors.portfolio ? "focus:ring-red-500/50" : "focus:ring-teal-500/50",
              "transition-all duration-200"
            )}
            placeholder="https://..."
          />
          {errors.portfolio && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.portfolio}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.coverLetter} <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.coverLetter}
            onChange={(e) => {
              setFormData({ ...formData, coverLetter: e.target.value });
              setErrors({ ...errors, coverLetter: undefined });
            }}
            rows={6}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "text-base", // Prevent zoom on iOS
              "bg-slate-900/60 border",
              errors.coverLetter ? "border-red-500/50" : "border-slate-700/50",
              "text-slate-200 placeholder-slate-500",
              "focus:outline-none focus:ring-2",
              errors.coverLetter ? "focus:ring-red-500/50" : "focus:ring-teal-500/50",
              "transition-all duration-200",
              "resize-none"
            )}
            placeholder={t.placeholders.coverLetter}
          />
          {errors.coverLetter && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.coverLetter}
            </p>
          )}
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t.resume} <span className="text-red-400">*</span>
          </label>
          <div
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6",
              errors.resume ? "border-red-500/50" : "border-slate-700/50",
              "hover:border-teal-500/50 transition-colors duration-200",
              "cursor-pointer"
            )}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400">
                {formData.resume ? formData.resume.name : t.placeholders.resume}
              </p>
            </div>
          </div>
          {errors.resume && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.resume}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "px-6 py-3 rounded-lg",
            "bg-gradient-to-r from-teal-500 to-cyan-500",
            "text-white font-semibold",
            "hover:from-teal-600 hover:to-cyan-600",
            "transition-all duration-300",
            "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
            "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "disabled:hover:from-teal-500 disabled:hover:to-cyan-500"
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t.submitting}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {t.submit}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
