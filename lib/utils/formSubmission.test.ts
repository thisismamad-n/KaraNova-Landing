import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";

// Mock the external dependency before importing the module under test
mock.module("disposable-email-domains", () => {
  return { default: ["disposable.com"] };
});

import { submitFormWithRetry, validateFormServerSide, isOnline, waitForConnection } from "./formSubmission";

describe("submitFormWithRetry", () => {
  const endpoint = "https://api.example.com/submit";
  const data = { name: "Test User", email: "test@example.com" };

  beforeEach(() => {
    global.fetch = mock(() =>
      Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }))
    ) as any;
  });

  test("should succeed on first attempt", async () => {
    const result = await submitFormWithRetry({ endpoint, data });

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("should handle 400 validation error with invalid JSON (fallback to text)", async () => {
    global.fetch = mock(() => {
      return Promise.resolve(new Response("Plain text error message", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      }));
    }) as any;

    const result = await submitFormWithRetry({ endpoint, data });

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe("VALIDATION_ERROR");
    expect(result.error?.message).toBe("Plain text error message");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("should handle 400 validation error without retry", async () => {
    global.fetch = mock(() =>
      Promise.resolve(new Response(JSON.stringify({ message: "Invalid email", field: "email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }))
    ) as any;

    const result = await submitFormWithRetry({ endpoint, data });

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe("VALIDATION_ERROR");
    expect(result.error?.field).toBe("email");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("should retry on 500 server error and eventually succeed", async () => {
    let calls = 0;
    global.fetch = mock(() => {
      calls++;
      if (calls === 1) {
        return Promise.resolve(new Response("Server Error", { status: 500 }));
      }
      return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    }) as any;

    const result = await submitFormWithRetry({ endpoint, data, retryDelay: 1 });

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("should retry on 500 server error and fail after max retries", async () => {
    global.fetch = mock(() =>
      Promise.resolve(new Response("Server Error", { status: 500 }))
    ) as any;

    const result = await submitFormWithRetry({ endpoint, data, maxRetries: 1, retryDelay: 1 });

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe("NETWORK_ERROR");
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("should handle 429 rate limit with Retry-After header", async () => {
    let calls = 0;
    global.fetch = mock(() => {
      calls++;
      if (calls === 1) {
        return Promise.resolve(new Response("Too Many Requests", {
          status: 429,
          headers: { "Retry-After": "0" } // 0 seconds for fast testing
        }));
      }
      return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    }) as any;

    const result = await submitFormWithRetry({ endpoint, data, maxRetries: 1 });

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("should handle 429 rate limit and fail if max retries exceeded", async () => {
    global.fetch = mock(() =>
      Promise.resolve(new Response("Too Many Requests", { status: 429 }))
    ) as any;

    const result = await submitFormWithRetry({ endpoint, data, maxRetries: 1, retryDelay: 1 });

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe("RATE_LIMIT");
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("should handle timeout (AbortError)", async () => {
    global.fetch = mock(() => {
      const error = new Error("The operation was aborted");
      error.name = "AbortError";
      return Promise.reject(error);
    }) as any;

    const result = await submitFormWithRetry({ endpoint, data, timeout: 10 });

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe("TIMEOUT");
  });

  test("should retry on network connection errors", async () => {
    let calls = 0;
    global.fetch = mock(() => {
      calls++;
      if (calls === 1) {
        return Promise.reject(new Error("Network connection lost"));
      }
      return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    }) as any;

    const result = await submitFormWithRetry({ endpoint, data, retryDelay: 1 });

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

describe("validateFormServerSide", () => {
  test("should pass valid contact data", async () => {
    const data = { name: "John Doe", email: "john@example.com", message: "Hello" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(true);
  });

  test("should reject XSS patterns", async () => {
    const data = { name: "John", message: "<script>alert('xss')</script>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
    expect(result.error?.field).toBe("message");
    expect(result.error?.message).toBe("Server validation failed");
  });

  test("should reject disposable email domains", async () => {
    const data = { name: "John", email: "john@disposable.com" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
    expect(result.error?.field).toBe("email");
    expect(result.error?.message).toBe("Server validation failed");
  });

  test("should reject javascript protocol with whitespace", async () => {
    const data = { message: "<a href='java\tscript:alert(1)'>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should reject standalone math tag", async () => {
    const data = { message: "<math><mtext>x</mtext></math>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should reject standalone template tag", async () => {
    const data = { message: "<template><div>x</div></template>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should reject ontouchstart event", async () => {
    const data = { message: "<div ontouchstart='alert(1)'>x</div>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should reject onpageshow event", async () => {
    const data = { message: "<body onpageshow='alert(1)'>x</body>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should reject svg tag without event handler", async () => {
    const data = { message: "<svg><desc>test</desc></svg>" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should NOT reject innocent input like 'onion='", async () => {
    const data = { message: "The price of onion=5 dollars" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(true);
  });

  test("should NOT reject innocent input like 'online='", async () => {
    const data = { status: "online=true" };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(true);
  });

  test("should reject dangerous event handlers", async () => {
    const inputs = [
      "<img onload=alert(1)>",
      "<div onclick=alert(1)>",
      "<input onfocus=alert(1)>"
    ];
    for (const input of inputs) {
      const data = { message: input };
      const result = await validateFormServerSide("contact", data);
      expect(result.success).toBe(false);
    }
  });

  test("should reject video/audio tags", async () => {
    const inputs = [
      "<video><source src=x onerror=alert(1)></video>",
      "<audio src=x onerror=alert(1)></audio>"
    ];
    for (const input of inputs) {
      const data = { message: input };
      const result = await validateFormServerSide("contact", data);
      expect(result.success).toBe(false);
    }
  });

  test("should reject nested XSS patterns", async () => {
    const data = {
      user: {
        name: "John",
        profile: {
          bio: "<script>alert('xss')</script>"
        }
      }
    };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
  });

  test("should reject excessively long strings to prevent ReDoS", async () => {
    // Generate a string longer than the 5000 character limit
    const longString = "A".repeat(5001);
    const data = { message: longString };
    const result = await validateFormServerSide("contact", data);
    expect(result.success).toBe(false);
    expect(result.error?.field).toBe("message");
    expect(result.error?.message).toBe("Server validation failed");
  });
});

describe("isOnline", () => {
  test("should return true when navigator is undefined", () => {
    const originalNavigator = global.navigator;
    // @ts-ignore
    global.navigator = undefined;
    expect(isOnline()).toBe(true);
    global.navigator = originalNavigator;
  });

  test("should return navigator.onLine when defined", () => {
    const originalNavigator = global.navigator;
    // @ts-ignore
    global.navigator = { onLine: false };
    expect(isOnline()).toBe(false);
    // @ts-ignore
    global.navigator = { onLine: true };
    expect(isOnline()).toBe(true);
    global.navigator = originalNavigator;
  });
});

describe("waitForConnection", () => {
  test("should resolve immediately if online", async () => {
    const originalNavigator = global.navigator;
    // @ts-ignore
    global.navigator = { onLine: true };
    const result = await waitForConnection();
    expect(result).toBe(true);
    global.navigator = originalNavigator;
  });
});
