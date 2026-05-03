import React from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export function FormSelect({ label, options, className, id, ...props }: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide"
      >
        {label}
      </label>
      <select
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "min-h-[44px] text-base", // Ensure minimum touch target and prevent zoom on iOS
          "backdrop-blur-md bg-slate-800/40 text-slate-100",
          "border border-slate-700/50",
          "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
          "transition-all duration-300",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
