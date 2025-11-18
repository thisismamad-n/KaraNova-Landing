"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high";
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SupportFormProps {
  language: "en" | "fa";
}

export default function SupportForm({ language }: SupportFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const content = {
    fa: {
      title: "فرم پشتیبانی",
      subtitle: "برای ارسال درخواست پشتیبانی فرم زیر را تکمیل کنید",
      fields: {
        name: "نام و نام خانوادگی",
        email: "ایمیل",
        subject: "موضوع",
        message: "پیام",
        priority: "اولویت",
      },
      priorities: {
        low: "کم",
        medium: "متوسط",
        high: "زیاد",
      },
      placeholders: {
        name: "نام خود را وارد کنید",
        email: "example@email.com",
        subject: "موضوع درخواست خود را بنویسید",
        message: "توضیحات کامل مشکل یا سوال خود را بنویسید...",
      },
      submit: "ارسال درخواست",
      submitting: "در حال ارسال...",
      success: "درخواست شما با موفقیت ارسال شد!",
      successMessage: "تیم پشتیبانی ما در اسرع وقت با شما تماس خواهند گرفت.",
      error: "خطا در ارسال درخواست",
      errorMessage: "لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.",
      validation: {
        nameRequired: "نام الزامی است",
        emailRequired: "ایمیل الزامی است",
        emailInvalid: "ایمیل معتبر نیست",
        subjectRequired: "موضوع الزامی است",
        messageRequired: "پیام الزامی است",
        messageMinLength: "پیام باید حداقل ۱۰ کاراکتر باشد",
      },
    },
    en: {
      title: "Support Form",
      subtitle: "Fill out the form below to submit a support request",
      fields: {
        name: "Full Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        priority: "Priority",
      },
      priorities: {
        low: "Low",
        medium: "Medium",
        high: "High",
      },
      placeholders: {
        name: "Enter your name",
        email: "example@email.com",
        subject: "Enter your request subject",
        message: "Describe your issue or question in detail...",
      },
      submit: "Submit Request",
      submitting: "Submitting...",
      success: "Your request has been submitted successfully!",
      successMessage: "Our support team will contact you as soon as possible.",
      error: "Error submitting request",
      errorMessage: "Please try again or contact us directly.",
      validation: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
        subjectRequired: "Subject is required",
        messageRequired: "Message is required",
        messageMinLength: "Message must be at least 10 characters",
      },
    },
  };

  const currentContent = content[language];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = currentContent.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = currentContent.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = currentContent.validation.emailInvalid;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = currentContent.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = currentContent.validation.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = currentContent.validation.messageMinLength;
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
    setSubmitStatus("idle");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        priority: "medium",
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

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
            "shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
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
                onClick={() => setSubmitStatus("idle")}
                className={cn(
                  "px-6 py-2.5 rounded-lg",
                  "backdrop-blur-md bg-slate-800/40",
                  "border border-slate-700/50",
                  "text-teal-400 font-semibold",
                  "hover:bg-slate-800/60 hover:border-teal-500/50",
                  "transition-all duration-300"
                )}
              >
                ارسال درخواست جدید
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                >
                  {currentContent.fields.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={currentContent.placeholders.name}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                    "border",
                    errors.name ? "border-red-500/50" : "border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300"
                  )}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                >
                  {currentContent.fields.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={currentContent.placeholders.email}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                    "border",
                    errors.email ? "border-red-500/50" : "border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300"
                  )}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Subject and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Subject - Takes 2 columns */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                >
                  {currentContent.fields.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={currentContent.placeholders.subject}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                    "border",
                    errors.subject ? "border-red-500/50" : "border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300"
                  )}
                />
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </motion.p>
                )}
              </div>

              {/* Priority - Takes 1 column */}
              <div>
                <label
                  htmlFor="priority"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                >
                  {currentContent.fields.priority}
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "backdrop-blur-md bg-slate-800/40 text-slate-100",
                    "border border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300",
                    "cursor-pointer"
                  )}
                >
                  <option value="low">{currentContent.priorities.low}</option>
                  <option value="medium">{currentContent.priorities.medium}</option>
                  <option value="high">{currentContent.priorities.high}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
              >
                {currentContent.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={currentContent.placeholders.message}
                rows={5}
                className={cn(
                  "w-full px-4 py-3 rounded-lg",
                  "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                  "border",
                  errors.message ? "border-red-500/50" : "border-slate-700/50",
                  "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                  "transition-all duration-300",
                  "resize-none"
                )}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </motion.p>
              )}
            </div>

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
                    <Send className="w-5 h-5" />
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
