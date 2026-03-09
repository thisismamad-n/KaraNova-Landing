"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface ContactFormProps {
  language: "en" | "fa";
}

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be at most 255 characters"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .max(20, "Phone must be at most 20 characters")
    .optional()
    .or(z.literal("")),
  company: z.string().max(100, "Company must be at most 100 characters").optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200, "Subject must be at most 200 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be at most 2000 characters"),
  preferredContact: z.enum(["email", "phone"]),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  preferredContact?: string;
  consent?: string;
}

export default function ContactForm({ language }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    preferredContact: "email",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitStatus === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [submitStatus]);

  const content = {
    fa: {
      title: "فرم تماس",
      subtitle: "برای ارتباط با ما فرم زیر را تکمیل کنید",
      fields: {
        name: "نام و نام خانوادگی",
        email: "ایمیل",
        phone: "تلفن (اختیاری)",
        company: "نام شرکت (اختیاری)",
        subject: "موضوع",
        message: "پیام",
        preferredContact: "روش ارتباط ترجیحی",
        consent: "سیاست حفظ حریم خصوصی را می‌پذیرم",
      },
      contactMethods: {
        email: "ایمیل",
        phone: "تلفن",
      },
      placeholders: {
        name: "نام خود را وارد کنید",
        email: "example@email.com",
        phone: "+98 912 345 6789",
        company: "نام شرکت خود را وارد کنید",
        subject: "موضوع پیام خود را بنویسید",
        message: "پیام خود را اینجا بنویسید...",
      },
      submit: "ارسال پیام",
      submitting: "در حال ارسال...",
      success: "پیام شما با موفقیت ارسال شد!",
      successMessage: "ما در اسرع وقت با شما تماس خواهیم گرفت.",
      error: "خطا در ارسال پیام",
      errorMessage: "لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.",
      validation: {
        nameMin: "نام باید حداقل ۲ کاراکتر باشد",
        nameMax: "نام باید حداکثر ۱۰۰ کاراکتر باشد",
        emailRequired: "ایمیل الزامی است",
        emailInvalid: "ایمیل معتبر نیست",
        emailMax: "ایمیل باید حداکثر ۲۵۵ کاراکتر باشد",
        phoneInvalid: "شماره تلفن معتبر نیست",
        phoneMax: "شماره تلفن باید حداکثر ۲۰ کاراکتر باشد",
        companyMax: "نام شرکت باید حداکثر ۱۰۰ کاراکتر باشد",
        subjectMin: "موضوع باید حداقل ۳ کاراکتر باشد",
        subjectMax: "موضوع باید حداکثر ۲۰۰ کاراکتر باشد",
        messageMin: "پیام باید حداقل ۱۰ کاراکتر باشد",
        messageMax: "پیام باید حداکثر ۲۰۰۰ کاراکتر باشد",
        consentRequired: "باید سیاست حفظ حریم خصوصی را بپذیرید",
      },
    },
    en: {
      title: "Contact Form",
      subtitle: "Fill out the form below to get in touch with us",
      fields: {
        name: "Full Name",
        email: "Email",
        phone: "Phone (Optional)",
        company: "Company Name (Optional)",
        subject: "Subject",
        message: "Message",
        preferredContact: "Preferred Contact Method",
        consent: "I accept the privacy policy",
      },
      contactMethods: {
        email: "Email",
        phone: "Phone",
      },
      placeholders: {
        name: "Enter your name",
        email: "example@email.com",
        phone: "+98 912 345 6789",
        company: "Enter your company name",
        subject: "Enter your message subject",
        message: "Write your message here...",
      },
      submit: "Send Message",
      submitting: "Sending...",
      success: "Your message has been sent successfully!",
      successMessage: "We will get back to you as soon as possible.",
      error: "Error sending message",
      errorMessage: "Please try again or contact us directly.",
      validation: {
        nameMin: "Name must be at least 2 characters",
        nameMax: "Name must be at most 100 characters",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
        emailMax: "Email must be at most 255 characters",
        phoneInvalid: "Invalid phone number",
        phoneMax: "Phone number must be at most 20 characters",
        companyMax: "Company name must be at most 100 characters",
        subjectMin: "Subject must be at least 3 characters",
        subjectMax: "Subject must be at most 200 characters",
        messageMin: "Message must be at least 10 characters",
        messageMax: "Message must be at most 2000 characters",
        consentRequired: "You must accept the privacy policy",
      },
    },
  };

  const currentContent = content[language];

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          // Map Zod error messages to localized messages
          if (field === "name" && err.message.includes("at least 2")) {
            newErrors[field] = currentContent.validation.nameMin;
          } else if (field === "name" && err.message.includes("at most")) {
            newErrors[field] = currentContent.validation.nameMax;
          } else if (field === "email" && err.message.includes("email")) {
            newErrors[field] = currentContent.validation.emailInvalid;
          } else if (field === "email" && err.message.includes("at most")) {
            newErrors[field] = currentContent.validation.emailMax;
          } else if (field === "phone" && err.message.includes("Invalid")) {
            newErrors[field] = currentContent.validation.phoneInvalid;
          } else if (field === "phone" && err.message.includes("at most")) {
            newErrors[field] = currentContent.validation.phoneMax;
          } else if (field === "company" && err.message.includes("at most")) {
            newErrors[field] = currentContent.validation.companyMax;
          } else if (field === "subject" && err.message.includes("at least 3")) {
            newErrors[field] = currentContent.validation.subjectMin;
          } else if (field === "subject" && err.message.includes("at most")) {
            newErrors[field] = currentContent.validation.subjectMax;
          } else if (field === "message" && err.message.includes("at least 10")) {
            newErrors[field] = currentContent.validation.messageMin;
          } else if (field === "message" && err.message.includes("at most")) {
            newErrors[field] = currentContent.validation.messageMax;
          } else if (field === "consent") {
            newErrors[field] = currentContent.validation.consentRequired;
          } else {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
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
        phone: "",
        company: "",
        subject: "",
        message: "",
        preferredContact: "email",
        consent: false,
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-1">
          {currentContent.title}
        </h2>
        <p className="text-sm text-slate-400">{currentContent.subtitle}</p>
      </div>

      {/* Form Container */}
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
              ref={successRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 focus:outline-none"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full backdrop-blur-md bg-teal-500/20 border border-teal-500/30 mb-6 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                <CheckCircle className="w-10 h-10 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">
                {currentContent.success}
              </h3>
              <p className="text-slate-400 mb-6">
                {currentContent.successMessage}
              </p>
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
                {language === "fa" ? "ارسال پیام جدید" : "Send New Message"}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
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
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
                      "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                      "border",
                      errors.name
                        ? "border-red-500/50"
                        : "border-slate-700/50",
                      "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                      "transition-all duration-300"
                    )}
                  />
                  {errors.name && (
                    <motion.p
                      id="name-error"
                      role="alert"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
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
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
                      "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                      "border",
                      errors.email
                        ? "border-red-500/50"
                        : "border-slate-700/50",
                      "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                      "transition-all duration-300"
                    )}
                  />
                  {errors.email && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                  >
                    {currentContent.fields.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={currentContent.placeholders.phone}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
                      "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                      "border",
                      errors.phone
                        ? "border-red-500/50"
                        : "border-slate-700/50",
                      "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                      "transition-all duration-300"
                    )}
                  />
                  {errors.phone && (
                    <motion.p
                      id="phone-error"
                      role="alert"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                  >
                    {currentContent.fields.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={currentContent.placeholders.company}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg",
                      "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
                      "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                      "border border-slate-700/50",
                      "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
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
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
                    "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                    "border",
                    errors.subject
                      ? "border-red-500/50"
                      : "border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300"
                  )}
                />
                {errors.subject && (
                  <motion.p
                    id="subject-error"
                    role="alert"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.subject}
                  </motion.p>
                )}
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
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  rows={5}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "text-base", // Prevent zoom on iOS
                    "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                    "border",
                    errors.message
                      ? "border-red-500/50"
                      : "border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300",
                    "resize-none"
                  )}
                />
                {errors.message && (
                  <motion.p
                    id="message-error"
                    role="alert"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label
                  htmlFor="preferredContact"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                >
                  {currentContent.fields.preferredContact}
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
                    "backdrop-blur-md bg-slate-800/40 text-slate-100",
                    "border border-slate-700/50",
                    "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                    "transition-all duration-300",
                    "cursor-pointer"
                  )}
                >
                  <option value="email">
                    {currentContent.contactMethods.email}
                  </option>
                  <option value="phone">
                    {currentContent.contactMethods.phone}
                  </option>
                </select>
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                    className={cn(
                      "mt-1 w-5 h-5 rounded",
                      "border-2",
                      errors.consent
                        ? "border-red-500/50"
                        : "border-slate-700/50",
                      "bg-slate-800/40",
                      "checked:bg-gradient-to-br checked:from-teal-500 checked:to-cyan-500",
                      "checked:border-teal-500",
                      "focus:outline-none focus:ring-2 focus:ring-teal-500/20",
                      "transition-all duration-300",
                      "cursor-pointer"
                    )}
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {currentContent.fields.consent}
                  </span>
                </label>
                {errors.consent && (
                  <motion.p
                    id="consent-error"
                    role="alert"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.consent}
                  </motion.p>
                )}
              </div>

              {/* Error Message */}
              {submitStatus === "error" && (
                <motion.div
                  role="alert"
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
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Send className="w-5 h-5" aria-hidden="true" />
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
