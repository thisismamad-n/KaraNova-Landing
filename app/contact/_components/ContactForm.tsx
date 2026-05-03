"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

import { content } from "./contact-form.content";
import {
  contactFormSchema,
  ContactFormData,
  FormErrors,
  getLocalizedErrors
} from "./contact-form.schema";

interface ContactFormProps {
  language: "en" | "fa";
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

  // Refs for focusing on first error
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const preferredContactRef = useRef<HTMLSelectElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<keyof FormErrors, React.RefObject<HTMLElement | null>> = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    company: companyRef,
    subject: subjectRef,
    message: messageRef,
    preferredContact: preferredContactRef,
    consent: consentRef,
    _general: { current: null },
  };

  useEffect(() => {
    if (submitStatus === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [submitStatus]);

  const currentContent = content[language];

  const validateForm = (): FormErrors | null => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = getLocalizedErrors(error, currentContent.validation);
        setErrors(newErrors);
        return newErrors;
      }
      return { _general: "An unknown error occurred" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors) {
      // Focus on the first field with an error
      const firstErrorField = Object.keys(validationErrors)[0] as keyof FormErrors;
      if (firstErrorField && fieldRefs[firstErrorField]?.current) {
         setTimeout(() => {
           fieldRefs[firstErrorField]!.current!.focus();
         }, 0);
      }
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

  const renderInput = (
    name: keyof Omit<ContactFormData, 'preferredContact' | 'consent' | 'message'>,
    type: string,
    isRequired: boolean,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    const errorMsg = errors[name];
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
        >
          {currentContent.fields[name]}
          {isRequired && (
            <span className="text-red-500 mx-1" aria-hidden="true">*</span>
          )}
        </label>
        <input
          ref={inputRef}
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={currentContent.placeholders[name]}
          aria-invalid={!!errorMsg}
          aria-required={isRequired ? "true" : "false"}
          aria-describedby={errorMsg ? `${name}-error` : undefined}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
            "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
            "border",
            errorMsg ? "border-red-500/50" : "border-slate-700/50",
            "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
            "transition-all duration-300"
          )}
        />
        {errorMsg && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" aria-hidden="true" />
            {errorMsg}
          </motion.p>
        )}
      </div>
    );
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
              className={cn(
                "flex flex-col items-center justify-center py-12 text-center",
                "focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-xl"
              )}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <CheckCircle className="w-16 h-16 text-teal-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                {currentContent.success}
              </h3>
              <p className="text-slate-400">
                {currentContent.successMessage}
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="mt-8 text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                {language === "fa" ? "ارسال پیام دیگر" : "Send another message"}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {renderInput("name", "text", true, nameRef)}
                {renderInput("email", "email", true, emailRef)}
                {renderInput("phone", "tel", false, phoneRef)}
                {renderInput("company", "text", false, companyRef)}
              </div>

              {renderInput("subject", "text", true, subjectRef)}

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
                >
                  {currentContent.fields.message} <span className="text-red-500 mx-1" aria-hidden="true">*</span>
                </label>
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={currentContent.placeholders.message}
                  aria-invalid={!!errors.message}
                  aria-required="true"
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
                  ref={preferredContactRef}
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
                    ref={consentRef}
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    aria-invalid={!!errors.consent}
                    aria-required="true"
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
                    {currentContent.fields.consent} <span className="text-red-500 mx-1" aria-hidden="true">*</span>
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
