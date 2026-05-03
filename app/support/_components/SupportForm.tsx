"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSupportForm } from "../_hooks/useSupportForm";
import { FormInput, FormTextArea, FormSelect } from "./SupportFormComponents";

interface SupportFormProps {
  language: "en" | "fa";
}

export default function SupportForm({ language }: SupportFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    currentContent,
    handleChange,
    handleSubmit,
    resetForm,
  } = useSupportForm(language);

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-1">
          {currentContent.title}
        </h2>
        <p className="text-sm text-slate-400">{currentContent.subtitle}</p>
      </div>

      {/* Professional Form Container with Glassmorphism */}
      <div className="max-w-3xl mx-auto">
        <div
          className={cn(
            "backdrop-blur-xl bg-slate-900/30",
            "border border-slate-700/30",
            "rounded-2xl p-6 sm:p-8",
            "shadow-2xl shadow-slate-900/50"
          )}
        >
        {submitStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full backdrop-blur-md bg-teal-500/20 border border-teal-500/30 mb-6 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
              <CheckCircle className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-3">
              {currentContent.success}
            </h3>
            <p className="text-slate-400 mb-6">{currentContent.successMessage}</p>
            <button
              onClick={resetForm}
              className={cn(
                "px-6 py-2.5 rounded-lg",
                "backdrop-blur-md bg-slate-800/40",
                "border border-slate-700/50",
                "text-teal-400 font-semibold",
                "hover:bg-slate-800/60 hover:border-teal-500/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                "transition-all duration-300"
              )}
            >
              {language === "fa" ? "ارسال درخواست جدید" : "Submit New Request"}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label={currentContent.fields.name}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                requiredIndicator
                placeholder={currentContent.placeholders.name}
                aria-required="true"
              />

              <FormInput
                label={currentContent.fields.email}
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                requiredIndicator
                placeholder={currentContent.placeholders.email}
                aria-required="true"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <FormInput
                  label={currentContent.fields.subject}
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  requiredIndicator
                  placeholder={currentContent.placeholders.subject}
                  aria-required="true"
                />
              </div>

              <div>
                <FormSelect
                  label={currentContent.fields.priority}
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  options={[
                    { value: "low", label: currentContent.priorities.low },
                    { value: "medium", label: currentContent.priorities.medium },
                    { value: "high", label: currentContent.priorities.high },
                  ]}
                />
              </div>
            </div>

            <FormTextArea
              label={currentContent.fields.message}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              requiredIndicator
              placeholder={currentContent.placeholders.message}
              rows={5}
              aria-required="true"
            />

            {/* Error Message */}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg",
                  "backdrop-blur-md bg-red-500/10",
                  "border border-red-500/30"
                )}
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-400 mb-1">
                    {currentContent.error}
                  </p>
                  <p className="text-xs text-red-400/80">
                    {currentContent.errorMessage}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "px-6 py-3.5 rounded-lg",
                  "bg-gradient-to-r from-teal-500 to-cyan-500",
                  "text-white font-semibold",
                  "hover:from-teal-600 hover:to-cyan-600",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                  "transition-all duration-300",
                  "shadow-[0_0_20px_rgba(20,184,166,0.3)]",
                  "hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    {currentContent.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    {currentContent.submit}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}
