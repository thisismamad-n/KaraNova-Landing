import React, { useRef, useState } from "react";
import { z } from "zod";

// A minimal version of the problem for documentation purposes.

// RATIONALE FOR PERFORMANCE IMPROVEMENT:
// The current implementation in ContactForm.tsx uses an anti-pattern:
//
// setTimeout(() => {
//   setErrors((currentErrors) => {
//     const firstErrorField = Object.keys(currentErrors)[0] as keyof FormErrors;
//     if (firstErrorField && fieldRefs[firstErrorField]?.current) {
//        setTimeout(() => {
//          fieldRefs[firstErrorField]!.current!.focus();
//        }, 0);
//     }
//     return currentErrors;
//   });
// }, 10);
//
// 1. It forces a 10ms artificial delay on the main thread when a user submits an invalid form.
// 2. It abuses the state setter updater function merely to read state, which still queues a state update evaluation in React.
// 3. It creates multiple nested closures (allocations) unnecessarily.
//
// By refactoring `validateForm` to return the actual `FormErrors` object directly:
// 1. We eliminate the artificial 10ms wait time entirely.
// 2. We remove the unnecessary state updater function execution.
// 3. The time-to-interaction (focusing the error field) is reduced by at least 10ms + Next event loop tick.
//
// In high-frequency interaction components, minimizing async delays directly improves TTI (Time to Interactive) and INP (Interaction to Next Paint) metrics.
