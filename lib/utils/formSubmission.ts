/**
 * Form submission utility with network error handling and retry logic
 */

// Cache for the disposable domain set to avoid re-creation
let disposableDomainSet: Set<string> | null = null;

export interface SubmissionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    field?: string;
  };
}

export interface SubmissionOptions {
  endpoint: string;
  data: Record<string, unknown>;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

/**
 * Submit form data with automatic retry on network errors
 */
export async function submitFormWithRetry<T = unknown>(
  options: SubmissionOptions
): Promise<SubmissionResult<T>> {
  const { endpoint, data, maxRetries = 2, retryDelay = 1000, timeout = 10000 } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Server-side validation errors (400)
      if (response.status === 400) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            message: errorData.message || "Validation error",
            code: "VALIDATION_ERROR",
            field: errorData.field,
          },
        };
      }

      // Server errors (500+)
      if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Rate limiting (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay * (attempt + 1);

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        return {
          success: false,
          error: {
            message: "Too many requests. Please try again later.",
            code: "RATE_LIMIT",
          },
        };
      }

      // Success
      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: result as T,
        };
      }

      // Other errors
      throw new Error(`HTTP error: ${response.status}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");

      // Don't retry on abort (timeout)
      if (lastError.name === "AbortError") {
        return {
          success: false,
          error: {
            message: "Request timeout. Please check your connection and try again.",
            code: "TIMEOUT",
          },
        };
      }

      // Network errors - retry
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }
    }
  }

  // All retries failed
  return {
    success: false,
    error: {
      message: lastError?.message || "Network error. Please check your connection and try again.",
      code: "NETWORK_ERROR",
    },
  };
}

/**
 * Validate form data on server-side (simulation)
 * In production, this would be an API endpoint
 */
export async function validateFormServerSide(
  formType: "contact" | "support" | "application",
  data: Record<string, unknown>
): Promise<SubmissionResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate server-side validation
  const errors: Array<{ field: string; message: string }> = [];

  // Robust XSS detection (Server-side validation fallback)
  // NOTE: In a production environment with internet access, this should be replaced
  // with a robust library like 'sanitize-html' or 'dompurify' for better security.
  // This comprehensive regex-based approach is used as a fallback to identify potential XSS attacks.
  const xssPatterns = [
    /<\s*(script|iframe|object|embed|form|style|meta|link|base|svg|details|audio|video|marquee|applet|isindex)/i, // Dangerous HTML tags
    /on(click|dblclick|mousedown|mouseup|mouseover|mousemove|mouseout|mouseenter|mouseleave|keydown|keypress|keyup|load|unload|abort|error|resize|scroll|select|change|submit|reset|focus|blur|input|contextmenu|wheel|copy|cut|paste|drag|drop|toggle|start|finish|animation\w+|transition\w+|pointer\w+|search)\w*\s*=/i, // Event handlers (whitelist to avoid false positives)
    /j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*(:|&colon;|&#58;|&#x3a;)/i, // JavaScript pseudo-protocol (handles whitespace and entities)
    /v\s*b\s*s\s*c\s*r\s*i\s*p\s*t\s*(:|&colon;|&#58;|&#x3a;)/i, // VBScript pseudo-protocol
    /data:/i, // Data URLs (can contain base64 encoded scripts)
    /expression\s*\(/i, // CSS expressions (older IE)
    /url\s*\(.*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i, // CSS URLs with javascript
    /&\s*#\s*(?:[xX][0-9a-fA-F]+|\d+);/i // Encoded HTML entities (potential bypass)
  ];

  /**
   * Recursive helper to check for XSS patterns in nested objects and arrays
   */
  const checkXSSRecursively = (value: unknown, path: string): { found: boolean; field?: string } => {
    if (typeof value === "string") {
      const isSuspicious = xssPatterns.some((pattern) => pattern.test(value));
      if (isSuspicious) {
        return { found: true, field: path };
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const result = checkXSSRecursively(value[i], `${path}[${i}]`);
        if (result.found) return result;
      }
    } else if (value !== null && typeof value === "object") {
      for (const [key, val] of Object.entries(value)) {
        const result = checkXSSRecursively(val, path ? `${path}.${key}` : key);
        if (result.found) return result;
      }
    }
    return { found: false };
  };

  const xssCheck = checkXSSRecursively(data, "");
  if (xssCheck.found) {
    errors.push({
      field: xssCheck.field || "unknown",
      message: "Invalid input detected (Security Check)",
    });
  }

  // Email domain validation using disposable-email-domains package (O(1) Set lookup)
  if (data.email && typeof data.email === "string") {
    // Lazy load the disposable email domains
    if (!disposableDomainSet) {
      try {
        const { default: disposableEmailDomains } = await import('disposable-email-domains');
        disposableDomainSet = new Set(disposableEmailDomains);
      } catch (error) {
        console.warn('Failed to load disposable email domains list', error);
        // Fallback or empty set if import fails
        disposableDomainSet = new Set();
      }
    }

    const emailDomain = data.email.split("@")[1]?.toLowerCase();

    if (emailDomain && disposableDomainSet.has(emailDomain)) {
      errors.push({
        field: "email",
        message: "Please use a permanent email address",
      });
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      error: {
        message: "Server validation failed",
        code: "SERVER_VALIDATION_ERROR",
        field: errors[0].field,
      },
    };
  }

  return {
    success: true,
    data: { message: "Validation passed" },
  };
}

/**
 * Check if user is online
 */
export function isOnline(): boolean {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

/**
 * Wait for network connection
 */
export function waitForConnection(timeout = 30000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isOnline()) {
      resolve(true);
      return;
    }

    const timeoutId = setTimeout(() => {
      window.removeEventListener("online", onlineHandler);
      resolve(false);
    }, timeout);

    const onlineHandler = () => {
      clearTimeout(timeoutId);
      window.removeEventListener("online", onlineHandler);
      resolve(true);
    };

    window.addEventListener("online", onlineHandler);
  });
}
