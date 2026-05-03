import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  requiredIndicator?: boolean;
}

export function FormTextArea({
  label,
  error,
  requiredIndicator,
  className,
  id,
  ...props
}: FormTextAreaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
      >
        {label} {requiredIndicator && <span className="text-red-500 mx-1" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "text-base", // Prevent zoom on iOS
          "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
          "border",
          error ? "border-red-500/50" : "border-slate-700/50",
          "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
          "transition-all duration-300",
          "resize-none",
          className
        )}
        {...props}
      />
      {error && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" aria-hidden="true" />
          {error}
        </motion.p>
      )}
    </div>
  );
}
