"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
            <AlertTriangle className="relative w-24 h-24 text-red-400" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
            مشکلی پیش آمده است
          </h2>
          <p className="text-lg text-slate-400 max-w-md mx-auto mb-4">
            متأسفانه در بارگذاری این صفحه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
          </p>
          {error.digest && (
            <p className="text-sm text-slate-500 font-mono">
              کد خطا: {error.digest}
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={reset}
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "px-8 py-3 rounded-lg",
              "backdrop-blur-xl bg-gradient-to-r from-teal-500/80 to-cyan-500/80",
              "border border-teal-400/30",
              "text-white font-semibold",
              "hover:from-teal-500/90 hover:to-cyan-500/90",
              "hover:border-teal-400/50",
              "transition-all duration-300",
              "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
              "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]",
              "hover:scale-105"
            )}
          >
            <RefreshCw className="w-5 h-5" />
            تلاش مجدد
          </button>

          <Link
            href="/landing"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "px-8 py-3 rounded-lg",
              "bg-slate-800/50 backdrop-blur-sm",
              "border border-slate-700/50",
              "text-slate-300 font-semibold",
              "hover:border-teal-500/50 hover:bg-slate-800/70",
              "hover:text-teal-300",
              "transition-all duration-300"
            )}
          >
            <Home className="w-5 h-5" />
            بازگشت به صفحه اصلی
          </Link>
        </motion.div>

        {/* Technical Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-left"
          >
            <p className="text-xs text-slate-500 mb-2 font-semibold">
              جزئیات خطا (فقط در حالت توسعه):
            </p>
            <pre className="text-xs text-red-400 overflow-auto max-h-40">
              {error.message}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}
