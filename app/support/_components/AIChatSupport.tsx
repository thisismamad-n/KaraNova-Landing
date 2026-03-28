"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkles, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatSupportProps {
  language: "en" | "fa";
}

export default function AIChatSupport({ language }: AIChatSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "سلام! من دستیار هوشمند کارانوا هستم. چطور می‌تونم کمکتون کنم؟",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    fa: {
      title: "دستیار هوشمند",
      subtitle: "پاسخ فوری به سوالات شما با هوش مصنوعی",
      placeholder: "سوال خود را بپرسید...",
      send: "ارسال",
      openChat: "شروع گفتگو",
      typing: "در حال تایپ...",
    },
    en: {
      title: "AI Assistant",
      subtitle: "Get instant answers powered by AI",
      placeholder: "Ask your question...",
      send: "Send",
      openChat: "Start Chat",
      typing: "Typing...",
    },
  };

  const currentContent = content[language];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `متشکرم از سوالتون. این یک پاسخ نمونه است. در نسخه نهایی، این پاسخ از سرور دریافت می‌شود و بر اساس سوال شما تولید می‌گردد.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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

      {/* Professional Chat Container with Glassmorphism */}
      <div
        className={cn(
          "max-w-4xl mx-auto",
          "backdrop-blur-xl bg-slate-900/30",
          "border border-slate-700/30",
          "rounded-2xl overflow-hidden",
          "shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
        )}
      >
        {/* Chat Header with Glassmorphism */}
        <div className="backdrop-blur-lg bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-b border-slate-700/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-full",
                  "bg-gradient-to-br from-teal-500 to-cyan-500",
                  "flex items-center justify-center",
                  "shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                )}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900/80 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-100">
                دستیار هوشمند کارانوا
              </h3>
              <p className="text-xs text-slate-400">آنلاین • پاسخگویی فوری</p>
            </div>
          </div>
        </div>

        {/* Messages Area with Glassmorphism */}
        <div className="h-[450px] overflow-y-auto p-6 space-y-4 backdrop-blur-sm bg-slate-950/20">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {/* Assistant Avatar */}
                {message.role === "assistant" && (
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full",
                      "bg-gradient-to-br from-teal-500 to-cyan-500",
                      "flex items-center justify-center",
                      "shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                    )}
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Message Bubble with Glassmorphism */}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    "shadow-lg",
                    message.role === "user"
                      ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-teal-500/20"
                      : "backdrop-blur-md bg-slate-800/60 text-slate-100 shadow-black/20 border border-slate-700/30"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      message.role === "user"
                        ? "text-teal-100/70"
                        : "text-slate-500"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 justify-start"
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full",
                  "bg-gradient-to-br from-teal-500 to-cyan-500",
                  "flex items-center justify-center"
                )}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="backdrop-blur-md bg-slate-800/60 border border-slate-700/30 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                <span className="text-sm text-slate-400">
                  {currentContent.typing}
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area with Glassmorphism */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-700/30 p-4 backdrop-blur-lg bg-slate-900/40"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentContent.placeholder}
              disabled={isLoading}
              className={cn(
                "flex-1 px-4 py-3 rounded-xl",
                "backdrop-blur-md bg-slate-800/40 text-slate-100 placeholder-slate-500",
                "border border-slate-700/50",
                "focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-300"
              )}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={cn(
                "px-5 py-3 rounded-xl",
                "bg-gradient-to-r from-teal-500 to-cyan-500",
                "text-white font-semibold",
                "hover:from-teal-600 hover:to-cyan-600",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(20,184,166,0.3)]",
                "hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]",
                "hover:scale-105 active:scale-95"
              )}
              aria-label={currentContent.send}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
