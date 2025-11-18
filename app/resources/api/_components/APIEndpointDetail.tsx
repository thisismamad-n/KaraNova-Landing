"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CodeExample, { CodeExampleProps } from "./CodeExample";
import RequestResponse, { RequestResponseProps } from "./RequestResponse";

export interface APIEndpointDetailProps {
  endpoint: RequestResponseProps;
  codeExamples?: CodeExampleProps["examples"];
  className?: string;
}

export default function APIEndpointDetail({
  endpoint,
  codeExamples,
  className,
}: APIEndpointDetailProps) {
  return (
    <div
      className={cn(
        "bg-slate-900/20 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 space-y-8",
        className
      )}
    >
      {/* Request/Response Details */}
      <RequestResponse {...endpoint} />

      {/* Code Examples */}
      {codeExamples && codeExamples.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-4">
            نمونه کدها
          </h4>
          <CodeExample examples={codeExamples} />
        </div>
      )}
    </div>
  );
}
