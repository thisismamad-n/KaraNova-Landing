"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface RequestResponseProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  description: string;
  parameters?: Parameter[];
  requestBody?: {
    contentType: string;
    example: string;
  };
  responseExample?: {
    status: number;
    statusText: string;
    body: string;
  };
  className?: string;
}

export default function RequestResponse({
  method,
  endpoint,
  description,
  parameters,
  requestBody,
  responseExample,
  className,
}: RequestResponseProps) {
  const methodColors = {
    GET: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    POST: "bg-green-500/20 text-green-400 border-green-500/30",
    PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    PATCH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Endpoint Header */}
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "px-3 py-1 rounded-md text-xs font-bold border flex-shrink-0",
            methodColors[method]
          )}
        >
          {method}
        </span>
        <div className="flex-1">
          <code className="text-cyan-400 font-mono text-base block mb-2">
            {endpoint}
          </code>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      </div>

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-3">
            پارامترها
          </h4>
          <div className="space-y-2">
            {parameters.map((param) => (
              <div
                key={param.name}
                className="bg-slate-900/30 border border-slate-800/50 rounded-lg p-3"
              >
                <div className="flex items-start gap-3">
                  <code className="text-cyan-400 font-mono text-sm">
                    {param.name}
                  </code>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      param.required
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-slate-700/30 text-slate-400 border border-slate-600/30"
                    )}
                  >
                    {param.required ? "الزامی" : "اختیاری"}
                  </span>
                  <span className="text-slate-500 text-xs font-mono">
                    {param.type}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-2">{param.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Body */}
      {requestBody && (
        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-3">
            بدنه درخواست
          </h4>
          <div className="bg-slate-950/50 border border-slate-800/50 rounded-lg overflow-hidden">
            <div className="bg-slate-900/50 border-b border-slate-800/50 px-4 py-2">
              <span className="text-xs text-slate-400 font-mono">
                Content-Type: {requestBody.contentType}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-slate-300 leading-relaxed">
                {requestBody.example}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Response Example */}
      {responseExample && (
        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            مثال پاسخ
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </h4>
          <div className="bg-slate-950/50 border border-slate-800/50 rounded-lg overflow-hidden">
            <div className="bg-slate-900/50 border-b border-slate-800/50 px-4 py-2 flex items-center gap-3">
              <span
                className={cn(
                  "px-2 py-1 rounded text-xs font-bold",
                  responseExample.status >= 200 && responseExample.status < 300
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : responseExample.status >= 400
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-slate-700/30 text-slate-400 border border-slate-600/30"
                )}
              >
                {responseExample.status}
              </span>
              <span className="text-xs text-slate-400">
                {responseExample.statusText}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-slate-300 leading-relaxed">
                {responseExample.body}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
