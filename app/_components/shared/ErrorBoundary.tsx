"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                <AlertTriangle className="relative w-16 h-16 text-red-400" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-3">
              خطا در بارگذاری محتوا
            </h3>
            <p className="text-slate-400 mb-6">
              متأسفانه در نمایش این بخش مشکلی پیش آمده است.
            </p>

            <button
              onClick={this.handleReset}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "px-6 py-2.5 rounded-lg",
                "backdrop-blur-xl bg-gradient-to-r from-teal-500/80 to-cyan-500/80",
                "border border-teal-400/30",
                "text-white font-semibold text-sm",
                "hover:from-teal-500/90 hover:to-cyan-500/90",
                "hover:border-teal-400/50",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.6)]"
              )}
            >
              <RefreshCw className="w-4 h-4" />
              تلاش مجدد
            </button>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-6 p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-left">
                <p className="text-xs text-slate-500 mb-2 font-semibold">
                  جزئیات خطا:
                </p>
                <pre className="text-xs text-red-400 overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
